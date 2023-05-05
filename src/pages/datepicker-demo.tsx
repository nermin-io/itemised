import Card from "@/components/Card";
import DatePicker from "@/components/DatePicker";

export default function DatePickerDemo() {
  return (
    <Card
      style={{
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DatePicker />
    </Card>
  );
}
