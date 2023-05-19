import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { fabric } from 'fabric';
import styled from 'styled-components';

type Props = {
  file?: Uint8Array;
};

function FileViewer({ file }: Props) {
  const [pdfDoc, setPdfDoc] = useState<pdfjs.PDFDocumentProxy>();
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fabricRef = useRef<fabric.Canvas>();
  // const isRendering = useRef(false);

  const loadSignatureImage = useCallback((e: fabric.IEvent<MouseEvent>) => {
    if (!window.draggedImage) return;

    const imageScale = 1 / window.devicePixelRatio;
    const image = new fabric.Image(window.draggedImage, {
      scaleX: imageScale,
      scaleY: imageScale,
    });
    fabricRef.current?.add(image);
  }, []);

  const renderPDF = useCallback(async () => {
    if (!pdfDoc) return;

    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1 });

    fabricRef.current = new fabric.Canvas('canvas', {
      width: viewport.width,
      height: viewport.height,
    });
    const canvasForPdf = document.createElement('canvas') as HTMLCanvasElement;
    canvasForPdf.width = viewport.width;
    canvasForPdf.height = viewport.height;
    await page.render({
      canvasContext: canvasForPdf.getContext('2d')!,
      viewport,
    }).promise;

    const imageScale = 1 / window.devicePixelRatio;
    const pdfImage = new fabric.Image(canvasForPdf, {
      scaleX: imageScale,
      scaleY: imageScale,
    });

    pdfImage.hasControls = false;
    pdfImage.hasBorders = false;
    fabricRef.current.setBackgroundImage(
      pdfImage,
      fabricRef.current?.renderAll.bind(fabricRef.current)
    );
    fabricRef.current.on('drop', loadSignatureImage);
  }, [pdfDoc, pageNum, loadSignatureImage]);

  /* if has file, get pdf document and total pages number */
  useEffect(() => {
    if (!file) {
      return;
    }

    pdfjs.getDocument(file).promise.then((pdf) => {
      if (pdfDoc) {
        pdfDoc.destroy();
      }
      setPdfDoc(pdf);
      setTotalPages(pdf.numPages);
      setPageNum(1);
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
