class EventsCtrl extends React.Component {

	constructor(props) {
		super(props);
		this.setEndDate = this.setEndDate.bind(this);
		this.unsetEndDate = this.unsetEndDate.bind(this);
		this.toggleShowExclusionList = this.toggleShowExclusionList.bind(this);
		this.resetExcludedEvents=this.resetExcludedEvents.bind(this);
		
		this.state = {
			loading: true,
			eventData: [],
			endDate: null,
			showEventExcluderList: false,
			excludedEvents: []
		};
	}

	async getSwtxlData() {
		let dataUrl = 'https://api.mobilize.us/v1/organizations/210/events?timeslot_end=gte_now';
		if (this.state.endDate !== null) {
			dataUrl += '&timeslot_end=lte_' + Math.floor(this.state.endDate.getTime() / 1000);
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

	setEndDate(event) {
		let theEndDate = new Date(event.target.value);
		theEndDate = new Date(theEndDate.getTime() + (24 * 60 * 60 * 1000));
		this.setState({
			endDate: theEndDate
			// eventData:this.getSwtxlData()
		});
	}

	unsetEndDate() {
		this.setState({
			endDate: null
		});
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
		if (prevState.endDate !== this.state.endDate) {
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
			let times=[];
			for(let et of ev.timeslots){
				
				times.push((new Date(et.start_date*1000)).toLocaleDateString());
			}
			if(this.state.excludedEvents.includes(ev.id)){
				listItems.push(<EventExcluderListItem action={this.toggleExcludeEvent.bind(this,ev.id)} eventDescription={ev.description} eventTimes={times} key={ev.id} title={ev.title} excluded={true}/>);
			}
			else{
				listItems.push(<EventExcluderListItem action={this.toggleExcludeEvent.bind(this,ev.id)} eventDescription={ev.description} eventTimes={times} key={ev.id} title={ev.title} excluded={false}/>);
			}
			
		}

		return listItems;
	}
	toggleExcludeEvent(eventID) {
		if(this.state.excludedEvents.includes(eventID)){
			this.setState((state)=>{
				return {
					excludedEvents:state.excludedEvents.filter((el)=>{
						return el!==eventID;
					})
				}
			});
		}
		else{
			this.setState((state)=>{
				return {
					excludedEvents:state.excludedEvents.concat([eventID])
				}
			});
		}
	}

	resetExcludedEvents(){
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
					<label>End Date:
						{this.state.endDate === null
							? <input onChange={this.setEndDate} type="date" value="" />
							: <input onChange={this.setEndDate} type="date" value={new Date(this.state.endDate.getTime() - (24 * 60 * 60 * 1000)).toISOString().split('T')[0]} />
						}
					</label>
					<button onClick={this.unsetEndDate}>Reset Date</button>
					<div>
						<button onClick={this.toggleShowExclusionList} >
							{this.state.showEventExcluderList
								? 'Close Hide Events Menu'
								: 'Hide Events Menu'
							}
							
						</button><button onClick={this.resetExcludedEvents} >Show All Events</button>
						{this.state.showEventExcluderList &&
							<div><h2>Click Event to hide Display of event</h2> <ul>{this.eventExclusionList()}</ul></div>
						}
					</div>
					<Events eventData={this.state.eventData} excludedEvents={this.state.excludedEvents} />
				</div>
			);
		}

	}
}

function EventExcluderListItem(props) {

	return (<li style={{ margin:'1rem'}} onClick={props.action} title={props.eventDescription+'\n\n'+props.eventTimes.join('\n')}>
		{!props.excluded
			? <span>{props.title}</span>
			: <s>{props.title}</s>
		}
		</li>
	);

}