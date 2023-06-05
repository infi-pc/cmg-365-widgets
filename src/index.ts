import { SensorReadings, parseSensors } from './parseSensors'

interface SensorResults {
  [sensorName: string]: string
}

function calculateMean(array: SensorReadings): number {
  if (array.length === 0) {
    throw new Error('Cannot calculate mean of empty array')
  }
  return array.reduce((a, b) => a + b) / array.length
}

function calculateStandardDeviation(readings: number[], mean: number) {
  const variance =
    readings.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / readings.length
  return Math.sqrt(variance)
}

export default function evaluateLogFile(logContentsStr: string): SensorResults {
  const {
    sensors: sensorsByName,
    refTemperature,
    refHumidity,
    refCO,
  } = parseSensors(logContentsStr)

  const results: SensorResults = {}

  for (let [sensorName, sensor] of Object.entries(sensorsByName)) {
    let mean = calculateMean(sensor.readings)
    let standardDeviation = calculateStandardDeviation(sensor.readings, mean)

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
