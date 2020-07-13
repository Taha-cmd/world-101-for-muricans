// Temperature

FahrenheitToCelsius = (Fahrenheit) => {return (5 / 9) * (Fahrenheit - 32)}
CelsiusToFahrenheit = (Celsius) => {return (9 / 5) * Celsius + 32}

// Weight

// --------------------------------------------//
// --------------------------------------------//
// --------------------------------------------//
const SIWeight = ["mg", "g", "kg", "t"];

function americanWeightToSI(currentUnit, targetUnit, amount) {
	while (currentUnit != targetUnit) {
		// convert any given SI unit to any given si unit
		amount /= 1000;
		currentUnit = SIWeight[SIWeight.indexOf(currentUnit) + 1];
	}
	return amount;
}

function SIWeightToMG(amount, currentUnit) {
	while (currentUnit != "mg") {
		amount *= 1000;
		currentUnit = SIWeight[SIWeight.indexOf(currentUnit) - 1];
	}
	return amount;
}
// ------------------------------------------------------//
GrainToSIWeight = (Grain, targetUnit) => {return americanWeightToSI("mg", targetUnit, Grain * 64.7989)}
OunceToSIWeight = (Ounce, targetUnit) => {return americanWeightToSI("mg", targetUnit, Ounce * 28349.5)}
PoundToSIWeight = (Pound, targetUnit) => {return americanWeightToSI("mg", targetUnit, Pound * 453592)}

SIWeightToGrain = (amount, currentUnit) => {return SIWeightToMG(amount, currentUnit) * 0.0154324}
SIWeightToOunce = (amount, currentUnit) => {return SIWeightToMG(amount, currentUnit) * 3.5274e-5}
SIWeightToPound = (amount, currentUnit) => {return SIWeightToMG(amount, currentUnit) * 2.2046e-6}
// -----------------------------------------------------//
