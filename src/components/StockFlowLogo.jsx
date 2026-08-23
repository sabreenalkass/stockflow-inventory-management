import {
  Package,
  ArrowRight,
} from "lucide-react"

function StockFlowLogo({ collapsed = false }) {
  return (
    <div className="group flex items-center gap-3">

      {/* Logo Icon */}

      <div
        className="
          relative
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          bg-linear-to-br
          from-blue-500
          via-blue-600
          to-indigo-600
          shadow-lg
          shadow-blue-600/25
          transition-all
          duration-300
          group-hover:scale-105
          group-hover:shadow-xl
          group-hover:shadow-blue-600/35
        "
      >

        {/* Glow */}

        <div
          className="
            absolute
            inset-0
            rounded-2xl
            bg-white/10
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />

        {/* Flow Line */}

        <div
          className="
            absolute
            -right-2
            bottom-1
            h-8
            w-8
            rotate-45
            rounded-lg
            border-2
            border-white/20
            transition-transform
            duration-500
            group-hover:translate-x-1
            group-hover:-translate-y-1
          "
        />

        {/* Package */}

        <Package
          size={22}
          strokeWidth={2.2}
          className="
            relative
            z-10
            text-white
            transition-transform
            duration-500
            group-hover:-translate-y-0.5
          "
        />

        {/* Small Flow Arrow */}

        <ArrowRight
          size={11}
          strokeWidth={3}
          className="
            absolute
            bottom-1.5
            right-1.5
            z-20
            text-white
            transition-all
            duration-500
            group-hover:translate-x-0.5
          "
        />

      </div>

      {/* Brand */}

      {!collapsed && (
        <div className="min-w-0">

          <div
            className="
              text-xl
              font-extrabold
              leading-none
              tracking-tight
            "
          >
            <span className="text-slate-800">
              Stock
            </span>

            <span className="text-blue-600">
              Flow
            </span>
          </div>

          <p
            className="
              mt-1
              text-[10px]
              font-medium
              uppercase
              tracking-[0.16em]
              text-slate-400
            "
          >
            Inventory Management
          </p>

        </div>
      )}

    </div>
  )
}

export default StockFlowLogo