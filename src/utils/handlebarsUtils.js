const Handlebars = require('Handlebars');

/**
 * Takes a list of strings that might contain moustached placeholders.
 * Uses mapping to replace the placeholders
 *
 * @param targets
 * @param mapping
 * @returns {*[]}
 */
const deMoustache = (targets, mapping) => {
    const ret = []
    targets.forEach(function (target) {
        if (typeof target === 'string' || target instanceof String) {
            let template = Handlebars.compile(target, {strict: true});
            ret.push(template(mapping))
        } else
            ret.push(target);
    })

    return ret;
}

module.exports = {
    deMoustache
}