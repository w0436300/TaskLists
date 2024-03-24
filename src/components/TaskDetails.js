import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import formatCurrency from './formatCurrency';
// import renderBalances from './renderBalances';
const { Connection, PublicKey } = require("@_koi/web3.js");




function TaskDetails () {
    const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);
    // const [showBalances, setShowBalances] = useState(false); 
    const { taskId } = useParams()

    useEffect(() => {
      const getTaskData = async () => {
          if (!taskId) return;
          const connection = new Connection("https://testnet.koii.live");
          try {
              const accountInfo = await connection.getAccountInfo(new PublicKey(taskId));
              const taskState = JSON.parse(accountInfo.data);
              setSelectedTaskDetails(taskState);
              console.log(taskState);
          } catch (error) {
              console.error('Error fetching task details:', error);
              setSelectedTaskDetails(null);
          }
      };
      getTaskData();
    }, [taskId]);

    // const toggleBalancesVisibility = () => setShowBalances(!showBalances);
    
    return (
        <div>
        {selectedTaskDetails ? (
            <div>
                <h1>Task Information</h1>       
                <ul className="menu bg-base-200 rounded-box">
                    <li><a><strong>Task Name:</strong> {selectedTaskDetails.task_name}</a></li>
                    <li><a><strong>Task Description:</strong> {selectedTaskDetails.task_description}</a></li>
                    <li><a><strong>Task Executable Network:</strong> {selectedTaskDetails.task_executable_network}</a></li>
                    <li><a><strong>Approved for Participation:</strong> {selectedTaskDetails.is_whitelisted ? 'Yes' : 'No'}</a></li>
                    <li><a><strong>Activity Status:</strong> {selectedTaskDetails.is_active ? 'Currently Open' : 'Closed'}</a></li>
                    <li><a><strong>Allowed Failed Distributions</strong> {selectedTaskDetails.allowed_failed_distributions} attempts</a></li>
                    <li><a><strong>Review Period:</strong> {selectedTaskDetails.audit_window}</a></li>
                    <li>
                        <details open>
                        <summary><strong>Available Balances:</strong></summary>
                        <ul>
                        {Object.entries(selectedTaskDetails.available_balances || {}).map(([key, value]) => (
                                    <li key={key}><a>{`${key}: ${formatCurrency(value)}`}</a></li>
                                ))}                     
                        </ul>
                        </details>
                    </li>                              
                    <li><a><strong>Bounty per Round:</strong> {formatCurrency(selectedTaskDetails.bounty_amount_per_round)} KOII</a></li>
                    <li><a><strong>Minimum Stake Amount:</strong> {formatCurrency(selectedTaskDetails.minimum_stake_amount)} KOII </a></li>
                    <li><a><strong>Total Bounty Fund:</strong> {formatCurrency(selectedTaskDetails.total_bounty_amount)} KOII</a> </li>
                    <li><a><strong>Total Stake Amount:</strong> {formatCurrency(selectedTaskDetails.total_stake_amount)} KOII</a></li>
                </ul>
                
            </div>
        ) : (
            <p>Loading task details...</p>
        )}
    </div>
      )


}

export default TaskDetails