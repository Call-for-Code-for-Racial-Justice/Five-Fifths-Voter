const base58characters =
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz".split("");

/**
 * Generate a readable unique id
 * @param length
 * @returns {string}
 */
module.exports = (length) => {
  let s = "";
  for (let i = 0; i < length; i++) {
    const c = Math.floor(Math.random() * 58);
    s += base58characters[c];
  }
  return s;
};
