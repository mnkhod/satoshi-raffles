import Image from "next/image";

import discordIcon from "../../public/discordIcon.svg";
import logoType from "../../public/logoType.svg";
import transparentLogo from "../../public/transparentLogo.png";
import twitterIcon from "../../public/twitterIcon.svg";

import ConnectWalletButton from "./ConnectWalletButton";

export default function Navbar() {
  return (
    <>
      <nav className="bg-[#000000] bg-opacity-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 px-8">
            <div className="flex items-center h-12 select-none">
              <Image
                className="h-8 w-8 cursor-pointer"
                src={transparentLogo}
                alt="Logo"
                onClick={() => {
                  window.location.href = "https://www.satoshipunks.art/";
                }}
              />
              <Image
                src={logoType}
                className="ml-2.5 cursor-pointer"
                onClick={() => {
                  window.location.href = "https://www.satoshipunks.art/";
                }}
                alt="Logo type"
              />
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-8">
                <div className="flex flex-row">
                  <Image
                    src={twitterIcon}
                    className="m-2.5 cursor-pointer"
                    alt="Twitter icon"
                    onClick={() => {
                      window.open(
                        "https://twitter.com/SatoshiPunksNFT/",
                        "_blank"
                      );
                    }}
                  />
                  <Image
                    src={discordIcon}
                    className="m-2.5 cursor-pointer"
                    alt="Discord icon"
                    onClick={() => {
                      window.open(
                        "https://discord.gg/satoshipunksnft",
                        "_blank"
                      );
                    }}
                  />
                </div>

                <div className="hidden md:block">
                  <ConnectWalletButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
