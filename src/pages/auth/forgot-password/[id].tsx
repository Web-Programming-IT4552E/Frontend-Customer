import Link from "next/link";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/dist/client/router";
import { LoadingOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as authService from "@/services/authService";

const VerifyActiveToken = () => {
	const router = useRouter();
	const [isSuccess, setIsSuccess] = useState(false);
	const [isUpdatePassWord, setIsUpdatePassWord] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [activeToken, setActiveToken] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");

	const handleUpdatePassword = async (event: FormEvent) => {
		event.preventDefault();

		if (password !== rePassword) {
			toast.error("Password not the same!", {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 1500,
				pauseOnHover: false,
			});
		} else {
			const response = await authService.updatePassword({
				active_token: activeToken,
				new_password: password,
				confirm_new_password: rePassword,
			});
			console.log(response);

			switch (response.status) {
				case 200:
				case 201:
					toast.success(response.data.message, {
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 1500,
						pauseOnHover: false,
						onClose: () => setIsUpdatePassWord(true)
					});
					break;
				default:
					toast.error(response.data.message, {
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 1500,
						pauseOnHover: false,
					});
					break;
			}
		}
	};

	useEffect(() => {
		const verifyPassword = async (id: string) => {
			setIsLoading(true);
			setActiveToken(id);

			const response = await authService.verifyForgotPassword(id);
			console.log(response);

			if (response.status === 200 || response.data === 201) {
				setIsSuccess(true);
			}

			setIsLoading(false);
		};

		if (router.isReady) {
			const { id } = router.query;
			verifyPassword(id as string);
		}
	}, [router]);

  useEffect(() => {
    if (isUpdatePassWord) {
      const timerId = setTimeout(() => {
        router.push('/auth/login');
      }, 1500);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [isUpdatePassWord]);

	return (
		<>
			<div
				id="verify-forgot-password"
				className="flex flex-col justify-center items-center gap-10 py-6 sm:px-20 sm:py-12 lg:px-40 lg:py-20"
			>
				<div className="flex flex-col items-center justify-center w-[80%] gap-6 px-6 py-6 bg-primary-color xl:w-[60%]">
					{isLoading ? (
						<LoadingOutlined />
					) : (
						<>
							<h1 className="mb-0 text-[32px] text-center font-bold">
								Verify forgot password {isSuccess ? "successfully" : "failed"}!
							</h1>
							{isSuccess ? (
								<p className="mb-0 text-[20px]">Please change your password</p>
							) : (
								<Link
									href="/"
									className="px-4 py-4 bg-black text-white font-semibold hover:opacity-80"
								>
									Return to home
								</Link>
							)}
						</>
					)}
				</div>
				{isSuccess && (
					<form
						className="flex flex-col gap-6 items-center justify-center w-[80%] xl:w-[60%]"
						onSubmit={handleUpdatePassword}
					>
						<div className="flex flex-wrap gap-3 items-center w-full">
							<label className="text-base font-semibold sm:w-[40%]">
								New password:
							</label>
							<input
								value={password}
								type="text"
								placeholder="Your password..."
								className="flex-1 auth-input p-3 text-base outline-none border border-solid border-[#ccc] placeholder:text-[#848484]"
								onChange={(event) => setPassword(event.target.value)}
							/>
						</div>
						<div className="flex flex-wrap gap-3 items-center w-full">
							<label className="text-base font-semibold sm:w-[40%]">
								Confirm new password:{" "}
							</label>
							<input
								value={rePassword}
								type="text"
								placeholder="Re-enter your password..."
								className="flex-1 auth-input p-3 text-base outline-none border border-solid border-[#ccc] placeholder:text-[#848484]"
								onChange={(event) => setRePassword(event.target.value)}
							/>
						</div>
						<button
							type="submit"
							className="py-[14px] px-8 text-base text-white font-semibold bg-black hover:opacity-70"
						>
							Submit
						</button>
					</form>
				)}
			</div>
			<ToastContainer />
		</>
	);
};

export default VerifyActiveToken;
