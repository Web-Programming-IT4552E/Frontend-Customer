import React, {ReactNode} from 'react'
import classnames from 'classnames'

export interface IButton {
  primary?: boolean,
  secondary?: boolean
  children: ReactNode
}

const Button = ({primary, secondary, children}: IButton) => {
  const className = classnames(
    {
      'bg-primary-color text-white hover:bg-black': primary,
      'bg-white text-black hover:bg-black hover:text-white': secondary
    },
    "text-[13px] uppercase px-[26px] py-[12px] min-w-[80px] font-semibold transition duration-200 ease-linear lg:text-[15px] sm:px-[30px] sm:py-[15px]"
  )
  return (
    <button className={className}>{children}</button>
  )
}

export default Button