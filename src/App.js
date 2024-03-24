import './css/output.css';
import NavBar from './components/Header';
import Footer from './components/Footer'
import TaskLists from './components/TaskLists';
import { Route, Routes } from 'react-router-dom';
import TaskDetails from './components/TaskDetails';


function App() {
  return (
      
        <main classNameN="relative flex flex-col min-h-screen">
          <NavBar />
          <Routes>
            <Route index element = {<TaskLists />} />
            <Route path="/task/:taskId" element={<TaskDetails />} />
          </Routes>
          <Footer />
        </main>
       
        
      

    
  );
}


export default App;
