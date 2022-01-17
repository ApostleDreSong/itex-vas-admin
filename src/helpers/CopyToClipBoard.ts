const CopyText = (text: any) => {
	// Create a new textarea element and give it id='temp_element'
	const textarea: any = document.createElement('textarea');
	textarea.id = 'temp_element';
	// Optional step to make less noise on the page, if any!
	textarea.style.height = 0;
	// Now append it to your page somewhere, I chose <body>
	document.body.appendChild(textarea);
	// Give our textarea a value of whatever inside the div of id=containerid
	textarea.value = text;
	// Now copy whatever inside the textarea to clipboard
	const selector: any = document.querySelector('#temp_element');
	selector.select();
	document.execCommand('copy');
	// Remove the textarea
	document.body.removeChild(textarea);
};

export default CopyText;
