import React from "react";

function BlurbMulti(props) {
  return (
    <div className="text-center">
      <h2 className="display-4 mb-5">{props.title}</h2>
      <div className="row">
        {props.primaryContent ? (
          <div className="col-12">
            {props.primaryContent.map((item) => <p>{item}</p>)}
          </div>
        ) : null}
        {props.multiContent ? (
          props.multiContent.map((item) => {
            return (
              <div className={`col-${12 / props.cols}`}>
                {item.map((subitem) => {
                  return <p className="text-left">{subitem}</p>;
                })}
              </div>
            );
          })
        ) : null}
        {props.secondaryContent ? (
          <div className="col-12">
            {props.secondaryContent.map((item) => <p>{item}</p>)}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default BlurbMulti;
