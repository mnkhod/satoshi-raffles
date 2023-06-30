import raffle from "../../raffleDetails.json";

export default function ViewInscription() {
  const inscriptionDetailUrl = `https://ordinals.com/inscription/${raffle.prize.id}`;
  const incsriptionImageUrl = `https://ordinals.com/content/${raffle.prize.id}`;
  const incsriptionPreviewUrl = `https://ordinals.com/preview/${raffle.prize.id}`;

  return (
    <div className="rounded-lg order-2 md:order-1 border bg-defaultGray border-lightGray w-max py-2 px-2">
      <img className="rounded-lg w-72 h-72" src={incsriptionImageUrl}></img>
      <div className="flex justify-center mt-2">
        <button
          className="text-lg bg-defaultGray border-lightGray px-[16px] py-[10px] w-72 h-14"
          onClick={() => window.open(inscriptionDetailUrl, "_blank")}
        >
          View Inscription
        </button>
      </div>
    </div>
  );
}
