import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import Layout from "./components/layout/Layout"

import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Categories from "./pages/Categories"
import Suppliers from "./pages/Suppliers"
import Orders from "./pages/Orders"
import Settings from "./pages/Settings"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Application Layout */}
        <Route element={<Layout />}>

          {/* Home */}
          <Route
            index
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          {/* Dashboard */}
          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          {/* Products */}
          <Route
            path="products"
            element={<Products />}
          />

          {/* Categories */}
          <Route
            path="categories"
            element={<Categories />}
          />

          {/* Suppliers */}
          <Route
            path="suppliers"
            element={<Suppliers />}
          />

          {/* Orders */}
          <Route
            path="orders"
            element={<Orders />}
          />

          {/* Settings */}
          <Route
            path="settings"
            element={<Settings />}
          />

          {/* Unknown */}
          <Route
            path="*"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App