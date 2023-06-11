import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { selectRawFile } from '@/features/signatureSlice';
import { useAppSelector } from '@/store/hooks';
import { fromBase64 } from '@/utils/base64';

type Props = {};

export default function Download({}: Props) {
  const router = useRouter();
  const rawFile = useAppSelector(selectRawFile);
  const [decodedFile, setDecodedFile] = useState<Uint8Array>();

  /* if has rawFile, decode string to UInt8Array */
  useEffect(() => {
    if (!rawFile) {
      router.push('/');
      return;
    }
    const decoded = fromBase64(rawFile);
    setDecodedFile(decoded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawFile]);

  return <div>download</div>;
}
