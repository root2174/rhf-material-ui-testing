/* eslint-disable react/prop-types */
import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import { DataProvider } from './';
import PersonalInformation from '../../components/PersonalInformation';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

describe('Data Context unit tests', () => {
	it('should render', async () => {
		render(
			<DataProvider>
				<PersonalInformation />
			</DataProvider>
		);
	});

	it('should clear form on cancel click', async () => {
		render(
			<DataProvider>
				<PersonalInformation />
			</DataProvider>
		);
		const firstNameInput = await screen.findByTestId('firstName');
		const lastNameInput = await screen.findByTestId('lastName');
		await act(async () => {
			fireEvent.change(firstNameInput, { target: { value: 'John' } });
			fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
		});
		expect(firstNameInput.value).toBe('John');
		expect(lastNameInput.value).toBe('Doe');
		fireEvent.click(await screen.findByTestId('resetButton'));
		expect(firstNameInput.value).toBe('');
		expect(lastNameInput.value).toBe('');
	});

	it('should submit data', async () => {
		const history = createMemoryHistory();
		render(
			<DataProvider>
				<Router history={history}>
					<PersonalInformation />
				</Router>
			</DataProvider>
		);
		const firstNameInput = await screen.findByTestId('firstName');
		const lastNameInput = await screen.findByTestId('lastName');
		await act(async () => {
			fireEvent.change(firstNameInput, { target: { value: 'John' } });
			fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
		});
		expect(firstNameInput.value).toBe('John');
		expect(lastNameInput.value).toBe('Doe');
		await act(async () => {
			fireEvent.click(await screen.findByTestId('submitButton'));
		});
		expect(history.location.pathname).toBe('/security');
	});
});
