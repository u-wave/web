import React from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import UploadIcon from '@material-ui/icons/CloudUploadOutlined';

function AvatarList({
  availableAvatars,
  allowCustomAvatars,
  onSelect,
  onCustom,
}) {
  return (
    <GridList cellHeight="auto">
      {allowCustomAvatars && (
        <GridListTile
          cols={1}
          onClick={onCustom}
        >
          <UploadIcon />
        </GridListTile>
      )}
      {availableAvatars.map(({
        url, type, name, service,
      }) => (
        <GridListTile
          key={url}
          cols={1}
          onClick={() => onSelect({ type, name, service })}
        >
          <img
            src={url}
            alt={name || service}
            width={96}
            height={96}
          />
        </GridListTile>
      ))}
    </GridList>
  );
}

AvatarList.propTypes = {
  availableAvatars: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    service: PropTypes.string,
    url: PropTypes.string.isRequired,
  })).isRequired,
  allowCustomAvatars: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onCustom: PropTypes.func.isRequired,
};

AvatarList.defaultProps = {
  allowCustomAvatars: false,
};

export default AvatarList;
