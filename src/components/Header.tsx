import React, { FormEvent, useState } from "react";
import {
	HiOutlineShoppingBag,
	HiMagnifyingGlass,
	HiOutlineXMark,
	HiBars3,
	HiOutlineUserGroup,
	HiOutlineUserPlus,
	HiOutlineUserCircle,
} from "react-icons/hi2";
import { HiLogin } from "react-icons/hi";
import Image from "next/image";
import Tippy from "@tippyjs/react/headless";
import Link from 'next/link'

import logoImg from "@/assets/images/logo.png";

const Header = () => {
	const [searchInput, setSearchInput] = useState("");

	const isLogin = false; // fake login state

	const handleSearchCloseIcon = () => {
		const searchElement = document.querySelector("#home-header .header-search");
		const classList = searchElement?.classList;

		if (classList?.contains("top-0")) {
			classList.remove("top-0", "xl:top-0");
			classList?.add("top-[-70px]", "xl:top-[-110px]");
		} else {
			classList?.remove("top-[-70px]", "xl:top-[-110px]");
			classList?.add("top-0", "xl:top-0");
		}
	};

	const handleSubmitSearch = (event: FormEvent) => {
		event.preventDefault();
		console.log(event.target);
	};

	const handleSubMenu = () => {
		const subMenu = document.getElementById("header-sub-menu");

		if (subMenu?.classList.contains("top-[-121px]")) {
			subMenu.classList.remove("top-[-121px]");
			subMenu.classList.add("top-[70px]");
		} else {
			subMenu?.classList.remove("top-[70px]");
			subMenu?.classList.add("top-[-121px]");
		}
	};

	return (
		<div className="relative h-[70px] xl:h-[110px]" id="home-header">
			<div className="absolute left-0 right-0 top-0 z-20 bg-white px-4 flex justify-between items-center h-full xl:px-20">
				<div className="xl:hidden" onClick={handleSubMenu}>
					<HiBars3 className="text-[50px] text-[#666] p-2 cursor-pointer" />
				</div>

				<Image
					src={logoImg}
					alt="logo"
					className="w-[100px] h-[50px] xl:w-[140px] xl:h-[70px] cursor-pointer"
				/>

				<div className="hidden xl:flex gap-8 text-base font-semibold items-center">
					<Link href="/" className="header-list-item">HOME</Link>
					<Link href="/product/all" className="header-list-item">SHOP</Link>
					<Link href="/" className="header-list-item">BLOG</Link>
					<Link href="/" className="header-list-item">CONTACT US</Link>
				</div>

				<div className="flex gap-8 items-center">
					{/* wrap div to remove warning */}
					<div>
						<Tippy
							placement="bottom-end"
							interactive
							delay={[0, 300]}
							render={(attrs) => (
								<div
									className="w-[330px] mt-1 px-3 py-6 text-center bg-white tippy-dropdown"
									tabIndex={-1}
									{...attrs}
								>
									No products in cart
								</div>
							)}
						>
							<div>
								<HiOutlineShoppingBag className="text-[24px] cursor-pointer" />
							</div>
						</Tippy>
					</div>
					<HiMagnifyingGlass
						className="text-[26px] cursor-pointer"
						onClick={handleSearchCloseIcon}
					/>
					<div>
						<Tippy
							placement="bottom-end"
							interactive
							delay={[0, 300]}
							render={(attrs) => (
								<div
									className="tippy-dropdown min-w-[160px] mt-1 bg-white"
									tabIndex={-1}
									{...attrs}
								>
									<ul className="mb-0">
										{isLogin ? (
											<>
                        <h1>Nothing</h1>
                      </>
										) : (
											<>
												<li className="flex gap-4 items-center cursor-pointer px-4 py-[10px] border-b-[1px] border-solid border-[#d3d0d0] hover:bg-[#eee8e8]">
													<span className="flex-1">Login</span>
													<HiLogin className="text-[#666] text-[18px]" />
												</li>
												<li className="flex gap-4 items-center cursor-pointer px-4 py-[10px] hover:bg-[#eee8e8]">
													<span className="flex-1">Sign up</span>
													<HiOutlineUserPlus className="text-[#666] text-[18px]" />
												</li>
											</>
										)}
									</ul>
								</div>
							)}
						>
							<div>
								{isLogin ? (
									<HiOutlineUserCircle className="text-[27px] cursor-pointer" />
								) : (
									<HiOutlineUserGroup className="text-[27px] cursor-pointer" />
								)}
							</div>
						</Tippy>
					</div>
				</div>
			</div>

			<div
				id="header-sub-menu"
				className="absolute top-[-121px] left-0 right-0 z-10 bg-white transition-all duration-300 ease-linear"
			>
				<ul className="mb-0">
					<li className="px-8 py-4 text-[15px] font-semibold cursor-pointer border-t-[1px] border-[#e9e9e9] border-solid">
						HOME
					</li>
					<li className="px-8 py-4 text-[15px] font-semibold cursor-pointer border-t-[1px] border-[#e9e9e9] border-solid">
						SHOP
					</li>
					<li className="px-8 py-4 text-[15px] font-semibold cursor-pointer border-t-[1px] border-[#e9e9e9] border-solid">
						BLOG
					</li>
					<li className="px-8 py-4 text-[15px] font-semibold cursor-pointer border-t-[1px] border-[#e9e9e9] border-solid">
						CONTACT US
					</li>
				</ul>
			</div>

			<div className="header-search top-[-70px] xl:top-[-110px]">
				<form
					className="flex-1 flex items-center"
					onSubmit={handleSubmitSearch}
				>
					<input
						type="text"
						value={searchInput}
						onChange={(e) => {
							setSearchInput(e.target.value);
						}}
						placeholder="Search Here ..."
						className="flex-1 text-base pr-4 py-[10px] placeholder:text-black border-b-[1px] border-black border-solid outline-none"
					/>
					<button type="submit" className="p-4">
						<HiMagnifyingGlass className="text-[28px] cursor-pointer" />
					</button>
				</form>
				<HiOutlineXMark
					onClick={handleSearchCloseIcon}
					className="p-1 text-[38px] cursor-pointer"
				/>
			</div>
		</div>
	);
};

export default Header;
