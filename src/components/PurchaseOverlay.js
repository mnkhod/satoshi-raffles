import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Image from "next/image";

import CloseImg from "../../public/close.svg";
import raffle from "../../raffleDetails.json";

import axios from "axios";

const PurchaseOverlay = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [inscriptions, setInscriptions] = useState([]);

  const [selectedToken, setSelectedToken] = useState(null);
  const [transferableInscriptions, setTransferableInscriptions] = useState([]);

  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      getBalance();
    }
  }, [isOpen]);

  async function getBalance() {
    let result = [];
    try {
      const response = await axios({
        method: "get",
        params: {
          address: account.address,
          // address: "16G1xYBbiNG78LSuZdMqp6tux5xvVp9Wxh",
          limit: 50,
        },
        headers: {
          "OK-ACCESS-KEY": process.env.OKLINK_API_KEY,
        },
        url: `https://www.oklink.com/api/v5/explorer/btc/address-balance-list`,
      });
      const balanceDatas = response.data.data;
      for (let i = 0; i < balanceDatas.length; i++) {
        for (let j = 0; j < parseInt(balanceDatas[i].totalPage); j++) {
          for (let k = 0; k < balanceDatas[i].balanceList.length; k++) {
            if (balanceDatas[i].balanceList[k].tokenType == "BRC20") {
              let token = balanceDatas[i].balanceList[k].token;
              let tokenExists = result.find((obj) => obj.token === token);
              if (tokenExists) {
                tokenExists.balance += parseInt(
                  balanceDatas[i].balanceList[k].balance
                );
              } else {
                result.push({
                  token: token,
                  balance: parseInt(balanceDatas[i].balanceList[k].balance),
                  availableBalance: parseInt(
                    balanceDatas[i].balanceList[k].availableBalance
                  ),
                  transferBalance: parseInt(
                    balanceDatas[i].balanceList[k].transferBalance
                  ),
                });
              }
            }
          }
        }
      }
      setInscriptions(result);
    } catch (e) {
      console.log(e);
    }
  }

  async function getTransferableInscriptions(ticker) {
    try {
      let result = [];
      const response = await axios({
        method: "get",
        params: {
          address: account.address,
          // address: "16G1xYBbiNG78LSuZdMqp6tux5xvVp9Wxh",
          limit: 50,
          token: ticker,
        },
        headers: {
          "OK-ACCESS-KEY": process.env.OKLINK_API_KEY,
        },
        url: `https://www.oklink.com/api/v5/explorer/btc/address-balance-details`,
      });
      const balanceDetails = response.data.data;
      for (let i = 0; i < balanceDetails.length; i++) {
        for (let j = 0; j < balanceDetails[i].transferBalanceList.length; j++) {
          result.push({
            amount: balanceDetails[i].transferBalanceList[j].amount,
            inscriptionId:
              balanceDetails[i].transferBalanceList[j].inscriptionId,
            inscriptionNumber:
              balanceDetails[i].transferBalanceList[j].inscriptionNumber,
          });
        }
      }
      setTransferableInscriptions(result);
    } catch (e) {
      console.log(e);
    }
  }

  function handleInscriptionClick(ticker) {
    setSelectedToken(ticker);
    getTransferableInscriptions(ticker);
  }

  async function transferInscription(inscriptionId) {
    try {
      let { txid } = await window.unisat.sendInscription(
        raffle.userAddress,
        inscriptionId
      );
      console.log(txid);
    } catch (error) {
      console.log(error);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-scroll">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-defaultGray p-4 rounded-lg shadow-md z-10 border border-lightGray">
        <div className="flex justify-between items-center select-none">
          <h2 className="text-lg font-semibold mb-2">Balances:</h2>
          <Image
            src={CloseImg}
            className="cursor-pointer ml-6"
            alt="Close icon"
            onClick={onClose}
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {inscriptions.map((item) => (
            <button
              className="flex flex-col items-center"
              onClick={() => handleInscriptionClick(item.token)}
            >
              <div className="flex justify-start">
                <span>{item.token}</span>
              </div>
              <div className="flex justify-between text-sm text-lightGray">
                <span>Transferable: </span>
                <span>{item.transferBalance}</span>
              </div>
              <div className="flex justify-between text-sm text-lightGray">
                <span>Available: </span>
                <span>{item.availableBalance}</span>
              </div>
              <div className="w-full h-0.5 bg-lightGray"></div>
              <div className="flex justify-between text-sm text-lightGray">
                <span>Balance: </span>
                <span>{item.balance}</span>
              </div>
            </button>
          ))}
        </div>
        {selectedToken ? (
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Transferable {selectedToken}:
            </h2>
            <div className="grid grid-cols-4 gap-4 text-sm text-lightGray">
              {transferableInscriptions.map((item) => (
                <div className="flex flex-col text-sm text-lightGray">
                  <button
                    className="flex flex-col items-center"
                    onClick={() => transferInscription(item.inscriptionId)}
                  >
                    <span>Amount: </span>
                    <span>{item.amount}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <span>Select a token to transfer</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseOverlay;
