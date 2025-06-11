import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Input, Button, Upload, message, Spin, Form, Layout } from "antd";
import { LuImageUp } from "react-icons/lu";
import { CiIndent } from "react-icons/ci";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "../Admin/Sidebar";

const DisplayAbout = () => {
  const [loading, setLoading] = useState(true);
  const [imagesUrl, setImagesUrl] = useState("");
  const [quillText, setQuillText] = useState("");

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const res = await axios.get(
        "https://gemluxeadminbackend.onrender.com/api/about",
      );
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

      await axios.put(
        "https://gemluxeadminbackend.onrender.com/api/about",
        updatedData,
      );
      await axios.post(
        "https://gemluxeadminbackend.onrender.com/api/email/about-update",
        updatedData,
      );
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
        "https://gemluxeadminbackend.onrender.com/api/signature/upload",
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
    <>
      <Wrapper>
        <MainContainer>
          <FlexSection>
            <ImagePreviewCard>
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
              <NoteText>
                click on image to replace image <br />
                <span>Max: 1MB</span>
              </NoteText>
            </ImagePreviewCard>

            <TextSection>
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
            </TextSection>
          </FlexSection>

          <SubmitWrapper>
            <Button type="primary" onClick={onFinish} loading={loading}>
              Submit Changes
            </Button>
          </SubmitWrapper>
        </MainContainer>
      </Wrapper>
    </>
  );
};

export default DisplayAbout;

const Wrapper = styled.div`
  min-height: 100vh;
  margin-bottom: 4rem;
  /* background: #f5f7fa; */
  padding: 2rem;
  display: flex;
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

const MainContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  display: flex;
  flex-direction: column;
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

const FlexSection = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImagePreviewCard = styled.div`
  flex: 1;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 450px;
`;

const UploadWrapper = styled(Upload)`
  width: 100%;
  height: 100%;
  flex-grow: 1;

  .upload-placeholder {
    height: 100%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed #d9d9d9;
    border-radius: 12px;
    background: #f0f0f0;

    svg {
      font-size: 3rem;
      color: #999;
    }

    p {
      margin-top: 0.5rem;
      font-size: 1rem;
      color: #666;
    }
  }
`;

const NoteText = styled.p`
  text-align: center;
  font-size: 0.85rem;
  color: #777;
  padding: 0.5rem;
  background: #fff;
  border-top: 1px solid #e0e0e0;

  span {
    font-size: 0.75rem;
    color: #aaa;
  }
`;

const TextSection = styled.div`
  flex: 1;
`;

const StyledFormItem = styled(Form.Item)`
  width: 100%;

  .word-counter {
    font-size: 0.85rem;
    color: #888;
    margin-top: 0.5rem;
    display: inline-block;
  }
`;

const StyledQuill = styled(ReactQuill)`
  .ql-editor {
    min-height: 400px;
    font-size: 1rem;
    background: #fff;
  }

  .ql-container {
    border-radius: 8px;
  }
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const UploadContainer = styled(Upload)`
  .ant-upload {
    all: unset; /* resets all inherited/default styles */
    /* display: block; */
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  /* Optional: clear inner span or icon container styles */
  .ant-upload-list,
  .ant-upload-select {
    /* display: none !important; */
  }
`;

const CustomButtons = styled.div`
  border: 2px dashed #d9d9d9;
  /* display: flex; */
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s;
  width: 100%;
  height: 100%;
  /* min-height: 300px; */

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
