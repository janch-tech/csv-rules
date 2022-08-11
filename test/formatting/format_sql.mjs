import * as formats from "../../src/formatting/formats.js";
import * as assert from "assert";

describe('Formatters', function () {

    describe("SQL Formatter", function () {
        it('Should return the correct insert statement for a row with one field', function () {
            const row = {"name": "Ram"};
            const actual = formats.SQL(row);
            const expected = "INSERT INTO {{destination}} (name) VALUES (\"Ram\");"

            assert.strictEqual(actual["output"], expected);

        })
        it('Should return the correct insert statement for a row with two fields', function () {
            const row = {"firstName": "Ram", "lastName": "Murphy"};
            const actual = formats.SQL(row);
            const expected = "INSERT INTO {{destination}} (firstName,lastName) VALUES (\"Ram\",\"Murphy\");"

            assert.strictEqual(actual["output"], expected);

        })
        it('Should return the correct insert statement for a row with one number', function () {
            const row = {"price": 100};
            const actual = formats.SQL(row);
            const expected = "INSERT INTO {{destination}} (price) VALUES (100);"

            assert.strictEqual(actual["output"], expected);

        })
        it('Should return the correct insert statement for a row with two numbers', function () {
            const row = {"price": 100, "cost": 200.1};
            const actual = formats.SQL(row);
            const expected = "INSERT INTO {{destination}} (price,cost) VALUES (100,200.1);"

            assert.strictEqual(actual["output"], expected);

        })
        it('Should return the correct insert statement for a row with one number and one string', function () {
            const row = {"item": "apple", "price": 10.4};
            const actual = formats.SQL(row);
            const expected = "INSERT INTO {{destination}} (item,price) VALUES (\"apple\",10.4);"

            assert.strictEqual(actual["output"], expected);

        })
    })

});