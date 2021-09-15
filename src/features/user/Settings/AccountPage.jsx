// Import essential modules
import React from "react";
import {
  Segment,
  Header,
  Button,
  Form,
  Grid,
  Divider,
  Label
} from "semantic-ui-react";
import Helmet from 'react-helmet';
import { Field, reduxForm } from "redux-form";
import {
  combineValidators,
  matchesField,
  isRequired,
  composeValidators
} from "revalidate";

// Import out modules
import TextInput from "../../../app/common/form/TextInput";
import SettingsNav from "./SettingsNav";

const validate = combineValidators({
  newPassword1: isRequired({ message: "Please enter a password" }),
  newPassword2: composeValidators(
    isRequired({ message: "Please confirm your new password" }),
    matchesField("newPassword1")({ message: "Passwords do not match" })
  )()
});

const AccountPage = ({
  error,
  invalid,
  submitting,
  handleSubmit,
  updatePassword,
  providerId
}) => {
  return (
    <Grid>
      <Helmet>
        <title>UnMe - Account Management</title>
      </Helmet>
      <Grid.Column width={11}>
        <Segment>
          <Header dividing size="large" content="Account" />
          {providerId && providerId === "password" && (
            <div>
              <Header color="teal" sub content="Change password" />
              <Form onSubmit={handleSubmit(updatePassword)}>
                <Field
                  width={8}
                  name="newPassword1"
                  type="password"
                  pointing="left"
                  inline={true}
                  component={TextInput}
                  basic={true}
                  placeholder="New Password"
                />
                <Field
                  width={8}
                  name="newPassword2"
                  type="password"
                  inline={true}
                  basic={true}
                  pointing="left"
                  component={TextInput}
                  placeholder="Confirm Password"
                />
                {error && (
                  <Label basic color="red">
                    {error}
                  </Label>
                )}
                <Divider />
              </Form>
            </div>
          )}
        </Segment>
      </Grid.Column>
      <Grid.Column width={5}>
        <SettingsNav />
        <Button
          fluid
          disabled={invalid || submitting}
          size="large"
          positive
          content="Update Password"
          onClick={handleSubmit(updatePassword)}
        />
      </Grid.Column>
    </Grid>
  );
};

export default reduxForm({ form: "account", validate })(AccountPage);
