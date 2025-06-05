import React, { useState, useEffect } from "react";
import { Layout, Upload, Button, message } from "antd";
import { PiUsersThree } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";
import { BsJournalBookmark } from "react-icons/bs";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import styled from "styled-components";
// import sanlogo from "../Images/sanwh.png";

import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";
const { Sider } = Layout;

const SidebarContainer = styled(Sider)`
  margin-top: -3rem;
  z-index: 999;
  position: fixed;

  height: 100vh !important;
  background: #000d8a !important;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Image = styled.div`
  display: flex;
  flex: 20%;
  justify-content: center;
  align-items: center;
  padding: 20px;
  img {
    max-width: 100%;
    height: 20px;
  }
`;

const Head = styled.p`
  color: #aaaaaa;
  padding: 10px 5px;
  font-weight: 200;
`;

const LogoutButton = styled.div`
  flex: 20%;
  display: flex;

  gap: 10px;
  border: 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  cursor: pointer;
  margin-top: auto;
  padding: 10px;
  svg {
    font-size: 18px;
  }
`;

const MenuDropdown = styled.div`
  margin-bottom: 30px;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 16px;
  padding: 10px;
  background: ${(props) =>
    props.active ? "rgba(255, 255, 255, 0.08)" : "transparent"};
  border-radius: 10px;
  transition: background 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const SubMenu = styled.div`
  padding-left: 40px;
  max-height: ${(props) => (props.active ? "200px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  color: white;
  a {
    color: white !important;
  }
`;

const Circle = styled.div`
  background: ${(props) =>
    props.active ? "white" : "rgba(255, 255, 255, 0.1)"};
  border-radius: 50%;
  height: 10px;
  width: 10px;
  display: inline-block;
  margin-right: 5px;
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const [activeCircle, setActiveCircle] = useState("create");
  const [users, setUsers] = useState([]);
  const { userData } = useUserData();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const handleLinkClick = (circleName) => {
    setActiveCircle(circleName);
    setOpenMenu(null);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5003/api/auth/");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching Users:", error);
      }
    };

    fetchUsers();
  }, []);
  console.log(userData);

  // logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    message.success("Logout Successful");
    navigate("/");
  };
  return (
    <>
      <SidebarContainer width={260}>
        <Image>{/* <img src={sanlogo} alt="Logo" /> */}</Image>

        <Divider>
          <AdminMini>
            <p>
              Welcome{" "}
              {userData && (
                <>{userData.fullName && userData.fullName.split(" ")[0]}</>
              )}
            </p>
          </AdminMini>
          <Head>Dashboard </Head>
          <MenuDropdown>
            {" "}
            <Link to="/about-us" onClick={() => handleLinkClick("all")}>
              <Menu active={openMenu === "About"}>
                {openMenu === "About" ? (
                  <IoIosArrowDown />
                ) : (
                  <IoIosArrowForward />
                )}
                <PiUsersThree /> About Us
              </Menu>
            </Link>
          </MenuDropdown>
          {/*serbice*/}
          <Link to="/services-manager" onClick={() => handleLinkClick("all")}>
            <MenuDropdown>
              <Menu active={openMenu === "inquire"}>
                {openMenu === "users" ? (
                  <IoIosArrowDown />
                ) : (
                  <IoIosArrowForward />
                )}
                <PiUsersThree /> Home Services
              </Menu>
            </MenuDropdown>
          </Link>
          {/* Users Menu */}

          {/* Blog Menu */}
          <MenuDropdown>
            <Menu
              active={openMenu === "blog"}
              onClick={() => setOpenMenu(openMenu === "blog" ? null : "blog")}
            >
              {openMenu === "blog" ? <IoIosArrowDown /> : <IoIosArrowForward />}
              <BsJournalBookmark /> Single Services
            </Menu>
            <SubMenu active={openMenu === "blog"}>
              <p>
                <Circle active={activeCircle === "create"} />
                <Link
                  to="/weight-loss"
                  onClick={() => handleLinkClick("create")}
                >
                  Weight Loss
                </Link>
              </p>
              <p>
                <Circle active={activeCircle === "all"} />
                <Link to="/iv-hydration" onClick={() => handleLinkClick("all")}>
                  Iv Hydration
                </Link>
              </p>
              <p>
                <Circle active={activeCircle === "all"} />
                <Link to="/neurotoxin" onClick={() => handleLinkClick("all")}>
                  Neurotoxin
                </Link>
              </p>
              <p>
                <Circle active={activeCircle === "all"} />
                <Link to="/dermalfiller" onClick={() => handleLinkClick("all")}>
                  Dermal Filler
                </Link>
              </p>
            </SubMenu>
          </MenuDropdown>
        </Divider>
        <LogoutButton onClick={handleLogout}>
          <BiLogOut />
          Log out
        </LogoutButton>
      </SidebarContainer>
      <SiderGap />
    </>
  );
};

export default Sidebar;

const SiderGap = styled.div`
  width: 260px !important;
`;
const CustomButton = styled(Button)`
  background: transparent !important;
  border: none !important;
  margin: 0;
  img {
    height: 30px;
    width: 30px;
  }
`;
const AdminMini = styled.div`
  margin-top: 4rem;
  display: flex;

  align-items: center;
  justify-content: left;
  background: rgba(255, 255, 255, 0.2);
  padding: 1px 10px;
  border-radius: 10px;
  gap: 10px;
  color: white;
  text-align: center;
`;

const MiniImage = styled.div`
  margin: 0;
  img {
    border-radius: 50%;
    height: 30px;
  }
`;

const Divider = styled.div`
  height: 60%;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;
