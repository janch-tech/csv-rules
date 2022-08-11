import {getParser} from "../../src/transformation/parser.js";
import * as assert from "assert";

describe("Complete Rule Execution", function () {
    it('Should execute the allEncompassingRule with test data', function () {

        const testData = {
            "fname": "Shyam",
            "lname": "Hank",
            "birthdate": '1990-03-14'
        }

        const allEncompassingRule = {
            "FirstName": "{{fname}}",
            "LastName": "{{lname}}",
            "Country": "United States",
            "InitialFirstName": {
                "voca": [
                    "first",
                    "{{FirstName}}"
                ]
            },
            "InitialLastName": {
                "voca": [
                    "last",
                    {"voca": ["reverse", "{{LastName}}"]}
                ]
            },
            "Initials": "{{InitialFirstName}}{{InitialLastName}}",
            "DateOfBirth": {
                "dayjs": [
                    "{{birthdate}}",
                    "YYYY-MM-DD",
                    "MM/DD/YYYY"
                ]
            }


        }

        const expected = {
            "fname": 'Shyam',
            "lname": "Hank",
            "birthdate": '1990-03-14',
            "FirstName": 'Shyam',
            "LastName": "Hank",
            "Country": 'United States',
            "InitialFirstName": "S",
            "InitialLastName": "H",
            "Initials": "SH",
            "DateOfBirth": "03/14/1990"
        };

        const parser = getParser(allEncompassingRule);
        const actual = parser(testData);

        assert.deepStrictEqual(actual, expected);
    });
})