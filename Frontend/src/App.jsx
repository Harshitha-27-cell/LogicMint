import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Compiler from "./pages/Compiler";
import Practice from "./pages/Practice";
import CoursePage from "./pages/CoursePage";
import ProblemPage from "./pages/ProblemPage";
import AdminDashboard from "./pages/AdminDashboard";
import CreateContest from "./pages/CreateContest";
import AdminContestHistory from "./pages/AdminContestHistory";
import ContestPage from "./pages/ContestPage";
import ContestAttempt from "./pages/ContestAttempt";
import UserProfile from "./pages/UserProfile";
import LeaderboardPage from "./pages/LeaderboardPage";
import AIAssistant from "./pages/AIAssistant";

import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Loader><Welcome /></Loader>} />
        <Route path="/login" element={<Loader><Login /></Loader>} />
        <Route path="/signup" element={<Loader><Signup /></Loader>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Loader><Home /></Loader>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice"
          element={
            <ProtectedRoute>
              <Loader><Practice /></Loader>
            </ProtectedRoute>
          }
        />
        <Route
          path="/compiler"
          element={
            <ProtectedRoute>
              <Loader><Compiler /></Loader>
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:language"
          element={
            <ProtectedRoute>
              <Loader><CoursePage /></Loader>
            </ProtectedRoute>
          }
        />
        <Route
          path="/problem/:id"
          element={
            <ProtectedRoute>
              <ProblemPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contest-page"
          element={
            <ProtectedRoute>
              <ContestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contest-attempt/:id"
          element={
            <ProtectedRoute>
              <ContestAttempt />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <LeaderboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-assistant"
          element={
            <ProtectedRoute>
              <AIAssistant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contest"
          element={
            <AdminRoute>
              <CreateContest />
            </AdminRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Loader><AdminDashboard /></Loader>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/contests"
          element={
            <AdminRoute>
              <AdminContestHistory />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
