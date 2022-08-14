import { Label, Input } from './Filter.styled';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => {
    return (
        <Label htmlFor=''>
            Find contacts by name
            <Input type="text" value={value} onChange={onChange} />
        </Label>
    );
};


Filter.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};


export default Filter;