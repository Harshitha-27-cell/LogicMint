import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Compiler from "./pages/Compiler";
import Practice from "./pages/Practice";
import CoursePage from "./pages/CoursePage";
import ProblemPage from "./pages/ProblemPage";

import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";

function App(){

return(

<BrowserRouter>

<Routes>

<Route
path="/"
element={
<Loader>
<Welcome/>
</Loader>
}
/>

<Route
path="/login"
element={
<Loader>
<Login/>
</Loader>
}
/>

<Route
path="/signup"
element={
<Loader>
<Signup/>
</Loader>
}
/>



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

/* Protected Compiler */

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

/* Protected Course */

<Route
path="/practice/:language"
element={
<ProtectedRoute>
<Loader>
<CoursePage/>
</Loader>
</ProtectedRoute>
}
/>

/* Protected Problem */

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

</Routes>

</BrowserRouter>

)

}

export default App;