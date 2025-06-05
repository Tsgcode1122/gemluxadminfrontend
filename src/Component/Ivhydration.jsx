import React from "react";
import { Layout } from "antd";

import { breakpoints } from "../FixedComponent/BreakPoints";
import styled from "styled-components";

import DisplayAbout from "./DisplayAbout";
import Sidebar from "../Admin/Sidebar";
import FooterNav from "../Admin/FooterNav";
import Navbar from "../Admin/Navbar";
import IVHydrationManager from "./IVHydrationManager";

const Ivhydration = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Layout style={{ minHeight: "" }}>
        <HideSmall>
          <Sidebar />
        </HideSmall>
        <IVHydrationManager />
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

export default Ivhydration;
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
