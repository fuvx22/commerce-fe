import { Ellipsis } from "lucide-react";

const LoadingPanel = () => {
  return (
    <div className="w-full h-full">
      <Ellipsis size={64} className="mx-auto mt-16 animate-bounce" />
    </div>
  );
};

export default LoadingPanel;
