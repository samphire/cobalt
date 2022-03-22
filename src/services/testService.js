const SERVER_URL = process.env.REACT_APP_SERVER_URL

export async function insertOrUpdateTest(data, isEdit) {
    // let temp = {...data}; // have to copy or date function modified original 'values' object causing error
    // temp.DOB = convertDateToMysql(data.DOB)
    // temp.join_date = convertDateToMysql(data.join_date)
    // temp.last_active_date = convertDateToMysql(data.last_active_date)
    // temp.isActive = temp.isActive ? 1 : 0;

    // const temp = data.map((item, idx)=>{
    //     item
    // })

    data.print_wrong = data.print_wrong ? -1 : 0;
    data.print_answer = data.print_answer ? -1 : 0;
    data.oneshot = data.oneshot ? -1 : 0;
    data.retain = data.retain ? -1 : 0;

    const dataToUpload = JSON.stringify(data)

    console.log(dataToUpload)

    const type = isEdit.isEdit === "true" ? 'yes' : 'no';


    const response = await fetch(SERVER_URL + "/postData.php?type=newTest&isEdit=" + type, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: dataToUpload
    })
    return response.json();
}

export async function deleteTest(id) {

    const response = await fetch(SERVER_URL + "/postData.php?type=delTest&testid=" + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'text/plain'
        },
    })
    return response.text();
}

export async function getAllTests() {
    const response = await fetch(SERVER_URL + "/postData.php?type=tests", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return response.json();
}

export async function checkTestImages(testid) {
    const response = await fetch(SERVER_URL + `/postData.php?type=imagesForTest&testid=${testid}`, {
        method: 'GET',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'text/plain'
        }
    })
    return response.text()
}

function convertDateToMysql(inputDate) {
    if (inputDate.length === 10) return inputDate
    console.log(inputDate)
    const result = inputDate.toJSON().slice(0, 10);
    console.log(result)
    return result
}
