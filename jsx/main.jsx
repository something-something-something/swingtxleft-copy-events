'use strict';
async function main(){


let swtxlevents=await getSwingLeftEvents('https://api.mobilize.us/v1/organizations/210/events?timeslot_end=gte_now');

ReactDOM.render(
	<div><h1>Events</h1> <Events eventData={swtxlevents}/></div>,
	document.getElementById('events')
);

}

main();