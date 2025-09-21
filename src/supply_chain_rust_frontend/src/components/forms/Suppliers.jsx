// src/components/SuppliersPanel.jsx
import React, { useEffect, useState } from "react";
import supplyChainActor from "../../utils/icp";
import "../../form.scss";


const SuppliersPanel = ({ visible = true }) => {
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("name"); // 'name' | 'id' | 'product'
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (visible) fetchSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const fetchSuppliers = async () => {
    setLoading(true);
    setError("");

    const candidateMethods = [
      "get_suppliers",
      "list_suppliers",
      "getAllSuppliers",
      "get_all_suppliers",
      "suppliers",
      "get_suppliers_list",
    ];

    for (const m of candidateMethods) {
      try {
        if (typeof supplyChainActor[m] === "function") {
          const res = await supplyChainActor[m]();
          if (Array.isArray(res)) {
            const normalized = res.map((s, i) => {
              if (typeof s === "string") return { id: s, name: s, products: [] };
              return {
                id: s.id || s.principal || `supplier-${i}`,
                name: s.name || s.display_name || s.id || `Supplier ${i + 1}`,
                products: s.products || s.product_ids || s.items || [],
                contact: s.contact || s.email || "",
                raw: s,
              };
            });
            setSuppliers(normalized);
            setResults(normalized);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn(`suppliers fetch attempt ${m} failed:`, err);
      }
    }

    // fallback mock data if backend fails
    const fallback = [
      {
        id: "supplier-0xA1",
        name: "Sunrise Farms Pvt Ltd",
        products: ["P-1001", "P-1002"],
        contact: "contact@sunrisefarms.example",
      },
      {
        id: "supplier-0xB2",
        name: "Oceanic Foods",
        products: ["P-2001"],
        contact: "sales@oceanic.example",
      },
      {
        id: "supplier-0xC3",
        name: "GreenLeaf Supplies",
        products: ["P-1002", "P-3003", "P-4004"],
        contact: "info@greenleaf.example",
      },
    ];

    setSuppliers(fallback);
    setResults(fallback);
    setLoading(false);
  };

  const runSearch = () => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults(suppliers);
      return;
    }

    if (activeTab === "name") {
      setResults(
        suppliers.filter(
          (s) =>
            (s.name || "").toLowerCase().includes(q) ||
            (s.contact || "").toLowerCase().includes(q)
        )
      );
    } else if (activeTab === "id") {
      setResults(suppliers.filter((s) => (s.id || "").toLowerCase() === q));
    } else if (activeTab === "product") {
      setResults(
        suppliers.filter((s) =>
          (s.products || []).some((pid) => String(pid).toLowerCase() === q)
        )
      );
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults(suppliers);
  };

  if (!visible) return null;

  return (
    <div className="form-container" style={{ marginTop: 20 }}>
      <h2>Suppliers</h2>
      <p style={{ marginTop: 0, color: "#aaa" }}>
        Search suppliers by name, supplier id, or product id. The component
        attempts to fetch suppliers from the backend; if unavailable, fallback
        data is shown.
      </p>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          type="button"
          className={`form-button ${activeTab === "name" ? "active" : ""}`}
          onClick={() => setActiveTab("name")}
        >
          Search by name
        </button>
        <button
          type="button"
          className={`form-button ${activeTab === "id" ? "active" : ""}`}
          onClick={() => setActiveTab("id")}
        >
          Search by supplier id
        </button>
        <button
          type="button"
          className={`form-button ${activeTab === "product" ? "active" : ""}`}
          onClick={() => setActiveTab("product")}
        >
          Search by product id
        </button>
        <button type="button" className="form-button" onClick={fetchSuppliers}>
          Refresh
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            className="form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              activeTab === "name"
                ? "Type supplier name or contact..."
                : activeTab === "id"
                ? "Type exact supplier id..."
                : "Type product id (e.g. P-1001)..."
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") runSearch();
            }}
          />
          <button type="button" className="form-button" onClick={runSearch}>
            Search
          </button>
          <button type="button" className="form-button" onClick={clearSearch}>
            Clear
          </button>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        {loading && <p className="form-message">Loading suppliers…</p>}
        {error && (
          <p className="form-message" style={{ color: "salmon" }}>
            {error}
          </p>
        )}
        {!loading && results.length === 0 && (
          <p className="form-message">No suppliers found.</p>
        )}

        {!loading && results.length > 0 && (
          <div style={{ overflowX: "auto", marginTop: 8 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    textAlign: "left",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <th style={{ padding: "8px 6px" }}>Supplier ID</th>
                  <th style={{ padding: "8px 6px" }}>Name</th>
                  <th style={{ padding: "8px 6px" }}>Products</th>
                  <th style={{ padding: "8px 6px" }}>Contact</th>
                </tr>
              </thead>
              <tbody>
                {results.map((s) => (
                  <tr
                    key={s.id}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.03)",
                    }}
                  >
                    <td
                      style={{
                        padding: "8px 6px",
                        verticalAlign: "top",
                        maxWidth: 260,
                      }}
                    >
                      <code style={{ fontSize: 12 }}>{s.id}</code>
                    </td>
                    <td style={{ padding: "8px 6px", verticalAlign: "top" }}>
                      {s.name}
                    </td>
                    <td style={{ padding: "8px 6px", verticalAlign: "top" }}>
                      {(s.products || []).join(", ")}
                    </td>
                    <td style={{ padding: "8px 6px", verticalAlign: "top" }}>
                      {s.contact || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuppliersPanel;
