import Image from "next/image";

import logo from "@/../public/logo.png";

const Header = () => {
  return (
    <div className="bg-[#FEFEFE] rounded-xs px-4 py-6 shadow-xs">
      <Image
        src={logo}
        alt="logo de la empresa <box>"
        className="border-r border-gray-300 pr-6 w-36"
        priority
      />
    </div>
  );
};

export default Header;
