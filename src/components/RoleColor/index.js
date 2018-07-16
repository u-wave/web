import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import compose from 'recompose/compose';
import componentFromProp from 'recompose/componentFromProp';
import mapProps from 'recompose/mapProps';
import { roleColorsSelector } from '../../selectors/configSelectors';

const enhance = compose(
  connect(createStructuredSelector({
    colors: roleColorsSelector,
  }), {}),
  mapProps(({
    colors,
    role,
    roles,
    component,
    ...props
  }) => ({
    ...props,
    style: {
      color: (
        role ? colors[role] : colors[roles.find(r => colors[r])]
      ) || colors.default,
    },
    component: component || 'span',
  })),
);

const RoleColor = componentFromProp('component');

export default enhance(RoleColor);
