import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Squash as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";

// import logo from "../Images/SanthothadLogo.svg";
// import arrowUp from "../Icons/arrow-up-right.png";
import { Colors } from "../Colors/ColorComponent";
import SectionDiv from "./SectionDiv";
import { breakpoints } from "./BreakPoints";
const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };
  const handleProfileClick = () => {
    setModalVisible(true);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  return (
    <>
      <StyledNavbar>
        <HeadSpace>
          <Link to="/" onClick={isSidebarOpen ? closeSidebar : undefined}>
            {/* <img src={logo} />{" "} */}
          </Link>
          <MenuToggle onClick={toggleSidebar}>
            <Hamburger
              toggled={isSidebarOpen}
              toggle={setIsSidebarOpen}
              color="#000000"
            />
          </MenuToggle>
        </HeadSpace>
      </StyledNavbar>
      <NavHeight></NavHeight>
      <Sidebar isOpen={isSidebarOpen} ref={sidebarRef}>
        <SidebarContent>
          <LinkContainer>
            {[
              { to: "/project", label: "Projects" },
              { to: "/service", label: "Services" },
              { to: "/about", label: "About Us" },
              { to: "/blog", label: "Blogs" },
              { to: "/contact", label: "Contact Us" },
            ].map((link) => (
              <StyledLink
                key={link.to}
                to={link.to}
                onClick={closeSidebar}
                className={location.pathname === link.to ? "active" : ""}
              >
                {link.label}
              </StyledLink>
            ))}
          </LinkContainer>
        </SidebarContent>
      </Sidebar>

      {isSidebarOpen && <Overlay ref={overlayRef} onClick={closeSidebar} />}

      <BigNav>
        <BigCon>
          <Link to="/">{/* <img src={logo} />{" "} */}</Link>
          <LinkBig>
            <Link to="/project">Projects</Link>
            <Link to="/service">Services</Link>
            <Link to="/about">About Us</Link>
            <Link to="/blog">Blogs</Link>
          </LinkBig>
          <Contact>
            <Link to="/contact">
              Contact Us
              {/* <img src={arrowUp} />{" "} */}
            </Link>
          </Contact>
        </BigCon>
      </BigNav>
    </>
  );
};

const Contact = styled.div`
  border: 1.8px solid #0316cd;
  padding: 7px 12px;
  border-radius: 5px;
  position: relative;
  transition: box-shadow 0.3s ease-in-out;

  a {
    display: flex;
    align-items: center;
    font-weight: 500;
    justify-content: center;
    gap: 4px;
    color: ${Colors.blue} !important;
  }

  color: ${Colors.blue} !important;

  &:hover {
    box-shadow: 0px 0px 10px 2px rgba(3, 22, 205, 0.7);
    border-color: rgba(3, 22, 205, 0.9);
  }
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
  @media (min-width: ${breakpoints.xl}) {
    max-width: 1400px;
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
    transition: color 0.3s ease-in-out;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -5px;
      width: 0%;
      height: 2px;
      background: ${Colors.blue};
      transition: width 0.3s ease-in-out;
    }

    &:hover {
      color: ${Colors.blue};
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

const SidebarContent = styled.div`
  list-style: none;
  top: 0 !important;
  a {
    text-decoration: none;
    font-size: 16px;
    color: black;

    padding: 8px;

    img {
      max-width: 100%;
      height: 15px;
    }
    @media screen and (max-width: 320px) {
      font-size: 14px;
    }
    @media (min-width: 321px) and (max-width: 399px) {
      font-size: 16px;
    }
    @media (min-width: 400px) and (max-width: 499px) {
    }
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;
  a {
    cursor: pointer;
    text-decoration: none;
    color: black;
    padding: 20px !important;
    text-align: center;
    justify-content: space-between;
    z-index: 999;
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

  img {
    max-width: 100%;
    height: 20px;
  }
  @media screen and (min-width: 820px) {
    display: none;
  }
`;

const HeadSpace = styled.div`
  top: 0 !important;
  align-items: center;
  display: flex;
  margin: 0px 20px;
  top: 0 !important;
  justify-content: space-between;
  img {
    height: 25px;
    margin: 0;
    padding: 0;
  }
`;

const MenuToggle = styled.div`
  margin: 0;
  cursor: pointer;
`;

const Sidebar = styled.div`
  position: fixed;
  box-shadow:
    0 2px 30px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 20px 20px;
  top: 3rem;
  top: ${({ isOpen }) => (isOpen ? "3rem" : "-400px")};
  width: 100%;
  z-index: 999;
  background-color: #f5f5f5;

  border-left: 0.5px solid #313538;
  transition: top 0.3s ease-in-out;
  z-index: 20;
  overflow-x: hidden;
  @media screen and (max-width: 320px) {
    width: 100%;
  }
  @media (min-width: 321px) and (max-width: 399px) {
    width: 100%;
  }
  @media (min-width: 400px) and (max-width: 499px) {
    width: 100%;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const StyledLink = styled(Link)`
  display: block;
  padding: 15px 20px;
  text-decoration: none;
  color: black;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
  position: relative;

  &:hover {
    color: ${Colors.blue};
  }

  &.active {
    background: black !important;
    color: ${Colors.light};
    font-weight: bold;
  }
`;

export default Navbar;
