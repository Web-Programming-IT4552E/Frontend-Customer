import React, { FormEvent, ReactElement } from "react";
import { Checkbox } from "antd";
import Link from "next/link";

import type { NextPageWithLayout } from "@/pages/_app";
import LayoutAuth from "@/layouts/LayoutAuth";
import Button from "@/components/common/Button";

// import authBanner from '@/assets/images/auth_banner.jpg'
import authBanner from "@/assets/images/auth-banner.webp";

const Register: NextPageWithLayout = () => {
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

			<div className="flex flex-col justify-center px-8 sm:py-10 sm:px-20 lg:px-32 bg-[#f6f7fc] xl:py-12 xl:px-40">
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
          <div className="flex flex-col gap-3">
						<label htmlFor="">Re-enter password</label>
						<input
							type="password"
							placeholder="Your password"
							className="auth-input text-base py-4 px-3 outline-none placeholder:text-[#848484]"
						/>
					</div>
					<Button primary type="submit">
						Register
					</Button>
					<Link href="/auth/login">
						<Button secondary type="button" className="w-full">
							Login
						</Button>
					</Link>
				</form>
			</div>
		</div>
	);
};

Register.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAuth>{page}</LayoutAuth>;
};

export default Register;
