import React from "react";
import { Layout } from "antd";

import { breakpoints } from "../FixedComponent/BreakPoints";
import styled from "styled-components";

import DisplayAbout from "./DisplayAbout";
import Sidebar from "../Admin/Sidebar";
import FooterNav from "../Admin/FooterNav";
import Navbar from "../Admin/Navbar";
import AdminWelcome from "./AdminWelcome";

const Welcome = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Layout style={{ minHeight: "" }}>
        <HideSmall>
          <Sidebar />
        </HideSmall>
        <AdminWelcome />
        <>
          <HideSmall></HideSmall>

          <HideBig></HideBig>
          <HideBig>
            <FooterNav />
          </HideBig>
        </>
        <></>
      </Layout>
    </>
  );
};

export default Welcome;
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
