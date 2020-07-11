class Day extends React.Component {
	render() {
		let events = this.props.dayData.events.map((el) => {
			return <Event key={this.props.dayData.day + el.id} event={el} day={this.props.dayData.day} />
		})
		return <div>
			<h1 style={{textAlign:'center',borderWidth:'0 0 0.5em 0',borderStyle:'solid',borderColor:'#34c1f0'}}>{this.props.dayData.day}</h1>
			<br/>
			{events}
		</div>
	}
}


class Event extends React.Component {
	render() {
		let markdownIt=window.markdownit({
			linkify:true
		});
		let description= markdownIt.render(this.props.event.description);
		return (<div>
			<h2><a href={this.props.event.browser_url}>{this.props.event.title}</a></h2>
			<div>{this.timeList()}</div>
			
		</div>)
		//<div dangerouslySetInnerHTML={{__html:description}}/>
	}
	//<pre>{JSON.stringify(this.props.event,null,'\t')}</pre>
	timeList() {
		let dayFormater = new Intl.DateTimeFormat('en-US', {
			timeZone: this.props.event.timezone,
			year: 'numeric',
			month: 'short',
			day: 'numeric'

		});
		let timeFormater = new Intl.DateTimeFormat('en-US', {
			timeZone: this.props.event.timezone,
			hour12: true,
			hour: 'numeric',
			minute: '2-digit',
			//timeZoneName: 'short'

		});

		let weekdayFormater = new Intl.DateTimeFormat('en-US', {
			timeZone: this.props.event.timezone,
			weekDay: 'long'

		});
		let monthNumFormater = new Intl.DateTimeFormat('en-US', {
			timeZone: this.props.event.timezone,
			month: 'numeric',

		});
		let monthStrFormater = new Intl.DateTimeFormat('en-US', {
			timeZone: this.props.event.timezone,
			month: 'long',

		});
		let dayNumFormater = new Intl.DateTimeFormat('en-US', {
			timeZone: this.props.event.timezone,
			day: 'numeric'

		});

		let yearNumFormater = new Intl.DateTimeFormat('en-US', {
			timeZone: this.props.event.timezone,
			year: 'numeric',

		});
		let timeArr = [];
		let dayStrToNum = {
			Sunday: 0,
			Monday: 1,
			Tuesday: 2,
			Wednesday: 3,
			Thursday: 4,
			Friday: 5,
			Saturday: 6
		}

		dayStrToNum[this.props.day];


		// let earliestMonth;
		// let latestMonth;
		// let monthEvent = [];
		// let etToSkip = [];
		// for (let et of this.props.event.timeslots) {
		// 	//check for year heere as well
		// 	if (!monthEvent.some((el) => { return el.month === monthNumFormater.format(new Date(et.start_date * 1000)); })) {
		// 		monthEvent.push({
		// 			month: monthNumFormater.format(new Date(et.start_date * 1000)),
		// 			year: yearNumFormater.format(new Date(et.start_date * 1000)),
		// 			events: []
		// 		})
		// 	}
		// 	let curMonth = monthEvent.find((el) => { return el.month === monthNumFormater.format(new Date(et.start_date * 1000)); });
		// 	curMonth.push(et);

		// }

		// let startEndMontArr = [];
		// for (let et of this.props.event.timeslots) {
		// 	let startEndStr = timeFormater.format(stDate) + ' - ' + timeFormater.format(edDate);
		// 	startEndStrArr.push(startEndStr);
		// 	let timeofEvent = {
		// 		timeslot: et,
		// 		time: startEndStr
		// 	}
		// }

		// for (let m of monthEvent) {
		// 	let cal = monthCal(m.month, m.year);
		// 	let weekdayArr = cal[dayStrToNum[this.props.day]];
		// 	let days = [];

		// 	for (let daynum of weekdayArr) {
		// 		let dayobj = { eventTimeslots: [] };

		// 		days.push(dayobj);
		// 	}

		// }

		let monthArr = []
		for (let et of this.props.event.timeslots) {
			if (!monthArr.some((el) => {
				return yearNumFormater.format(new Date(et.start_date * 1000)) === el.year &&
					monthNumFormater.format(new Date(et.start_date * 1000)) === el.month;
			})) {
				monthArr.push({
					year: yearNumFormater.format(new Date(et.start_date * 1000)),
					month: monthNumFormater.format(new Date(et.start_date * 1000)),
					monthStr: monthStrFormater.format(new Date(et.start_date * 1000)),
					 timeslots: []
				});
			}
			let currMonth = monthArr.find((el) => {
				return yearNumFormater.format(new Date(et.start_date * 1000)) === el.year &&
					monthNumFormater.format(new Date(et.start_date * 1000)) === el.month;
			});
			//todo check weekday before push
			currMonth.timeslots.push(et);

		}

		//console.log(this.props.event.title)
		//console.log(monthArr);



		// for (let et of this.props.event.timeslots) {
		// 	let stDate = new Date(et.start_date * 1000);
		// 	let edDate = new Date(et.end_date * 1000);
		// 	if (dayFormater.format(stDate) === dayFormater.format(edDate)) {
		// 		timeArr.push(dayFormater.format(stDate) + ' ' + timeFormater.format(stDate) + ' - ' + timeFormater.format(edDate))
		// 	}
		// 	else {
		// 		timeArr.push(dayFormater.format(stDate) + ' ' + timeFormater.format(stDate) + ' - ' + dayFormater.format(edDate) + ' ' + timeFormater.format(edDate))
		// 	}
		// }
		// return timeArr.map((el,index,arr)=>{
		// 	if(index!==arr.length-1){
		// 		return <span>{el} <b>|</b> </span>;
		// 	}
		// 	else{
		// 		return <span>{el}</span>;
		// 	}

		// })

		return monthArr.map((el) => {
			return <TimeslotMonth key={el.month + '-' + el.year} monthData={el} event={this.props.event} />
		});
	}



}
class TimeslotMonth extends React.Component {

