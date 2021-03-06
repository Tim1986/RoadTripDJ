import React from "react";
import { Link } from "react-router-dom";

import "./index.css"

function Footer(props) {
  return (
    <footer
      className="pt-3 footer text-center mt-auto bg-dark text-light"
      style={{ position: "relative", zIndex: "999" }}
    >
      <div className="container">
        <p>
          &copy; 2019 | <Link to="/contact">Get In Touch</Link>        </p>
      </div>
    </footer>
  );
}

export default Footer;
