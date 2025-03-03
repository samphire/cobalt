const SERVER_URL = process.env.REACT_APP_SERVER_URL;

/**
 * Fetch all available texts from `reader3.text`
 * @returns {Promise} List of texts (JSON)
 */
export async function getAllReaders() {
    const response = await fetch(SERVER_URL + "/postData.php?type=getReaders", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}
