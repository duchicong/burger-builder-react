import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                inputType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    errorMessage: 'Please enter a valid value!'
                },
                valid: false,
                touched: false
            },
            street: {
                inputType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true,
                    errorMessage: 'Please enter a valid value!'
                },
                valid: false,
                touched: false
            },
            zipCode: {
                inputType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code',
                },
                value: '',
                validation: {
                    required: true,
                    errorMessage: 'Please enter a valid value!'
                },
                valid: false,
                touched: false
            },
            country: {
                inputType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                    errorMessage: 'Please enter a valid value!'
                },
                valid: false,
                touched: false
            },
            email: {
                inputType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    errorMessage: 'Please enter a valid value!'
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                inputType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                validation: {
                    errorMessage: ''
                },
                value: '',
                valid: false
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    checkValidity = (value, rules) => {
        if (!rules) return true;
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        console.log('isvalid ', isValid);
        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        console.log('inputIdentifier ', inputIdentifier);
        // clone all orderForm in state
        const updateOrderForm = {
            ...this.state.orderForm
        }
        // update orderForm with fieldName
        const updateFormElement = {
            ...updateOrderForm[inputIdentifier]
        }
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched = true;
        updateOrderForm[inputIdentifier] = updateFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updateOrderForm) {
            formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updateOrderForm, formIsValid: formIsValid });
    }

    render () {
        console.log('formElementsArray ', this.state);
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        
        const listFormArray = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                inputElement={formElement.config.inputType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
                errorMessage={formElement.config.validation.errorMessage}
            />
        ));

        let form = (
            <form>
                {listFormArray}
                <Button
                    btnType="Success"
                    clicked={this.orderHandler}
                    disabled={!this.state.formIsValid}    
                >
                    ORDER
                </Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;