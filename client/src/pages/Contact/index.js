import React, { Component } from "react";
import { Link } from "react-router-dom";

import Contact from "../../components/Contact"

// import "./index.css";

function ContactPage(props) {
  return (
    <div className="container my-auto fp-r">
      <div className="row text-center">
        <div className="finished-playlist col-lg-6 col-md-9 col-12 mx-auto p-4">
          <h1 className="mb-4">Contact Info</h1>
          <Contact Name="Anees Adams"
            GitHub="https://github.com/anees05"
            LinkedIn="https://www.linkedin.com/in/anees-adams-606043188/" />
          <Contact Name="Timothy Brahm"
            GitHub="https://github.com/Tim1986"
            LinkedIn="https://www.linkedin.com/in/timothy-brahm-1892447/" />
          <Contact Name="Cassidy Groenendaal"
            GitHub="https://github.com/cassidygroenendaal"
            LinkedIn="https://www.linkedin.com/in/cassidy-groenendaal-296708181/" />
          <Contact Name="Max Szcepaniak"
            GitHub="https://github.com/SzczeZam"
            LinkedIn="https://www.linkedin.com/in/max-szczepaniak-3a1137190/" />
        </div>
      </div>
    </div>
  )
}

export default ContactPage;