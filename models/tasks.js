const Task = require('./create_task.js')

class Tasks {
    constructor () {
      // listado de tasks  
      this._listsTaks = {}
    }

    createTask (desc) {
      const task = new Task (desc);
      this._listsTaks[task.id] = task; 
    }

    get listArr () {
       let list = [];

       Object.keys(this._listsTaks).forEach(key => {
           const task = this._listsTaks[key];

           list.push(task)
       });
       
       return list
    }

    loadTaskFromArray (tasks = []) {
       tasks.forEach(task => {
         this._listsTaks[task.id] = task;
       })
    }
    
    // lista completa de las tareas
    listCompleted () {
      this.listArr.forEach((task, i) => {
        let indexe = `${i + 1}`;

        const { completed, desc } = task;

        const returnString = (completed) ? 'completed'.green : 'pendiente'.red

        console.log(`${indexe} ${desc}: ${returnString}`)
      })
    }

    listPendingCompleted (taskCompleted) {
       let indexe = 0;
      
       this.listArr.forEach(task => {
          const { completed, desc } = task;

          let isCompleted = (completed) ? 'completed'.green : 'pending'.red;

          if(taskCompleted) {
            if(completed) {
              indexe += 1;
              console.log(`${(indexe + '.').red} ${desc} :: ${isCompleted} `)
            }
          }

          else {
            if(!completed) {
              indexe += 1;
              console.log(`${(indexe + '.').red} ${desc} :: ${isCompleted} `)
            }
          }
      }) 
    }

    deleteTask (id) {
      if(this._listsTaks[id]) {
        delete this._listsTaks[id]
      }
    }

    toggleCompleted (ids = []) {
       ids.forEach(id => {
         let task = this._listsTaks[id];

         if(!task.completed) {
           task.completed = new Date().toISOString 
         }
       })

       this.listArr.forEach(task => {
         if(!ids.includes(task.id)) {
           this._listsTaks[task.id].completed = null; 
         }
       })
    }
}

module.exports = Tasks;