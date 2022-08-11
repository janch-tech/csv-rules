const applyVocaMethod = (method, args) => {
    const v = require('voca');

    v.concat = (a, b) => a + b;
    module.exports = v;

    let ret = null;

    try {
        ret = v[method](...args);
    } catch (e) {
        if (e instanceof TypeError) {
            throw (`Is probably not a function : ${method} call with ${args}`)
        }
    }

    return ret;
}


module.exports = {
    applyVocaMethod
}