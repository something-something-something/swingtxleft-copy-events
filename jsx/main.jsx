'use strict';
async function main() {

	ReactDOM.render(
		<React.StrictMode><div><h1>Events</h1>
		<HelpInfo/>
		<EventsCtrl/></div></React.StrictMode>,
		document.getElementById('events')
	);

}

main();