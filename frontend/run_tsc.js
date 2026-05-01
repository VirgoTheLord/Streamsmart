const { execSync } = require('child_process');
try {
  const output = execSync('npx tsc --noEmit', { cwd: 'm:\\Streamsmart\\frontend', encoding: 'utf8' });
  console.log('SUCCESS:');
  console.log(output);
} catch (e) {
  console.log('ERROR:');
  console.log(e.stdout);
  console.log(e.stderr);
}
