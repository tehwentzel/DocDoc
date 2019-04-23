$(document).ready(function() {
	// get the modal
	var modal = document.getElementById('fileModal');
	// get the span element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	// variable to keep track of the index of the sampleDocs
	var index = 1;
	
	// when the user clicks on the button, open the modal
	$('.fileImage, .feedFile').on('click', function()
	{
		// check to see what specific file they clicked and open set the index
		// corresponding to the file number
		if (this.src.indexOf ("images/sampleDoc1.png") != -1)
		{
			index = 1;
		}
		else if (this.src.indexOf ("images/sampleDoc2.png") != -1)
		{
			index = 2;
		}
		else if (this.src.indexOf ("images/sampleDoc3.png") != -1)
		{
			index = 3;
		}
		else if (this.src.indexOf ("images/sampleDoc4.png") != -1)
		{
			index = 4;
		}
		else if (this.src.indexOf ("images/sampleDoc5.png") != -1)
		{
			index = 5;
		}
		
		// append the strings and replace the default src so that the user can actually
		// view the thing that they've clicked
		$(".fileViewer").attr("src", "images/sampleDoc" + index + ".png");
		document.getElementById('fileModal').style.display = "block";
		
		return false;
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