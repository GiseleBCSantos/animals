import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { ParallaxProviderWrapper } from "@/components/providers/parallax-provider"
import { QueryProvider } from "@/lib/providers/query-provider"
import HomePage from "@/pages/home"
import LoginPage from "@/pages/login"
import RegisterPage from "@/pages/register"
import ForgotPasswordPage from "@/pages/forgot-password"
import DashboardPage from "@/pages/dashboard"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <QueryProvider>
      <ParallaxProviderWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </ParallaxProviderWrapper>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </QueryProvider>
  )
}

export default App
