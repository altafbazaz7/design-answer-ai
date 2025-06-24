import { motion, AnimatePresence } from "framer-motion";
import { TooltipData } from "@/types/dashboard";

interface DataPointTooltipProps {
  data: TooltipData;
}

const DataPointTooltip = ({ data }: DataPointTooltipProps) => {
  return (
    <AnimatePresence>
      {data.visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.15 }}
          className="absolute pointer-events-none z-50"
          style={{
            left: Math.max(10, Math.min(data.x - 60, window.innerWidth - 150)),
            top: Math.max(10, data.y - 80),
          }}
        >
          <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-lg">
            <div className="text-center">
              <div className="text-accent-green font-bold text-lg">{data.value}</div>
              <div className="text-gray-300 text-sm">{data.date}</div>
              <div className="text-xs text-gray-500 mt-1">{data.description}</div>
            </div>
            {/* Tooltip arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-700"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DataPointTooltip;
