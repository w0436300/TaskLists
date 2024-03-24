import './css/output.css';
import NavBar from './components/Header';
import Footer from './components/Footer'
import TaskLists from './components/TaskLists';
import { Route, Routes } from 'react-router-dom';
import TaskDetails from './components/TaskDetails';


function App() {
  return (
      
        <div className="relative flex flex-col min-h-screen">
          <NavBar />
          <div className="flex-grow">
            <Routes>
            <Route index element = {<TaskLists />} />
            <Route path="/task/:taskId" element={<TaskDetails />} />
          </Routes>
          </div>  
          <Footer />
        </div>
    
  );
}


export default App;
