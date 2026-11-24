import type { TaskType } from '../types/taskTypes';

export default function Task({task,onToggle, deleteTask}: {
  task: TaskType;
  onToggle: (id: number) => void;
  deleteTask: (id: number) => void;
}) {
  return (
    <tr>
      <th scope="row">{task.title}</th>
      <td>{task.description}</td>
      <td>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark ${task.title} as completed`}
        />
      </td>
      <td>
        <button onClick={() => deleteTask(task.id)}>Usuń</button>
      </td>
    </tr>
  )
}