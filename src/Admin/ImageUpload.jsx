import React, { useState } from "react";
import { Upload, Spin, message } from "antd";
import { LuImageUp } from "react-icons/lu";
import axios from "axios";
import styled from "styled-components";

const ImageUpload = ({ imagesUrl, setImagesUrl }) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async ({ file }) => {
    console.log("Upload function triggered", file);

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "https://santhotad.onrender.com/api/signature/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      console.log(response.data);
      const uploadedImageUrl = response.data.imageUrl;
      setImagesUrl(uploadedImageUrl);
      console.log(imagesUrl);
      message.success("Cover image updated successfully!");
    } catch (error) {
      message.error(
        "Upload failed. Please upload file less than 2Mb and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
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
        {loading ? (
          <Spin size="large" />
        ) : imagesUrl ? (
          <img
            src={imagesUrl}
            style={{
              // objectFit: "cover",
              cursor: "pointer",
              maxWidth: "100%",
            }}
            alt="Uploaded"
          />
        ) : (
          <LuImageUp style={{ fontSize: "30px" }} />
        )}
      </CustomButtons>
    </UploadContainer>
  );
};

export default ImageUpload;

const UploadContainer = styled(Upload)`
  width: 100% !important; /* Make it take full width */
  margin-bottom: 5px;
  overflow: hidden;
  .ant-upload {
    width: 100% !important;
    height: 150px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e7e5e5;
    border-radius: 10px;
  }
  img {
    width: 100%;
    height: 150px !important;
  }
  svg {
    font-size: 60px;
    color: #bdbdbd;
  }

  span {
    border-radius: 10px;
    background: #e7e5e5;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;

const CustomButtons = styled.div`
  background: transparent !important;
  border: none !important;
  margin: 0;
`;
