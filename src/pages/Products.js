// material
import { Container, Stack, TablePagination, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// components
import Page from '../components/Page';
import {
    ProductCartWidget,
    ProductFilterSidebar,
    ProductList,
    ProductSort
} from '../components/_dashboard/products';
import { getProduct } from '../store/slice/products';
//
import PRODUCTS from '../_mocks_/products';

// ----------------------------------------------------------------------

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

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    if (query) {
        return filter(
            array,
            (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function EcommerceShop() {
    const [openFilter, setOpenFilter] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [page, setPage] = useState(0);
    const [order] = useState('asc');
    const [data, setData] = useState([]);
    const [orderBy] = useState('name');
    const [filterName] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await dispatch(getProduct());
            setData(res.payload);
            unwrapResult(res);
        } catch (e) {
            console.log(e);
        }
    };

    const formik = useFormik({
        initialValues: {
            gender: '',
            category: '',
            colors: '',
            priceRange: '',
            rating: ''
        },
        onSubmit: () => {
            setOpenFilter(false);
        }
    });

    const { resetForm, handleSubmit } = formik;

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    const handleResetFilter = () => {
        handleSubmit();
        resetForm();
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        console.log(parseInt(event.target.value, 10));
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredProducts = applySortFilter(data, getComparator(order, orderBy), filterName);

    const dataOfPage = filteredProducts
        .filter((item) => item.product.name !== undefined)
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Page title="Dashboard: Products | Minimal-UI">
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Products
                </Typography>

                <Stack
                    direction="row"
                    flexWrap="wrap-reverse"
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ mb: 5 }}
                >
                    <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                        <ProductFilterSidebar
                            formik={formik}
                            isOpenFilter={openFilter}
                            onResetFilter={handleResetFilter}
                            onOpenFilter={handleOpenFilter}
                            onCloseFilter={handleCloseFilter}
                        />
                        <ProductSort />
                    </Stack>
                </Stack>

                <ProductList products={dataOfPage} />
                <TablePagination
                    rowsPerPageOptions={[8, 16, 24]}
                    component="div"
                    count={PRODUCTS.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <ProductCartWidget />
            </Container>
        </Page>
    );
}
