import Navbar from "../components/Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
