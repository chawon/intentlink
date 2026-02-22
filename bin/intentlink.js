#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Broker = require('../broker/optimized-broker');
const Runner = require('../runner/link-runner');
const Harvester = require('../registry/awesome-harvester');

const program = new Command();

program
  .name('intentlink')
  .description(chalk.blue('🌐 The Autonomous Web Protocol CLI'))
  .version('1.0.0');

// 1. 서비스 매칭 (Broker)
program
  .command('match')
  .argument('<query>', 'Search query (e.g. "shipping weather")')
  .description('Find and rank services based on intent')
  .action((query) => {
    console.log(chalk.blue(`🔍 Matching services for intent: "${query}"`));
    
    const indexDir = path.join(__dirname, '../registry/index');
    if (!fs.existsSync(indexDir)) {
      console.error(chalk.red('❌ Registry index not found. Run harvest first.'));
      return;
    }
    
    const manifests = fs.readdirSync(indexDir).map(f => JSON.parse(fs.readFileSync(path.join(indexDir, f), 'utf8')));
    const results = Broker.vectorSearch(query, manifests);
    const ranked = Broker.rankResults(results, query.split(' '));

    console.log(chalk.bold('\n🏆 Top Recommendations:'));
    ranked.forEach((r, i) => {
      console.log(`${i+1}. ${chalk.bold(r.id)} (Score: ${r.finalScore}) - ${r.purpose}`);
    });
  });

program.parse();
