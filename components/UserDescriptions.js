import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { createDescriptionOnServer, updateDescriptionOnServer } from '../store';

class UserDescriptions extends Component {
  constructor(props) {
    super(props);
    const { orgForms, organization, user, descriptions } = props;
    const reducedForms = orgForms.reduce((memo, form) => {
      const description = descriptions.find(des => des.userId == user.id && des.organizationId === organization.id && des.formId === form.id)
      if(description) {
        memo[form.id] = description.description;
      } else {
        memo[form.id] = '';
      }
      return memo;
    }, {})
    this.state = reducedForms;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componenentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  onChange(formId, input) {
    this.setState({ [formId]: input });
  }

  onSubmit() {
    const dynamicState = this.state;
    const { organization, user, descriptions, updateDescription, createDescription, orgForms, navigation } = this.props;
    const ownState = Object.keys(dynamicState);
    if(ownState.length !== orgForms.length) {
      Alert.alert('You must fill out all forms!');
      return;
    }
    ownState.forEach(stateItem => {
      const description = descriptions.find(des => des.userId == user.id && des.organizationId === organization.id && des.formId === stateItem)
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
    if(ownState.length === orgForms.length) {
      const bool = ownState.map(item => {
        return !!dynamicState[item]
      })
      if(bool.includes(false)) {
        Alert.alert('You must fill out all forms!')
      } else {
        console.log(bool)
        navigation.goBack();
      }
    }
  }

  render() {
    const { orgForms, descriptions, organization, user } = this.props;
    const { onChange, onSubmit, descriptionExists } = this;
    const ownState = this.state;
    return (
      <View>
        <Text h3>User Descriptions</Text>
        {
          orgForms.map(form => {
            const description = descriptions.find(des => des.userId == user.id && des.organizationId === organization.id && des.formId === form.id)
            return (
              <View
                key={form.id}
                style={styles.borderBox}
              >
                <Text h4>{form.name}</Text>
                <TextInput
                  style={styles.input}
                  value={ownState[form.id]}
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
    user,
    navigation
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
