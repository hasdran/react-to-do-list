import { useEffect, useState } from "react";
import { Route, Switch as Routes } from "react-router-dom";
import Header from "../../components/Header/Header";
import AddTask from "../AddTask/AddTask";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
// import { getToken } from "../../services/auth";
import api from "../../services/api";
import "./ToDoList.css";

const ToDoList = () => {
  let [tasks, setState] = useState([]);
  const OrangeSwitch = withStyles({
    switchBase: {
      color: deepOrange[300],
      "&$checked": {
        color: deepOrange[400],
      },
      "&$checked + $track": {
        backgroundColor: deepOrange[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const onSubmitTasks = (dados) => {
    setState(dados);
  };

  const onCheckTasks = (id) => {
    const position = tasks.findIndex((task) => task.id === id);

    let newListTask = tasks.slice();
    newListTask[position].isComplete = true;

    setState(newListTask);
  };

  const onRemoveTasks = (id) => {
    const newListTask = tasks.filter((task) => task.id !== id);
    setState(newListTask);
  };

  useEffect(() => {
    
    // const token = getToken();
    api
      .get("/tasks  ", {
        headers: {
          // Authorization: `Bearer ${token}`,
          // authcookie: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE2MTI4Mzg2NzN9.hzsDucCC5fmRLbs8FnCMre_yN9mTweV_x6igjOS2g7w",
        },
      })
      .then((response) => {
        const { data: tasks } = response;
        console.log(tasks);
        setState(tasks);
      })
      .catch((error) => {});
  }, []);

  let list = <div> </div>;

  if (tasks.length > 0) {
    list = (     
      <div>
      
        {tasks.map((element) => (
          <div key={"div-content-" + element.id} className="card-task">
            {element.isComplete ? (
              <OrangeSwitch
                key={"chk-" + element.id}
                defaultChecked={true}
                className="check-task"
                disabled
              />
            ) : (
              <OrangeSwitch
                key={"chk-" + element.id}
                defaultChecked={false}
                className="check-task"
                onClick={() => onCheckTasks(element.id)}
              />
            )}

            <div key={"div-title-" + element.id} className="title-task"></div>
            {/* {console.log(localStorage.getItem("TOKEN_KEY"))} */}
            {/* 
            {localStorage.getItem(TOKEN_KEY )} */}
            <h1>{`${element.title}`}</h1>
            {/* <h1>{${element.title}</h1> */}
            {/* <p>{`${element.description}`}</p> */}
            {/* <p dangerouslySetInnerHTML={{ __html: `<h1 onclick=alert(localStorage.getItem("TOKEN_KEY")) >asdasd </h1>` }}></p> */}
           
            <p dangerouslySetInnerHTML={{ __html: `${element.description}` }}></p>
            {/* <p dangerouslySetInnerHTML={{ __html: `${document.cookie}` }}></p> */}
            <button
              key={"btn-rm-" + element.id}
              className="btn-remove"
              onClick={() => onRemoveTasks(element.id)}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    );
  } else {
    list = (
      <div className="card-task empty">Não há tarefas para serem exibidas</div>
    );
  }

  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path="/tasks/addtask">
            <AddTask onSubmit={onSubmitTasks} tasksProp={tasks} />
          </Route>
        </Routes>
        {list}
      </div>
    </>
  );
};

export default ToDoList;
