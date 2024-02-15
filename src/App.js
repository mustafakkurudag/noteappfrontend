import './App.css';
import Home from './components/Home';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
}
  from 'react-router-dom';
import Students from './components/Students';
import StudentForm from './components/StudentForm';
import Header from './components/Header';
import Teachers from './components/Teachers';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" index element={<Home />} />
      <Route path="/teachers" index element={<Teachers />} />
      <Route path="/teachers/:id/students" element={<Students />} />
      <Route path="/teachers/:teacherId/new-student" element={<StudentForm />} />
    </Route>

  )
);

function App() {
  return (
      <RouterProvider router={router} >  
      <Header />
        <Home />
      </RouterProvider>
  );
}

export default App;
