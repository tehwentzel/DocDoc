$(document).ready(function() {
	// get the modal
	var modal = document.getElementById('fileModal');
	// variable to keep track of the index of the sampleDocs
	var index = 1;
	$('#fileModal').on('click', function(){
		this.style.display = 'none';
	});
	$('.modal-content-class').on('click', function(ev){
		ev.stopPropagation();
		ev.preventDefault();
	});
	// when the user clicks on the button, open the modal
	$('.fileImage, .feedFile').on('click', function()
	{
		// append the strings and replace the default src so that the user can actually
		// view the thing that they've clicked
		$(".fileViewer").attr("src",this.src);
		document.getElementById('fileModal').style.display = "block";
		
		return false;
	});

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
	
	// encapsulate the file images with alt wrap so that the hover effect can work
	$(".fileImage").wrap('<div class="alt-wrap"/>');

	// used for file image hover effect
	$(".fileImage").each(function() 
	{
		$(this).after('<p class="alt" data-user=' + this.getAttribute('data-user') + '>' + $(this).attr('alt') + '</p>');
	})
})