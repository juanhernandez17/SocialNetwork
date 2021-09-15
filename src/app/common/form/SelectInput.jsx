// Import essential packages
import React from 'react'
import { Form, Label, Select } from 'semantic-ui-react'


/* Selection Input Form:
 *  Similar to the radio button form, however a dropdown list is
 *  provided here, and has the option to select more than one item
 *  from the list.
 */
const SelectInput = ({input, type, placeholder, multiple, options, meta: {touched, error}}) => {
  return (
    <Form.Field error={touched && !!error}>
      <Select
        value={input.value || null}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
        options={options}
        multiple={multiple}
      />
      {touched && error && <Label basic color='red'>{error}</Label>}
    </Form.Field>
  );
};

export default SelectInput;
