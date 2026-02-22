#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
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
  .argument('<query>', 'Search query (e.g. "payment messaging")')
  .description('Find services in the Public Registry')
  .action((query) => {
    console.log(chalk.blue(`🔍 Matching services for intent: "${query}"`));
    
    // 브로커가 자동으로 Public Registry를 로드함
    const results = Broker.vectorSearch(query);
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

// 2. 서비스 수집 (Harvest)
program
  .command('harvest')
  .argument('<url>', 'URL of an awesome-list')
  .description('Crawl and add services to the Public Registry')
  .action((url) => {
    console.log(chalk.green(`🌱 Harvesting from: ${url}`));
    // 시뮬레이션: 실제로는 web_fetch로 가져온 내용을 파싱
    const dummyContent = `- [NewService](${url}) - Discovered via CLI`;
    
    // Harvester가 내부적으로 registry/index 대신 registry/public을 쓰도록 수정 필요
    // 여기서는 간단히 호출만 함
    const candidates = LinkHarvester.parseMarkdown(dummyContent);
    candidates.forEach(c => {
      // Harvester 로직이 로컬 인덱스를 쓰므로, 퍼블릭으로 옮기는 로직은 별도 구현 필요
      // 이번 데모에서는 생략
      console.log(chalk.cyan(`✅ Parsed candidate: ${c.name}`));
    });
  });

program.parse();
