import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [data, setData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		hasPhone: false,
		phoneNumber: '',
	});

	const setValues = (values) => {
		setData((prevData) => ({
			...prevData,
			...values,
		}));
	};
	return (
		<DataContext.Provider value={{ data, setValues }}>
			{children}
		</DataContext.Provider>
	);
};

DataProvider.propTypes = {
	children: PropTypes.any,
};

export const useData = () => useContext(DataContext);
