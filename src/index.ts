import { categorizeSensor } from './categorizeSensor'
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
    results[sensorName] = categorizeSensor(
      sensor,
      refTemperature,
      refHumidity,
      refCO
    )
  }

  return results
}
