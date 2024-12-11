import { Ellipsis } from "lucide-react";
const LoadingPanel = () => {
  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center">
      <Ellipsis size={64} className="animate-bounce" />
    </div>
  );
};

export default LoadingPanel;
