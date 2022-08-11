import * as assert from "assert";
import {getParser} from "../../src/transformation/parser.js";

describe("Some DayJS Date Operation Rules", function () {
    it('Should convert date from mm/dd/yyyy to yyyy-mm-dd', function () {
        const testRow = {"date": '1987-03-14'}
        const rule = {
            "convertedDate": {
                "dayjs": [
                    "{{date}}",
                    "YYYY-MM-DD",
                    "MM/DD/YYYY"
                ]
            }
        }
        const expectedRow = {"date": '1987-03-14', "convertedDate": '03/14/1987'}

        const parserFunction = getParser(rule);
        const actualRow = parserFunction(testRow);

        assert.deepStrictEqual(actualRow, expectedRow);
    })
})