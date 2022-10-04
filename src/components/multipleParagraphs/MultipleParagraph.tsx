import React from 'react';

const MultipleParagraph = ({ mulitplePargraph }: any) => {
  let myStyle = {
    paddingBottom: '0.5rem',
  };
  return (
    <>
      <p style={myStyle}>{mulitplePargraph}</p>
    </>
  );
};

export default MultipleParagraph;
