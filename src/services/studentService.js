export async function insertStudent(data) {
    let temp = {...data}; // have to copy or date function modified original 'values' object causing error
    function convertDateToMysql(inputDate) {
        console.log(inputDate)
        const result = inputDate.toJSON().slice(0, 10);
        console.log(result)
        return result
    }

    temp.dob = convertDateToMysql(data.dob)
    temp.joinDate = convertDateToMysql(data.joinDate)
    temp.lastActiveDate = convertDateToMysql(data.lastActiveDate)
    temp.id = "cjs9898989"
    temp.isActive = temp.isActive ? 1 : 0;

    console.log(JSON.stringify(temp))
//     await fetch("https://notborder.org/cobalt/postData.php?type=newStudent", {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     }).then((response) => response.json());
// }
    const response = await fetch("https://notborder.org/cobalt/postData.php?type=newStudent", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(temp)
    })
    return response.json();
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

export async function getLanguages() {
    const response = await fetch('https://notborder.org/cobalt/postData.php?type=languages', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return response.json();
}
