import { useState, useEffect } from "react"
import { Search } from "lucide-react"

import ProductsTable from "../components/tables/ProductsTable"
import AddProductModal from "../components/products/AddProductModal"

function Products() {
  const defaultProducts = [
    {
      id: 1,
      name: "MacBook Pro",
      category: "Laptop",
      supplier: "",
      price: "$2200",
      stock: 15,
    },
    {
      id: 2,
      name: "Keyboard",
      category: "Accessories",
      supplier: "",
      price: "$150",
      stock: 40,
    },
  ]

  // =========================
  // PRODUCTS
  // =========================

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("products")

      if (!saved) {
        return defaultProducts
      }

      const parsed = JSON.parse(saved)

      return Array.isArray(parsed)
        ? parsed
        : defaultProducts
    } catch (error) {
      console.error(
        "Error loading products:",
        error
      )

      return defaultProducts
    }
  })

  // =========================
  // CATEGORIES
  // =========================

  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "stockflow_categories"
      )

      if (!saved) {
        return []
      }

      const parsed = JSON.parse(saved)

      return Array.isArray(parsed)
        ? parsed
        : []
    } catch (error) {
      console.error(
        "Error loading categories:",
        error
      )

      return []
    }
  })

  // =========================
  // SUPPLIERS
  // =========================

  const [suppliers, setSuppliers] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "stockflow_suppliers"
      )

      if (!saved) {
        return []
      }

      const parsed = JSON.parse(saved)

      return Array.isArray(parsed)
        ? parsed
        : []
    } catch (error) {
      console.error(
        "Error loading suppliers:",
        error
      )

      return []
    }
  })

  // =========================
  // UI STATE
  // =========================

  const [openModal, setOpenModal] =
    useState(false)

  const [editingProduct, setEditingProduct] =
    useState(null)

  const [search, setSearch] = useState("")

  const [categoryFilter, setCategoryFilter] =
    useState("All")

  // =========================
  // SAVE PRODUCTS
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "products",
      JSON.stringify(products)
    )

    window.dispatchEvent(
      new Event("productsUpdated")
    )
  }, [products])

  // =========================
  // LOAD CATEGORIES
  // =========================

  useEffect(() => {
    const loadCategories = () => {
      try {
        const saved =
          localStorage.getItem(
            "stockflow_categories"
          )

        if (!saved) {
          setCategories([])
          return
        }

        const parsed = JSON.parse(saved)

        setCategories(
          Array.isArray(parsed)
            ? parsed
            : []
        )
      } catch (error) {
        console.error(
          "Error loading categories:",
          error
        )

        setCategories([])
      }
    }

    loadCategories()

    window.addEventListener(
      "focus",
      loadCategories
    )

    window.addEventListener(
      "categoriesUpdated",
      loadCategories
    )

    return () => {
      window.removeEventListener(
        "focus",
        loadCategories
      )

      window.removeEventListener(
        "categoriesUpdated",
        loadCategories
      )
    }
  }, [])

  // =========================
  // LOAD SUPPLIERS
  // =========================

  useEffect(() => {
    const loadSuppliers = () => {
      try {
        const saved =
          localStorage.getItem(
            "stockflow_suppliers"
          )

        if (!saved) {
          setSuppliers([])
          return
        }

        const parsed = JSON.parse(saved)

        setSuppliers(
          Array.isArray(parsed)
            ? parsed
            : []
        )
      } catch (error) {
        console.error(
          "Error loading suppliers:",
          error
        )

        setSuppliers([])
      }
    }

    loadSuppliers()

    window.addEventListener(
      "focus",
      loadSuppliers
    )

    window.addEventListener(
      "suppliersUpdated",
      loadSuppliers
    )

    window.addEventListener(
      "storage",
      loadSuppliers
    )

    return () => {
      window.removeEventListener(
        "focus",
        loadSuppliers
      )

      window.removeEventListener(
        "suppliersUpdated",
        loadSuppliers
      )

      window.removeEventListener(
        "storage",
        loadSuppliers
      )
    }
  }, [])

  // =========================
  // ADD PRODUCT
  // =========================

  function addProduct(product) {
    setProducts((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...product,
      },
    ])
  }

  // =========================
  // UPDATE PRODUCT
  // =========================

  function updateProduct(updatedProduct) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product
      )
    )
  }

  // =========================
  // DELETE PRODUCT
  // =========================

  function deleteProduct(id) {
    setProducts((prev) =>
      prev.filter(
        (product) => product.id !== id
      )
    )
  }

  // =========================
  // EDIT PRODUCT
  // =========================

  function handleEdit(product) {
    setEditingProduct(product)
    setOpenModal(true)
  }

  // =========================
  // CLOSE MODAL
  // =========================

  function closeModal() {
    setOpenModal(false)
    setEditingProduct(null)
  }

  // =========================
  // CATEGORY FILTER
  // =========================

  const categoryNames = Array.isArray(
    categories
  )
    ? categories
        .map((category) => category.name)
        .filter(Boolean)
    : []

  const filterCategories = [
    "All",
    ...categoryNames,
  ]

  products.forEach((product) => {
    if (
      product.category &&
      !filterCategories.includes(
        product.category
      )
    ) {
      filterCategories.push(
        product.category
      )
    }
  })

  const uniqueFilterCategories = [
    ...new Set(filterCategories),
  ]

  // =========================
  // FILTER PRODUCTS
  // =========================

  const filteredProducts =
    products.filter((product) => {
      const matchSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      const matchCategory =
        categoryFilter === "All" ||
        product.category ===
          categoryFilter

      return (
        matchSearch &&
        matchCategory
      )
    })

  // =========================
  // RENDER
  // =========================

  return (
    <div>

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <h1 className="text-3xl font-bold text-slate-800">
          Products Management
        </h1>

        <button
          onClick={() => {
            setEditingProduct(null)
            setOpenModal(true)
          }}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
        >
          Add Product
        </button>

      </div>

      {/* Search + Filter */}

      <div className="mb-6 flex gap-4">

        <div className="relative flex-1">

          <Search
            className="absolute left-3 top-3 text-slate-400"
            size={22}
          />

          <input
            className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <select
          className="rounded-lg border border-slate-300 bg-white px-4 outline-none focus:ring-2 focus:ring-blue-500"
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(
              e.target.value
            )
          }
        >
          {uniqueFilterCategories.map(
            (category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            )
          )}
        </select>

      </div>

      {/* Products Table */}

      <ProductsTable
        products={filteredProducts}
        onDelete={deleteProduct}
        onEdit={handleEdit}
      />

      {/* Add / Edit Product Modal */}

      {openModal && (
        <AddProductModal
          onClose={closeModal}
          onAdd={addProduct}
          onUpdate={updateProduct}
          editingProduct={
            editingProduct
          }
          categories={categories}
          suppliers={suppliers}
        />
      )}

    </div>
  )
}

export default Products