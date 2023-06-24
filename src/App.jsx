import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tokens, setTokens] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(-1);
  const [searchWallet, setSearchWallet] = useState("");

  const [state, setState] = useState([]);

  useEffect(() => {
    getAddressDetail();
  }, []);

  async function getAddressDetail() {
    try {
      let userAddress =
        "bc1pm3pta3ameq47c5cdp036mwq23ca6th0jrvt7a5ehy76fu98g82asgks6lz";
      let tokenTicker = "BTOC";
      let ticketPrice = 100;
      // let startBlock = 1687030997;

      let response = await axios({
        method: "get",
        url: `https://unisat.io/brc20-api-v2/address/${userAddress}/brc20/${tokenTicker}/history?start=0&limit=512&type=receive`,
      });

      if (response.data.msg == "ok") {
        let tokenData = response.data.data;
        let resultTransfers = tokenData.detail;
        let result = [{}];
        for (let i = 0; i < resultTransfers.length; i++) {
          // if (resultTransfers.blocktime < startBlock) continue;
          let user = resultTransfers[i].from;
          let amount = parseInt(resultTransfers[i].amount);
          let userExists = result.find((obj) => obj.from === user);
          if (userExists) {
            userExists.amount += amount;
            userExists.ticket = Math.floor(userExists.amount / ticketPrice);
          } else {
            result[i] = {
              from: user,
              amount: amount,
              ticket: Math.floor(amount / ticketPrice),
            };
          }
        }
        result.sort((a, b) => b.ticket - a.ticket);
        setTokens(result);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleClick = (address, index) => {
    navigator.clipboard.writeText(address);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(-1);
    }, 3000);
  };

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const handleSearch = () => {
    setSearchWallet(state.searchWallet);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="py-[48px] md:py-0 px-[40px] w-full grid grid-cols-1 gap-[24px] justify-start items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
        <div className="rounded-lg order-2 md:order-1 border">
          <img
            className="rounded-lg"
            src="https://ordinals.com/content/adebf9b98d0f4cc8f48b211655f548fb662d3cff7a630359e1fffb0c60275800i0"
          ></img>
          <button
            onClick={() =>
              window.open(
                "https://ordinals.com/inscription/adebf9b98d0f4cc8f48b211655f548fb662d3cff7a630359e1fffb0c60275800i0",
                "_blank"
              )
            }
          >
            View Inscription
          </button>
        </div>

        <div className="order-1 md:order-2 flex flex-col gap-3 col-span-2">
          <h1 className="text-[48px]">Satoshi Pit Beta</h1>
          <p>
            A place to partake in the raffles of unique and abstract Ordinal
            Artefacts, powered by BRC20.
          </p>
          <div>
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl">How to enter</h2>
              <p>
                Purchase a ticket by clicking ‘Buy tickets’ and following the
                instructions. Once the transaction is confirmed, your tickets
                will be credited to the wallet address you deposited with, you
                can paste your wallet into the search bar under the leaderboard
                to show total tickets in your account.
              </p>
              <p>For more detailed instructions, take a look at our guide.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
        <div className="rounded-lg flex flex-col border">
          <div className="p-[24px] border border-b-2 border-x-0 border-y-0">
            <h1 className="text-[18px] font-semibold">Inscription Details</h1>
          </div>
          <ul className="px-[24px]">
            <li className="flex justify-between py-[16px]">
              <h5>ID</h5>
              <p>1119</p>
            </li>
            <li className="flex justify-between py-[16px]">
              <h5>Number</h5>
              <p>1119</p>
            </li>
            <li className="flex justify-between py-[16px]">
              <h5>Owner</h5>
              <p>0x...C544</p>
            </li>
            <li className="flex justify-between py-[16px]">
              <h5>Set Rarity</h5>
              <p>5%</p>
            </li>
          </ul>
        </div>

        <div className="rounded-lg p-[24px] flex flex-col border gap-[24px]">
          <h1 className="text-[28px]">BTC Annons | Artefacts</h1>
          <p>
            The king of $OXBT, the BitGod21 Annon onboarded masses in their
            thousands to the Ordinals Ecosystem. He is a treasured artefact
            inscribed into a treasured sat.
          </p>
          <div className="w-full h-0.5 bg-gray-300"></div>
          <div className="grid grid-cols-2">
            <div>
              <p>Price per ticket</p>
              <h2>100 OXBT</h2>
            </div>
            <div>
              <p>Tickets purchased</p>
              <h2>
                {tokens.length > 0 &&
                  tokens.reduce((a, b) => a + (b["ticket"] || 0), 0)}
              </h2>
            </div>
          </div>
          <div className="w-full h-0.5 bg-gray-300"></div>
          <div className="grid grid-cols-2">
            <div>
              <p>Raffle ends in:</p>
              <h4>25H : 34M : 37S</h4>
            </div>
            <div>
              <button>Buy tickets</button>
            </div>
          </div>
        </div>

        <div className="rounded-lg flex flex-col gap-[24px] p-[24px] border">
          <h1 className="text-[28px]">Leaderboard</h1>
          <div className="flex">
            <input
              type="text"
              name="searchWallet"
              className="grow border-2"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div>
            <ul className="border">
              <li className="flex justify-between border border-b-2 border-x-0 border-y-0 p-[24px]">
                <h5>Wallet</h5>
                <h5>Tickets</h5>
              </li>
              <div className="h-40 max-h-40 overflow-y-auto">
                {tokens.length > 0 &&
                  tokens
                    .filter((token) =>
                      token.from
                        .toLowerCase()
                        .includes(searchWallet.toLowerCase())
                    )
                    .map((token, key) => (
                      <li className="p-[24px] flex justify-between" key={key}>
                        <a
                          className="cursor-pointer"
                          onClick={() => handleClick(token.from, key)}
                        >
                          {token.from.substring(0, 4) +
                            "..." +
                            token.from.substring(token.from.length - 4)}
                        </a>
                        <p>{token.ticket}</p>
                        {copiedIndex === key && (
                          <div className="absolute top-2 right-2">
                            <div className="alert alert-success">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span>Address Copied!</span>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
