import { useEffect, useState } from "react"

import {
  Search,
  Bell,
  UserCircle,
  Package,
  ShoppingCart,
  AlertTriangle,
  X,
} from "lucide-react"

import { Link } from "react-router-dom"

import StockFlowLogo from "../StockFlowLogo"

function Navbar() {
  // =====================================================
  // ADMIN
  // =====================================================

  const DEFAULT_ADMIN_NAME =
    "Eng Sabreen M A AbuAlkas"

  const [adminName, setAdminName] =
    useState(DEFAULT_ADMIN_NAME)

  // =====================================================
  // DATA
  // =====================================================

  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [notifications, setNotifications] =
    useState([])

  // =====================================================
  // NOTIFICATIONS UI
  // =====================================================

  const [showNotifications, setShowNotifications] =
    useState(false)

  // =====================================================
  // LOAD SETTINGS
  // =====================================================

  useEffect(() => {
    function loadSettings() {
      try {
        const saved =
          localStorage.getItem(
            "stockflow_settings"
          )

        if (!saved) {
          if (adminName !== DEFAULT_ADMIN_NAME) {
            setAdminName(DEFAULT_ADMIN_NAME)
          }

          return
        }

        const settings = JSON.parse(saved)

        const newAdminName =
          settings?.adminName ||
          DEFAULT_ADMIN_NAME

        // IMPORTANT:
        // Don't update state if the value
        // is already the same.
        setAdminName((previous) => {
          if (previous === newAdminName) {
            return previous
          }

          return newAdminName
        })
      } catch (error) {
        console.error(
          "Error loading settings:",
          error
        )
      }
    }

    loadSettings()

    window.addEventListener(
      "settingsUpdated",
      loadSettings
    )

    window.addEventListener(
      "storage",
      loadSettings
    )

    return () => {
      window.removeEventListener(
        "settingsUpdated",
        loadSettings
      )

      window.removeEventListener(
        "storage",
        loadSettings
      )
    }
  }, [])

  // =====================================================
  // LOAD PRODUCTS + ORDERS
  // =====================================================

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

        const nextProducts =
          Array.isArray(parsedProducts)
            ? parsedProducts
            : []

        const nextOrders =
          Array.isArray(parsedOrders)
            ? parsedOrders
            : []

        // IMPORTANT:
        // Only update if the actual data changed.

        setProducts((previous) => {
          if (
            JSON.stringify(previous) ===
            JSON.stringify(nextProducts)
          ) {
            return previous
          }

          return nextProducts
        })

        setOrders((previous) => {
          if (
            JSON.stringify(previous) ===
            JSON.stringify(nextOrders)
          ) {
            return previous
          }

          return nextOrders
        })
      } catch (error) {
        console.error(
          "Error loading navbar data:",
          error
        )
      }
    }

    loadData()

    window.addEventListener(
      "productsUpdated",
      loadData
    )

    window.addEventListener(
      "ordersUpdated",
      loadData
    )

    window.addEventListener(
      "storage",
      loadData
    )

    return () => {
      window.removeEventListener(
        "productsUpdated",
        loadData
      )

      window.removeEventListener(
        "ordersUpdated",
        loadData
      )

      window.removeEventListener(
        "storage",
        loadData
      )
    }
  }, [])

  // =====================================================
  // LOAD NOTIFICATIONS
  // =====================================================

  useEffect(() => {
    function loadNotifications() {
      try {
        const saved =
          localStorage.getItem(
            "stockflow_notifications"
          )

        if (!saved) {
          setNotifications((previous) => {
            if (previous.length === 0) {
              return previous
            }

            return []
          })

          return
        }

        const parsed = JSON.parse(saved)

        const nextNotifications =
          Array.isArray(parsed)
            ? parsed
            : []

        setNotifications((previous) => {
          if (
            JSON.stringify(previous) ===
            JSON.stringify(nextNotifications)
          ) {
            return previous
          }

          return nextNotifications
        })
      } catch (error) {
        console.error(
          "Error loading notifications:",
          error
        )
      }
    }

    loadNotifications()

    window.addEventListener(
      "notificationsUpdated",
      loadNotifications
    )

    window.addEventListener(
      "storage",
      loadNotifications
    )

    return () => {
      window.removeEventListener(
        "notificationsUpdated",
        loadNotifications
      )

      window.removeEventListener(
        "storage",
        loadNotifications
      )
    }
  }, [])

  // =====================================================
  // STOCK ALERTS
  // =====================================================

  const lowStockProducts =
    products.filter(
      (product) =>
        Number(product.stock) > 0 &&
        Number(product.stock) <= 5
    )

  const outOfStockProducts =
    products.filter(
      (product) =>
        Number(product.stock) <= 0
    )

  const pendingOrders =
    orders.filter(
      (order) =>
        order.status === "Pending"
    )

  // =====================================================
  // STOCK NOTIFICATIONS
  // =====================================================

  const stockNotifications = []

  outOfStockProducts.forEach(
    (product) => {
      stockNotifications.push({
        id: `out-${product.id}`,
        type: "out",
        title: "Out of Stock",
        message:
          `${product.name} is out of stock.`,
        icon: Package,
      })
    }
  )

  lowStockProducts.forEach(
    (product) => {
      stockNotifications.push({
        id: `low-${product.id}`,
        type: "low",
        title: "Low Stock",
        message:
          `${product.name} has only ${product.stock} left.`,
        icon: AlertTriangle,
      })
    }
  )

  if (pendingOrders.length > 0) {
    stockNotifications.push({
      id: "pending-orders",
      type: "pending",
      title: "Pending Orders",
      message:
        `${pendingOrders.length} ${
          pendingOrders.length === 1
            ? "order is"
            : "orders are"
        } waiting for processing.`,
      icon: ShoppingCart,
    })
  }

  // =====================================================
  // SAVED NOTIFICATIONS
  // =====================================================

  const savedNotifications =
    notifications.map(
      (notification) => ({
        ...notification,

        icon:
          notification.type === "success"
            ? ShoppingCart
            : notification.type === "warning"
            ? AlertTriangle
            : ShoppingCart,

        title:
          notification.type === "success"
            ? "Order Completed"
            : notification.type === "warning"
            ? "Stock Alert"
            : "Order Update",
      })
    )

  const allNotifications = [
    ...savedNotifications,
    ...stockNotifications,
  ]

  const notificationCount =
    allNotifications.length

  // =====================================================
  // CLOSE NOTIFICATIONS
  // =====================================================

  function closeNotifications() {
    setShowNotifications(false)
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <header
      className="
        relative
        z-100
        flex
        h-20
        shrink-0
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white
        px-6
      "
    >
      {/* =================================================
          LOGO
      ================================================= */}

      <Link
        to="/dashboard"
        onClick={closeNotifications}
        className="
          relative
          z-110
          flex
          cursor-pointer
          items-center
          rounded-xl
          px-2
          py-1
          transition
          hover:bg-slate-50
        "
      >
        <StockFlowLogo />
      </Link>

      {/* =================================================
          RIGHT SIDE
      ================================================= */}

      <div className="relative z-110 flex items-center gap-3">

        {/* =================================================
            SEARCH
        ================================================= */}

        <div
          className="
            hidden
            items-center
            gap-2
            rounded-xl
            bg-slate-100
            px-3
            py-2.5
            md:flex
          "
        >
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              w-36
              bg-transparent
              text-sm
              text-slate-700
              outline-none
              placeholder:text-slate-400
            "
          />
        </div>

        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <div className="relative">

          <button
            type="button"
            onClick={() =>
              setShowNotifications(
                (previous) =>
                  !previous
              )
            }
            className="
              relative
              flex
              h-10
              w-10
              cursor-pointer
              items-center
              justify-center
              rounded-xl
              text-slate-600
              transition
              hover:bg-slate-100
              hover:text-blue-600
            "
          >
            <Bell size={21} />

            {notificationCount > 0 && (
              <span
                className="
                  absolute
                  right-0
                  top-0
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  px-1
                  text-[10px]
                  font-bold
                  text-white
                "
              >
                {notificationCount > 9
                  ? "9+"
                  : notificationCount}
              </span>
            )}
          </button>

          {/* =================================================
              NOTIFICATION DROPDOWN
          ================================================= */}

          {showNotifications && (
            <div
              className="
                absolute
                right-0
                top-12
                z-9999
                w-90
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-2xl
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-slate-200
                  px-5
                  py-4
                "
              >

                <div>
                  <h3 className="font-bold text-slate-800">
                    Notifications
                  </h3>

                  <p className="mt-0.5 text-xs text-slate-500">
                    StockFlow alerts
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeNotifications}
                  className="
                    flex
                    h-8
                    w-8
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-lg
                    text-slate-400
                    hover:bg-slate-100
                  "
                >
                  <X size={17} />
                </button>

              </div>

              {allNotifications.length === 0 ? (

                <div className="px-5 py-10 text-center">

                  <div
                    className="
                      mx-auto
                      mb-3
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-emerald-50
                      text-emerald-600
                    "
                  >
                    <Bell size={22} />
                  </div>

                  <p className="font-medium text-slate-700">
                    You're all caught up
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    No new notifications.
                  </p>

                </div>

              ) : (

                <div className="max-h-96 overflow-y-auto">

                  {allNotifications.map(
                    (notification) => {

                      const Icon =
                        notification.icon

                      let iconClass =
                        "bg-blue-50 text-blue-600"

                      if (
                        notification.type ===
                        "out"
                      ) {
                        iconClass =
                          "bg-red-50 text-red-600"
                      }

                      if (
                        notification.type ===
                          "low" ||
                        notification.type ===
                          "warning"
                      ) {
                        iconClass =
                          "bg-amber-50 text-amber-600"
                      }

                      if (
                        notification.type ===
                        "success"
                      ) {
                        iconClass =
                          "bg-emerald-50 text-emerald-600"
                      }

                      return (
                        <div
                          key={notification.id}
                          className="
                            flex
                            gap-3
                            border-b
                            border-slate-100
                            px-5
                            py-4
                            hover:bg-slate-50
                          "
                        >

                          <div
                            className={`
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              ${iconClass}
                            `}
                          >
                            <Icon size={19} />
                          </div>

                          <div className="min-w-0">

                            <p className="text-sm font-semibold text-slate-800">
                              {notification.title}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {notification.message}
                            </p>

                          </div>

                        </div>
                      )
                    }
                  )}

                </div>
              )}

            </div>
          )}

        </div>

        {/* =================================================
            ADMIN
            DIRECTLY TO SETTINGS
        ================================================= */}

        <Link
          to="/settings"
          onClick={closeNotifications}
          className="
            relative
            z-110
            flex
            cursor-pointer
            items-center
            gap-2
            rounded-xl
            px-2
            py-1.5
            transition
            hover:bg-slate-100
          "
        >

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-blue-50
              text-blue-600
            "
          >
            <UserCircle size={29} />
          </div>

          <div
            className="
              hidden
              max-w-47.5
              text-left
              lg:block
            "
          >

            <p className="truncate text-sm font-semibold text-slate-700">
              {adminName}
            </p>

            <p className="text-xs text-slate-400">
              Administrator
            </p>

          </div>

        </Link>

      </div>

    </header>
  )
}

export default Navbar