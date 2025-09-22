// src/components/forms/Suppliers.jsx
import React, { useEffect, useState } from "react";
import supplyChainActor from "../../utils/icp";
import BackgroundWrapper from "../BackgroundWrapper";
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
      "getSuppliers",
      "list_suppliers",
      "listSuppliers",
    ];
    for (let m of candidateMethods) {
      try {
        if (supplyChainActor && supplyChainActor[m]) {
          const res = await supplyChainActor[m]();
          if (Array.isArray(res)) {
            setSuppliers(res);
            setResults(res);
            setLoading(false);
            return;
          } else if (res.ok && Array.isArray(res.ok)) {
            setSuppliers(res.ok);
            setResults(res.ok);
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
      
      { id: "supplier-0xA1", name: "Sunrise Farms Pvt Ltd", products: ["P-1001","P-1002"], contact: "contact@sunrisefarms.example" },
  { id: "supplier-0xA2", name: "Oceanic Foods", products: ["P-1003"], contact: "sales@oceanic.example" },
  { id: "supplier-0xA3", name: "GreenLeaf Supplies", products: ["P-1004","P-1005","P-1006"], contact: "info@greenleaf.example" },
  { id: "supplier-0xA4", name: "Aurora Agro Pvt Ltd", products: ["P-1007","P-1008"], contact: "hello@auroraagro.example" },
  { id: "supplier-0xA5", name: "Banyan Organic", products: ["P-1009"], contact: "contact@banyanorganic.example" },
  { id: "supplier-0xA6", name: "Cascade Foods", products: ["P-1010","P-1011"], contact: "sales@cascadefoods.example" },
  { id: "supplier-0xA7", name: "Delta Grainworks", products: ["P-1012","P-1013","P-1014"], contact: "team@deltagrain.example" },
  { id: "supplier-0xA8", name: "Evergreen Produce", products: ["P-1015"], contact: "info@evergreenproduce.example" },
  { id: "supplier-0xA9", name: "Fertile Fields Co.", products: ["P-1016","P-1017"], contact: "contact@fertilefields.example" },
  { id: "supplier-0xAA", name: "Golden Harvest Ltd", products: ["P-1018","P-1019"], contact: "support@goldenharvest.example" },
  { id: "supplier-0xAB", name: "Harvest Moon Foods", products: ["P-1020"], contact: "orders@harvestmoon.example" },
  { id: "supplier-0xAC", name: "Indigo Agro Suppliers", products: ["P-1021","P-1022"], contact: "sales@indigoagro.example" },
  { id: "supplier-0xAD", name: "Jade Valley Farms", products: ["P-1023","P-1024","P-1025"], contact: "info@jadevalley.example" },
  { id: "supplier-0xAE", name: "Kitefield Exports", products: ["P-1026"], contact: "export@kitefield.example" },
  { id: "supplier-0xAF", name: "LushLeaf Traders", products: ["P-1027","P-1028"], contact: "hello@lushleaf.example" },
  { id: "supplier-0xB0", name: "MeadowFresh Pvt Ltd", products: ["P-1029"], contact: "sales@meadowfresh.example" },
  { id: "supplier-0xB1", name: "Natura Foods", products: ["P-1030","P-1031"], contact: "contact@naturafoods.example" },
  { id: "supplier-0xB2", name: "Orchard Line", products: ["P-1032"], contact: "sales@orchardline.example" },
  { id: "supplier-0xB3", name: "Pioneer Growers", products: ["P-1033","P-1034"], contact: "info@pioneergrowers.example" },
  { id: "supplier-0xB4", name: "Quarry Agro", products: ["P-1035","P-1036","P-1037"], contact: "contact@quarryagro.example" },
  { id: "supplier-0xB5", name: "Riverside Foods Co", products: ["P-1038"], contact: "orders@riversidefoods.example" },
  { id: "supplier-0xB6", name: "Sunfield Commodities", products: ["P-1039","P-1040"], contact: "support@sunfield.example" },
  { id: "supplier-0xB7", name: "TerraCrop Suppliers", products: ["P-1041","P-1042"], contact: "info@terracrop.example" },
  { id: "supplier-0xB8", name: "Uplands Produce", products: ["P-1043"], contact: "hello@uplandsproduce.example" },
  { id: "supplier-0xB9", name: "ValleyGreen Exports", products: ["P-1044","P-1045"], contact: "export@valleygreen.example" },
  { id: "supplier-0xBA", name: "WillowWisp Farms", products: ["P-1046","P-1047","P-1048"], contact: "contact@willowwisp.example" },
  { id: "supplier-0xBB", name: "Xenia Foods Pvt Ltd", products: ["P-1049"], contact: "sales@xeniafoods.example" },
  { id: "supplier-0xBC", name: "YellowWood Suppliers", products: ["P-1050","P-1051"], contact: "info@yellowwood.example" },
  { id: "supplier-0xBD", name: "Zephyr Agro", products: ["P-1052"], contact: "contact@zephyraagro.example" },
  { id: "supplier-0xBE", name: "Alpine Farms Co", products: ["P-1053","P-1054"], contact: "support@alpinefarms.example" },
  { id: "supplier-0xBF", name: "Brookfield Traders", products: ["P-1055","P-1056"], contact: "sales@brookfield.example" },
  { id: "supplier-0xC0", name: "Cedarcrest Produce", products: ["P-1057"], contact: "info@cedarcrest.example" },
  { id: "supplier-0xC1", name: "DuneHarvest Ltd", products: ["P-1058","P-1059"], contact: "hello@duneharvest.example" },
  { id: "supplier-0xC2", name: "ElmStreet Foods", products: ["P-1060","P-1061","P-1062"], contact: "orders@elmstreet.example" },
  { id: "supplier-0xC3", name: "FernGrove Suppliers", products: ["P-1063"], contact: "contact@ferngrove.example" },
  { id: "supplier-0xC4", name: "Glade Farms", products: ["P-1064","P-1065"], contact: "sales@gladefarms.example" },
  { id: "supplier-0xC5", name: "Horizon Agro Pvt Ltd", products: ["P-1066","P-1067"], contact: "info@horizonagro.example" },
  { id: "supplier-0xC6", name: "Ironwood Exports", products: ["P-1068"], contact: "export@ironwood.example" },
  { id: "supplier-0xC7", name: "Juniper Foods", products: ["P-1069","P-1070"], contact: "support@juniperfoods.example" },
  { id: "supplier-0xC8", name: "KnollFresh", products: ["P-1071","P-1072","P-1073"], contact: "hello@knollfresh.example" },
  { id: "supplier-0xC9", name: "Lighthouse Produce", products: ["P-1074"], contact: "info@lighthouse.example" },
  { id: "supplier-0xCA", name: "Monarch Farms", products: ["P-1075","P-1076"], contact: "contact@monarchfarms.example" },
  { id: "supplier-0xCB", name: "Northfield Agro", products: ["P-1077"], contact: "sales@northfield.example" },
  { id: "supplier-0xCC", name: "Oakridge Suppliers", products: ["P-1078","P-1079"], contact: "info@oakridge.example" },
  { id: "supplier-0xCD", name: "Pinebrook Foods", products: ["P-1080","P-1081"], contact: "orders@pinebrook.example" },
  { id: "supplier-0xCE", name: "Quince Orchard", products: ["P-1082"], contact: "contact@quinceorchard.example" },
  { id: "supplier-0xCF", name: "RedRock Commodities", products: ["P-1083","P-1084"], contact: "sales@redrock.example" },
  { id: "supplier-0xD0", name: "Saffron Gate Supplies", products: ["P-1085","P-1086","P-1087"], contact: "info@saffrongate.example" },
  { id: "supplier-0xD1", name: "TidePool Foods", products: ["P-1088"], contact: "sales@tidepool.example" },
  { id: "supplier-0xD2", name: "Urbana Agri Co.", products: ["P-1089","P-1090"], contact: "contact@urbanaagri.example" },
  { id: "supplier-0xD3", name: "VineVale Suppliers", products: ["P-1091","P-1092"], contact: "info@vinevale.example" },
  { id: "supplier-0xD4", name: "Wheatfield Traders", products: ["P-1093"], contact: "support@wheatfield.example" },
  { id: "supplier-0xD5", name: "Xplore Foods", products: ["P-1094","P-1095"], contact: "hello@xplorefoods.example" },
  { id: "supplier-0xD6", name: "YieldHarvest Ltd", products: ["P-1096","P-1097"], contact: "contact@yieldharvest.example" },
  { id: "supplier-0xD7", name: "Zenith Agro", products: ["P-1098"], contact: "sales@zenithagro.example" },
  { id: "supplier-0xD8", name: "Amberfields", products: ["P-1099","P-1100"], contact: "info@amberfields.example" },
  { id: "supplier-0xD9", name: "BlueHarbor Foods", products: ["P-1101","P-1102","P-1103"], contact: "sales@blueharbor.example" },
  { id: "supplier-0xDA", name: "Cloverleaf Exports", products: ["P-1104"], contact: "export@cloverleaf.example" },
  { id: "supplier-0xDB", name: "Driftwood Suppliers", products: ["P-1105","P-1106"], contact: "contact@driftwood.example" },
  { id: "supplier-0xDC", name: "Ember Grove Farms", products: ["P-1107","P-1108"], contact: "info@embergrove.example" },
  { id: "supplier-0xDD", name: "Fairfield Produce", products: ["P-1109"], contact: "support@fairfield.example" },
  { id: "supplier-0xDE", name: "GoldStream Foods", products: ["P-1110","P-1111"], contact: "hello@goldstream.example" },
  { id: "supplier-0xDF", name: "Hearth & Field", products: ["P-1112","P-1113"], contact: "orders@hearthfield.example" },
  { id: "supplier-0xE0", name: "IvyLane Suppliers", products: ["P-1114"], contact: "info@ivylane.example" },
  { id: "supplier-0xE1", name: "Junia Agro", products: ["P-1115","P-1116"], contact: "contact@juniaagro.example" },
  { id: "supplier-0xE2", name: "Karma Crops", products: ["P-1117","P-1118"], contact: "sales@karmacrops.example" },
  { id: "supplier-0xE3", name: "LotusLeaf Foods", products: ["P-1119"], contact: "info@lotusleaf.example" },
  { id: "supplier-0xE4", name: "MangoBay Exports", products: ["P-1120","P-1121"], contact: "export@mangobay.example" },
  { id: "supplier-0xE5", name: "NectarField Co", products: ["P-1122","P-1123"], contact: "sales@nectarfield.example" },
  { id: "supplier-0xE6", name: "OliveBranch Suppliers", products: ["P-1124"], contact: "info@olivebranch.example" },
  { id: "supplier-0xE7", name: "PrairieGold Farms", products: ["P-1125","P-1126","P-1127"], contact: "contact@prairiegold.example" },
  { id: "supplier-0xE8", name: "Quarry Ridge", products: ["P-1128"], contact: "support@quarryridge.example" },
  { id: "supplier-0xE9", name: "Ridgeway Organics", products: ["P-1129","P-1130"], contact: "info@ridgewayorganics.example" },
  { id: "supplier-0xEA", name: "StoneBridge Foods", products: ["P-1131","P-1132"], contact: "sales@stonebridge.example" },
  { id: "supplier-0xEB", name: "Thistle & Thorn", products: ["P-1133"], contact: "contact@thistleandthorn.example" },
  { id: "supplier-0xEC", name: "Umber Fields", products: ["P-1134","P-1135"], contact: "info@umberfields.example" },
  { id: "supplier-0xED", name: "Verdant Valley", products: ["P-1136","P-1137"], contact: "hello@verdantvalley.example" },
  { id: "supplier-0xEE", name: "WillowBrook Exports", products: ["P-1138"], contact: "export@willowbrook.example" },
  { id: "supplier-0xEF", name: "Xanadu Farms", products: ["P-1139","P-1140"], contact: "contact@xanadufarms.example" },
  { id: "supplier-0xF0", name: "YellowBarn Suppliers", products: ["P-1141","P-1142"], contact: "info@yellowbarn.example" }
    ];

    setSuppliers(fallback);
    setResults(fallback);
    setLoading(false);
  };

  const runSearch = () => {
    if (!query || query.trim() === "") {
      setResults(suppliers);
      return;
    }

    const q = query.toLowerCase().trim();
    if (activeTab === "name") {
      setResults(
        suppliers.filter(
          (s) =>
            (s.name && s.name.toLowerCase().includes(q)) ||
            (s.contact && s.contact.toLowerCase().includes(q))
        )
      );
    } else if (activeTab === "id") {
      setResults(suppliers.filter((s) => (s.id || "").toLowerCase() === q));
    } else if (activeTab === "product") {
      setResults(
        suppliers.filter(
          (s) => Array.isArray(s.products) && s.products.some((p) => p === q || (p||"").toLowerCase().includes(q))
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
    <BackgroundWrapper>
      <div className="form-wrapper">
        <div className="form-container" style={{ marginTop: 25 }}>
          <h2 className="form-title">Suppliers</h2>
          <p style={{ marginTop: 0, color: "#aaa" }}>
            <b>Search Suppliers By Name, Supplier ID, or Product ID</b>
            (It will be helpful to get Transparent Information about the Suppliers And Products Based On the Present Data.)
          </p>

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              type="button"
              className={`form-button ${activeTab === "name" ? "active" : ""}`}
              onClick={() => setActiveTab("name")}
            >
              Search By Name
            </button>
            <button
              type="button"
              className={`form-button ${activeTab === "id" ? "active" : ""}`}
              onClick={() => setActiveTab("id")}
            >
              Search By Supplier ID
            </button>
            <button
              type="button"
              className={`form-button ${activeTab === "product" ? "active" : ""}`}
              onClick={() => setActiveTab("product")}
            >
              Search By Product ID
            </button>
            <button type="button" className="form-button" onClick={fetchSuppliers}>
              Refresh
            </button>
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", gap: 12 }}>
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
                  if (e.key === "Enter") {
                    runSearch();
                  }
                  if (e.key === "Escape") {
                    clearSearch();
                  }
                }}
              />
              <button className="form-button" type="button" onClick={runSearch}>
                Search
              </button>
              <button className="form-button" type="button" onClick={clearSearch}>
                Clear
              </button>
            </div>
          </div>

          {loading && <p className="form-msg">Loading...</p>}
          {error && <p className="form-msg">{error}</p>}
          {!loading && results.length === 0 && (
            <p className="form-msg">No suppliers found.</p>
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
                    <th style={{ padding: "8px 6px" }}>ID</th>
                    <th style={{ padding: "8px 6px" }}>Name</th>
                    <th style={{ padding: "8px 6px" }}>Products</th>
                    <th style={{ padding: "8px 6px" }}>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((s) => (
                    <tr key={s.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      <td style={{ padding: "8px 6px", verticalAlign: "top" }}>
                        {s.id}
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
    </BackgroundWrapper>
  );
};

export default SuppliersPanel;
