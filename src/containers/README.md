# Containers

Containers are [React](https://reactjs.org) components that manage state. In
üWave's case, "managing state" means selecting relevant state properties from
the Redux store.

Most Containers follow this pattern:

```js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const {
  useCallback,
} = React;

function ContainerComponent() {
  // Select properties from Redux to pass to the inner React component as props.
  const property = useSelector(propertySelector);
  // Create action functions. With Redux, this means functions that are "bound"
  // to a store dispatch function using `useCallback()`.
  // Normally these will be passed down as event handlers to child components.
  const dispatch = useDispatch();
  const onAction = useCallback(() => dispatch(createSomeKindOfActionObject()), []);

  // Most container components just render a single child, passing all props.
  // The child will then actually render elements--see the components folder.
  // This way the containers _only_ care about state, and nothing else.
  return (
    <InnerComponent
      property={property}
      onAction={onAction}
    />
  );
}
```
