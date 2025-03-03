const SERVER_URL = process.env.REACT_APP_SERVER_URL;

/**
 * Allocates a text to a student by inserting a record into `reader3.usertext`
 * @param {Object} allocationData - Contains `userid` and `textid`
 * @returns {Promise} API response (JSON)
 */
export async function allocateText(allocationData) {
    const dataToUpload = JSON.stringify(allocationData);
    console.log("Allocating text:", dataToUpload);

    const response = await fetch(SERVER_URL + "/postData.php?type=allocateText", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: dataToUpload
    });

    return response.json();
}

/**
 * Fetch all text allocations (if needed for a report or review)
 * @returns {Promise} List of allocated texts (JSON)
 */
export async function getAllAllocations() {
    const response = await fetch(SERVER_URL + "/postData.php?type=getAllocations", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}
