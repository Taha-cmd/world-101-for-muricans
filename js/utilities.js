function getTargetInputField(e) {
	return e.target.attributes.id.value == "input1"
		? document.getElementById("input2")
		: document.getElementById("input1");
}

const americanWightUnits = ["gr", "dr", "oz", "lb"];

function makeAmericanWeightUnits() {
	const americanWightUnitsSelectors = americanWightUnits.map(makeUnitSelector);
	console.log(americanWightUnitsSelectors);
}

function makeSIWeightUnits() {
	const g = makeUnitSelector("g");
}

function makeUnitSelector(value) {
	const button = document.createElement("button");
	button.setAttribute("type", "button");
	button.setAttribute("class", "btn btn-sm btn-primary p-1 unit-selector");
	button.setAttribute("value", value);
	button.innerText = value;

	return button;
}
