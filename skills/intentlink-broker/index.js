const path = require('path');

module.exports = {
  skillPath: path.resolve(__dirname, 'intentlink-broker/SKILL.md'),
  name: 'intentlink-broker',
  description: 'Finds services matching a user's intent and generates connection proposals.'
};
