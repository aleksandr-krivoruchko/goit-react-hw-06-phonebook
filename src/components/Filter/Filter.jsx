import { Label, Input } from '../Form/FormStyle.styled';
import { useSelector, useDispatch } from 'react-redux';
import { filter } from "../../redux/store";

export function Filter() {
  const dispatch = useDispatch();

  return (
    <>
      <Label>
        Find contacts by name
        <Input
          onChange={e => dispatch(filter(e.target.value))}
          type="text"
        />
      </Label>
    </>
  );
}

