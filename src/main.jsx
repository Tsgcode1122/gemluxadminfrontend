import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { UserDataProvider } from "./context/UserDataContext.jsx";
import { SendEmailProvider } from "./context/SendEmailContext.jsx";
import { ForgetPasswordProvider } from "./context/forgetPasswordContext.jsx";
import { ResetPasswordProvider } from "./context/ResetPasswordContext.jsx";
import { BlogProvider } from "./context/BlogContext.jsx";

createRoot(document.getElementById("root")).render(
  <BlogProvider>
    <ResetPasswordProvider>
      <ForgetPasswordProvider>
        <UserDataProvider>
          <UserProvider>
            <SendEmailProvider>
              <StrictMode>
                <App />
              </StrictMode>
            </SendEmailProvider>
          </UserProvider>
        </UserDataProvider>
      </ForgetPasswordProvider>
    </ResetPasswordProvider>
  </BlogProvider>,
);
