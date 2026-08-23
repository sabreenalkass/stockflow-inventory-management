import { Outlet } from "react-router-dom"

import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import Footer from "./Footer"

function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="min-w-0 flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  )
}

export default Layout