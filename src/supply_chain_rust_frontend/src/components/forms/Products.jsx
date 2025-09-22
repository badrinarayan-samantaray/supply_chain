// ProductsByOwnerForm.jsx
// Now with proper centering and visible dropdown text (black)

import React, { useEffect, useState } from "react";
import supplyChainActor from "../../utils/icp";
import BackgroundWrapper from "../BackgroundWrapper";
import "../../form.scss";

const DEFAULT_DATA_SOURCE = process.env.REACT_APP_PRODUCT_DATA_SOURCE || "fake";
const PROXY_SEARCH_ENDPOINT = process.env.REACT_APP_PRODUCT_PROXY || "/api/products/search";

const Products = () => {
  const [dataSource, setDataSource] = useState(DEFAULT_DATA_SOURCE);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [localMap, setLocalMap] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("localProductMap") || "{}");
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [dataSource]);

  useEffect(() => {
    localStorage.setItem("localProductMap", JSON.stringify(localMap));
  }, [localMap]);

  async function fetchSuppliers() {
    try {
      if (supplyChainActor && supplyChainActor.getAllSuppliers) {
        const s = await supplyChainActor.getAllSuppliers();
        if (Array.isArray(s) && s.length) {
          setSuppliers(s);
          setSelectedSupplier(s[0]?.id || "");
        } else throw new Error("No suppliers returned");
      } else {
        setSuppliers([
          { id: "SUP-1001", name: "Acme Supplies Pvt Ltd" },
          { id: "SUP-1002", name: "Global Supplier" },
          { id: "SUP-1003", name: "Local Farmer Co-op" },
        ]);
        setSelectedSupplier("SUP-1001");
      }
    } catch (err) {
      setSuppliers([{ id: "SUP-1001", name: "Acme Supplies Pvt Ltd" }]);
      setSelectedSupplier("SUP-1001");
    }
  }

  async function fetchProducts(q = "") {
    setError("");
    setLoading(true);
    try {
      let res, data;
      if (dataSource === "fake") {
        res = await fetch("https://fakestoreapi.com/products");
        data = await res.json();
        if (q) data = data.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()));
      } else if (dataSource === "dummyjson") {
        const url = q ? `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}` : `https://dummyjson.com/products?limit=30`;
        res = await fetch(url);
        data = (await res.json()).products;
      } else {
        const url = q ? `${PROXY_SEARCH_ENDPOINT}?q=${encodeURIComponent(q)}` : `${PROXY_SEARCH_ENDPOINT}`;
        res = await fetch(url);
        data = await res.json();
      }
      const normalized = (data || []).map((p, idx) => ({
        sourceId: p.id || idx,
        title: p.title || p.name || "Untitled",
        image: p.image || (p.images && p.images[0]) || "",
        price: p.price || "",
        description: p.description || "",
        raw: p,
      }));
      setProducts(normalized);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  function assignLocalMapping(product) {
    const localId = `LP-${Date.now()}-${Math.floor(Math.random() * 9000)}`;
    setLocalMap((m) => ({
      ...m,
      [localId]: { localProductId: localId, sourceId: product.sourceId, title: product.title, supplierId: selectedSupplier, image: product.image, createdAt: new Date().toISOString() },
    }));
  }

  function removeLocalMapping(localId) {
    setLocalMap((m) => {
      const copy = { ...m };
      delete copy[localId];
      return copy;
    });
  }

  return (
    <BackgroundWrapper>
      <div className="form-container form-centered">
        <h2 className="form-title">Products (By Owner)</h2>

        <div className="form-group">
          <label>Data source</label>
          <select className="form-input form-select" value={dataSource} onChange={(e) => setDataSource(e.target.value)}>
            <option value="fake">FakeStoreAPI</option>
            <option value="dummyjson">DummyJSON</option>
            <option value="proxy">Proxy (Flipkart/SerpApi)</option>
          </select>
        </div>

        <div className="form-group form-row">
          <input
            className="form-input"
            placeholder="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="form-button" onClick={() => fetchProducts(query)} disabled={loading}>Search</button>
          <button className="form-button" onClick={() => { setQuery(""); fetchProducts(""); }}>Reset</button>
        </div>

        <div className="form-group">
          <label>Supplier</label>
          <select className="form-input form-select" value={selectedSupplier} onChange={(e) => setSelectedSupplier(e.target.value)}>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        {error && <div className="form-error">{error}</div>}

        {loading ? (
          <div>Loading…</div>
        ) : (
          <div className="products-grid">
            {products.map((p) => (
              <div className="product-card" key={p.sourceId}>
                <div className="product-image">
                  {p.image ? <img src={p.image} alt={p.title} /> : <div className="no-image">No image</div>}
                </div>
                <div className="product-body">
                  <h4>{p.title}</h4>
                  <div className="product-price">{p.price ? `₹ ${p.price}` : ""}</div>
                  <p>{p.description.slice(0, 80)}</p>
                  <div className="form-row">
                    <button className="form-button" onClick={() => assignLocalMapping(p)}>Assign Local ID</button>
                    <button className="form-button" onClick={() => window.open(p.raw?.url || `https://www.google.com/search?q=${p.title}`, "_blank")}>Open Source</button>
                  </div>
                  <small>Source ID: {p.sourceId}</small>
                  {Object.values(localMap).filter((m) => m.sourceId === p.sourceId).map((m) => (
                    <div key={m.localProductId} className="local-mapping">
                      Local ID: {m.localProductId} — Supplier: {m.supplierId}
                      <button className="form-button small" onClick={() => removeLocalMapping(m.localProductId)}>Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <h3>Local Product Mappings</h3>
        {Object.keys(localMap).length === 0 ? (
          <div>No local mappings yet</div>
        ) : (
          <table className="form-table">
            <thead>
              <tr><th>Local ID</th><th>Title</th><th>Source ID</th><th>Supplier</th><th>Created</th><th>Action</th></tr>
            </thead>
            <tbody>
              {Object.values(localMap).map((m) => (
                <tr key={m.localProductId}>
                  <td>{m.localProductId}</td>
                  <td>{m.title}</td>
                  <td>{m.sourceId}</td>
                  <td>{m.supplierId}</td>
                  <td>{new Date(m.createdAt).toLocaleString()}</td>
                  <td><button className="form-button small" onClick={() => removeLocalMapping(m.localProductId)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </BackgroundWrapper>
  );
};

export default Products;

