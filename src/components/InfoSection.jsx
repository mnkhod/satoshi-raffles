export default function InfoSection() {
  return (
    <div className="order-1 md:order-2 flex flex-col gap-6 col-span-2">
      <div>
        <h1 className="text-5xl text-orange-500 font-semibold mb-6">
          Satoshi Raffles
        </h1>{" "}
        <h2 className="text-3xl">How to participate</h2>
      </div>
      <div>
        <div className="flex flex-col gap-3">
          <p className="text-base text-justify">
            You can purchase tickets by sending 1000 PSAT per ticket to “Deposit
            Address”. There is no maximum limit on how many PSAT you can send.
            Once the transaction is confirmed, your tickets will be created for
            the sending wallet. You can confirm your participation, by searching
            your wallet address at “Participants” section.
          </p>
          <br />
          <p className="text-base text-justify">
            Once the countdown ends, a draw will be made in Satoshi Punks
            Discord server and the Inscription will be sent to the winner. After
            the raffle, all gathered PSAT will be burnt by being sent to Satoshi
            Nakamoto's address. Therefore, deposits are non-refundable.
          </p>
        </div>
      </div>
    </div>
  );
}
