import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import {  Routes , Route, BrowserRouter, Navigate, Outlet  } from "react-router-dom";
import ChatPageCopy from "./pages/ChatPage copy.jsx";
import { useEffect, useState } from "react";


function App() {
  const [load , setload] = useState(true)
  const spiner = document.getElementById("centerLoad")

  if(spiner){
  setTimeout(() => {
      spiner.style.display="none"
      setload(false)
    }, 2000);
  }

  const [user , setuser] = useState()
  useEffect(_=> { localStorage.getItem("facebook") ? setuser(JSON.parse(localStorage.getItem("facebook"))) : setuser(null) },[])
 
  const ProtectedRoute = ({auth , childern}) => {
    if (auth === null) return <Navigate to="/" replace />
    return childern ? childern : <Outlet />
  }

  return (
    <div className="App">
      {
        !load && <BrowserRouter>
        <Routes> 
          
          <Route path="/"  element={<LoginPage/>} />
          <Route element={<ProtectedRoute auth={user} />} >

            <Route path="/home"  element={<HomePage />} />
            <Route path="/chat"  element={<ChatPageCopy />} />
          </Route>
            
          
          

          {/* <Route path="/profile/:userId"  element={<ProfilePage />} /> */}
        </Routes>
      </BrowserRouter>
      }
      
      

    </div>
  );
}

export default App;


// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;
