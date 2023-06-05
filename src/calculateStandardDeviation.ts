export function calculateStandardDeviation(readings: number[], mean: number) {
  const variance =
    readings.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / readings.length
  return Math.sqrt(variance)
}
