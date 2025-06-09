import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Input, Upload, message, Popconfirm } from "antd";
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Contain = styled.div`
  padding: 0rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1rem;
  max-width: 800px;
`;
const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background: white;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  border-radius: 4px;
`;

const EditBtn = styled(Button)`
  position: absolute;
  top: 10px;
  right: 50px;
`;

const DeleteBtn = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ServiceModal = styled(Modal)`
  .ant-modal-content {
    backdrop-filter: blur(5px);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  }
`;

const SingleServiceManager = () => {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    heading: "",
    subHeading: "",
    price: "",
    writeup: "",
    keyBenefits: ["", "", ""],
  });
  const [imageUrl, setImageUrl] = useState("");

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5003/api/single-service");
      setServices(res.data);
    } catch {
      message.error("Failed to load services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openModal = (service = null) => {
    setEditingService(service);
    setFormData({
      name: service?.name || "",
      heading: service?.heading || "",
      subHeading: service?.subHeading || "",
      price: service?.price || "",
      writeup: service?.writeup || "",
      keyBenefits: service?.keyBenefits || ["", "", ""],
    });
    setImageUrl(service?.image || "");
    setModalOpen(true);
  };

  const handleUpload = async ({ file }) => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await axios.post(
        "http://localhost:5003/api/signature/upload",
        form,
      );
      setImageUrl(res.data.imageUrl);
      message.success("Image uploaded successfully");
    } catch {
      message.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        image: imageUrl,
      };
      if (editingService?._id) payload._id = editingService._id;

      await axios.put("http://localhost:5003/api/single-service", payload);
      message.success("Service saved");
      setModalOpen(false);
      fetchServices();
    } catch {
      message.error("Save failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5003/api/single-service/${id}`);
      message.success("Service deleted");
      fetchServices();
    } catch {
      message.error("Delete failed");
    }
  };

  return (
    <>
      <Container>
        <Contain>
          {services.map((s) => (
            <Card key={s._id}>
              <EditBtn icon={<EditOutlined />} onClick={() => openModal(s)} />
              <Popconfirm
                title="Are you sure?"
                onConfirm={() => handleDelete(s._id)}
              >
                <DeleteBtn icon={<DeleteOutlined />} danger />
              </Popconfirm>
              {s.image && <Image src={s.image} alt="service" />}
              <h3>{s.name}</h3>
              <p>{s.heading}</p>
              <small>{s.price}</small>
            </Card>
          ))}
        </Contain>

        <div style={{ textAlign: "center", marginTop: 30 }}>
          <Button type="primary" onClick={() => openModal()}>
            Add New Single Service
          </Button>
        </div>
      </Container>
      <ServiceModal
        title={
          editingService ? "Edit Single Service" : "Add New Single Service"
        }
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit}
        confirmLoading={loading}
        okText={editingService ? "Update This Service" : "Save New Service"}
      >
        <Input
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Heading"
          value={formData.heading}
          onChange={(e) =>
            setFormData({ ...formData, heading: e.target.value })
          }
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Sub Heading"
          value={formData.subHeading}
          onChange={(e) =>
            setFormData({ ...formData, subHeading: e.target.value })
          }
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          style={{ marginBottom: 10 }}
        />
        <Input.TextArea
          rows={3}
          placeholder="Writeup"
          value={formData.writeup}
          onChange={(e) =>
            setFormData({ ...formData, writeup: e.target.value })
          }
          style={{ marginBottom: 10 }}
        />

        <div>
          {formData.keyBenefits.map((b, i) => (
            <Input
              key={i}
              placeholder={`Key Benefit ${i + 1}`}
              value={b}
              onChange={(e) => {
                const updated = [...formData.keyBenefits];
                updated[i] = e.target.value;
                setFormData({ ...formData, keyBenefits: updated });
              }}
              style={{ marginBottom: 8 }}
            />
          ))}
        </div>

        <Upload
          customRequest={handleUpload}
          showUploadList={false}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>
            {imageUrl ? "Replace Image" : "Upload Image"}
          </Button>
        </Upload>
        {imageUrl && (
          <Image src={imageUrl} alt="preview" style={{ marginTop: 10 }} />
        )}
      </ServiceModal>
    </>
  );
};

export default SingleServiceManager;
