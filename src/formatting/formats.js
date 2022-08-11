/**
 * Formats all rows provided in object form
 * to SQL insert statements
 *
 * Since we do not know the table we are inserting into,
 * string {{destination}} is set as a placeholder to be
 * replaced later
 *
 * @param row
 * @returns {{output: string}}
 */
const formatSql = (row) => {
    const keys = Object.keys(row);
    const values = Object.values(row).map((value) => {
        if (typeof value === 'string' || value instanceof String) {
            return `"${value}"`
        } else {
            return value;
        }
    });

    const INSERT_PART_1 = "INSERT INTO {{destination}} ";
    const INSERT_PART_2 = "(" + keys.join(",") + ") ";
    const INSERT_PART_3 = "VALUES (" + values.join(",") + ");";

    return {"output": INSERT_PART_1 + INSERT_PART_2 + INSERT_PART_3};
}

/**
 * Fast-CSV converts the object to CSV Row so nothing needs to be done here
 *
 * @param row
 * @returns {*}
 */
const formatCsv = (row) => {
    return row;
}

module.exports = {
    SQL: formatSql,
    CSV: formatCsv
}