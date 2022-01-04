const infoCollector = require('./infoCollector');
const tplReplacer = require('./tplReplacer');

async function run() {
  const justGen = process.argv[2] === 'just-gen';
  if (justGen) {
    tplReplacer();
  } else {
    const meta = await infoCollector();
    tplReplacer(meta);
  }
}

run();
