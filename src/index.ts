import { calculateMean } from './calculateMean'
import { calculateStandardDeviation } from './calculateStandardDeviation'
import { parseSensors } from './parseSensors'

interface SensorResults {
  [sensorName: string]: string
}

export function evaluateLogFile(logContentsStr: string): SensorResults {
  const {
    sensors: sensorsByName,
    refTemperature,
    refHumidity,
    refCO,
  } = parseSensors(logContentsStr)

  const results: SensorResults = {}

  for (const [sensorName, sensor] of Object.entries(sensorsByName)) {
    const mean = calculateMean(sensor.readings)
    if (isNaN(mean)) {
      results[sensorName] = 'discard'
      continue
    }
    const standardDeviation = calculateStandardDeviation(sensor.readings, mean)

    switch (sensor.type) {
      case 'thermometer':
        if (Math.abs(mean - refTemperature) <= 0.5) {
          if (standardDeviation < 3) {
            results[sensorName] = 'ultra precise'
          } else if (standardDeviation < 5) {
            results[sensorName] = 'very precise'
          } else {
            results[sensorName] = 'precise'
          }
        } else {
          results[sensorName] = 'discard'
        }
        break

      case 'humidity':
        if (
          sensor.readings.every((value) => Math.abs(value - refHumidity) <= 1)
        ) {
          results[sensorName] = 'keep'
        } else {
          results[sensorName] = 'discard'
        }
        break

      case 'monoxide':
        if (sensor.readings.every((value) => Math.abs(value - refCO) <= 3)) {
          results[sensorName] = 'keep'
        } else {
          results[sensorName] = 'discard'
        }
        break

      default:
        throw new Error(`Unsupported sensor type ${sensor.type}`)
    }
  }

  return results
}
