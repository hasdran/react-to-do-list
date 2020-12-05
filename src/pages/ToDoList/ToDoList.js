import { useState } from 'react';
import { Route, Switch as Routes } from 'react-router-dom';
import AddTask from '../AddTask/AddTask';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import './ToDoList.css';

const ToDoList = () => {

  let [tasks, setState] = useState([]);

  const OrangeSwitch = withStyles({
    switchBase: {
      color: deepOrange[300],
      '&$checked': {
        color: deepOrange[400],
      },
      '&$checked + $track': {
        backgroundColor: deepOrange[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const onSubmitTasks = (dados) => {
    setState(dados);
  };

  const onCheckTasks = id => {

    const position = tasks.findIndex((task) => task.id === id)

    let newListTask = tasks.slice()
    newListTask[position].isComplete = true

    setState(newListTask)
  };

  const onRemoveTasks = id => {

    const newListTask = tasks.filter((task) => task.id !== id)
    setState(newListTask)
  };

  let list = <div> </div>

  if (tasks.length > 0) {
    list = <div>
      {tasks.map(
        element =>
          <div
            key={"div-content-" + element.id}
            className="card-task" >
            {
              element.isComplete ?
                <OrangeSwitch
                  key={"chk-" + element.id}
                  defaultChecked={true}
                  className="check-task"
                  disabled /> :

                <OrangeSwitch
                  key={"chk-" + element.id}
                  defaultChecked={false}
                  className="check-task"
                  onClick={() =>
                    onCheckTasks(element.id)} />
            }

            <div key={"div-title-" + element.id} className="title-task">{element.task}</div>

            <button
              key={"btn-rm-" + element.id}
              className="btn-remove"
              onClick={() =>
                onRemoveTasks(element.id)
              }>
              Remover
            </button>
          </div>
      )}
    </div >
  } else {
    list = <div className="card-task empty">Não há tarefas para serem exibidas</div>
  }

  return (
    <>
      <div>
        <Routes>
          <Route path="/addtask">
            <AddTask
              onSubmit={onSubmitTasks}
              tasksProp={tasks}
            />
          </Route>
        </Routes>
        {list}
      </div>

    </>
  )
}



export default ToDoList;