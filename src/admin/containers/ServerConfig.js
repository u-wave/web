import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import ServerConfig from '../components/ServerConfig';
import { loadConfig, saveConfig } from '../actions/config';
import { configSelector, configSchemaSelector } from '../selectors/configSelectors';

const mapStateToProps = createStructuredSelector({
  config: configSelector,
  configSchema: configSchemaSelector,
});

const mapDispatchToProps = {
  onLoadConfig: loadConfig,
  onSaveConfig: saveConfig,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.onLoadConfig();
    },
  }),
);

export default enhance(ServerConfig);
