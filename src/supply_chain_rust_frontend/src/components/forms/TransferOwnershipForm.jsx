import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import supplyChainActor from "../../utils/icp";
import BackgroundWrapper from "../BackgroundWrapper";
import "../../form.scss";

/**
 * TransferOwnershipForm (integrated)
 *
 * - Shows SuppliersPanel after transfer (or when open via prop/query).
 * - Accepts optional prop `openSuppliers` (boolean).
 * - Reads query param `showSuppliers=1` or `showSuppliers=true`.
 *
 * Replace the existing TransferOwnershipForm.jsx contents with this file.
 */

const SuppliersPanel = ({ visible }) => {
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

    // fallback mock data if backend call isn't available or fails
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

  return visible ? (
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
        {!loading && results.length === 0 && <p className="form-message">No suppliers found.</p>}

        {!loading && results.length > 0 && (
          <div style={{ overflowX: "auto", marginTop: 8 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <th style={{ padding: "8px 6px" }}>Supplier ID</th>
                  <th style={{ padding: "8px 6px" }}>Name</th>
                  <th style={{ padding: "8px 6px" }}>Products</th>
                  <th style={{ padding: "8px 6px" }}>Contact</th>
                </tr>
              </thead>
              <tbody>
                {results.map((s) => (
                  <tr key={s.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                    <td style={{ padding: "8px 6px", verticalAlign: "top", maxWidth: 260 }}>
                      <code style={{ fontSize: 12 }}>{s.id}</code>
                    </td>
                    <td style={{ padding: "8px 6px", verticalAlign: "top" }}>{s.name}</td>
                    <td style={{ padding: "8px 6px", verticalAlign: "top" }}>{(s.products || []).join(", ")}</td>
                    <td style={{ padding: "8px 6px", verticalAlign: "top" }}>{s.contact || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

const TransferOwnershipForm = ({ openSuppliers = false }) => {
  const location = useLocation();
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ productId: "", newOwner: "", metadata: "" });
  const [showSuppliers, setShowSuppliers] = useState(false);
  const [loading, setLoading] = useState(false);

  // If page loads with ?showSuppliers=1 or prop openSuppliers is true, open the panel
  useEffect(() => {
    const qs = new URLSearchParams(location.search);
    const showFromQuery = qs.get("showSuppliers") === "1" || qs.get("showSuppliers") === "true";
    if (openSuppliers || showFromQuery) setShowSuppliers(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, openSuppliers]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const metadataArg = form.metadata && form.metadata.trim() !== "" ? form.metadata.trim() : null;
      if (typeof supplyChainActor.transfer_ownership === "function") {
        const res = await supplyChainActor.transfer_ownership(form.productId, form.newOwner, metadataArg);
        setMsg("Transfer submitted. Backend response: " + (res === undefined ? "OK" : JSON.stringify(res)));
      } else {
        setMsg("Actor method transfer_ownership not available in this build.");
      }
    } catch (err) {
      console.error("transfer error:", err);
      try {
        setMsg("Transfer failed: " + (err && err.toString ? err.toString() : JSON.stringify(err)));
      } catch (err2) {
        setMsg("Transfer failed (see console).");
      }
    } finally {
      setLoading(false);
      // show suppliers panel after clicking Transfer
      setShowSuppliers(true);
    }
  };

  return (
    <BackgroundWrapper>
      <div className="form-container">
        <h2>Transfer Ownership</h2>
        <form onSubmit={submitForm}>
          <div className="form-field">
            <label>Product ID</label>
            <input
              name="productId"
              className="form-input"
              value={form.productId}
              onChange={handleChange}
              placeholder="e.g. P-1001"
              required
            />
          </div>
          <div className="form-field">
            <label>New Owner (principal)</label>
            <input
              name="newOwner"
              className="form-input"
              value={form.newOwner}
              onChange={handleChange}
              placeholder="New Owner Principal"
              required
            />
          </div>
          <div className="form-field">
            <label>Metadata (optional)</label>
            <input
              name="metadata"
              className="form-input"
              value={form.metadata}
              onChange={handleChange}
              placeholder="Optional metadata (reason, note...)"
            />
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
            <button type="submit" className="form-button" disabled={loading}>
              {loading ? "Transferring..." : "Transfer"}
            </button>

            <button
              type="button"
              className="form-button"
              onClick={() => setShowSuppliers((s) => !s)}
            >
              {showSuppliers ? "Hide Suppliers" : "Show Suppliers"}
            </button>
          </div>

          {msg && <p className="form-message" style={{ marginTop: 12 }}>{msg}</p>}
        </form>

        {showSuppliers && <SuppliersPanel visible={showSuppliers} />}
      </div>
    </BackgroundWrapper>
  );
};

export default TransferOwnershipForm;
