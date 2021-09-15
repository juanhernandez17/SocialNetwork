// Import Essential Packages
import React from 'react'
import { Form, Label } from 'semantic-ui-react'


/* Text Area Input Form:
 *  Like Text input, only you may adjust the size
 *  of the area which you input text
 */
const TextArea = ({input, rows, width, type, placeholder, meta: {touched, error}}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <textarea {...input} placeholder={placeholder} rows={rows}></textarea>
      {touched && error && <Label basic color='red'>{error}</Label>}
    </Form.Field>
  );
};

export default TextArea;
