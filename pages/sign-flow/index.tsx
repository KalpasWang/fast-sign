import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import * as pdfjs from 'pdfjs-dist';
import { fromBase64 } from '@/utils/base64';

type Props = {};

export default function SignFlow({}: Props) {
  const router = useRouter();
  const rawFile = useAppSelector((state) => state.signature.rawFile);
  const [pdfDoc, setPdfDoc] = useState<pdfjs.PDFDocumentProxy>();
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isRendering = useRef(false);

  const renderPDF = useCallback(async () => {
    if (!pdfDoc) return;
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1 });
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const context = canvas.getContext('2d');
    if (!context) return;
    await page.render({
      canvasContext: context,
      viewport,
    }).promise;
  }, [pdfDoc, pageNum]);

  /* if has rawFile, get pdf document and total pages number */
  useEffect(() => {
    if (!rawFile) {
      router.push('/');
      return;
    }

    const decodedFile = fromBase64(rawFile);

    pdfjs.getDocument(decodedFile).promise.then((pdf) => {
      if (pdfDoc) {
        pdfDoc.destroy();
      }
      setPdfDoc(pdf);
      setTotalPages(pdf.numPages);
      setPageNum(1);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawFile, router]);

  /* if pdfDoc is changed or select diffent page, then render pdf */
  useEffect(() => {
    if (!pdfDoc) return;
    if (isRendering.current) return;

    isRendering.current = true;
    renderPDF().finally(() => {
      isRendering.current = false;
    });
  }, [pageNum, pdfDoc, renderPDF]);

  return (
    <div>
      <canvas ref={canvasRef} />
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
  );
}
