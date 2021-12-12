import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
    alpha, Autocomplete, Avatar, Button,
    Checkbox, Chip,
    Container,
    FormControlLabel, IconButton, Paper, SvgIcon,
    Switch, Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel, TextField, Toolbar, Tooltip,
} from "@mui/material";
import {useAuth} from "../hooks/useAuth";
import PropTypes from "prop-types";
import DeleteIcon from '@mui/icons-material/Delete';
import {visuallyHidden} from '@mui/utils';
import AddIcon from '@mui/icons-material/Add';

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import {useEffect, useState} from "react";
import * as api_help from "../helpers/requests/product";
import {useHistory} from "react-router-dom";
import {getCategories} from "../helpers/requests/category";
import {EditOutlined} from "@mui/icons-material";


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'photo',
        numeric: false,
        disablePadding: true,
        label: '',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'category',
        numeric: false,
        disablePadding: false,
        label: 'Category',
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'has_variants',
        numeric: false,
        disablePadding: false,
        label: 'Has Variants',
    },
    {
        id: 'stock',
        numeric: true,
        disablePadding: false,
        label: 'Stock',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price(€)',
    },
    {
        id: 'edit',
        numeric: true,
        disablePadding: false,
        label: 'Edit',
    },
];

function EnhancedTableHead(props) {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all products',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const {numSelected} = props;
    const [category, setCategory] = React.useState([]);

    useEffect(async () => {
        let req = await getCategories();
        setCategory(req.data);
    }, [])

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}

        >

            {numSelected > 0 ? (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Products
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon color={'secondary'}/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Box

                >
                    <Autocomplete
                        id="highlights-demo"
                        sx={{width: 300}}
                        options={category}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                            <TextField {...params} label="Search By Category" margin="normal"/>
                        )}
                        onChange={(option) => {
                            props.passSearchWord(option.target.outerText);
                            // console.log(option.target.outerText);
                        }}
                        renderOption={(props, option, {inputValue}) => {
                            const matches = match(option.name, inputValue);
                            const parts = parse(option.name, matches);

                            return (
                                <li {...props}>
                                    <div>
                                        {parts.map((part, index) => (
                                            <span
                                                key={index}
                                                style={{
                                                    fontWeight: part.highlight ? 700 : 400,
                                                }}
                                            >
                                        {part.text}
                                        </span>
                                        ))}
                                    </div>
                                </li>
                            );
                        }}
                    />
                </Box>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

function Products() {
    const [products, setProducts] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    useEffect(async () => {
        console.log(searchWord);
        let data = {
            "name": searchWord
        }
        let res = await api_help.getProductsByCategory(data)
        setProducts(res.data)
    }, [searchWord])
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const history = useHistory();
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = products.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;


    return (
        <Container>
            <Box sx={{
                display: "flex",
                alignItems: 'flex-end',
                flexDirection: 'column',
                justifyContent: 'right'
                // flexWrap: 'nowrap',
                // backgroundColor: 'white'
            }}>
                <Box
                    mt={2}
                    display={'flex'}
                    justifyContent={'right'}
                >
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            history.push("/product/add")
                        }}
                        startIcon={<AddIcon/>}
                    >
                        {'Add New Product'}
                    </Button>

                </Box>
                <Box sx={{width: '100%'}} mt={2}>
                    <Paper sx={{width: '100%', mb: 2, overflow: "hidden"}}>
                        <EnhancedTableToolbar numSelected={selected.length} passSearchWord={setSearchWord}/>
                        <TableContainer>
                            <Table
                                sx={{minWidth: 750}}
                                aria-labelledby="tableTitle"
                                size={dense ? 'small' : 'medium'}
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={products.length}
                                />
                                <TableBody>
                                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                                    {stableSort(products, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row.id);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            let variantCounter = 0;
                                            let stockCounter = 0;
                                            for (const obj of row.variants) {
                                                variantCounter++;
                                                stockCounter = stockCounter + obj.stock;
                                            }

                                            return (
                                                <TableRow
                                                    hover
                                                    // onClick={(event) => handleClick(event, row.id)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={products.id}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                            onClick={(event) => handleClick(event, row.id)}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        <Avatar
                                                            alt={row.name}
                                                            src={row.photo}
                                                            sx={{ width: 40, height: 40 }}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell
                                                        align="left">
                                                        {row.category?.name ? row.category.name : "none"}
                                                    </TableCell>
                                                    <TableCell align="left">{row.description}</TableCell>
                                                    <TableCell
                                                        align="left">
                                                        {row.hasVariants ?
                                                            <Chip label={variantCounter + " variants"}
                                                                  variant="outlined" color="secondary"/> :
                                                            <Chip label={"None"} color="secondary"/>}</TableCell>
                                                    <TableCell align="right">

                                                        {(row.stock >= 1) && (!row.hasVariants) ?
                                                            <Chip label={row.stock + " Left"} variant="outlined"
                                                                  color="secondary"/> :
                                                            <></>
                                                        }
                                                        {(row.stock <= 0) && (!row.hasVariants) ?
                                                            <Chip label={"Sold Out"} color="error"/> :
                                                            <></>
                                                        }
                                                        {(row.stock <= 0) && (row.hasVariants) ?
                                                            <Chip label={stockCounter + " Left in Total"}
                                                                  variant="outlined"
                                                                  color="secondary"/> :
                                                            <></>
                                                        }

                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {(!row.hasVariants) ?
                                                            <Chip label={row.price + "€"}
                                                                  variant="outlined"
                                                                  color="secondary"/>
                                                            :
                                                            <></>
                                                        }

                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Chip label="Edit"
                                                              variant="outlined"
                                                              color="secondary"
                                                              icon={<EditOutlined/>}
                                                              clickable={true}
                                                              onClick = {() => {
                                                                  history.push('product/edit/'+row.id)
                                                              }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (dense ? 33 : 53) * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6}/>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={products.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Box>
            </Box>
        </Container>
    )
        ;
}

export default Products;


