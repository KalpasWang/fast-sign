import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import FileUploader from '@/components/FileUploader';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as pdfjs from 'pdfjs-dist';
import * as legacyPdfjs from 'pdfjs-dist/legacy/build/pdf';
import { useAppDispatch } from '../store/hooks';
import { saveUploadedFile } from '@/features/signatureSlice';

const inter = Inter({ subsets: ['latin'] });

legacyPdfjs.GlobalWorkerOptions.workerSrc =
  '//mozilla.github.io/pdf.js/legacy/build/pdf.worker.js';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
      <header>
        <Image width={96} height={48} src='/assets/logo.svg' alt='logo' />
        <h1>快速省時的電子簽署工具</h1>
        <div>b</div>
      </header>
      <main>
        {isUploaded && <p>上傳成功</p>}
        <FileUploader onUpload={uploadHandler} />
      </main>
    </>
  );
}
