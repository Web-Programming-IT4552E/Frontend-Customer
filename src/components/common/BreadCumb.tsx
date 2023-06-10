import React from "react";

const BreadCumb: React.FC<{ navigations: string[] }> = ({ navigations }) => {
  return (
    <div id="bread-cumb">
      <div id="inner">
        <h1 className="heading-primary">Shop</h1>
        <div className="wrapper">
          <ul className="flex">
            {navigations.map((item, idx) => {
              return <li key={idx}>{item} {idx + 1 < navigations.length ? <span className="mx-[11px]">/</span> : <></>}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BreadCumb;
