import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import formatCurrency from './formatCurrency';
import useKoiiConnection from '../hooks/getTaskConnect'
// import renderBalances from './renderBalances';




function TaskDetails () {
    // const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);
    // const [showBalances, setShowBalances] = useState(false); 
    const { taskId } = useParams()
    const taskDetails = useKoiiConnection(taskId);

    if (!taskDetails) {
        return <div>Loading task details...</div>;
    }

    // const toggleBalancesVisibility = () => setShowBalances(!showBalances);
    
    return (
        <div>
            <div>
                <h1>Task Information</h1>       
                <ul className="menu bg-base-200 rounded-box">
                    <li><a><strong>Task Name:</strong> {taskDetails.task_name}</a></li>
                    <li><a><strong>Task Description:</strong> {taskDetails.task_description}</a></li>
                    <li><a><strong>Task Executable Network:</strong> {taskDetails.task_executable_network}</a></li>
                    <li><a><strong>Approved for Participation:</strong> {taskDetails.is_whitelisted ? 'Yes' : 'No'}</a></li>
                    <li><a><strong>Activity Status:</strong> {taskDetails.is_active ? 'Currently Open' : 'Closed'}</a></li>
                    <li><a><strong>Allowed Failed Distributions</strong> {taskDetails.allowed_failed_distributions} attempts</a></li>
                    <li><a><strong>Review Period:</strong> {taskDetails.audit_window}</a></li>
                    <li>
                        <details open>
                            <summary><strong>Available Balances:</strong></summary>
                            <ul>
                                {Object.entries(taskDetails.available_balances || {}).map(([key, value]) => (
                                    <li key={key}>{`${key}: ${formatCurrency(value)}`}</li>
                                ))}
                            </ul>
                        </details>
                    </li>                         
                    <li><a><strong>Bounty per Round:</strong> {formatCurrency(taskDetails.bounty_amount_per_round)} KOII</a></li>
                    <li><a><strong>Minimum Stake Amount:</strong> {formatCurrency(taskDetails.minimum_stake_amount)} KOII </a></li>
                    <li><a><strong>Total Bounty Fund:</strong> {formatCurrency(taskDetails.total_bounty_amount)} KOII</a> </li>
                    <li><a><strong>Total Stake Amount:</strong> {formatCurrency(taskDetails.total_stake_amount)} KOII</a></li>
                </ul>
                
            </div>
       
    </div>
      )


}

export default TaskDetails