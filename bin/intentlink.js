#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const axios = require('axios'); // 실제 HTTP 요청을 위해 추가
const Broker = require('../broker/optimized-broker');
const LinkHarvester = require('../registry/awesome-harvester');

const program = new Command();

program
  .name('intentlink')
  .description(chalk.blue('🌐 The Autonomous Web Protocol CLI'))
  .version('1.0.2');

// 1. 서비스 매칭 (Broker)
program
  .command('match')
  .argument('<query>', 'Search query (e.g. "shipping weather")')
  .description('Find and rank services based on intent')
  .action((query) => {
    console.log(chalk.blue(`🔍 Matching services for intent: "${query}"`));
    
    const indexDir = path.join(__dirname, '../registry/index');
    
    // 로컬 인덱스가 없으면 퍼블릭 레지스트리도 확인
    const publicDir = path.join(__dirname, '../registry/public');
    let searchDir = indexDir;
    
    if (!fs.existsSync(indexDir)) {
        if (fs.existsSync(publicDir)) {
            searchDir = publicDir;
        } else {
            console.error(chalk.red('❌ Registry index not found. Run harvest first.'));
            return;
        }
    }
    
    const manifests = fs.readdirSync(searchDir)
        .filter(f => f.endsWith('.json') && f !== 'catalog.json')
        .map(f => JSON.parse(fs.readFileSync(path.join(searchDir, f), 'utf8')));
        
    const results = Broker.vectorSearch(query, manifests);
    const ranked = Broker.rankResults(results, query.split(' '));

    console.log(chalk.bold('\n🏆 Top Recommendations:'));
    if (ranked.length === 0) {
      console.log(chalk.yellow('No services found. Try "intentlink harvest" to add more.'));
    } else {
      ranked.forEach((r, i) => {
        console.log(`${i+1}. ${chalk.bold(r.id)} (Score: ${r.finalScore}) - ${r.purpose}`);
      });
    }
  });

// 2. 서비스 수집 (Harvest) - Real Web Fetch
program
  .command('harvest')
  .argument('<url>', 'URL of an awesome-list (Raw Markdown recommended)')
  .description('Crawl and add services to the Registry from a URL')
  .action(async (url) => {
    console.log(chalk.green(`🌱 Harvesting from: ${url}`));
    
    try {
        console.log(chalk.yellow('⏳ Fetching content...'));
        const response = await axios.get(url);
        const content = response.data;
        
        console.log(chalk.green(`✅ Fetched ${content.length} bytes. Analyzing...`));
        
        const candidates = LinkHarvester.parseMarkdown(content);
        
        if (candidates.length === 0) {
            console.log(chalk.yellow('⚠️  No services found. Ensure the URL points to a Markdown file with "- [Name](URL) - Description" format.'));
            return;
        }

        console.log(chalk.cyan(`✨ Found ${candidates.length} candidates. Registering...`));
        
        candidates.forEach(c => {
            const m = LinkHarvester.createShadowManifest(c);
            console.log(`  - Registered: ${chalk.bold(m.id)}`);
        });
        
        console.log(chalk.bold(`\n🎉 Harvest Complete! Added ${candidates.length} services to the registry.`));

    } catch (error) {
        console.error(chalk.red(`❌ Harvest failed: ${error.message}`));
    }
  });

// 3. 제안 실행 (Runner)
program
  .command('run')
  .argument('<proposal_file>', 'Path to connection proposal JSON')
  .description('Execute a connection proposal with safety checks')
  .action(async (file) => {
    console.log(chalk.magenta(`🚀 Running proposal: ${file}`));
    console.log(chalk.yellow('⚠️  Please use "node runner/link-runner.js" for interactive mode for now.'));
  });

program.parse();
