import React from "react";
import FooterCol1 from "./footer-col1";
import FooterCol2 from "./footer-col2";
import FooterCol3 from "./footer-col3";
import FooterCol4 from "./footer-col4";

function Footer() {
  return (
    <div className="bg-[#202020] w-full p-7 pt-14 min-h-[429px] gap-28 flex flex-wrap items-start justify-center mt-32">
      <FooterCol1 />
      <FooterCol2 />
      <FooterCol3 />
      <FooterCol4 />
    </div>
  );
}

export default Footer;
