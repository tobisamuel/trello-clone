import { useState } from "react";
import { NewItemFormContainer, NewItemInput, NewItemButton } from "../styles";
import { useFocus } from "../utils/useFocus";

type NewItemProps = {
  onAdd(text: string): void;
};

const NewItemForm = ({ onAdd }: NewItemProps) => {
  const [text, setText] = useState("");
  const inputRef = useFocus();

  const handleAddText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAdd(text);
    }
  };

  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleAddText}
      />
      <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  );
};

export default NewItemForm;
