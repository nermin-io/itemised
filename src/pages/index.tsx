import Button from "@/components/Button";
import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import CardHeader from "@/components/CardHeader";
import CardRow from "@/components/CardRow";

const exampleTasks = [
  {
    title: "Lorem ipsum",
    description: "Description",
  },
  {
    title: "Lorem ipsum",
    description: "Description",
  },
  {
    title: "Lorem ipsum",
    description: "Description",
  },
  {
    title: "Lorem ipsum",
    description: "Description",
  },
  {
    title: "Lorem ipsum",
    description: "Description",
  },
  {
    title: "Lorem ipsum",
    description: "Description",
  },
  {
    title: "Lorem ipsum",
    description: "Description",
  },
  {
    title: "Lorem ipsum",
    description: "Description",
  },
];

export default function Home() {
  return (
    <Card>
      <CardHeader>
        <p>My List</p>
        <Button>Add Task</Button>
      </CardHeader>
      <CardBody>
        {exampleTasks.map((task, idx) => (
          <CardRow key={idx}>
            <input type="radio" />
            <div>
              <p>{task.title}</p>
              <p>{task.description}</p>
            </div>
          </CardRow>
        ))}
      </CardBody>
    </Card>
  );
}
