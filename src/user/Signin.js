import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth/helper";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { API } from "../backend";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "test1@mern.com",
    password: "12345",
    error: "",
    loading: false,
    didRedirect: false, //if user successfully signin then he must be redirected to somewhere
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  //Higher order function --> It can also done individually i.e onChange={setValues(e.target.value)}
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data?.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          console.log(user);
          authenticate(data, () => {
            console.log("DATA IN AUTHENTICATE", data);
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("Signin request failed"));
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
            setValues({ ...values, error: data.error, loading: false });
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

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      }
      return <Redirect to="/" />;
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

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

  const signInForm = () => {
    return (
      <div className="container my-sm-5" style={{ height: "auto" }}>
        <div className="myCard">
          <div className="row ">
            <div className="col-md-6">
              <div className="myLeftCtn">
                <form className="myForm text-center">
                  <header>Login</header>

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

                  <input
                    type="submit"
                    className="butt mb-4"
                    onClick={onSubmit}
                  />
                  <div>
                    <Link to="/forgotpassword" className="text-dark">
                      Forgot Password
                    </Link>
                  </div>
                  <div>
                    <div>
                      <h6 className="text-muted m-3">or</h6>
                    </div>
                    <GoogleLogin
                      clientId="33014760314-helie5d1es4j3gmcgede3gjcf3e8l6cp.apps.googleusercontent.com"
                      buttonText="Continue with Google"
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
                  <h6 className="quotes">
                    “Clothes and manners do not make the man; but when he is
                    made, they greatly improve his appearance.”
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Base title="sign In" description="">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default SignIn;
