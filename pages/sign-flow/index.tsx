import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const modalRef = useRef<HTMLDialogElement>(null);

  const showConfirmModal = useCallback(() => {
    modalRef.current?.showModal();
  }, []);

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

  return (
    <Container>
      <ViewerContainer>
        <FileViewer file={decodedFile} />
      </ViewerContainer>
      <SignatureContainer>
        <SignatureDrawer />
        <div>
          <button type='button' onClick={showConfirmModal}>
            下一步
          </button>
        </div>
      </SignatureContainer>
      <dialog ref={modalRef}>
        <h2>請確認您的檔案</h2>
        <p>確認後將無法修改</p>
        <form method='dialog'>
          <button type='button' onClick={() => router.push('/download')}>
            確認
          </button>
          <button type='button' value='cancel' formMethod='dialog'>
            返回
          </button>
        </form>
      </dialog>
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
