import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Squash as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import { Layout, Upload, Button, message } from "antd";
// import logo from "../Images/SanthothadLogo.svg";
// import arrowUp from "../Icons/arrow-up-right.png";
import { Colors } from "../Colors/ColorComponent";
import { useUserData } from "../context/UserDataContext";
import SectionDiv from "../FixedComponent/SectionDiv";
import { breakpoints } from "../FixedComponent/BreakPoints";
const Navbar = () => {
  const { userData } = useUserData();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const handleUpload = async ({ file }) => {
    setLoading(true);

    const formData = new FormData();

    formData.append("image", file);
    formData.append("userId", userData?._id);

    try {
      const response = await axios.post(
        "https://gemluxeadminbackend.onrender.com/api/signature/send",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      const uploadedImageUrl = response.data.imageUrl;

      setImageUrl(uploadedImageUrl);

      message.success("Profile image updated successfully!");
    } catch (error) {
      message.error("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StyledNavbar>
        <HeadSpace>
          <Link to="/">{/* <img src={logo} /> */}</Link>
          <MenuToggle>
            <p>
              Welcome{" "}
              {userData && (
                <span>
                  {userData.fullName && userData.fullName.split(" ")[0]}
                </span>
              )}
            </p>
          </MenuToggle>
        </HeadSpace>
      </StyledNavbar>
      <NavHeight></NavHeight>

      {/* {isSidebarOpen && <Overlay onClick={closeSidebar} />} */}

      <BigNav>
        <BigCon>
          <Link to="/"></Link>
          <LinkBig>
            <Link to="/project">Projects</Link>
            <Link to="/service/architect">Services</Link>
            <Link to="/about">About Us</Link>
            <Link to="/blog">Blogs</Link>
          </LinkBig>
        </BigCon>
      </BigNav>
    </>
  );
};

const CustomButton = styled(Button)`
  background: transparent !important;
  border: none !important;
`;
const MiniImage = styled.div`
  img {
    border-radius: 50%;
    height: 30px !important;
    width: 30px !important;
    max-width: 100%;
    object-fit: cover;
  }
`;
const Contact = styled.div`
  border: 1.8px solid #0316cd;
  padding: 7px 12px;
  a {
    display: flex;
    align-items: center;
    font-weight: 500;
    justify-content: center;
    gap: 4px;
    color: ${Colors.blue} !important;
  }
  color: ${Colors.blue} !important;

  border-radius: 5px;
`;

const BigNav = styled.div`
  position: fixed;
  width: 100%;
  top: 0;

  display: none;
  a {
    text-decoration: none;
    font-size: 16px;
  }
  @media screen and (min-width: 820px) {
    display: block;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  z-index: 999 !important;
  background: ${Colors.white};
  img {
    max-width: 100%;
    height: 20px;
  }
`;
const BigCon = styled.div`
  height: 40px;
  padding: 10px 40px;
  display: flex;

  margin: 0 auto;

  align-items: center;
  justify-content: space-between;

  @media (min-width: ${breakpoints.xs}) {
  }
  @media (min-width: ${breakpoints.sm}) {
    padding: 10px 40px;
  }
  @media (min-width: ${breakpoints.m}) {
    padding: 10px 40px;
  }
  @media (min-width: ${breakpoints.md}) {
    max-width: 1100px;
  }

  @media (min-width: ${breakpoints.lg}) {
    max-width: 1150px;
    margin: 0 auto;
  }
`;
const LinkBig = styled.div`
  display: flex;
  border-radius: 20px;
  align-items: center;
  padding: 0 2rem;
  gap: 20px;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: ${Colors.ashBlack};
    font-size: 18px;
  }
`;

const NavHeight = styled.div`
  height: 3rem;
`;

const StyledNavbar = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999 !important;
  background: ${Colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media screen and (min-width: 820px) {
    display: none;
  }
`;

const HeadSpace = styled.div`
  align-items: center;
  display: flex;
  margin: 0px 20px;

  justify-content: space-between;
  img {
    height: 15px;
    margin: 0;
    padding: 0;
  }
`;

const MenuToggle = styled.div`
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  p {
    font-style: italic;
  }
  span {
    font-style: normal;
  }
`;

export default Navbar;
