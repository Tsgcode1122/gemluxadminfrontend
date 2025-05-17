import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Create a new blog

  // Update a blog
  const updateBlog = async (id, updatedData) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${"https://santhotad.onrender.com/api/blogs"}/${id}`,
        updatedData,
      );
    } catch (error) {
      console.error("Error updating blog:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a blog
  const deleteBlog = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${"https://santhotad.onrender.com/api/blogs"}/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlogContext.Provider value={{ blogs, loading, updateBlog, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => useContext(BlogContext);
