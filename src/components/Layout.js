import Navbar from "@/components/Navbar";
//import Footer from './Footer';
import "@/assets/scss/Layout.scss";
import Head from "next/head";
//import Footer from "@/components/Footer";

const Layout = ({ children, mainMenu, className, divMenu }) => {
  return (
    <div>
      <Navbar mainMenu={mainMenu} divMenu={divMenu} />
      <main className={className} >{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;