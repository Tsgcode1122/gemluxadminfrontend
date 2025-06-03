import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Input, Button, Upload, message, Spin, Form } from "antd";
import { LuImageUp } from "react-icons/lu";
import { CiIndent } from "react-icons/ci";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DisplayAbout = () => {
  const [loading, setLoading] = useState(true);
  const [imagesUrl, setImagesUrl] = useState("");
  const [quillText, setQuillText] = useState("");

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const res = await axios.get("http://localhost:5003/api/about");
      setImagesUrl(res.data.image);
      setQuillText(res.data.content);
    } catch (err) {
      message.error("Failed to load About Us content");
    } finally {
      setLoading(false);
    }
  };

  const countWords = (content) => {
    if (!content || typeof content !== "string") return 0;
    return content
      .replace(/<[^>]+>/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
  };

  const onFinish = async () => {
    setLoading(true);
    try {
      const updatedData = {
        content: quillText,
        image: imagesUrl,
      };

      await axios.put("http://localhost:5003/api/about", updatedData);
      message.success("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
      message.error("There was an issue updating the post.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async ({ file }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "http://localhost:5003/api/signature/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      const uploadedImageUrl = response.data.imageUrl;
      setImagesUrl(uploadedImageUrl);
      message.success("Cover image updated successfully!");
    } catch (error) {
      message.error(
        "Upload failed. Please upload a file less than 2MB and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Container>
        <ImageSection>
          <p>Cover Image</p>
          <UploadContainer
            customRequest={handleUpload}
            showUploadList={false}
            listType="picture-card"
            beforeUpload={(file) => {
              handleUpload({ file });
              return false;
            }}
          >
            <CustomButtons>
              {imagesUrl ? (
                <img src={imagesUrl} alt="Uploaded" />
              ) : (
                <LuImageUp />
              )}
            </CustomButtons>
          </UploadContainer>
          <p className="note">
            Replace Image <br />
            <span className="subnote">Not more than 1MB</span>
          </p>
        </ImageSection>

        <ContentBox>
          <StyledFormItem label="Description">
            <StyledQuill
              theme="snow"
              value={quillText}
              onChange={setQuillText}
            />
            <span className="word-counter">
              ({countWords(quillText)}/800 words)
            </span>
          </StyledFormItem>
        </ContentBox>
        <Button
          type="primary"
          onClick={onFinish}
          loading={loading}
          style={{ marginTop: "1rem" }}
        >
          Submit Changes
        </Button>
      </Container>
    </Spin>
  );
};

export default DisplayAbout;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  padding: 2rem;

  background: #f5f5f5;
  min-height: calc(100vh - 4rem);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const ImageSection = styled.div`
  /* background: #ffffff; */
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;

  .note {
    margin-top: 0.5rem;
    text-align: center;
    font-size: 0.9rem;
    color: #888;
  }

  .subnote {
    font-size: 0.8rem;
    color: #aaa;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ContentBox = styled.div`
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  min-width: 300px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const UploadContainer = styled(Upload)`
  .ant-upload {
    width: 100%;
  }
`;

const CustomButtons = styled.div`
  width: 100%;
  height: 200px;
  border: 2px dashed #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s;

  &:hover {
    border-color: #1890ff;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const StyledFormItem = styled(Form.Item)`
  width: 100%;
  margin-top: 1rem;

  .word-counter {
    font-size: 0.85rem;
    color: #888;
    margin-top: 0.5rem;
    display: inline-block;
  }
`;

const StyledQuill = styled(ReactQuill)`
  .ql-editor {
    min-height: 200px;
    font-size: 1rem;
    background: #fff;
  }

  .ql-container {
    border-radius: 8px;
  }
`;
