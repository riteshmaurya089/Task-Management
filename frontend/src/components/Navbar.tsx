import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Navbar = () => {
  const navigate = useNavigate();
  
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
     toast.success("Logout successful! 🎉");
    navigate("/login");
  };

  return (
    <nav className="py-2.5 sticky top-0 z-10 bg-white">
      <div className=" px-10  flex justify-between items-center">

      <div className="flex items-center gap-5">
        <img src="https://taskfyer.vercel.app/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F19819005%3Fv%3D4&w=96&q=75" alt="" 
        className="h-14 w-14 rounded-full"
        />
        <Link to="/" className="text-xl font-bold">
          Task Manager
        </Link>
      </div>
       

        <div className="space-x-10">
          {isAuthenticated ? (
            <>
              <Link to="/" className="font-semibold text-neutral-800 ">
                My Tasks
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 cursor-pointer rounded-3xl font-medium px-8 duration-700 py-1.5 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-green-100  font-medium px-8 py-2.5 hover:bg-indigo-200 transition-all duration-700 rounded-md cursor-pointer">
                Login
              </Link>
              <Link to="/signup" className="bg-green-100  font-medium px-8 py-2.5 hover:bg-indigo-200 transition-all duration-700 rounded-md  cursor-pointer">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
