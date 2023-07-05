import React from 'react';

const BreadCumb: React.FC<{ navigations: string[] }> = ({ navigations }) => {
  return (
    <div className="" id="bread-cumb">
      <div id="inner" className="container">
        <h1 className="heading-primary">
          {navigations[1]?.toLocaleLowerCase()}
        </h1>
        <div className="wrapper">
          <ul className="flex">
            {navigations.map((item, idx) => {
              return (
                <li key={idx} className="capitalize">
                  {item?.toLocaleLowerCase()}{' '}
                  {idx + 1 < navigations.length ? (
                    <span className="mx-[11px]">/</span>
                  ) : (
                    <></>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BreadCumb;
