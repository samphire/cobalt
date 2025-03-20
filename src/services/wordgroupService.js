const SERVER_URL = process.env.REACT_APP_SERVER_URL;

/**
 * Fetch all available wordgroups from `reader3.game_group`
 * @returns {Promise} List of game_groups (JSON)
 */
export async function getAllWordgroups() {
    const response = await fetch(SERVER_URL + "/postData.php?type=getWordgroups", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}
