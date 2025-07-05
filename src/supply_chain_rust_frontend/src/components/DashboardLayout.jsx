import { NavLink, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'animate.css';

export default function DashboardLayout() {
  useEffect(() => {
    AOS.init({ duration: 600 });
    }, []);

  const menu = [
    { path: '', label: 'Home', icon: 'bi-house' },
    { path: 'add-product', label: 'Add Product', icon: 'bi-file-earmark-plus' },
    { path: 'transfer', label: 'Transfer Ownership', icon: 'bi-arrow-left-right' },
    { path: 'certify', label: 'Add Certification', icon: 'bi-patch-check' },
    { path: 'owner', label: 'By Owner', icon: 'bi-person-lines-fill' },
    { path: 'verify', label: 'Verify Ownership', icon: 'bi-search' },
    { path: 'history', label: 'View History', icon: 'bi-clock-history' },
    { path: 'view', label: 'View Product', icon: 'bi-box-seam' },
  ];

  return (
    <div className="d-flex flex-nowrap vh-100">
      <nav className="bg-dark text-white flex-shrink-0 p-3" style={{ width: '250px' }}>
        <a href="/" className="navbar-brand text-center mb-4 fs-4">Supply-Chain</a>
        <ul className="nav nav-pills flex-column">
          {menu.map(({ path, label, icon }) => (
            <li className="nav-item mb-1" key={path}>
              <NavLink
                to={path ? `/dashboard/${path}` : '/dashboard'}
                className={({ isActive }) =>
                  `nav-link text-white d-flex align-items-center ${isActive ? 'bg-secondary fw-bold' : ''}`
                }
              >
                <i className={`bi ${icon} me-2`}></i> {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex-grow-1 p-4 bg-light overflow-auto">
        <div data-aos="fade-down" className="animate__animated animate__fadeInDown">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
