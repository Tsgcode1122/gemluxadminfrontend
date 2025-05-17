import React from "react";
import { Tabs } from "antd";
import styled from "styled-components";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { Colors } from "../Colors/ColorComponent";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
const StyledTabs = styled(Tabs)`
  &:hover {
    cursor: pointer;
    color: ${Colors.blue} !important;
  }
  .ant-tabs-nav {
    all: unset;
    display: flex !important;
    background: none;
    border-radius: 0;
    padding: 10px 0;
    border: none !important;
  }

  /* Style Login Tab */
  .ant-tabs-tab:nth-child(1) {
    /* all: unset; */

    border-radius: 5px 0 0 5px !important;
    transition: all 0.3s ease-in-out;
  }

  /* Style Sign Up Tab */
  .ant-tabs-tab:nth-child(2) {
    /* all: unset; */

    border-radius: 0 5px 5px 0 !important;
    transition: all 0.3s ease-in-out;
  }

  .ant-tabs-tab {
    all: unset;
    /* display: flex; */

    min-width: 100px;
    flex: 1 !important;
    text-align: center;
    font-size: 16px;
    margin: 0 !important;

    /* padding: 12px 70px !important; */
    color: #aaa;

    transition: all 0.3s ease-in-out;
    border: 1px solid #aaa !important;
  }

  .ant-tabs-tab-active {
    /* all: unset; */
    border-color: ${Colors.blue} !important;
    color: ${Colors.blue} !important;
  }

  .ant-tabs-tab:hover {
    /* all: unset; */
    color: #000;
  }

  .ant-tabs-content {
    /* padding: 200px; */
  }
`;

const RegisterLogin = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    if (location.state?.activeTab === "register") {
      setActiveTab("register");
    }
    if (location.state?.activeTab === "login") {
      setActiveTab("login");
    }
  }, [location.state]);
  return (
    <Container>
      <Content>
        <StyledTabs
          centered
          defaultActiveKey="1"
          type="card"
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
        >
          <StyledTabs.TabPane tab="Login" key="login">
            <LoginPage />
          </StyledTabs.TabPane>
          <StyledTabs.TabPane tab="Register" key="register">
            <RegisterPage />
          </StyledTabs.TabPane>
        </StyledTabs>
      </Content>
    </Container>
  );
};

export default RegisterLogin;

const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: 70vh;
  margin: 40px auto !important;
  justify-content: center;
  padding-bottom: 100px;
  /* background: ${Colors.lightblue}; */
`;

const Content = styled.div`
  max-width: 400px;
  padding: 40px 40px;
  margin: 0px auto !important;
  border: 1px solid #0316cd;
  background: white;
  border-radius: 8px;
  @media screen and (max-width: 320px) {
    max-width: 260px;
    margin: 0px 0.8rem !important;
  }
  @media (min-width: 321px) and (max-width: 399px) {
    max-width: 280px;
    padding: 40px 20px;
    margin: 0px 1rem !important;
  }
  @media (min-width: 400px) and (max-width: 499px) {
    max-width: 360px;
    padding: 40px 20px;
    margin: 0px 1.2rem !important;
  }
`;
