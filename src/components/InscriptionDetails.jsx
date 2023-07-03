import raffle from "../../raffleDetails.json";

export default function InscriptionDetails() {
  return (
    <div className="border bg-defaultGray rounded-lg border-lightGray w-full md:w-[324px] ">
      <div className="p-6 flex flex-col divide-y-2 divide-lightGray gap-6 w-full h-auto">
        <div className=" ">
          <h1 className="text-3xl ">Inscription Details</h1>
          <p className="text-base pt-6">
            Satoshi Punks are here to shake things up. Each Punks is crafted
            with love and passion, pixel by pixel, to help you express yourself.
            If you`&apos;re a punk at heart, who is tired of the same old same
            old, the join our tribe. Let`&apos;s admire our JPEGs together and
            create cool stuff.
          </p>
        </div>
        <div className="text-base flex flex-col gap-6 pt-6">
          <div className="flex justify-between">
            <h5>ID</h5>
            <a
              className="flex gap-2 text-white hover:text-blue-400 items-center"
              href={`https://ordinals.com/inscription/${raffle.prize.id}`}
            >
              {raffle.prize.id.substring(0, 8) +
                "..." +
                raffle.prize.id.substring(raffle.prize.id.length - 2)}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 5.5L15.5 0.5M15.5 0.5H10.5M15.5 0.5L8.83333 7.16667M6.33333 2.16667H4.5C3.09987 2.16667 2.3998 2.16667 1.86502 2.43915C1.39462 2.67883 1.01217 3.06129 0.772484 3.53169C0.5 4.06647 0.5 4.76654 0.5 6.16667V11.5C0.5 12.9001 0.5 13.6002 0.772484 14.135C1.01217 14.6054 1.39462 14.9878 1.86502 15.2275C2.3998 15.5 3.09987 15.5 4.5 15.5H9.83333C11.2335 15.5 11.9335 15.5 12.4683 15.2275C12.9387 14.9878 13.3212 14.6054 13.5608 14.135C13.8333 13.6002 13.8333 12.9001 13.8333 11.5V9.66667"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
          <div className="flex justify-between">
            <h5>Number</h5>
            <p>{raffle.prize.number}</p>
          </div>
          {
            /* <div className="py-4 px-6 flex justify-between">
                <h5>Owner</h5>
                <p>0x...C544</p>
              </div> */
          }
          <div className=" flex justify-between">
            <h5>Sat Rarity</h5>
            <p>{raffle.prize.rarity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
