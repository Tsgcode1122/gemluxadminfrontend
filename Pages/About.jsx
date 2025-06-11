import React, { useState, useEffect } from "react";
import {
  Layout,
  Button,
  Input,
  Select,
  Upload,
  Form,
  notification,
  message,
  Spin,
} from "antd";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Colors } from "../Colors/ColorComponent";
import { PlusOutlined } from "@ant-design/icons";
import { LuImageUp } from "react-icons/lu";
import { IoIosLink } from "react-icons/io";
import { CiUser, CiIndent } from "react-icons/ci";
import { useBlogContext } from "../context/BlogContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import { breakpoints } from "../FixedComponent/BreakPoints";
const { TextArea } = Input;

const About = () => {
  const [loading, setLoading] = useState(false);
  const [quillText, setQuillText] = useState("");
  const [text, setText] = useState("");
  const [imagesUrl, setImagesUrl] = useState(null);
  const [form] = Form.useForm();
  const { id } = useParams();
  const countWords = (content) => {
    return content
      .replace(/<[^>]+>/g, " ") // Remove HTML tags
      .trim()
      .split(/\s+/)
      .filter(Boolean).length; // Filter empty spaces
  };
  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://gemluxeadminbackend.onrender.com/api/about`,
        );
        const data = response.data;

        // Populate form fields with data
        form.setFieldsValue({
          imagesAlt: data.imagesAlt,
          metaDescription: data.metaDescription,
        });

        setQuillText(data.description);
        setText(data.metaDescription);
        setImagesUrl(data.imagesUrl);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id, form]);
  const onFinish = async (values) => {
    setLoading(true);

    try {
      const updatedData = { ...values, description: quillText, imagesUrl };
      await axios.post(
        `https://gemluxeadminbackend.onrender.com/api/about`,
        updatedData,
      );

      message.success("Post updated successfully!");

      // Redirect or show success notification
    } catch (error) {
      console.error("Error updating post:", error);
      notification.error({
        message: "Update Failed",
        description: "There was an issue updating the post.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardContainer
      form={form}
      onFinish={onFinish}
      layout="vertical"
      noStyle
    >
      <TypeCard>
        <StyledFormItem label="Description" name="description" noStyle>
          <StyledWrapper>
            <StyledQuill
              theme="snow"
              value={quillText}
              onChange={setQuillText}
            />
            <span className="word-counter">({countWords(quillText)}/800)</span>
          </StyledWrapper>
        </StyledFormItem>
        <StyledFormItem noStyle>
          <CustomButtons style={{ textAlign: "right", marginTop: "10px" }}>
            <Butt type="primary" htmlType="submit" loading={loading}>
              Update ABout US
            </Butt>
          </CustomButtons>
        </StyledFormItem>
      </TypeCard>

      <SecondPart>
        {/* Cover Image & Meta Description */}
        <div
          style={{
            background: "white",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            flex: 1,
          }}
        >
          <p style={{ margin: "0", paddingBottom: "5px" }}>Cover Image</p>

          <ImageUpload setImagesUrl={setImagesUrl} imagesUrl={imagesUrl} />
          <p
            style={{
              textAlign: "right",
              margin: "0",
              color: "#ccc",
              paddingBottom: "10px",
            }}
          >
            Replace Image
          </p>
          <StyledFormItem
            name="imagesAlt"
            label="ImageAlt"
            noStyle
            rules={[
              {
                required: true,

                message: "enter image alt",
              },
            ]}
          >
            <Input
              placeholder="Image Alt Text"
              style={{ marginTop: "10px" }}
              prefix={
                <CiIndent style={{ color: "#000000", fontSize: "18px" }} />
              }
            />
          </StyledFormItem>

          {/* Meta Description */}
        </div>
      </SecondPart>
    </DashboardContainer>
  );
};

export default About;

const StyledFormItem = styled(Form.Item)``;

const CustomButtons = styled.div`
  background: transparent !important;
  border: none !important;
  margin: 0;
`;
const DashboardContainer = styled(Form)`
  .ant-form-item {
    margin-bottom: 34px;
  }

  padding: 20px;
  background: #f5f5f5;
  min-height: calc(100vh - 4rem);
  display: grid;
  gap: 20px;
  width: 100%;
  grid-template-columns: 7fr 3fr;
  justify-content: center;
`;

const SecondPart = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  gap: 60px;
  min-height: calc(100vh - 8rem);
`;

const TypeCard = styled.div`
  min-width: 500px;

  background: white;
  min-height: calc(100vh - 8rem);
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border: 1px solid #ccc;
  @media (min-width: ${breakpoints.xl}) {
    min-width: 700px;
  }
`;

const CustomButton = styled.div`
  margin-right: 40px;
`;

const Butt = styled(Button)`
  background: transparent !important;
  color: ${Colors.blue} !important;
  border: 1px solid ${Colors.blue} !important;
`;

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;

  .word-counter {
    position: absolute;
    bottom: 8px;
    left: 10px;
    font-size: 12px;
    color: #999;
  }
`;

const StyledQuill = styled(ReactQuill)`
  .ql-container {
    height: 60vh !important;
  }
  .ql-editor {
    min-height: 250px;
    padding-bottom: 30px; /* Prevent overlap */
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  .counter {
    position: absolute;
    bottom: 8px;
    left: 10px;
    font-size: 12px;
    color: #999;
  }
`;
