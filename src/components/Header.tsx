import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'
import Tippy from '@tippyjs/react/headless';

import logoImg from '@/assets/images/logo.png'

const Header = () => {
	return (
		<div className="h-[70px] xl:px-16 xl:h-[110px]" id='home-header'>
			<div className='px-4 flex justify-between items-center h-full'>
        <div className='xl:hidden'>
          <FontAwesomeIcon icon={faBars} className='text-[28px] text-[#666] p-2 cursor-pointer' />
        </div>
  
        <Image src={logoImg} alt='logo' className='w-[100px] h-[50px] xl:w-[140px] xl:h-[70px] cursor-pointer'/>

        <div className='hidden xl:flex gap-8 text-base font-semibold items-center'>
          <span className='header-list-item'>HOME</span>
          <span className='header-list-item'>SHOP</span>
          <span className='header-list-item'>BLOG</span>
          <span className='header-list-item'>CONTACT US</span>
        </div>

        <div className='flex gap-8'>
          {/* wrap div to remove warning */}
          <div>
            <Tippy
              placement='bottom-end'
              interactive
              delay={[0, 300]}
              render={attrs => (
                <div className="cart-dropdown" tabIndex={-1} {...attrs}>
                  No products in cart
                </div>
              )}
            >
              <FontAwesomeIcon icon={faCartShopping} className='text-[22px] cursor-pointer' />
            </Tippy>
          </div>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='text-[22px] cursor-pointer' />
        </div>
      </div>
		</div>
	);
};

export default Header;
