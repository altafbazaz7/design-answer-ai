import { X } from "lucide-react";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

interface VariableTagProps {
  name: string;
  onRemove: () => void;
  className?: string;
  variant?: 'green' | 'yellow' | 'gray';
}

const VariableTag = ({ name, onRemove, className = "", variant = 'gray' }: VariableTagProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'green':
        return 'bg-green-900/30 border-green-700 text-green-300';
      case 'yellow':
        return 'bg-yellow-900/30 border-yellow-700 text-yellow-300';
      case 'gray':
      default:
        return 'bg-gray-800 border-gray-600 text-gray-300';
    }
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className={`inline-flex items-center px-3 py-1.5 text-xs rounded-full border ${getVariantStyles()} ${className}`}
    >
      {name}
      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="ml-2 h-auto p-0 text-gray-400 hover:text-red-400 transition-colors"
      >
        <X className="h-3 w-3" />
      </Button>
    </motion.span>
  );
};

export default VariableTag;
