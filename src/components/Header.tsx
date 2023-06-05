import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'
import Tippy from '@tippyjs/react/headless';

import logoImg from '@/assets/images/logo.png'

const Header = () => {
	return (
		<div className="h-[110px] px-16" id='home-header'>
			<div className='px-4 flex justify-between items-center h-full'>
        <Image src={logoImg} alt='logo' className='w-[140px] h-[70px]'/>

        <div className='flex gap-8 text-base font-semibold items-center'>
          <span className='header-list-item'>HOME</span>
          <span className='header-list-item'>SHOP</span>
          <span className='header-list-item'>BLOG</span>
          <span className='header-list-item'>CONTACT US</span>
        </div>

        <div className='flex gap-6'>
          {/* wrap div to remove warning */}
          <div>
            <Tippy
              placement='bottom-end'
              interactive
              render={attrs => (
                <div className="cart-dropdown" tabIndex={-1} {...attrs}>
                  No products in cart
                </div>
              )}
            >
              <FontAwesomeIcon icon={faCartShopping} className='text-xl cursor-pointer' />
            </Tippy>
          </div>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='text-xl cursor-pointer' />
        </div>
      </div>
		</div>
	);
};

export default Header;
