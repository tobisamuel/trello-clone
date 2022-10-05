import { useDragLayer } from "react-dnd";
import Column from "./column";
import Card from "./card";
import { CustomDragLayerContainer, DragPreviewWrapper } from "../styles";
import { useAppState } from "../state/AppStateContext";

const CustomDragLayer = () => {
  const { draggedItem } = useAppState();
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        {draggedItem.type === "COLUMN" ? (
          <Column id={draggedItem.id} text={draggedItem.text} isPreview />
        ) : (
          <Card
            id={draggedItem.id}
            text={draggedItem.text}
            columnId={draggedItem.columnId}
            isPreview
          />
        )}
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : null;
};

export default CustomDragLayer;
