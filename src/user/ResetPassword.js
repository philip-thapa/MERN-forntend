import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { API } from "../backend";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
const ResetPassword = ({ match }) => {
  const [formData, setFormData] = useState({
    password1: "",
    password2: "",
    token: "",
    textChange: "Submit",
    success: false,
    error: "",
  });
  const { password1, password2, textChange, token, success } = formData;

  useEffect(() => {
    let token = match.params.token;
    if (token) {
      console.log(token);
      setFormData({ ...formData, token });
    }
  }, []);
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = (e) => {
    console.log(password1, password2);
    e.preventDefault();
    if (password1 === password2 && password1 && password2) {
      setFormData({ ...formData, textChange: "Submitting" });
      axios
        .put(`${API}reset-password`, {
          newPassword: password1,
          resetLink: token,
        })
        .then((res) => {
          console.log(res.data.message);
          setFormData({
            ...formData,
            password1: "",
            password2: "",
            success: true,
            error: false,
          });
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error("Something is wrong try again");
          setFormData({
            ...formData,
            error: true,
            success: false,
          });
        });
    } else {
      toast.error("Passwords don't matches");
      setFormData({
        ...formData,
        success: false,
        error: true,
      });
    }
  };

  const performRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/signin" />;
    }
  };
  return (
    <Base>
      <ToastContainer />
      <div class="container">
        <div class="myCard">
          <div class="row">
            <div class="col-md-6">
              <div class="myLeftCtn">
                <form className="myForm text-center" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <i className="fas fa-lock"></i>
                    <input
                      className="myInput"
                      type="password"
                      id="Confirm password"
                      placeholder="Password"
                      value={password1}
                      onChange={handleChange("password1")}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <i className="fas fa-lock"></i>
                    <input
                      className="myInput"
                      type="password"
                      id="Confirm password"
                      placeholder="Password"
                      value={password2}
                      onChange={handleChange("password2")}
                      required
                    />
                  </div>
                  <input type="submit" className="butt mb-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {performRedirect(success)}
    </Base>
  );
};

export default ResetPassword;
