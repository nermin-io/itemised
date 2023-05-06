import Card from "@/components/Card";
import DatePicker from "@/components/DatePicker";
import { add, format, startOfToday } from "date-fns";
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
      <p>{format(date, "EEE MMM d")}</p>
      <DatePicker value={date} onChange={(d) => setDate(d)} />
    </Card>
  );
}
