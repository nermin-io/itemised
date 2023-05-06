import Card from "@/components/Card";
import DatePicker from "@/components/DatePicker";
import { add, startOfToday } from "date-fns";
import { useState } from "react";

export default function DatePickerDemo() {
  const [date, setDate] = useState(add(startOfToday(), { months: 1 }));
  return (
    <Card
      style={{
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DatePicker value={date} onChange={(d) => setDate(d)}>
        <a>Reschedule</a>
      </DatePicker>
    </Card>
  );
}
