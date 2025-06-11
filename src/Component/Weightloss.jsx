import React, { useEffect } from "react";
import { Layout } from "antd";

import { breakpoints } from "../FixedComponent/BreakPoints";
import styled from "styled-components";

import DisplayAbout from "./DisplayAbout";
import Sidebar from "../Admin/Sidebar";
import FooterNav from "../Admin/FooterNav";
import Navbar from "../Admin/Navbar";
import SingleServiceManager from "./SingleServiceManager";

const Weightloss = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      {/* <Navbar /> */}
      <Layout style={{ minHeight: "" }}>
        <HideSmall>
          <Sidebar />
        </HideSmall>
        <SingleServiceManager />
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

export default Weightloss;
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
