export type SensorReadings = number[]

export type SensorInfo = {
  name: string
  type: SensorType
  readings: SensorReadings
}

export type SensorByName = { [name: string]: SensorInfo }

const sensorTypes = ['thermometer', 'humidity', 'monoxide'] as const

export type SensorType = typeof sensorTypes[number]

export function getNewSensor(name: string, type: SensorType): SensorInfo {
  return {
    type: type,
    name: name,
    readings: [] as SensorReadings,
  }
}

export function parseSensors(input: string): {
  sensors: SensorByName
  refTemperature: number
  refHumidity: number
  refCO: number
} {
  const [refLine, ...lines] = input.trim().split('\n')
  const [refTemperature, refHumidity, refCO] = refLine
    .split(' ')
    .slice(1)
    .map(Number)

  let currentSensor = null

  const sensorsByName = {} as SensorByName

  for (const line of lines) {
    const lineItems = line.trim().split(' ')

    if (sensorTypes.includes(lineItems[0] as SensorType)) {
      currentSensor = getNewSensor(lineItems[1], lineItems[0] as SensorType)
      sensorsByName[currentSensor.name] = currentSensor
    } else {
      if (!currentSensor) {
        throw new Error('No sensor found for reading')
      }
      currentSensor.readings.push(parseFloat(lineItems[1]))
    }
  }

  return { sensors: sensorsByName, refTemperature, refHumidity, refCO }
}
