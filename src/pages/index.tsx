import Card from "@/components/Card";
import DocumentHead from "@/components/DocumentHead";
import TodoList from "@/containers/TodoList";

export default function Home() {
  return (
    <Card>
      <DocumentHead
        title="Itemised"
        description="Get organized and stay on top of your tasks with our web-based todo list application. Keep track of your to-do's, set deadlines, and prioritize your tasks with ease."
      />
      <TodoList />
    </Card>
  );
}
