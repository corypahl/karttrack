document.addEventListener('DOMContentLoaded', function() {
    // Initialize displayed month and year based on the current local date
    const today = new Date();
    let displayedMonth = today.getMonth(); // 0 = January
    let displayedYear = today.getFullYear();
  
    const calendarHeader = document.getElementById("calendar-month-year");
    const calendarContainer = document.getElementById('simple-calendar');
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    // Function to render the calendar grid for the current displayed month and year
    function renderCalendar() {
      // Update header with current month and year
      if (calendarHeader) {
        calendarHeader.textContent = `${monthNames[displayedMonth]} ${displayedYear}`;
      }
  
      // Build a date object for the first and last day of the displayed month
      const firstDayDisplayed = new Date(displayedYear, displayedMonth, 1);
      const lastDayDisplayed = new Date(displayedYear, displayedMonth + 1, 0);
      const daysInMonth = lastDayDisplayed.getDate();
      // For a Monday–Sunday calendar, shift the day index
      const startDayIndex = (firstDayDisplayed.getDay() + 6) % 7;
  
      // Build HTML for the calendar grid:
      let calendarHTML = '<div class="calendar">';
      // Day-of-week headers (Monday to Sunday)
      const dayNamesHeader = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      for (let i = 0; i < dayNamesHeader.length; i++) {
        calendarHTML += `<div class="day-header">${dayNamesHeader[i]}</div>`;
      }
      // Empty cells for days before the first day of the month
      for (let i = 0; i < startDayIndex; i++) {
        calendarHTML += '<div class="day"></div>';
      }
      // Cells for each day of the month; add a "today" class if it matches the current local date
      for (let day = 1; day <= daysInMonth; day++) {
        let todayClass = '';
        if (displayedYear === today.getFullYear() && displayedMonth === today.getMonth() && day === today.getDate()) {
          todayClass = ' today';
        }
        calendarHTML += `<div class="day${todayClass}" data-day="${day}"><div class="date-number">${day}</div></div>`;
      }
      calendarHTML += '</div>';
      calendarContainer.innerHTML = calendarHTML;
  
      // After building the grid, load events for the displayed month/year
      loadEvents();
    }
  
    // Function to load events from schedule.json and display them
    function loadEvents() {
      fetch('data/schedule.json')
        .then(response => response.json())
        .then(data => {
          // Support JSON wrapped with an "events" property
          const events = data.events ? data.events : data;
          events.forEach(event => {
            // Parse event.date as a local date by splitting the string
            const parts = event.date.split("-");
            const eventDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
            if (eventDate.getMonth() === displayedMonth && eventDate.getFullYear() === displayedYear) {
              const eventDay = eventDate.getDate();
              const dayCell = calendarContainer.querySelector(`.day[data-day="${eventDay}"]`);
              if (dayCell) {
                // Define color mapping for event types:
                // "ELKT" = red, "WMKC" = green, "Other" = yellow, "Practice" = white.
                const eventTypeColors = {
                  "ELKT": "#ff0000",       // Red
                  "WMKC": "#008000",       // Green
                  "Other": "#ffff00",  // Yellow
                  "Practice": "#ffffff"    // White
                };
                const bgColor = eventTypeColors[event.type] || "#000000";
                // Use black text for Other or Practice events; otherwise, white text.
                const textColor = (event.type === "Other" || event.type === "Practice") ? "#000000" : "#ffffff";
                const eventHTML = `<div class="event" style="background-color: ${bgColor}; border: 1px solid ${bgColor}; color: ${textColor};" title="${event.name}">${event.name}</div>`;
                dayCell.innerHTML += eventHTML;
              }
            }
          });
        })
        .catch(error => {
          console.error("Error loading schedule data:", error);
        });
    }
  
    // Navigation button event listeners
    const prevButton = document.getElementById("prev-month");
    if (prevButton) {
      prevButton.addEventListener("click", function() {
        displayedMonth--;
        if (displayedMonth < 0) {
          displayedMonth = 11;
          displayedYear--;
        }
        renderCalendar();
      });
    }
    const nextButton = document.getElementById("next-month");
    if (nextButton) {
      nextButton.addEventListener("click", function() {
        displayedMonth++;
        if (displayedMonth > 11) {
          displayedMonth = 0;
          displayedYear++;
        }
        renderCalendar();
      });
    }
  
    // Initial render
    renderCalendar();
  });
  