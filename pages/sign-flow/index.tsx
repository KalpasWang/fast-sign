import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { fromBase64 } from '@/utils/base64';
import FileViewer from '@/components/FileViewer';
import SignatureDrawer from '@/components/SignatureDrawer';
import Dialog from '@/components/Dialog';
import {
  Signature,
  addSignatureToPdf,
  selectError,
  selectPending,
  selectRawFile,
  selectSignatures,
  selectSignedFile,
  updateSignatureArray,
} from '@/features/signatureSlice';

type Props = {};

export default function SignFlow({}: Props) {
  const router = useRouter();
  const rawFile = useAppSelector(selectRawFile);
  const signature = useAppSelector(selectSignatures);
  const [decodedFile, setDecodedFile] = useState<Uint8Array>();
  const [showingModal, setShowingModal] = useState(false);
  const [isOk, setIsOk] = useState(false);
  const dispatch = useAppDispatch();
  const signedFile = useAppSelector(selectSignedFile);
  const isPending = useAppSelector(selectPending);
  const error = useAppSelector(selectError);

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

  // 如果檔案已經送出且有 signedFile，push 到 download 頁面
  useEffect(() => {
    if (isOk && signedFile) {
      router.push('/download');
    }
  }, [isOk, router, signedFile]);

  const updateSignatures = useCallback(
    (signature: Signature) => {
      dispatch(updateSignatureArray(signature));
      setIsOk(true);
    },
    [dispatch]
  );

  const handleNextStep = useCallback(() => {
    if (!signature) {
      console.error('signature is empty');
      return;
    }
    dispatch(addSignatureToPdf());
    setIsOk(true);
  }, [signature, dispatch]);

  return (
    <Container>
      <ViewerContainer>
        <FileViewer file={decodedFile} onUpdateSignatures={updateSignatures} />
      </ViewerContainer>
      <SignatureContainer>
        <SignatureDrawer />
        <div>
          <button type='button' onClick={() => setShowingModal(true)}>
            下一步
          </button>
        </div>
      </SignatureContainer>
      {showingModal && (
        <Dialog>
          <DialogContentContainer>
            <h2>請確認您的檔案</h2>
            <p>確認後將無法修改</p>
            {isPending && <p>處程中...</p>}
            {error && <p>{error}</p>}
            {!isPending && (
              <div>
                <button type='button' onClick={() => handleNextStep()}>
                  確認
                </button>
                <button type='button' onClick={() => setShowingModal(false)}>
                  返回
                </button>
              </div>
            )}
          </DialogContentContainer>
        </Dialog>
      )}
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

const DialogContentContainer = styled.div`
  width: 75%;
  max-width: 30rem;
  text-align: center;
  background-color: #fff;
  border-radius: 20px;
`;
