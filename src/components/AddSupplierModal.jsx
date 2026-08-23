import { useEffect, useState } from "react"
import { X, Building2 } from "lucide-react"

function AddSupplierModal({
  onClose,
  onAdd,
  onUpdate,
  editingSupplier,
  suppliers,
}) {
  const [supplier, setSupplier] = useState({
    company: "",
    contactPerson: "",
    email: "",
    phone: "",
  })

  const [error, setError] = useState("")

  // Load supplier when editing
  useEffect(() => {
    if (editingSupplier) {
      setSupplier({
        id: editingSupplier.id,
        company: editingSupplier.company,
        contactPerson: editingSupplier.contactPerson,
        email: editingSupplier.email,
        phone: editingSupplier.phone,
      })
    } else {
      setSupplier({
        company: "",
        contactPerson: "",
        email: "",
        phone: "",
      })
    }

    setError("")
  }, [editingSupplier])

  function handleChange(e) {
    const { name, value } = e.target

    setSupplier((prev) => ({
      ...prev,
      [name]: value,
    }))

    setError("")
  }

  function handleSave() {
    const company = supplier.company.trim()
    const contactPerson =
      supplier.contactPerson.trim()
    const email = supplier.email.trim()
    const phone = supplier.phone.trim()

    // Required fields
    if (
      !company ||
      !contactPerson ||
      !email ||
      !phone
    ) {
      setError("Please fill all fields.")
      return
    }

    // Email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.")
      return
    }

    // Check duplicate company name
    const duplicateCompany =
      suppliers.some((item) => {
        return (
          item.company.trim().toLowerCase() ===
            company.toLowerCase() &&
          item.id !== editingSupplier?.id
        )
      })

    if (duplicateCompany) {
      setError(
        "A supplier with this company name already exists."
      )
      return
    }

    const data = {
      id: editingSupplier
        ? editingSupplier.id
        : Date.now(),

      company,
      contactPerson,
      email,
      phone,
    }

    if (editingSupplier) {
      onUpdate(data)
    } else {
      onAdd(data)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Building2 size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {editingSupplier
                  ? "Edit Supplier"
                  : "Add Supplier"}
              </h2>

              <p className="text-sm text-slate-500">
                {editingSupplier
                  ? "Update supplier information"
                  : "Add a new supplier"}
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

          {/* Company */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Company Name
            </label>

            <input
              type="text"
              name="company"
              value={supplier.company}
              onChange={handleChange}
              placeholder="e.g. Tech Supplies Inc."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Contact Person */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Contact Person
            </label>

            <input
              type="text"
              name="contactPerson"
              value={supplier.contactPerson}
              onChange={handleChange}
              placeholder="e.g. John Smith"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={supplier.email}
              onChange={handleChange}
              placeholder="e.g. john@company.com"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              value={supplier.phone}
              onChange={handleChange}
              placeholder="e.g. +33 6 12 34 56 78"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
            onClick={handleSave}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            {editingSupplier
              ? "Save Changes"
              : "Add Supplier"}
          </button>

        </div>

      </div>

    </div>
  )
}

export default AddSupplierModal

