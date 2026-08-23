import { useEffect, useState } from "react"
import { X, FolderPlus } from "lucide-react"

function AddCategoryModal({
  editingCategory,
  categories,
  onAdd,
  onUpdate,
  onClose,
}) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")

  // Load category data when editing
  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name || "")
      setDescription(editingCategory.description || "")
    } else {
      setName("")
      setDescription("")
    }

    setError("")
  }, [editingCategory])

  const handleSubmit = (e) => {
    e.preventDefault()

    const cleanName = name.trim()
    const cleanDescription = description.trim()

    // Validation
    if (!cleanName) {
      setError("Category name is required.")
      return
    }

    // Prevent duplicate category names
    const duplicate = categories.some(
      (category) =>
        category.name.toLowerCase() === cleanName.toLowerCase() &&
        category.id !== editingCategory?.id
    )

    if (duplicate) {
      setError("A category with this name already exists.")
      return
    }

    const categoryData = {
      name: cleanName,
      description: cleanDescription,
    }

    // Edit
    if (editingCategory) {
      onUpdate({
        ...categoryData,
        id: editingCategory.id,
      })
    }

    // Add
    else {
      onAdd(categoryData)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FolderPlus size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {editingCategory
                  ? "Edit Category"
                  : "Add Category"}
              </h2>

              <p className="text-sm text-slate-500">
                {editingCategory
                  ? "Update category information"
                  : "Create a new product category"}
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
        <form onSubmit={handleSubmit}>

          <div className="space-y-5 px-6 py-6">

            {/* Category Name */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Category Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError("")
                }}
                placeholder="e.g. Electronics"
                autoFocus
                className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 ${
                  error
                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                }`}
              />

            </div>

            {/* Description */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Description
                <span className="ml-1 font-normal text-slate-400">
                  (Optional)
                </span>
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this category..."
                rows="4"
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />

            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              {editingCategory
                ? "Save Changes"
                : "Add Category"}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default AddCategoryModal
