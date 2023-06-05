import React, {ReactNode} from 'react'
import classnames from 'classnames'

export interface IButton {
  primary?: boolean,
  children: ReactNode
}

const Button = ({primary, children}: IButton) => {
  const className = classnames(
    {'bg-primary-color text-white hover:bg-black': primary},
    "text-[15px] uppercase px-[30px] py-[15px] min-w-[80px] font-semibold"
  )
  return (
    <button className={className}>{children}</button>
  )
}

export default Button