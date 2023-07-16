import Link from 'next/link';
import React from 'react';

const BreadCumb: React.FC<{ navigations: string[] }> = ({ navigations }) => {
  return (
    <div className='' id='bread-cumb'>
      <div id='inner' className='container'>
        <h1 className='heading-primary'>{navigations[1]?.toLocaleLowerCase()}</h1>
        <div className='wrapper'>
          <ul className='flex'>
            {navigations.map((item, idx) => {
              if (idx === 0) {
                return (
                  <li key={idx} className='capitalize'>
                    <Link href='/product/all'>
                      {item?.toLocaleLowerCase()} <span className='mx-[11px]'>/</span>
                    </Link>
                  </li>
                );
              }
              return (
                <li key={idx} className='capitalize'>
                  {item?.toLocaleLowerCase()}{' '}
                  {idx + 1 < navigations.length ? <span className='mx-[11px]'>/</span> : <></>}
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
