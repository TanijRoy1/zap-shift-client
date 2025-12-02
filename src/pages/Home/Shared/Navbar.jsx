import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../../components/Logo";
import MyContainer from "../../../components/MyContainer";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const links = (
    <>
      <li>
        <NavLink to={`/`} className={`myNavLink`}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to={`/send-parcel`} className={`myNavLink`}>
          Send Parcel
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink to={`/dashboard`} className={`myNavLink`}>
            Dashboard
          </NavLink>
        </li>
      )}

      <li>
        <NavLink to={`/coverage`} className={`myNavLink`}>
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink to={`/about-us`} className={`myNavLink`}>
          About Us
        </NavLink>
      </li>
    </>
  );

  const handleSignOutUser = () => {
    signOutUser()
      .then(() => {
        toast.success("Sign Out Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="bg-base-300">
      <MyContainer>
        <div className="bg-base-100 shadow-sm navbar rounded-2xl lg:px-6">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {links}
                <div className="flex lg:hidden flex-col gap-2 mt-3">
                  {user ? (
                    <button
                      onClick={handleSignOutUser}
                      className="btn btn-primary btn-outline"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <Link
                      to={`/login`}
                      className="btn btn-primary btn-outline text-accent"
                    >
                      Sign In
                    </Link>
                  )}
                  <Link to={`/rider`} className="btn btn-primary text-accent">
                    Be a Rider
                  </Link>
                </div>
              </ul>
            </div>
            <Logo></Logo>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
          <div className="navbar-end">
            <div className="lg:flex hidden gap-2">
              {user ? (
                <div className="flex items-center gap-1.5">
                  <img
                    src={user.photoURL}
                    className="w-10 h-10 border-2 border-accent object-cover rounded-full"
                    alt=""
                  />
                  <button
                    onClick={handleSignOutUser}
                    className="btn btn-primary btn-outline"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to={`/login`}
                  className="btn btn-primary btn-outline text-accent"
                >
                  Sign In
                </Link>
              )}
              <Link to={`/rider`} className="btn btn-primary text-accent">
                Be a Rider
              </Link>
            </div>

            <div className="flex lg:hidden gap-2">
              {user ? (
                
                  <img
                    src={user.photoURL}
                    className="w-10 h-10 border-2 border-accent object-cover rounded-full"
                    alt=""
                  />
                  
                
              ) : (
                <Link
                  to={`/login`}
                  className="btn btn-primary btn-outline text-accent"
                >
                  Sign In
                </Link>
              )}
              
            </div>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Navbar;
