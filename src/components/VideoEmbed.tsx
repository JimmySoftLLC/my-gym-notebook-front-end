import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

const VideoEmbed = ({ embedId }: any) => {
  return (
    <ReactPlayer
      loop={true}
      class='py-1'
      width='100%'
      height='100%'
      controls={true}
      url={embedId}
    />
  );
};

VideoEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default VideoEmbed;
