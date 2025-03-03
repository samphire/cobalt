const SERVER_URL = process.env.REACT_APP_SERVER_URL

export async function insertOrUpdateStudent(data, isEdit) {
    let temp = {...data}; // have to copy or date function modified original 'values' object causing error
    temp.DOB = convertDateToMysql(data.DOB)
    temp.join_date = convertDateToMysql(data.join_date)
    temp.last_active_date = convertDateToMysql(data.last_active_date)
    temp.isActive = temp.isActive ? 1 : 0;

    const dataToUpload = JSON.stringify(temp)

    console.log(dataToUpload)

    const type = isEdit.isEdit === "true" ? 'yes' : 'no';

    const response = await fetch(SERVER_URL + "/postData.php?type=newStudent&isEdit=" + type, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: dataToUpload
    })
    return response.json();
}

export async function deleteStudent(id) {

    const response = await fetch(SERVER_URL + "/postData.php?type=delStud&studid=" + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'text/plain'
        },
    })
    return response.text();
}

export async function getAllStudents() {
    const response = await fetch(SERVER_URL + "/postData.php?type=students", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return response.json();
}

export async function getStudentsForClass(classId) {
    const response = await fetch(SERVER_URL + "/postData.php?type=getStudentsForClass&classid=" + classId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}





export async function getLanguages() {
    const response = await fetch(SERVER_URL + "/postData.php?type=languages", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return response.json();
}

function convertDateToMysql(inputDate) {
    if (!inputDate)
        return ''
    if (inputDate.length === 10) return inputDate
    console.log(inputDate)
    const result = inputDate.toJSON().slice(0, 10);
    console.log(result)
    return result
}
