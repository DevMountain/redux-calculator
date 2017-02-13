import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";

import CalculatorButton from "./CalculatorButton";

test( "CalculatorButton calls props.callback on click", () => {
	const spy = sinon.spy();
	const calculatorButton = shallow(
		<CalculatorButton
			callback={ spy }
		/>
	);

	calculatorButton
		.find( ".calculator-button" )
		.simulate( "click" );

	sinon.assert.calledOnce( spy );
} );
