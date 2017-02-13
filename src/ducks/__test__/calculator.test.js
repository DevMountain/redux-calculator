import { operators } from "../../operators";
import calculator, {
	  clear
	, enterNumber
	, evaluate
	, percentage
	, setOperator
	, toggleNegative
} from "../calculator";

test( "clear returns an object with type CLEAR", () => {
	expect( clear() ).toEqual( { type: "CLEAR" } );
} );

test( "enterNumber returns an object with type ENTER_NUMBER and a number", () => {
	expect( enterNumber( 10 ) ).toEqual( { number: 10, type: "ENTER_NUMBER" } );
	expect( enterNumber( 11 ) ).toEqual( { number: 11, type: "ENTER_NUMBER" } );
} );

test( "evaluate returns an object with type EVALUATE", () => {
	expect( evaluate() ).toEqual( { type: "EVALUATE" } );
} );

test( "percentage returns an object with type PRECENTAGE", () => {
	expect( percentage() ).toEqual( { type: "PERCENTAGE" } );
} );

test( "setOperator returns an object with type SET_OPERATOR and an operator", () => {
	expect( setOperator( operators.ADD ) ).toEqual( { operator: "ADD", type: "SET_OPERATOR" } );
	expect( setOperator( operators.DIVIDE ) ).toEqual( { operator: "DIVIDE", type: "SET_OPERATOR" } );
} );

test( "toggleNegative returns an object with type TOGGLE_NEGATIVE", () => {
	expect( toggleNegative() ).toEqual( { type: "TOGGLE_NEGATIVE" } );
} );

test( "calculator has initial state", () => {
	expect( calculator( undefined, {} ) ).toEqual( {
		  currentValue: "0"
		, operator: null
		, previousValue: 0
	} );
} );

test( "calculator handles ENTER_NUMBER actions when currentValue === '0'", () => {
	expect( calculator( undefined, enterNumber( 10 ) ) ).toEqual( {
		  currentValue: "10"
		, operator: null
		, previousValue: 0
	} );
} );

test( "calculator handles ENTER_NUMBER actions when currentValue !== '0'", () => {
	expect( calculator( {
		  currentValue: "9"
		, operator: operators.ADD
		, previousValue: 12
	}, enterNumber( 1 ) ) ).toEqual( {
		  currentValue: "91"
		, operator: operators.ADD
		, previousValue: 12
	} );
} );

test( "calculator does not mutate state on an ENTER_NUMBER action", () => {
	const previousState = {
		  currentValue: "9"
		, operator: operators.ADD
		, previousValue: 12
	};

	calculator( previousState, enterNumber( 2 ) );

	expect( previousState ).toEqual( {
		  currentValue: "9"
		, operator: operators.ADD
		, previousValue: 12
	} );
} );

test( "calculator places an operator on state when passed a SET_OPERATOR action", () => {
	expect( calculator( undefined, setOperator( operators.DIVIDE ) ).operator ).toBe( operators.DIVIDE );
} );

test( "calculator resets currentValue to '0' when passed a SET_OPERATOR action", () => {
	expect( calculator( {
		  currentValue: "9"
		, operator: null
		, previousValue: 0
	}, setOperator( operators.DIVIDE ) ).currentValue ).toBe( "0" );
} );

test( "calculator sets previousValue to currentValue when passed a SET_OPERATOR action and there is not an operator already on state", () => {
	expect( calculator( {
		  currentValue: "9"
		, operator: null
		, previousValue: 12
	}, setOperator( operators.DIVIDE ) ).previousValue ).toBe( 9 );
} );

test( "calculator sets previousValue to the result of calculate when passed a SET_OPERATOR action and there is an operator on state", () => {
	expect( calculator( {
		  currentValue: "9"
		, operator: operators.ADD
		, previousValue: 12
	}, setOperator( operators.SUBTRACT ) ).previousValue ).toBe( 21 );
} );

test( "calculator passed a SET_OPERATOR action does not mutate state", () => {
	const previousState = {
		  currentValue: "9"
		, operator: operators.ADD
		, previousValue: 12
	};

	calculator( previousState, setOperator( operators.DIVIDE ) );

	expect( previousState ).toEqual( {
		  currentValue: "9"
		, operator: operators.ADD
		, previousValue: 12
	} );
} );

test( "calculator passed a PERCENTAGE action divides currentValue by 100", () => {
	expect( calculator( {
		  currentValue: "9"
		, operator: operators.ADD
		, previousValue: 12
	}, percentage() ).currentValue ).toBe( "0.09" );
} );

test( "calculator passed a PERCENTAGE action does not mutate state", () => {
	const previousState ={
		  currentValue: "9"
		, operator: operators.ADD
		, previousValue: 12
	};

	calculator( previousState, percentage() );

	expect( previousState ).toEqual( {
		  currentValue: "9"
		, operator: operators.ADD
		, previousValue: 12
	} );
} );

test( "calculator passed a CLEAR action resets to initial state", () => {
	expect( calculator( {
		  currentValue: "9"
		, operator: operators.ADD
		, previousValue: 12
	}, clear() ) ).toEqual( {
		  currentValue: "0"
		, operator: null
		, previousValue: 0
	} );
} );

test( "calculator passed a CLEAR action does not mutate state", () => {
	const previousState = {
		  currentValue: "9"
		, operator: operators.ADD
		, previousValue: 12
	};

	calculator( previousState, clear() );

	expect( previousState ).toEqual( {
		  currentValue: "9"
		, operator: operators.ADD
		, previousValue: 12
	} );
} );

test( "calculator passed an EVALUATE action evaluates previousValue and currentValue with operator and resets operator and previousValue", () => {
	expect( calculator( {
		  currentValue: "9"
		, operator: operators.ADD
		, previousValue: 12
	}, evaluate() ) ).toEqual( {
		  currentValue: "21"
		, operator: null
		, previousValue: 0
	} );
} );

test( "calculator passed an EVALUATE action does not mutate state", () => {
	const previousState = {
		  currentValue: "9"
		, operator: operators.ADD
		, previousValue: 12
	};

	calculator( previousState, evaluate() );

	expect( previousState ).toEqual( {
		  currentValue: "9"
		, operator: operators.ADD
		, previousValue: 12
	} );
} );

test( "calculator passed a TOGGLE_NEGATIVE action will toggle between positive and negative values", () => {
	expect( calculator( {
		  currentValue: "9"
		, operator: operators.ADD
		, previousValue: 12
	}, toggleNegative() ) ).toEqual( {
		  currentValue: "-9"
		, operator: operators.ADD
		, previousValue: 12
	} );

	expect( calculator( {
		  currentValue: "-9"
		, operator: operators.ADD
		, previousValue: 12
	}, toggleNegative() ) ).toEqual( {
		  currentValue: "9"
		, operator: operators.ADD
		, previousValue: 12
	} );
} );

test( "calculator passed a TOGGLE_NEGATIVE action does not mutate state", () => {
	const previousState = {
		  currentValue: "9"
		, operator: operators.ADD
		, previousValue: 12
	};

	calculator( previousState, toggleNegative() );

	expect( previousState ).toEqual( {
		  currentValue: "9"
		, operator: operators.ADD
		, previousValue: 12
	} );
} );
