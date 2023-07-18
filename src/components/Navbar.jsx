import React from "react";
import logoType from "../../public/logoType.svg";
import twitterIcon from "../../public/twitterIcon.svg";
import discordIcon from "../../public/discordIcon.svg";

const Navbar = () => {
  return (
    <nav className="bg-[#000000] bg-opacity-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 px-8">
          <div className="flex items-center h-12">
            <img
              className="h-8 w-8 cursor-pointer"
              src="../../public/transparentBGLogo.png"
              alt="Logo"
              onClick={() => {
                window.location.href = "https://www.satoshipunks.art/";
              }}
            />
            <img
              src={logoType}
              className="ml-2.5 cursor-pointer"
              onClick={() => {
                window.location.href = "https://www.satoshipunks.art/";
              }}
            ></img>
            {/* <div
              className="text-2xl px-2 ml-8 cursor-pointer select-none w-auto h-auto hidden md:block"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Raffle
            </div> */}
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
              <img
                src={twitterIcon}
                className="m-2.5 cursor-pointer"
                alt="Twitter icon"
                onClick={() => {
                  window.open("https://twitter.com/SatoshiPunksNFT/", "_blank");
                }}
              />
              <img
                src={discordIcon}
                className="m-2.5 cursor-pointer"
                alt="Discord icon"
                onClick={() => {
                  window.open("https://discord.gg/satoshipunksnft", "_blank");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
