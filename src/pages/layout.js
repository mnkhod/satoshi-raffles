import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Layout({ children }) {
  const [connectedAddress, setConnectedAddress] = useState("");
  const [addressConnected, setAddressConnected] = useState(false);

  function handleConnect(address) {
    setConnectedAddress(address);
    setAddressConnected(true);
  }

  function handleDisconnect() {
    setConnectedAddress("");
    setAddressConnected(false);
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        addressConnected={addressConnected}
        connectedAddress={connectedAddress}
      />
      <div>{children}</div>
    </div>
  );
}
