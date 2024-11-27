import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes ,Route  } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import cors from 'cors';
app.use(cors());


const App = () => {
  const url = 'https://snap-bite-4dv4.vercel.app';
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>}/>
          <Route path='/List' element={<List url={url}/>}/>
          <Route path='/Orders' element={<Orders url={url}/>}/>



        </Routes>

         
      </div>

    </div>
  )
}

export default App