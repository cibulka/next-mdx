import React from 'react';

const Footer = () => {
  return (
    <footer className="coat-menu">
      <div className={['app-max-w-content', 'flex items-center justify-center', 'py-4'].join(' ')}>
        <a href="mailto:cibulka.me@gmail.com" className="text-blue-500 underline">
          cibulka.me@gmail.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
