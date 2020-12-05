import { useRef, useState } from 'react';
import './AddTask.css';

const AddTask = ({ onSubmit, tasksProp }) => {

  const [task, setTask] = useState("");

  const inputEl = useRef(null)

  const handleInputTask = () => {
    inputEl.current.value = "";
  }

  const handleInputSubmit = (event) => {
    event.preventDefault();
    let newListTask = tasksProp.slice()
    let idGenerator = 0

    newListTask.length > 0 ? idGenerator = newListTask[newListTask.length - 1].id + 1 : idGenerator++

    newListTask.push({
      id: idGenerator,
      task: task,
      isComplete: false
    })
    setTask("")

    onSubmit(newListTask);
  }

  return (
    <div className="form-task">
      <form>
        <label className="label-title-task" htmlFor="task">Tarefa:</label>
        <input
          className="inpt-title-task"
          type="text"
          name="task"
          ref={inputEl}
          onChange={(event) => { setTask(event.target.value) }} />
        <button
          className="btn-add-task"
          type="submit"
          disabled={taskValidator(task)}
          onClick={
            (event) => {
              handleInputSubmit(event)
              handleInputTask()
              taskValidator(task)
            }
          }>Cadastrar</button>
      </form>
    </div >
  )
}

function taskValidator(task) {
  return task.length > 3 ? '' : 'Uma tarefa deve ser inserida.';
}

export default AddTask;