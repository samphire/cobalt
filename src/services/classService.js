const SERVER_URL = process.env.REACT_APP_SERVER_URL

export async function insertOrUpdateClass(data, isEdit) {
    let temp = {...data}; // have to copy or date function modified original 'values' object causing error
    temp.session_start = convertDateToMysql(data.session_start)
    temp.session_end = convertDateToMysql(data.session_end)

   const dataToUpload = JSON.stringify(temp)

    console.log(dataToUpload)

    const type = isEdit.isEdit === "true" ? 'yes' : 'no';

    const response = await fetch(SERVER_URL + "/postData.php?type=newClass&isEdit=" + type, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: dataToUpload
    })
    return response.json();
}

export async function deleteClass(id) {

    const response = await fetch(SERVER_URL + "/postData.php?type=delClass&classid=" + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'text/plain'
        },
    })
    return response.text();
}

export async function getAllClasses() {
    const response = await fetch(SERVER_URL + "/postData.php?type=classes", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return response.json();
}

function convertDateToMysql(inputDate) {
    if (inputDate.length === 10) return inputDate
    console.log(inputDate)
    const result = inputDate.toJSON().slice(0, 10);
    console.log(result)
    return result
}
