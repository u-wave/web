import * as PlaylistActionCreators from './actions/PlaylistActionCreators';
import * as RequestActionCreators from './actions/RequestActionCreators';
import Loader from './components/Loader';
import MediaList from './components/MediaList';
import VideoBackdrop from './components/Video/VideoBackdrop';
import ImportPanelHeader from './components/PlaylistManager/Import/ImportPanelHeader';
import ImportSourceBlock from './components/PlaylistManager/Import/ImportSourceBlock';
import Form from './components/Form';
import FormGroup from './components/Form/Group';
import TextField from './components/Form/TextField';
import FormButton from './components/Form/Button';

export * as constants from './constants';

export const components = {
  Loader,
  MediaList,
  VideoBackdrop,
  ImportPanelHeader,
  ImportSourceBlock,
  Form,
  FormGroup,
  TextField,
  FormButton
};

export const actions = {
  playlists: PlaylistActionCreators,
  request: RequestActionCreators
};
