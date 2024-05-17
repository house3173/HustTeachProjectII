import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      Hust Teach
    </>
    // <AuthContextProvider>
    //   <PostContextProvider>
    //     <Router>
    //       <Routes>
    //         <Route path="/" element={<Landing />} />
    //         <Route path="/login" element={<Auth authRoute="login" />} />
    //         <Route path="/register" element={<Auth authRoute="register" />} />
    //         <Route 
    //           path="/dashboard" 
    //           element={
    //             <ProtectedRoute>
    //                 <DashBoard /> 
    //             </ProtectedRoute>
    //           }
    //         />
    //         <Route
    //           path='/about'
    //           element={
    //             <ProtectedRoute>
    //               <About/>
    //             </ProtectedRoute>
    //           }
    //         />
    //       </Routes>
    //     </Router>
    //   </PostContextProvider>
    // </AuthContextProvider>
  );
}

export default App;
