import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AddEditUser from "./pages/AddEditUser";

function App() {
  const appRouter=createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/add",
      element:<AddEditUser/>
    },
    {
      path:"/update/:id",
      element:<AddEditUser/>
    }
  ])
  return (
    <div className="App">
      
      <RouterProvider router={appRouter}/>
  </div>
  );
}

export default App;
