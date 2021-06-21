import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PersonalInformation from './components/PersonalInformation';
import Security from './components/Security';

const App = () => (
	<Router>
		<Switch>
			<Route exact path='/' component={PersonalInformation} />
			<Route exact path='/security' component={Security} />
			<Route />
		</Switch>
	</Router>
);

export default App;
