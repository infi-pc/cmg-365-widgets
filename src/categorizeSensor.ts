import { calculateMean } from './calculateMean'
import { calculateStandardDeviation } from './calculateStandardDeviation'
import { SensorInfo } from './parseSensors'

export function categorizeSensor(
  sensor: SensorInfo,
  refTemperature: number,
  refHumidity: number,
  refCO: number
): string {
  const mean = calculateMean(sensor.readings)
  if (isNaN(mean)) {
    return 'discard'
  }
  const standardDeviation = calculateStandardDeviation(sensor.readings, mean)

  switch (sensor.type) {
    case 'thermometer':
      if (Math.abs(mean - refTemperature) <= 0.5 && standardDeviation < 3) {
        return 'ultra precise'
      } else if (
        Math.abs(mean - refTemperature) <= 0.5 &&
        standardDeviation < 5
      ) {
        return 'very precise'
      } else {
        return 'precise'
      }

    case 'humidity':
      if (
        sensor.readings.every((value) => Math.abs(value - refHumidity) <= 1)
      ) {
        return 'keep'
      } else {
        return 'discard'
      }

    case 'monoxide':
      if (sensor.readings.every((value) => Math.abs(value - refCO) <= 3)) {
        return 'keep'
      } else {
        return 'discard'
      }

    default:
      throw new Error(`Unsupported sensor type ${sensor.type}`)
  }
}
