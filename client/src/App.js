// import library
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

// import created file
import './App.css';
import Home from './views/Home';
import Introduction from './views/Intrduction';
import ListClasses from './views/ListClasses';
import ClassContextProvider from './contexts/classContext';
import DetailClass from './views/DetailClass';
import ActorContextProvider, { ActorContext } from './contexts/actorContext';
import ListSuitableClasses from './views/ListSuitableClasses';
import Register from './views/Register';
import Login from './views/Login';
import TutorMain from './views/tutorView/TutorMain';

function App() {

  useEffect(() => {
    document.title = "HustTeach - Gia sư HN uy tín";
  }, []);

  return (
    <ActorContextProvider>
      <ClassContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<><a href='/trang-chu'>Home page</a></>} />
            <Route path="/trang-chu" element={<Home/>} />
            <Route path="/dang-ky" element={<Register/>} />
            <Route path="/dang-nhap" element={<Login/>} />
            <Route path="/gioi-thieu" element={<Introduction/>} />
            <Route path="/danh-sach-lop" element={<ListClasses/>} />
            <Route path="/danh-sach-lop-phu-hop" element={<ListSuitableClasses/>} />
            <Route path="/chi-tiet-lop" element={<DetailClass/>} />

            {/* View and route Gia su */}
            <Route path="/gia-su" element={<TutorMain/>} />

            {/* <Route path="/login" element={<Auth authRoute="login" />} />
            <Route path="/register" element={<Auth authRoute="register" />} /> */}
          </Routes>
        </Router>

      </ClassContextProvider>
    </ActorContextProvider>
  );
}

export default App;
