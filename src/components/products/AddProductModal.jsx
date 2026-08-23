import { useState, useEffect } from "react"

function AddProductModal({
  onClose,
  onAdd,
  onUpdate,
  editingProduct,
  categories = [],
  suppliers = [],
}) {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    supplier: "",
    price: "",
    stock: "",
  })

  // =========================
  // LOAD PRODUCT WHEN EDITING
  // =========================

  useEffect(() => {
    if (editingProduct) {
      setProduct({
        id: editingProduct.id,
        name: editingProduct.name || "",
        category:
          editingProduct.category || "",
        supplier:
          editingProduct.supplier || "",
        price:
          editingProduct.price
            ?.toString()
            .replace("$", "") || "",
        stock:
          editingProduct.stock ?? "",
      })
    } else {
      setProduct({
        name: "",
        category: "",
        supplier: "",
        price: "",
        stock: "",
      })
    }
  }, [editingProduct])

  // =========================
  // SAVE
  // =========================

  function handleSave() {
    if (
      !product.name ||
      !product.category ||
      !product.price ||
      !product.stock
    ) {
      alert("Please fill all fields")
      return
    }

    const data = {
      id: editingProduct
        ? editingProduct.id
        : Date.now(),

      name: product.name,

      category: product.category,

      supplier: product.supplier,

      price: `$${product.price}`,

      stock: Number(product.stock),
    }

    if (editingProduct) {
      onUpdate(data)
    } else {
      onAdd(data)
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        {/* Title */}

        <h2 className="mb-5 text-xl font-bold text-slate-800">
          {editingProduct
            ? "Edit Product"
            : "Add Product"}
        </h2>

        {/* Product Name */}

        <input
          className="mb-3 w-full rounded border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Product Name"
          value={product.name}
          onChange={(e) =>
            setProduct({
              ...product,
              name: e.target.value,
            })
          }
        />

        {/* Category */}

        <select
          className="mb-3 w-full rounded border bg-white p-3 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          value={product.category}
          onChange={(e) =>
            setProduct({
              ...product,
              category: e.target.value,
            })
          }
        >
          <option value="">
            Select Category
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.name}
            >
              {category.name}
            </option>
          ))}
        </select>

        {/* Supplier */}

        <select
          className="mb-3 w-full rounded border bg-white p-3 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          value={product.supplier}
          onChange={(e) =>
            setProduct({
              ...product,
              supplier: e.target.value,
            })
          }
        >
          <option value="">
            Select Supplier
          </option>

          {suppliers.map((supplier) => (
            <option
              key={supplier.id}
              value={supplier.company}
            >
              {supplier.company}
            </option>
          ))}
        </select>

        {/* Price */}

        <input
          className="mb-3 w-full rounded border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Price"
          type="number"
          min="0"
          value={product.price}
          onChange={(e) =>
            setProduct({
              ...product,
              price: e.target.value,
            })
          }
        />

        {/* Stock */}

        <input
          className="mb-4 w-full rounded border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Stock"
          type="number"
          min="0"
          value={product.stock}
          onChange={(e) =>
            setProduct({
              ...product,
              stock: e.target.value,
            })
          }
        />

        {/* Buttons */}

        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="rounded bg-slate-200 px-4 py-2 transition hover:bg-slate-300"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            {editingProduct
              ? "Save Changes"
              : "Save"}
          </button>

        </div>

      </div>

    </div>
  )
}

export default AddProductModal