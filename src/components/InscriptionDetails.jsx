import raffle from "../../raffleDetails.json";

export default function InscriptionDetails() {
  return (
    <div className="col-span-1 rounded-lg flex flex-col border bg-darkGray w-72 h-[262px]">
      <div className="px-[24px] py-[12px] h-14 border border-b-2 border-x-0 border-y-0 bg-defaultGray border-lightGray rounded-t-lg">
        <h1 className="text-lg font-semibold">Inscription Details</h1>
      </div>
      <ul className="text-sm">
        <li className="py-4 px-6 flex justify-between">
          <h5>ID</h5>
          <p>
            {raffle.prize.id.substring(0, 4) +
              "..." +
              raffle.prize.id.substring(raffle.prize.id.length - 4)}
          </p>
        </li>
        <li className="py-4 px-6 flex justify-between">
          <h5>Number</h5>
          <p>{raffle.prize.number}</p>
        </li>
        {/* <li className="py-4 px-6 flex justify-between">
              <h5>Owner</h5>
              <p>0x...C544</p>
            </li> */}
        <li className="py-4 px-6 flex justify-between">
          <h5>Sat Rarity</h5>
          <p>{raffle.prize.rarity}</p>
        </li>
      </ul>
    </div>
  );
}
