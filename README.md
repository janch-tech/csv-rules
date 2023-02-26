# Introduction

This tool can be used to organize transformations and mappings to a CSV within a JSON File.
The transformation logic is referred to as rules in this document

Samples are located in the [resource](./resource) folder

# Quick Start

## Install from npmjs

Install csv-rules globally
```
npm install csv-rules -g
```

### Simple Rule

Create a sample csv

```bash
mkdir example

echo "fname,lname,AppointmentDate
Ram,Sharma,12-20-1999
Bom,Burma,11-20-1999
Tony,Karma,10-20-1999" > sample.csv

```

Check content
```bash
cat sample.csv
```

Create a rule json file
```bash
echo '{
  "rules": {
    "FullName": "{{fname}} {{lname}}",
    "Country": "United States"
  },
  "output": {
    "format": "CSV",
    "fields": [
      "fname",
      "lname",
      "AppointmentDate",
      "FullName",
      "Country"
    ]
  }
}' > rules.json
```

Run this to apply the rule above to the csv
```bash
csv-rules run sample.csv -c rules.json -o output.csv
cat output.csv
```




Observe that a new column FullName has been added

### Library Based Rules


Create a sample csv

```bash
mkdir example

echo "fname,lname,AppointmentDate
Ram,Sharma,12-20-1999
Bom,Burma,11-20-1999
Tony,Karma,10-20-1999" > sample.csv

```

Check content
```bash
cat sample.csv
```

Create a rule json file

```bash
echo '{
  "rules": {
    "InitialFirstName": {
      "voca": [
        "first",
        "{{fname}}"
      ]
    },
    "InitialLastName": {
      "voca": [
        "last",
        "{{lname}}"
      ]
    },
    "Initials": "{{InitialFirstName}}{{InitialLastName}}",
    "AppointmentDate": {
      "dayjs": [
        "{{AppointmentDate}}",
        "MM-DD-YYY",
        "MM/DD/YYYY"
      ]
    }
  },
  "output": {
    "format": "CSV",
    "fields": [
      "Initials",
      "AppointmentDate"
    ]
  }
}' > rules.json

```

Run this to apply the rule above to the csv
```bash
csv-rules run sample.csv -c rules.json -o output.csv
cat output.csv
```

Observe that the output contains the columns Initials and a reformatted AppointmentDate.
> `csv-rules` relies [voca](https://vocajs.com/) and [dayjs](https://day.js.org/) functions for the required transformations.
> Visit their documentation to see which other functions are supported



## Install From Github

``
npm install
``

# Test

``
npm run test
``

# Usage

```
# Get Help
npm run csv-rules -h

# Get Help about run command

npm run csv-rules run -h

# Example Usage where output is shown to terminal
npm run csv-rules run ./resource/sample_source.csv -c ./resource/sample_rules.json

# Example Usage where output is written to file
npm run csv-rules run ./resource/sample_source.csv -c ./resource/sample_rules.json -o output.csv
```




# Examples

To see examples about rules the following will be helpful

1. Sample Rule file in [resourceFolder/sample_rules](./resource/sample_rules.json)
2. Unit test files [test/transformation](./test/transformation)

