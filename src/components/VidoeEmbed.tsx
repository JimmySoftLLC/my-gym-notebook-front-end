import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

const VidoeEmbed = ({ embedId }: any) => {
  return (
    <ReactPlayer
      class='py-1'
      width='100%'
      height='100%'
      controls={true}
      url={embedId}
    />
  );
};

VidoeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default VidoeEmbed;
