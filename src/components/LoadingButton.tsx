import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  additionClass?: string;
};

const LoadingButton = ({ additionClass }: Props) => {
  return (
    <Button disabled className={`flex-1 w-full ${additionClass}`}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Loading
    </Button>
  );
};

export default LoadingButton;
