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
