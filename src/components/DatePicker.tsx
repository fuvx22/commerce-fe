import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
};

function DatePicker({ date, setDate }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[200px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <Calendar
          mode="single"
          selected={date || undefined}
          onSelect={(day) => day && setDate(day)}
          initialFocus
        />
        <div className="text-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDate(undefined)}
          >
            Xóa
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
