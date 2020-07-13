const buttons = Array.from(document.querySelectorAll(".category"));
const unitSelectors = Array.from(document.querySelectorAll(".unit-selector"));
const currentCategory = document.getElementById("current-category");
const currentSymbol = document.getElementById("current-symbol");
const inputFields = document.querySelectorAll("input[type=text]");
const error = document.querySelector("#error");
const unitsContainer1 = document.querySelector("#units-group1");
const unitsContainer2 = document.querySelector("#units-group2");
const unit1 = document.querySelector("#unit1");
const unit2 = document.querySelector("#unit2");
const digits = /^(-?[0-9]+(\.[0-9]*)?)/;

buttons.forEach((button) => button.addEventListener("click", updateDisplay));
buttons.forEach((button) => button.addEventListener("click", updateUnitsList));
inputFields.forEach((field) => field.addEventListener("keyup", convert));
unitSelectors.forEach((selector) =>
	selector.addEventListener("click", updateUnits)
);

function updateDisplay(e) {
	// extract values from click event
	let category = null;
	let symbol = null;

	if (buttons.includes(e.target)) {
		category = e.target.attributes.value.value;
		symbol = e.target.children[0].attributes.class.value;
	} else {
		category = e.target.parentElement.attributes.value.value;
		symbol = e.target.parentElement.children[0].attributes.class.value;
	}

	currentCategory.innerText = category;
	currentSymbol.attributes.removeNamedItem("class");
	currentSymbol.setAttribute("class", symbol);
	unit1.innerText = "";
	unit2.innerText = "";
	error.classList.add("d-none");
	inputFields.forEach((field) => (field.value = ""));
}

function updateUnitsList(e) {
	const currentUnitsGroup1 = Array.from(unitsContainer1.children);
	const currentUnitsGroup2 = Array.from(unitsContainer2.children);

	currentUnitsGroup1.forEach((unit) => unit.remove());
	currentUnitsGroup2.forEach((unit) => unit.remove());

	let americanUnitSelectors = [];
	let SIUnitSelectors = [];

	switch (currentCategory.innerText) {
		case "Weight":
			americanUnitSelectors = makeAmericanWeightUnits();
			SIUnitSelectors = makeSIWeightUnits();
			break;

		case "Temperature":
			americanUnitSelectors = makeAmericanTemperatureUnits();
			SIUnitSelectors = makeSITemperatureUnits();
			break;

		case "Length":
			americanUnitSelectors = makeAmericanLengthUnits();
			SIUnitSelectors = makeSILengthUnits();
			break;
	}

	americanUnitSelectors.forEach((selector) => {
		unitsContainer1.appendChild(selector);
		selector.addEventListener("click", updateUnits);
	});

	SIUnitSelectors.forEach((selector) => {
		unitsContainer2.appendChild(selector);
		selector.addEventListener("click", updateUnits);
	});
}

function updateUnits(e) {
	if (e.target.parentElement.attributes.id.value == "units-group1")
		unit1.innerText = e.target.attributes.value.value;
	else unit2.innerText = e.target.attributes.value.value;

	if (unit1.innerText != "" && unit2.innerText != "") {
		error.classList.add("d-none");
		triggerConvert();
	}
}

function convert(e) {
	error.classList.add("d-none"); // always hide error message
	if (unit1.innerText == "" || unit2.innerText == "") {
		error.innerText = "Please select a unit";
		error.classList.remove("d-none");
		return;
	}
	if (e.target.value == "-") return; // if value just -, return (give a user a chance to enter more input)
	// - will stay, no conversion is made
	if (e.target.value == "") {
		inputFields.forEach((field) => (field.value = ""));
		return; // when input is deleted, set all values to ''
	}
	if (!digits.test(e.target.value)) {
		error.innerText = "Please enter valid numbers";
		error.classList.remove("d-none");
		return;
	}

	const value = parseFloat(e.target.value);
	const target = getTargetInputField(e);
	const targetUnit = target.parentElement.nextElementSibling.innerText;
	const sourceUnit = e.target.parentElement.nextElementSibling.innerText;

	switch (currentCategory.innerText) {
		case "Temperature":
			switch (sourceUnit) {
				case "F°":
					switch (targetUnit) {
						case "C°": target.value = FahrenheitToCelsius(value); break;
					}
					break;

				case "C°":
					switch (targetUnit) {
						case "F°": target.value = CelsiusToFahrenheit(value); break;
					}
					break;
			}
			break;

		case "Weight":
			switch (sourceUnit) {
				case "gr": target.value = GrainToSIWeight(value, targetUnit); break;
				case "oz": target.value = OunceToSIWeight(value, targetUnit); break;
				case "lb": target.value = PoundToSIWeight(value, targetUnit); break;
				default:
					switch (targetUnit) {
						case 'gr': target.value = SIWeightToGrain(value, sourceUnit); break;
						case 'oz': target.value = SIWeightToOunce(value, sourceUnit); break;
						case 'lb': target.value = SIWeightToPound(value, sourceUnit); break;
					}
					break;
			}
			break;

		case "Length":
			switch(sourceUnit){
				case "in": break;
				case 'ft': break;
				case 'yd': break;
				case 'ml': break;
				default:
					switch(targetUnit){
						case 'in': break;
						case 'ft': break;
						case 'yd': break;
						case 'ml': break;
					}
					break;
			}
			break;
	}
}
