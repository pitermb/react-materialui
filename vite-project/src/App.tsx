import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<
    Array<{
      key: string;
      name: string;
    }>
  >([]);
  const [tasksConcluidas, setTasksConcluidas] = useState<
    Array<{
      key: string;
      name: string;
    }>
  >([]);
  const [value, setValue] = useState<string>("");

  const handleSaveNewTask = () => {
    value
      ? setTasks((tasks) => [
          ...tasks,
          { key: Math.round(Math.random() * 10000).toString(), name: value },
        ])
      : alert("Digite alguma tarefa...");
    setValue("");
  };

  const handleCheckTask = (e: any) => {
    const selectedTask = e.target.value;
    const taksConcluida = tasks.filter((task) => {
      return task.key === selectedTask;
    });
    setTasksConcluidas((tasks) => [
      ...tasks,
      { key: taksConcluida[0].key, name: taksConcluida[0].name },
    ]);
    setTasks(tasks.filter((tasks) => tasks.key !== selectedTask));
  };

  const handleChangeTask = (index: any) => {
    const taskEdit = tasks.map((prevItem, indexItem) => {
      if (index === indexItem) {
        var itemEdit = prompt("Edite sua tarefa:");
        return { key: prevItem.key, name: itemEdit ?? "" };
      }
      return prevItem;
    });
    setTasks(taskEdit);
  };

  return (
    <>
      <p className="App">
        <h1>Lista de Tarefas</h1>
        <div>
          <input
            placeholder="Digite alguma tarefa..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={handleSaveNewTask}>Adicionar Tarefa</button>
        </div>
        <div>
          {tasks.map((task, index) => {
            return (
              <div className="card">
                <input
                  type="checkbox"
                  checked={false}
                  onChange={handleCheckTask}
                  value={task.key}
                />
                <div>{task.name}</div>
                <button onClick={() => handleChangeTask(index)}>
                  Editar Tarefa
                </button>
                <button
                  onClick={() => {
                    setTasks(tasks.filter((tasks) => tasks.key !== task.key));
                  }}
                >
                  Deletar Tarefa
                </button>
              </div>
            );
          })}
        </div>
      </p>
      <p className="App">
        <h1>Lista de Tarefas Concluidas</h1>
        <div>
          {tasksConcluidas.map((task) => {
            return (
              <div className="card">
                <input type="checkbox" checked disabled value={task.key} />
                <div>{task.name}</div>
                <button
                  onClick={() =>
                    setTasksConcluidas(
                      tasksConcluidas.filter((tasks) => tasks.key !== task.key)
                    )
                  }
                >
                  Deletar Tarefa
                </button>
              </div>
            );
          })}
        </div>
      </p>
    </>
  );
}

export default App;
