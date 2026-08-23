import { useEffect, useState } from "react"

import {
  Plus,
  Search,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"

import OrdersTable from "../components/tables/OrdersTable"
import AddOrderModal from "../components/AddOrderModal"

const ORDERS_STORAGE_KEY = "stockflow_orders"
const PRODUCTS_STORAGE_KEY = "products"
const NOTIFICATIONS_STORAGE_KEY =
  "stockflow_notifications"

function Orders() {
  // ==========================================
  // PRODUCTS
  // ==========================================

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(
        PRODUCTS_STORAGE_KEY
      )

      if (!saved) {
        return []
      }

      const parsed = JSON.parse(saved)

      return Array.isArray(parsed)
        ? parsed
        : []
    } catch (error) {
      console.error(
        "Error loading products:",
        error
      )

      return []
    }
  })

  // ==========================================
  // ORDERS
  // ==========================================

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(
        ORDERS_STORAGE_KEY
      )

      if (!saved) {
        return []
      }

      const parsed = JSON.parse(saved)

      return Array.isArray(parsed)
        ? parsed
        : []
    } catch (error) {
      console.error(
        "Error loading orders:",
        error
      )

      return []
    }
  })

  // ==========================================
  // UI
  // ==========================================

  const [search, setSearch] = useState("")

  const [statusFilter, setStatusFilter] =
    useState("All")

  const [openModal, setOpenModal] =
    useState(false)

  const [editingOrder, setEditingOrder] =
    useState(null)

  // ==========================================
  // SAVE ORDERS
  // ==========================================

  useEffect(() => {
    localStorage.setItem(
      ORDERS_STORAGE_KEY,
      JSON.stringify(orders)
    )

    window.dispatchEvent(
      new Event("ordersUpdated")
    )
  }, [orders])

  // ==========================================
  // SAVE PRODUCTS
  // ==========================================

  useEffect(() => {
    localStorage.setItem(
      PRODUCTS_STORAGE_KEY,
      JSON.stringify(products)
    )

    window.dispatchEvent(
      new Event("productsUpdated")
    )
  }, [products])

  // ==========================================
  // LOAD PRODUCTS
  // ==========================================

  useEffect(() => {
    function loadProducts() {
      try {
        const saved =
          localStorage.getItem(
            PRODUCTS_STORAGE_KEY
          )

        const parsed = saved
          ? JSON.parse(saved)
          : []

        const nextProducts =
          Array.isArray(parsed)
            ? parsed
            : []

        // IMPORTANT:
        // Only update state when the actual
        // product data has changed.
        setProducts((previousProducts) => {
          const previousData =
            JSON.stringify(
              previousProducts
            )

          const nextData =
            JSON.stringify(
              nextProducts
            )

          if (
            previousData ===
            nextData
          ) {
            return previousProducts
          }

          return nextProducts
        })
      } catch (error) {
        console.error(
          "Error loading products:",
          error
        )
      }
    }

    loadProducts()

    window.addEventListener(
      "productsUpdated",
      loadProducts
    )

    window.addEventListener(
      "storage",
      loadProducts
    )

    return () => {
      window.removeEventListener(
        "productsUpdated",
        loadProducts
      )

      window.removeEventListener(
        "storage",
        loadProducts
      )
    }
  }, [])

  // ==========================================
  // CREATE NOTIFICATION
  // ==========================================

  function createNotification(
    message,
    type = "info"
  ) {
    try {
      const saved =
        localStorage.getItem(
          NOTIFICATIONS_STORAGE_KEY
        )

      const notifications = saved
        ? JSON.parse(saved)
        : []

      const notification = {
        id:
          Date.now() +
          Math.random(),

        message,

        type,

        date:
          new Date().toISOString(),

        read: false,
      }

      const updatedNotifications = [
        notification,
        ...notifications,
      ].slice(0, 20)

      localStorage.setItem(
        NOTIFICATIONS_STORAGE_KEY,
        JSON.stringify(
          updatedNotifications
        )
      )

      window.dispatchEvent(
        new Event("notificationsUpdated")
      )
    } catch (error) {
      console.error(
        "Notification error:",
        error
      )
    }
  }

  // ==========================================
  // ADD ORDER
  // ==========================================

  function handleAddOrder(order) {
    const newOrder = {
      id: Date.now(),
      ...order,
    }

    setOrders((prevOrders) => [
      ...prevOrders,
      newOrder,
    ])

    createNotification(
      `New order created for ${order.productName}`,
      "order"
    )

    // ========================================
    // COMPLETED ORDER → REDUCE STOCK
    // ========================================

    if (order.status === "Completed") {
      setProducts((prevProducts) => {
        return prevProducts.map(
          (product) => {
            if (
              String(product.id) ===
              String(order.productId)
            ) {
              const newStock =
                Math.max(
                  0,
                  Number(product.stock) -
                    Number(order.quantity)
                )

              if (newStock <= 5) {
                createNotification(
                  `${product.name} is low in stock (${newStock} left)`,
                  "warning"
                )
              }

              return {
                ...product,
                stock: newStock,
              }
            }

            return product
          }
        )
      })

      createNotification(
        `Order completed: ${order.productName}`,
        "success"
      )
    }

    setOpenModal(false)
  }

  // ==========================================
  // UPDATE ORDER
  // ==========================================

  function handleUpdateOrder(
    updatedOrder
  ) {
    const oldOrder =
      orders.find(
        (order) =>
          order.id ===
          updatedOrder.id
      )

    if (!oldOrder) {
      return
    }

    setProducts((prevProducts) => {
      return prevProducts.map(
        (product) => {
          let newStock =
            Number(product.stock)

          // ==================================
          // RETURN OLD COMPLETED STOCK
          // ==================================

          if (
            oldOrder.status ===
              "Completed" &&
            String(product.id) ===
              String(
                oldOrder.productId
              )
          ) {
            newStock +=
              Number(
                oldOrder.quantity
              )
          }

          // ==================================
          // REMOVE NEW COMPLETED STOCK
          // ==================================

          if (
            updatedOrder.status ===
              "Completed" &&
            String(product.id) ===
              String(
                updatedOrder.productId
              )
          ) {
            newStock -=
              Number(
                updatedOrder.quantity
              )
          }

          return {
            ...product,
            stock: Math.max(
              0,
              newStock
            ),
          }
        }
      )
    })

    setOrders((prevOrders) => {
      return prevOrders.map(
        (order) =>
          order.id ===
          updatedOrder.id
            ? updatedOrder
            : order
      )
    })

    createNotification(
      `Order ${updatedOrder.id} was updated`,
      "order"
    )

    if (
      updatedOrder.status ===
        "Completed" &&
      oldOrder.status !==
        "Completed"
    ) {
      createNotification(
        `Order completed: ${updatedOrder.productName}`,
        "success"
      )
    }

    setEditingOrder(null)
    setOpenModal(false)
  }

  // ==========================================
  // DELETE ORDER
  // ==========================================

  function handleDeleteOrder(id) {
    const orderToDelete =
      orders.find(
        (order) =>
          order.id === id
      )

    if (!orderToDelete) {
      return
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this order?"
      )

    if (!confirmed) {
      return
    }

    // ========================================
    // RETURN STOCK
    // ========================================

    if (
      orderToDelete.status ===
      "Completed"
    ) {
      setProducts(
        (prevProducts) => {
          return prevProducts.map(
            (product) => {
              if (
                String(product.id) ===
                String(
                  orderToDelete.productId
                )
              ) {
                return {
                  ...product,

                  stock:
                    Number(
                      product.stock
                    ) +
                    Number(
                      orderToDelete.quantity
                    ),
                }
              }

              return product
            }
          )
        }
      )
    }

    // ========================================
    // DELETE ORDER
    // ========================================

    setOrders((prevOrders) =>
      prevOrders.filter(
        (order) =>
          order.id !== id
      )
    )

    createNotification(
      `Order for ${orderToDelete.productName} was deleted`,
      "order"
    )
  }

  // ==========================================
  // EDIT ORDER
  // ==========================================

  function handleEditOrder(order) {
    setEditingOrder(order)
    setOpenModal(true)
  }

  // ==========================================
  // CLOSE MODAL
  // ==========================================

  function closeModal() {
    setOpenModal(false)
    setEditingOrder(null)
  }

  // ==========================================
  // SEARCH + FILTER
  // ==========================================

  const filteredOrders =
    orders.filter((order) => {
      const searchValue =
        search.toLowerCase()

      const productName =
        order.productName
          ?.toLowerCase() || ""

      const matchSearch =
        productName.includes(
          searchValue
        )

      const matchStatus =
        statusFilter === "All" ||
        order.status ===
          statusFilter

      return (
        matchSearch &&
        matchStatus
      )
    })

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalOrders =
    orders.length

  const pendingOrders =
    orders.filter(
      (order) =>
        order.status ===
        "Pending"
    ).length

  const completedOrders =
    orders.filter(
      (order) =>
        order.status ===
        "Completed"
    ).length

  const cancelledOrders =
    orders.filter(
      (order) =>
        order.status ===
        "Cancelled"
    ).length

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Orders
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and track your orders
          </p>
        </div>

        <button
          onClick={() => {
            setEditingOrder(null)
            setOpenModal(true)
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />

          Add Order
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Total Orders */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Total Orders
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-800">
                {totalOrders}
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <ShoppingCart size={22} />
            </div>

          </div>

        </div>

        {/* Pending */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Pending
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-800">
                {pendingOrders}
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <Clock size={22} />
            </div>

          </div>

        </div>

        {/* Completed */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Completed
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-800">
                {completedOrders}
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <CheckCircle size={22} />
            </div>

          </div>

        </div>

        {/* Cancelled */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Cancelled
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-800">
                {cancelledOrders}
              </p>
            </div>

            <div className="rounded-xl bg-red-50 p-3 text-red-600">
              <XCircle size={22} />
            </div>

          </div>

        </div>

      </div>

      {/* Search + Filter */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="flex flex-col gap-3 sm:flex-row">

          <div className="relative flex-1">

            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >

            <option value="All">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="Cancelled">
              Cancelled
            </option>

          </select>

        </div>

      </div>

      {/* Orders Table */}

      <OrdersTable
        orders={filteredOrders}
        onEdit={handleEditOrder}
        onDelete={handleDeleteOrder}
      />

      {/* Add / Edit Order Modal */}

      {openModal && (
        <AddOrderModal
          products={products}
          editingOrder={editingOrder}
          onAdd={handleAddOrder}
          onUpdate={handleUpdateOrder}
          onClose={closeModal}
        />
      )}

    </div>
  )
}

export default Orders