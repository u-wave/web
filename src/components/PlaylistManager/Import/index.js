/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';

import injectMediaSources from '../../../utils/injectMediaSources';

@injectMediaSources()
export default class PlaylistImport extends React.Component {
  static propTypes = {
    selectedSourceType: React.PropTypes.string,
    sourceStates: React.PropTypes.object,

    getMediaSource: React.PropTypes.func.isRequired,
    getAllMediaSources: React.PropTypes.func.isRequired,
    onShowImportPanel: React.PropTypes.func.isRequired,
    onHideImportPanel: React.PropTypes.func.isRequired
  };

  render() {
    const {
      getMediaSource,
      getAllMediaSources,
      selectedSourceType,
      sourceStates
    } = this.props;

    if (selectedSourceType) {
      const { onHideImportPanel } = this.props;
      const Panel = getMediaSource(selectedSourceType).ImportPanel;
      const state = sourceStates[selectedSourceType];
      return (
        <Panel
          onClosePanel={onHideImportPanel}
          {...state}
        />
      );
    }

    const { onShowImportPanel } = this.props;

    const forms = [];
    const sources = getAllMediaSources();
    Object.keys(sources).forEach(sourceType => {
      const ImportForm = sources[sourceType].ImportForm;
      if (ImportForm) {
        forms.push(
          <ImportForm
            key={sourceType}
            onShowImportPanel={() => onShowImportPanel(sourceType)}
          />
        );
      }
    });

    return (
      <div className="PlaylistImport">
        {forms}
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
