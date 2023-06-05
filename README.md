# CMG 365-Widgets

## Description

The CMG 365 Widgets library is a quality control tool used to analyze log files from 365-Widgets' home sensors including thermometers, humidistats, and carbon monoxide detectors. It evaluates sensor performance against defined criteria and categorizes them as "ultra precise", "very precise", "precise", or discards them based on their readings compared to a known reference.

## How to use

```javascript
import { evaluateLogFile } from 'cmg-365-widgets'

const x = evaluateLogFile(`reference 70.0 45.0 6
thermometer temp-1
2007-04-05T22:00 72.4
2007-04-05T22:01 76.0
2007-04-05T22:02 79.1
2007-04-05T22:03 75.6
2007-04-05T22:04 71.2
2007-04-05T22:05 71.4
2007-04-05T22:06 69.2
2007-04-05T22:07 65.2
2007-04-05T22:08 62.8
2007-04-05T22:09 61.4
2007-04-05T22:10 64.0
2007-04-05T22:11 67.5
2007-04-05T22:12 69.4
thermometer temp-2
2007-04-05T22:01 69.5
2007-04-05T22:02 70.1
2007-04-05T22:03 71.3
2007-04-05T22:04 71.5
2007-04-05T22:05 69.8
humidity hum-1
2007-04-05T22:04 45.2
2007-04-05T22:05 45.3
2007-04-05T22:06 45.1
humidity hum-2
2007-04-05T22:04 44.4
2007-04-05T22:05 43.9
2007-04-05T22:06 44.9
2007-04-05T22:07 43.8
2007-04-05T22:08 42.1
monoxide mon-1
2007-04-05T22:04 5
2007-04-05T22:05 7
2007-04-05T22:06 9
monoxide mon-2
2007-04-05T22:04 2
2007-04-05T22:05 4
2007-04-05T22:06 10
2007-04-05T22:07 8
2007-04-05T22:08 6`)

console.log(x)
```

## Stack

- library is based on https://github.com/xg4/rollup-typescript-boilerplate
- already included in the template
  - typescript
  - pnpm
  - rollup
  - prettier
  - commitlint (currently not working)
  - husky (deleted, for now)
  - github actions (currently not working)
- added
  - jest (unit testing)

## LICENSE

MIT
