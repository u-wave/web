# Selectors

Selectors are functions that select little bits of state. They're used to map
properties on the state tree, to props to pass to React components.

Selector functions are used in place of plain old property access. This makes it
easier to change the shape of the state tree later on, if it turns out that we
can do something more efficiently. The functions can also encapsulate more
complex logic nicely, so we don't have to care if a specific selector simply
returns a property, or if it derives its value through a more complex
computation.

The üWave web app uses [Reselect](https://github.com/rackt/reselect) to create
complex selectors by combining ("composing") smaller selector functions.
Reselect also "memoises" selectors: if the smaller selector functions don't
report changes, Reselect will not recalculate a combined selector function. That
means that we can do semi-heavy calculations inside selectors without a large
performance hit.
