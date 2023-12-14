import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Notes from "./routes/Notes";
import UserContextProvider from "./components/UserContextProvider";
import RequireAuth from "./components/RequireAuth";
import CreateNotes from "./routes/CreateNotes";
import Layout from "./components/Layout";
import EditNote from "./routes/EditNote";
import NotFound from "./routes/NotFound";
import Note from "./routes/Note";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create-note",
        element: <CreateNotes />,
      },
      {
        path: "/notes",
        element: <Notes />,
      },
      {
        path: "/edit-note/:id",
        element: <EditNote />,
      },
      {
        path: "/notes/:id",
        element: <Note />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}
