function getTargetInputField(e) {
	return e.target.attributes.id.value == "input1"
		? document.getElementById("input2")
		: document.getElementById("input1");
}

const americanWightUnits = ["gr", "oz", "lb"];
const SIWeightUnits = ["mg", "g", "kg", "t"];

const americanTemperatureUnits = ["F°"];
const SITemperatureUnits = ["C°"];

const SILengthUnits = ["mm", "cm", "m", "km"];
const americanLengthUnits = ["in", "ft", "yd", "ml"];

function makeAmericanWeightUnits() {
	const americanWightUnitsSelectors = americanWightUnits.map(makeUnitSelector);
	return americanWightUnitsSelectors;
}

function makeSIWeightUnits() {
	const SIWightUnitsSelectors = SIWeightUnits.map(makeUnitSelector);
	return SIWightUnitsSelectors;
}

function makeAmericanTemperatureUnits() {
	const americanTemperatureUnitsSelectors = americanTemperatureUnits.map(makeUnitSelector);
	return americanTemperatureUnitsSelectors;
}

function makeSITemperatureUnits() {
	const SITemperatureUnitsSelectors = SITemperatureUnits.map(makeUnitSelector);
	return SITemperatureUnitsSelectors;
}

function makeAmericanLengthUnits(){
	const americanLengthUnitsSelectors = americanLengthUnits.map(makeUnitSelector);
	return americanLengthUnitsSelectors;
}

function makeSILengthUnits(){
	const SILengthUnitsSelectors = SILengthUnits.map(makeUnitSelector);
	return SILengthUnitsSelectors;
}

function makeUnitSelector(value) {
	const button = document.createElement("button");
	button.setAttribute("type", "button");
	button.setAttribute("class", "btn btn-sm btn-primary p-1 unit-selector");
	button.setAttribute("value", value);
	button.innerText = value;

	return button;
}

function triggerConvert() {
	const keyup = new Event("keyup");
	inputFields.forEach((field) => field.dispatchEvent(keyup));
}
