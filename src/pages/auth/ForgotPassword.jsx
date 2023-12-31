import React, { useState } from "react";
import axios from "axios";
import Logo from "../../images/ttn-transparent-logo.png";
import {
  Button,
  FormControl,
  TextField,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { callToast } from "../../helpers";
const VITE_LOCAL_SERVER_URL = "http://localhost:8080";
import * as Message from "../../helpers";
import { EMAIL_IS_BLANK, INVALID_EMAIL_TYPE } from "../../helpers/message";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setMessage("");
    setLoading(true);

    if (!email) {
      setErrorMessage(EMAIL_IS_BLANK);
      setLoading(false);
      return;
    }

    if (!isEmailValid(email)) {
      setErrorMessage(INVALID_EMAIL_TYPE);
      setLoading(false);
      return;
    }

    const forgotPasswordData = {
      email,
    };

    try {
      const response = await axios.post(
        `${VITE_LOCAL_SERVER_URL}/api/auth/forgot-password`,
        forgotPasswordData
      );

      if (response.data.success) {
        setMessage(response.data.data.message);
        callToast("success", "Redirect to the login page after 3 seconds");
        // Redirect to the login page after 3 seconds
        setTimeout(() => {
          navigate("/auth/login");
        }, 3000);
      } else if (response.data.error) {
        setErrorMessage(response.data.error);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen" style={{ background: "#fff" }}>
      <div className="flex items-center justify-center w-100">
        <div className="mt-24" style={{ width: "400px" }}>
          <div>
            <Button
              onClick={() => {
                window.location.href = "/auth/login";
              }}
            >
              <ArrowBackIcon />
            </Button>
          </div>
          <div className="w-full flex justify-center mb-5">
            <img src={Logo} alt="" width={"100px"} height={"100px"} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <FormControl fullWidth>
                <TextField
                  autoComplete="nope"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            </div>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                {errorMessage && <div>{errorMessage}</div>}
                {message && <div>{message}</div>}
              </div>
            )}
            <div className="flex items-center">
              <div className="mr-3 w-full">
                <FormControl fullWidth>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </FormControl>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
