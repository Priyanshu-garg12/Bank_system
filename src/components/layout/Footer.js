import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="container">
          <div className="sec aboutus">
            <ul className="sci">
              <li>
                <a href="#">
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-github" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
           
            </ul>
          </div>
        </div>
      </footer>
      <div className="copyrightText">
        <p>Copyright © 2025 Banking System. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
