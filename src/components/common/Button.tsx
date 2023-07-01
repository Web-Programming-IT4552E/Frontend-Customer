import classnames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';

export interface IButton {
  primary?: boolean;
  secondary?: boolean;
  third?: boolean;
  normal?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: ReactNode;
}

const Button = ({
  primary,
  secondary,
  third,
  normal,
  type,
  className,
  children,
  ...passProps
}: IButton) => {
  const classname = classnames(
    {
      'bg-primary-color text-white hover:bg-black': primary,
      'bg-white text-black hover:bg-black hover:text-white': secondary,
      'bg-black text-white hover:opacity-70': third,
      'border-[1px] border-solid border-[#ccc] bg-white font-normal text-black hover:bg-white hover:text-primary-color':
        normal,
    },
    'min-w-[80px] px-[26px] py-[12px] text-[13px] font-semibold uppercase transition duration-200 ease-linear sm:px-[30px] sm:py-[15px] lg:text-[15px]',
    [className]
  );

  return (
    <button type={type} className={classname} {...passProps}>
      {children}
    </button>
  );
};

export default Button;
