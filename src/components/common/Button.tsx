import React, { ReactNode, LinkHTMLAttributes } from "react";
import classnames from "classnames";
import Link, { LinkProps } from "next/link";

export interface IButton {
	primary?: boolean;
	secondary?: boolean;
	type?: "button" | "submit" | "reset";
  className?: string;
	children: ReactNode;
}

const Button = ({
	primary,
	secondary,
	type,
  className,
	children,
	...passProps
}: IButton) => {
	const classname = classnames(
		{
			"bg-primary-color text-white hover:bg-black": primary,
			"bg-white text-black hover:bg-black hover:text-white": secondary,
		},
		"text-[13px] uppercase px-[26px] py-[12px] min-w-[80px] font-semibold transition duration-200 ease-linear lg:text-[15px] sm:px-[30px] sm:py-[15px]",
    [className]
	);
	return (
		<button type={type} className={classname} {...passProps}>
			{children}
		</button>
	);
};

export default Button;
