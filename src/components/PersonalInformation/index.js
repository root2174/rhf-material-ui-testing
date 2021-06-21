// React
import React from 'react';
import { useHistory } from 'react-router-dom';

// react-hook-form
import { useForm, Controller } from 'react-hook-form';

// Material UI
import { Typography } from '@material-ui/core';

// Components
import Form from '../Form';
import Input from '../Input';
import Button from '../Button';
import MainContainer from '../MainContainer';
import { useData } from '../../data/DataContext';

// YUP
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// SCHEMA
const schema = yup.object().shape({
	firstName: yup
		.string()
		.required('This is a required field')
		.matches(/^([^0-9]*)$/, 'Number not allowed'),
	lastName: yup
		.string()
		.required('This is a required field')
		.matches(/^([^0-9]*)$/, 'Number not allowed'),
});

// COMPONENT
const PersonalInformation = () => {
	const { setValues, data } = useData();
	const { handleSubmit, control, reset } = useForm({
		mode: 'onChange',
		defaultValues: {
			firstName: data.firstName,
			lastName: data.lastName,
		},
		resolver: yupResolver(schema),
	});
	const history = useHistory();

	const onSubmit = (values) => {
		history.push('/security');
		setValues(values);
	};

	const onReset = () => {
		reset({
			firstName: data.firstName,
			lastName: data.lastName,
		});
	};

	return (
		<MainContainer>
			<Typography component='h2' variant='h5'>
				🚀 Personal Information
			</Typography>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name='firstName'
					render={({ field, fieldState: { error } }) => (
						<Input
							{...field}
							type='text'
							label='First Name'
							ref={field.ref}
							error={!!error}
							helperText={error?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name='lastName'
					render={({ field, fieldState: { error } }) => (
						<Input
							{...field}
							type='text'
							label='Last Name'
							ref={field.ref}
							error={!!error}
							helperText={error?.message}
						/>
					)}
				/>
				<Button type='submit' color='primary'>
					Next Step
				</Button>
				<Button type='button' color='secondary' onClick={onReset}>
					Reset Form
				</Button>
			</Form>
		</MainContainer>
	);
};

export default PersonalInformation;
