document.addEventListener('DOMContentLoaded', function() {
    // Set up the month and year header (Monday–Sunday calendar)
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
  
    // Create a header displaying the month and year
    const monthNames = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
    const calendarHeader = document.getElementById("calendar-month-year");
    if (calendarHeader) {
      calendarHeader.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }
  
    // Get first and last day of current month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
  
    // For Monday–Sunday calendar, shift the start index:
    // (getDay() returns 0 for Sunday, 1 for Monday, etc. Shift so Monday=0)
    const startDayIndex = (firstDay.getDay() + 6) % 7;
    const daysInMonth = lastDay.getDate();
  
    // Build HTML for the calendar grid
    const calendarContainer = document.getElementById('simple-calendar');
    let calendarHTML = '<div class="calendar">';
  
    // Add day-of-week headers (Monday–Sunday)
    const dayNamesHeader = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    for (let i = 0; i < dayNamesHeader.length; i++) {
      calendarHTML += `<div class="day-header">${dayNamesHeader[i]}</div>`;
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
  
    // Define color mapping for event types:
    // "ELKT" = red, "WMKC" = green, "NonPoints" = yellow, "Practice" = white.
    const eventTypeColors = {
      "ELKT": "#ff0000",       // Red
      "WMKC": "#008000",       // Green
      "NonPoints": "#ffff00",  // Yellow
      "Practice": "#ffffff"    // White
    };
  
    // Fetch events from schedule.json
    fetch('data/schedule.json')
      .then(response => response.json())
      .then(data => {
        // Support JSON wrapped with an "events" property
        const events = data.events ? data.events : data;
        
        // Iterate over events and add them to the corresponding day cell if they match the current month/year
        events.forEach(event => {
          // Parse event.date as a local date by splitting the string
          const parts = event.date.split("-");
          const eventDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
          if (eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear) {
            const eventDay = eventDate.getDate();
            const dayCell = calendarContainer.querySelector(`.day[data-day="${eventDay}"]`);
            if (dayCell) {
              const bgColor = eventTypeColors[event.type] || "#000000";
              // Use black text for events with yellow (NonPoints) or white (Practice) backgrounds; otherwise, white text.
              const textColor = (event.type === "NonPoints" || event.type === "Practice") ? "#000000" : "#ffffff";
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
  