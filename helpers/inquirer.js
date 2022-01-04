const colors = require('colors')
const inquirer = require('inquirer');

const InterfaceChoices = [
   {
      'type': 'list',
      'message': 'Seleciona una opcion muevete con las flechas', 
      'name': 'optionChoices',
      choices: [
         { value:'1', name:'1. Crear Tarea'},
         
         { value:'2',name:'2. Todas las tareas' },
         
         { value:'3',name:'3. lista de Tareas Completadas' },
         
         { value:'4',name:'4. Lista de Tareas pendientes' },    
         
         { value:'5',name:'5. Completar Tarea (s)' },
         
         { value:'6',name:'6. Borrar Tarea' },
         
         { value:'0',name:'0. Finalizar' },
      ]
   }
]

const showMenu = async () => {
  console.clear();  
  console.log('========================'.green)
  console.log('Select and option')
  console.log('========================'.green)

  const { optionChoices } = await inquirer.prompt(InterfaceChoices)

  return optionChoices;
}

const readInput = async (message) => {
  const read = [
     {
      'type': 'input',
      'name': 'input',
      message,
      
      validate (value) {
        if(value.length === 0) {
          return 'Increse un valor';
        }

        return true;
      }
     }
  ]

  const { input } = await inquirer.prompt(read);
  
  // igual al valor que le paso en la desc
  return input
}

const deleteTaskListArr = async (tasks) => {
  const valuesTask = tasks.map(task => {
    return {
      value:task.id,
      name: `${task.desc}`
    }
  })

  valuesTask.unshift({
    value:'0',  
    name:'0.'.green + 'cancel',
  })

  const deleteOpcion = [
    {
      type:'list',
      name:'deleteTask',
      message:'delete',
      choices:valuesTask 
    }
  ]

  const { deleteTask } = await inquirer.prompt(deleteOpcion)

  return deleteTask;
}

const confirmDelete = async (message) => {
  const choices = [
     {
        'type':'confirm',
        'name':'ok',
        message
     }
  ]

  const { ok } = await inquirer.prompt(choices)
  return ok;
}

const listChecked = async (tasks) => {
  const tasckValues = tasks.map(task => {
     return {
        value: task.id,
        name: task.desc,
        checked: (task.completed) ? true : false
     }
  })

  const optionChecked = [
    {
      type:'checkbox',
      name:'ids',
      message:'and select',
      choices:tasckValues
    }
  ]

  const { ids } = await inquirer.prompt(optionChecked)
  
  return ids;
}

const pause = async () => {
   const enter = [
      {
         'type':'input',
         'message':'enter para continuar',
         'name':'enterMenu'
      }
   ]

   const { enterMenu } = await inquirer.prompt(enter)
}

module.exports = {
   pause,
   showMenu,
   readInput,  
   deleteTaskListArr,
   listChecked,
   confirmDelete
}
