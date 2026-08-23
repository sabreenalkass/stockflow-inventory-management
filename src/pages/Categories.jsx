import { useEffect, useState } from "react"
import {
  Plus,
  Search,
  FolderOpen,
  Package,
} from "lucide-react"

import CategoriesTable from "../components/tables/CategoriesTable"
import AddCategoryModal from "../components/AddCategoryModal"

const CATEGORY_STORAGE_KEY = "stockflow_categories"
const PRODUCT_STORAGE_KEY = "products"

const defaultCategories = [
  {
    id: 1,
    name: "Electronics",
    description: "Electronic devices and accessories",
  },
  {
    id: 2,
    name: "Accessories",
    description: "Computer and mobile accessories",
  },
]

function Categories() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  const [searchTerm, setSearchTerm] = useState("")

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [editingCategory, setEditingCategory] = useState(null)

  // --------------------------------
  // Load Categories
  // --------------------------------
  const loadCategories = () => {
    const savedCategories =
      localStorage.getItem(CATEGORY_STORAGE_KEY)

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    } else {
      localStorage.setItem(
        CATEGORY_STORAGE_KEY,
        JSON.stringify(defaultCategories)
      )

      setCategories(defaultCategories)
    }
  }

  // --------------------------------
  // Load Products
  // --------------------------------
  const loadProducts = () => {
    const savedProducts =
      localStorage.getItem(PRODUCT_STORAGE_KEY)

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      setProducts([])
    }
  }

  // --------------------------------
  // Initial Load
  // --------------------------------
  useEffect(() => {
    loadCategories()
    loadProducts()
  }, [])

  // --------------------------------
  // Save Categories
  // --------------------------------
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem(
        CATEGORY_STORAGE_KEY,
        JSON.stringify(categories)
      )
    }
  }, [categories])

  // --------------------------------
  // Refresh Products
  // --------------------------------
  useEffect(() => {
    const refreshProducts = () => {
      loadProducts()
    }

    window.addEventListener(
      "focus",
      refreshProducts
    )

    return () => {
      window.removeEventListener(
        "focus",
        refreshProducts
      )
    }
  }, [])

  // --------------------------------
  // Add Category
  // --------------------------------
  const handleAddCategory = (newCategory) => {
    const category = {
      ...newCategory,
      id: Date.now(),
    }

    setCategories((prev) => [
      ...prev,
      category,
    ])

    setIsModalOpen(false)
  }

  // --------------------------------
  // Edit Category
  // --------------------------------
  const handleEdit = (category) => {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  // --------------------------------
  // Update Category
  // --------------------------------
  const handleUpdateCategory = (
    updatedCategory
  ) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === updatedCategory.id
          ? updatedCategory
          : category
      )
    )

    setEditingCategory(null)
    setIsModalOpen(false)
  }

  // --------------------------------
  // Delete Category
  // --------------------------------
  const handleDelete = (id) => {
    const category = categories.find(
      (category) => category.id === id
    )

    if (!category) return

    const productCount = products.filter(
      (product) =>
        product.category?.toLowerCase() ===
        category.name.toLowerCase()
    ).length

    if (productCount > 0) {
      alert(
        `Cannot delete "${category.name}" because it has ${productCount} product(s).`
      )

      return
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`
    )

    if (!confirmed) return

    setCategories((prev) =>
      prev.filter(
        (category) => category.id !== id
      )
    )
  }

  // --------------------------------
  // Search
  // --------------------------------
  const filteredCategories =
    categories.filter((category) =>
      category.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )

  // --------------------------------
  // Statistics
  // --------------------------------
  const totalCategories =
    categories.length

  const totalProducts =
    products.length

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Categories
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Organize your products into categories
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCategory(null)
            setIsModalOpen(true)
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Plus size={18} />

          Add Category
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* Total Categories */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Categories
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-800">
                {totalCategories}
              </p>
            </div>

            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <FolderOpen size={22} />
            </div>

          </div>

        </div>

        {/* Total Products */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Products
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-800">
                {totalProducts}
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <Package size={22} />
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
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />

        </div>

      </div>

      {/* Categories Table */}
      <CategoriesTable
        categories={filteredCategories}
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <AddCategoryModal
          editingCategory={editingCategory}
          categories={categories}
          onAdd={handleAddCategory}
          onUpdate={handleUpdateCategory}
          onClose={() => {
            setIsModalOpen(false)
            setEditingCategory(null)
          }}
        />
      )}

    </div>
  )
}

export default Categories

