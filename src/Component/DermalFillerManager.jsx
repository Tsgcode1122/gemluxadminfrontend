import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Upload, message, Space, Typography } from "antd";
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import axios from "axios";

const { TextArea } = Input;
const { Title } = Typography;

const Container = styled.div`
  padding: 2rem;
  display: grid;
  gap: 1rem;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #eee;
  padding: 1rem;
  border-radius: 8px;
  position: relative;
`;

const DermalFillerManager = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    image: "",
    writeup: "",
    faqs: [{ question: "", answer: "" }],
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5003/api/dermalfiller");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpload = async ({ file }) => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await axios.post(
        "http://localhost:5003/api/signature/upload",
        form,
      ); // Use your actual image upload route
      setFormData((prev) => ({ ...prev, image: res.data.imageUrl }));
      message.success("Image uploaded");
    } catch {
      message.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (entry = null) => {
    setEditing(entry);
    setFormData(
      entry || {
        image: "",
        writeup: "",
        faqs: [{ question: "", answer: "" }],
      },
    );
    setModalOpen(true);
  };

  const handleSave = async () => {
    const payload = editing?._id ? { ...formData, _id: editing._id } : formData;
    try {
      await axios.put("http://localhost:5003/api/dermalfiller", payload);
      message.success("Saved successfully");
      setModalOpen(false);
      fetchData();
    } catch {
      message.error("Save failed");
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Delete this entry?",
      onOk: async () => {
        await axios.delete(`/api/dermalfiller/${id}`);
        fetchData();
      },
    });
  };

  return (
    <>
      <Container>
        {data.map((item) => (
          <Card key={item._id}>
            {item.image && (
              <img
                src={item.image}
                alt="Dermal"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            )}
            <p>{item.writeup}</p>
            <ul>
              {item.faqs.map((faq, index) => (
                <li key={index}>
                  <strong>{faq.question}</strong>
                  <br />
                  {faq.answer}
                </li>
              ))}
            </ul>
            <Space style={{ position: "absolute", top: 10, right: 10 }}>
              <Button icon={<EditOutlined />} onClick={() => openModal(item)} />
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleDelete(item._id)}
              />
            </Space>
          </Card>
        ))}
      </Container>

      <Modal
        open={modalOpen}
        title={editing ? "Edit Dermal Filler" : "New Dermal Filler"}
        onCancel={() => setModalOpen(false)}
        onOk={handleSave}
        confirmLoading={loading}
        width={700}
      >
        <TextArea
          placeholder="Writeup"
          rows={4}
          value={formData.writeup}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, writeup: e.target.value }))
          }
          style={{ marginBottom: "1rem" }}
        />
        <Upload customRequest={handleUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />}>
            {formData.image ? "Change Image" : "Upload Image"}
          </Button>
        </Upload>
        {formData.image && (
          <img
            src={formData.image}
            alt="Uploaded"
            style={{ marginTop: "1rem", width: "100%", borderRadius: "8px" }}
          />
        )}

        <Title level={5} style={{ marginTop: "1rem" }}>
          FAQs
        </Title>
        {formData.faqs.map((faq, index) => (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <Input
              placeholder="Question"
              value={faq.question}
              onChange={(e) => {
                const newFaqs = [...formData.faqs];
                newFaqs[index].question = e.target.value;
                setFormData((prev) => ({ ...prev, faqs: newFaqs }));
              }}
              style={{ marginBottom: "0.5rem" }}
            />
            <TextArea
              placeholder="Answer"
              value={faq.answer}
              rows={2}
              onChange={(e) => {
                const newFaqs = [...formData.faqs];
                newFaqs[index].answer = e.target.value;
                setFormData((prev) => ({ ...prev, faqs: newFaqs }));
              }}
            />
            <Button
              icon={<MinusCircleOutlined />}
              type="link"
              danger
              onClick={() => {
                const newFaqs = formData.faqs.filter((_, i) => i !== index);
                setFormData((prev) => ({ ...prev, faqs: newFaqs }));
              }}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="dashed"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              faqs: [...prev.faqs, { question: "", answer: "" }],
            }))
          }
          block
          icon={<PlusOutlined />}
        >
          Add FAQ
        </Button>
      </Modal>
      <Button
        type="primary"
        onClick={() => openModal()}
        icon={<PlusOutlined />}
        style={{ marginBottom: "1rem" }}
      >
        Add Dermal Filler Entry
      </Button>
    </>
  );
};

export default DermalFillerManager;
