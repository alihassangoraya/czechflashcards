const { earlyCorrections } = require("./requiredCorrections/earlyCorrections");
const { extendedCorrections } = require("./requiredCorrections/extendedCorrections");
const { specializedCorrections } = require("./requiredCorrections/specializedCorrections");

const requiredCorrections = {
  ...earlyCorrections,
  ...extendedCorrections,
  ...specializedCorrections
};

module.exports = { requiredCorrections };
