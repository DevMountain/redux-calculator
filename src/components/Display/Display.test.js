import React from "react";
import { shallow } from "enzyme";

import Display from "./Display";

test( "Display shows props.value", () => {
	const display = shallow( <Display value={ 10 } /> );

	expect( display.text() ).toBe( "10" );

	display.setProps( { value: 0 } );

	expect( display.text() ).toBe( "0" );
} );