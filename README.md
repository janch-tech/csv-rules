# Introduction

This tool can be used to organize transformations and mappings to a CSV within a JSON File

Samples are located in the `resource` folder

# Install

``
yarn install
``

# Test

``
yarn test
``

# Usage

```
# Get Help
yarn csv-rules -h

# Get Help about run command

yarn csv-rules run -h

# Example Usage where output is shown to terminal
yarn csv-rules run ./resource/sample_source.csv -c ./resource/sample_rules.json

# Example Usage where output is written to file
yarn csv-rules run ./resource/sample_source.csv -c ./resource/sample_rules.json -o output.csv
```

# About Rules

To see examples about rules the following will be helpful

1. Sample Rule file in [resourceFolder/sample_rules](./resource/sample_rules.json)
2. Unit test files [test/transformation](./test/transformation)