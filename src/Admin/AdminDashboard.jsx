import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";

import Navbar from "./Navbar";
import FooterNav from "./FooterNav";
import { breakpoints } from "../FixedComponent/BreakPoints";
import styled from "styled-components";
import AdminWelcome from "../Component/AdminWelcome";
import DisplayAbout from "../Component/DisplayAbout";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <>
      <Layout>
        <HideSmall>
          <Sidebar />
        </HideSmall>
        <AdminWelcome />
        <>
          <HideSmall></HideSmall>
        </>
      </Layout>
      <>
        <HideBig></HideBig>
      </>

      <HideBig>
        <FooterNav />
      </HideBig>
      <Outlet />
    </>
  );
};

export default AdminDashboard;

const HideBig = styled.div`
  @media (min-width: ${breakpoints.m}) {
    display: none;
  }
`;
const HideSmall = styled.div`
  display: none;
  @media (min-width: ${breakpoints.xs}) {
  }
  @media (min-width: ${breakpoints.m}) {
    display: block;
  }
`;
