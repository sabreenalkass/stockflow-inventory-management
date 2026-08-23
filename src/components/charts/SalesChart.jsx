import { useEffect, useState } from "react"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"


function SalesChart() {

  const [orders, setOrders] = useState([])


  // =========================
  // LOAD ORDERS
  // =========================

  useEffect(() => {

    function loadOrders() {

      try {

        const saved =
          localStorage.getItem(
            "stockflow_orders"
          )

        if (!saved) {

          setOrders([])

          return

        }

        const parsed =
          JSON.parse(saved)

        setOrders(
          Array.isArray(parsed)
            ? parsed
            : []
        )

      } catch (error) {

        console.error(
          "Sales chart error:",
          error
        )

        setOrders([])

      }

    }


    loadOrders()


    // Update when orders change
    window.addEventListener(
      "focus",
      loadOrders
    )


    return () => {

      window.removeEventListener(
        "focus",
        loadOrders
      )

    }

  }, [])


  // =========================
  // MONTHS
  // =========================

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]


  // =========================
  // SALES DATA
  // =========================

  const salesByMonth = {}


  monthNames.forEach(
    (month) => {
      salesByMonth[month] = 0
    }
  )


  orders.forEach((order) => {

    // Only completed orders
    if (
      order.status !==
      "Completed"
    ) {
      return
    }


    if (!order.date) {
      return
    }


    const date =
      new Date(order.date)


    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return
    }


    const month =
      monthNames[
        date.getMonth()
      ]


    salesByMonth[month] +=
      Number(order.total) || 0

  })


  const data =
    monthNames.map(
      (month) => ({
        month,
        sales:
          salesByMonth[month],
      })
    )


  // =========================
  // TOTAL SALES
  // =========================

  const totalSales =
    data.reduce(
      (total, item) =>
        total + item.sales,
      0
    )


  // =========================
  // UI
  // =========================

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Sales Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Completed orders revenue
          </p>

        </div>


        <div className="text-right">

          <p className="text-xs text-slate-400">
            Total Sales
          </p>

          <p className="text-lg font-bold text-blue-600">

            $
            {totalSales.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}

          </p>

        </div>

      </div>


      {/* Chart */}

      <div className="h-[300px] w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                `$${value}`
              }
            />

            <Tooltip
              formatter={(value) => [
                `$${Number(value).toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                  }
                )}`,
                "Sales",
              ]}
            />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{
                r: 4,
              }}
              activeDot={{
                r: 6,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  )

}


export default SalesChart