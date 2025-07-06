const SERVER_URL = process.env.REACT_APP_SERVER_URL

export async function getBreakdown(studid, classid) {
    let responseObj = await fetch(`${SERVER_URL}/postData.php?studid=${studid}&classid=${classid}&type=individual_test_data`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'text/plain'
            }
        });
    // console.log(responseObj);
    let responseText = await responseObj.text();
    console.log(responseText);
    return JSON.parse(responseText);
}

export async function getVocaTestDue(studid) {
    let responseObj = await fetch(`${SERVER_URL}/postData.php?studid='${studid}'&type=individual_vocatest_due`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'text/plain'
            }
        });
    // console.log(responseObj);
    let responseText = await responseObj.text();
    console.log(responseText);
    return responseText;
}
