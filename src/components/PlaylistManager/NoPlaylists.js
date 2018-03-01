import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { useTranslator } from '@u-wave/react-translate';
import PlaylistIcon from 'material-ui/svg-icons/av/playlist-add';
import { useMediaSources } from '../../../context/MediaSourceContext';
import { showImportPanel, hideImportPanel } from '../../../actions/ImportActionCreators';
import Button from '../../Form/Button';

const enhance =  connect(() => ({}), {
  onShowImportPanel: showImportPanel,
  onHideImportPanel: hideImportPanel
});

function ImportBlock({ onShowImportPanel, onHideImportPanel }) {
  const { getAllMediaSources } = useMediaSources();

  const forms = [];
  const sources = getAllMediaSources();
  Object.keys(sources).forEach((sourceType) => {
    const { ImportForm } = sources[sourceType];
    if (ImportForm) {
      forms.push((
        <ImportForm
          key={sourceType}
          onShowImportPanel={() => onShowImportPanel(sourceType)}
          onHideImportPanel={onHideImportPanel}
        />
      ));
    }
  });

  return (
    <React.Fragment>
      {forms}
    </React.Fragment>
  );
}

ImportBlock.propTypes = {
  onShowImportPanel: PropTypes.func.isRequired,
  onHideImportPanel: PropTypes.func.isRequired
};

const ImportBlockContainer = enhance(ImportBlock);

function NoPlaylists({ className }) {
  const { t } = useTranslator();

  return (
    <div className={cx('PlaylistPanel', 'PlaylistPanel--empty', className)}>
      {t('playlists.noPlaylists')}

      <div className="PlaylistPanel-create">
        <div className="PlaylistPanel-button">
          <PlaylistIcon
            className="PlaylistPanel-emptyIcon"
            style={{ width: 200, height: 200 }}
          />
          <Button>Create</Button>
        </div>
        <ImportBlockContainer />
      </div>
    </div>
  );
}

NoPlaylists.propTypes = {
  className: PropTypes.string,
};

export default NoPlaylists;
