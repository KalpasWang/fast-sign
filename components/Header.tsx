import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import Button from './Button';

function Header() {
  return (
    <header className='bg-white border-grey border-b'>
      <div className='relative flex max-w-screen-xl items-center justify-between px-6 py-4 md:py-6'>
        <Link className='z-10' href='/'>
          <h1>
            <Image
              width={96}
              height={48}
              className='w-20 md:w-24'
              src='/assets/logo.svg'
              alt='logo'
            />
          </h1>
        </Link>
        <h2 className='text-darkGrey text-h2 absolute inset-x-0 top-1/2 -translate-y-1/2 text-center hidden md:block'>
          快速省時的電子簽署工具
        </h2>
        <nav className='z-10 flex gap-4'>
          <Button size='md' variant='text'>
            登入
          </Button>
          <Button size='md'>註冊</Button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
