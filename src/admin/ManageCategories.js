import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { deleteCategory, getAllCategory } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllCategory().then((data) => {
      if (data?.error) {
        console.log(data?.error);
      } else {
        setCategories(data);
      }
    });
  };

  const deleteThisCategory = (categoryId) => {
    deleteCategory(user._id, categoryId, token).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base
      title="Welcome admin"
      description="Manage categories here"
      className="text-dark"
    >
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="mb-4">All products:</h2>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-dark my-3">
            Total <span className="text-info">{categories.length}</span>{" "}
            categories
          </h2>
          {categories.map((category, index) => {
            return (
              <div key={index} className="border border-dark p-3 m-3">
                <div className="row text-center mb-2">
                  <div className="col-4">
                    <h3 className="text-info text-left">{category.name}</h3>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn btn-success"
                      to={`/admin/category/update/${category._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={() => {
                        deleteThisCategory(category._id);
                      }}
                      className="btn btn-danger"
                    >
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

export default ManageCategories;
