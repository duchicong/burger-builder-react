import React from 'react';
import classes from './Input.css';

const Input = (props) => {
	let inputElement = null;
	const inputClasses = [classes.InputElement];
	
	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
		
	}

	let validationError = '';
	if (props.invalid && props.touched) {
		validationError = <p className={classes.ErrorMessage}>{props.errorMessage}</p>;
	}

	switch(props.inputElement) {
		case ('input'):
			inputElement = (
				<div>
					<input
						className={inputClasses.join(' ')}
						{...props.elementConfig}
						value={props.value}
						onChange={props.changed}
					/>
					{validationError}
				</div>
			);
			break;
		case ('textarea'):
			inputElement = (
				<div>
					<textarea
						className={inputClasses.join(' ')}
						{...props.elementConfig}
						value={props.value}
						onChange={props.changed}
					/>
					{validationError}
				</div>
			);
			break;
		case ('select'):
			inputElement = (
				<select
					className={inputClasses.join(' ')}
					value={props.value}
					onChange={props.changed}
				>
					{props.elementConfig.options.map(option => (
						<option key={option.value} value={option.value}>{option.displayValue}</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<div>
					<input
						className={inputClasses.join(' ')}
						{...props.elementConfig}
						value={props.value}
						onChange={props.changed}
					/>
					{validationError}
				</div>
			);
	}

	return (
		<div className={classes.Input} >
			<label className={classes.Label} >{props.label}</label>
			{inputElement}
		</div>
	);
}

export default Input;