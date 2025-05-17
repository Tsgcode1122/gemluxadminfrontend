import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { Card, Tooltip, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { breakpoints } from "../FixedComponent/BreakPoints";

const IntroTitle = styled.p`
  padding-left: 20px;
`;
const Container = styled.div`
  background: #ececec;
  width: 100%;
  margin-top: -1rem !important;
  padding: 40px 1rem;
  @media (min-width: ${breakpoints.m}) {
    margin-top: 1rem !important;
    padding: 40px 60px 40px 60px;
  }
`;
const PostsContainer = styled.div`
  display: grid;
  height: 70vh;
  overflow-y: auto;
  margin: 0 !important;
  border-radius: 5px;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
  @media (min-width: ${breakpoints.m}) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
  width: 100%;

  padding: 0 20px 40px 20px;
  background: white;
  &::-webkit-scrollbar {
    margin-left: 10px !important;
    width: 8px;

    position: absolute !important;
    border: 1px solid #f0f0f0;
    padding: 1.1px;
    border-radius: 5px;
    background-color: white;
  }

  &::-webkit-scrollbar-thumb {
    background: #d5d5d5;

    margin-left: 10px !important;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin-left: 10px !important;
  }
`;
const Wrapper = styled.div`
  background: white;
  border: 1px solid #ccc;
  padding: 10px 5px;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  margin: 0 !important;
  @media (min-width: ${breakpoints.m}) {
    padding: 20px;
  }
`;
const ActionsContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 6px 10px;
  border: 1px solid #ccc;
  display: flex;
  align-self: flex-end;
  gap: 10px;
`;

const ActionIcon = styled.span`
  cursor: pointer;
  font-size: 18px;
  color: #666;
  &:hover {
    color: #333;
  }
`;

const StyledCard = styled.div`
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 150px;
  @media (min-width: ${breakpoints.m}) {
    height: 180px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PostTitle = styled.div`
  margin-top: 10px;
  font-size: 12px;
  font-weight: 300;
  color: #b7b7b7;
  text-align: left;
  word-wrap: break-word;
`;

const AllPostContent = () => {
  const [blogs, setBlogs] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "https://santhotad.onrender.com/api/blogs/getBlogs",
      );
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const showDeleteConfirm = (blogId) => {
    setSelectedBlogId(blogId);
    setDeleteModalVisible(true);
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  const handleDelete = async () => {
    if (!selectedBlogId) {
      message.error("Invalid Blog ID");
      return;
    }

    try {
      await axios.delete(
        `https://santhotad.onrender.com/api/blogs/${selectedBlogId}`,
      );
      message.success("Blog post deleted successfully!");
      setDeleteModalVisible(false);
      setSelectedBlogId(null);
      fetchBlogs(); // Refresh list after delete
    } catch (error) {
      message.error("Failed to delete blog post.");
      console.error("Delete error:", error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <IntroTitle>All post</IntroTitle>
        <PostsContainer>
          {blogs.map((blog) => (
            <StyledCard key={blog._id}>
              <ActionsContainer>
                <Tooltip title="Edit">
                  <ActionIcon onClick={() => handleEdit(blog._id)}>
                    <EditOutlined />
                  </ActionIcon>
                </Tooltip>
                <Tooltip title="Delete">
                  <ActionIcon onClick={() => showDeleteConfirm(blog._id)}>
                    <DeleteOutlined />
                  </ActionIcon>
                </Tooltip>
              </ActionsContainer>
              <ImageContainer>
                {blog.imagesAlt ? (
                  <img
                    src={blog.imagesUrl}
                    alt={blog.imagesAlt || "Post Cover"}
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/300"
                    alt="Placeholder"
                  />
                )}
              </ImageContainer>
              <PostTitle>
                <strong>{blog.title}:</strong> {blog.metaDescription}
              </PostTitle>
            </StyledCard>
          ))}
        </PostsContainer>
      </Wrapper>

      <StyledModal
        title="Delete Blog Post"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this blog post?</p>
      </StyledModal>
    </Container>
  );
};

export default AllPostContent;
const StyledModal = styled(Modal)`
  /* height: 90vh; */
  display: flex;
  align-items: flex-start;
  justify-content: center;

  width: 72vw !important;
  /* position: fixed; */
  right: 0;

  .ant-modal-mask {
    backdrop-filter: none;
  }

  .ant-modal {
  }
`;
