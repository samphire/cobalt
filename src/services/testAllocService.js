const SERVER_URL = process.env.REACT_APP_SERVER_URL

export async function insertOrUpdateTestAlloc(data, isEdit) {
    let temp = {...data}; // have to copy or date function modified original 'values' object causing error
    console.log(temp)
    console.log("data.start: " + data.start + ", data.finish: " + data.finish);
    temp.start = convertDateToMysql(data.start, true);
    temp.finish = convertDateToMysql(data.finish, false);

    console.log(temp);

    const dataToUpload = JSON.stringify(temp)

    const type = isEdit.isEdit === "true" ? 'yes' : 'no';

    const response = await fetch(SERVER_URL + "/postData.php?type=newTestAlloc&isEdit=" + type, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: dataToUpload
    })
    return response.json();
}

export async function deleteTestAlloc(classid, testid) {

    const response = await fetch(SERVER_URL + "/postData.php?type=delTestAlloc&classid=" + classid + "&testid=" + testid, {
        method: 'DELETE',
        headers: {
            'Accept': 'text/plain'
        },
    })
    return response.text();
}

export async function resetTestAlloc(classid, testid) {
    const response = await fetch(SERVER_URL + "/postData.php?type=resetTestAlloc&classid=" + classid + "&testid=" + testid, {
        method: 'GET',
        headers: {
            'Accept': 'text/plain'
        }
    })
    return response.text()
}

export async function getAllTestAllocs() {
    const response = await fetch(SERVER_URL + "/postData.php?type=testAllocs", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return response.json();
}

function convertDateToMysql(date, isStart) {
    if(!(date instanceof Date)) date=new Date(date);
    if(isNaN(date)) return null;

    const pad = n => n.toString().padStart(2, '0');

    const tyme = isStart ? ' 05:00:00' : ' 23:59:59';

    return [
        date.getFullYear(),
        pad(date.getMonth() + 1),
        pad(date.getDate())
    ].join('-') + tyme;

}
