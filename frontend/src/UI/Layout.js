import React, { Fragment } from "react";
import Navbar from "../components/Navbar/Navbar";
import BottomNavbar from "../components/Navbar/BottomNavbar";
const Layout = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      {children}
      <BottomNavbar />
    </Fragment>
  );
};

export default Layout;
