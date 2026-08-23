import { useEffect, useState } from "react"
import {
  X,
  ShoppingCart,
} from "lucide-react"

function AddOrderModal({
  onClose,
  onAdd,
  onUpdate,
  editingOrder,
  products = [],
}) {

  const [order, setOrder] =
    useState({
      productId: "",
      productName: "",
      quantity: 1,
      total: 0,
      status: "Pending",
      date: new Date()
        .toISOString()
        .split("T")[0],
    })

  const [error, setError] =
    useState("")

  // =========================
  // LOAD EDITING ORDER
  // =========================

  useEffect(() => {

    if (editingOrder) {

      setOrder({
        id: editingOrder.id,
        productId:
          editingOrder.productId,
        productName:
          editingOrder.productName,
        quantity:
          editingOrder.quantity,
        total:
          editingOrder.total,
        status:
          editingOrder.status,
        date:
          editingOrder.date,
      })

    } else {

      setOrder({
        productId: "",
        productName: "",
        quantity: 1,
        total: 0,
        status: "Pending",
        date: new Date()
          .toISOString()
          .split("T")[0],
      })

    }

    setError("")

  }, [editingOrder])

  // =========================
  // GET PRODUCT
  // =========================

  function getSelectedProduct() {

    return products.find(
      (product) =>
        String(product.id) ===
        String(order.productId)
    )
  }

  // =========================
  // PRODUCT CHANGE
  // =========================

  function handleProductChange(e) {

    const productId =
      e.target.value

    const selectedProduct =
      products.find(
        (product) =>
          String(product.id) ===
          String(productId)
      )

    if (!selectedProduct) {

      setOrder((prev) => ({
        ...prev,
        productId: "",
        productName: "",
        total: 0,
      }))

      return
    }

    const price =
      Number(
        String(
          selectedProduct.price
        ).replace("$", "")
      ) || 0

    const quantity =
      Number(order.quantity) || 1

    setOrder((prev) => ({
      ...prev,

      productId:
        selectedProduct.id,

      productName:
        selectedProduct.name,

      total:
        price * quantity,
    }))

    setError("")
  }

  // =========================
  // QUANTITY
  // =========================

  function handleQuantityChange(e) {

    const quantity =
      Number(e.target.value)

    const selectedProduct =
      getSelectedProduct()

    const price =
      selectedProduct
        ? Number(
            String(
              selectedProduct.price
            ).replace("$", "")
          ) || 0
        : 0

    setOrder((prev) => ({
      ...prev,

      quantity,

      total:
        price * quantity,
    }))

    setError("")
  }

  // =========================
  // STATUS
  // =========================

  function handleStatusChange(e) {

    setOrder((prev) => ({
      ...prev,
      status: e.target.value,
    }))

    setError("")
  }

  // =========================
  // DATE
  // =========================

  function handleDateChange(e) {

    setOrder((prev) => ({
      ...prev,
      date: e.target.value,
    }))
  }

  // =========================
  // SAVE
  // =========================

  function handleSave() {

    const selectedProduct =
      getSelectedProduct()

    if (!selectedProduct) {

      setError(
        "Please select a product."
      )

      return
    }

    if (
      !order.quantity ||
      Number(order.quantity) <= 0
    ) {

      setError(
        "Quantity must be greater than 0."
      )

      return
    }

    if (!order.date) {

      setError(
        "Please select a date."
      )

      return
    }

    // =========================
    // STOCK VALIDATION
    // =========================

    let availableStock =
      Number(
        selectedProduct.stock
      )

    /*
      When editing a completed order,
      its old quantity is already
      removed from stock.

      So we temporarily add it back
      before checking the new quantity.
    */

    if (
      editingOrder &&
      editingOrder.status ===
        "Completed" &&
      editingOrder.productId ===
        selectedProduct.id
    ) {

      availableStock +=
        Number(
          editingOrder.quantity
        )
    }

    // Only completed orders
    // need stock validation
    if (
      order.status ===
        "Completed" &&
      Number(order.quantity) >
        availableStock
    ) {

      setError(
        `Only ${availableStock} items are available in stock.`
      )

      return
    }

    // =========================
    // PRICE
    // =========================

    const price =
      Number(
        String(
          selectedProduct.price
        ).replace("$", "")
      ) || 0

    // =========================
    // DATA
    // =========================

    const data = {

      id: editingOrder
        ? editingOrder.id
        : Date.now(),

      productId:
        selectedProduct.id,

      productName:
        selectedProduct.name,

      quantity:
        Number(order.quantity),

      total:
        price *
        Number(order.quantity),

      status:
        order.status,

      date:
        order.date,
    }

    // =========================
    // SAVE
    // =========================

    if (editingOrder) {

      onUpdate(data)

    } else {

      onAdd(data)

    }
  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

              <ShoppingCart
                size={20}
              />

            </div>

            <div>

              <h2 className="text-lg font-bold text-slate-800">

                {editingOrder
                  ? "Edit Order"
                  : "Add Order"}

              </h2>

              <p className="text-sm text-slate-500">

                {editingOrder
                  ? "Update order information"
                  : "Create a new order"}

              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >

            <X size={20} />

          </button>

        </div>

        {/* Form */}

        <div className="space-y-4 p-6">

          {/* Product */}

          <div>

            <label className="mb-1.5 block text-sm font-medium text-slate-700">

              Product

            </label>

            <select
              value={
                order.productId
              }
              onChange={
                handleProductChange
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >

              <option value="">

                Select Product

              </option>

              {products.map(
                (product) => (

                  <option
                    key={product.id}
                    value={product.id}
                  >

                    {product.name} —{" "}
                    {product.price}{" "}

                    (Stock:{" "}
                    {product.stock})

                  </option>

                )
              )}

            </select>

          </div>

          {/* Quantity */}

          <div>

            <label className="mb-1.5 block text-sm font-medium text-slate-700">

              Quantity

            </label>

            <input
              type="number"
              min="1"
              value={
                order.quantity
              }
              onChange={
                handleQuantityChange
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* Total */}

          <div className="rounded-xl bg-slate-50 p-4">

            <div className="flex items-center justify-between">

              <span className="text-sm font-medium text-slate-500">

                Total

              </span>

              <span className="text-xl font-bold text-slate-800">

                $
                {Number(
                  order.total
                ).toFixed(2)}

              </span>

            </div>

          </div>

          {/* Status */}

          <div>

            <label className="mb-1.5 block text-sm font-medium text-slate-700">

              Status

            </label>

            <select
              value={
                order.status
              }
              onChange={
                handleStatusChange
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >

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

          {/* Date */}

          <div>

            <label className="mb-1.5 block text-sm font-medium text-slate-700">

              Order Date

            </label>

            <input
              type="date"
              value={
                order.date
              }
              onChange={
                handleDateChange
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* Error */}

          {error && (

            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

              {error}

            </div>

          )}

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
          >

            Cancel

          </button>

          <button
            type="button"
            onClick={
              handleSave
            }
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >

            {editingOrder
              ? "Save Changes"
              : "Create Order"}

          </button>

        </div>

      </div>

    </div>
  )
}

export default AddOrderModal

