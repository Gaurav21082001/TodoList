import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateItem from './pages/CreateItem';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Access from './pages/Access';

export default function App() {
  return (
    <div>

      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/CreateItem' element={<CreateItem/>} />
        <Route path='/access' element={<Access/>}/>
      </Routes>
    </div>
  )
}
