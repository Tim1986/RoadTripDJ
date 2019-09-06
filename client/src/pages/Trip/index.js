import React, { Component } from "react";
import TripForm from "../../components/TripForm";
import Modal from "../../components/Modal/Modal"
import Navigation from "../../components/Navigation";
import API from "../../lib/API";

class TripPage extends Component {
  state = {
    modalStyle: { display: "none" }
  }
  toggleModal = () => {
    this.state.modalStyle.display === "none" ? this.setState({ modalStyle: { display: "block" } }) : this.setState({ modalStyle: { display: "none}" } })
  }
  render() {
    return (
      <div>
        {/* <Navigation /> */}
        <div className="Home container">
          <div className="row my-5">
            <div className="col-12 my-5">
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
