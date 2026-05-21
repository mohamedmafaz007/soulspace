import fs from 'fs';
import path from 'path';

const shellPath = path.join('dist', 'client', '_shell.html');
const indexPath = path.join('dist', 'client', 'index.html');

if (fs.existsSync(shellPath)) {
  fs.copyFileSync(shellPath, indexPath);
  console.log('Successfully copied _shell.html to index.html');
} else {
  console.error('_shell.html not found! Build might have failed.');
  process.exit(1);
}
