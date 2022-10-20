const fs = require('fs')
const path = require('path')
const targetPath = path.resolve('..')

const pathToDir = path.join(targetPath, 'raiz-react-mys', 'src')

const { resolve } = require('path');
const { readdir } = require('fs').promises;

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return files.flat().filter((name) => `${name}`.endsWith('i18n.js'));
}

getFiles(pathToDir).then((x) => console.log(x))