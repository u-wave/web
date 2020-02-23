/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translate, useTranslator } from '@u-wave/react-translate';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadIcon from '@material-ui/icons/CloudUploadOutlined';
import uniqueId from 'lodash/uniqueId';
import Form from '../Form';
import FormGroup from '../Form/Group';
import Button from '../Form/Button';
import { getAvailableAvatars } from '../../actions/UserActionCreators';
import AvatarPreview from './AvatarPreview';

const {
  useCallback,
  useEffect,
  useState,
} = React;

function AvatarDialog({
  user,
  open,
  allowCustomAvatars,
  onChangeAvatar,
  onClose,
}) {
  const { t } = useTranslator();
  const dispatch = useDispatch();
  const ariaTitle = useState(() => uniqueId('avatar'));

  const [isLoadingAvatars, setLoadingAvatars] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const [selected, setSelected] = useState(null);
  const [availableAvatars, setAvailableAvatars] = useState([]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    setSubmitting(true);

    Promise.resolve(onChangeAvatar(user, null)).finally(() => {
      setSubmitting(false);
    });
  }, [user, onChangeAvatar]);
  const handleSelect = useCallback((avatar) => {
    setSelected(avatar.url);
  }, []);

  useEffect(() => {
    let unmounted = false;
    dispatch(getAvailableAvatars(user._id)).then(({ data }) => {
      if (!unmounted) {
        setAvailableAvatars(data);
        setLoadingAvatars(false);
      }
    });
    return () => {
      unmounted = true;
    }
  }, [user]);

  return (
    <Dialog
      open={open}
      classes={{ paper: 'Dialog AvatarDialog' }}
      aria-labelledby={ariaTitle}
    >
      <DialogTitle className="Dialog-title" id={ariaTitle}>
        {t('settings.profile.avatar.change')}
      </DialogTitle>
      <DialogContent className="Dialog-body">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <p className="AvatarDialog-helpText">
              {t('settings.profile.avatar.help')}
            </p>
          </FormGroup>

          <FormGroup>
            {isLoadingAvatars ? (
              <CircularProgress size={240} />
            ) : (
              availableAvatars.map(avatar => (
                <AvatarPreview
                  {...avatar}
                  selected={selected === avatar.url}
                  onSelect={handleSelect.bind(null, avatar)}
                />
              ))
            )}
            {allowCustomAvatars && (
              <IconButton className="AvatarDialog-preview">
                <UploadIcon style={{ width: '100%', height: '100%' }} />
              </IconButton>
            )}
          </FormGroup>

          <FormGroup>
            <Button disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="Button-loading">
                  <CircularProgress size="100%" />
                </div>
              ) : (
                t('settings.profile.avatar.save')
              )}
            </Button>
          </FormGroup>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

AvatarDialog.propTypes = {
  user: PropTypes.object.isRequired,
  allowCustomAvatars: PropTypes.bool,
  open: PropTypes.bool,
  onChangeAvatar: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AvatarDialog;
