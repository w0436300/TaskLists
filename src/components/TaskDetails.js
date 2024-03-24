import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import formatCurrency from './formatCurrency';
import renderBalances from './renderBalances';
const { Connection, PublicKey } = require("@_koi/web3.js");




function TaskDetails () {
    const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);
    const [showBalances, setShowBalances] = useState(false); 
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

    const toggleBalancesVisibility = () => setShowBalances(!showBalances);
    
    return (
        <div>
        {selectedTaskDetails ? (
            <div>
                <h1>Task Information</h1>
                <p><strong>Task Name:</strong> {selectedTaskDetails.task_name}</p>
                <p><strong>Task Description:</strong> {selectedTaskDetails.task_description}</p>
                <p><strong>Task Executable Network:</strong> {selectedTaskDetails.task_executable_network}</p>
                <p><strong>Approved for Participation:</strong> {selectedTaskDetails.is_whitelisted ? 'Yes' : 'No'}</p>
                <p><strong>Activity Status:</strong> {selectedTaskDetails.is_active ? 'Currently Open' : 'Closed'}</p>
                <p><strong>Allowed Failed Distributions</strong> {selectedTaskDetails.allowed_failed_distributions} attempts</p>
                <p><strong>Review Period:</strong> {selectedTaskDetails.audit_window}</p>
                <div onClick={toggleBalancesVisibility} style={{ cursor: 'pointer' }}>
                        <strong >Available Balances:</strong><span className='text-red-700' >Click to view Details</span>
                        {showBalances && <ul>{renderBalances(selectedTaskDetails.available_balances)}</ul>}
                </div>
                <p><strong>Bounty per Round:</strong> {formatCurrency(selectedTaskDetails.bounty_amount_per_round)} KOII</p>
                <p><strong>Minimum Stake Amount:</strong> {formatCurrency(selectedTaskDetails.minimum_stake_amount)} KOII </p>
                <p><strong>Total Bounty Fund:</strong> {formatCurrency(selectedTaskDetails.total_bounty_amount)} KOII </p>
                <p><strong>Total Stake Amount:</strong> {formatCurrency(selectedTaskDetails.total_stake_amount)} KOII</p>
            </div>
        ) : (
            <p>Loading task details...</p>
        )}
    </div>
      )


}

export default TaskDetails