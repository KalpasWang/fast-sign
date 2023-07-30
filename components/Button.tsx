import clsx from 'clsx';
import React from 'react';
import { ButtonPropsWithoutRef } from 'react-html-props';

interface ButtonProps<T extends React.ElementType> {
  as?: T;
  variant?: 'solid' | 'outlined' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
  type?: ButtonPropsWithoutRef['type'];
}

function Button<T extends React.ElementType = 'button'>({
  as,
  variant = 'solid',
  size = 'lg',
  type = 'button',
  className,
  ...props
}: ButtonProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) {
  const Component = as || 'button';
  const buttonStyles = {
    solid:
      'bg-brand hover:bg-brandHover text-white border-brand focus:ring-brand/75 disabled:border-uiGrey',
  };

  return (
    <Component
      type={Component === 'button' ? type : undefined}
      className={clsx(
        className,
        variant === 'solid' && buttonStyles.solid,
        variant === 'outlined' &&
          'bg-greyscale-white hover:bg-greyscale-light-grey text-greyscale-dark border-greyscale-grey disabled:border-greyscale-grey focus:ring-greyscale-grey/80',
        variant === 'text' &&
          'hover:bg-greyscale-light-grey text-primary-main focus:ring-primary-main/80 border-transparent bg-transparent',
        size === 'lg' && 'text-h4 py-3 px-6',
        size === 'md' &&
          'text-p md:text-h4 py-2 px-4 md:py-3 md:px-6 md:font-bold',
        size === 'sm' && 'text-p py-1.5 px-2 md:py-2 md:px-4',
        'disabled:text-greyscale-dark-grey/40 disabled:bg-greyscale-ui-grey inline-flex items-center justify-center rounded-sm border -tracking-tighter transition-colors focus:ring-2 focus:ring-offset-2 disabled:focus:outline-none'
      )}
      {...props}
    />
  );
}

export default Button;
