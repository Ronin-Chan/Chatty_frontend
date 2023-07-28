import React from 'react';
import PropTypes from 'prop-types';
import '../input/Input.scss';

const Input = ({
  id,
  name,
  type,
  value,
  className,
  labelText,
  placeholder,
  handleChange,
  style,
}) => {
  return (
    <>
      <div className="form-row">
        {labelText && <label>{labelText}</label>}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          style={style}
          className={`form-input ${className}`}
          autoComplete="false"
        />
      </div>
    </>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  className: PropTypes.string,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  style: PropTypes.object,
};

export default Input;
