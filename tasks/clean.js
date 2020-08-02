const rimraf = require('rimraf');
const { middlewareDir } = require('./env');

rimraf(`${middlewareDir}/{package.json,public,middleware}`, (error) => {
  if (error) {
    console.error(error.stack);
    process.exit(1);
  }
});
