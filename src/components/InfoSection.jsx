export default function InfoSection() {
  return (
    <div className="order-1 md:order-2 flex flex-col gap-6 col-span-2">
      <div>
        <h1 className="text-5xl text-orange-500 font-semibold mb-6">
          Satoshi Raffle
        </h1>{" "}
        <p className="text-base">
          A place to partake in the raffles of unique and abstract Ordinal
          Artefacts, powered by BRC20.
        </p>
      </div>
      <div>
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl">How to enter</h2>
          <p className="text-base">
            Purchase a ticket by clicking ‘Buy tickets’ and following the
            instructions. Once the transaction is confirmed, your tickets will
            be credited to the wallet address you deposited with, you can paste
            your wallet into the search bar under the leaderboard to show total
            tickets in your account.
          </p>
        </div>
      </div>
    </div>
  );
}
