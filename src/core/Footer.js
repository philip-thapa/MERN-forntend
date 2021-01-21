import React from "react";
import { Link } from "react-router-dom";
// import "../styles.css";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <hr className="hr-or" />
      <span className="span-or">or</span>
      <hr className="hr-or" />
      <hr className="hr-or" />
      <footer className="nb-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="about">
                <img
                  src="images/logo.png"
                  className="img-responsive center-block"
                  alt=""
                />
                <p>
                  Those who plan do better than those who do not plan even
                  though they rarely stick to their plan.
                </p>

                <div className="social-media">
                  <ul className="list-inline">
                    <li>
                      <Link to="http://www.nextbootstrap.com/" title="">
                        <i className="fa fa-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="http://www.nextbootstrap.com/" title="">
                        <i className="fa fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="http://www.nextbootstrap.com/" title="">
                        <i className="fa fa-google-plus"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="http://www.nextbootstrap.com/" title="">
                        <i className="fa fa-linkedin"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="footer-info-single">
                <h2 className="title">Help Center</h2>
                <ul className="list-unstyled">
                  <li>
                    <Link to="http://www.nextbootstrap.com/" title="">
                      <i className="fa fa-angle-double-right"></i> How to Pay
                    </Link>
                  </li>
                  <li>
                    <Link to="http://www.nextbootstrap.com/" title="">
                      <i className="fa fa-angle-double-right"></i> FAQ's
                    </Link>
                  </li>
                  <li>
                    <Link to="http://www.nextbootstrap.com/" title="">
                      <i className="fa fa-angle-double-right"></i> Sitemap
                    </Link>
                  </li>
                  <li>
                    <Link to="http://www.nextbootstrap.com/" title="">
                      <i className="fa fa-angle-double-right"></i> Delivery Info
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="footer-info-single">
                <h2 className="title">Customer information</h2>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/about" title="">
                      <i className="fa fa-angle-double-right"></i> About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="http://www.nextbootstrap.com/" title="">
                      <i className="fa fa-angle-double-right"></i> FAQ's
                    </Link>
                  </li>
                  <li>
                    <Link to="http://www.nextbootstrap.com/" title="">
                      <i className="fa fa-angle-double-right"></i> Sell Your
                      Items
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" title="">
                      <i className="fa fa-angle-double-right"></i> Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="footer-info-single">
                <h2 className="title">Security & privacy</h2>
                <ul className="list-unstyled">
                  <li>
                    <Link to="http://www.nextbootstrap.com/" title="">
                      <i className="fa fa-angle-double-right"></i> Terms Of Use
                    </Link>
                  </li>
                  <li>
                    <Link to="http://www.nextbootstrap.com/" title="">
                      <i className="fa fa-angle-double-right"></i> Privacy
                      Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="http://www.nextbootstrap.com/" title="">
                      <i className="fa fa-angle-double-right"></i> Return /
                      Refund Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="http://www.nextbootstrap.com/" title="">
                      <i className="fa fa-angle-double-right"></i> Store
                      Locations
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="footer-info-single">
                <h2 className="title">Payment</h2>
                <p>
                  You can use your Credit cart. International payment is also
                  accepted
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <p>Copyright © 2021. PhilBah</p>
              </div>
              <div className="col-sm-6"></div>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
};
export default Footer;
