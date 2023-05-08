import React from "react";
import styles from "./CardRowGroup.module.scss";
import { cva, type VariantProps } from "class-variance-authority";
import { parse } from "date-fns";
import { getDueDays, triage } from "@/helpers";
import type { TodoItem as Todo } from "@/context/todo";
import DatePicker from "./DatePicker";
import TodoItem from "@/containers/TodoItem";
import useTodos from "@/hooks/todo";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const group = cva(styles.base, {
  variants: {
    urgency: {
      high: styles.highUrgency,
      medium: styles.mediumUrgency,
      low: styles.lowUrgency,
    },
  },
  defaultVariants: {
    urgency: "medium",
  },
});

interface Props
  extends React.AllHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof group> {
  dateKey: string;
  items: Array<Todo>;
}

const CardRowGroup: React.FC<Props> = ({ items, dateKey, className }) => {
  const { rescheduleMany, reorderItems } = useTodos();
  const date = parse(dateKey, "LLL d", new Date());
  const urgency = triage(date);
  const dueDays = getDueDays(date);

  const handleReorder = (e: DragEndEvent) => {
    const activeId = e.active.id as string;
    const overId = e.over?.id as string;
    if (activeId !== overId) {
      reorderItems(activeId, overId);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleReorder}>
      <div className={group({ urgency, className })}>
        <div>
          <p>
            {dateKey} ({dueDays})
          </p>
          {urgency === "high" && (
            <DatePicker
              value={date}
              onChange={(d) =>
                rescheduleMany(
                  items.map((item) => item.key),
                  d
                )
              }
            >
              <a>Reschedule</a>
            </DatePicker>
          )}
        </div>
        <SortableContext
          items={items.map((i) => i.key)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <TodoItem key={item.key} item={item} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default CardRowGroup;
