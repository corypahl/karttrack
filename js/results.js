const RESULTS_ENDPOINT = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhlfjLi6S0OW6WDq826G80IBbAbe_RYhAykcpdMHVZ4_B4RBo7MztadudjTIJNw6nLcXXsPbYbnRpjcxqeQtn_m-Q6SP0x3bhboBxohzd7sRzbf1_1TL8vXH0ADiGGAcNJVG3WKJnSLULq0ptIo6kABo_moiyAPiQ1gQNl8HHQ179tE5oeHddIU_gtVOITD5DzCKcfjAIz5EO-586xedrJbBA_ehy7iO-e5W19TCrtXih8HX2WZzGD6PjET1_3EnQZsYmtGhsQqQceVqC9_lgre6wkuPg&lib=MhRHml9EOfWdhWFKw9gegHCTRpxoN5lQD";

document.addEventListener('DOMContentLoaded', function () {
    fetch(RESULTS_ENDPOINT)
        .then(response => response.json())
        .then(data => {
            // 'data' is an object where each key is a sheet name and its value is an array of rows.
            const resultsContainer = document.getElementById('results-output');
            for (let sheetName in data) {
                // Create a section for each sheet
                const sheetSection = document.createElement('section');
                sheetSection.classList.add('sheet-section');
                const sheetHeading = document.createElement('h2');
                sheetHeading.textContent = sheetName;
                sheetSection.appendChild(sheetHeading);

                // Create a table for the sheet data if there's any
                if (data[sheetName].length > 0) {
                    const table = document.createElement('table');
                    table.classList.add('results-table');
                    // Build table header from keys of first row
                    const headerRow = document.createElement('tr');
                    Object.keys(data[sheetName][0]).forEach(key => {
                        const th = document.createElement('th');
                        th.textContent = key;
                        headerRow.appendChild(th);
                    });
                    table.appendChild(headerRow);

                    // Build table rows
                    data[sheetName].forEach(row => {
                        const rowElement = document.createElement('tr');
                        Object.keys(row).forEach(key => {
                            const td = document.createElement('td');
                            td.textContent = row[key];
                            rowElement.appendChild(td);
                        });
                        table.appendChild(rowElement);
                    });
                    sheetSection.appendChild(table);
                } else {
                    const message = document.createElement('p');
                    message.textContent = 'No results found for this sheet.';
                    sheetSection.appendChild(message);
                }
                resultsContainer.appendChild(sheetSection);
            }
        })
        .catch(error => {
            console.error('Error fetching race results:', error);
            document.getElementById('results-output').textContent = 'Error loading race results.';
        });
});
