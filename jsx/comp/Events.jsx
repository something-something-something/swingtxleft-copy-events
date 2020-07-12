class Events extends React.Component {
	constructor(props) {
		super(props);
		this.dayListRef = React.createRef();
		this.copyEvents = this.copyEvents.bind(this);
		this.copyEventsHTML = this.copyEventsHTML.bind(this);
	}

	async copyEvents() {
		window.getSelection().selectAllChildren(this.dayListRef.current);
		document.execCommand('copy');
	}
	async copyEventsHTML() {
		await navigator.clipboard.writeText(this.dayListRef.current.innerHTML);
	}
	render() {
		let eventDays = []
		//split events into days
		for (let e of this.props.eventData) {
			if (!this.props.excludedEvents.includes(e.id)) {
				let dayFormater = new Intl.DateTimeFormat('en-US', {
					timeZone: e.timezone,
					weekday: 'long'
				});
				//check if event has timeslot on day
				for (let et of e.timeslots) {
					let d = new Date(et.start_date * 1000);
					let dayStr = dayFormater.format(d);
					//add day if it does not already exist
					if (!eventDays.some(this.dayTest(dayStr))) {
						eventDays.push({
							day: dayStr,
							events: []
						});
					}
					let currentDay = eventDays.find(this.dayTest(dayStr));
					//only add event if to day if it has not yet been added.
					if (!currentDay.events.some((el) => { return el.id === e.id; })) {
						//copy event then modify timeslots
						let eventToInsert=JSON.parse(JSON.stringify(e));
						//remove events happening on diffrent days
						eventToInsert.timeslots=eventToInsert.timeslots.filter((eti)=>{
							let eventTimeSlotDate=new Date(eti.start_date * 1000);
							if(dayFormater.format(eventTimeSlotDate)===dayStr){
								return true;
							}
							else{
								console.log('Event timeslot does not happen on '+dayStr+' excluding timeslot from '+dayStr);
								console.log(e);
								console.log(eti);
								return false;
							}
						})
						currentDay.events.push(eventToInsert);
					}
				}
			}
		}
		eventDays.sort((a, b) => {
			let weekDayValues = {
				Monday: 0,
				Tuesday: 1,
				Wednesday: 2,
				Thursday: 3,
				Friday: 4,
				Saturday: 5,
				Sunday: 6
			}
			return weekDayValues[a.day] - weekDayValues[b.day];
		});
		eventDays.forEach((el) => {
			el.events.forEach((el) => {
				el.timeslots.sort((a, b) => {
					return a.start_date - b.start_date;
				});
			});
			el.events.sort((a, b) => {
				return a.timeslots[0].start_date - b.timeslots[0].start_date;
			})

		});

		let dayComp = eventDays.map((day) => { return <Day dayData={day} key={day.day} /> })
		return (<div>
			<button onClick={this.copyEventsHTML}>Copy Events As HTML (For Mailchimp)</button>
			<br/>
			<br/>
			<button onClick={this.copyEvents}>Copy Events (Don't Use Alternate Export)</button> 
			<div ref={this.dayListRef}>{dayComp}</div>
		</div>);
		//return <pre>{JSON.stringify(this.props.eventData,null,'\t')}</pre>
	}
	dayTest(day) {
		return (el) => {
			return el.day === day;
		}
	}



}
