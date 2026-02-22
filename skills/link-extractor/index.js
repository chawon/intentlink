const path = require('path');

/**
 * Returns the absolute path to the skill definition file (SKILL.md).
 * This allows other AI agents to programmatically load this skill.
 */
module.exports = {
  skillPath: path.resolve(__dirname, 'link-extractor/SKILL.md'),
  name: 'link-extractor',
  description: 'Analyzes web content to extract IntentLink protocol manifests.'
};
