import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  addSignatureToPdf,
  selectError,
  selectPending,
  selectRawFile,
  selectSignedFile,
} from '@/features/signatureSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Link from 'next/link';
import { PDFDocument } from 'pdf-lib';

type Props = {};

export default function Download({}: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isPending = useAppSelector(selectPending);
  const error = useAppSelector(selectError);
  const rawFile = useAppSelector(selectRawFile);
  const signedFile = useAppSelector(selectSignedFile);

  /* if has rawFile, decode string to UInt8Array */
  useEffect(() => {
    if (!rawFile) {
      router.push('/');
      return;
    }
    dispatch(addSignatureToPdf());
  }, [dispatch, rawFile, router]);

  const downloadFile = useCallback(async () => {
    if (!signedFile) return;
    const pdf = await PDFDocument.load(signedFile);
    const pdfBytes = await pdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'signed.pdf';
    a.click();
    URL.revokeObjectURL(url);
  }, [signedFile]);

  return (
    <div>
      <h1>Download</h1>
      {isPending && <p>Pending</p>}
      {error && <p>Error</p>}
      <div>
        {signedFile && (
          <button type='button' onClick={downloadFile}>
            下載檔案
          </button>
        )}
        <Link href='/'>回到首頁</Link>
      </div>
    </div>
  );
}
