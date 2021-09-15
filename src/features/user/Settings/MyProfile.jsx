// Import essential packages
import React, { Component } from "react";
import {
  Segment,
  Form,
  Grid,
  Sticky,
  Header,
  Divider,
  Button
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import moment from "moment";
import Helmet from "react-helmet";

// Import our modules
	// forms:
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import TextInput from "../../../app/common/form/TextInput";
import RadioInput from "../../../app/common/form/RadioInput";
import SelectInput from "../../../app/common/form/SelectInput";
import TextArea from "../../../app/common/form/TextArea";
	// renderables:
import SettingsNav from './SettingsNav';


// Some constants for input options
const genderOptions = [
  { key: "no disclose", text: "Do Not Disclose", value: "no disclose" },
  { key: "woman", text: "Woman", value: "woman" },
  { key: "man", text: "Man", value: "man" },
  { key: "non-binary", text: "Non-Binary", value: "non-binary" },
  {
    key: "gender non-conforming",
    text: "Gender Non-Conforming",
    value: "gender non-conforming"
  },
  { key: "trans man", text: "Trans Man", value: "trans man" },
  { key: "trans woman", text: "Trans Woman", value: "trans woman" },
  { key: "other", text: "Other", value: "other" }
];

const interestOptions = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

/* My Profile:
 *  Access your profile settings and such
 */
class MyProfile extends Component {
  render() {
    const { pristine, submitting, handleSubmit, updateProfile } = this.props;
    return (
      <div>
        <Helmet>
          <title>UnMe - Profile Settings</title>
        </Helmet>
        <Grid>
          <Grid.Column width={11}>
            <Segment>
              <Form onSubmit={handleSubmit(updateProfile)}>
              	<Header size="large" content="Basics" />
                <Form.Group inline>
									<label>Username: </label>
									<Field
                  width={8}
                  name="displayName"
                  type="text"
                  component={TextInput}
                  placeholder="Username"
									/>
								</Form.Group>
         				<label><b>Bio:</b> </label>
								<Field
									name="about"
									component={TextArea}
									rows={4}
									placeholder="Let us know a little bit about you"
								/>
								<Form.Group inline>
									<label>Your Interests: </label>
									<Field
										name="interests"
										component={SelectInput}
										options={interestOptions}
										value="interests"
										multiple={true}
										placeholder="Select your interests"
									/>
								</Form.Group>
								<Divider />
              	<Header size="large" content="About Me" />
                <Form.Group inline>
                  <label>Relationship status: </label>
                  <Field
                    name="status"
                    component={RadioInput}
                    type="radio"
                    value="single"
                    label="Single"
                  />
                  <Field
                    name="status"
                    component={RadioInput}
                    type="radio"
                    value="relationship"
                    label="Relationship"
                  />
                  <Field
                    name="status"
                    component={RadioInput}
                    type="radio"
                    value="married"
                    label="Married"
                  />
                </Form.Group>
								<Form.Group inline>
                  <label>Gender: </label>
                  <Field
										width={8}
                    name="gender"
                    type="select"
                    value="no disclose"
                    label="gender"
                    options={genderOptions}
                    component={SelectInput}
                  />
                </Form.Group>
								<Form.Group inline>
									<label>Date of Birth: </label>
        	        <Field
										width={8}
										name="dateOfBirth"
										component={DateInput}
										dateFormat="YYYY-MM-DD"
										showYearDropdown={true}
										showMonthDropdown={true}
										dropdownMode="select"
										maxDate={moment().subtract(18, "years")}
										placeholder="Date of Birth"
        	        />
								</Form.Group>
								<Form.Group inline>
									<label>Home Town: </label>
									<Field
										name="city"
										placeholder="Home Town"
										options={{ types: ["(cities)"] }}
										label="Female"
										component={PlaceInput}
										width={8}
									/>
								</Form.Group>
								<Form.Group inline>
                <label>Occupation:</label>
									<Field
										width={8}
										name="occupation"
										type="text"
										component={TextInput}
										placeholder="Occupation"
									/>
								</Form.Group>
								<Form.Group inline>
									<label>Country of Origin:</label>
									<Field
										width={8}
										name="origin"
										options={{ types: ["(regions)"] }}
										component={PlaceInput}
										placeholder="Country of Origin"
									/>
								</Form.Group>
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column width={5}>
            <Sticky>
      				<SettingsNav />
              <Button
                disabled={pristine || submitting}
                size="large"
								positive
								fluid
								content="Update Profile"
								onClick={handleSubmit(updateProfile)}
              />
            </Sticky>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default reduxForm({
  form: "userProfile",
  enableReinitialize: true,
  destroyOnUnmount: false
})(MyProfile);
