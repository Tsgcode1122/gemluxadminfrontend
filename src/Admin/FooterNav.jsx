import React, { useState } from "react";
import { EditOutlined, LogoutOutlined, DownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";

const FooterNav = () => {
  const [showServices, setShowServices] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    message.success("Logout Successful");

    navigate("/");
  };

  const handleSingleServicesClick = () => {
    setShowServices((prev) => !prev);
  };

  const handleNavigate = (path) => {
    setShowServices(false);
    navigate(path);
  };

  return (
    <>
      {showServices && (
        <ServiceDropdown>
          <ServiceItem onClick={() => handleNavigate("/admin/weight-loss")}>
            Weight Loss
          </ServiceItem>
          <ServiceItem onClick={() => handleNavigate("/admin/iv-hydration")}>
            IV Hydration
          </ServiceItem>
          <ServiceItem onClick={() => handleNavigate("/admin/neurotoxin")}>
            Neurotoxin
          </ServiceItem>
          <ServiceItem onClick={() => handleNavigate("/admin/dermalfiller")}>
            Dermal Filler
          </ServiceItem>
        </ServiceDropdown>
      )}

      <StyledFooter>
        <StyledLink
          to="/admin/about-us"
          active={location.pathname === "/admin/about-us"}
        >
          <IconWrapper>
            <EditOutlined />
            <IconName>About Edit</IconName>
          </IconWrapper>
        </StyledLink>

        <StyledLink
          to="/admin/services-manager"
          active={location.pathname === "/admin/services-manager"}
        >
          <IconWrapper>
            <EditOutlined />
            <IconName>Home Services</IconName>
          </IconWrapper>
        </StyledLink>

        <StyledButton onClick={handleSingleServicesClick}>
          <IconWrapper>
            <EditOutlined />
            <IconName>Single Services</IconName>
          </IconWrapper>
        </StyledButton>

        <LogoutButton onClick={handleLogout}>
          <IconWrapper>
            <LogoutOutlined />
          </IconWrapper>
          <IconName>Log out</IconName>
        </LogoutButton>
      </StyledFooter>
    </>
  );
};

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ active }) => (active ? "blue" : "black")};

  svg {
    color: ${({ active }) => (active ? "blue" : "black")};
  }
`;

const StyledButton = styled.div`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

const LogoutButton = styled.div`
  cursor: pointer;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    color: blue;
  }

  svg {
    font-size: 18px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconName = styled.span`
  font-size: 12px;
  margin-top: 5px;
`;

const ServiceDropdown = styled.div`
  position: fixed;
  bottom: 58px;
  /* left: 50%; */
  transform: translateX(-50%);
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(47, 47, 47, 0.1);
  border-radius: 8px 0;
  /* padding: 10px 0; */
  z-index: 2000;
  width: 90%;
  max-width: 400px;
`;

const ServiceItem = styled.div`
  padding: 8px 10px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #f7f7f7;
  }
`;

export default FooterNav;
