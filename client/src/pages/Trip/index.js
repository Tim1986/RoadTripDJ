import React, { Component } from "react";
import TripForm from "../../components/TripForm";
import Modal from "../../components/Modal/Modal";

import "./index.css";

class TripPage extends Component {
  state = {
    modalStyle: { display: "none" }
  };
  toggleModal = () => {
    if (this.state.modalStyle.display === "none") {
      this.setState({ modalStyle: { display: "block" } });
    } else {
      this.setState({ modalStyle: { display: "none}" } });
    }
  };
  render() {
    return (
      <div className="newtrip h-100">
        <div className="container">
          <div className="row mx-auto" style={{ backgroundColor: "#fff" }}>
            <div className="col-lg-6 col-md-9 col-12 mx-auto">
              <TripForm onClick={() => this.toggleModal()} />
            </div>
          </div>
        </div>
        <Modal modalStyle={this.state.modalStyle} onClick={this.toggleModal} />
      </div>
    );
  }
}

export default TripPage;
