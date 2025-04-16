document.addEventListener('DOMContentLoaded', function () {
    // Get the dropdown element; if not found, log an error and exit.
    const sheetSelect = document.getElementById('sheet-select');
    if (!sheetSelect) {
        console.error('Error: #sheet-select not found in the DOM.');
        return;
    }

    const resultsOutput = document.getElementById('results-output');
    // Replace this with your actual endpoint URL
    const RESULTS_ENDPOINT = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhlfjLi6S0OW6WDq826G80IBbAbe_RYhAykcpdMHVZ4_B4RBo7MztadudjTIJNw6nLcXXsPbYbnRpjcxqeQtn_m-Q6SP0x3bhboBxohzd7sRzbf1_1TL8vXH0ADiGGAcNJVG3WKJnSLULq0ptIo6kABo_moiyAPiQ1gQNl8HHQ179tE5oeHddIU_gtVOITD5DzCKcfjAIz5EO-586xedrJbBA_ehy7iO-e5W19TCrtXih8HX2WZzGD6PjET1_3EnQZsYmtGhsQqQceVqC9_lgre6wkuPg&lib=MhRHml9EOfWdhWFKw9gegHCTRpxoN5lQD";

    // Fetch the JSON data from your endpoint
    fetch(RESULTS_ENDPOINT)
        .then(response => response.json())
        .then(data => {
            // 'data' is an object with sheet names as keys.
            const sheets = Object.keys(data);
            // Populate the dropdown menu with sheet names.
            sheets.forEach(sheetName => {
                const option = document.createElement('option');
                option.value = sheetName;
                option.textContent = sheetName;
                sheetSelect.appendChild(option);
            });

            // When selection changes, render table for that sheet.
            sheetSelect.addEventListener('change', function () {
                renderResultsTable(sheetSelect.value, data[sheetSelect.value]);
            });

            // Render table for the first sheet by default.
            if (sheets.length > 0) {
                sheetSelect.value = sheets[0];
                renderResultsTable(sheets[0], data[sheets[0]]);
            }
        })
        .catch(error => {
            console.error('Error fetching race results:', error);
            resultsOutput.textContent = 'Error loading race results.';
        });

    // Function to render the results table.
    function renderResultsTable(sheetName, results) {
        // Clear previous output.
        resultsOutput.innerHTML = '';

        // Add a heading for the selected sheet.
        const heading = document.createElement('h2');
        heading.textContent = sheetName;
        resultsOutput.appendChild(heading);

        if (!results || results.length === 0) {
            const message = document.createElement('p');
            message.textContent = 'No results found for this sheet.';
            resultsOutput.appendChild(message);
            return;
        }

        // Create table and build header.
        const table = document.createElement('table');
        table.classList.add('results-table');
        const headerRow = document.createElement('tr');
        Object.keys(results[0]).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Add rows for each record.
        results.forEach(record => {
            const row = document.createElement('tr');
            Object.keys(record).forEach(key => {
                const td = document.createElement('td');
                td.textContent = record[key];
                row.appendChild(td);
            });
            table.appendChild(row);
        });

        resultsOutput.appendChild(table);
    }
});
