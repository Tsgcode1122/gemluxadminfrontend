import React, { useState } from "react";
import styled from "styled-components";
import { Input, Button, Form, message } from "antd";
import axios from "axios";
import { Colors } from "../Colors/ColorComponent";
import { breakpoints } from "../FixedComponent/BreakPoints";
import SectionDiv from "./SectionDiv";

const NewsletterForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      await axios.post("https://santhotad.onrender.com/api/email/subscribe", {
        email: values.email,
      });
      message.success("Subscribed successfully!");
      form.resetFields();
    } catch (error) {
      if (error.errorFields) {
        message.error("Please enter a valid email.");
      } else {
        message.error("Subscription failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <SectionDiv>
        <Content>
          <GroupOne>
            <Title>Subscribe to our Newsletter</Title>
            <small>
              Subscribe for Updates: Stay informed about the latest investor
              updates, financial results, and announcements by subscribing to
              our newsletter
            </small>
          </GroupOne>
          <GroupTwo>
            <Form form={form} noStyle>
              <InputWrapper noStyle>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                  style={{ flex: 1, marginBottom: 0 }} // Keeps original styling
                >
                  <StyledInput placeholder="Enter your email" />
                </Form.Item>
                <StyledButton
                  type="primary"
                  loading={loading}
                  onClick={handleSubmit}
                >
                  Subscribe
                </StyledButton>
              </InputWrapper>
            </Form>
          </GroupTwo>
        </Content>
      </SectionDiv>
    </Container>
  );
};

export default NewsletterForm;

const Container = styled.div`
  background: ${Colors.blue};
`;

const Content = styled.div`
  display: grid;

  gap: 1rem;
  @media (min-width: ${breakpoints.xs}) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  align-items: center;
  @media (min-width: ${breakpoints.m}) {
    padding: 1.5rem 5rem;
  }
`;

const GroupOne = styled.div`
  margin: 0;
  small {
    color: #f9f9f9;
    margin: 0;
    padding-top: 10px;
    @media (min-width: ${breakpoints.xs}) {
      font-size: 14px;
    }
  }
`;

const GroupTwo = styled.div``;

const Title = styled.h3`
  color: ${Colors.white};
  margin: 10px 0;
  padding: 0;
  @media (min-width: ${breakpoints.xs}) {
    font-size: 20px;
  }
  @media (min-width: ${breakpoints.xl}) {
    font-size: 24px;
    margin: 20px 0;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0rem;
  border-radius: 15px;
  height: 50px;
  background: #3256d7;
  .ant-form-item-explain {
    position: absolute;
    top: 40px;
    left: 10px;
    color: red;
    font-size: 12px;
  }
  @media screen and (max-width: 320px) {
    max-width: 90%;
  }
  @media (min-width: 321px) and (max-width: 399px) {
    max-width: 90%;
  }
  @media (min-width: 400px) and (max-width: 499px) {
    max-width: 90%;
  }
`;

const StyledInput = styled(Input)`
  flex: 1;
  margin-right: 1rem;
  border-radius: 10px;
  background-color: transparent !important;
  color: white !important;
  border: none !important;

  ::placeholder {
    color: white;
    opacity: 0.8;
    font-weight: 300;
  }

  &::-webkit-input-placeholder,
  &::-moz-placeholder,
  &:-ms-input-placeholder,
  &::-ms-input-placeholder {
    color: white;
    opacity: 0.8;
    font-weight: 100;
    padding-left: 20px;
  }

  &:hover,
  &:focus {
    background: transparent !important;
    outline: none !important;
    box-shadow: none !important;
  }
`;

const StyledButton = styled(Button)`
  padding: 0.75rem 1rem;
  border-radius: 0 15px 15px 0;
  background: ${Colors.white};
  border: none;
  font-weight: 900;
  height: 50px;
  color: ${Colors.blue};

  &:hover {
    background-color: #4ea3f6;
  }
`;
