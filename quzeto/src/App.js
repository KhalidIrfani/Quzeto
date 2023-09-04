import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Reset from './Pages/Reset'
import Home from './Pages/StaticsPage/Home';
import Privacy from './Pages/StaticsPage/Privacy';
import Terms from './Pages/StaticsPage/Terms';
import Payment from './Pages/StaticsPage/Payment';
import FAQ from './Pages/StaticsPage/FAQ';
import Career from './Pages/StaticsPage/Career';
import ProtectedRoute from './routes/protectedRoute';
import Dasboard from './Pages/Dasboard';
import { useEffect } from 'react';
import Store from './redux/store';
import { loaduser } from './redux/action/user';
import QuestionTypes from './Pages/QuestionTypes';
import Schedule from './Pages/Schedule';
import AttemptQuiz from './Pages/AttemptQuiz';
import Showresult from './components/Question/Showresult';
import Profile from './components/Profile';
import UpdateSchedule from './components/Schedule/UpdateSchedule';
import PlayQuiz from './components/PlayQuiz';
import DashboardComp from './components/DashboardComp';
import UserManagement from './components/UserManagement';
import Admincontrol from './components/Admincontrol';
import Adminschedule from './components/Adminschedule';
import UserSchedulequiz from './components/Schedule/UserSchedulequiz';
import Quizpackg from './components/Quizpackg';

function App() {


  useEffect(() => {
    Store.dispatch(loaduser())
  })


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/reset' element={<Reset />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/career' element={<Career />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardComp />
            </ProtectedRoute>
          } />

          <Route path='/questiontype' element={
            <ProtectedRoute>
              <QuestionTypes />
            </ProtectedRoute>
          } />

          <Route path='/schedule' element={
            <ProtectedRoute>
              <Schedule />
            </ProtectedRoute>
          } />

          <Route path='/packages' element={
            <ProtectedRoute>
              <Quizpackg/>
            </ProtectedRoute>
          } />

          <Route path="/attemptquiz/:scheduleId" element={
            <ProtectedRoute>
              <AttemptQuiz />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/result/:id" element={
            <ProtectedRoute>
              <Showresult />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          <Route path="/updateschedule/:scheduleId" element={
            <ProtectedRoute>
              <UpdateSchedule />
            </ProtectedRoute>
          } />


          <Route path="/playquiz" element={
            <ProtectedRoute>
              <PlayQuiz />
            </ProtectedRoute>
          } />

          <Route path="/userschedule" element={
            <ProtectedRoute>
              <UserSchedulequiz />
            </ProtectedRoute>
          } />


          <Route path="/manageuser" element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          } />

          <Route path="/adminschedule" element={
            <ProtectedRoute>
              <Adminschedule />
            </ProtectedRoute>
          } />

          <Route path="/updateUserdata/:id" element={
            <ProtectedRoute>
              <Admincontrol />
            </ProtectedRoute>
          } />






        </Routes>


        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </>
  );
}

export default App;
