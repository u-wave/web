import cx from 'classnames';
import * as React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close';

const ImportPanelHeader = ({
  className,
  children,
  onClosePanel
}) => (
  <div className={cx('ImportPanelHeader', className)}>
    <div className="ImportPanelHeader-content">
      {children}
    </div>
    <IconButton
      onClick={onClosePanel}
      tooltip="Close"
      tooltipPosition="top-center"
    >
      <CloseIcon color="#555" hoverColor="#fff" />
    </IconButton>
  </div>
);

ImportPanelHeader.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
  onClosePanel: React.PropTypes.func.isRequired
};

export default ImportPanelHeader;
