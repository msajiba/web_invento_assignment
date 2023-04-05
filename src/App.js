import { Route, Routes } from 'react-router-dom';
import './App.css';
import Todos from './components/Todos';
import AddTodo from './pages/AddTodo';
import UpdateTodo from './pages/UpdateTodo';
function App() {
  return (
    <>
      {/* ROUTE SETUP  */}
      
        <Routes>
          <Route path='/' element={<Todos />} />
          <Route path='/add-todo' element={<AddTodo />} />
          <Route path='/update/:id' element={<UpdateTodo />} />
        </Routes>
    </>
  );
}

export default App;
