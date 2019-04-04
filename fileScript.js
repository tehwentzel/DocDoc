$(document).ready(function() {
	// get the modal
	var modal = document.getElementById('fileModal');
	// get the span element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// when the user clicks on the button, open the modal
	$('.fileImage').on('click', function(){
		document.getElementById('fileModal').style.display = "block";
	});

	// when the user clicks on the span X, close the modal
	span.onclick = function()
	{
		document.getElementById('fileModal').style.display = "none";
	}

	// download button inside modal
	$('#downloadButton').on('click', function()
	{
		var dlButton = document.getElementById('downloadButton');
		
		if (dlButton.value == "Download"){
			dlButton.value = "Downloading...";
		}
		else if (dlButton.value == "Downloading...")
			dlButton.value = "Already Downloading...";
		setTimeout(function(){
			dlButton.value = "Downloaded";
		}, 2000);
	});

	$('#sendButton').on('click', function()
	{
		var sendButton = document.getElementById('sendButton');
		
		if (sendButton.value == "Send")
			sendButton.value = "Sent!";
		else
			sendButton.value = "Send";
	});
})