const childProcess = require('child_process');

const copyDir = (src, dist) => {
  childProcess.spawn('cp', ['-r', src, dist]);
};

copyDir('./packages', './docs');
