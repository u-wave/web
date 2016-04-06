import * as React from 'react';

import YouTubeImportForm from './YouTube/ImportForm';

export default class PlaylistImport extends React.Component {
  render() {
    return (
      <div className="PlaylistImport">
        <YouTubeImportForm />
      </div>
    );
  }
}
