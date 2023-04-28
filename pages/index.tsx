import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import FileUploader from '@/components/FileUploader';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [uploaded, setUploaded] = useState(false);
  const router = useRouter();

  function uploadHandler(file: File) {
    console.log(file);
    setUploaded(true);
  }

  // 上傳成功跳轉到 sign-flow
  useEffect(() => {
    if (uploaded) {
      router.push('/sign-flow');
    }
  }, [uploaded, router]);

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
        {uploaded && <p>上傳成功</p>}
        <FileUploader onUpload={uploadHandler} />
      </main>
    </>
  );
}
