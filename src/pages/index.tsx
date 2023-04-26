import Button from "@/components/Button";
import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import CardHeader from "@/components/CardHeader";

export default function Home() {
  return (
    <Card>
      <CardHeader>
        My List
        <Button>Add Task</Button>
      </CardHeader>
      <CardBody>Hello World</CardBody>
    </Card>
  );
}
