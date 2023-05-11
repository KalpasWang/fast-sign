import React, { useEffect, useRef, useState } from 'react';
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // render pdf to canvas
  useEffect(() => {
    if (!rawFile) {
      router.push('/');
      return;
    }

    const decodedFile = fromBase64(rawFile);
    pdfjs.getDocument(decodedFile).promise.then((pdf) => {
      setPdfDoc(pdf);
    });
  }, [rawFile, router]);

  useEffect(() => {
    pdfDoc?.getPage(pageNum).then((page) => {
      const viewport = page.getViewport({ scale: 1 });
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const context = canvas.getContext('2d');
      if (!context) return;
      page.render({
        canvasContext: context,
        viewport,
      });
    });
  }, [pageNum, pdfDoc]);

  return (
    <div>
      <canvas ref={canvasRef} />
      <button type='button' onClick={() => {}} disabled={false}>
        上一頁
      </button>
      <span>第 {pageNum} 頁</span>
      <button type='button' onClick={() => {}} disabled={false}>
        下一頁
      </button>
    </div>
  );
}
