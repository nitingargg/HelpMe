import React from 'react'

const Progress_bar = ({bgcolor,progress,height}) => {
	
	const Parentdiv = {
		height: height,
		width: '90%',
		backgroundColor: '#1a1110',
		borderRadius: 40,
        marginLeft: 60,
        marginTop: 20,
	}
	
	const Childdiv = {
		height: '100%',
		width: `${progress}%`,
		backgroundColor: bgcolor,
	    borderRadius:40,
		textAlign: 'right'
	}
	
	const progresstext = {
		padding: 10,
		color: 'white',
		fontWeight: 600
	}
	
	return (
	<div style={Parentdiv}>
	<div style={Childdiv}>
		<span style={progresstext}>{`${progress}%`}</span>
	</div>
	</div>
	)
}

export default Progress_bar;
