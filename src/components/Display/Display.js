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
			0
		</div>
	);
}
