import { Edit, Trash2, Building2, Mail, Phone } from "lucide-react"

function SuppliersTable({
  suppliers,
  onEdit,
  onDelete,
}) {
  if (suppliers.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <Building2 size={28} />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-slate-800">
          No suppliers found
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Try another search or add a new supplier.
        </p>

      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">

        <table className="w-full text-left">

          <thead className="border-b border-slate-200 bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Company
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Contact Person
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Email
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Phone
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100">

            {suppliers.map((supplier) => (

              <tr
                key={supplier.id}
                className="transition hover:bg-slate-50"
              >

                {/* Company */}
                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Building2 size={19} />
                    </div>

                    <div>

                      <p className="font-semibold text-slate-800">
                        {supplier.company}
                      </p>

                      <p className="text-xs text-slate-400">
                        Supplier ID: {supplier.id}
                      </p>

                    </div>

                  </div>

                </td>

                {/* Contact Person */}
                <td className="px-6 py-4">

                  <p className="text-sm font-medium text-slate-700">
                    {supplier.contactPerson}
                  </p>

                </td>

                {/* Email */}
                <td className="px-6 py-4">

                  <div className="flex items-center gap-2 text-sm text-slate-600">

                    <Mail
                      size={15}
                      className="text-slate-400"
                    />

                    {supplier.email}

                  </div>

                </td>

                {/* Phone */}
                <td className="px-6 py-4">

                  <div className="flex items-center gap-2 text-sm text-slate-600">

                    <Phone
                      size={15}
                      className="text-slate-400"
                    />

                    {supplier.phone}

                  </div>

                </td>

                {/* Actions */}
                <td className="px-6 py-4">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() => onEdit(supplier)}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                      title="Edit supplier"
                    >
                      <Edit size={17} />
                    </button>

                    <button
                      onClick={() => onDelete(supplier.id)}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                      title="Delete supplier"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 p-4 md:hidden">

        {suppliers.map((supplier) => (

          <div
            key={supplier.id}
            className="rounded-xl border border-slate-200 p-4"
          >

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Building2 size={19} />
                </div>

                <div>

                  <h3 className="font-semibold text-slate-800">
                    {supplier.company}
                  </h3>

                  <p className="text-xs text-slate-400">
                    ID: {supplier.id}
                  </p>

                </div>

              </div>

              <div className="flex gap-1">

                <button
                  onClick={() => onEdit(supplier)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Edit size={16} />
                </button>

                <button
                  onClick={() => onDelete(supplier.id)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>

              </div>

            </div>

            <div className="mt-4 space-y-2">

              <div className="flex items-center gap-2 text-sm text-slate-600">

                <UsersIcon />

                {supplier.contactPerson}

              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">

                <Mail size={15} className="text-slate-400" />

                {supplier.email}

              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">

                <Phone size={15} className="text-slate-400" />

                {supplier.phone}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

function UsersIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-slate-400"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

export default SuppliersTable

