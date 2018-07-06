import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import ServerConfig from '../components/ServerConfig';
import { loadConfigSchema } from '../actions/config';
import { configSchemaSelector } from '../selectors/configSelectors';

const mapStateToProps = createStructuredSelector({
  configSchema: configSchemaSelector,
});

const mapDispatchToProps = {
  onLoadSchema: loadConfigSchema,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.onLoadSchema();
    },
  }),
);

export default enhance(ServerConfig);
