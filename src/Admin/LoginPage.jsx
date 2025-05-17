import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import styled, { keyframes } from "styled-components";
import { Colors } from "../Colors/ColorComponent";
import { useUserContext } from "../context/UserContext";

const LoginPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { loginUser } = useUserContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegisterClick = () => {
    navigate("/adminlogin", { state: { activeTab: "register" } });
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { email, password } = values;
      const emailLowercase = email.toLowerCase();
      const { token, user } = await loginUser({
        email: emailLowercase,
        password,
      });
      message.success("Login successful");

      // Encrypt user data
      const encryptedUserData = CryptoJS.AES.encrypt(
        JSON.stringify(user),
        "b2116e7e6e4646b3713b7c3f225729987baedc5c98dbefc6b2d4cfc9ee246eb5",
      ).toString();

      // Store token and encrypted user data in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", encryptedUserData);
      console.log(encryptedUserData);

      window.location.href = "/admin";
    } catch (error) {
      console.error("Error logging in:", error.message);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderEyeIcon = (visible) =>
    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />;

  return (
    <LoginPageContainer>
      <LoginForm
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <LoginFormTitle>Kindly login with your details</LoginFormTitle>
        {/* Email */}
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input placeholder="email@gmail.com" />
        </Form.Item>

        {/* Password */}
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Password" iconRender={renderEyeIcon} />
        </Form.Item>

        {/* Forgot Password? */}
        <ForgotPasswordLink to="/reset-password">
          Forgot Password?
        </ForgotPasswordLink>

        {/* Submit Button */}
        <Form.Item>
          <ButtonStyle type="primary" htmlType="submit" loading={loading} block>
            Continue
          </ButtonStyle>
        </Form.Item>

        {/* Register Now */}
        <RegisterNowText>
          New User? <span onClick={handleRegisterClick}>Register</span>
        </RegisterNowText>
      </LoginForm>
    </LoginPageContainer>
  );
};

const LoginPageContainer = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;

const LoginForm = styled(Form)`
  width: 268px;

  @media screen and (max-width: 320px) {
    width: 240px;
  }
  @media (min-width: 321px) and (max-width: 399px) {
    width: 268px;
  }
  @media (min-width: 400px) and (max-width: 499px) {
    width: 268px;
  }
`;

const LoginFormTitle = styled.p`
  text-align: left;
  margin-bottom: 25px;
`;

const ForgotPasswordLink = styled(Link)`
  display: block;
  text-align: left;
  margin-bottom: 20px;
  color: black;
  &:hover {
    color: ${Colors.blue} !important;
  }
`;

const RegisterNowText = styled.div`
  display: block;
  text-align: center;
  margin-top: 10px;
  font-weight: 300;
  span {
    color: black !important;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      color: ${Colors.blue} !important;
    }
  }
`;
const ButtonStyle = styled(Button)`
  background: ${Colors.blue};
`;

export default LoginPage;
