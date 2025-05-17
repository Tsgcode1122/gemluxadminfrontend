import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const SignatureUpload = ({ onImageUpload }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const handleUpload = async ({ file }) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://santhotad.onrender.com/api/signature/send",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      const uploadedImageUrl = response.data.imageUrl;
      setImageUrl(uploadedImageUrl);

      // Pass the image URL back to the parent form
      if (onImageUpload) {
        onImageUpload(uploadedImageUrl);
      }
    } catch (error) {
      message.error(
        "Upload failed. Kindly make sure you upload image only || or upload from gallery",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>
      <Upload customRequest={handleUpload} showUploadList={false}>
        <Button loading={loading}>Click to Upload</Button>
      </Upload>
      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{ maxWidth: "100%", height: "30px" }}
          />
        </div>
      )}
    </div>
  );
};

export default SignatureUpload;
