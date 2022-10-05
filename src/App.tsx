import { AppContainer } from "./styles";
import Column from "./components/column";
import AddNewItem from "./components/addNewItem";
import { useAppState } from "./state/AppStateContext";
import { addList } from "./state/actions";
import CustomDragLayer from "./components/customDragLayer";

function App() {
  const { lists, dispatch } = useAppState();

  return (
    <AppContainer>
      <CustomDragLayer />
      {lists.map((list) => (
        <Column key={list.id} id={list.id} text={list.text} />
      ))}
      <AddNewItem
        toggleButtonText="Add Another List"
        onAdd={(text) => dispatch(addList(text))}
      />
    </AppContainer>
  );
}

export default App;
