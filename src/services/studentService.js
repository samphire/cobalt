export function insertStudent(data) {
    console.log(data)
    Object.values(data).map((i) => {
        console.log(i)
    })
}

export async function getAllStudents() {
    const response = await fetch("https://notborder.org/cobalt/postData.php?type=students", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return response.json();
}

export async function getLanguages(){
    const response = await fetch('https://notborder.org/cobalt/postData.php?type=languages', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return response.json();
}