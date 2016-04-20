import { connect } from 'react-redux';

import { videoSelector } from '../selectors/boothSelectors';
import Video from '../components/Video';

export default connect(videoSelector)(Video);
