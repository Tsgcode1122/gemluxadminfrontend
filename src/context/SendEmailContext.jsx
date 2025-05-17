import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const SendEmailContext = createContext();

export const SendEmailProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null); // State to store response data

  const ResetSendEmail = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://santhotad.onrender.com/api/email/send-verification-code",
        email,
      );
      // Log success message or handle response
      localStorage.setItem(
        "verificationToken",
        JSON.stringify(response.data.token),
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error sending email:", error);
      setError(error.message || "An error occurred while sending the email");
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    ResetSendEmail,
    loading,
    error,
    responseData, // Include responseData in the context value
  };

  return (
    <SendEmailContext.Provider
      value={{
        contextValue,
        SendEmailContext,
        SendEmailProvider,
        ResetSendEmail,
        responseData,
      }}
    >
      {children}
    </SendEmailContext.Provider>
  );
};

export const useSendEmail = () => useContext(SendEmailContext);
