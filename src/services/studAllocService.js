export async function insertOrUpdateStudAlloc(data, isEdit) {

    let temp = {...data}; // have to copy or date function modified original 'values' object causing error

    temp.begin = convertDateToMysql(data.begin)
    temp.end = convertDateToMysql(data.end)



    const dataToUpload = JSON.stringify(temp)
    console.log(dataToUpload)
    const type = isEdit.isEdit === "true" ? 'yes' : 'no';
    const response = await fetch("https://notborder.org/cobalt/postData.php?type=newStudAlloc&isEdit=" + type, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: dataToUpload
    })
    return response.json();
}

export async function deleteStudAlloc(studid, classid) {
    const response = await fetch("https://notborder.org/cobalt/postData.php?type=delStudAlloc&studid=" + studid + "&classid="
        + classid, {
        method: 'DELETE',
        headers: {
            'Accept': 'text/plain'
        },
    })
    return response.text();
}

export async function getStudAllocs() {
    const response = await fetch("https://notborder.org/cobalt/postData.php?type=studAllocs", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return response.json();
}


function convertDateToMysql(str) {

    let inputDate = new Date(str + 'Z')
    return inputDate.toJSON().slice(0, 10)

}
