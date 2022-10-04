import React from 'react';

const HelpItem7 = () => {
  return (
    <>
      <p className='p'>
        When you select the entertainment page the entertainment happening today
        will be listed. The icons represent:
      </p>
      <ul style={{ paddingLeft: '1.5rem' }}>
        <li>
          <i className='fas fa-theater-masks'></i> Theater
        </li>
        <li>
          <i className='fas fa-music'></i> Music
        </li>
        <li>
          <i className='fas fa-microphone'></i> Karaokes
        </li>
        <li>
          <i className='icon-dancing'></i> Dancing
        </li>
        <li>
          <i className='fas fa-laugh'></i> Comedy
        </li>
      </ul>
    </>
  );
};

export default HelpItem7;
