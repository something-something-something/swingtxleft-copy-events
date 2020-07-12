class EventsCtrl extends React.Component {

	constructor(props) {
		super(props);
		this.setDate = this.setDate.bind(this);
		this.unsetDates = this.unsetDates.bind(this);
		this.toggleShowExclusionList = this.toggleShowExclusionList.bind(this);
		this.resetExcludedEvents = this.resetExcludedEvents.bind(this);

		this.state = {
			loading: true,
			eventData: [],
			startDate: null,
			endDate: null,
			showEventExcluderList: false,
			excludedEvents: []
		};
	}

	async getSwtxlData() {
		let dataUrl = 'https://api.mobilize.us/v1/organizations/210/events?timeslot_end=gte_now';
		if (this.state.startDate !== null) {
			dataUrl += '&timeslot_start=gte_' + (Math.floor(this.state.startDate.getTime() / 1000));
		}
		else {
			console.log('no action');
		}
		
		if (this.state.endDate !== null) {
			dataUrl += '&timeslot_start=lte_' + (Math.floor(this.state.endDate.getTime() / 1000) + (24 * 60 * 60));
		}
		else {
			console.log('no action');
		}

		let swtxlEventData = await getSwingLeftEvents(dataUrl);
		this.setState({
			eventData: swtxlEventData,
			loading: false
		});
		return swtxlEventData;
	}
	unsetDates() {
		this.setState({
			endDate: null,
			startDate:null
		});
	}

	setDate( theDateLimit,event) {
		let dateParts = event.target.value.split('-').map((el, index) => {
			if (index === 1) {
				return parseInt(el, 10) - 1;
			}
			else {
				return parseInt(el, 10);
			}
		});
		let theDate = new Date(dateParts[0], dateParts[1], dateParts[2]);
		console.log(theDate);
		if (theDateLimit === 'start') {
			this.setState({
				startDate: theDate
			});
		}
		else if (theDateLimit === 'end'){
			this.setState({
				endDate: theDate
			});
		}
	}



	toggleShowExclusionList() {
		this.setState((state) => {
			return { showEventExcluderList: !state.showEventExcluderList }
		});
	}
	componentDidMount() {
		this.getSwtxlData();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.shouldReFetchData(prevState)
	}

	shouldReFetchData(prevState) {
		if (prevState.endDate !== this.state.endDate || prevState.startDate !== this.state.startDate) {
			console.log('updating data');

			this.getSwtxlData();
		}
		else {
			console.log('not updating data');
		}
	}


	eventExclusionList() {
		let listItems = [];
		for (let ev of this.state.eventData) {
			let times = [];
			for (let et of ev.timeslots) {

				times.push((new Date(et.start_date * 1000)).toLocaleDateString());
			}
			if (this.state.excludedEvents.includes(ev.id)) {
				listItems.push(<EventExcluderListItem action={this.toggleExcludeEvent.bind(this, ev.id)} eventDescription={ev.description} eventTimes={times} key={ev.id} title={ev.title} excluded={true} />);
			}
			else {
				listItems.push(<EventExcluderListItem action={this.toggleExcludeEvent.bind(this, ev.id)} eventDescription={ev.description} eventTimes={times} key={ev.id} title={ev.title} excluded={false} />);
			}

		}

		return listItems;
	}
	toggleExcludeEvent(eventID) {
		if (this.state.excludedEvents.includes(eventID)) {
			this.setState((state) => {
				return {
					excludedEvents: state.excludedEvents.filter((el) => {
						return el !== eventID;
					})
				}
			});
		}
		else {
			this.setState((state) => {
				return {
					excludedEvents: state.excludedEvents.concat([eventID])
				}
			});
		}
	}

	resetExcludedEvents() {
		this.setState({
			excludedEvents: []
		});
	}
	render() {

		// return <div/>
		if (this.state.loading) {
			return <div>Loading</div>;
		}
		else {
			//let eventData=await getSwtxlData() 
			return (
				<div>
					<label>Hide Events Starting Before:&nbsp;&nbsp;
						{this.state.startDate === null
							? <input onChange={this.setDate.bind(this,'start')} type="date" value="" />
							: <input onChange={this.setDate.bind(this,'start')} type="date" value={this.state.startDate.toISOString().split('T')[0]} />
						}
					</label>
					<br/>
					<br/>
					<label>Hide Events Starting After:&nbsp;&nbsp;
						{this.state.endDate === null
							? <input onChange={this.setDate.bind(this,'end')} type="date" value="" />
							: <input onChange={this.setDate.bind(this,'end')} type="date" value={this.state.endDate.toISOString().split('T')[0]} />
						}
					</label>
					<br/>
					<br/>
					<button onClick={this.unsetDates}>Reset Dates</button>
					<br/>
					<br/>
					<div style={{ margin: '1rem 0' }}>
						<button onClick={this.toggleShowExclusionList} >
							{this.state.showEventExcluderList
								? 'Done Selecting Events to Hide'
								: 'Select Events to Hide '
							}

						</button>
						{this.state.excludedEvents.length > 0 &&
							<span>	Hidden Events <span style={{color:'#ff0000'}}>{this.state.excludedEvents.length}</span></span>
							
						}
						 
						{this.state.showEventExcluderList &&
							<div style={{ backgroundColor: 'rgb(200,200,200)' }}>
								<h2>Click Event to hide Display of event</h2>
								<button onClick={this.resetExcludedEvents} >Reset</button>
								<ul>{this.eventExclusionList()}</ul>
							</div>
						}
					</div>
					<Events eventData={this.state.eventData} excludedEvents={this.state.excludedEvents} />
				</div>
			);
		}

	}
}

function EventExcluderListItem(props) {

	return (<li style={{ padding: '0.5rem' }} onClick={props.action} title={props.eventDescription + '\n\n' + props.eventTimes.join('\n')}>
		{!props.excluded
			? <span>{props.title}</span>
			: <s style={{ color: 'rgb(255,0,0)' }}>{props.title}</s>
		}
	</li>
	);

}