import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { createDescriptionOnServer, updateDescriptionOnServer } from '../store';

import SubmitDescription from './SubmitDescription';

class UserDescriptions extends Component {
  constructor() {
    super();
    this.state = {}
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.descriptionExists = this.descriptionExists.bind(this);
  }

  componenentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  onChange(formId, input) {
    this.setState({ [formId]: input });
  }

  onSubmit() {
    const dynamicState = this.state;
    const { organization, user, descriptions, updateDescription, createDescription, orgForms } = this.props;
    const ownState = Object.keys(dynamicState);
    if(ownState.length !== orgForms.length) {
      Alert.alert('You must fill out all forms!');
    }
    ownState.forEach(stateItem => {
      const description = descriptions.find(des => des.userId == user.id && des.organizationId === organization.id && des.formId === stateItem)
      // const description = this.descriptionExists(form);
      if(description) {
        updateDescription({
          id: description.id,
          userId: user.id,
          description: dynamicState[stateItem],
          organizationId: organization.id,
          formId: stateItem
        });
      } else {
        createDescription({
          userId: user.id,
          description: dynamicState[stateItem],
          organizationId: organization.id,
          formId: stateItem
        });
      }
    })
  }

  // descriptionExists(form) {
  //   const { user, descriptions, organization } = this.props;
  //   return descriptions.find(des => des.userId == user.id && des.organizationId === organization.id && des.formId === form.id)
  // }

  render() {
    const { orgForms } = this.props;
    const { onChange, onSubmit, descriptionExists } = this;
    const ownState = this.state;
    console.log(this.state);
    return (
      <View>
        <Text h3>User Descriptions</Text>
        {
          orgForms.map(form => {
            // descriptionExists(form)
            return (
              <View
                key={form.id}
                style={styles.borderBox}
              >
                <Text h4>{form.name}</Text>
                <TextInput
                  style={styles.input}
                  value={ownState[form.name]}
                  onChangeText={(ownState) => onChange(form.id, ownState)}
                />
              </View>
            );
          })
        }
        <Button
          raised
          buttonStyle={{ backgroundColor: 'blue', borderRadius: 10 }}
          title='Submit'
          onPress={ () => onSubmit() }
        />
      </View>
    );
  }
}

const mapState = ({ user, forms, descriptions }, { navigation }) => {
  const organization = navigation.getParam('organization', 'no organization');
  const orgForms = forms.filter(form => form.organizationId === organization.id);
  return {
    orgForms,
    organization,
    descriptions,
    user
  }
}

const mapDispatch = dispatch => {
  return {
    createDescription: (description) => dispatch(createDescriptionOnServer(description)),
    updateDescription: (description) => dispatch(updateDescriptionOnServer(description))
  }
}

export default connect(mapState, mapDispatch)(UserDescriptions);

const styles = StyleSheet.create({
  borderBox: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    margin: 10
  },
  input: {
    height: 40,
    backgroundColor: 'rgb(255, 255, 255)',
    marginBottom: 20,
    borderRadius: 10,
    color: 'black',
    paddingHorizontal: 10
  }
});

/*import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';

import SubmitDescription from './SubmitDescription';

class UserDescriptions extends Component {
  render() {
    const { orgForms, organization, descriptions, user } = this.props;
    return (
      <View>
        <Text h3>User Descriptions</Text>
        {
          orgForms.map(form => {
            const description = descriptions.find(des => des.userId == user.id && des.organizationId === organization.id && des.formId === form.id)
            return (
              <View key={form.id}>
                <SubmitDescription form={form} organization={organization} description={description}/>
              </View>
            );
          })
        }
      </View>
    );
  }
}

const mapState = ({ user, forms, descriptions }, { navigation }) => {
  const organization = navigation.getParam('organization', 'no organization');
  const orgForms = forms.filter(form => form.organizationId === organization.id);
  return {
    orgForms,
    organization,
    descriptions,
    user
  }
}

export default connect(mapState)(UserDescriptions);
*/
