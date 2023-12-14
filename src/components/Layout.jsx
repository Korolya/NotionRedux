import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div>
      <Header />
      <div className="flex flex-col mx-auto w-2/3 gap-2 py-2">
        <Outlet />
      </div>
    </div>
  );
}
