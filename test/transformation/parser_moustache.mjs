import * as assert from "assert";
import {getParser} from "../../src/transformation/parser.js";


describe("RuleExecution", function () {
    describe("Execute Moustache rule", function () {

        it('should append the mapped field to the test row with the correct value (with single mapping)', function () {
            const testRow = {"name": 'Ram'}
            const rule = {"firstname": "{{name}}"}
            const expectedRow = {"firstname": "Ram", "name": "Ram"}

            const parserFunction = getParser(rule);
            const actualRow = parserFunction(testRow);

            assert.deepStrictEqual(actualRow, expectedRow);
        })

        it('should append the mapped fields to the test row with correct values (with multiple mappings)', function () {
            const testRow = {"name": 'Ram'}
            const rule = {"firstname": "{{name}}", "lastname": "{{name}}"}
            const expectedRow = {"firstname": "Ram", "lastname": "Ram", "name": "Ram"}

            const parserFunction = getParser(rule);
            const actualRow = parserFunction(testRow);

            assert.deepStrictEqual(actualRow, expectedRow);
        })

        it('should not append any new fields when empty rule is passed', function () {
            const testRow = {"name": 'Ram'}
            const rule = {}
            const expectedRow = {"name": "Ram"}

            const parserFunction = getParser(rule);
            const actualRow = parserFunction(testRow);

            assert.deepStrictEqual(actualRow, expectedRow);
        })


        it('should raise an error when field is not found', function () {
            const testRow = {"name": 'Ram'}
            const rule = {"firstname": "{{fname}}"}

            const parserFunction = getParser(rule);
            assert.throws(() => parserFunction(testRow))
        })

        it('should add constant value when no curly braces are set', function () {
            const testRow = {"name": 'Ram'}
            const rule = {"country": "United States"}
            const expectedRow = {"name": "Ram", "country": "United States"}

            const parserFunction = getParser(rule);
            const actualRow = parserFunction(testRow);

            assert.deepStrictEqual(actualRow, expectedRow);
        })


    });
});
