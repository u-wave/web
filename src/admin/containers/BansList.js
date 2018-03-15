import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import { loadBans, unbanUserAndReload } from '../actions/bans';
import BansList from '../components/BansList';

const mapStateToProps = state => ({
  bans: state.admin.bans.bans,
});

const mapDispatchToProps = {
  onLoadBans: loadBans,
  onUnbanUser: unbanUserAndReload,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.onLoadBans();
    },
  }),
)(BansList);
