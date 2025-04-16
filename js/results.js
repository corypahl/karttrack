document.addEventListener('DOMContentLoaded', function () {
    const sheetSelect = document.getElementById('sheet-select');
    if (!sheetSelect) {
        console.error('Error: #sheet-select not found in the DOM.');
        return;
    }
    const resultsOutput = document.getElementById('results-output');

    // Your published Apps Script URL
    const RESULTS_ENDPOINT = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhlfjLi6S0OW6WDq826G80IBbAbe_RYhAykcpdMHVZ4_B4RBo7MztadudjTIJNw6nLcXXsPbYbnRpjcxqeQtn_m-Q6SP0x3bhboBxohzd7sRzbf1_1TL8vXH0ADiGGAcNJVG3WKJnSLULq0ptIo6kABo_moiyAPiQ1gQNl8HHQ179tE5oeHddIU_gtVOITD5DzCKcfjAIz5EO-586xedrJbBA_ehy7iO-e5W19TCrtXih8HX2WZzGD6PjET1_3EnQZsYmtGhsQqQceVqC9_lgre6wkuPg&lib=MhRHml9EOfWdhWFKw9gegHCTRpxoN5lQD";

    fetch(RESULTS_ENDPOINT)
        .then(response => response.json())
        .then(data => {
            const sheets = Object.keys(data);
            sheets.forEach(sheetName => {
                const option = document.createElement('option');
                option.value = sheetName;
                option.textContent = sheetName;
                sheetSelect.appendChild(option);
            });
            sheetSelect.addEventListener('change', () => {
                renderResultsTable(sheetSelect.value, data[sheetSelect.value]);
            });
            if (sheets.length > 0) {
                sheetSelect.value = sheets[0];
                renderResultsTable(sheets[0], data[sheets[0]]);
            }
        })
        .catch(error => {
            console.error('Error fetching race results:', error);
            resultsOutput.textContent = 'Error loading race results.';
        });

    function renderResultsTable(sheetName, results) {
        resultsOutput.innerHTML = '';
        const heading = document.createElement('h2');
        heading.textContent = sheetName;
        resultsOutput.appendChild(heading);

        if (!results || results.length === 0) {
            const msg = document.createElement('p');
            msg.textContent = 'No results found for this sheet.';
            resultsOutput.appendChild(msg);
            return;
        }

        const table = document.createElement('table');
        table.classList.add('results-table');

        // Header row
        const headerRow = document.createElement('tr');
        Object.keys(results[0]).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Data rows
        results.forEach(record => {
            const row = document.createElement('tr');
            Object.keys(record).forEach(key => {
                let value = record[key];
                // If this column is "Date", reformat it
                if (key.toLowerCase() === 'date' && value) {
                    const d = new Date(value);
                    if (!isNaN(d)) {
                        value = `${d.getMonth() + 1}/${d.getDate()}`;
                    }
                }
                const td = document.createElement('td');
                td.textContent = value;
                row.appendChild(td);
            });
            table.appendChild(row);
        });

        resultsOutput.appendChild(table);
    }
});
