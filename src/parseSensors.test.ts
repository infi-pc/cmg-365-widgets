import { parseSensors } from './parseSensors'

describe('parseSensors', () => {
  it('should parse sensors correctly', () => {
    const input = `
      reference 70.0 45.0 6
      thermometer temp-1
      2007-04-05T22:00 72.4
      2007-04-05T22:01 76.0
      2007-04-05T22:02 79.1
      humidity hum-1
      2007-04-05T22:04 45.2
      2007-04-05T22:05 45.3
      monoxide mon-1
      2007-04-05T22:04 5
      2007-04-05T22:05 7
      2007-04-05T22:06 9
    `

    const result = parseSensors(input)

    expect(result).toMatchInlineSnapshot(`
      {
        "refCO": 6,
        "refHumidity": 45,
        "refTemperature": 70,
        "sensors": {
          "hum-1": {
            "name": "hum-1",
            "readings": [
              45.2,
              45.3,
            ],
            "type": "humidity",
          },
          "mon-1": {
            "name": "mon-1",
            "readings": [
              5,
              7,
              9,
            ],
            "type": "monoxide",
          },
          "temp-1": {
            "name": "temp-1",
            "readings": [
              72.4,
              76,
              79.1,
            ],
            "type": "thermometer",
          },
        },
      }
    `)
  })

  it("should throw an error when a reading doesn't have an associated sensor", () => {
    const input = `
      reference 70.0 45.0 6
      2007-04-05T22:00 72.4
      2007-04-05T22:01 76.0
    `

    expect(() => parseSensors(input)).toThrowError(
      'No sensor found for reading'
    )
  })
})
