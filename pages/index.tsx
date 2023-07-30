import Head from 'next/head';
import { Inter } from 'next/font/google';
import FileUploader from '@/components/FileUploader';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';
import { useAppDispatch } from '../store/hooks';
import { saveUploadedFile } from '@/features/signatureSlice';
import MainLayout from '@/components/MainLayout';
import AddFiles from '@/components/icons/addFiles';
import Button from '@/components/Button';
import Illustration from '@/components/Illustration';

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
        <h2 className='text-h2 text-center text-darkGrey block md:hidden'>
          快速省時的電子簽署工具
        </h2>
        <div className='bg-primarySelected border-2 border-dashed border-brand'>
          <div className='flex flex-col items-center justify-center py-20 w-full'>
            <AddFiles />
            <Button className='mt-4'>選擇檔案</Button>
            <p className='text-h5 mt-2 text-brand'>
              檔案大小10MB以內，檔案格式為PDF、JPG 或 PNG
            </p>
          </div>
        </div>
        <h2 className='text-h2 text-center text-dark mt-10 mb-6'>
          輕鬆幾步驟，完成您的簽署
        </h2>
        <Illustration />
        {isUploaded && <p>上傳成功</p>}
        <FileUploader onUpload={uploadHandler} />
      </MainLayout>
    </>
  );
}
