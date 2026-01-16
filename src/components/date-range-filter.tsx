import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/button";
import { Calendar } from "@/components/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/popover";
import { twMerge } from "tailwind-merge";
import { formatDate, removeZoneFromJSDate } from "@/utils/date.utils";

type DateRangeFilterChange = {
  startDate?: string;
  endDate?: string;
};

type DateRangeFilterProps = {
  startDate?: string;
  endDate?: string;
  className?: string;
  onChange: (value: DateRangeFilterChange) => void;
};

export const DateRangeFilter = ({
  startDate,
  endDate,
  className,
  onChange,
}: DateRangeFilterProps) => {
  const handleSelectStart = (date?: Date) => {
    if (date) {
      onChange({ startDate: removeZoneFromJSDate(date).toISOString() });
    } else {
      onChange({
        startDate: undefined,
      });
    }
  };

  const handleSelectEnd = (date?: Date) => {
    if (date) {
      onChange({ endDate: removeZoneFromJSDate(date).toISOString() });
    } else {
      onChange({ endDate: undefined });
    }
  };

  return (
    <div className={twMerge("flex flex-wrap gap-4", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!startDate}
            className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
          >
            <CalendarIcon />
            {startDate ? formatDate(startDate) : <span>Date de début</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-10">
          <Calendar
            mode="single"
            selected={startDate ? new Date(startDate) : undefined}
            onSelect={handleSelectStart}
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!endDate}
            className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
          >
            <CalendarIcon />
            {endDate ? formatDate(endDate) : <span>Date de fin</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-10">
          <Calendar
            mode="single"
            selected={endDate ? new Date(endDate) : undefined}
            onSelect={handleSelectEnd}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
