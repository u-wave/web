# Selectors

Selectors are functions that select little bits of state. They're used to map
properties on the state tree, to props to pass to React components.

## But Why‽

Selector functions are used in place of plain old property access. This way a
component doesn't have to know what the state tree looks like. The functions can
also encapsulate more complex logic, so we don't have to care if a specific
selector simply returns a property, or if it derives its value through a more
complex computation, like a `.filter` call.

## Reselect

The üWave web app uses [Reselect](https://github.com/rackt/reselect) to create
complex selectors by combining ("composing") smaller selector functions.
Reselect also "memoises" selectors: if the smaller selector functions don't
report changes, Reselect will not recalculate a combined selector function. That
means that we can do semi-heavy calculations inside selectors without a large
performance hit.

## Example

```js
// Pick the "todos" property from the state tree:
const todosSelector = state => state.todos;
// Create a selector function based on the above:
const completedTodosSelector = createSelector(
  todosSelector,
  // `todos` here is the return value of the `todosSelector`.
  // We can now return something else to the `completedTodosSelector`!
  todos => todos.filter(todo => todo.complete)
);

const reduxStoreState = {
  todos: [
    { text: 'Eat the Rich', complete: false },
    { text: 'Learn Reselect', complete: true }
  ]
};

// Log all todos that are marked as complete:
console.log(completedTodosSelector(reduxStoreState));
// Results in:
// → [ { text: 'Learn Reselect', complete: true } ]
// Essentially, it ran:
// let todos = reduxStoreState.todos; // todosSelector
// console.log(todos.filter(todo => todo.complete)); // completedTodosSelector
```
