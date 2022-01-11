import React, {useState} from 'react';
import {makeStyles, Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '800',
            color: theme.palette.primary.main,
            backgroundColor: 'rgba(234, 242, 251, 0.8)',
            textAlign: 'center',
            borderTop: '1px solid gray'
        },
        '& tbody td': {
            fontWeight: '300'
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer'
        },
        '& .MuiTableBody-root tr:nth-child(even)': {
            backgroundColor: '#fbfbfb'
        },
        '& .MuiTableBody-root tr:nth-child(even):hover': {
            backgroundColor: '#fffbf2'
        }
    },
    pagination: {
        '& .MuiTypography-body2, .MuiTablePagination-root': {
            fontSize: '14px'
        },

        '& .MuiTablePagination-input': {
            fontSize: '14px'

        }
    }
}))

export default function UseTable(records, headCells) {

    const classes = useStyles()

    const pages = [5, 10, 25, 50, 200]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[0])
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()

    const TblContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const TblHead = props => {

        const handleSortRequest = headid => {
            const isAsc = orderBy === headid && order === "asc"
            setOrder(isAsc ? 'desc' : 'asc')
            setOrderBy(headid)
        }

        return (
            <TableHead>
                <TableRow>
                    {
                        headCells.map(headCell => (
                            <TableCell key={headCell.id}
                                       sortDirection={orderBy === headCell.id ? order : false}>
                                {headCell.disableSorting ? headCell.label :
                                    <TableSortLabel
                                        active={orderBy === headCell.id}
                                        direction={orderBy === headCell.id ? order : 'asc'}
                                        onClick={() => {
                                            handleSortRequest(headCell.id)
                                        }}
                                    >{headCell.label}</TableSortLabel>}
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        )
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const TblPagination = () => (
        <TablePagination
            component="div"
            page={page}
            rowsPerPageOptions={pages}
            rowsPerPage={rowsPerPage}
            count={records ? records.length : 0}
            className={classes.pagination}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    )

    function sort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy)
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1
        }
        if (b[orderBy] > a[orderBy]) {
            return 1
        }
        return 0
    }

    const recordsAfterPagingAndSorting = () => {
        console.log('recs')
        console.log(page)
        console.log(rowsPerPage)
        // console.log(records.length)
        if (records) {
            return sort(records, getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
        }

    }

    return {
        TblHead,
        TblContainer,
        TblPagination,
        recordsAfterPagingAndSorting
    };
}

