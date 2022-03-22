const SERVER_URL = process.env.REACT_APP_SERVER_URL

export async function insertOrUpdateTestAlloc(data, isEdit) {
    let temp = {...data}; // have to copy or date function modified original 'values' object causing error
    console.log(temp)
    temp.start = convertDateToMysql(data.start)
    temp.finish = convertDateToMysql(data.finish)

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

//
// export async function getAllTests(){
//     const response = await fetch("https://notborder.org/cobalt/postData.php?type=classes")
// }
//
// export async function getAllClasses(){
//
// }

function convertDateToMysql(str) {

    let inputDate = new Date(str + 'Z')
    return inputDate.toJSON().slice(0, 10)

}
