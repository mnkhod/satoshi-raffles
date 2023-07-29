import { useEffect, useState } from "react";
import raffle from "../../raffleDetails.json";
import moment from "moment";
import Button from "./Button";

export default function Leaderboard({ tokens, getAddressDetail }) {
  const [lastUpdated, setLastUpdated] = useState(moment());
  const [timeDifference, setTimeDifference] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(-1);
  const [searchWallet, setSearchWallet] = useState("");

  const [state, setState] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = moment();
      const diff = currentTime.diff(lastUpdated);
      const duration = moment.duration(diff);
      const hours = duration.hours().toString().padStart(2, "0");
      const minutes = duration.minutes().toString().padStart(2, "0");
      const seconds = duration.seconds().toString().padStart(2, "0");
      const formattedDiff = `${hours}H:${minutes}M:${seconds}S ago`;
      setTimeDifference(formattedDiff);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [lastUpdated]);

  const handleLeaderboardWalletClick = (address, index) => {
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
    if (state.searchWallet === undefined) return;
    setSearchWallet(state.searchWallet);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleRefreshButtonClick = () => {
    getAddressDetail();
    setLastUpdated(moment());
  };

  return (
    <>
      <div className="rounded-lg flex flex-col gap-[24px] p-[24px] border border-lightGray bg-defaultGray">
        <h1 className="text-3xl">Participants</h1>

        <div className="flex items-center justify-between">
          <p className="text-base">Last updated: {timeDifference}</p>
          <button
            onClick={handleRefreshButtonClick}
            className="bg-inherit p-0 border-none"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5374 17.5674C14.7844 19.0831 12.4993 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 12.1361 19.3302 14.1158 18.1892 15.7406L15 10H18C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C12.1502 18 14.1022 17.1517 15.5398 15.7716L16.5374 17.5674Z"
                fill="white"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="searchWallet"
            className="pl-3 grow rounded-md h-12  bg-defaultGray border focus:ring-white border-lightGray focus:outline-none focus:border-[#D6D6D6]"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className="text-base bg-defaultGray border-lightGray px-[16px] py-[12px] h-[48px] w-full md:w-auto hover:bg-darkerLightGray hover:border-lightGray"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div>
          <div className="border border-lightGray flex flex-col divide-y-2 divide-lightGray rounded-lg">
            <div className="flex justify-between text-white px-6 py-4 text-lg">
              <h5>Wallet</h5>
              <h5>Tickets</h5>
            </div>
            <div className="h-[270px] overflow-y-auto">
              {tokens.length > 0 &&
                tokens
                  .filter((token) =>
                    token.from
                      .toLowerCase()
                      .includes(searchWallet.toLowerCase())
                  )
                  .map((token, key) => (
                    <li
                      className="px-6 py-1 flex justify-between text-lg bg-darkGray border border-t-0 border-lightGray "
                      key={key}
                    >
                      <a
                        className="cursor-pointer text-lighterGray hover:text-gray-400"
                        onClick={() =>
                          handleLeaderboardWalletClick(token.from, key)
                        }
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
          </div>
        </div>
      </div>
    </>
  );
}
