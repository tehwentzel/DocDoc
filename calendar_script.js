var clndr = {};

$( function() { 
    $(document).ready(function(){
		var modal = document.getElementById('myModal');

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		  if (event.target == modal) {
		    modal.style.display = "none";
		  }
		}
		//Feed Button Display
	//	$('.feedAppt').on('click', function(){
	//		modal.style.display = 'block';
	//	});
		
		$('#newEventSubmitButton').on('click', function(ev){
			//submit event button 
			var title = $('#myModal').find('#eventFormTitle').val();;
			if(title !== ''){//check if a title is given
				ev.preventDefault(); //don't refresh the page
				swal('Event Added!'); //alert success
				modal.style.display = "none";
				$('#myModal').find('input:not([type=submit]), textarea').val('');  //clear entries
				$('#myModal').find('input:radio').prop('checked', false);
			}
		});
		
        $.getJSON("https://api.myjson.com/bins/ff7bo", function(data){
           var events = [];
           $.each(data.jsonevents, function(index, value){
                events.push(value); 
            });
            clndr = $('#cts-clndr').clndr({
            template: $('#cts-clndr-template').html(),
            daysOfTheWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            events: events,
            lengthOfTime: {
                // Set to an integer if you want to render one or more months, otherwise
                // leave this null
                months: null,

                // Set to an integer if you want to render one or more days, otherwise
                // leave this null. Setting this to 14 would render a 2-week calendar.
                days: null,

                // This is the amount of months or days that will move forward/back when
                // paging the calendar. With days=14 and interval=7, you would have a
                // 2-week calendar that pages forward and backward 1 week at a time.
                interval: 1
            },
            clickEvents: {
                click: function(target) {
					if(target.element.classList.contains('day') && !target.element.classList.contains('event')){
						document.getElementById('myModal').style.display = 'block';
					}
                    if(target.events.length){
                        var selectedDate = target.date['_i'];
                        console.log(selectedDate);
                        var eventsContainer = $('#cts-clndr').find('.event-card-modal.' + selectedDate);

                        eventsContainer.show();

                        // Closes the event card modal when you click outside or when you press the escape key
                        $(document).mouseup(function(e){
                            var container = $(".event-card-modal");
                            if(container.is(e.target) && container.has(e.target).length === 0){
                                container.hide();
                            }
                        });
                        
                        $(document).on('keydown', function( e ){
                            var container = $(".event-card-modal"); 
                            if( e.keyCode === 27){ // escape key
                                container.hide();
                            }
                        });
                    }
                }
            },
            forceSixRows: false,
            showAdjacentMonths: false
          });
       }) ;
    });
});
