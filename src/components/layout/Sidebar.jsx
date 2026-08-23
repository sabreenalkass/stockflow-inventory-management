import { NavLink, Link } from "react-router-dom"

import {
  LayoutDashboard,
  ShoppingBag,
  Tags,
  Truck,
  ShoppingCart,
  Settings,
} from "lucide-react"

import StockFlowLogo from "../StockFlowLogo"

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/products",
      icon: ShoppingBag,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: Tags,
    },
    {
      name: "Suppliers",
      path: "/suppliers",
      icon: Truck,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: ShoppingCart,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ]

  return (
    <aside
      className="
        relative
        z-100
        flex
        min-h-screen
        w-64
        shrink-0
        flex-col
        bg-slate-900
        px-4
        py-6
        text-white
      "
    >
      {/* =====================================================
          LOGO
      ===================================================== */}

      <Link
        to="/dashboard"
        className="
          relative
          z-110
          mb-8
          block
          cursor-pointer
          rounded-xl
          px-3
          py-2
          transition
          hover:bg-slate-800
        "
      >
        <StockFlowLogo />
      </Link>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav
        className="
          relative
          z-110
          flex
          flex-col
          space-y-2
        "
      >
        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `
                  relative
                  z-110
                  flex
                  w-full
                  cursor-pointer
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  select-none
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }
                `
              }
            >
              <Icon
                size={19}
                className="shrink-0"
              />

              <span>
                {item.name}
              </span>
            </NavLink>
          )
        })}
      </nav>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="mt-auto pt-10">
        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-xs text-slate-400">
            StockFlow
          </p>

          <p className="mt-1 text-sm font-medium text-slate-200">
            Inventory System
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Version 1.0.0
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar