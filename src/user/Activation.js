import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import axios from "axios";
import { API } from "../backend";
import { toast } from "react-toastify";
import { Link, Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
const Activation = ({ match }) => {
  const [formData, setFormData] = useState({
    token: "",
    name: "",
    error: "",
    success: false,
  });
  const { token, name, error, success } = formData;
  useEffect(() => {
    const temptoken = match.params.token;
    console.log(name);
    if (temptoken) {
      setFormData({
        ...formData,
        token: temptoken,
        name: name,
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API}email-activate`, {
        token,
      })
      .then((res) => {
        if (res.error) {
          console.log(res.error);
          setFormData({ ...formData, error: res.error, success: false });
          toast("Activation failed, retry", { type: error });
        } else {
          toast("Sign up success, Login now", { type: "success" });
          setFormData({
            ...formData,
            error: false,
            success: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast(error, { type: "error" });
      });
  };

  const redirectFunc = (redirect) => {
    if (redirect) {
      return <Redirect to="/signin" />;
    }
  };
  return (
    <Base>
      <div className="container my-sm-5" style={{ height: "auto" }}>
        <h2>Welcome </h2>
        {redirectFunc(success)}
        <div className="myCard">
          <div className="row">
            <div className="col-md-6">
              <div className="myLeftCtn">
                <form className="myForm text-center" onSubmit={handleSubmit}>
                  <header>Activate</header>
                  <input type="submit" className="butt" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Activation;
