import Calendar from "@/components/Calendar";
import Card from "@/components/Card";

export default function CalendarDemo() {
  return (
    <Card
      style={{
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Calendar />
    </Card>
  );
}