	render() {
	return (<div style={{padding:'0.5em 0'}}><u>{this.props.monthData.monthStr} {this.props.monthData.year}:</u> {this.timeslots()}</div>)
	}

	timeslots() {
		let dayFormater = new Intl.DateTimeFormat('en-US', {
			timeZone: this.props.event.timezone,
			month:'short',
			day: 'numeric'

		});
		let timeFormater = new Intl.DateTimeFormat('en-US', {
			timeZone: this.props.event.timezone,
			hour12: true,
			hour: 'numeric',
			minute: '2-digit',
			//timeZoneName: 'short'

		});
		let timeArr=[];
		for (let et of this.props.monthData.timeslots) {
			let stDate = new Date(et.start_date * 1000);
			let edDate = new Date(et.end_date * 1000);
			if (dayFormater.format(stDate) === dayFormater.format(edDate)) {
				timeArr.push( {
					value:(<span key={et.id}> <b>{dayFormater.format(stDate)}</b>  {timeFormater.format(stDate)} -  { timeFormater.format(edDate)}</span>),
					timeslot:et
				})
			}
			else {
				timeArr.push({
				value:(<span  key={et.id}> <b>{dayFormater.format(stDate)}</b>  {timeFormater.format(stDate)}  <b>{dayFormater.format(edDate)}</b>   {timeFormater.format(edDate)}</span>),
				timeslot:et,
			})
			}
		}
		return timeArr.map((el, index, arr) => {
			//only last timeslot should have comma
			if (index !== arr.length - 1) {
				return <span key={el.timeslot.id}> {el.value}, </span>;
			}
			else {
				return <span key={el.timeslot.id}> {el.value}  </span>;
			}

		})
		//return timeArr;
	}


}


function monthCal(month, year) {
	let cal = [];
	for (let weekday = 0; weekday < 7; weekday++) {
		cal.push({
			days: []
		});
	}

	for (let day = 1; (new Date(year, month, day)).getMonth() === month; day++) {
		cal[(new Date(year, month, day)).getDay()].days.push(day);
	}
	return cal;
}



