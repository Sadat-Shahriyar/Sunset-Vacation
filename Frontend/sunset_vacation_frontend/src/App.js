import './App.css';
import {BrowserRouter,Router,Route, Navigate, Routes} from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
function App() {
  return (
   <BrowserRouter>
     <Routes>
        <Route path='/' element={<Homepage/>} >
         
        </Route>
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
     </Routes>
   </BrowserRouter>
  );
}

export default App;
