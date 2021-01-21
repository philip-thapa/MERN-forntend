import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getOrder } from "../user/helper/userapicalls";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [orderDetails, setOrderDetails] = useState([]);

  const name = isAuthenticated().user.name;
  const { user, token } = isAuthenticated();

  const preloadOrder = (id, token) => {
    getOrder(id, token)
      .then((data) => {
        if (data?.error) {
          console.log(data?.error);
        } else {
          console.log(data);
          setOrderDetails(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preloadOrder(user._id, token);
  }, []);

  console.log("ORDER", orderDetails);
  return (
    <Base title="Dashboard" description="Welcome to user dashboard">
      {orderDetails.length > 0 ? (
        <div className="body">
          <div className="card-header bg-white">
            <div className="media flex-sm-row flex-column-reverse justify-content-between ">
              <div className="col my-auto">
                <h4 className="mb-0">
                  Thanks for your order,
                  <span className="change-color"> {name}</span>
                </h4>
              </div>
            </div>
          </div>
          <div className="container-fluid my-5 d-flex justify-content-center">
            <div className="card card-1">
              <div className="card-body">
                <div className="row">
                  {orderDetails.map((item, index) => {
                    return (
                      <div className="col-10 my-3" key={index}>
                        <div className="card card-2">
                          <div className="card-body">
                            <div className="media">
                              <div className="sq align-self-center ">
                                {item.products.map((itemname, index) => (
                                  <h6 key={index}>{itemname.name}</h6>
                                ))}
                              </div>
                              <div className="media-body my-auto text-right">
                                <div className="row my-auto flex-column flex-md-row">
                                  <div className="col my-auto">
                                    <h6 className="mb-0"> {item.amount}$</h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <hr className="my-3 " />
                            <div className="row">
                              <div className="col-md-3 mb-3">
                                {" "}
                                <small>
                                  {" "}
                                  Track Order{" "}
                                  <span>
                                    <i
                                      className=" ml-2 fa fa-refresh"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                </small>{" "}
                              </div>
                              <div className="col mt-auto">
                                <div className="progress my-auto">
                                  <div
                                    className="progress-bar progress-bar rounded"
                                    style={
                                      item.status == "Out for Delivery"
                                        ? { width: "62%" }
                                        : { width: "100%" }
                                    }
                                    role="progressbar"
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                                <div className="media row justify-content-between ">
                                  <div className="col-auto text-right">
                                    <span>
                                      {" "}
                                      <small className="text-right mr-sm-2"></small>{" "}
                                      <i className="fa fa-circle active"></i>{" "}
                                    </span>
                                  </div>
                                  <div className="flex-col">
                                    {" "}
                                    <span>
                                      {" "}
                                      <small className="text-right mr-sm-2">
                                        Out for delivary
                                      </small>
                                      <i
                                        className="fa fa-circle active"
                                        style={
                                          item.status == "Received"
                                            ? { color: "#ab47bc" }
                                            : { color: "#aaa" }
                                        }
                                      ></i>
                                    </span>
                                  </div>
                                  <div className="col-auto flex-col-auto">
                                    <small className="text-right mr-sm-2">
                                      {item.status}
                                    </small>
                                    <span>
                                      {" "}
                                      <i className="fa fa-circle"></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="bg-dark text-light p-4 border rounded"
          style={{ height: "auto" }}
        >
          <div className="p-4 dashboard">
            <h3>
              Hello <span className="text-danger">{name}</span>, How are you?
              Hope you are enjoing the session...
            </h3>
            <h2 className="text-info">
              Your cart is waiting for you, checkout and enjoy our products
            </h2>
          </div>
        </div>
      )}
    </Base>
  );
};

export default UserDashboard;
