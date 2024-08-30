import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Signup from "./pages/Signup";

import AppLayout from "./components/UI/AppLayout";
import Login from "./pages/Login";
import Schedules from "./pages/Schedules";
import User from "./pages/User";

import { ConfigProvider, theme } from "antd";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/UI/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Notes from "./pages/Notes";
import Schedule from "./pages/Schedule";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const { mode } = useSelector((store) => store.user);
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ConfigProvider
        theme={{
          algorithm:
            mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
          // 1. Use dark algorithm
          // 2. Combine dark algorithm and compact algorithm
          // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="schedules" element={<Schedules />} />
              <Route path="schedules/:scheduleId" element={<Schedule />} />
              <Route path="user" element={<User />} />
              <Route path="notes" element={<Notes />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="error" element={<Error />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#eff6ff",
            color: "#1d4ed8",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
