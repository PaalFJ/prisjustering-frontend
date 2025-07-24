import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { Calendar } from "@/components/shadcn/calendar";
import { Button } from "@/components/shadcn/button";

interface Props {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  label?: string;
}

export function DatePicker({ date, setDate, label }: Props) {
  return (
    <div className="grid gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "dd.MM.yyyy") : <span>Velg dato</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d: Date | undefined) => setDate(d)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
