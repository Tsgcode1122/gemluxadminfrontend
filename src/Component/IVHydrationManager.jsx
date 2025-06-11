import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Input, Upload, message, Space, Typography } from "antd";
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const { TextArea } = Input;
const { Title } = Typography;

const Container = styled.div`
  padding: 2rem;
  margin-top: 3rem;
  margin-bottom: 5rem !important;

  align-items: center;
  flex-direction: column;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;
const Contain = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  justify-content: center;
  width: 100%;
`;
const Card = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  background: white;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 6px;
`;

const IVHydrationManager = () => {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    intro: "",
    outro: "",
    image: "",
    keyBenefits: ["", "", ""],
  });
  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    try {
      const res = await axios.get(
        "https://gemluxeadminbackend.onrender.com/api/ivhydration",
      );
      setServices(res.data);
    } catch {
      message.error("Failed to load services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openModal = (service = null) => {
    setEditing(service);
    setFormData(
      service || {
        name: "",
        intro: "",
        outro: "",
        image: "",
        keyBenefits: ["", "", ""],
      },
    );
    setModalOpen(true);
  };

  const handleUpload = async ({ file }) => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append("image", file);
      const res = await axios.post(
        "https://gemluxeadminbackend.onrender.com/api/signature/upload",
        data,
      );
      setFormData((prev) => ({ ...prev, image: res.data.imageUrl }));
      message.success("Image uploaded");
    } catch {
      message.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const payload = editing?._id
        ? { ...formData, _id: editing._id }
        : formData;
      await axios.put(
        "https://gemluxeadminbackend.onrender.com/api/ivhydration",
        payload,
      );
      await axios.post(
        "https://gemluxeadminbackend.onrender.com/api/email/iv-hydration-update",
        {
          isNew: !editing?._id,
          service: payload,
        },
      );

      message.success("Saved successfully");
      setModalOpen(false);
      fetchServices();
    } catch {
      message.error("Failed to save");
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this service?",
      onOk: async () => {
        try {
          await axios.delete(`/api/ivhydration/${id}`);
          fetchServices();
        } catch {
          message.error("Failed to delete");
        }
      },
    });
  };

  return (
    <>
      <Container>
        <Contain>
          {services.map((srv) => (
            <Card key={srv._id}>
              <Image src={srv.image} alt="IV" />
              <Title level={4}>{srv.name}</Title>
              <p>{srv.intro}</p>
              <p>
                <strong>Key Benefits</strong>
              </p>
              <ul>
                {srv.keyBenefits?.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <p>
                <strong>Outro:</strong> {srv.outro}
              </p>
              <Space style={{ position: "absolute", top: 10, right: 10 }}>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => openModal(srv)}
                />
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleDelete(srv._id)}
                />
              </Space>
            </Card>
          ))}
        </Contain>
        <Button
          type="primary"
          onClick={() => openModal()}
          style={{ margin: "1rem" }}
        >
          Add IV Hydration Service
        </Button>
      </Container>

      <Modal
        open={modalOpen}
        title={editing ? "Edit IV Hydration" : "New IV Hydration"}
        onCancel={() => setModalOpen(false)}
        onOk={handleSave}
        okText={editing ? "Update" : "Save"}
        confirmLoading={loading}
      >
        <Input
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          style={{ marginBottom: "1rem" }}
        />
        <TextArea
          placeholder="Intro"
          rows={4}
          value={formData.intro}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, intro: e.target.value }))
          }
          style={{ marginBottom: "1rem" }}
        />
        <div style={{ marginBottom: "10px" }}>
          <strong>Key Benefits</strong>
        </div>
        {formData.keyBenefits.map((text, i) => (
          <Input
            key={i}
            placeholder={`Key Benefit ${i + 1}`}
            value={text}
            onChange={(e) => {
              const updated = [...formData.keyBenefits];
              updated[i] = e.target.value;
              setFormData((prev) => ({ ...prev, keyBenefits: updated }));
            }}
            style={{ marginBottom: "0.5rem" }}
          />
        ))}
        <div style={{ marginBottom: "10px" }}>
          <strong>Outro</strong>
        </div>
        <TextArea
          placeholder="Outro"
          rows={4}
          value={formData.outro}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, outro: e.target.value }))
          }
          style={{ marginBottom: "1rem" }}
        />
        <Upload customRequest={handleUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />}>
            {formData.image ? "Replace Image" : "Upload Image"}
          </Button>
        </Upload>
        {formData.image && (
          <Image
            src={formData.image}
            alt="Uploaded"
            style={{ marginTop: "1rem" }}
          />
        )}
      </Modal>
    </>
  );
};

export default IVHydrationManager;
