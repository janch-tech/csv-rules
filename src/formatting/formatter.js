const formats = require("./formats");

/**
 * Returns the right formatter for a given formatter name
 * @param formatName
 * @returns {(function(*): {output: string})|*|(function(*): *)}
 */
const getFormatter = (formatName) => {
    switch (formatName.toUpperCase()) {
        case 'SQL':
            return formats.SQL;
        case 'CSV':
            return formats.CSV;
        default:
            return formats.CSV;
    }
}

module.exports = {
    getFormatter
}