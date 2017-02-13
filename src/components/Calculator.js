import React, { Component } from "react";

import "./Calculator.css";

import CalculatorButton from "./CalculatorButton/CalculatorButton";
import Display from "./Display/Display";

export class Calculator extends Component {
	render() {
		const numberButtons = [ 7, 8, 9, 4, 5, 6, 1, 2, 3, 0 ].map( number => (
			<CalculatorButton
				callback={ () => null }
				key={ number }
				value={ number }
				wide={ number === 0 }
			/>
		) );

		return (
			<main className="calculator">
				<Display value={ 0 } />
				<div className="calculator__buttons-wrapper">
					<section className="calculator__left-buttons">
						<CalculatorButton
							backgroundColor="#d6d6d6"
							callback={ () => null }
							value="AC"
						/>
						<CalculatorButton
							backgroundColor="#d6d6d6"
							callback={ () => null }
							value="+/-"
						/>
						<CalculatorButton
							backgroundColor="#d6d6d6"
							callback={ () => null }
							value="%"
						/>
						{ numberButtons }
						<CalculatorButton
							callback={ () => null }
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
							callback={ () => null }
							color="#ffffff"
							value="="
						/>
					</section>
				</div>
			</main>
		);
	}
}

export default Calculator;
