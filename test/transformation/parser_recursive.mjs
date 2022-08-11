import {getParser} from "../../src/transformation/parser.js";
import * as assert from "assert";

describe("Parser Recursive", function () {
    describe('Voca Recursive', function () {
        it('Should successfully run nested voca function', function () {
            const testRow = {
                "fname": "Shyam",
                "lname": "Smith"
            }
            const rule = {
                "FirstName": "{{fname}}",
                "InitialLastName": {
                    "voca": [
                        "last",
                        {
                            "voca": [
                                "reverse",
                                "{{lname}}"
                            ]
                        }
                    ]
                }
            }
            const expectedRow = {"FirstName": "Shyam", "InitialLastName": "S", "fname": "Shyam", "lname": "Smith"}

            const parserFunction = getParser(rule);
            const actualRow = parserFunction(testRow);

            assert.deepStrictEqual(actualRow, expectedRow);
        });

        it('Should successfully concatenate two string returned by voca', function () {
            const testRow = {
                "fname": "Shyam",
                "lname": "Bom"
            }

            const rule = {
                "Initials": {
                    "voca": [
                        "concat",
                        {"voca": ["first", "{{fname}}"]},
                        {"voca": ["first", "{{lname}}"]},
                    ]
                }
            }

            const parserFunction = getParser(rule);
            const actualRow = parserFunction(testRow);
            const expectedRow = {"fname": "Shyam", "lname": "Bom", "Initials": "SB"}

            assert.deepStrictEqual(actualRow, expectedRow);
        });
    });
});