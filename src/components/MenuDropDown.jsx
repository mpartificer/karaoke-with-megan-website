import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

const MenuDropdown = ({
  user,
  onNavigate,
  onMenuClick,
  onLogout,
  isDesktop = false,
  currentPage = "home",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleMenuItemClick = (action, target) => {
    setIsDropdownOpen(false);

    if (action === "navigate") {
      onNavigate(target);
    } else if (action === "scroll") {
      onMenuClick(target);
    } else if (action === "logout") {
      onLogout();
    }
  };

  const handleUploadClick = () => {
    if (!user) {
      onNavigate("login");
    } else {
      onNavigate("upload");
    }
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  // Determine section prefix based on desktop mode
  const sectionPrefix = isDesktop ? "desktop-" : "";

  return (
    <div
      className={`sticky top-0 z-50 w-full flex bg-primary py-2 px-4 flex-shrink-0 ${
        user ? "justify-between" : "justify-center"
      } items-center`}
    >
      <div className="relative dropdown-container">
        <button
          className="btn m-1 justify-self-center bg-primary cursor-pointer"
          onClick={handleToggleDropdown}
        >
          <Menu color="#DFFE59" />
        </button>

        {isDropdownOpen && (
          <ul
            className={`absolute top-full border-accent border-2 flex flex-col text-secondary text-lg text-center max-w-xl bg-primary rounded-box z-[60] w-52 p-2 mt-1 ${
              user ? "left-0" : "left-1/2 transform -translate-x-1/2"
            }`}
          >
            <li>
              <button
                className="text-secondary w-full p-2 text-center cursor-pointer bg-transparent border-none hover:bg-accent rounded"
                onClick={() =>
                  currentPage === "home"
                    ? handleMenuItemClick("scroll", `${sectionPrefix}events`)
                    : handleMenuItemClick("navigate", "home")
                }
              >
                events
              </button>
            </li>
            <li>
              <button
                className="text-secondary w-full p-2 text-center cursor-pointer bg-transparent border-none hover:bg-accent rounded"
                onClick={() =>
                  currentPage === "home"
                    ? handleMenuItemClick(
                        "scroll",
                        `${sectionPrefix}private-events`
                      )
                    : handleMenuItemClick("navigate", "home")
                }
              >
                request a private event
              </button>
            </li>
            <li>
              <button
                className="text-secondary w-full p-2 text-center cursor-pointer bg-transparent border-none hover:bg-accent rounded"
                onClick={() =>
                  currentPage === "home"
                    ? handleMenuItemClick("scroll", `${sectionPrefix}about`)
                    : handleMenuItemClick("navigate", "home")
                }
              >
                about us
              </button>
            </li>
            <li>
              <button
                className="text-secondary w-full p-2 text-center cursor-pointer bg-transparent border-none hover:bg-accent rounded"
                onClick={() =>
                  currentPage === "home"
                    ? handleMenuItemClick("scroll", `${sectionPrefix}faqs`)
                    : handleMenuItemClick("navigate", "home")
                }
              >
                FAQs
              </button>
            </li>
            <li>
              <button
                className="text-secondary w-full p-2 text-center cursor-pointer bg-transparent border-none hover:bg-accent rounded"
                onClick={handleUploadClick}
              >
                upload your photos & videos
              </button>
            </li>
            {user && (
              <li>
                <button
                  className="text-red-400 w-full p-2 text-center cursor-pointer bg-transparent border-none hover:bg-red-600 hover:text-white rounded"
                  onClick={() => handleMenuItemClick("logout")}
                >
                  logout
                </button>
              </li>
            )}
          </ul>
        )}
      </div>

      {user && (
        <div className="text-secondary text-sm">
          {currentPage === "upload"
            ? `Welcome, ${user.name}!`
            : `Hi, ${user.name}!`}
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
