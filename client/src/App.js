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
import TutorContextProvider from './contexts/tutorContext';
import ListSuitableClasses from './views/ListSuitableClasses';
import Register from './views/Register';
import Login from './views/Login';
import TutorMain from './views/tutorView/TutorMain';
import TutorRegisterClass from './views/tutorView/TutorRegisterClass';
import ParentsContextProvider from './contexts/parentsContext';
import ParentsMain from './views/parentsView/ParentsMain';
import ParentsAddClass from './views/parentsView/ParentsAddClass';
import ParentsManageClass from './views/parentsView/ParentsManageClass';
import StaffMain from './views/staffView/StaffMain';
import StaffLogin from './views/staffView/StaffLogin';
import StaffManageClass from './views/staffView/StaffManageClass';
import StaffAddClass from './views/staffView/StaffAddClass';
import StaffStatistic from './views/staffView/StaffStatistic';
import AdminLogin from './views/adminView/AdminLogin'
import AdminMain from './views/adminView/AdminMain'
import AdminManageClass from './views/adminView/AdminManageClass';
import AdminManageStaff from './views/adminView/AdminManageStaff';
import AdminManageTutor from './views/adminView/AdminManageTutor';
import AdminManageParents from './views/adminView/AdminManageParents';
import InstructFee from './views/InstructFee';

function App() {

  useEffect(() => {
    document.title = "HustTeach - Gia sư HN uy tín";
  }, []);

  return (
    <ActorContextProvider>
      <ParentsContextProvider>
        <TutorContextProvider>
          <ClassContextProvider>
            <Router>
              <Routes>
                <Route path="/" element={
                  <>
                    <a href='/trang-chu'>Home page</a><br></br>
                    <a href='/staff31072003'>Staff page</a><br></br>
                    <a href='/admin31072003'>Admin page</a>
                  </>} />
                <Route path="/trang-chu" element={<Home/>} />
                <Route path="/dang-ky" element={<Register/>} />
                <Route path="/dang-nhap" element={<Login/>} />
                <Route path="/gioi-thieu" element={<Introduction/>} />
                <Route path="/huong-dan" element={<InstructFee/>} />
                <Route path="/danh-sach-lop" element={<ListClasses/>} />
                <Route path="/danh-sach-lop-phu-hop" element={<ListSuitableClasses/>} />
                <Route path="/chi-tiet-lop" element={<DetailClass/>} />

                {/* View and route Gia su */}
                <Route path="/gia-su/dang-ky-lop" element={<TutorRegisterClass/>} />
                <Route path="/gia-su" element={<TutorMain/>} />

                {/* View and route Gia su */}
                <Route path="/phu-huynh/them-lop-moi" element={<ParentsAddClass/>} />
                <Route path="/phu-huynh/quan-ly-lop" element={<ParentsManageClass/>} />
                <Route path="/phu-huynh" element={<ParentsMain/>} />

                {/* View and route Nhan vien (Staff) */}
                <Route path='/staff31072003/trang-chu' element={<StaffMain />}/> 
                <Route path='/staff31072003/quan-ly-lop' element={<StaffManageClass />}/> 
                <Route path='/staff31072003/them-lop-moi' element={<StaffAddClass />}/> 
                <Route path='/staff31072003/thong-ke' element={<StaffStatistic />}/> 
                <Route path='/staff31072003' element={<StaffLogin />}/> 

                {/* View and route Admin (Admin) */}
                <Route path='/admin31072003/trang-chu' element={<AdminMain />}/> 
                <Route path='/admin31072003/quan-ly-lop' element={<AdminManageClass />}/> 
                <Route path='/admin31072003/quan-ly-nhan-vien' element={<AdminManageStaff />}/> 
                <Route path='/admin31072003/quan-ly-gia-su' element={<AdminManageTutor />}/> 
                <Route path='/admin31072003/quan-ly-phu-huynh' element={<AdminManageParents />}/> 
                <Route path='/admin31072003/thong-ke' element={<StaffStatistic />}/> 
                <Route path='/admin31072003' element={<AdminLogin />}/> 
                

                {/* <Route path="/login" element={<Auth authRoute="login" />} />
                <Route path="/register" element={<Auth authRoute="register" />} /> */}
              </Routes>
            </Router>

          </ClassContextProvider>
        </TutorContextProvider>
      </ParentsContextProvider>
    </ActorContextProvider>
  );
}

export default App;
