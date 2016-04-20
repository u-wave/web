/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';

import * as sources from '../../../sources';

export default class PlaylistImport extends React.Component {
  static propTypes = {
    selectedSourceType: React.PropTypes.string,
    sourceStates: React.PropTypes.object,

    onShowImportPanel: React.PropTypes.func.isRequired,
    onHideImportPanel: React.PropTypes.func.isRequired
  };

  render() {
    const { selectedSourceType, sourceStates } = this.props;
    if (selectedSourceType) {
      const { onHideImportPanel } = this.props;
      const Panel = sources[selectedSourceType].ImportPanel;
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
