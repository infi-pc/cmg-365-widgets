import { categorizeSensor } from './categorizeSensor'
import { SensorType } from './parseSensors'

describe('categorizeSensor', () => {
  test('temperature sensor - very precise', () => {
    expect(temp([74, 74, 67.0, 67.0])).toEqual('very precise')
  })

  test('temperature sensor - ultra precise', () => {
    expect(temp([70, 70.1, 69])).toEqual('ultra precise')
  })

  test('temperature sensor - precise', () => {
    expect(temp([73, 70.9, 68])).toEqual('precise')
  })

  test('humidity sensor - just on the boundary', () => {
    expect(humidity([45.0, 46.0])).toEqual('keep')
  })

  test('humidity sensor - just outside the boundary', () => {
    expect(humidity([43.9, 46.1])).toEqual('discard')
  })

  test('monoxide sensor - just on the boundary', () => {
    expect(monoxide([3, 9])).toEqual('keep')
  })

  test('monoxide sensor - just outside the boundary', () => {
    expect(monoxide([2, 10])).toEqual('discard')
  })

  test('throw when not existing', () => {
    expect(() => {
      categorizeSensor(
        {
          name: 'xx',
          type: 'xx' as SensorType,
          readings: [2, 10],
        },
        70.0,
        45.0,
        6
      )
    }).toThrow()
  })
})

function temp(readings: number[]): string {
  return categorizeSensor(
    {
      name: 'temp-1',
      type: 'thermometer',
      readings,
    },
    70.0,
    0,
    0
  )
}

function humidity(readings: number[]): string {
  return categorizeSensor(
    {
      name: 'hum-1',
      type: 'humidity',
      readings,
    },
    70.0,
    45.0,
    6
  )
}

function monoxide(readings: number[]): string {
  return categorizeSensor(
    {
      name: 'mon-1',
      type: 'monoxide',
      readings,
    },
    70.0,
    45.0,
    6
  )
}
