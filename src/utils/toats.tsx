import { useToast } from "@//hooks/use-toast";

export const useShowToast = () => {
  const { toast } = useToast();
  const showToast = (title: string, description?: string, variant?: "default" | "destructive" | "success" | null) => {
    toast({ 
      variant,
      title,
      description,
    });
  };
  return { showToast };
};
