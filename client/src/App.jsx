import { BrowserRouter as Router, Routes, Route } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import GetAllBatch from "./pages/Batch/GetAllBatch";
import AllStudents from "./pages/Students/AllStudents";
import AllFee from "./pages/StudentFee/AllFee";
import Home from "./pages/Dashboard/Home";
import UpdateBatch from "./pages/Batch/UpdateBatch";
import CreateStudents from "./pages/Students/CreateStudents";
import UpdateStudent from "./pages/Students/UpdateStudent";
import StudentFee from "./pages/StudentFee/StudentFee";
import UpdateFee from "./pages/StudentFee/UpdateFee";
import ProtectedRoute from "./context/ProtectedRoute";
import DetailStudentFee from "./pages/StudentFee/DetailStudentFee";
import BatchCreate from "./pages/Batch/BatchCreate";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index path="/" element={<Home />} />
            <Route path="/batch" element={<GetAllBatch />} />
            <Route path="/create-batch" element={<BatchCreate />} />
            <Route path="/update-batch/:id" element={<UpdateBatch />} />
            <Route path="/student" element={<AllStudents />} />
            <Route path="/create-student" element={<CreateStudents />} />
            <Route path="/update-student/:id" element={<UpdateStudent />} />
            <Route path="/student-fee" element={<AllFee />} />
            <Route path="/create-fee" element={<StudentFee />} />
            <Route path="/update-student-fee/:id" element={<UpdateFee />} />
            <Route
              path="/detail-student-fee/:id"
              element={<DetailStudentFee />}
            />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
