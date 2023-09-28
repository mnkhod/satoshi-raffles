import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useRouter } from "next/router";

import axios from "axios";

export default function Profile() {
  const router = useRouter();

  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const slug = router.query.addr;

  useEffect(() => {
    router.isReady && getInscriptions();
  }, [router.isReady]);

  async function getInscriptions() {
    try {
      setLoading(true);
      let response = await axios({
        method: "get",
        headers: {
          "OK-ACCESS-KEY": process.env.OKLINK_API_KEY,
        },
        url: `https://www.oklink.com/api/v5/explorer/btc/address-balance-list?address=${slug}`,
      });

      if (response.data.msg == "") {
        let inscriptionDatas = response.data.data;
        console.log(inscriptionDatas);
        let result = [];

        if (inscriptionDatas.length == 0) return;
        for (let i = 0; i < inscriptionDatas.length; i++) {
          for (let j = 0; j < parseInt(inscriptionDatas[i].totalPage); j++) {
            for (let k = 0; k < inscriptionDatas[i].balanceList.length; k++) {
              {
                result.push({
                  name: inscriptionDatas[i].balanceList[k].token,
                  availableBalance:
                    inscriptionDatas[i].balanceList[k].availableBalance,
                  transferBalance:
                    inscriptionDatas[i].balanceList[k].transferBalance,
                  balance: inscriptionDatas[i].balanceList[k].balance,
                });
              }
            }
          }
        }
        setInscriptions(result);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="py-[48px] md:py-[64px] px-4 md:px-[40px] w-full grid grid-cols-1 gap-8 justify-start items-center">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex md:flex-row flex-col gap-9">
            {slug?.slice(0, 6) +
              "..." +
              slug?.slice(slug?.length - 4, slug?.length)}
          </div>
        </div>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              BRC-20:
              <div className="grid grid-cols-5 gap-4 text-white">
                {inscriptions?.map((inscription, index) => (
                  <div key={index}>
                    <button className="flex flex-col border border-white p-6">
                      <div className="flex justify-between">
                        <div>{inscription.name}</div>
                      </div>
                      <div className="flex justify-between text-sm text-lightGray">
                        <div>Transferable: </div>
                        <div>{inscription.transferBalance}</div>
                      </div>
                      <div className="flex justify-between text-sm text-lightGray">
                        <div>Available: </div>
                        <div>{inscription.availableBalance}</div>
                      </div>
                      <div className="w-full h-0.5 bg-lightGray"></div>
                      <div className="flex justify-between text-sm text-lightGray">
                        <div>Balance: </div>
                        <div>{inscription.balance}</div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
