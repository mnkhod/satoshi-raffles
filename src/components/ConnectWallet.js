import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import raffle from "../../raffleDetails.json";
import moment from "moment";

import Image from "next/image";

import {
  setConnected,
  setAddress,
  setAddresses,
  setNetwork,
  setInscriptions,
} from "../slices/mainSlice";

import CloseImg from "../../public/close.svg";

import { getAddress, signTransaction } from "sats-connect";

export default function ConnectWallet({ onClose }) {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div
          className="bg-defaultGray rounded-lg border border-lightGray w-fit md:w-[
          64
        ] p-6"
        >
          <div className="flex flex-col max-w-md">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">
                Connect a wallet to continue
              </h2>
              <Image
                src={CloseImg}
                className="cursor-pointer ml-6"
                alt="Close icon"
                onClick={onClose}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base">
                {`Choose how you want to connect. If you don't have a wallet, you
                can select a provider and create one.`}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base text-opacity-20 break-normal text-[#808080]">
                {`Using Hiro and Xverse wallets simultaneously causes issues with
                signing transactions and may lead to unexpected behavior. For a
                safe experience, disconnect from ME website and disable one of
                the wallets on your browser, as they interfere with each other's
                functions in the browser.`}
              </span>
            </div>
            <div className="flex flex-col justify-between items-center">
              <button
                className="mt-5 group/wallet p-3 h-full flex flex-row items-center justify-between w-full text-white-primary text-lg font-medium border-lightGray hover:bg-darkerLightGray hover:border-lightGray"
                onClick={handleXverseWalletClick}
              >
                <div className="flex items-center">
                  <Image
                    src="https://ord.cdn.magiceden.dev/static_resources/btc-xverse-logo.png"
                    alt="Xverse icon"
                    className="mr-3 rounded-lg w-8 h-8"
                    width="32"
                    height="32"
                  />
                  <div className="flex flex-col">
                    <span>Xverse</span>
                  </div>
                </div>
                <div className="relative group rounded-full border-[1px] border-gray-300 group-hover:border-pink-primary">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#e42575"
                    className="h-[10px] w-[10px] rounded-full m-[5px] text-transparent bg-transparent group-hover:bg-pink-primary group-hover:text-pink-primary"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              </button>
              <button
                className="mt-5 group p-3 h-full flex items-center justify-between w-full text-white-primary text-lg font-medium border-lightGray hover:bg-darkerLightGray hover:border-lightGray"
                onClick={handleUnisatWalletClick}
              >
                <div className="flex items-center">
                  <Image
                    src="https://creator-hub-prod.s3.us-east-2.amazonaws.com/dsadsadsadas_pfp_1678648465423.png"
                    alt="Unisat icon"
                    className="mr-3 rounded-lg w-8 h-8"
                    width="32"
                    height="32"
                  />
                  <div className="flex flex-col">
                    <span>Unisat</span>
                  </div>
                </div>
                <div className="relative group rounded-full border-[1px] border-gray-300 group-hover:border-pink-primary">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#e42575"
                    className="h-[10px] w-[10px] rounded-full m-[5px] text-transparent bg-transparent group-hover:bg-pink-primary group-hover:text-pink-primary"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              </button>
              <button
                className="mt-5 group p-3 h-full flex items-center justify-between w-full text-white-primary text-lg font-medium border-lightGray hover:bg-darkerLightGray hover:border-lightGray"
                onClick={handleHiroWalletClick}
              >
                <div className="flex items-center">
                  <Image
                    src="https://creator-hub-prod.s3.us-east-2.amazonaws.com/dsasdadsadsadsadsa_pfp_1678238217021.jpeg"
                    alt="Hiro icon"
                    className="mr-3 rounded-lg"
                    width="32"
                    height="32"
                  />
                  <div className="flex flex-col">
                    <span>Hiro</span>
                  </div>
                </div>
                <div className="relative group rounded-full border-[1px] border-gray-300 group-hover:border-pink-primary">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#e42575"
                    className="h-[10px] w-[10px] rounded-full m-[5px] text-transparent bg-transparent group-hover:bg-pink-primary group-hover:text-pink-primary"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  async function handleHiroWalletClick() {
    if (window.HiroWalletProvider) {
      const userAddresses = await window.btc?.request("getAddresses");
      console.log(userAddresses.result.addresses[1]);
    }
  }

  async function handleXverseWalletClick() {
    if (window.BitcoinProvider) {
      const getAddressOptions = {
        payload: {
          purposes: ["ordinals", "payment"],
          message: "Address for receiving Ordinals and payments",
          network: {
            type: "Mainnet",
          },
        },
        onFinish: (response) => {
          console.log(response);
        },
        onCancel: () => alert("Request canceled"),
      };

      await getAddress(getAddressOptions);
    }
  }

  async function handleUnisatWalletClick() {
    if (window.unisat) {
      unisat.requestAccounts().then((accounts) => {
        console.log(accounts);
        dispatch(setConnected(true));
        dispatch(setAddress(accounts[0]));
        dispatch(setAddresses(accounts));
        console.log(account.address);
        window.localStorage.setItem("connectedAddress", accounts[0]);
        window.localStorage.setItem("lastSession", moment().valueOf());
        console.log(window.localStorage);
      });
    } else {
      window.open("https://unisat.io/", "_blank");
    }
  }
}
