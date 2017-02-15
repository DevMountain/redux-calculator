
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

```
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
<br />

<details>

<summary>**Code Solution**</summary>

<details>

<summary>`src/ducks/calculator.js`</summary>

```javascript
const initialState = {
	  currentValue: "0"
	, operator: null
	, previousValue: 0
};

export default function calculator( state = initialState, action ) {
	return state;
}
```

</details>

<details>

<summary>`src/store.js`</summary>

```javascript
import { createStore } from "redux";

import calculator from "./ducks/calculator";

export default createStore( calculator );
```

</details>

<details>

<summary>`src/index.js`</summary>

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";

import store from "./store";

import Calculator from "./components/Calculator";

ReactDOM.render(
	<Provider store={ store }>
		<Calculator />
	</Provider>,
	document.getElementById( 'root' )
);
```

</details>

<details>

<summary>`src/components/Calculator.js`</summary>

```jsx
import React, { Component } from "react";
import { connect } from "react-redux";

import "./Calculator.css";

import CalculatorButton from "./CalculatorButton/CalculatorButton";
import Display from "./Display/Display";

export class Calculator extends Component {
	/* Calculator definition */
}

function mapStateToProps( state ) {
	return state;
}

export default connect( mapStateToProps )( Calculator );
```

</details>

</details>

### Step 2

**Summary**

In this step we will begin adding some basic functionality to the calculator through Redux actions.

**Instructions**

* Create the `ENTER_NUMBER`, `CLEAR`, `PERCENTAGE`, and `TOGGLE_NEGATIVE` action types, and their corresponding action creators
* Place the action creators onto `Calculator`'s props via `connect`
* Assign the action creator functions to the appropriate JSX elements
* Update `Display` to display `currentValue`
* Update `CalculatorButton` to call the functions on click

**Detailed Instructions**

We'll start this step in `src/ducks/calculator.js`. At the top of the file create the four following action types, set equal to string values of their variable name:

* `ENTER_NUMBER` - `"ENTER_NUMBER"`
* `CLEAR` - `"CLEAR"`
* `PERCENTAGE` - `"PERCENTAGE"`
* `TOGGLE_NEGATIVE` - `"TOGGLE_NEGATIVE"`

Below the reducer, create action creators for each of these action types. The `clear`, `percentage`, and `toggleNegative` action creator functions should simply return an object with the appropriate `type` property. `enterNumber` will take a single parameter `number` and return an object with a type of `ENTER_NUMBER` and the `number` parameter. Export all of these action creators.

Now we need to refactor the `calculator` reducer to handle these actions. Remember that `currentValue` is a string, this will make some parts easier and other parts a bit more difficult.

Begin by writing a `switch` statement that checks `action.type` with a `default` case that returns `state`. The first case we will check for (make sure it is above `default`!) will be `ENTER_NUMBER`. In the case of `ENTER_NUMBER` we will use [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) to return a copy of `state` where `currentValue` is changed to include `action.number`.  There are a few gotcha's here:

* What if `currentValue` is at its default of `"0"`? We don't want our calculator to display "04".
* Remember that we want `currentValue` to stay as a string, don't forget to convert the `action.number` to a string

<details>

<summary>The `ENTER_NUMBER`  case should look something like this:</summary>

```javascript
return Object.assign( state, {
	// If state.currentValue is at its default, simply replace it with the given number
	// Otherwise, concatenate the strings
	currentValue: state.currentValue === "0" ? action.number.toString() : state.currentValue + action.number.toString()
} );
```

</details>

Next up is an easy one - the `CLEAR` case. When passed an action of type `CLEAR` the reducer should simply return `initialState`, resetting to its default values.

After clear comes the `PERCENTAGE` case. When passed an action of type `PERCENTAGE` the reducer should return a copy of `state` where`currentValue` has been divided by 100. To do this you will need to convert `curentValue` to a number, divide it by 100, and then convert it back to a string. Keep in mind that the number could be a decimal, so `parseInt` may not work!

