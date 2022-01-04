let path = ''
const fs = require('fs')
require('colors')

const { confirmDelete, showMenu, pause, readInput, deleteTaskListArr, listChecked } = require('./helpers/inquirer')
// db
const { saveDb, readFileDB } = require('./helpers/save_file.js')

const Tasks = require('./models/tasks.js')

let arrTask = [] 


const main = async () => {
   let opt = '';

   const tasks = new Tasks();
   const tasksDb = readFileDB();

   if(tasksDb) {
      tasks.loadTaskFromArray(tasksDb);
   }

   do {
      let opt = await showMenu();

      switch (opt) {
        case '1' : 
           // create task
           const description = await readInput() 
           tasks.createTask(description); 
           
           break;
           
           // full list of tasks
           case '2' : 
           tasks.listCompleted();
        break;   
        
        case '3' : 
           // all Completed tasks 
           tasks.listPendingCompleted(true) 
        break;   
        
        case '4' :
           // all pending tasks 
           tasks.listPendingCompleted(false)
        break;   
           
        case '5' : 
           // toggle Complete
           const ids = await listChecked(tasks.listArr); 
           tasks.toggleCompleted(ids);
        break; 

        case '6' : 
           // delete task by id
           const id = await deleteTaskListArr(tasks.listArr)
           
           if(id !== '0') {
             let confirm = await confirmDelete('Are you sure you want to delete');

             if(confirm) {
               tasks.deleteTask(id);
               console.log('Task deleted successfully')
             }
           }
        break;   
      }
      
      // save to db.json
      saveDb(tasks.listArr);
     
      await pause();
   
   } while (op = '0');
   
}

main();

