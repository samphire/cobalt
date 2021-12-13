export async function getBreakdown(studid, classid) {
    let responseObj = await fetch(`postData.php?studid=${studid}&classid=${classid}&type=individual_test_data`,
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
