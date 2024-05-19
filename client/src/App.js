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

function App() {

  useEffect(() => {
    document.title = "HustTeach - Gia sư HN uy tín";
  }, []);

  return (
    <ClassContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<><a href='/trang-chu'>Home page</a></>} />
          <Route path="/trang-chu" element={<Home/>} />
          <Route path="/gioi-thieu" element={<Introduction/>} />
          <Route path="/danh-sach-lop" element={<ListClasses/>} />
          <Route path="/chi-tiet-lop" element={<DetailClass/>} />
          {/* <Route path="/login" element={<Auth authRoute="login" />} />
          <Route path="/register" element={<Auth authRoute="register" />} /> */}
        </Routes>
      </Router>

    </ClassContextProvider>
  );
}

export default App;
