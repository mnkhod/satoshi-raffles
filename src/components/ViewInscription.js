import raffle from "../../raffleDetails.json";
import Button from "./Button";

import Image from "next/image";

export default function ViewInscription() {
  const inscriptionDetailUrl = `https://ordinals.com/inscription/${raffle.prize.id}`;
  const incsriptionImageUrl = `https://ordinals.com/content/${raffle.prize.id}`;
  const incsriptionPreviewUrl = `https://ordinals.com/preview/${raffle.prize.id}`;

  return (
    <div className="rounded-lg order-2 md:order-1 border bg-defaultGray border-lightGray w-full md:w-[324px] p-6">
      <Image
        className="rounded-lg w-full h-full md:w-[276px] md:h-[276px] mx-auto mb-6"
        src={incsriptionImageUrl}
        alt="Inscription image"
        width={`2000000`}
        height={`2000000`}
      />
      <div className="flex flex-col justify-center gap-3 mt-2">
        <button
          className="text-base bg-defaultGray border-lightGray w-full md:w-64 hover:bg-darkerLightGray hover:border-lightGray"
          onClick={() => window.open(inscriptionDetailUrl, "_blank")}
        >
          View Inscription
        </button>
        {/* <Button
          onClick={() => window.open("https://www.satoshipunks.art/","_self")}
          customStyle={'w-72'}
      >
          Website 
        </Button> */}
      </div>
    </div>
  );
}
