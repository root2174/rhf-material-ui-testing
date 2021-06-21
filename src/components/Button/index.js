import React from 'react';
import PropTypes from 'prop-types';
import { Button as MaterialButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(3, 0, 0),
	},
}));

function Button({ children, color, ...props }) {
	const styles = useStyles();

	return (
		<MaterialButton
			fullWidth
			variant='contained'
			color={color}
			className={styles.root}
			{...props}
		>
			{children}
		</MaterialButton>
	);
}

Button.propTypes = {
	children: PropTypes.any,
	color: PropTypes.string,
};

export default Button;
