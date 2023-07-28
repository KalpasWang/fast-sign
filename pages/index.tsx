import Head from 'next/head';
import { Inter } from 'next/font/google';
import FileUploader from '@/components/FileUploader';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';
import { useAppDispatch } from '../store/hooks';
import { saveUploadedFile } from '@/features/signatureSlice';
import MainLayout from '@/components/MainLayout';

const inter = Inter({ subsets: ['latin'] });

pdfjs.GlobalWorkerOptions.workerSrc = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.js`;

export default function Home() {
  const [isUploaded, setIsUploaded] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function uploadHandler(data: string) {
    dispatch(saveUploadedFile(data));
    setIsUploaded(true);
  }

  // 上傳成功跳轉到 sign-flow
  useEffect(() => {
    if (isUploaded) {
      router.push('/sign-flow');
    }
  }, [isUploaded, router]);

  return (
    <>
      <Head>
        <title>快點簽 Fast-Sign</title>
      </Head>
      <MainLayout>
        {isUploaded && <p>上傳成功</p>}
        <FileUploader onUpload={uploadHandler} />
      </MainLayout>
    </>
  );
}
