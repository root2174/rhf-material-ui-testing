import React from 'react';
import { Checkbox, Typography, FormControlLabel } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

// react-hook-form
import { useForm, Controller } from 'react-hook-form';

// COMPONENTS
import Form from '../Form';
import MainContainer from '../MainContainer';
import Input from '../Input';
import Button from '../Button';
import { useData } from '../../data/DataContext';

// YUP
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import parsePhoneNumberFromString from 'libphonenumber-js';

// SCHEMA
const schema = yup.object().shape({
	email: yup
		.string()
		.required('This is a required field')
		.email('Should be an email.'),
});

const Security = () => {
	const { setValues, data } = useData();
	const history = useHistory();

	const { handleSubmit, control, reset, watch, register } = useForm({
		mode: 'onChange',
		defaultValues: {
			email: data.email,
			hasPhone: data.hasPhone,
			phoneNumber: data.phoneNumber,
		},
		resolver: yupResolver(schema),
	});

	const hasPhone = watch('hasPhone');

	const normalizePhoneNumber = (value) => {
		const phoneNumber = parsePhoneNumberFromString(value);
		if (!phoneNumber) {
			return value;
		}
		return phoneNumber.formatInternational();
	};

	const onSubmit = (values) => {
		console.log(values);
		setValues(values);
	};

	const onReset = () => {
		reset({
			email: data.email,
			hasPhone: data.hasPhone,
			phoneNumber: data.phoneNumber,
		});
	};

	const hasPhoneRef = register('hasPhone');

	return (
		<MainContainer>
			<Typography>🚀 Security</Typography>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name='email'
					render={({ field, fieldState: { error } }) => (
						<Input
							{...field}
							type='email'
							label='Email'
							ref={field.ref}
							error={!!error}
							helperText={error?.message}
						/>
					)}
				/>

				<FormControlLabel
					control={
						<Checkbox
							defaultValue={data.hasPhone}
							defaultChecked={data.hasPhone}
							color='primary'
							inputRef={hasPhoneRef.ref}
							onChange={hasPhoneRef.onChange}
							onBlur={hasPhone.onBlur}
							name='hasPhone'
						/>
					}
					label='Do you have a phone?'
				/>

				{hasPhone && (
					<Controller
						control={control}
						name='phoneNumber'
						render={({ field, fieldState: { error } }) => (
							<Input
								{...field}
								type='tel'
								label='Phone Number'
								ref={field.ref}
								error={!!error}
								helperText={error?.message}
								onChange={(event) => {
									field.onChange(normalizePhoneNumber(event.target.value));
								}}
							/>
						)}
					/>
				)}
				<Button type='submit' color='primary'>
					Finish
				</Button>
				<Button type='button' color='secondary' onClick={onReset}>
					Reset Form
				</Button>
				<Button type='button' color='default' onClick={() => history.push('/')}>
					Go Back
				</Button>
			</Form>
		</MainContainer>
	);
};

export default Security;