The last action in this step is `TOGGLE_NEGATIVE`. This case should return a copy of `state` where `currentValue` has been converted from positive to negative (or vice-versa). This can be achieved like this: `( -parseFloat( state.currentValue ) ).toString()`.

Our reducer is able to handle these actions, so let's put them to work. Open up `src/components/Calculator.js` and import the four newly made action creators. We need these action creators wrapped in Redux's [`dispatch`](http://redux.js.org/docs/api/Store.html#dispatch) function and added to `Calculator`'s props, so we'll have to update our `connect` decorator. Pass an object consisting of the action creators as a second argument to `connect`.

Inside of `Calculate`'s `render` method destructure `currentValue`, `enterNumber`, `clear`, `percentage` and `toggleNegative` from `this.props`. Pass `currentValue` to the `Display` component's `value` prop. In the `map` where the `numberButtons` are created change the `callback` prop so that it invokes `enterNumber` passing in the current number, like so: `callback={ () => enterNumber( number ) }`. Pass `clear`, `percentage`, and `toggleNegative` to the `callback` prop of the appropriate buttons. Finally, use `enterNumber` in the decimal button, passing in `"."` as an argument.

Open up `src/components/Display/Display.js` and alter the JSX so that it displays its `value` prop instead of a static `0`. Open `src/components/CalculatorButton/CalculatorButton.js` and give the top level `<button>` element an `onClick` prop, passing in `callback`.

You should now be able to enter values, see them appear in the display, reset the display to 0, toggle the value between positive and negative, and divide the value by 100 using the percentage button.

<details>

<summary>**Code Solution**</summary>

<details>

<summary>`src/ducks/calculator.js`</summary>

```javascript
const CLEAR = "CLEAR";
const ENTER_NUMBER = "ENTER_NUMBER";
const PERCENTAGE = "PERCENTAGE";
const TOGGLE_NEGATIVE = "TOGGLE_NEGATIVE";

const initialState = {
	  currentValue: "0"
	, operator: null
	, previousValue: 0
};

export default function calculator( state = initialState, action ) {
	switch ( action.type ) {
		case ENTER_NUMBER:
			return {
				  ...state
				, currentValue: state.currentValue === "0" ? action.number.toString() : `${ state.currentValue }${ action.number }`
			};
		case PERCENTAGE:
			return {
				  ...state
				, currentValue: ( parseFloat( state.currentValue ) / 100 ).toString()
			};
		case CLEAR:
			return {
				  currentValue: "0"
				, operator: null
				, previousValue: 0
			};
		case TOGGLE_NEGATIVE:
			return {
				  ...state
				, currentValue: ( -parseFloat( state.currentValue ) ).toString()
			};
		default:
			return state;
	}
}

export function clear() {
	return { type: CLEAR };
}

export function enterNumber( number ) {
	return { number, type: ENTER_NUMBER };
}

export function percentage() {
	return { type: PERCENTAGE };
}

export function toggleNegative() {
	return { type: TOGGLE_NEGATIVE };
}
```

</details>

<details>

<summary>`src/components/Calculator.js`</summary>

```jsx
import React, { Component } from "react";
import { connect } from "react-redux";

import "./Calculator.css";

import { operators } from "../operators";
import {
	  enterNumber
	, percentage
	, clear
	, toggleNegative
} from "../ducks/calculator";

import CalculatorButton from "./CalculatorButton/CalculatorButton";
import Display from "./Display/Display";

export class Calculator extends Component {
	render() {
		const {
			  currentValue
			, enterNumber
			, percentage
			, clear
			, toggleNegative
		} = this.props;
		const numberButtons = [ 7, 8, 9, 4, 5, 6, 1, 2, 3, 0 ].map( number => (
			<CalculatorButton
				callback={ () => enterNumber( number ) }
				key={ number }
				value={ number }
				wide={ number === 0 }
			/>
		) );

		return (
			<main className="calculator">
				<Display value={ currentValue } />
				<div className="calculator__buttons-wrapper">
					<section className="calculator__left-buttons">
						<CalculatorButton
							backgroundColor="#d6d6d6"
							callback={ clear }
							value="AC"
						/>
						<CalculatorButton
							backgroundColor="#d6d6d6"
							callback={ toggleNegative }
							value="+/-"
						/>
						<CalculatorButton
							backgroundColor="#d6d6d6"
							callback={ percentage }
							value="%"
						/>
						{ numberButtons }
						<CalculatorButton
							callback={ () => enterNumber( "." ) }
							value="."
						/>
					</section>
					<section className="calculator__operator-buttons">
						<CalculatorButton
							backgroundColor="#f5923e"
							callback={ () => null }
							color="#ffffff"
							value="÷"
						/>
						<CalculatorButton
							backgroundColor="#f5923e"
							callback={ () => null }
							color="#ffffff"
							value="×"
						/>
						<CalculatorButton
							backgroundColor="#f5923e"
							callback={ () => null }
							color="#ffffff"
							value="-"
						/>
						<CalculatorButton
							backgroundColor="#f5923e"
							callback={ () => null }
							color="#ffffff"
							value="+"
						/>
						<CalculatorButton
							backgroundColor="#f5923e"
							callback={ () => null}
							color="#ffffff"
							value="="
						/>
					</section>
				</div>
			</main>
		);
	}
}

function mapStateToProps( state ) {
	return state;
}

export default connect( mapStateToProps, {
	  clear
	, enterNumber
	, percentage
	, toggleNegative
} )( Calculator );
```

</details>

<details>

<summary>`src/components/Display/Display.js`</summary>

```jsx
import React from "react";

import "./Display.css";

export default function Display( { value } ) {
	return (
		<div className="display">
			<div className="display__window-button-wrapper">
				<div className="display__window-button" />
				<div className="display__window-button" />
				<div className="display__window-button" />
			</div>
			{ value }
		</div>
	);
}
```

</details>

<details>

<summary>`src/components/CalculatorButton/CalculatorButton.js`</summary>

```jsx
import React, { PropTypes } from "react";

import "./CalculatorButton.css";

export default function CalculatorButton( { backgroundColor, callback, color, value, wide } ) {
	return (
		<button
			onClick={ callback }
			className={ `calculator-button${ wide ? " calculator-button--wide" : "" }` }
			style={ { backgroundColor, color } }
		>
			{ value }
		</button>
	);
}

CalculatorButton.propTypes = {
	  backgroundColor: PropTypes.string
	, callback: PropTypes.func
	, color: PropTypes.string
	, wide: PropTypes.bool
};

CalculatorButton.defaultProps = {
	  backgroundColor: "#e0e0e0"
	, color: "black"
	, wide: false
};
```

</details>

</details>

### Step 3

**Summary**

In this step we will implement the functionality to handle mathematical operations.

**Instructions**

* Create `EVALUATE` and `SET_OPERATOR` action types and their corresponding action creators
* Create a `calculate` function in `src/calculate.js`
* Refactor the `calculator` reducer to make use of `calculate` and handle the new actions
* Map the new action creators to the `Calculator` component definition's props
* Assign the action creators to the appropriate JSX elements

**Detailed Instructions**

Begin this step in `src/ducks/calculator.js`. Create two new action types - `EVALUATE` and `SET_OPERATOR`as well as corresponding action creators. The `evaluate` action creator should simply return an object with a type of `EVAlUATE`, the `setOperator` action creator should take a parameter of `operator` and return an object with the type `SET_OPERATOR` and the `operator`.

Now that our action creators are finished, we need to find a way to actually calculate these operations. Open up `src/calculate.js` and create the function `calculate`. `calculate` should be exported and take three parameters - `currentValue`, `previousValue` and `operator`. Because the operator we are storing on state is a string, we need to check what type of operator we are working with before calculating the result. To do this we'll need import the provided `operators` object from `src/operators.js`. The `operators` object is just a list of constants that looks like this:

```javascript
export const operators = {
	  ADD: "ADD"
	, DIVIDE: "DIVIDE"
	, MULTIPLY: "MULTIPLY"
	, SUBTRACT: "SUBTRACT"
};
```

The reason we store them this way is to avoid "magic strings". Hard coding the string into multiple places comes with a lot of downsides, such as potential for typos, needing to find and change all of them if the string is ever changed, and confusion from developers later reading the code.

Now that we have our object full of operators, let's add a `switch` statement to the `calculate` function that checks the `operator` parameter. Add a `case` for each of the possible operators that returns the value of the necessary calculation (i.e `case operators.DIVIDE: return previousValue / currentValue`). For safety, add a default case that simply returns `currentValue`.

Import the `calculate` function to `src/ducks/calculator.js`. Add a case to the reducer that handles `EVALUATE` actions. This case should return an object where `operator` and `previousValue` are returned to their initial values, and `currentValue` is set equal to the result of the `calculate` function. A few notes for `currentValue`:

* `state.currentValue` is a string, and `calculate will be expecting a number
* We want the updated `currentValue` to be a string as well, don't forget to convert the result of `calculate`

We now need to add a case for handling the `SET_OPERATOR` action type. This case should return an object where `currentValue` is set to `"0"`, and `operator` is set to `action.operator`. `previousValue` will be a little tricky. To know what to set `previousValue` to, we first have to check whether or not there is already on operator on state. If there is not an operator on state, we can simply set `previousValue` equal to `state.currentValue`, if there *is* already an operator on state then we need to set `previousValue` equal to the result of the `calculate` function. It will look something like this:
`previousValue: state.operator ? calculate( parseFloat( state.currentValue ), state.previousValue, state.operator ) : parseFloat( state.currentValue )`.

Let's go put these action creators to use in `src/components/Calculator.js`! Import the two new action creators as well as the `operators` object. Add these action creators to the object passed as the second argument to `connect`. Pass the `evaluate` action creator to the `callback` prop on the = button. Change the `callback` prop for the +, -, ÷, and × buttons so that it invokes `setOperator`, passing the appropriate operator from the `operators` object.

You should now have a functioning calculator capable of the same basic functionality as your computer's calculator!

<details>

<summary>**Code Solution**</summary>

<details>

<summary>`src/ducks/calculator.js`</summary>

```javascript
import { calculate } from "../calculate";

const CLEAR = "CLEAR";
const ENTER_NUMBER = "ENTER_NUMBER";
const EVALUATE = "EVALUATE";
const PERCENTAGE = "PERCENTAGE";
const SET_OPERATOR = "SET_OPERATOR";
const TOGGLE_NEGATIVE = "TOGGLE_NEGATIVE";

const initialState = {
	  currentValue: "0"
	, operator: null
	, previousValue: 0
};

export default function calculator( state = initialState, action ) {
	switch ( action.type ) {
		case ENTER_NUMBER:
			return {
				  ...state
				, currentValue: state.currentValue === "0" ? action.number.toString() : `${ state.currentValue }${ action.number }`
			};
		case SET_OPERATOR:
			return {
				  currentValue: "0"
				, operator: action.operator
				, previousValue: state.operator ? calculate( parseFloat( state.currentValue ), state.previousValue, state.operator ) : parseFloat( state.currentValue )
			};
		case PERCENTAGE:
			return {
				  ...state
				, currentValue: ( parseFloat( state.currentValue ) / 100 ).toString()
			};
		case CLEAR:
			return {
				  currentValue: "0"
				, operator: null
				, previousValue: 0
			};
		case EVALUATE:
			return {
				  currentValue: calculate( parseFloat( state.currentValue ), state.previousValue, state.operator ).toString()
				, operator: null
				, previousValue: 0
			};
		case TOGGLE_NEGATIVE:
			return {
				  ...state
				, currentValue: ( -parseFloat( state.currentValue ) ).toString()
			};
		default:
			return state;
	}
}

export function clear() {
	return { type: CLEAR };
}

export function enterNumber( number ) {
	return { number, type: ENTER_NUMBER };
}

export function evaluate() {
	return { type: EVALUATE };
}

export function percentage() {
	return { type: PERCENTAGE };
}

export function setOperator( operator ) {
	return { operator, type: SET_OPERATOR };
}

export function toggleNegative() {
	return { type: TOGGLE_NEGATIVE };
}
```

</details>

<details>

<summary>`src/calculate.js`</summary>

```javascript
import { operators } from "./operators";

export function calculate( currentValue, previousValue, operator ) {
	switch ( operator ) {
		case operators.ADD:
			return previousValue + currentValue;
		case operators.DIVIDE:
			return previousValue / currentValue;
		case operators.MULTIPLY:
			return previousValue * currentValue;
		case operators.SUBTRACT:
			return previousValue - currentValue;
		default:
			return currentValue;
	}
}
```

</details>

<details>

<summary>`src/components/Calculator.js`</summary>

```jsx
import React, { Component } from "react";
import { connect } from "react-redux";

import "./Calculator.css";

import { operators } from "../operators";
import {
	  enterNumber
	, setOperator
	, percentage
	, clear
	, evaluate
	, toggleNegative
} from "../ducks/calculator";

import CalculatorButton from "./CalculatorButton/CalculatorButton";
import Display from "./Display/Display";

export class Calculator extends Component {
	render() {
		const {
			  currentValue
			, enterNumber
			, setOperator
			, percentage
			, clear
			, evaluate
			, toggleNegative
		} = this.props;
		const numberButtons = [ 7, 8, 9, 4, 5, 6, 1, 2, 3, 0 ].map( ( number ) => (
			<CalculatorButton
				callback={ () => enterNumber( number ) }
				key={ number }
				value={ number }
				wide={ number === 0 }
			/>
		) );

		return (
			<main className="calculator">
				<Display value={ currentValue } />
				<div className="calculator__buttons-wrapper">
					<section className="calculator__left-buttons">
						<CalculatorButton
							backgroundColor="#d6d6d6"
							callback={ clear }
							value="AC"
						/>
						<CalculatorButton
							backgroundColor="#d6d6d6"
							callback={ toggleNegative }
							value="+/-"
						/>
						<CalculatorButton
							backgroundColor="#d6d6d6"
							callback={ percentage }
							value="%"
						/>
						{ numberButtons }
						<CalculatorButton
							callback={ () => enterNumber( "." ) }
							value="."
						/>
					</section>
					<section className="calculator__operator-buttons">
						<CalculatorButton
							backgroundColor="#f5923e"
							callback={ () => setOperator( operators.DIVIDE ) }
							color="#ffffff"
							value="÷"
						/>
						<CalculatorButton
							backgroundColor="#f5923e"
							callback={ () => setOperator( operators.MULTIPLY ) }
							color="#ffffff"
							value="×"
						/>
						<CalculatorButton
							backgroundColor="#f5923e"
							callback={ () => setOperator( operators.SUBTRACT ) }
							color="#ffffff"
							value="-"
						/>
						<CalculatorButton
							backgroundColor="#f5923e"
							callback={ () => setOperator( operators.ADD ) }
							color="#ffffff"
							value="+"
						/>
						<CalculatorButton
							backgroundColor="#f5923e"
							callback={ evaluate }
							color="#ffffff"
							value="="
						/>
					</section>
				</div>
			</main>
		);
	}
}

function mapStateToProps( state ) {
	return state;
}

export default connect( mapStateToProps, {
	  enterNumber
	, setOperator
	, percentage
	, clear
	, evaluate
	, toggleNegative
} )( Calculator );
```

</details>

</details>

## Contributions

### Contributions

#### 
 
If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

### Copyright

#### 

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">