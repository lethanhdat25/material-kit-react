// material
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import ShopProductCard from './ProductCard';
// ----------------------------------------------------------------------

ProductList.propTypes = {
    products: PropTypes.array.isRequired
};

export default function ProductList({ products, ...other }) {
    return (
        <Grid container spacing={3} {...other}>
            {products.map((product) => (
                <Grid key={product.id} item xs={12} sm={6} md={3}>
                    <ShopProductCard items={product} />
                </Grid>
            ))}
        </Grid>
    );
}
