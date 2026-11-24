import { useState } from 'react';
import './App.css';
import { tasks as initialTasks } from './data/tasks.ts';
import Task from './components/Task.tsx';
import type { TaskType } from './types/taskTypes';

type FilterType = 'remaining' | 'completed' | 'all';
type SortType = 'asc' | 'desc' | 'none';

function App() {
  const [tasks, setTasks] = useState<TaskType[]>(initialTasks);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('none');
  const [createNewTask, setCreateNewTask] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');

  const visibleTasks = tasks
    .filter((task) => {
      if (filter === 'remaining') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .filter((task) => {
      const query = searchTerm.trim().toLowerCase();
      return task.title.toLowerCase().includes(query);
    })
    .toSorted((a, b) => {
      if (sort === 'asc') return a.title.localeCompare(b.title);
      if (sort === 'desc') return b.title.localeCompare(a.title);
      return 0;
    });

  function toggleTask(id: number) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(id: number) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  return (
    <>
      <div className="App">
        <div className="header">
          <h1>Task List</h1>
          <div className="task-count">
            <p>Remaining tasks: {tasks.filter((task) => !task.completed).length}</p>
            <p>Completed tasks: {tasks.filter((task) => task.completed).length}</p>
          </div>
          <div className="buttons">
            <button onClick={() => setFilter('remaining')}>filter by remaining</button>
            <button onClick={() => setFilter('completed')}>filter by completed</button>
            <button onClick={() => setFilter('all')}>filter by all</button>
          </div>
          <div className="sorting">
            <button onClick={() => setSort('asc')}>sort by asc</button>
            <button onClick={() => setSort('desc')}>sort by desc</button>
            <button onClick={() => setSort('none')}>sort by none</button>
          </div>
          <div className="createNewTask">
            <button onClick={() => {setCreateNewTask(true);}}> Create New Task </button>
            {createNewTask && (
              <div className="newTaskForm">
                <h2>Create New Task</h2>
                <form onSubmit={(e) => { 
                  e.preventDefault();
                  const newTask: TaskType = {
                    id: tasks.length + 1,
                    title: (e.target as any)[0].value,
                    description: (e.target as any)[1].value,
                    completed: (e.target as any)[2].checked,
                  };

                  if (!newTask.title || !newTask.description) {
                    alert('Please fill in both the title and description fields.');
                    return;
                  }
                  setTasks([...tasks, newTask]);
                  setCreateNewTask(false);
                  }}>
                  <input type="text" placeholder="Task title"/>
                  <input type="text" placeholder="Task description"/>
                  <input type="checkbox" id="completed" name="completed"/>
                  <button type="submit">Create Task</button>
                </form>
              </div>
            )}
          </div>
          <div className="deleteCompletedTasks">
            <button onClick={() => setTasks(tasks.filter((task) => !task.completed))}>Delete Completed Tasks</button>
          </div>
          <div className="searchBar">
            <input
              type="search"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search tasks"
            />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th scope="col">Task</th>
              <th scope="col">Description</th>
              <th scope="col">Completed</th>
            </tr>
          </thead>
          <tbody>
            {visibleTasks.map((task) => (
              <Task key={task.id} task={task} onToggle={toggleTask} deleteTask={deleteTask} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App;