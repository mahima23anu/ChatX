import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
            <Link to="/"></Link>
          <li>
            <Link to="/LogIn">LogIn</Link>
          </li>
          <li>
            <Link to="/Main_page">Main_Page</Link>
          </li>

        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
