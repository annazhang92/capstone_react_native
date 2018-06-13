import React from 'react';
import { connect } from 'react-redux';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text, FormLabel, FormInput } from 'react-native-elements';

import { updateUserOnServer } from '../store';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        const { user } = this.props;
        this.state = {
            id: user ? user.id : undefined,
            firstName: user ? user.firstName : '',
            lastName: user ? user.lastName : '',
            email: user ? user.email : '',
            password: user ? user.password : '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validators = {
            firstName: value => {
                if (!value) return 'First Name is required.';
            },
            lastName: value => {
                if (!value) return 'Last Name is required.';
            },
            email: value => {
                if (!value) return 'Email address is required.';
            },
            password: value => {
                if (!value) return 'Password is required.';
            }
        }
    }

    onChange(name, value) {
        this.setState({ [name]: value });
    }

    onSubmit(user) {
        const { updateUser } = this.props;
        const errors = Object.keys(this.validators).reduce((memo, key) => {
            const validator = this.validators[key];
            const value = this.state[key];
            const error = validator(value);
            if (error) {
                memo[key] = error;
            }
            return memo;
        }, {});
        this.setState({ errors });
        if (Object.keys(errors).length) {
            return;
        }
        const { firstName, lastName, email, password } = this.state;
        updateUser({
            id: user.id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        });
    }



    render() {
        const { onChange, onSubmit } = this;
        const { user } = this.props;
        const { firstName, lastName, email, password, errors } = this.state;
        return (
            <View>
                <Text style={styles.header} h3>My Profile</Text>
                <Text style={styles.error}>{errors.firstName}</Text>
                <FormLabel>First Name</FormLabel>
                <FormInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={value => onChange('firstName', value)}
                />
                <Text style={styles.error}>{errors.lastName}</Text>
                <FormLabel>Last Name</FormLabel>
                <FormInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={value => onChange('lastName', value)}
                />
                <Text style={styles.error}>{errors.email}</Text>
                <FormLabel>Email</FormLabel>
                <FormInput
                    style={styles.input}
                    value={email}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={value => onChange('email', value)}
                />
                <Text style={styles.error}>{errors.password}</Text>
                <FormLabel>Password</FormLabel>
                <FormInput
                    style={styles.input}
                    value={password}
                    onChangeText={value => onChange('password', value)}
                />
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => onSubmit(user)}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapState = ({ user }) => {
    return { user }
}

const mapDispatch = (dispatch) => {
    return {
        updateUser: (user) => dispatch(updateUserOnServer(user))
    }
}

export default connect(mapState, mapDispatch)(UserProfile)

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        marginTop: 10,
        padding: 5,
    },
    input: {
        height: 40,
        backgroundColor: 'rgb(255, 255, 255)',
        marginBottom: 20,
        borderRadius: 10,
        color: 'black',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15,
        borderRadius: 50,
        marginBottom: 10,
        marginTop: 10,
        paddingHorizontal: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF'
    },
});