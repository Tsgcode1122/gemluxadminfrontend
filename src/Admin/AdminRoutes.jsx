// AdminRoutes.js
import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd";
import styled, { createGlobalStyle } from "styled-components";

import Navbar from "./Navbar";
import AdminDashboard from "./AdminDashboard";
import DisplayAbout from "../Component/DisplayAbout";
import ServiceManager from "../Component/ServiceManager";
import SingleServiceManager from "../Component/SingleServiceManager";
import IVHydrationManager from "../Component/IVHydrationManager";
import DermalFillerManager from "../Component/DermalFillerManager";
import NeurotoxinManager from "../Component/NeurotoxinManager";
import About from "../Component/About";
import Home from "../Component/Home";
import Weightloss from "../Component/Weightloss";
import Ivhydration from "../Component/Ivhydration";
import DermalFiller from "../Component/DermalFiller";
import Neurotoxin from "../Component/Neurotoxin";

const AdminRoutes = () => {
  return (
    <>
      <GlobalStyle />

      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/about-us" element={<About />} />,
        <Route path="/services-manager" element={<Home />} />,
        <Route path="/weight-loss" element={<Weightloss />} />,
        <Route path="/iv-hydration" element={<Ivhydration />} />,
        <Route path="/dermalfiller" element={<DermalFiller />} />,
        <Route path="/neurotoxin" element={<Neurotoxin />} />,
        {/* <Route path="/edit/:id" element={<EditPost />} /> */}
        {/* 
        <Route path="/allpost" element={<AllPost />} /> */}
        <Route path="*" element={<InvalidPath />} />
      </Routes>
    </>
  );
};
const InvalidPath = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/admin");
  };

  return (
    <StyledResult
      status="404"
      title="404 Not Found"
      subTitle="Oops! The page you are looking for does not exist."
      extra={
        <Button type="primary" onClick={handleBackHome}>
          Back Home
        </Button>
      }
    />
  );
};
const StyledResult = styled(Result)`
  .ant-result-title {
    color: black;
  }

  .ant-result-subtitle {
    color: black;
  }
`;
const GlobalStyle = createGlobalStyle`
  body {
    background: #EDF1F6; /* Set linear gradient background with blue and red colors */
    margin: 0; /* Remove default body margin */
    padding: 0; /* Remove default body padding */
    font-family: 'Roboto', sans-serif;
 
  }
`;

// Create a styled component for the irregular circle shape

export default AdminRoutes;
