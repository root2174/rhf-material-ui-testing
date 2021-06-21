import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
}));

const Form = ({ children, ...props }) => {
	const styles = useStyles();
	return (
		<form noValidate {...props} className={styles.root}>
			{children}
		</form>
	);
};

Form.propTypes = {
	children: PropTypes.any,
};

export default Form;
