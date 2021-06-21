import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

const MainContainer = ({ children, ...props }) => {
	const styles = useStyles();

	return (
		<Container
			className={styles.root}
			component='main'
			maxWidth='xs'
			{...props}
		>
			{children}
		</Container>
	);
};

MainContainer.propTypes = {
	children: PropTypes.any,
};

export default MainContainer;
