import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';

type Props = {
  file?: Uint8Array;
};

function FileViewer({ file }: Props) {
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

export default FileViewer;
