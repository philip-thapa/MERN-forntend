import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { API } from "../backend";
import Base from "../core/Base";

const ForgetPassword = ({ history }) => {
  const [formData, setFormData] = useState({
    email: "",
    textChange: "Submit",
    success: false,
    error: true,
  });
  const { email, textChange, success, error } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: "Submitting" });
      axios
        .put(`${API}forgot-password`, {
          email,
        })
        .then((res) => {
          setFormData({
            ...formData,
            email: "",
            success: true,
            error: false,
          });
          toast.success(`Please check your email`);
        })
        .catch((err) => {
          console.log(err.response);
          setFormData({
            ...formData,
            error: true,
            success: false,
          });
          toast.error(err.response.data.error);
        });
    } else {
      toast.error("Please enter your email");
    }
  };
  const ResetPasswordForm = () => {
    return (
      <div className="container my-sm-5" style={{ height: "auto" }}>
        <div className="myCard">
          <div className="row ">
            <div className="col-md-6">
              <div className="myLeftCtn">
                <form className="myForm text-center">
                  <header>Reset Password</header>
                  <div className="form-group">
                    <i className="fas fa-envelope"></i>
                    <input
                      className="myInput"
                      placeholder="Email"
                      type="text"
                      id="email"
                      value={email}
                      onChange={handleChange("email")}
                      required
                    />
                  </div>
                  <input
                    type="submit"
                    className="butt mb-4"
                    onClick={handleSubmit}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Base>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <ToastContainer />
        {ResetPasswordForm()}
      </div>
    </Base>
  );
};

export default ForgetPassword;
