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