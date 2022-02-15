import React from 'react';

const headCells = [
    {id: 'test_id', label: 'Test id'},
    {id: 'qnum', label: 'Question Number'},
    {id: 'rubrik', label: 'Rubrik'},
    {id: 'text1', label: 'text1'},
    {id: 'text2', label: 'text2'},
    {id: 'text3', label: 'text3'},
    {id: 'text4', label: 'text4'},
    {id: 'text5', label: 'text5'},
    {id: 'text6', label: 'text6'},
    {id: 'text7', label: 'text7'},
    {id: 'answer', label: 'answer'},
    {id: 'type', label: 'type', disableSorting: true},
    {id: 'image', label: 'image', disableSorting: true},
    {id: 'audio', label: 'audio'},
    {id: 'video', label: 'video', disableSorting: true}
    {id: 'actions', label: 'Actions', disableSorting: true}
]

export default function Questions(props) {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [isEdit, setIsEdit] = useState("false")
    const [records, setRecords] = useState(null);
    const [filterFn, setFilterFn] = useState({fn: items => (items)});
    const [openPopup, setOpenPopup] = useState(false);
    const [refreshRecords, setRefreshRecords] = useState(0)
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    useEffect(async () => {
        let students = await studentService.getAllStudents()
        let languages = await studentService.getLanguages()
        const studs = students.map(x => ({
                ...x,
                languageName: languages[x.language_id - 1].name,
                isActive: x.isActive ? <CheckCircleOutlineIcon fontSize='large'/> : 'no'
            }
        ))
        console.log(studs)
        setRecords(studs)
    }, [refreshRecords]);
    return (
        <div></div>
    );
}