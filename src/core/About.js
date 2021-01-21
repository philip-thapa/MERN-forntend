import React, { useEffect, useState } from "react";
import Base from "./Base";
import { aboutUs } from "./helper/aboutHelper";
import philip from "../Images/philip.jpg";
import isbah from "../Images/isbah.jpg";

const About = () => {
  const [details, setDetails] = useState({});
  const loadAboutProject = () => {
    aboutUs()
      .then((data) => {
        setDetails(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadAboutProject();
  }, []);

  return (
    <Base
      title="About us"
      description="Here is a brief details about our project"
      additionalDesc="This is a mini project only for Educational Purpose"
    >
      <div className="container">
        <div>
          <div
            className="card text-white bg-dark mb-3 text-center"
            style={{ maxWidth: "auto" }}
          >
            <div className="card-header text-info">
              <h3>{details.miniProject}</h3>
            </div>
            <div className="card-body">
              <h5 className="card-title miniProjectDetails">
                {details.details}
              </h5>
              <p className="card-text text-info">
                Language used: {details.Language}
              </p>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column align-items-center flex-sm-row justify-content-around ">
          <div className="mx-3 my-3">
            <div
              className="card bg-secondary"
              style={{ width: "18rem", height: "auto" }}
            >
              <img src={philip} alt="Image" className="card-img-top" />
              <div className="card-body text-white">
                <h5 className="card-title">Bio: </h5>
                <p className="card-text">
                  Hello I'm <strong>{details.TeamMembers?.member1.name}</strong>
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Roll no: <i>{details.TeamMembers?.member1.rollNo}</i>
                </li>
                <li className="list-group-item">
                  Email: <i>{details.TeamMembers?.member1.email}</i>
                </li>
                <li className="list-group-item">
                  Phone: <i>{details.TeamMembers?.member1.phone}</i>
                </li>
                <li className="list-group-item">
                  Sex: <i>{details.TeamMembers?.member1.sex}</i>
                </li>
                {/* <li className="list-group-item">
                  From: <i>{details.TeamMembers?.member1.from}</i>
                </li> */}
                <li className="list-group-item">
                  College: <i>{details.TeamMembers?.member1.college}</i>
                </li>
              </ul>
            </div>
          </div>

          <div className="">
            <div
              className="card bg-secondary"
              style={{ width: "18rem", height: "auto" }}
            >
              <img src={isbah} alt="image" className="card-img-top" />
              <div className="card-body text-white">
                <h5 className="card-title">Bio: </h5>
                <p className="card-text">
                  Hello I'm <strong>{details.TeamMembers?.member2.name}</strong>
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Roll no: <i>{details.TeamMembers?.member2.rollNo}</i>
                </li>
                <li className="list-group-item">
                  Email: <i>{details.TeamMembers?.member2.email}</i>
                </li>
                <li className="list-group-item">
                  Phone: <i>{details.TeamMembers?.member2.phone}</i>
                </li>
                <li className="list-group-item">
                  Sex: <i>{details.TeamMembers?.member2.sex}</i>
                </li>
                {/* <li className="list-group-item">
                  From: <i>{details.TeamMembers?.member2.from}</i>
                </li> */}
                <li className="list-group-item">
                  College: <i>{details.TeamMembers?.member2.college}</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default About;
