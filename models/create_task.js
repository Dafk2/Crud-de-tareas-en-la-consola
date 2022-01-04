const { v4:uuidv4 } = require('uuid')

class Tast {
    constructor (desc) {
       this.desc = desc;
       this.complete = null;
       this.id = uuidv4();
    }
}

module.exports = Tast;
