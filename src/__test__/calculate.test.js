import { operators } from "../operators";
import { calculate } from "../calculate";

test( "calculate handles the ADD operator", () => {
	expect( calculate( 1, 1, operators.ADD ) ).toBe( 2 );
	expect( calculate( 5, 5, operators.ADD ) ).toBe( 10 );
} );

test( "calculate handles the DIVIDE operator", () => {
	expect( calculate( 10, 100, operators.DIVIDE ) ).toBe( 10 );
	expect( calculate( 9, 99, operators.DIVIDE ) ).toBe( 11 );
} );

test( "calculate handles the MULTIPLY operator", () => {
	expect( calculate( 9, 9, operators.MULTIPLY ) ).toBe( 81 );
	expect( calculate( 9, 20, operators.MULTIPLY ) ).toBe( 180 );
} );

test( "calculate handles the SUBTRACT operator", () => {
	expect( calculate( 1, 10, operators.SUBTRACT ) ).toBe( 9 );
	expect( calculate( 1, 100, operators.SUBTRACT ) ).toBe( 99 );
} );

test( "calculate returns currentValue by default", () => {
	expect( calculate( 1, 100, undefined ) ).toBe( 1 );
} );
