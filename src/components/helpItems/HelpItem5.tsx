import React from 'react';

const HelpItem5 = () => {
  return (
    <>
      <p className='p'>
        When you select the restaurant page. A list of restaurants will be
        listed. Clicking on the name will give you a restaurant detail with the
        menu, gymMembers, entertainment etc. The icons represent
      </p>
      <ul style={{ paddingLeft: '1.5rem' }}>
        <li>
          <i className='fas fa-phone'></i> Call
        </li>
        <li>
          <i className='fas fa-map-marker-alt'></i> Location
        </li>
      </ul>
    </>
  );
};

export default HelpItem5;
