import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "../Admin/Sidebar";

const Layout = () => {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");
  const isAll = location.pathname.startsWith("/allpost");
  const isHomePage = location.pathname === "/";

  return (
    <>
      {!isHomePage && !isAdminPage && !isAll && <Navbar />}
      {/* <Sidebar /> */}
      <Outlet />
      {/* {!isAdminPage && !isAll && <Footer />} */}
    </>
  );
};

export default Layout;
