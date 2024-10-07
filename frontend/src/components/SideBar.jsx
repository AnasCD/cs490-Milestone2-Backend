import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Menu</label>
      </div>
      <div className="drawer-side fixed top-0 left-0">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content */}
          <li><Link to="/">Landing Page</Link></li>  {/* Link to landing page */}
          <li><Link to="/customers">Customers</Link></li>  {/* Link to customers page */}
          <li><Link to="/films">Films</Link></li>  {/* Link to films page */}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
