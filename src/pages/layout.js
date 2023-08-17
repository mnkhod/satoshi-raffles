import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
