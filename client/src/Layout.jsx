import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
            <Link to="/"></Link>
          <li>
            <Link to="/login">LogIn</Link>
          </li>
          <li>
            <Link to="/main_page">Main_Page</Link>
          </li>

        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
