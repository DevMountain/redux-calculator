
## Redux Calculator

**Setup**

To begin, fork and clone this repository. Once it has finished downloading `cd` into the project root and run `npm i` to fetch the project dependencies. After they are fetched run `npm start` and a browser window will open at `http://localhost:3000` displaying a (non-functioning) calculator app. In another terminal window run `npm test` to run the test suite.

**The Plan**

This project's goal is to recreate the standard OSX calculator in React, handling all state changes in Redux. A layout is provided, but none of the functionality is implemented yet.

### Step 1

**Summary**

Our first step will be installing the necessary dependencies and connecting our application to Redux. Before beginning, take a few minutes get familiar with the provided components. The root component, `Calculator` serves primarily as a container component, passing props to its children. The `Display` component is a functional component that simply renders some markup and will display the calculator's value. The `CalculatorButton` component is another functional component, and will be the user's primary point of interaction with the application.

**Instructions**

* Install Redux and React-Redux
* Create an initial state and reducer function in `src/ducks/calculator.js`
* Create a store in `src/store.js`
* Make the React application aware of Redux using the `Provider` component
* Connect the `Calculator` component definition to the Redux store

**Detailed Instructions**

Start out by running `npm i redux react-redux --save` to download our dependencies and save them to the `package.json`. Open `src/ducks/calculator.js` and create an `initialState` variable. `initialState` should be an object with three properties:

* `currentValue` - Set equal to `"0"` (note that it is a string!). This is where we will be storing the calculator's current value that displays on screen.
* `operator` - Set equal to `null`. This will be a string representation of what operation the user wants to use, i.e "DIVIDE" or "MULTIPLY"
* `previousValue` - Set equal to `0` (not a string!). This is the value that the user entered before selecting an operation.

Beneath `initialState` we'll create the reducer function. Create and export by default a function named `calculator` which takes two parameters:

* `state`, which defaults to `initialState`. An object representation of the application's current state.
* `action`, an object describing what has prompted the state change.

We can now use this reducer to create our Redux store. Open up `src/store.js` and import `createStore` from Redux and our `calculator` reducer. Create the store by invoking `createStore` and passing `calculator` as an argument. Export the result of this invocation by default. Remember that this store is just a plain JavaScript object containing all of our state data.

Next we will make our React application aware of the store using the `Provider` component. In `src/index.js` import `Provider` from React-Redux and `store` from `src/store.js`. Wrap the root component (`Calculator`) in the `Provider` component, passing `store` as a prop to `Provider`.

Now that our application overall knows about our Redux store, we need to connect a component and actually access that data. In `src/components/Calculator.js` import `connect` from React-Redux. Underneath `Calculator`'s component definition create a function named `mapStateToProps`. This function takes a single parameter, `state`, and simply returns `state`.

`mapStateToProps` is how we tell Redux which pieces of state this component is interested in. Right now our application state is small and focused on this one component, but in a larger application you might have dozens or hundreds of properties on state! You wouldn't want to pass everything going on in your application to every component! If we wanted to pass only specific properties to a component, our function would look more like this:

<details>

<summary>`mapStateToProps` specific properties example:</summary>

```javascript
function mapStateToProps( state ) {
	return { currentValue: state.currentValue };
}
```

In the above example we would have access to `this.props.currentValue` inside the component, but not `previousValue` or `operator`.

</details>

Once `mapStateToProps` is completed we can use it in conjunction with `connect` to decorate the `Calculator` component definition. Create the decorator by invoking `connect` and passing `mapStateToProps` as an argument, then decorate your component definition by invoking the decorator and passing in `Calculator`. Export the decorated component definition by default. This pattern takes some getting used to, so here's a reminder:

<details>

<summary>Decorator Example</summary>

```javascript
function mapStateToProps( state ) {
	return state;
}
const decorator = connect( mapStateToProps );
const decoratedComponent = decorator( App );
export default decoratedComponent;
```
This is usually shortened to

```javascript
function mapStateToProps( state ) {
	return state;
}
export default connect( mapStateToProps )( App );
```
___

</details>

You should now be able to `console.log( this.props )` inside of `Calculator`'s render method and see an object containing state information.

## Contributions

### Contributions

#### 
 
If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

### Copyright

#### 

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">