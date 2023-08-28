export function calculateBodyFatMale(
  abdomen: number,
  neck: number,
  height: number
): number {
  const result =
    86.01 * Math.log10(abdomen - neck) - 70.041 * Math.log10(height) + 36.76;
  if (result != null) {
    return parseFloat(result.toFixed(1));
  }
  return 0;
}

export function calculateBodyFatFemale(
  waist: number,
  hip: number,
  neck: number,
  height: number
): number {
  const result =
    163.205 * Math.log10(waist + hip - neck) -
    97.684 * Math.log10(height) -
    78.387;
  if (result != null) {
    return parseFloat(result.toFixed(1));
  }
  return 0;
}

// Example usage
const maleBodyFat = calculateBodyFatMale(85, 40, 175); // Abdomen, neck, height in cm
const femaleBodyFat = calculateBodyFatFemale(70, 95, 38, 160); // Waist, hip, neck, height in cm

console.log(`Male Body Fat Percentage: ${maleBodyFat.toFixed(2)}%`);
console.log(`Female Body Fat Percentage: ${femaleBodyFat.toFixed(2)}%`);
