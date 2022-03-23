const SERVER_URL = process.env.REACT_APP_SERVER_URL

export async function registerUser(data) {
    console.log(data)
    const dataToUpload = JSON.stringify(data)
    console.log(dataToUpload)
    const response = await fetch(SERVER_URL + "/postData.php?type=newUser", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: dataToUpload
    })
    return response.json();
}

export async function validateUser(data){
    const dataToUpload = JSON.stringify(data)
    const response = await fetch(SERVER_URL + "/postData.php?type=validateUser", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: dataToUpload
    })
    return response.json();
}
