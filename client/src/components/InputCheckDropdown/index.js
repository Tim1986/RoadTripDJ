import React, { Component } from "react";
import InputCheck from "../../components/InputCheck";
// import InputCheckGenre from "../../components/InputCheckGenre";

import "./style.css";

const listGenres = [
  {
    id: 1,
    name: "Rock",
    value: "rock",
    subgenres: [
      {
        id: 1.1,
        name: "Rock",
        value: "rock"
      },
      {
        id: 1.2,
        name: "Alternative Rock",
        value: "alternative rock"
      },
      {
        id: 1.3,
        name: "Classic Rock",
        value: "classic rock"
      }
    ]
  },
  {
    id: 2,
    name: "Pop",
    value: "pop",
    subgenres: [
      {
        id: 2.1,
        name: "Pop",
        value: "pop"
      },
      {
        id: 2.2,
        name: "Dance Pop",
        value: "dance pop"
      },
      {
        id: 2.3,
        name: "Post-Teen Pop",
        value: "post-teen pop"
      },
      {
        id: 2.4,
        name: "Latin Pop",
        value: "latin pop"
      },
      {
        id: 2.5,
        name: "Electropop",
        value: "electropop"
      }
    ]
  }
];

class InputCheckDropdown extends Component {
  state = {
    isAllSelected: true,
    selectedSubgenres: [
      "rock",
      "pop",
      "classic rock",
      "latin pop",
      "dance pop"
    ],
    // selectedGenres: []
  };

  // componentDidMount() {
  //   this.babyCheckParent()
  // }

  onParentClick = (e) => {};

  onChildClick = (e) => {
    return console.log("Clicked", e.target.value);
  };

  // babyCheckParent() {}

  // selectAllSubgenres = (e, value) => {
  //   console.log("Clicked", e.target.value);
  //   let newGenres;
  //   if (!e.target.checked) {
  //     newGenres = this.state.selectedGenres.filter((genre) => genre !== value);
  //   } else {
  //     newGenres = this.state.selectedGenres;
  //     newGenres.push(value);
  //   }
  //   this.setState({
  //     selectedGenres: newGenres
  //   });
  // };

  onChildChange = (e, value) => {
    console.log("Clicked", e.target.value);
    let newSubgenres;
    if (!e.target.checked) {
      newSubgenres = this.state.selectedSubgenres.filter(
        (subgenre) => subgenre !== value
      );
    } else {
      newSubgenres = this.state.selectedSubgenres;
      newSubgenres.push(value);
    }
    this.setState({
      selectedSubgenres: newSubgenres
    });
  };

  render() {
    return (
      <div>
        {/* <h4>{this.state.selectedGenres.map((genre) => genre)}</h4> */}
        <h4>{this.state.selectedSubgenres.map((subgenre) => subgenre)}</h4>
        {listGenres.map((genre) => (
          <details>
            <summary>
              <InputCheck
                extraClass="main-genre"
                id={genre.id}
                genre={genre.name}
                value={genre.value}
                onClick={this.onParentClick}
                // defaultChecked={!!this.state.selectedGenres.includes(genre.value)}
              />
            </summary>

            {genre.subgenres.map((subgenre) => (
              <InputCheck
                extraClass="subgenre"
                id={subgenre.id}
                genre={subgenre.name}
                value={subgenre.value}
                onClick={(e) => this.onChildChange(e, subgenre.value)}
                defaultChecked={!!this.state.selectedSubgenres.includes(subgenre.value)}
              />
            ))}
          </details>
        ))}
      </div>
    );
  }
}

export default InputCheckDropdown;
