import { GlassWater, Home, MessageCirclePlus, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const sidebarData = [
  {
    label: "home",
    icon: <Home size={20} />,
    href: "/",
  },
  {
    label: "generate message",
    icon: <MessageCirclePlus size={20} />,
    href: "/generate-message",
  },
];

function Sidebar() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const renderLinks = () => (
    <div className="flex flex-col gap-2 mt-4 md:mt-0 md:block">
      {sidebarData.map((item) => (
        <Link key={item.href} to={item.href} onClick={() => setIsOpen(false)}>
          <div
            className={`flex items-center gap-3 capitalize px-4 py-2 rounded-md cursor-pointer duration-300 border-r-4 md:border-r-0 ${
              pathname === item.href
                ? "bg-blue-100/50 md:border-r-blue-500 text-blue-600"
                : "hover:bg-blue-100/30 md:border-r-transparent"
            }`}
          >
            {item.icon}
            {item.label}
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-[300px] bg-secondary border-r h-full min-h-screen">
        <div className="p-4 border-b flex items-center justify-center gap-2">
          <GlassWater />
          <h1 className="font-bold text-xl">OutFlo</h1>
        </div>
        <div className="p-4">{renderLinks()}</div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden bg-secondary w-full border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <GlassWater />
          <h1 className="font-bold text-xl">OutFlo</h1>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Dropdown Links */}
      {isOpen && (
        <div className="md:hidden bg-secondary border-b px-4 p-4">
          {renderLinks()}
        </div>
      )}
    </>
  );
}

export default Sidebar;
