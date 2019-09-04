import axios from "axios";

const testObj = {
  testFunc: function(e) {
    e.preventDefault();
    return console.log("Hi from Test");
  },

  testSend: function(e, data) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "/api/test",
      data: data
    })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }
};

export default testObj;
