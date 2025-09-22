import React, { useState } from "react";
import supplyChainActor from "../../utils/icp";
import BackgroundWrapper from "../BackgroundWrapper";
import "../../form.scss"; // Make sure this path is correct

// 🔹 Supplier list (put all your vast supplier data here)
const suppliers = [
  { id: "supplier-0xA1", name: "Sunrise Farms Pvt Ltd" },
  { id: "supplier-0xA2", name: "Oceanic Foods" },
  { id: "supplier-0xA3", name: "GreenLeaf Supplies" },
  { id: "supplier-0xA4", name: "Aurora Agro Pvt Ltd" },
  { id: "supplier-0xA5", name: "Banyan Organic" },
  { id: "supplier-0xA6", name: "Cascade Foods" },
  { id: "supplier-0xA7", name: "Delta Grainworks" },
  { id: "supplier-0xA8", name: "Evergreen Produce" },
  { id: "supplier-0xA9", name: "Fertile Fields Co." },
  { id: "supplier-0xAA", name: "Golden Harvest Ltd" },
  { id: "supplier-0xAB", name: "Harvest Moon Foods" },
  { id: "supplier-0xAC", name: "Indigo Agro Suppliers" },
  { id: "supplier-0xAD", name: "Jade Valley Farms" },
  { id: "supplier-0xAE", name: "Kitefield Exports" },
  { id: "supplier-0xAF", name: "LushLeaf Traders" },
  { id: "supplier-0xB0", name: "MeadowFresh Pvt Ltd" },
  { id: "supplier-0xB1", name: "Natura Foods" },
  { id: "supplier-0xB2", name: "Orchard Line" },
  { id: "supplier-0xB3", name: "Pioneer Growers" },
  { id: "supplier-0xB4", name: "Quarry Agro" },
  { id: "supplier-0xB5", name: "Riverside Foods Co" },
  { id: "supplier-0xB6", name: "Sunfield Commodities" },
  { id: "supplier-0xB7", name: "TerraCrop Suppliers" },
  { id: "supplier-0xB8", name: "Uplands Produce" },
  { id: "supplier-0xB9", name: "ValleyGreen Exports" },
  { id: "supplier-0xBA", name: "WillowWisp Farms" },
  { id: "supplier-0xBB", name: "Xenia Foods Pvt Ltd" },
  { id: "supplier-0xBC", name: "YellowWood Suppliers" },
  { id: "supplier-0xBD", name: "Zephyr Agro" },
  { id: "supplier-0xBE", name: "Alpine Farms Co" },
  { id: "supplier-0xBF", name: "Brookfield Traders" },
  { id: "supplier-0xC0", name: "Cedarcrest Produce" },
  { id: "supplier-0xC1", name: "DuneHarvest Ltd" },
  { id: "supplier-0xC2", name: "ElmStreet Foods" },
  { id: "supplier-0xC3", name: "FernGrove Suppliers" },
  { id: "supplier-0xC4", name: "Glade Farms" },
  { id: "supplier-0xC5", name: "Horizon Agro Pvt Ltd" },
  { id: "supplier-0xC6", name: "Ironwood Exports" },
  { id: "supplier-0xC7", name: "Juniper Foods" },
  { id: "supplier-0xC8", name: "KnollFresh" },
  { id: "supplier-0xC9", name: "Lighthouse Produce" },
  { id: "supplier-0xCA", name: "Monarch Farms" },
  { id: "supplier-0xCB", name: "Northfield Agro" },
  { id: "supplier-0xCC", name: "Oakridge Suppliers" },
  { id: "supplier-0xCD", name: "Pinebrook Foods" },
  { id: "supplier-0xCE", name: "Quince Orchard" },
  { id: "supplier-0xCF", name: "RedRock Commodities" },
  { id: "supplier-0xD0", name: "Saffron Gate Supplies" },
  { id: "supplier-0xD1", name: "TidePool Foods" },
  { id: "supplier-0xD2", name: "Urbana Agri Co." },
  { id: "supplier-0xD3", name: "VineVale Suppliers" },
  { id: "supplier-0xD4", name: "Wheatfield Traders" },
  { id: "supplier-0xD5", name: "Xplore Foods" },
  { id: "supplier-0xD6", name: "YieldHarvest Ltd" },
  { id: "supplier-0xD7", name: "Zenith Agro" },
  { id: "supplier-0xD8", name: "Amberfields" },
  { id: "supplier-0xD9", name: "BlueHarbor Foods" },
  { id: "supplier-0xDA", name: "Cloverleaf Exports" },
  { id: "supplier-0xDB", name: "Driftwood Suppliers" },
  { id: "supplier-0xDC", name: "Ember Grove Farms" },
  { id: "supplier-0xDD", name: "Fairfield Produce" },
  { id: "supplier-0xDE", name: "GoldStream Foods" },
  { id: "supplier-0xDF", name: "Hearth & Field" },
  { id: "supplier-0xE0", name: "IvyLane Suppliers" },
  { id: "supplier-0xE1", name: "Junia Agro" },
  { id: "supplier-0xE2", name: "Karma Crops" },
  { id: "supplier-0xE3", name: "LotusLeaf Foods" },
  { id: "supplier-0xE4", name: "MangoBay Exports" },
  { id: "supplier-0xE5", name: "NectarField Co" },
  { id: "supplier-0xE6", name: "OliveBranch Suppliers" },
  { id: "supplier-0xE7", name: "PrairieGold Farms" },
  { id: "supplier-0xE8", name: "Quarry Ridge" },
  { id: "supplier-0xE9", name: "Ridgeway Organics" },
  { id: "supplier-0xEA", name: "StoneBridge Foods" },
  { id: "supplier-0xEB", name: "Thistle & Thorn" },
  { id: "supplier-0xEC", name: "Umber Fields" },
  { id: "supplier-0xED", name: "Verdant Valley" },
  { id: "supplier-0xEE", name: "WillowBrook Exports" },
  { id: "supplier-0xEF", name: "Xanadu Farms" },
  { id: "supplier-0xF0", name: "YellowBarn Suppliers" }
];

const AddProductForm = () => {
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    id: "",
    name: "",
    origin: "",
    description: "",
    certifications: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await supplyChainActor.add_product(
        form.id,
        form.name,
        form.origin,
        form.certifications.split(",").map((c) => c.trim()),
        form.description ? [form.description] : []
      );
      setMsg("Product Added");
      setForm({
        id: "",
        name: "",
        origin: "",
        description: "",
        certifications: "",
      });
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <BackgroundWrapper>
      <div className="form-wrapper">
        <form onSubmit={submitForm} className="form-container">
          <h2 className="form-title">Add Product</h2>

          {/* 🔹 Custom rendering: keep all fields, but origin is dropdown */}
          {["id", "name", "origin", "description", "certifications"].map((field) => (
            <div key={field} className="form-group">
              {field === "origin" ? (
                <select
                  name="origin"
                  value={form.origin}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required={field !== "description"}
                  className="form-input"
                />
              )}
              <label className="form-label">
                {field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")}
              </label>
            </div>
          ))}

          <button type="submit" className="form-button">
            Add Product
          </button>

          {msg && <div className="form-msg">{msg}</div>}
        </form>
      </div>
    </BackgroundWrapper>
  );
};

export default AddProductForm;
