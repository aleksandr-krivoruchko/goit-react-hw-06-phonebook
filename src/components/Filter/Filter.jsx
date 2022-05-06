import { Label, Input } from '../Form/FormStyle.styled';
import { useDispatch } from 'react-redux';
import { filter } from '../../redux/persist';

export function Filter() {
  const dispatch = useDispatch();

  return (
    <>
      <Label>
        Find contacts by name
        <Input onChange={e => dispatch(filter(e.target.value))} type="text" />
      </Label>
    </>
  );
}
