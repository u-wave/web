import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import find from 'array-find';
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
    ...props
  }) => ({
    ...props,
    style: {
      color: (
        role ? colors[role] : colors[find(roles, r => colors[r])]
      ) || colors.default,
    },
    component: props.component || 'span',
  })),
);

const RoleColor = componentFromProp('component');

export default enhance(RoleColor);
