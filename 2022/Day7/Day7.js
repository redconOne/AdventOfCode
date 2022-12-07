const fs = require('fs');

const data = fs.readFileSync(__dirname + '/Day7.txt').toString();
const input = data
  .split('\n')
  .map((item) => item.trim())
  .join('\n');

const test = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

class Directory {
  constructor(path, parent) {
    this.size = 0;
    this.path = path;
    this.parent = parent;
    fileSystem.set(path, this);
  }

  addSize(size) {
    this.size += size;
    let currentDir = this.parent;
    while (currentDir) {
      currentDir.size += size;
      currentDir = currentDir.parent;
    }
  }
}

const fileSystem = new Map([]);
let currentDirectory = new Directory('/', null);

const buildFileSystem = (str) => {
  let loc = 0;
  str = str.split('\n');
  for (const line of str) {
    if (line.slice(0, 4) === '$ cd') {
      if (line.slice(-1) === '/') currentDirectory = fileSystem.get('/');
      else if (line.slice(-2) === '..')
        currentDirectory = currentDirectory.parent || currentDirectory;
      else {
        currentDirectory = new Directory(
          currentDirectory.path +
            `${currentDirectory.path.slice(-1) === '/' ? '' : '/'}` +
            line.substring(4),
          currentDirectory
        );
      }
    }

    if (line.slice(0, 4) === '$ ls') {
      let temp = [];
      let start = 1;

      while (start + loc < str.length && str[start + loc].slice(0, 1) !== '$') {
        temp.push(str[start + loc]);
        start++;
      }

      temp = temp
        .map((a) => a.split(' '))
        .filter((a) => a[0] !== 'dir')
        .map((c) => [+c[0], c[1]]);
      const totalSize = temp.reduce((acc, curr) => acc + curr[0], 0);
      currentDirectory.addSize(totalSize);
    }
    loc++;
  }
};

// buildFileSystem(test);
buildFileSystem(input);

const folderArray = [];
fileSystem.forEach((item) => folderArray.push(item));
const folderSizes = folderArray.map((item) => item.size);

// console.log(folderArray);
// console.log(folderSizes);
// console.log(folderSizes.filter(item => item <= 100000).reduce((sum, num) => sum + num, 0));

const neededSpace = 30000000 - (70000000 - fileSystem.get('/').size);
const candidates = folderSizes.filter((item) => item >= neededSpace);
console.log(Math.min(...candidates));
