const _ = require("lodash");

// recursividade para pegar os valores diferentes
exports.getDiff = (curr, prev) => {
  function changes(object, base) {
    return _.transform(object, (result, value, key) => {
      if (base == undefined) result[key] = value;
      else if (!_.isEqual(value, base[key]))
        result[key] =
          _.isObject(value) && _.isObject(base[key])
            ? changes(value, base[key])
            : value;
    });
  }
  return changes(curr, prev);
};
