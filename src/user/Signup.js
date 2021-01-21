import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { authenticate, signUp } from "../auth/helper";
import axios from "axios";
import { API } from "../backend";
import GoogleLogin from "react-google-login";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    error: "",
    success: false,
    didRedirect: false,
  });

  //destructuring
  const {
    name,
    email,
    password,
    error,
    success,
    password2,
    didRedirect,
  } = values;

  //Higher order function --> It can also done individually i.e onChange={setValues(e.target.value)}
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const responseSuccessGoogle = (response) => {
    // console.log("RESPONSE", response);

    axios
      .post(`${API}googlelogin`, {
        tokenId: response.tokenId,
      })
      .then((response) => {
        console.log("RESPONSE", response);
        const { data } = response;
        authenticate(data, () => {
          console.log(data);
          if (data?.error) {
            setValues({ ...values, error: data.error, success: false });
          }
          setValues({
            ...values,
            didRedirect: true,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const responseErrorGoogle = (response) => {
    console.log(response);
  };

  const onSubmit = async (e) => {
    e.preventDefault(); //prevents the default submissison of forms
    setValues({ ...values, error: false });
    if (password !== password2) {
      setValues({
        ...values,
        success: false,
        error: "Passord doesnot match",
      });
    }
    if (name && password && password2) {
      if (password === password2) {
        await signUp({ name, email, password })
          .then((data) => {
            if (data?.error) {
              setValues({ ...values, error: data.error, success: false });
            } else {
              setValues({
                ...values,
                name: "",
                email: "",
                password: "",
                password2: "",
                error: "",
                success: true,
              });
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const successMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3">
        <div
          style={{ display: success ? "" : "none" }}
          className="alert alert-success"
        >
          Activation link has been sent to your email, please check in now
        </div>
      </div>
    </div>
  );

  const errorMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3">
        <div
          style={{ display: error ? "" : "none" }}
          className="alert alert-danger"
        >
          {error}
        </div>
      </div>
    </div>
  );

  const performRedirectFunction = (redirect) => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  const signUpForm = () => {
    return (
      <div className="container my-sm-5" style={{ height: "auto" }}>
        <div className="myCard">
          <div className="row">
            <div className="col-md-6">
              <div className="myLeftCtn">
                <form className="myForm text-center">
                  <header>Create new account</header>
                  <div className="form-group">
                    <i className="fas fa-user"></i>
                    <input
                      className="myInput"
                      type="text"
                      placeholder="Username"
                      id="username"
                      value={name}
                      onChange={handleChange("name")}
                      required
                    />
                  </div>

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

                  <div className="form-group">
                    <i className="fas fa-lock"></i>
                    <input
                      className="myInput"
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={handleChange("password")}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <i className="fas fa-lock"></i>
                    <input
                      className="myInput"
                      type="password"
                      id="password"
                      placeholder="Retype Password"
                      value={password2}
                      onChange={handleChange("password2")}
                      required
                    />
                  </div>
                  <input type="submit" className="butt" onClick={onSubmit} />
                  <div class="text-muted m-3">or</div>
                  <div>
                    <GoogleLogin
                      className="m-2"
                      clientId="33014760314-helie5d1es4j3gmcgede3gjcf3e8l6cp.apps.googleusercontent.com"
                      buttonText="SIgn Up with Google"
                      onSuccess={responseSuccessGoogle}
                      onFailure={responseErrorGoogle}
                      cookiePolicy={"single_host_origin"}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="myRightCtn">
                <div className="box">
                  <p className="quotes">
                    “Dress like you’ve made something of yourself, even if you
                    haven’t”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="sign up" description="">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      {performRedirectFunction(didRedirect)}
      <h6 className="text-center text-white">{JSON.stringify(values)}</h6>
    </Base>
  );
};

export default Signup;
