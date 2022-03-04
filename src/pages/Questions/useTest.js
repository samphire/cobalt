
let testid = 98

const UseTest = (tid) => {
    window.alert('in usetest with value ' + tid)
    testid = tid
}

export {testid, UseTest}

