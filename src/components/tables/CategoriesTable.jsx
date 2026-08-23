import { Edit, Trash2, Package, FolderOpen } from "lucide-react"

function CategoriesTable({
  categories,
  products,
  onEdit,
  onDelete,
}) {
  const getProductCount = (categoryName) => {
    return products.filter(
      (product) =>
        product.category?.toLowerCase() ===
        categoryName.toLowerCase()
    ).length
  }

  if (categories.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <FolderOpen size={28} />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-slate-800">
          No categories found
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Try another search or add a new category.
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
                Category
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Description
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Products
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">

            {categories.map((category) => {

              const productCount = getProductCount(
                category.name
              )

              return (
                <tr
                  key={category.id}
                  className="transition hover:bg-slate-50"
                >

                  {/* Category */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <FolderOpen size={19} />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {category.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          Category ID: {category.id}
                        </p>
                      </div>

                    </div>

                  </td>

                  {/* Description */}
                  <td className="px-6 py-4">

                    <p className="max-w-sm truncate text-sm text-slate-600">
                      {category.description || "No description"}
                    </p>

                  </td>

                  {/* Products */}
                  <td className="px-6 py-4">

                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">

                      <Package size={15} />

                      {productCount}

                      {productCount === 1
                        ? " Product"
                        : " Products"}
                    </div>

                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">

                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() => onEdit(category)}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                        title="Edit category"
                      >
                        <Edit size={17} />
                      </button>

                      <button
                        onClick={() => onDelete(category.id)}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                        title="Delete category"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </td>

                </tr>
              )
            })}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 p-4 md:hidden">

        {categories.map((category) => {

          const productCount = getProductCount(
            category.name
          )

          return (
            <div
              key={category.id}
              className="rounded-xl border border-slate-200 p-4"
            >

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <FolderOpen size={19} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {category.name}
                    </h3>

                    <p className="text-xs text-slate-400">
                      ID: {category.id}
                    </p>
                  </div>

                </div>

                <div className="flex gap-1">

                  <button
                    onClick={() => onEdit(category)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    onClick={() => onDelete(category.id)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </div>

              <p className="mt-3 text-sm text-slate-600">
                {category.description || "No description"}
              </p>

              <div className="mt-3">

                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">

                  <Package size={14} />

                  {productCount}

                  {productCount === 1
                    ? " Product"
                    : " Products"}

                </span>

              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}

export default CategoriesTable

