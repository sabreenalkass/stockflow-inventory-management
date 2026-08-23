import { useEffect, useState } from "react"
import {
  Plus,
  Search,
  Users,
  Building2,
} from "lucide-react"

import SuppliersTable from "../components/tables/SuppliersTable"
import AddSupplierModal from "../components/AddSupplierModal"

const SUPPLIER_STORAGE_KEY = "stockflow_suppliers"

const defaultSuppliers = [
  {
    id: 1,
    company: "Tech Supplies Inc.",
    contactPerson: "John Smith",
    email: "john@techsupplies.com",
    phone: "+1 555 123 4567",
  },
  {
    id: 2,
    company: "Global Electronics",
    contactPerson: "Sarah Johnson",
    email: "sarah@globalelectronics.com",
    phone: "+1 555 987 6543",
  },
]

function Suppliers() {
  // =========================
  // SUPPLIERS
  // =========================

  const [suppliers, setSuppliers] = useState(() => {
    try {
      const saved = localStorage.getItem(
        SUPPLIER_STORAGE_KEY
      )

      if (!saved) {
        return defaultSuppliers
      }

      const parsed = JSON.parse(saved)

      return Array.isArray(parsed)
        ? parsed
        : defaultSuppliers
    } catch (error) {
      console.error(
        "Error loading suppliers:",
        error
      )

      return defaultSuppliers
    }
  })

  // =========================
  // UI STATE
  // =========================

  const [searchTerm, setSearchTerm] = useState("")

  const [isModalOpen, setIsModalOpen] =
    useState(false)

  const [editingSupplier, setEditingSupplier] =
    useState(null)

  // =========================
  // SAVE SUPPLIERS
  // =========================

  useEffect(() => {
    try {
      localStorage.setItem(
        SUPPLIER_STORAGE_KEY,
        JSON.stringify(suppliers)
      )
    } catch (error) {
      console.error(
        "Error saving suppliers:",
        error
      )
    }
  }, [suppliers])

  // =========================
  // ADD SUPPLIER
  // =========================

  function handleAddSupplier(newSupplier) {
    const supplier = {
      ...newSupplier,
      id: Date.now(),
    }

    setSuppliers((prev) => [
      ...prev,
      supplier,
    ])

    setIsModalOpen(false)
  }

  // =========================
  // EDIT SUPPLIER
  // =========================

  function handleEdit(supplier) {
    setEditingSupplier(supplier)
    setIsModalOpen(true)
  }

  // =========================
  // UPDATE SUPPLIER
  // =========================

  function handleUpdateSupplier(
    updatedSupplier
  ) {
    setSuppliers((prev) =>
      prev.map((supplier) =>
        supplier.id === updatedSupplier.id
          ? updatedSupplier
          : supplier
      )
    )

    setEditingSupplier(null)
    setIsModalOpen(false)
  }

  // =========================
  // DELETE SUPPLIER
  // =========================

  function handleDelete(id) {
    const supplier = suppliers.find(
      (supplier) => supplier.id === id
    )

    if (!supplier) return

    const confirmed = window.confirm(
      `Are you sure you want to delete "${supplier.company}"?`
    )

    if (!confirmed) return

    setSuppliers((prev) =>
      prev.filter(
        (supplier) => supplier.id !== id
      )
    )
  }

  // =========================
  // SEARCH
  // =========================

  const filteredSuppliers =
    suppliers.filter((supplier) => {
      const search =
        searchTerm.toLowerCase()

      return (
        supplier.company
          .toLowerCase()
          .includes(search) ||
        supplier.contactPerson
          .toLowerCase()
          .includes(search) ||
        supplier.email
          .toLowerCase()
          .includes(search) ||
        supplier.phone
          .toLowerCase()
          .includes(search)
      )
    })

  // =========================
  // RENDER
  // =========================

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Suppliers
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your suppliers and contact information
          </p>
        </div>

        <button
          onClick={() => {
            setEditingSupplier(null)
            setIsModalOpen(true)
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Plus size={18} />

          Add Supplier
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* Total Suppliers */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Suppliers
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-800">
                {suppliers.length}
              </p>
            </div>

            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <Users size={22} />
            </div>

          </div>

        </div>

        {/* Companies */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Companies
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-800">
                {
                  new Set(
                    suppliers.map(
                      (supplier) =>
                        supplier.company
                    )
                  ).size
                }
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <Building2 size={22} />
            </div>

          </div>

        </div>

      </div>

      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="relative max-w-md">

          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search suppliers..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />

        </div>

      </div>

      {/* Suppliers Table */}
      <SuppliersTable
        suppliers={filteredSuppliers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      {isModalOpen && (
        <AddSupplierModal
          editingSupplier={editingSupplier}
          suppliers={suppliers}
          onAdd={handleAddSupplier}
          onUpdate={handleUpdateSupplier}
          onClose={() => {
            setIsModalOpen(false)
            setEditingSupplier(null)
          }}
        />
      )}

    </div>
  )
}

export default Suppliers