import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const enhance = translate();

const ImportPanelHeader = ({
  t,
  className,
  children,
  onClosePanel,
}) => (
  <div className={cx('ImportPanelHeader', className)}>
    <div className="ImportPanelHeader-content">
      {children}
    </div>
    <Tooltip title={t('close')} placement="top">
      <IconButton onClick={onClosePanel}>
        <CloseIcon />
      </IconButton>
    </Tooltip>
  </div>
);

ImportPanelHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  t: PropTypes.func.isRequired,
  onClosePanel: PropTypes.func.isRequired,
};

export default enhance(ImportPanelHeader);
