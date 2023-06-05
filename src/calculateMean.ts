import { SensorReadings } from './parseSensors'

export function calculateMean(array: SensorReadings): number {
  if (array.length === 0) {
    return NaN
  }
  return array.reduce((a, b) => a + b) / array.length
}
