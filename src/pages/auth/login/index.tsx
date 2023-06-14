import React, { FormEvent, ReactElement } from "react";
import { Checkbox } from "antd";
import Link from "next/link";

import type { NextPageWithLayout } from "@/pages/_app";
import LayoutAuth from "@/layouts/LayoutAuth";
import Button from "@/components/common/Button";

// import authBanner from '@/assets/images/auth_banner.jpg'
import authBanner from "@/assets/images/auth-banner.webp";

const Login: NextPageWithLayout = () => {
	const handleSubmitLogin = (event: FormEvent) => {
		event.preventDefault();
		console.log("hi");
	};

	return (
		<div id="auth-login" className="grid xl:grid-cols-2 h-[100vh]">
			<div
				style={{
					backgroundImage: `url(${authBanner.src})`,
				}}
				className="bg-cover bg-center bg-no-repeat h-full hidden sm:block sm:pt-[46%] lg:pt-[40%] xl:pt-0"
			></div>

			<div className="flex flex-col justify-center px-8 sm:py-10 sm:px-20 lg:px-32 bg-[#f6f7fc] xl:py-20 xl:px-40">
				<h1 className="text-[28px] mb-14 text-center">
					Welcome to{" "}
					<span className="text-primary-color font-bold">
						Uray Cosmetic & Beauty
					</span>
				</h1>

				<form className="flex flex-col gap-10" onSubmit={handleSubmitLogin}>
					<div className="flex flex-col gap-3">
						<label htmlFor="">Username</label>
						<input
							type="email"
							placeholder="Your-email@gmail.com"
							className="auth-input text-base py-4 px-3 outline-none placeholder:text-[#848484]"
						/>
					</div>
					<div className="flex flex-col gap-3">
						<label htmlFor="">Password</label>
						<input
							type="password"
							placeholder="Your password"
							className="auth-input text-base py-4 px-3 outline-none placeholder:text-[#848484]"
						/>
					</div>
					<div className="mt-[-20px] text-sm flex justify-between items-center">
						<Checkbox>Remember me</Checkbox>
						<p className="mb-0 cursor-pointer underline hover:no-underline">
							Forgot password?
						</p>
					</div>
					<div className="flex flex-col gap-4">
					  <Button primary type="submit">
  						Login
  					</Button>
  					<Link href="/auth/register">
  						<Button secondary type="button" className="w-full">
  							Register
  						</Button>
  					</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

Login.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAuth>{page}</LayoutAuth>;
};

export default Login;
