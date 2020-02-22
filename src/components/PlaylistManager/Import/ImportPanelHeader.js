import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function ImportPanelHeader({
  className,
  children,
  onClosePanel,
}) {
  const { t } = useTranslator();

  return (
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
}

ImportPanelHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClosePanel: PropTypes.func.isRequired,
};

export default ImportPanelHeader;
