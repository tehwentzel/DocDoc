var clndr = {};
var events = [];

    var modal = document.getElementById('myModal');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    $('#newEventSubmitButton').on('click', function(ev){
        //submit event button 
        var title = $("#eventFormTitle").val();
        var t1 = $("#eTime").val();
        var desc1 = $("#eDesc").val();
        var radioValue = $("input[name='radio-choice']:checked").val();
        localStorage.setItem("etitle", title);
        localStorage.setItem("timeof", t1);
        localStorage.setItem("descr", desc1);
        localStorage.setItem("usr",radioValue);
        
        if(title && d1){         
        swal('Event Added!'); //alert success
        modal.style.display = "none";
        }
        else {
            swal('Please enter the required information');
        }
        
    });
    
    $.getJSON("https://api.myjson.com/bins/ff7bo", function(data){
        $.each(data.jsonevents, function(index, value){
            events.push(value);
        });
        cal();
    });

    function cal(){

        if(localStorage.getItem("etitle")){
            var d1 = localStorage.getItem("date");
            var title = localStorage.getItem("etitle");
            var t1 = localStorage.getItem("timeof");
            var desc1 = localStorage.getItem("descr");
            var rv = localStorage.getItem("usr");
            events.push({date: d1, title: title, time: t1, user: rv, description: desc1});
        }
            
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
                    var selectedDate = target.date['_i'];
                        console.log(selectedDate);

                    if(target.element.classList.contains('day') && !target.element.classList.contains('event')){
                        document.getElementById('myModal').style.display = 'block';
                        var d1 = selectedDate;
                        localStorage.setItem("date", d1);
                    }
                    
                        
                        if(target.events.length){
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
    }
