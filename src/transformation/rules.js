/***
 * This file defines rule functions for parsing transformation rules
 * specified in a JSON rule config
 *
 * For example:
 *
 * rule_moustache
 * - Handles rules such as {"Name": "{{firstname}} {{lastname}}"}
 *
 * rule_voca
 * - Handles rules such as {"voca": [
 *     "uppercase",
 *     "{{state}}"
 * ]}
 *
 */

const {deMoustache} = require("../utils/handlebarsUtils");
const {applyVocaMethod} = require("../utils/externalMethodUtils");

/**
 * Takes a rule expecting {{moustache}}
 * templated string and transforms the
 * given row based on the moustache rules
 * @param args
 * @param row
 * @returns {*}
 */
const rule_moustache = (args, row) => {
    return deMoustache([args], row).pop();
}

/**
 * Takes rules with `voca`
 * as key
 * @example
 * {"voca": [...]}
 *
 * Then applies the functions from the 'voca'
 * string library to the given row
 *
 * @param args
 * @param row
 * @returns {*}
 */
const rule_voca = (args, row) => {
    let vocaParams = args;
    let vocaMethod = vocaParams[0];
    let vocaArgs = vocaParams.slice(1, vocaParams.length);

    return applyVocaMethod(vocaMethod, vocaArgs);
}

/**
 * Uses dayjs library to format date
 *
 * - First Arg = Date to be formatted
 * - Second Arg = Date format before transformation
 * - Third Arg = Date format after transformation
 *
 * @param args
 * @param row
 * @returns {*}
 */
const rule_dayjs = (args, row) => {
    const dayjs = require('dayjs');

    let date = args[0],
        sourceFormat = args[1],
        targetFormat = args[2]

    return dayjs(date, sourceFormat).format(targetFormat);


}

module.exports = {
    "MOUSTACHE": rule_moustache,
    "VOCA": rule_voca,
    "DAYJS": rule_dayjs
}