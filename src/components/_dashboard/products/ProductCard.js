// material
import { Box, Card, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { getCartItems, removeCartItems, setCartItems } from 'src/utils/sessionStorage';
// utils
import { fCurrency } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const urlImage = 'https://localhost:44349/uploads/';
const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
    product: PropTypes.object
};

export default function ShopProductCard({ items }) {
    const { name, price, priceSale, id } = items.product;
    const imageSrc = urlImage + items.image;

    const handleAddToCart = () => {
        const cartItems = getCartItems();
        let indexItemInCart = cartItems.findIndex((item) => item.id === id);

        if (indexItemInCart > -1) {
            cartItems.splice(indexItemInCart, 1, {
                id,
                amount: cartItems[indexItemInCart].amount + 1
            });
        } else {
            cartItems.push({ id, amount: 1 });
        }

        removeCartItems();
        setCartItems(cartItems);
    };

    return (
        <Card>
            <Box sx={{ pt: '100%', position: 'relative' }}>
                <ProductImgStyle alt={name} src={imageSrc} />
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                    <Typography variant="subtitle2" noWrap onClick={handleAddToCart}>
                        {name}
                    </Typography>
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">
                        Price:
                        <Typography
                            component="span"
                            variant="body1"
                            sx={{
                                color: 'text.disabled',
                                textDecoration: 'line-through',
                                marginLeft: '20px'
                            }}
                        >
                            {priceSale && fCurrency(price)}
                        </Typography>
                        &nbsp;
                        {priceSale ? fCurrency(priceSale) : fCurrency(price)}
                    </Typography>
                </Stack>
                <i className="bi bi-cart2"></i>
            </Stack>
        </Card>
    );
}
