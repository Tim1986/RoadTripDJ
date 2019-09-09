import React, { Component } from "react";
import { Link } from "react-router-dom";

function Contact(props) {
    return (
        <p> {props.Name}
            <div>
                <a href={props.GitHub}>GitHub</a> | <a href={props.LinkedIn}>LinkedIn</a>
            </div>
        </p>
    );
};

export default Contact;