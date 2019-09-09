import React from "react";

import "./index.css";

function BlurbMulti(props) {
  return (
    <div className="text-center">
      <h2 className="display-4 mb-5 title">{props.title}</h2>
      <div className="row">
        {props.primaryContent ? (
          <div className="col-12">
            {props.primaryContent.map((item) => <p>{item}</p>)}
          </div>
        ) : null}
        {props.multiContent ? (
          props.multiContent.map((item) => {
            return (
              <div className={`col-12 col-md-${12 / props.cols}`}>
                {item.icon ? <p className={item.icon.className} >{item.icon.content}</p> : null}
                {item.image ? <img src={item.image.url} /> : null}
                {item.text.content.map((subitem) => {
                  return <p className="text-center">{subitem}</p>;
                })}
              </div>
            );
          })
        ) : null}
        {props.secondaryContent ? (
          <div className="col-12">
            {props.secondaryContent.map((item) => <p className="font-weight-bold">{item}</p>)}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default BlurbMulti;
