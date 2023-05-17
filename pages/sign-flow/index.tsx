import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { fromBase64 } from '@/utils/base64';
import FileViewer from '@/components/FileViewer';
import SignatureDrawer from '@/components/SignatureDrawer';

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

  return (
    <Container>
      <ViewerContainer>
        <FileViewer file={decodedFile} />
      </ViewerContainer>
      <SignatureContainer>
        <SignatureDrawer />
      </SignatureContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;

const ViewerContainer = styled.div`
  height: 100%;
  flex-basis: 50%;
  overflow: auto;
`;

const SignatureContainer = styled.div`
  height: 100%;
  flex-basis: 50%;
`;
