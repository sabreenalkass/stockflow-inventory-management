function RecentOrders({ orders = [] }) {

  // آخر 5 طلبات
  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    )
    .slice(0, 5)


  // Status style
  function getStatusStyle(status) {

    switch (status) {

      case "Completed":
        return "bg-emerald-50 text-emerald-600"

      case "Pending":
        return "bg-amber-50 text-amber-600"

      case "Cancelled":
        return "bg-red-50 text-red-600"

      case "Shipped":
        return "bg-blue-50 text-blue-600"

      default:
        return "bg-slate-100 text-slate-600"

    }

  }


  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-5 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest orders in your inventory system
          </p>

        </div>

      </div>


      {/* Empty */}

      {recentOrders.length === 0 ? (

        <div className="rounded-xl bg-slate-50 py-10 text-center">

          <p className="text-sm font-medium text-slate-600">
            No orders yet
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Create an order to see it here.
          </p>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>

              <tr className="border-b border-slate-200 text-sm text-slate-500">

                <th className="pb-3 font-medium">
                  Order ID
                </th>

                <th className="pb-3 font-medium">
                  Product
                </th>

                <th className="pb-3 font-medium">
                  Quantity
                </th>

                <th className="pb-3 font-medium">
                  Status
                </th>

                <th className="pb-3 text-right font-medium">
                  Total
                </th>

              </tr>

            </thead>


            <tbody>

              {recentOrders.map(
                (order) => (

                  <tr
                    key={order.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >

                    {/* Order ID */}

                    <td className="py-4 text-sm font-semibold text-slate-700">

                      #{String(
                        order.id
                      ).slice(-4)}

                    </td>


                    {/* Product */}

                    <td className="py-4">

                      <p className="text-sm font-medium text-slate-800">

                        {order.productName ||
                          "Unknown Product"}

                      </p>

                      <p className="text-xs text-slate-400">

                        {order.date}

                      </p>

                    </td>


                    {/* Quantity */}

                    <td className="py-4 text-sm text-slate-600">

                      {order.quantity}

                    </td>


                    {/* Status */}

                    <td className="py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          order.status
                        )}`}
                      >

                        {order.status}

                      </span>

                    </td>


                    {/* Total */}

                    <td className="py-4 text-right text-sm font-semibold text-slate-800">

                      $
                      {Number(
                        order.total || 0
                      ).toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>

  )

}

export default RecentOrders