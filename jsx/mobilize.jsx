'use strict';

async function getData(url){
	let res=await fetch(url,{
		referrerPolicy:'no-referrer'
	});
	let eventArr=[];
	let theJson=await res.json();
	console.log(theJson);
	eventArr=theJson.data;
	if(theJson.next!==null){
		console.log('fetching more');
		eventArr=eventArr.concat(await getData(theJson.next));
	}
	else{
		console.log('fetched all');
	}
	return eventArr;
}

async function getSwingLeftEvents(queryURL){
	let theData=await getData(queryURL);
	console.log(theData);
	let swingtxleftEvents=theData.filter(filterOnlySwingTXLeft);
	return swingtxleftEvents;
}


function filterOnlySwingTXLeft(event,index,arr){
	let swingtxleftRegExp=/swing\s*tx\s*left/i;
	let stxlRegExp=/STXL/i;
	if(event.title.search(swingtxleftRegExp)!==-1||event.title.search(stxlRegExp)!==-1){
		return true;
	}
	else if(event.description.search(swingtxleftRegExp)!==-1||event.description.search(stxlRegExp)!==-1){
		return true;
	}
	return false;
}