function HelpInfo(){

	return (
	<details className='helpBlock' style={{padding:'1rem'}}>
		<summary>How To Use (Click for usage Instructions)</summary>
		<div style={{backgroundColor:'rgb(240,240,240)',padding:'1rem'}}>
		<h2>Work In Progress</h2>
		<h2>Filterining events By Day</h2>
		<ul>
			<li>To Avoid exporting events that occur before a certian day select a day from 'Hide Events Starting Before'</li>
			<li>To Avoid exporting events that occur after a certian day select a day from 'Hide Events Starting After'</li>
			<li>To reset the dates click Reset Dates</li>
		</ul>
		<h2>Filterining out particular events </h2>
		<ol>
			<li>Click 'Select Events to Hide'</li>
			<li>Click An event to hide it. It should now be crossed out in red</li>
			<li>To Undo hiding an event click it again. It should no longer be crossed out</li>
			<li>To show all events Click Reset</li>
			<li>To close the Event Hiding selection box Click 'Done Selecting Events to Hide' (Not nessasarry)</li>
		</ol>

		<h2>Copy Events into MailChimp</h2>
		<ol>
			<li>After Filtering the events click 'Copy Events As HTML (For Mailchimp)' This Copies the HTML into your clipboard<br/><br/>
				<img src="images/help/mchimp-copy.png"/>
			</li>
			<li>
				In mailchimp drag a new Text Block to the email<br/><br/>
				<img src="images/help/mchimp-text-block.png"/>
			</li>
			<li>In the Editor on mailchimp click the <strong>&lt;&gt;</strong>  button<br/><br/>
				<img src="images/help/mchimp-enter-source.png"/>
			</li>
			<li>Delete the preset text<br/>
				<img src="images/help/mchimp-delete-text.png"/>
			</li>
			<li>Paste into the text box (<strong>Ctrl+V</strong> or right click and paste)<br/><br/>
				<img src="images/help/mchimp-paste.png"/>
			</li>
			<li>That is it. Mail Chimp should look like this<br/><br/>
				<img src="images/help/mchimp-complete.png"/>
				<br/><br/>
				To go back to the graphical edditor click the <strong>&lt;&gt;</strong>  button again.
			</li>
		</ol></div>
	</details>);
}