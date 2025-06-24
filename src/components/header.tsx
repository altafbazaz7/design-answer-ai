import { Search } from "lucide-react";
import { Input } from "../components/ui/input";

const Header = () => {
  const navigationTabs = [
    { name: "Charging Stations", active: true },
    { name: "Fleet Sizing", active: false },
    { name: "Parking", active: false },
  ];

  return (
    <header className="dashboard-dark border-b border-dark-border px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <nav className="flex items-center space-x-6 text-sm">
          {navigationTabs.map((tab, index) => (
            <span
              key={index}
              className={`transition-colors duration-200 ${
                tab.active 
                  ? 'text-white font-medium' 
                  : 'text-gray-400 hover:text-gray-300 cursor-pointer'
              }`}
            >
              {tab.name}
            </span>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search"
            className="bg-gray-800 border border-dark-border pl-10 w-64 text-sm focus:border-accent-green"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
