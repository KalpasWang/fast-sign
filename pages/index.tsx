import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>快點簽 Fast-Sign</title>
      </Head>
      <header>
        <Image src='/assets/logo.svg' alt='logo' />
        <h1>快速省時的電子簽署工具</h1>
        <div>b</div>
      </header>
      <main>
        <div>
          <button type='button'>選擇檔案</button>
        </div>
      </main>
    </>
  );
}
