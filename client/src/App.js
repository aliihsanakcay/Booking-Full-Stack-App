import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import List from "./pages/list/List.jsx";
import Hotel from "./pages/hotel/Hotel.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/hotels",
    element: <List />
  },
  {
    path: "/hotels/:id",
    element: <Hotel />,
    errorElement: <h2>Note not found</h2>
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
