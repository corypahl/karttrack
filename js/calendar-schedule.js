document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
  
    // Define color mapping for event types
    var eventTypeColors = {
      "ELKT": "#ff0000",        // Red
      "WMKC": "#008000",        // Green
      "NonPoints":   "#ffff00", // Yellow
      "Practice":   "#ffffff"   // White (uses black text for readability)
    };
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      // Fetch events from the external JSON file and transform them
      events: function(fetchInfo, successCallback, failureCallback) {
        fetch('../data/schedule.json')
          .then(response => response.json())
          .then(data => {
            // Support both a plain array and an events wrapper
            var eventArray = data.events ? data.events : data;
            const events = eventArray.map(item => ({
              title: item.name,
              start: item.date, // Use the "date" as the start date
              extendedProps: {
                type: item.type
              }
            }));
            successCallback(events);
          })
          .catch(error => failureCallback(error));
      },
      // Apply colors based on event type
      eventDidMount: function(info) {
        var eventType = info.event.extendedProps.type;
        if (eventType && eventTypeColors[eventType]) {
          info.el.style.backgroundColor = eventTypeColors[eventType];
          info.el.style.borderColor = eventTypeColors[eventType];
          // For "Practice" (white), use black text for readability; otherwise, use white text.
          info.el.style.color = (eventType === "OP") ? "#000000" : "#ffffff";
        }
      }
    });
    
    calendar.render();
  });
  