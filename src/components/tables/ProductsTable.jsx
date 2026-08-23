function ProductsTable({
  products,
  onDelete,
  onEdit,
}) {

  // =========================
  // STOCK STATUS
  // =========================

  function getStockStatus(stock) {
    const quantity =
      Number(stock) || 0

    if (quantity === 0) {
      return {
        label: "Out of Stock",
        className:
          "bg-red-100 text-red-600",
        stockClass:
          "text-red-600 font-bold",
      }
    }

    if (quantity <= 5) {
      return {
        label: "Low Stock",
        className:
          "bg-amber-100 text-amber-600",
        stockClass:
          "text-amber-600 font-bold",
      }
    }

    return {
      label: "In Stock",
      className:
        "bg-emerald-100 text-emerald-600",
      stockClass:
        "text-emerald-600 font-semibold",
    }
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-5 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Products
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your inventory
          </p>

        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
          {products.length} Products
        </span>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead>

            <tr className="border-b border-slate-200 text-sm text-slate-500">

              <th className="pb-3">
                Name
              </th>

              <th className="pb-3">
                Category
              </th>

              <th className="pb-3">
                Supplier
              </th>

              <th className="pb-3">
                Price
              </th>

              <th className="pb-3">
                Stock
              </th>

              <th className="pb-3">
                Status
              </th>

              <th className="pb-3">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="py-10 text-center text-slate-500"
                >
                  No products found
                </td>

              </tr>

            ) : (

              products.map((product) => {

                const status =
                  getStockStatus(
                    product.stock
                  )

                return (

                  <tr
                    key={product.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >

                    {/* Name */}

                    <td className="py-4 font-medium text-slate-800">
                      {product.name}
                    </td>

                    {/* Category */}

                    <td className="text-slate-600">
                      {product.category}
                    </td>

                    {/* Supplier */}

                    <td className="text-slate-600">
                      {product.supplier ||
                        "Not Assigned"}
                    </td>

                    {/* Price */}

                    <td className="font-medium text-slate-700">
                      {product.price}
                    </td>

                    {/* Stock */}

                    <td>

                      <span
                        className={
                          status.stockClass
                        }
                      >
                        {product.stock}
                      </span>

                    </td>

                    {/* Status */}

                    <td>

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${status.className}`}
                      >
                        {status.label}
                      </span>

                    </td>

                    {/* Actions */}

                    <td>

                      <button
                        onClick={() =>
                          onEdit(product)
                        }
                        className="mr-2 rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-amber-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          onDelete(product.id)
                        }
                        className="rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-600"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                )
              })

            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default ProductsTable