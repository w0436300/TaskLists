import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

 
function TaskLists() {
  let navigate = useNavigate();
  const [taskIds, setTaskIds] = useState([]);
  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };


  useEffect(() => {
    axios.get('https://faucet-api.koii.network/api/get-whitelisted-task-ids')
      .then(response => {
        const taskIds = response.data.whitelistedTaskIds;
        setTaskIds(taskIds);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Whitelisted Tasks</h2>
      <ul className="menu bg-base-200 w-full rounded-box">
        {taskIds.map((taskId) => (
          <li key={taskId} >
            <div           
              onClick={() => handleTaskClick(taskId)}
            >
              <p className="text-sm font-medium text-indigo-600">{taskId}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
   
  );
}

export default TaskLists;