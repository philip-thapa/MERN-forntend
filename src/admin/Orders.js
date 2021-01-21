import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllOrders } from "./helper/adminapicall";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { token, user } = isAuthenticated();
  const preloadAllOrders = (userId, token) => {
    getAllOrders(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };
  useEffect(() => {
    preloadAllOrders(user._id, token);
  }, []);
  console.log(orders);
  return (
    <Base title="Manage Orders">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-dark my-3">
            Total <span className="text-info">{orders.length} </span>Orders
          </h2>

          {orders.map((order, index) => {
            return (
              <div key={index} className="border border-dark p-3 m-3">
                <div className="row text-center mb-2 ">
                  <div className="col-3">
                    <h3 className="text-dark text-left">{order?.user.name}</h3>
                  </div>
                  <div className="col-3">
                    <Link className="btn btn-success" to="">
                      <span className="">Update</span>
                    </Link>
                  </div>
                  <div class="col-3">
                    <h3 className="badge bg-danger text-white">
                      {order.status}
                    </h3>
                  </div>
                  <div className="col-3">
                    <button onClick={() => {}} className="btn btn-danger">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default Orders;
