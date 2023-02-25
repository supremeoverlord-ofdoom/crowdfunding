import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage";

// Components
import Nav from "./components/Nav/Nav";

// CSS
import "./App.css";
import { useState } from "react";
const HeaderLayout = () => {

  const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem("token") != null)
  return (
    <>
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet context={[loggedIn, setLoggedIn]} />
    </>
  );
}


const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      {path: "/login", element: <LoginPage /> },
      { path: "/project/:id", element: <ProjectPage /> }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;