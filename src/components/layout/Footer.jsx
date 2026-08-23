import { Link } from "react-router-dom"
import { Package } from "lucide-react"

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">

      <div className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">

        {/* Brand */}

        <div className="flex items-center gap-2">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Package size={17} />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-700">
              StockFlow
            </p>

            <p className="text-xs text-slate-400">
              Inventory Management System
            </p>
          </div>

        </div>


        {/* Links */}

        <div className="flex items-center gap-5 text-sm text-slate-500">

          <Link
            to="/dashboard"
            className="transition hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            to="/settings"
            className="transition hover:text-blue-600"
          >
            Settings
          </Link>

        </div>


        {/* Copyright / Developer */}

        <div className="text-xs text-slate-400">

          © 2026 StockFlow · Built by{" "}

          <span className="font-medium text-slate-600">
            Eng. Sabreen M. A. AbuAlkas
          </span>

        </div>

      </div>

    </footer>
  )
}

export default Footer