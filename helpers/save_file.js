const fs = require('fs')  

let pathFile = './db/db.json'

const saveDb = (data) => {
  fs.writeFileSync(pathFile, JSON.stringify(data))
}

const readFileDB = () => {
  if(!fs.existsSync(pathFile)) {
    return null;
  }

  const file = fs.readFileSync(pathFile, { encoding:'utf-8' })
  
  const fileJsonParce = JSON.parse(file);

  return fileJsonParce;
}

module.exports = {
   saveDb, 
   readFileDB,
}