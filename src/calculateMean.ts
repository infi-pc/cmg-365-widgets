import { SensorReadings } from './parseSensors'

export function calculateMean(array: SensorReadings): number {
  if (array.length === 0) {
    throw new Error('Cannot calculate mean of empty array')
  }
  return array.reduce((a, b) => a + b) / array.length
}
