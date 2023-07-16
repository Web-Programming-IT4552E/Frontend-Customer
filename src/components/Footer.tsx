import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Logo from '@/assets/images/logo.png';

const Footer = () => {
  return (
    <div className='container' id='footer'>
      <div className='mx-auto grid grid-cols-1 gap-[32px] md:grid-cols-2 xl:grid-cols-4'>
        <div id='logo-and-socials'>
          <p>
            <Image
              className='mb-[15px]'
              src={Logo}
              alt='footer-logo'
              loading='lazy'
              width={140}
              height={70}
            />
          </p>
          <p className='mb-[15px] text-medium_gray'>Beauty Haven: Your Beauty, Our Passion</p>
          <div className='pt-[7px]' id='socials'>
            <a className='mr-[20px] text-medium_gray'>
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a className='mr-[20px] text-medium_gray'>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a className='mr-[20px] text-medium_gray'>
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a className='mr-[20px] text-medium_gray'>
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
        <div id='contact'>
          <h3 className='widget-text'>Contact</h3>
          <ul>
            <li>Đại Học Bách Khoa Hà Nội</li>
            <li>Môn học: Web Programming</li>
            <li>ICT 03 - K64 - Group 4</li>
            <li>
              <a href='https://uray.store'>uray.store</a>
            </li>
          </ul>
        </div>
        <div id='profile'>
          <h3 className='widget-text'>Profile</h3>
          <ul>
            <li>
              <Link href='/profile'>My Account</Link>
            </li>
            <li>
              <Link href='/order'>Checkout</Link>
            </li>
          </ul>
        </div>
        <div id='newsletter'>
          <h3 className='widget-text'>Newsletter</h3>
          <ul>
            <li>Subcribe to our newsletter</li>
            <li>
              <div className='email'>
                <input type='email' name='EMAIL' placeholder='Your e-mail...' />
                <button className='bg-[#666] py-[7px] px-[10px] text-white hover:bg-black'>
                  Send
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
