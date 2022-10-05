import { ColumnContainer, ColumnTitle } from "../styles";
import AddNewItem from "./addNewItem";
import Card from "./card";
import { useAppState } from "../state/AppStateContext";
import { addTask, moveList, moveTask, setDraggedItem } from "../state/actions";
import { useRef } from "react";
import { useItemDrag } from "../utils/useItemDrag";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { isHidden } from "../utils/isHidden";

type ColumnProps = {
  id: string;
  text: string;
  isPreview?: boolean;
};

const Column = ({ id, text, isPreview }: ColumnProps) => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState();
  const tasks = getTasksByListId(id);
  // ref for column div that is the drag target
  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useItemDrag({ type: "COLUMN", id, text });
  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return;
        }
        dispatch(moveList(draggedItem.id, id));
      } else {
        if (draggedItem.columnId === id) {
          return;
        }
        if (tasks.length) {
          return;
        }
        dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
      }
    }),
  });

  drag(drop(ref));

  return (
    <ColumnContainer
      ref={ref}
      isPreview={isPreview}
      isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card key={task.id} id={task.id} text={task.text} columnId={id} />
      ))}
      <AddNewItem
        toggleButtonText="Add Another Card"
        onAdd={(text) => dispatch(addTask(id, text))}
        dark
      />
    </ColumnContainer>
  );
};

export default Column;
