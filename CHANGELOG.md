# Change Log

## [0.0.4] 2020-04-29

Added:

- Custom attributes

## [0.0.5] 2020-04-29

Added:

- Custom attributes to be set upon task completion (e.g. `end page` for the task `read textbook`)

## [0.0.6] 2020-04-29

Added:

- Efficiency rating

## [0.0.7] 2020-04-29

Added:

- Tagging system

Changed:

- Use [**data-store**](https://www.npmjs.com/package/data-store) instead of [**configstore**](https://github.com/yeoman/configstore)
- Split the data file into `carpe-diem-log.json` and `carpe-diem-meta.json`.

Fixed:

- `getTaskAttrsAsString` should be split into `getTaskAttrsAfterBeforeAsString` and `getTaskAttrsAfterAsString`