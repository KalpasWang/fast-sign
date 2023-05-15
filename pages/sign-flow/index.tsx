import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { fromBase64 } from '@/utils/base64';
import FileViewer from '@/components/FileViewer';

type Props = {};

export default function SignFlow({}: Props) {
  const router = useRouter();
  const rawFile = useAppSelector((state) => state.signature.rawFile);
  const [decodedFile, setDecodedFile] = useState<Uint8Array>();

  /* if has rawFile, decode string to UInt8Array */
  useEffect(() => {
    if (!rawFile) {
      router.push('/');
      return;
    }

    const decoded = fromBase64(rawFile);
    setDecodedFile(decoded);
  }, [rawFile, router]);

  return <FileViewer file={decodedFile} />;
}
