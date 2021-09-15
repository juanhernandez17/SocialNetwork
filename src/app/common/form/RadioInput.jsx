// Import essential packages
import React from 'react'
import { Form } from 'semantic-ui-react'


/* Radio Button Input Form:
 *  Select from a list of options, with radio button styles.
 *  Selections are unique, meaning you may only choose one.
 */
const RadioInput = ({input, width, type, label}) => {
  return (
    <Form.Field>
      <div className='ui radio'>
        <input {...input} type={type}/>{' '}
        <label>{label}</label>
      </div>
    </Form.Field>
  );
};

export default RadioInput;
