import { lazy } from "react";

const login = lazy(() => import("../components/Auth/Login/Login"));
const dashboard = lazy(() => import("../components/Dashboard/Dashboard"));
const reports = lazy(() => import("../components/Reports/Reports"));
const plantationDashboard = lazy(() => import("../components/Plantation/PlantationDashboard"));
const updates = lazy(() => import("../components/Updates/Updates"));
const signup = lazy(() => import("../components/Auth/Signup/Signup"));
const credentials = lazy(() => import("../components/SuperAdmin/Credentials"));
const pageNotFound = lazy(() => import("../components/PageNotFound/PageNotFound"));
const forgotPassword = lazy(() => import("../components/Auth/Login/ForgotPassword/ForgotPassword"));
const enterOtp = lazy(() => import("../components/Auth/Login/EnterOtp/EnterOtp"));
const resetPassword = lazy(() => import("../components/Auth/Login/ResetPassword/ResetPassword"));
const resentEmail = lazy(() => import("../components/Auth/Login/EnterOtp/ResentEmail/ResentEmail"));
const resetSuccessful = lazy(() => import("../components/Auth/Login/ResetPassword/ResetSuccessful"));
const support = lazy(() => import("../components/SupportOrComplaint/Support"))

export const routes = [
  {
    path: "signup",
    element: signup,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "login",
    element: login,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "/",
    element: dashboard,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: "reports",
    element: reports,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: "/:companyName",
    element: plantationDashboard,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: "updates",
    element: updates,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: "credentials",
    element: credentials,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: "forgotPassword",
    element: forgotPassword,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "enterOtp",
    element: enterOtp,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "resetPassword",
    element: resetPassword,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "resetSuccessful",
    element: resetSuccessful,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "resentEmail",
    element: resentEmail,
    isPrivate: false,
    isLayout: false,
  },
  {
    path: "support",
    element: support,
    isPrivate: true,
    isLayout: true,
  },
  {
    path: "*",
    element: pageNotFound,
    isPrivate: false,
    isLayout: false,
  }
];
