import { useEffect, useState } from "react"
import {
  User,
  Mail,
  Building2,
  DollarSign,
  Package,
  Save,
} from "lucide-react"

function Settings() {
  const [settings, setSettings] = useState({
    adminName: "Eng Sabreen M A AbuAlkas",
    email: "admin@stockflow.com",
    companyName: "StockFlow",
    currency: "USD",
    lowStockThreshold: 5,
  })

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedSettings =
      localStorage.getItem("stockflow_settings")

    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch {
        console.error("Error loading settings")
      }
    }
  }, [])

  function handleChange(e) {
    const { name, value } = e.target

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }))

    setSaved(false)
  }

  function handleSave() {
    localStorage.setItem(
      "stockflow_settings",
      JSON.stringify(settings)
    )

    window.dispatchEvent(
      new Event("settingsUpdated")
    )

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2500)
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your StockFlow account and system settings
        </p>
      </div>

      {/* Profile */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <User size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Admin Profile
            </h2>

            <p className="text-sm text-slate-500">
              Manage your administrator information
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Admin Name */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Admin Name
            </label>

            <div className="relative">

              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                name="adminName"
                value={settings.adminName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

            </div>
          </div>

          {/* Email */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                name="email"
                type="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

            </div>
          </div>

        </div>

      </div>

      {/* Company */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Building2 size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Company Settings
            </h2>

            <p className="text-sm text-slate-500">
              Configure your inventory company
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Company Name */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Company Name
            </label>

            <input
              name="companyName"
              value={settings.companyName}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Currency */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Currency
            </label>

            <div className="relative">

              <DollarSign
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="USD">
                  USD - US Dollar
                </option>

                <option value="EUR">
                  EUR - Euro
                </option>

                <option value="GBP">
                  GBP - British Pound
                </option>
              </select>

            </div>
          </div>

        </div>

      </div>

      {/* Inventory */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Package size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Inventory Settings
            </h2>

            <p className="text-sm text-slate-500">
              Configure stock alerts
            </p>
          </div>

        </div>

        <div className="max-w-md">

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Low Stock Threshold
          </label>

          <input
            name="lowStockThreshold"
            type="number"
            min="0"
            value={settings.lowStockThreshold}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            Products at or below this quantity will be marked as low stock.
          </p>

        </div>

      </div>

      {/* Save */}

      <div className="flex items-center justify-end gap-4">

        {saved && (
          <span className="text-sm font-medium text-emerald-600">
            Settings saved successfully ✓
          </span>
        )}

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Save size={18} />
          Save Settings
        </button>

      </div>

    </div>
  )
}

export default Settings