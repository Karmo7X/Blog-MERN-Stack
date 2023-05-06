
import './App.css';
import { BrowserRouter ,Routes ,Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Layout from './component/Layout';
import Write from './pages/Write/Write';
import Single from './pages/Single/Single';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Layout/>}>
       <Route index element={<Home/>}/>
       
        <Route path='write' element={<Write/>}/>
        <Route path='post/:id' element={<Single/>}/>

       
      </Route>
      <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
