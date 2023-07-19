import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { selectSignedFile } from '@/features/signatureSlice';
import { useAppSelector } from '@/store/hooks';
import Link from 'next/link';
import { downloadPdf } from '@/utils/download';

type Props = {};

export default function Download({}: Props) {
  const router = useRouter();
  const signedFile = useAppSelector(selectSignedFile);

  /* if has rawFile, decode string to UInt8Array */
  useEffect(() => {
    if (!signedFile) {
      router.push('/');
      return;
    }
  });

  const downloadFile = useCallback(async () => {
    if (!signedFile) return;
    downloadPdf(signedFile, 'signed-file.pdf');
  }, [signedFile]);

  return (
    <div>
      <h1>Download</h1>
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
