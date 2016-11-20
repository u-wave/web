import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { setPreferredQualityLevel } from './actions';

const levelNames = {
  tiny: 'Tiny (144p)',
  small: 'Small (240p)',
  medium: 'Medium (360p)',
  large: 'Large (480p)',
  highres: 'High-Res (> 1080p)'
};

const getQualityLevelName = (level) => {
  if (level in levelNames) {
    return levelNames[level];
  }

  if (level === 'auto' || level === 'default') {
    return 'Auto';
  }

  return level
    // hd720 → HD (720p)
    .replace(/hd(\d+)/, 'HD ($1p)')
    // unknown → Unknown
    .replace(/^([a-z])/, letter => letter.toUpperCase());
};

const itemStyle = {
  WebkitAppearance: 'initial'
};

const YouTubeVideoTools = ({
  onChange,
  qualityLevels,
  currentQualityLevel
}) => (
  <DropDownMenu
    onChange={onChange}
    value={currentQualityLevel}
  >
    {qualityLevels.map(level => (
      <MenuItem
        key={level}
        style={itemStyle}
        value={level}
        primaryText={getQualityLevelName(level)}
      />
    ))}
  </DropDownMenu>
);

YouTubeVideoTools.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  qualityLevels: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  currentQualityLevel: React.PropTypes.string.isRequired
};

const ytSourceSelector = state => state.sources.youtube;
const currentQualityLevelSelector = createSelector(
  ytSourceSelector,
  source => (
    source.preferredQuality === 'auto' || source.preferredQuality === 'default'
      ? 'default'
      : source.currentQualityLevel
  )
);
const mapStateToProps = createSelector(
  ytSourceSelector,
  currentQualityLevelSelector,
  (source, currentQualityLevel) => ({
    qualityLevels: source.availableQualityLevels,
    currentQualityLevel
  })
);
const mapDispatchToProps = dispatch => ({
  onChange: (event, key, payload) => dispatch(setPreferredQualityLevel(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(YouTubeVideoTools);
