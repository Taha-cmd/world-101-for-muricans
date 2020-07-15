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


// Length
// --------------------------------------------//
// --------------------------------------------//
// --------------------------------------------//

const SILength = ["mm", "cm", "m", "km"];

function SILengthToMM(amount, currentUnit){
	if(currentUnit == 'mm') return amount; 
	amount *= currentUnit == "km" ? 10 : 1;
	while(currentUnit != 'mm'){
		amount *= 100;
		currentUnit = SILength[SILength.indexOf(currentUnit) - 1];
	}

	return currentUnit == "mm" ? amount / 10 : amount;
}

function americanLengthToSI(currentUnit, targetUnit, amount){
	if(targetUnit == "mm") return amount;
	let factor = 10;

	while(currentUnit != targetUnit)
	{
		amount /= factor;
		factor *= 10;
		currentUnit = SILength[SILength.indexOf(currentUnit) + 1];
	}

	return amount;
}

SILengthToInch = (amount, currentUnit) => {return SILengthToMM(amount, currentUnit) * 0.0393701}
SILengthToFeet = (amount, currentUnit) => {return SILengthToMM(amount, currentUnit) * 0.00328084}
SILengthToYard = (amount, currentUnit) => {return SILengthToMM(amount, currentUnit) * 0.00109361}
SILengthToMile = (amount, currentUnit) => {return SILengthToMM(amount, currentUnit) * 6.2137e-7}

InchToSI = (amount, targetUnit) => {return americanLengthToSI("mm", targetUnit, amount * 25.4)}
FeetToSI = (amount, targetUnit) => {return americanLengthToSI("mm", targetUnit, amount * 304.8)}
YardToSI = (amount, targetUnit) => {return americanLengthToSI("mm", targetUnit, amount * 914.4)}
MileToSI = (amount, targetUnit) => {return americanLengthToSI("mm", targetUnit, amount * 1.609e+6)}