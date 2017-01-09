import * as React from 'react';
import Loader from '../Loader';
import Overlay from '../Overlay';
import OverlayHeader from '../Overlay/Header';

export default class AdminProxy extends React.Component {
  static propTypes = {
    onCloseOverlay: React.PropTypes.func.isRequired
  };

  state = {
    AdminComponent: Loader
  };

  componentDidMount() {
    import('../../containers/Admin').then((Admin) => {
      this.setState({ AdminComponent: Admin.default });
    }).catch((e) => {
      alert(`Could not load administration module: ${e.message}`);
    });
  }

  render() {
    const { onCloseOverlay } = this.props;
    const { AdminComponent } = this.state;
    return (
      <Overlay className="AppColumn AppColumn--full" direction="top">
        <OverlayHeader
          title="Administration"
          onCloseOverlay={onCloseOverlay}
          direction="top"
        />
        <div className="AppRow AppRow--middle AdminPanel">
          <AdminComponent />
        </div>
      </Overlay>
    );
  }
}
