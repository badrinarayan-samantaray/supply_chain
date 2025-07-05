import { useEffect, useState } from 'react';
import {
  AddProductForm, TransferOwnershipForm, AddCertificationForm,
  ProductsByOwnerForm, VerifyOwnershipForm, ViewHistoryForm, ViewProductForm
} from './forms';

export default function DashboardHome({ page }) {
  const [counts, setCounts] = useState({ products: 0, transfers: 0, certs: 0 });

  useEffect(() => {
    // TODO: Fetch actual counts from backend canister
    setCounts({ products: 128, transfers: 57, certs: 32 });
  }, []);

  const renderForm = () => {
    switch (page) {
      case 'add-product': return <AddProductForm />;
      case 'transfer': return <TransferOwnershipForm />;
      case 'certify': return <AddCertificationForm />;
      case 'owner': return <ProductsByOwnerForm />;
      case 'verify': return <VerifyOwnershipForm />;
      case 'history': return <ViewHistoryForm />;
      case 'view': return <ViewProductForm />;
      default: return null;
    }
  };

  return (
    <>
      
      <div data-aos="fade-up" className="mt-4">
        {renderForm()}
      </div>
    </>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="col-sm-4">
      <div className="card text-center shadow-sm">
        <div className="card-body">
          <i className={`bi ${icon} display-4 text-primary`}></i>
          <h5 className="mt-2">{label}</h5>
          <h2 className="fw-bold">{value}</h2>
        </div>
      </div>
    </div>
  );
}
