import { useState, useEffect } from 'react';
const { Connection, PublicKey } = require("@_koi/web3.js");

const useKoiiConnection = (taskId) => {
    const [taskDetails, setTaskDetails] = useState(null);

    useEffect(() => {        
        const fetchTaskDetails = async () => {
            if (!taskId) return;
            const connection = new Connection("https://testnet.koii.live");
            try {
                const accountInfo = await connection.getAccountInfo(new PublicKey(taskId));
                const details = JSON.parse(accountInfo.data);
                setTaskDetails(details);
            } catch (error) {
                console.error('Error fetching task details:', error);
                setTaskDetails(null);
            }
        };

        fetchTaskDetails();
    }, [taskId]);

    return taskDetails;
};

export default useKoiiConnection;
