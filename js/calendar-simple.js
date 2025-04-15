document.addEventListener('DOMContentLoaded', function() {
    // Get current date, month, and year
    const today = new Date();
    const currentMonth = today.getMonth(); // 0-based: 0 = January
    const currentYear = today.getFullYear();
  
    // Get first and last day of current month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
    // Determine how many empty cells before the first day (based on day of week)
    const startDayIndex = firstDay.getDay();  // 0 = Sunday, 1 = Monday, etc.
    const daysInMonth = lastDay.getDate();
  
    // Build HTML for the calendar grid
    const calendarContainer = document.getElementById('simple-calendar');
    let calendarHTML = '<div class="calendar">';
    
    // Add day-of-week headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 0; i < dayNames.length; i++) {
      calendarHTML += `<div class="day-header">${dayNames[i]}</div>`;
    }
    
    // Add empty cells for days before the first day of this month
    for (let i = 0; i < startDayIndex; i++) {
      calendarHTML += '<div class="day"></div>';
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarHTML += `<div class="day" data-day="${day}"><div class="date-number">${day}</div></div>`;
    }
    
    calendarHTML += '</div>';
    calendarContainer.innerHTML = calendarHTML;
    
    // Define color mapping for event types with updated keys:
    // "ELKT" = red, "WMKC" = green, "NonPoints" = yellow, "Practice" = white (with black text)
    const eventTypeColors = {
      "ELKT": "#ff0000",       // Red
      "WMKC": "#008000",       // Green
      "NonPoints": "#ffff00",  // Yellow
      "Practice": "#ffffff"    // White (will use black text for readability)
    };
  
    // Fetch events from schedule.json
    fetch('/karttrack/data/schedule.json')
      .then(response => response.json())
      .then(data => {
        // Support JSON wrapped with an "events" property
        const events = data.events ? data.events : data;
        
        // Iterate over events and add them to the corresponding day cell if they match the current month
        events.forEach(event => {
          // Parse event.date (expected in format YYYY-MM-DD)
          const eventDate = new Date(event.date);
          if (eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear) {
            const eventDay = eventDate.getDate();
            // Find the corresponding day cell
            const dayCell = calendarContainer.querySelector(`.day[data-day="${eventDay}"]`);
            if (dayCell) {
              // Build HTML for event label with appropriate colors
              const bgColor = eventTypeColors[event.type] || "#000000";
              const textColor = (event.type === "Practice") ? "#000000" : "#ffffff";
              const eventHTML = `<div class="event" style="background-color: ${bgColor}; border: 1px solid ${bgColor}; color: ${textColor};" title="${event.name}">${event.name}</div>`;
              dayCell.innerHTML += eventHTML;
            }
          }
        });
      })
      .catch(error => {
        console.error("Error loading schedule data:", error);
      });
  });
  