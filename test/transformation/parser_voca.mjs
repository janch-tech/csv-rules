import * as assert from "assert";
import {getParser} from "../../src/transformation/parser.js";

describe("Some Voca String Operation Rules", function () {
    it('should capitalize fields setting others to lowercase', function () {
        const testRow = {"name": 'rAM'}
        const rule = {
            "firstname": {
                "voca": [
                    "capitalize",
                    "{{name}}",
                    true
                ]
            }
        }
        const expectedRow = {"firstname": "Ram", "name": "rAM"}

        const parserFunction = getParser(rule);
        const actualRow = parserFunction(testRow);

        assert.deepStrictEqual(actualRow, expectedRow);
    })


    it('should replace specified values of string', function () {
        const testRow = {"name": 'Ramesh'}
        const rule = {
            "firstname": {
                "voca": [
                    "replaceAll",
                    "{{name}}",
                    "esh",
                    "bo"
                ]
            }
        }
        const expectedRow = {"firstname": "Rambo", "name": "Ramesh"}

        const parserFunction = getParser(rule);
        const actualRow = parserFunction(testRow);

        assert.deepStrictEqual(actualRow, expectedRow);
    })

})