import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Skeleton, Result, Button } from "antd";
import styled from "styled-components";
import { useUserData } from "../context/UserDataContext";
import AdminRoutes from "./AdminRoutes";

const StyledResult = styled(Result)`
  .ant-result-title {
    color: black !important;
  }
  .ant-result-subtitle {
    color: black !important;
  }
`;

const ProtectedAdminDashboardPage = () => {
  const navigate = useNavigate();
  const { userData } = useUserData();
  const userId = userData ? userData._id : null;

  const [isAdmin, setIsAdmin] = useState(null); // null means waiting for the admin status

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get(
          `https://santhotad.onrender.com/api/auth/${userId}`,
        );
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate("/"); // Redirect to home if there's an error
      }
    };

    if (userData && userId) {
      checkAdminStatus();
    }
  }, [userData, navigate, userId]);

  // If we are still waiting for the admin status check, show a full page skeleton
  if (isAdmin === null) {
    return <Skeleton active paragraph={{ rows: 10 }} />;
  }

  // If the user is not an admin, show the error message
  if (isAdmin === false) {
    return (
      <StyledResult
        status="403"
        title="403 Forbidden"
        subTitle="Oops! You are not authorized to access this page."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    );
  }

  // If the user is an admin, show the admin dashboard
  return <AdminRoutes />;
};

export default ProtectedAdminDashboardPage;
