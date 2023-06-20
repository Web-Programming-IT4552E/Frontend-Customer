import React from "react";
import Logo from "@/assets/images/logo.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="container" id="footer">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[32px] mx-auto">
        <div id="logo-and-socials">
          <p>
            <Image
              className="mb-[15px]"
              src={Logo}
              alt="footer-logo"
              loading="lazy"
              width={140}
              height={70}
            />
          </p>
          <p className="mb-[15px] text-medium_gray">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut.
          </p>
          <div className="pt-[7px]" id="socials">
            <a className="text-medium_gray mr-[20px]">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a className="text-medium_gray mr-[20px]">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a className="text-medium_gray mr-[20px]">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a className="text-medium_gray mr-[20px]">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
        <div id="contact">
          <h3 className="widget-text">Contact</h3>
          <ul>
            <li>No 40 Baria Sreet 133/2</li>
            <li>+ (156) 1800-366-6666</li>
            <li>Eric-82@example.com</li>
            <li>
              <a href="https://uray.physcode.com">uray.physcode.com</a>
            </li>
          </ul>
        </div>
        <div id="profile">
          <h3 className="widget-text">Profile</h3>
          <ul>
            <li><a>My Account</a></li>
            <li><a>Checkout</a></li>
            <li><a>Order Tracking</a></li>
            <li><a>Help & Support</a> </li>
          </ul>
        </div>
        <div id="newsletter">
          <h3 className="widget-text">Newsletter</h3>
          <ul>
            <li>Subcribe to our newsletter</li>
            <li>
            <div className="email">
              <input type="email" name="EMAIL" placeholder="Your e-mail..."/>
              <button className="bg-[#666] text-white py-[7px] px-[10px] hover:bg-black">Send</button>
            </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
