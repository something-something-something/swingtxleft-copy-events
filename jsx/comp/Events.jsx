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

		for (let e of this.props.eventData) {
			if (!this.props.excludedEvents.includes(e.id)) {
				let dayFormater = new Intl.DateTimeFormat('en-US', {
					timeZone: e.timezone,
					weekday: 'long'
				});
				for (let et of e.timeslots) {
					let d = new Date(et.start_date * 1000);
					let dayStr = dayFormater.format(d);
					if (!eventDays.some(this.dayTest(dayStr))) {
						eventDays.push({
							day: dayStr,
							events: []
						});
					}

					let currentDay = eventDays.find(this.dayTest(dayStr));
					if (!currentDay.events.some((el) => { return el.id === e.id; })) {
						currentDay.events.push(e);
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
			<button onClick={this.copyEvents}>Copy Events</button><button onClick={this.copyEventsHTML}>Copy Events As HTML</button>
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
