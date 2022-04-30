import PropTypes from 'prop-types';
import { Label, Input } from '../Form/FormStyle.styled';
import { useSelector, useDispatch } from 'react-redux';

export function Filter() {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  return (
    <>
      <Label>
        Find contacts by name
        <Input
          value={filter}
          onChange={e => dispatch(e.target.value)}
          type="text"
        />
      </Label>
    </>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};
