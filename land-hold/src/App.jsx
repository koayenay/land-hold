// import React, { useState } from "react"
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
// import OwnerList from "./components/OwnerList"
// import OwnerForm from "./components/OwnerForm"
// import LandHoldingList from "./components/LandHoldingList"
// import LandHoldingForm from "./components/LandHoldingForm"
// import SignUpForm from "./components/SignUpForm" // Import your SignUpForm component
// // import LoginForm from "./components/LoginForm" // Import your LoginForm component
// // import { AuthProvider } from "./context/AuthContext" // Import AuthProvider

// const App = () => {
//   const [updateList, setUpdateList] = useState(false)
//   const [editingLandHolding, setEditingLandHolding] = useState(null)

//   const handleSave = () => {
//     setUpdateList(!updateList) // Toggle to refresh the list
//     setEditingLandHolding(null) // Reset editing state
//   }

//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to='/'>Home</Link>
//             </li>
//             <li>
//               <Link to='/signup'>Sign Up</Link>
//             </li>
//             <li>
//               <Link to='/login'>Login</Link>
//             </li>
//           </ul>
//         </nav>

//         <Routes>
//           <Route
//             path='/'
//             element={
//               <div>
//                 <h1>Land Holding Management</h1>
//                 <OwnerForm onSave={handleSave} />
//                 <OwnerList key={updateList} />
//                 <LandHoldingForm
//                   landHolding={editingLandHolding}
//                   onSave={handleSave}
//                 />
//                 <LandHoldingList
//                   key={updateList}
//                   onEdit={setEditingLandHolding}
//                 />
//               </div>
//             }
//           />
//           <Route path='/signup' element={<SignUpForm />} />
//           {/* <Route path='/login' element={<LoginForm />} /> */}
//         </Routes>
//       </div>
//     </Router>
//   )
// }

// export default App

// src/App.jsx

import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import OwnerList from "./components/OwnerList"
import OwnerForm from "./components/OwnerForm"
import LandHoldingList from "./components/LandHoldingList"
import LandHoldingForm from "./components/LandHoldingForm"
import SignUpForm from "./components/SignUpForm"
import LoginForm from "./components/LoginForm"
import ProtectedRoutes from "./components/ProtectedRoutes"
import { AuthProvider } from "./context/AuthContext"

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/signup' element={<SignUpForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoutes>
                <div>
                  <h1>Land Holding Management</h1>
                  <OwnerForm />
                  <OwnerList />
                  <LandHoldingForm />
                  <LandHoldingList />
                </div>
              </ProtectedRoutes>
            }
          />
          <Route path='/' element={<Navigate to='/login' />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
