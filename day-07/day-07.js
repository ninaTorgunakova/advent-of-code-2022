import fs from 'fs';

const ELEMENT_TYPE = Object.freeze({
    FILE: 'FILE',
    FOLDER: 'FOLDER',
});

const rootFolder = new Element('ROOT', ELEMENT_TYPE.FOLDER);
  
function Element(name, type, size = 0) {
    this.name = name;
    this.type = type;
    this.size = size;

    this.parent = null;
    this.childs = [];
  
    this.addChild = child => {
      this.childs.push(child);
      child.parent = this;
    };
  
    this.getChildByName = name => this.childs.find(child => child.name === name);
  
    this.getSize = () => {
        const getElementSize = element => {
            if (element.type === ELEMENT_TYPE.FILE) {
                return element.size;
            }
            const size = element.childs.reduce((acc, curChild) => acc + getElementSize(curChild), 0);
            element.size = size;
            return size;
        };
        return getElementSize(this);
    };
  
    this.getFoldersByCondition = condition => {
        const folders = [];
        const getElementFolders = element => {
            if (element.type === ELEMENT_TYPE.FILE) {
                return;
            }
            if (element.type === ELEMENT_TYPE.FOLDER && condition(element)) {
                folders.push(element);
            }
            element.childs.forEach(child => getElementFolders(child));
        };
        getElementFolders(this);
        return folders;
    };
}

const isCommand = row => row.startsWith('$');
const isDir = row => row.startsWith('dir');

const addFile = (file, currentFolder) => {
    const [ size, name ] = file.split(' ');
    let child = currentFolder.getChildByName(name);
    if (!child) {
        child = new Element(name, ELEMENT_TYPE.FILE, Number(size));
        currentFolder.addChild(child);
    }
}

const addFolder = (folder, currentFolder) => {
    const name = folder.split(' ')[1];
    let child = currentFolder.getChildByName(name);
    if (!child) {
        child = new Element(name, ELEMENT_TYPE.FOLDER);
        currentFolder.addChild(child);
    }
}

const addCommand = (command, currentFolder) => {
    if (command.split(' ')[1] === 'cd') {
        const name = command.split(' ')[2];
        if (name === '..') {
            return currentFolder.parent;
        } else {
            let child = currentFolder.getChildByName(name);
            if (!child) {
                child = new Element(name, ELEMENT_TYPE.FOLDER);
                currentFolder.addChild(child);
            }
            return child;
        }
    }
    return currentFolder;
}

const getTotalSum = rows => {
    let currentFolder = rootFolder;
    for (const row of rows) {
        if (isCommand(row)) {
            currentFolder = addCommand(row, currentFolder);
        } else if (isDir(row)) {
            addFolder(row, currentFolder);
        } else {
            addFile(row, currentFolder);
        }
    }
    const resultFolders = rootFolder.getFoldersByCondition(folder => folder.getSize() <= 100000);
    return resultFolders.reduce((acc, curFolder) => acc + curFolder.getSize(), 0);
}

function getSizeOfSmallest() {
  const TOTAL_SPACE = 70000000;
  const REQUIRED_SPACE = 30000000;
  const usedSpace = rootFolder.size;
  const deletedSpace = REQUIRED_SPACE - (TOTAL_SPACE - usedSpace);
  const folders = rootFolder.getFoldersByCondition(folder => folder.size >= deletedSpace);
  return folders.sort((a, b) => a.size - b.size)[0].size;
}

let rows = fs
	.readFileSync('day-07.txt', { encoding: 'utf-8' })
	.split('\n')
    .filter(x => !!x);

console.log(getTotalSum(rows));
console.log(getSizeOfSmallest(rows));
