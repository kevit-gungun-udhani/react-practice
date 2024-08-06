import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import Products from "./pages/Products";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ProductDetail from "./pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {path: '/', element: <HomePage/>},
      {path: '/products', element: <Products/>},
      {path: '/products/:id', element: <ProductDetail/>}
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
