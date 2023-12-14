import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {logoutUser} from '../redux/actions/user'
export default function Header() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logoutUser());
  }
  return (
    <div className="bg-gray-200 p-4 flex justify-center">
      <ul className="flex">
        <li className="mr-20">
          <NavLink to="/" className="text-blue-500 hover:text-blue-700">
            Home
          </NavLink>
        </li>
        <li className="mr-20">
          <NavLink to="notes" className="text-blue-500 hover:text-blue-700">
            Notes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="login"
            className="text-blue-500 hover:text-blue-700"
            onClick={handleLogout}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
