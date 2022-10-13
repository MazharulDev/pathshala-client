import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateAccount from './components/Auth/CreateAccount';
import Login from './components/Auth/Login';
import AddVideo from './components/Dashboard/AddVideo';
import Dashboard from './components/Dashboard/Dashboard';
import MyVideos from './components/Dashboard/MyVideos';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './pages/Footer/Footer';
import RequireAuth from './shared/RequireAuth';



function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={
          <RequireAuth><Dashboard /></RequireAuth>
        }>
          <Route index element={<AddVideo />} />
          <Route path='myvideos' element={<MyVideos />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/createaccount' element={<CreateAccount />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
