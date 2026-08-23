import { useEffect, useState } from "react"

import {
  Package,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
} from "lucide-react"

import StatsCard from "../components/cards/StatsCard"
import RecentOrders from "../components/tables/RecentOrders"
import SalesChart from "../components/charts/SalesChart"

function Dashboard() {

  // ==========================================
  // PRODUCTS
  // ==========================================

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("products")

      return saved
        ? JSON.parse(saved)
        : []

    } catch {
      return []
    }
  })


  // ==========================================
  // ORDERS
  // ==========================================

  const [orders, setOrders] = useState(() => {
    try {
      const saved =
        localStorage.getItem("stockflow_orders")

      return saved
        ? JSON.parse(saved)
        : []

    } catch {
      return []
    }
  })


  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {

    function loadData() {

      try {

        const savedProducts =
          localStorage.getItem("products")

        const savedOrders =
          localStorage.getItem(
            "stockflow_orders"
          )


        const parsedProducts =
          savedProducts
            ? JSON.parse(savedProducts)
            : []


        const parsedOrders =
          savedOrders
            ? JSON.parse(savedOrders)
            : []


        setProducts(
          Array.isArray(parsedProducts)
            ? parsedProducts
            : []
        )


        setOrders(
          Array.isArray(parsedOrders)
            ? parsedOrders
            : []
        )

      } catch (error) {

        console.error(
          "Dashboard loading error:",
          error
        )

      }

    }


    loadData()


    // When returning to Dashboard
    window.addEventListener(
      "focus",
      loadData
    )


    // Products / stock changed
    window.addEventListener(
      "productsUpdated",
      loadData
    )


    return () => {

      window.removeEventListener(
        "focus",
        loadData
      )

      window.removeEventListener(
        "productsUpdated",
        loadData
      )

    }

  }, [])


  // ==========================================
  // STATISTICS
  // ==========================================

  const totalProducts =
    products.length


  const totalOrders =
    orders.length


  const completedOrders =
    orders.filter(
      (order) =>
        order.status === "Completed"
    )


  const totalRevenue =
    completedOrders.reduce(
      (total, order) =>
        total +
        Number(order.total || 0),
      0
    )


  const lowStockProducts =
    products.filter(
      (product) =>
        Number(product.stock) <= 5
    )


  const lowStockCount =
    lowStockProducts.length


  // ==========================================
  // RECENT ORDERS
  // ==========================================

  const recentOrders =
    [...orders]
      .sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      )
      .slice(0, 5)


  // ==========================================
  // DASHBOARD
  // ==========================================

  return (

    <div>

      {/* Header */}

      <h1 className="mb-6 text-3xl font-bold text-slate-800">
        Dashboard
      </h1>


      {/* Stats */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
        />


        <StatsCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingCart}
        />


        <StatsCard
          title="Revenue"
          value={`$${totalRevenue.toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}`}
          icon={DollarSign}
        />


        <StatsCard
          title="Low Stock"
          value={`${lowStockCount} Items`}
          icon={AlertTriangle}
        />

      </div>


      {/* Low Stock */}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center justify-between">

          <div>

            <h2 className="text-lg font-bold text-slate-800">
              Low Stock Products
            </h2>

            <p className="text-sm text-slate-500">
              Products with 5 or fewer items remaining
            </p>

          </div>


          <AlertTriangle
            size={22}
            className="text-amber-500"
          />

        </div>


        {lowStockProducts.length === 0 ? (

          <div className="rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700">

            All products have sufficient stock.

          </div>

        ) : (

          <div className="space-y-3">

            {lowStockProducts
              .slice(0, 5)
              .map((product) => (

                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
                >

                  <div>

                    <p className="font-semibold text-slate-800">
                      {product.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {product.category}
                    </p>

                  </div>


                  <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">

                    {product.stock} left

                  </span>

                </div>

              ))}

          </div>

        )}

      </div>


      {/* Sales Chart */}

      <div className="mt-6">

        <SalesChart
          orders={orders}
        />

      </div>


      {/* Recent Orders */}

      <div className="mt-6">

        <RecentOrders
          orders={recentOrders}
        />

      </div>

    </div>
  )
}

export default Dashboard