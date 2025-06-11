import { useEffect, useState } from "react";

import styled from "styled-components";
import { Typography, Card, Divider } from "antd";
import {
  SmileOutlined,
  EditOutlined,
  SettingOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
import { useUserData } from "../context/UserDataContext";
import { breakpoints } from "../FixedComponent/BreakPoints";
const Wrapper = styled.div`
  padding: 3rem;
  margin-bottom: 5rem;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  @media screen and (max-width: 320px) {
    padding: 1rem;
  }
  @media (min-width: 321px) and (max-width: 399px) {
    padding: 1rem;
  }
  @media (min-width: 400px) and (max-width: 499px) {
    padding: 1rem;
  }
`;

const Content = styled(Card)`
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 0rem;
  /* background: white; */

  @media (min-width: ${breakpoints.xs}) {
    max-width: 1200px;
    width: 100%;
    border-radius: 20px;
    padding: 2rem;
  }
  @media (min-width: ${breakpoints.m}) {
    padding: 2cm;
  }
  @media (min-width: ${breakpoints.xl}) {
    max-width: 1500px;
  }
`;

const Step = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
`;

const IconCircle = styled.div`
  /* background-color: #e6f7ff; */
  color: #1890ff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  font-size: 18px;
`;

const AdminWelcome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const { userData } = useUserData();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Wrapper>
      <Content>
        <Title level={2}>
          <SmileOutlined style={{ color: "#faad14", marginRight: 10 }} />
          Welcome,{" "}
          {userData && (
            <>{userData.fullName && userData.fullName.split(" ")[0]}</>
          )}
          !
        </Title>

        <Paragraph type="secondary" style={{ fontSize: "16px" }}>
          We’re glad to have you here. This is your admin dashboard where you
          can manage and update content on your website easily.
        </Paragraph>

        <Divider />

        <Title level={4}>How to Edit Your Website Content:</Title>

        <Step>
          <IconCircle>
            <SettingOutlined />
          </IconCircle>
          <div>
            <Text strong>
              1. Use the {isSmallScreen ? "Footer Menu" : "Sidebar"}:
            </Text>
            <Paragraph>
              On{" "}
              {isSmallScreen ? "the bottom menu (footer)" : "the left sidebar"},
              you'll see different sections like <Text code>Home Services</Text>
              , <Text code>About</Text>, <Text code>Single Services</Text>, etc.
              Click on any section you’d like to update.
            </Paragraph>
          </div>
        </Step>

        <Step>
          <IconCircle>
            <EditOutlined />
          </IconCircle>
          <div>
            <Text strong>2. Click the Edit Icon:</Text>
            <Paragraph>
              At the top of each section page, you'll find an{" "}
              <Text code>Edit</Text> icon. Click it to open the editing modal.
            </Paragraph>
          </div>
        </Step>

        <Step>
          <IconCircle>
            <CheckCircleOutlined />
          </IconCircle>
          <div>
            <Text strong>3. Make Your Changes:</Text>
            <Paragraph>
              Update existing information, upload images, or add new services.
              Once you're done, click <Text strong>Submit</Text>.
            </Paragraph>
            <Paragraph>
              Your changes will be reviewed and reflected on the live site
              within a few hours.
            </Paragraph>
          </div>
        </Step>

        <Divider />

        <Paragraph style={{ fontStyle: "italic", color: "#888" }}>
          Need help? Reach out to the support team via the contact section in
          your sidebar.
        </Paragraph>
      </Content>
    </Wrapper>
  );
};

export default AdminWelcome;
