const buttons = Array.from(document.querySelectorAll(".category"));
const unitSelectors = Array.from(document.querySelectorAll(".unit-selector"));
const currentCategory = document.getElementById("current-category");
const currentSymbol = document.getElementById("current-symbol");
const inputFields = document.querySelectorAll("input[type=text]");
const error = document.querySelector("#error");
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
}

function updateUnitsList(e) {
	const currentUnitsGroup1 = Array.from(
		document.querySelector("#units-group1").children
	);

	const currentUnitsGroup2 = Array.from(
		document.querySelector("#units-group2").children
	);

	currentUnitsGroup1.forEach((unit) => unit.remove());
	currentUnitsGroup2.forEach((unit) => unit.remove());
}

function updateUnits(e) {
	if (e.target.parentElement.attributes.id.value == "units-group1")
		document.querySelector("#unit1").innerText =
			e.target.attributes.value.value;
	else
		document.querySelector("#unit2").innerText =
			e.target.attributes.value.value;
}

function convert(e) {
	error.classList.add("d-none"); // always hide error message
	if (e.target.value == "-") return; // if value just -, return (give a user a chance to enter more input)
	// - will stay, no conversion is made
	if (e.target.value == "") {
		inputFields.forEach((field) => (field.value = ""));
		return; // when input is deleted, set all values to ''
	}
	if (!digits.test(e.target.value)) {
		error.classList.remove("d-none");
		return;
	}

	const value = parseFloat(e.target.value);
	const target = getTargetInputField(e);

	switch (currentCategory.innerText) {
		case "Temperature":
			target.value =
				target.attributes.id.value == "input1"
					? CelsiusToFahrenheit(value)
					: FahrenheitToCelsius(value);
			break;
	}
}
