export async function insertOrUpdateQuestion(data, isEdit) {
    const dataToUpload = JSON.stringify(data)
    console.log(dataToUpload)
    const type = isEdit.isEdit === "true" ? 'yes' : 'no';
    const response = await fetch("https://notborder.org/cobalt/postData.php?type=newQuestion&isEdit=" + type, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: dataToUpload
    })
    return response.json();
}

export async function deleteQuestion(testid, qnum) {

    const response = await fetch("https://notborder.org/cobalt/postData.php?type=delQuestion&testid="
        + testid + "&qnum=" + qnum, {
        method: 'DELETE',
        headers: {
            'Accept': 'text/plain'
        },
    })
    return response.text();
}

export async function getAllQuestions(testid) {
    const response = await fetch("https://notborder.org/cobalt/postData.php?type=questions&testid=" + testid, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return response.json();
}
