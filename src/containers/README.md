# Containers

Containers are [React](https://facebook.github.io/react) components that manage
state. In üWave's case, "managing state" means selecting relevant state
properties from the Redux store.

Most Containers follow this pattern:

```js
// Function to select properties from Redux and turn them into an object that
// is passed to the React component as props.
const mapStateToProps = state => ({
  property: propertySelector(state)
});
// Create an object with action functions. With Redux, this means functions that
// are "bound" to a store dispatch function.
// Normally these will be passed down as event handlers to child components.
const mapDispatchToProps = dispatch => bindActionCreators({
  onAction: createSomeKindOfActionObject
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
class ContainerComponent extends React.Component {
  render() {
    // Most container components just render a single child, passing all props.
    // The child will then actually render elements--see the components folder.
    // This way the containers _only_ care about state, and nothing else.
    return <InnerComponent {...this.props} />;
  }
}
```
