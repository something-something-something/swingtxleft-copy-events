function HelpInfo(){

	return (
	<details className='helpBlock' style={{padding:'1rem'}}>
		<summary>How To Use</summary>
		<div style={{backgroundColor:'rgb(240,240,240)',padding:'1rem'}}>
		
		<h2>Copy Events into MailChimp</h2>
		<ol>
			<li>Click Copy Events As HTML This Copies the HTML into your clipboard<br/><br/>
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