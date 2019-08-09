import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import pt from 'date-fns/locale/pt';
import ReactDatePicker from 'react-datepicker';
import { useField } from '@rocketseat/unform';
import 'react-datepicker/dist/react-datepicker.css';

function DatePicker({ name, placeholder }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
    // eslint-disable-next-line
  }, [ref.current, fieldName]);

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        placeholderText={placeholder}
        selected={selected}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={60}
        dateFormat="dd/MM/yyyy HH:mm"
        locale={pt}
        onChange={date => setSelected(date)}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

DatePicker.defaultProps = {
  placeholder: '',
};

export default DatePicker;
