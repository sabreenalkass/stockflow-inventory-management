import {
  Pencil,
  Trash2,
} from "lucide-react"

function OrdersTable({
  orders,
  onEdit,
  onDelete,
}) {
  if (!orders || orders.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

        <div className="mb-3 text-4xl">
          🛒
        </div>

        <h3 className="text-lg font-semibold text-slate-700">
          No orders found
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Add your first order to see it here.
        </p>

      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="w-full min-w-200">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Order ID
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Product
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Quantity
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Total
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Date
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100">

            {orders.map((order) => (

              <tr
                key={order.id}
                className="transition hover:bg-slate-50"
              >

                {/* Order ID */}
                <td className="px-6 py-4">

                  <span className="font-semibold text-slate-700">
                    #{order.id}
                  </span>

                </td>

                {/* Product */}
                <td className="px-6 py-4">

                  <span className="font-medium text-slate-800">
                    {order.productName}
                  </span>

                </td>

                {/* Quantity */}
                <td className="px-6 py-4 text-slate-600">
                  {order.quantity}
                </td>

                {/* Total */}
                <td className="px-6 py-4">

                  <span className="font-semibold text-slate-800">
                    ${Number(order.total).toFixed(2)}
                  </span>

                </td>

                {/* Status */}
                <td className="px-6 py-4">

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      order.status === "Completed"
                        ? "bg-emerald-50 text-emerald-700"
                        : order.status === "Pending"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>

                </td>

                {/* Date */}
                <td className="px-6 py-4 text-sm text-slate-500">
                  {order.date}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() =>
                        onEdit(order)
                      }
                      className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                      title="Edit order"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(order.id)
                      }
                      className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                      title="Delete order"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default OrdersTable

