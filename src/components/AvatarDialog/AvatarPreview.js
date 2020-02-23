import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';

function AvatarPreview({
  name,
  service,
  url,
  selected,
  onSelect,
}) {
  return (
    <button
      type="button"
      className={cx('Avatar', 'AvatarDialog-preview', selected && 'is-selected')}
      disabled={selected}
      onClick={onSelect}
    >
      <img
        className="Avatar-image"
        src={url}
        alt={name || service}
      />
    </button>
  );
}

AvatarPreview.propTypes = {
  name: PropTypes.string,
  service: PropTypes.string,
  url: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

AvatarPreview.defaultProps = {
  selected: false,
};

export default AvatarPreview;
