import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Input, Upload, message, Spin } from "antd";
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  margin-top: 3rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const ServiceCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1rem;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const EditButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 50px;
`;

const DeleteButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const AddButtonWrapper = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const ImagePreview = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const CustomModalStyle = {
  backdropFilter: "blur(8px)",
  backgroundColor: "rgba(255,255,255,0.6)",
  borderRadius: "12px",
  boxShadow: "0 0 25px rgba(0, 0, 0, 0.3)",
};

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ heading: "", content: "" });
  const [imagesUrl, setImagesUrl] = useState("");

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5003/api/service");
      setServices(res.data);
    } catch (err) {
      message.error("Failed to load services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openModal = (service = null) => {
    setEditingService(service);
    setFormData({
      heading: service?.heading || "",
      content: service?.content || "",
    });
    setImagesUrl(service?.image || "");
    setModalOpen(true);
  };

  const handleUpload = async ({ file }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(
        "http://localhost:5003/api/signature/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      setImagesUrl(response.data.imageUrl);
      message.success("Cover image updated successfully!");
    } catch (error) {
      message.error(
        "Upload failed. Please upload a file less than 2MB and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        heading: formData.heading,
        content: formData.content,
        image: imagesUrl,
      };
      if (editingService?._id) {
        payload._id = editingService._id;
      }

      await axios.put("http://localhost:5003/api/service", payload);
      message.success("Service saved successfully!");
      setModalOpen(false);
      fetchServices();
    } catch (error) {
      message.error("Failed to save service");
    }
  };

  const confirmDelete = (serviceId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this service?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => handleDelete(serviceId),
    });
  };

  const handleDelete = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:5003/api/service/${serviceId}`);
      message.success("Service deleted successfully!");
      fetchServices();
    } catch (error) {
      message.error("Failed to delete service");
    }
  };

  return (
    <Container>
      <Grid>
        {services.map((service) => (
          <ServiceCard key={service._id}>
            <EditButton
              icon={<EditOutlined />}
              onClick={() => openModal(service)}
            />
            <DeleteButton
              icon={<DeleteOutlined />}
              danger
              onClick={() => confirmDelete(service._id)}
            />
            {service.image && (
              <ImagePreview src={service.image} alt="Service" />
            )}
            <h3>{service.heading}</h3>
            <p>{service.content}</p>
          </ServiceCard>
        ))}
      </Grid>

      <AddButtonWrapper>
        <Button type="primary" onClick={() => openModal()}>
          Add New Service
        </Button>
      </AddButtonWrapper>

      <Modal
        title={editingService ? "Edit Service" : "Add New Service"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit}
        confirmLoading={loading}
        okText={editingService ? "Update This Service" : "Save New Service"}
        bodyStyle={CustomModalStyle}
      >
        <Input
          placeholder="Title"
          value={formData.heading}
          onChange={(e) =>
            setFormData({ ...formData, heading: e.target.value })
          }
          style={{ marginBottom: "1rem" }}
        />
        <Input.TextArea
          rows={4}
          placeholder="Description"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          style={{ marginBottom: "1rem" }}
        />
        <Upload
          customRequest={handleUpload}
          showUploadList={false}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>
            {imagesUrl ? "Replace Image" : "Upload Image"}
          </Button>
        </Upload>
        {imagesUrl && <ImagePreview src={imagesUrl} alt="Preview" />}
      </Modal>
    </Container>
  );
};

export default ServiceManager;
