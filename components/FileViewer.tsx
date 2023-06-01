import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';
import { fabric } from 'fabric';
import styled from 'styled-components';
import {
  Signature,
  addSignature,
  selectSignature,
  updateSignature,
} from '@/features/signatureSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

type Props = {
  file?: Uint8Array;
};

function FileViewer({ file }: Props) {
  const [pdfDoc, setPdfDoc] = useState<pdfjs.PDFDocumentProxy>();
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fabricRef = useRef<fabric.Canvas>();
  const dispatch = useAppDispatch();
  const signatureArray = useAppSelector(selectSignature);

  const loadSignatureImage = useCallback(
    (e: fabric.IEvent<MouseEvent>) => {
      if (!window.draggedImage) return;

      const { offsetX, offsetY } = e.e;
      const imageScale = 1 / window.devicePixelRatio;
      const image = new fabric.Image(window.draggedImage, {
        scaleX: imageScale,
        scaleY: imageScale,
        top: offsetY - (window.draggedImage.height * imageScale) / 2,
        left: offsetX - (window.draggedImage.width * imageScale) / 2,
      });
      fabricRef.current?.on('object:added', saveSignatureImage);
      fabricRef.current?.on('object:modified', saveSignatureImage);
      fabricRef.current?.add(image);

      function saveSignatureImage(e: fabric.IEvent<MouseEvent>) {
        if (!e.target || !(e.target instanceof fabric.Image)) return;
        if (!e.target.cacheKey) return;

        const id = e.target.cacheKey;
        const signature: Signature = {
          id,
          file: e.target.toDataURL({ format: 'png' }) || '',
          pageNumber: pageNum,
          rotation: e.target.angle || 0,
        };
        console.log(signatureArray);
        const index = signatureArray.findIndex((item) => item.id === id);
        if (index >= 0) {
          dispatch(updateSignature({ signature, index }));
          return;
        }
        dispatch(addSignature(signature));
      }
    },
    [dispatch, pageNum, signatureArray]
  );

  const renderPDF = useCallback(async () => {
    if (!pdfDoc) return;

    try {
      const page = await pdfDoc.getPage(pageNum);

      // 把 pdf 渲染到 virtual canvas
      const canvasForPdf = document.createElement(
        'canvas'
      ) as HTMLCanvasElement;
      const viewport = page.getViewport({ scale: window.devicePixelRatio });
      canvasForPdf.width = viewport.width;
      canvasForPdf.height = viewport.height;
      await page.render({
        canvasContext: canvasForPdf.getContext('2d')!,
        viewport,
      }).promise;

      // 將 virtial canvas 轉成 fabric image
      const imageScale = 1 / window.devicePixelRatio;
      const pdfImage = new fabric.Image(canvasForPdf, {
        scaleX: imageScale,
        scaleY: imageScale,
      });
      pdfImage.hasControls = false;
      pdfImage.hasBorders = false;

      // 將 fabric image 加到 canvas
      if (!fabricRef.current) {
        fabricRef.current = new fabric.Canvas('canvas', {
          width: pdfImage.width,
          height: pdfImage.height,
        });
        fabricRef.current.on('drop', loadSignatureImage);
      }
      fabricRef.current.setZoom(pdfImage.scaleX ? 1 / pdfImage.scaleX : 1);
      fabricRef.current.setBackgroundImage(
        pdfImage,
        fabricRef.current?.renderAll.bind(fabricRef.current)
      );
    } catch (error) {
      console.error(error);
    }
  }, [pdfDoc, pageNum, loadSignatureImage]);

  /* if has file, get pdf document and total pages number */
  useEffect(() => {
    if (!file) {
      return;
    }

    pdfjs
      .getDocument({
        data: file,
        standardFontDataUrl:
          '//cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/standard_fonts/',
      })
      .promise.then((pdf) => {
        if (pdfDoc) {
          pdfDoc.destroy();
        }
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setPageNum(1);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  /* if pdfDoc is changed or select diffent page, then render pdf */
  useEffect(() => {
    if (!pdfDoc) return;

    renderPDF();
  }, [pageNum, pdfDoc, renderPDF]);

  return (
    <Container>
      <FileViewerContainer>
        <canvas id='canvas' role='img' title='PDF Viewer' />
      </FileViewerContainer>
      <div>
        <button
          type='button'
          onClick={() => {
            setPageNum((prevPageNum) => prevPageNum - 1);
          }}
          disabled={pageNum === 1}
        >
          上一頁
        </button>
        <span>
          {pageNum} / {totalPages}
        </span>
        <button
          type='button'
          onClick={() => {
            setPageNum((prevPageNum) => prevPageNum + 1);
          }}
          disabled={pageNum === totalPages}
        >
          下一頁
        </button>
      </div>
    </Container>
  );
}

export default FileViewer;

const Container = styled.div`
  height: 100%;
`;

const FileViewerContainer = styled.div`
  overflow: auto;
`;
