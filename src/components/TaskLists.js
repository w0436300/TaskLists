import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
const { Connection, PublicKey } = require("@_koi/web3.js");

function TaskLists() {
  let navigate = useNavigate();
  const [tasks, setTasks] = useState([]); 

  useEffect(() => {
    const connection = new Connection("https://testnet.koii.live");
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://faucet-api.koii.network/api/get-whitelisted-task-ids');
        const taskIds = response.data.whitelistedTaskIds;

        const taskDetailsPromises = taskIds.map(async (id) => {
          const accountInfo = await connection.getAccountInfo(new PublicKey(id));
          const taskDetails = JSON.parse(accountInfo.data);
          return { id, ...taskDetails };
        });

        const tasksDetails = await Promise.all(taskDetailsPromises);
        setTasks(tasksDetails);
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Whitelisted Tasks</h2>
      <ul className="menu bg-base-200 w-full rounded-box">
        {tasks.map((task) => (
          <li key={task.id} onClick={() => handleTaskClick(task.id)}>
            <p className="text-sm font-medium text-indigo-600">{task.task_name || 'Unnamed Task'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskLists;
