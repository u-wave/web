import * as React from 'react';

import YouTubeImportForm from './YouTube/ImportForm';
import YouTubeImportPanel from './YouTube/ImportPanel';

const SOURCE_TYPE_PANELS = {
  youtube: YouTubeImportPanel
};

const SOURCE_TYPE_FORMS = {
  youtube: YouTubeImportForm
};

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
      const Panel = SOURCE_TYPE_PANELS[selectedSourceType];
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
    Object.keys(SOURCE_TYPE_FORMS).forEach(sourceType => {
      const ImportFormComponent = SOURCE_TYPE_FORMS[sourceType];
      forms.push(
        <ImportFormComponent
          key={sourceType}
          onShowImportPanel={() => onShowImportPanel(sourceType)}
        />
      );
    });

    return (
      <div className="PlaylistImport">
        {forms}
      </div>
    );
  }
}
