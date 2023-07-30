import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header></Header>
      <main className='px-6 py-8 md:py-10'>
        <div className='max-w-screen-xl mx-auto'>{children}</div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default MainLayout;
