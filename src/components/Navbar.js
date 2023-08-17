import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

import logoType from "../../public/logoType.svg";
import transparentLogo from "../../public/transparentLogo.png";
import twitterIcon from "../../public/twitterIcon.svg";
import discordIcon from "../../public/discordIcon.svg";

import ConnectWallet from "./ConnectWallet";

export default function Navbar({
  onConnect,
  onDisconnect,
  addressConnected,
  connectedAddress,
}) {
  const [showConnectWallet, setShowConnectWallet] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleConnectWallet = () => {
    setShowConnectWallet(!showConnectWallet);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  async function handleProfileClick() {
    try {
      let res = await window.unisat.getInscriptions(0, 1000);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      {showConnectWallet && (
        <ConnectWallet
          onClose={toggleConnectWallet}
          handleConnect={onConnect}
          handleDisconnect={onDisconnect}
          addressConnected={addressConnected}
          connectedAddress={connectedAddress}
        />
      )}
      <nav className="bg-[#000000] bg-opacity-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 px-8">
            <div className="flex items-center h-12">
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
                {/* {addressConnected ? (
                  <>
                    <div
                      ref={dropdownRef}
                      className="relative inline-block text-left"
                    >
                      <button
                        className="text-base rounded-lg bg-darkerLightGray border-lightGray hover:bg-defaultGray hover:border-lightGray"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {connectedAddress.slice(0, 6) +
                          "..." +
                          connectedAddress.slice(38, 42)}
                      </button>
                      {isOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div
                            className="py-1"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                          >
                            <span
                              href="#"
                              className="block px-4 py-2 text-base bg-darkerLightGray border-lightGray hover:bg-defaultGray hover:border-lightGray"
                              role="menuitem"
                              onClick={handleProfileClick}
                            >
                              Profile
                            </span>
                            <span
                              href="#"
                              className="block px-4 py-2 text-base bg-darkerLightGray border-lightGray hover:bg-defaultGray hover:border-lightGray cursor-pointer"
                              role="menuitem"
                              onClick={onDisconnect}
                            >
                              Log out
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <button
                    className="text-base rounded-lg bg-darkerLightGray border-lightGray hover:bg-defaultGray hover:border-lightGray"
                    onClick={toggleConnectWallet}
                  >
                    Connect Wallet
                  </button>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
