import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import UpdateUserForm from "../components/User/UpdateUserForm";
import { turnOnDarkMode, turnOnLightMode } from "../components/User/userSlice";
function User() {
  const { mode } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  function handleToggleDarkMode() {
    if (mode === "dark") dispatch(turnOnLightMode());
    if (mode === "light") dispatch(turnOnDarkMode());
  }

  return (
    <>
      <button
        className="mt-4 ml-4 lg:mt-0 lg:ml-0"
        onClick={handleToggleDarkMode}
      >
        <div>
          {mode === "dark" && <FaSun className="lg:w-8 lg:h-8 w-6 h-6" />}
          {mode === "light" && <FaMoon className="lg:w-8 lg:h-8 w-6 h-6" />}
        </div>
      </button>

      <div className="pb-4 mx-auto w-3/4 min-h-screen">
        <div
          style={{
            boxShadow:
              " inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05),0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
          }}
        >
          <div></div>
          <UpdateUserForm />
        </div>
      </div>
    </>
  );
}

export default User;
