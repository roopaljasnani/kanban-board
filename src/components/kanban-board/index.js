import React from "react";
import "./index.css";

export default function KanbanBoard(props) {
  let [tasks, setTasks] = React.useState([
    { name: "1", stage: 0 },
    { name: "2", stage: 0 },
  ]);
  const [newTask, setNewTask] = React.useState();

  let [stagesNames, setStagesNames] = React.useState(["Backlog", "To Do", "Ongoing", "Done"]);

  function handleTask(e) {
    setNewTask({ stage: 0, name: e.target.value });
  }

  function addTask() {
    if (newTask?.name) {
      setTasks((t) => [...t, newTask]);
      setNewTask(undefined);
    }
  }

  function deleteTask(name) {
    setTasks((t) => t.filter((task) => task.name !== name));
  }

  function moveTaskForward(name) {
    setTasks((t) => t.map((task) => (task.name === name ? { ...task, stage: task.stage + 1 } : task)));
  }

  function moveTaskBackward(name) {
    setTasks((t) => t.map((task) => (task.name === name ? { ...task, stage: task.stage - 1 } : task)));
  }

  let stagesTasks = [];
  for (let i = 0; i < stagesNames.length; ++i) {
    stagesTasks.push([]);
  }
  for (let task of tasks) {
    const stageId = task.stage;
    stagesTasks[stageId].push(task);
  }

  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <section className="mt-50 layout-row align-items-center justify-content-center">
        <input
          id="create-task-input"
          type="text"
          className="large"
          placeholder="New task name"
          data-testid="create-task-input"
          onChange={handleTask}
          value={newTask?.name || ""}
        />
        <button type="submit" className="ml-30" data-testid="create-task-button" onClick={addTask}>
          Create task
        </button>
      </section>

      <div className="mt-50 layout-row">
        {stagesTasks.map((tasks, i) => {
          return (
            <div className="card outlined ml-20 mt-0" key={`${i}`}>
              <div className="card-text">
                <h4>{stagesNames[i]}</h4>
                <ul className="styled mt-50" data-testid={`stage-${i}`}>
                  {tasks.map((task, index) => {
                    return (
                      <li className="slide-up-fade-in" key={`${i}${index}`}>
                        <div className="li-content layout-row justify-content-between align-items-center">
                          <span data-testid={`${task.name.split(" ").join("-")}-name`}>{task.name}</span>
                          <div className="icons">
                            <button
                              className="icon-only x-small mx-2"
                              data-testid={`${task.name.split(" ").join("-")}-back`}
                              disabled={i === 0}
                              onClick={() => moveTaskBackward(task.name)}
                            >
                              <i className="material-icons">arrow_back</i>
                            </button>
                            <button
                              className="icon-only x-small mx-2"
                              data-testid={`${task.name.split(" ").join("-")}-forward`}
                              disabled={i === stagesNames.length - 1}
                              onClick={() => moveTaskForward(task.name)}
                            >
                              <i className="material-icons">arrow_forward</i>
                            </button>
                            <button
                              className="icon-only danger x-small mx-2"
                              data-testid={`${task.name.split(" ").join("-")}-delete`}
                              onClick={() => deleteTask(task.name)}
                            >
                              <i className="material-icons">delete</i>
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
