import { 
  Home, 
  BatteryCharging, 
  BarChart3, 
  Cloud, 
  Settings, 
  Info,
  Menu
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../components/ui/tooltip";

const Sidebar = () => {
  const navigationItems = [
    { icon: Home, label: "Home", active: true },
    { icon: BatteryCharging, label: "Charging Stations", active: false },
    { icon: BarChart3, label: "Analytics", active: false },
    { icon: Cloud, label: "Cloud Services", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <aside className="w-16 sidebar-dark border-r border-dark-border flex flex-col items-center py-4 space-y-6">
      {/* Hamburger Menu */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Menu</p>
        </TooltipContent>
      </Tooltip>
      
      {/* Navigation Icons */}
      <nav className="flex flex-col space-y-4">
        {navigationItems.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`p-2 transition-all duration-200 ${
                  item.active 
                    ? 'text-white bg-gray-800' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <item.icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </nav>
      
      {/* Bottom Icon */}
      <div className="mt-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-white hover:bg-gray-800 p-2"
            >
              <Info className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Information</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </aside>
  );
};

export default Sidebar;
