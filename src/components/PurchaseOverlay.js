import React, { useEffect, useState } from "react";

import axios from "axios";

const PurchaseOverlay = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [inscriptions, setInscriptions] = useState([]);

  useEffect(() => {
    if (isOpen) {
      getBalance();
    }
  }, [isOpen]);

  async function getBalance() {
    let result = [];
    try {
      let res = await window.unisat.getInscriptions();
      // filter by type
      for (let i = 0; i < res.list.length; i++) {
        if (res.list[i].contentType == "text/plain;charset=utf-8") {
          const response = await axios.get(res.list[i].content);
          result.push({
            amt: response.data.amt,
            op: response.data.op,
            p: response.data.p,
            tick: response.data.tick,
          });
        }
      }
      setInscriptions(result);
    } catch (e) {
      console.log(e);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-defaultGray p-4 rounded shadow-md z-10">
        <h2 className="text-lg font-semibold mb-2">Balance:</h2>
        {inscriptions.map((item) => (
          <button className="flex flex-col items-center">
            <div className="flex justify-between">
              <span>Ticker:</span>
              <span className="text-base">{item.tick}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount:</span>
              <span className="text-base">{item.amt}</span>
            </div>
          </button>
        ))}
        <button
          className="text-base bg-defaultGray border-lightGray px-[16px] py-[12px] h-[48px] w-full md:w-auto hover:bg-darkerLightGray hover:border-lightGray"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PurchaseOverlay;
