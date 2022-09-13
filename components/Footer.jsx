import React from 'react';
import Link from 'next/link';
import {AiOutlineTwitter, AiFillInstagram} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 React Headphones All rights reserved</p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer