import raffle from "../../raffleDetails.json";
import Button from "./Button";

export default function ViewInscription() {
  const inscriptionDetailUrl = `https://ordinals.com/inscription/${raffle.prize.id}`;
  const incsriptionImageUrl = `https://ordinals.com/content/${raffle.prize.id}`;
  const incsriptionPreviewUrl = `https://ordinals.com/preview/${raffle.prize.id}`;

  return (
    <div className="rounded-lg order-2 md:order-1 border bg-defaultGray border-lightGray w-full md:w-[338px] p-6">
      <img className="rounded-lg w-full h-full md:w-[276px] md:h-[276px] mx-auto mb-6" src={incsriptionImageUrl}/>
      <div className="flex justify-center mt-2">
        <Button
          onClick={() => window.open(inscriptionDetailUrl, "_blank")}
          customStyle={'w-72'}
      >
          View Inscription
        </Button>
      </div>

    </div>
  );
}