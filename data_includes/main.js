// Michael Wilson, November 2024
// CC-BY

PennController.ResetPrefix(null) // Shorten command names (keep this)
DebugOff()

var centered_justified_style = {
	'text-align': 'justify', 
	margin: '0 auto', 
	'margin-bottom': '3em',
	width: '30em'
}

Sequence(
	'demographics',
	'instructions',
	'link',
	SendResults(),
	'end'
)

newTrial('name',
	newHtml('name', 'background.html')
		.css(centered_justified_style)
		.inputWarning("You must provide an answer for '%name'.")
		.print()
		.log()
	,
	
	newButton('Next', 'Next')
		.css('font-family', 'Helvetica, sans-serif')
		.css('font-size', '16px')
		.center()
		.print()
		.wait(
			getHtml('name')
				.test.complete()
				.failure(
					getHtml('name').warn()
				)
		)
).setOption('countsForProgressBar', false)

newTrial('instructions',
	fullscreen(),
	
	newText(
		`<p>On the next page, you will see a randomly chosen link for a student's/group's experiment.</p>
		 <p><b>Make sure the link you see is not your own!</b> If it is, please close this page, and
		 start again by following the original link. You should then receive a different random link 
		 at the next step.</p>
		`
	)
		.css(centered_justified_style)
		.print()		
	,
	
	newButton('Click to get a link')
		.css('font-family', 'Helvetica, sans-serif')
		.css('font-size', '16px')
		.center()
		.print()
		.wait()
).setOption('countsForProgressBar', false)

Template('stimuli.csv', currentrow => {
	newTrial(
		newText('instructions',
			"Below is a link to one of your classmates' experiments. Click on it to open their experiment " +
			"in a new tab. <b>Leave this tab open!</b> Once you have finished participating in their experiment, " +
			'return to this tab and click "Next" below.'
		)
			.css(centered_justified_style)
			.print()
		,
		
		newText('link', '<a href="' + currentrow.link + '" target="_blank">' + currentrow.name + '</a>')
			.css(centered_justified_style)
			.print()
		,
		
		newButton('Next')
			.center()
			.print()
			.wait()
	)
		.log('group', currentrow.group)
		.log('link',  currentrow.link)
		.log('name',  currentrow.name)
})

newTrial('end',
	exitFullscreen()
	,
	
	newText('Thank you for recording your participation; you may now close this window. Thank you!')
		.css(centered_justified_style)
		.center()
		.print()
	,
	
	newButton()
		.wait()
)
.setOption('countsForProgressBar', false)