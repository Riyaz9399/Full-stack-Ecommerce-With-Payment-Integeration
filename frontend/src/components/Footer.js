import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-20 mb-10  font-semibold relative w-full">
      <div className="container mx-auto px-4  flex flex-col md:flex-row justify-between items-center">
        {/* Left content */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-slate-800">
            <span className="font-bold text-xl">&copy;</span> {new Date().getFullYear()} Your Company Name. All Rights Reserved.
          </p>
          <p className="text-blue-600">
            Contact us at: example@example.com | +91 1234567890
          </p>
        </div>

        {/* Right content */}
        <div className="text-center">
          <p className="text-red-600 font-medium">
            Follow us on: 
            <a href="https://github.com/Riyaz9399" className="ml-2 text-slate-900">GITHUB</a>, 
            <a href="https://www.linkedin.com/in/sakshi-k-aa267725b/" className="ml-2 text-blue-600">LINKEDIN</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
