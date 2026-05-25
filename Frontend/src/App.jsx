import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Compiler from "./pages/Compiler";
import Practice from "./pages/Practice";
import CoursePage from "./pages/CoursePage";
import ProblemPage from "./pages/ProblemPage";
import AdminDashboard from "./pages/AdminDashboard";
import CreateContest from "./pages/CreateContest";
import ContestPage from "./pages/ContestPage";

import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App(){

return(

<BrowserRouter>

<Routes>

{/* Welcome */}

<Route
path="/"
element={
<Loader>
<Welcome/>
</Loader>
}
/>


{/* Login */}

<Route
path="/login"
element={
<Loader>
<Login/>
</Loader>
}
/>


{/* Signup */}

<Route
path="/signup"
element={
<Loader>
<Signup/>
</Loader>
}
/>


{/* Home */}

<Route
path="/home"
element={
<ProtectedRoute>
<Loader>
<Home/>
</Loader>
</ProtectedRoute>
}
/>


{/* Practice */}

<Route
path="/practice"
element={
<ProtectedRoute>
<Loader>
<Practice/>
</Loader>
</ProtectedRoute>
}
/>


{/* Compiler */}

<Route
path="/compiler"
element={
<ProtectedRoute>
<Loader>
<Compiler/>
</Loader>
</ProtectedRoute>
}
/>


{/* Course */}

<Route
path="/course/:language"
element={
<ProtectedRoute>
<Loader>
<CoursePage/>
</Loader>
</ProtectedRoute>
}
/>


{/* Problem */}

<Route
path="/problem/:id"
element={
<ProtectedRoute>
<Loader>
<ProblemPage/>
</Loader>
</ProtectedRoute>
}
/>


{/* USER CONTEST PAGE */}

<Route
path="/contest-page"
element={
<ProtectedRoute>
<ContestPage/>
</ProtectedRoute>
}
/>


{/* ADMIN CONDUCT CONTEST */}

<Route
path="/contest"
element={
<AdminRoute>
<CreateContest/>
</AdminRoute>
}
/>


{/* ADMIN DASHBOARD */}

<Route
path="/admin"
element={
<AdminRoute>
<Loader>
<AdminDashboard/>
</Loader>
</AdminRoute>
}
/>

</Routes>

</BrowserRouter>

);

}

export default App;