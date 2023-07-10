/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
	"use strict";

	sap.ui.require([
		"cristianofiori/cadastroclientes/test/integration/AllJourneys"
	], function() {
		QUnit.start();
	});
});