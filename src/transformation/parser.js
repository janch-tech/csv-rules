/**
 * The functions in this js file facilitate the
 * creation of a parser which can be used to
 * parse rules that transform a CSV row (
 * which is in dict form)
 *
 *
 */

const rules = require('./rules');

/**
 * Returns a rule function from the rules file based on
 * a rule code
 *
 * @param code
 * @returns {*}
 */
const getRule = (code) => {
    const ruleValueKey = code.toUpperCase();

    if (ruleValueKey in rules) {
        return rules[ruleValueKey];
    } else {
        throw `Unsupported Rule ${ruleValueKey}`
    }
}

/**
 * It returns a function that has less of arguments than the ruleFunction
 *
 * It does it by binding ruleFunctionArgs to the ruleFunction so that one
 * only needs to pass row to the function
 *
 * @param ruleFunction
 * @param ruleFunctionArgs
 * @returns {function(*): *}
 */
const partialRuleFunction = (ruleFunction, ruleFunctionArgs) => {

    const applyRuleFunction = (row) => {

        let args = ruleFunctionArgs;

        if (typeof args === 'function')
            args = args(row);

        return ruleFunction(args, row);
    }

    return applyRuleFunction;
}

/**
 * This function takes an array of functions which need to be executed
 * This function returns a function that when executed runs all the
 * functions of the array
 * The function returned needs a row to be passed
 *
 *
 * @param array
 * @returns {function(*): *}
 */
const partialRuleFunctionArray = (array) => {
    const processArray = (row) => {
        return array.map((applyRuleFunction) => {
            if (typeof applyRuleFunction === 'function')
                return applyRuleFunction(row);
            else
                return applyRuleFunction;
        })
    }

    return processArray;
}

/**
 * This returns a function or a literal.
 *
 * - If this returns a function it can be executed by passing a row
 * - literals are numbers and booleans and nulls
 *
 * This function chains the function execution such that the
 * innermost rule from the rule tree executes first
 *
 * Rules are parsed such that
 * - all values are wrapped with Moustache function
 * - all objects are assumed to represent a function and contain a key. The function corresponding to the key is returned
 * - When an array is detected in the value, a function "which converts all the elements of the array to function and
 *      executes the function" is returned
 *
 * Note that all functions are partial functions from the list of functions in rules.js where the args are attached but
 * row information is missing. Row information is assumed to be specified later
 *
 *
 *
 * @param ruleValue
 * @returns {*}
 */
const createParseTreeLevel2 = (ruleValue) => {
    let ret = null;

    if (ruleValue === null) {
        ret = null
    } else if (typeof ruleValue === 'string' || ruleValue instanceof String) {
        ret = partialRuleFunction(rules.MOUSTACHE, ruleValue);
    } else if (typeof ruleValue === 'object' &&
        !Array.isArray(ruleValue)) {
        const objKey = Object.keys(ruleValue)[0];
        const objValue = Object.values(ruleValue)[0];

        const ruleFunction = getRule(objKey);
        const ruleFunctionArgs = createParseTreeLevel2(objValue);
        ret = partialRuleFunction(ruleFunction, ruleFunctionArgs);
    } else if (Array.isArray(ruleValue)) {
        ret = ruleValue.map((value) => createParseTreeLevel2(value));
        ret = partialRuleFunctionArray(ret);
    } else {
        ret = ruleValue;
    }
    return ret;
}

/**
 * Returns a javascript object with
 * - keys representing the rule keys
 * - values containing functions that can execute the stated rules
 *
 * @param rules
 * @returns {{}}
 */
const createParseTreeLevel1 = (rules) => {
    const ret = {}

    for (const ruleKey in rules) {
        const ruleValue = rules[ruleKey];
        ret[ruleKey] = createParseTreeLevel2(ruleValue);
    }


    return ret;
}

/**
 * Returns a function which when executed with a row parameter,
 * applies the rule to the row
 *
 * @example
 * const parser = getParser(rules);
 * const transformedRow = parser(row);
 *
 * @param rules
 * @returns {function(*): *}
 */
const getParser = (rules) => {
    const parseTree = createParseTreeLevel1(rules);

    const parserFunction = (row) => {
        let retRow = row;
        for (const ruleKey in parseTree) {
            const ruleParserFunction = parseTree[ruleKey];
            retRow[ruleKey] = ruleParserFunction(row);
        }

        return retRow;
    }


    return parserFunction
}

module.exports = {
    getParser: getParser
}





