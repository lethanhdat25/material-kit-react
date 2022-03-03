import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ConFirmBox from 'src/components/UI/RemoveCofirmBox';
import { getProductById } from 'src/store/slice/products';
import { fCurrency } from 'src/utils/formatNumber';
import { getCartItems, removeCartItems, setCartItems } from 'src/utils/sessionStorage';
import css from '../components/_dashboard/cart/Cart.module.css';

const urlImage = 'https://localhost:44349/uploads/';

export default function Cart() {
    const navigate = useNavigate();
    const [amounts, setAmounts] = useState([]);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);
    const [itemRemove, setRemove] = useState(false);
    const [isRemove, setIsRemove] = useState({});
    const [note, setNote] = useState('');

    //TODO: Set Cart
    useEffect(() => {
        setData([]);
        setNote(sessionStorage.getItem('note'));
        setCart(getCartItems());
    }, [isRemove]);

    useEffect(() => {
        cart.forEach((item) => {
            setAmounts((state) => [...state, item.amount]);
            fetchData(item.id);
        });
    }, [cart]);

    //TODO: Get Data
    const fetchData = async (id) => {
        try {
            const res = await dispatch(getProductById(id));
            setData((state) => [...state, res.payload]);
            unwrapResult(res);
        } catch (e) {
            console.log(e);
        }
    };

    //Update Cart In sessionStorage
    const resetCartItems = (id, amount) => {
        const newCartItems = cart.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    amount: amount
                };
            }
            return item;
        });
        removeCartItems();
        setCartItems(newCartItems);
    };

    const handleChangeAmount = (e, index, id) => {
        const amount = +e.target.value;
        // if (amount <= 0) {
        //     return;
        // }
        setAmounts((state) => {
            if (state[index] >= 0) {
                state.splice(index, 1, amount);
            }
            return [...state];
        });
        resetCartItems(id, amount);
    };

    //Render Item In Cart
    let totalBill = 0;
    data.map((item, index) => {
        totalBill += item.product.price * amounts[index];
    });
    const renderCartItems = () => {
        return data.map((item, index) => {
            const price = item.product.price * 1000;

            return (
                <tr key={index} className="cartItem" data-id="1079127610">
                    <td className="product">
                        <a href="/products/better-brown-cross-bag">
                            <div className={css['thumb-cart']}>
                                <img src={urlImage + item.image['$values'][0]} alt="" />
                                <h4>{item.product.name}</h4>
                                <span>{fCurrency(price)}</span>
                            </div>
                        </a>
                    </td>
                    <td className="qty">
                        <div className={css['qty-number']}>
                            <input
                                type="button"
                                value="<"
                                className="qty-minus"
                                onClick={() =>
                                    setAmounts((state) => {
                                        if (state[index] > 1) {
                                            resetCartItems(item.product.id, state[index] - 1);
                                            state.splice(index, 1, state[index] - 1);
                                        }
                                        return [...state];
                                    })
                                }
                                field="quantity"
                            />
                            <input
                                type="number"
                                size="4"
                                name="quantity"
                                min="1"
                                id="updates_1079127610"
                                value={amounts[index]}
                                onChange={() => handleChangeAmount(event, index, item.product.id)}
                                className="tc item-quantity qty"
                            />
                            <input
                                type="button"
                                value=">"
                                onClick={() =>
                                    setAmounts((state) => {
                                        resetCartItems(item.product.id, state[index] + 1);
                                        state.splice(index, 1, state[index] + 1);
                                        return [...state];
                                    })
                                }
                                className="qty-plus"
                                field="quantity"
                            />
                        </div>
                    </td>
                    <td className="linePrice">
                        <b>{fCurrency(price * amounts[index])}</b>
                    </td>
                    <td className="remove">
                        <button
                            className={css['remove-item']}
                            //Handle Remove Item
                            data-id="1079127610"
                            style={{ border: 'none', backgroundColor: 'white' }}
                            onClick={() =>
                                setRemove({ name: item.product.name, id: item.product.id })
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-trash3"
                                viewBox="0 0 16 16"
                            >
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                            </svg>
                        </button>
                    </td>
                </tr>
            );
        });
    };

    const handleChangeNote = (e) => {
        setNote(e.target.value);
        sessionStorage.setItem('note', e.target.value);
    };

    console.log(totalBill);

    return (
        <div className="row">
            <div className="col-md-8 col-sm-12 col-xs-12 listItem">
                <div className="table-cart-area">
                    <table className={`table ${css['table-cart']}`}>
                        <tbody>
                            <tr>
                                <th className="product">Sản phẩm</th>
                                <th className="qty">Số lượng</th>
                                <th className="linePrice">Tổng tiền</th>
                                <th className="remove">Xóa</th>
                            </tr>
                            {renderCartItems()}
                        </tbody>
                    </table>
                    <div className={css['button-action']}>
                        <span
                            className="cartContinue"
                            onClick={() => navigate('/dashboard/products')}
                        >
                            Tiếp tục mua sắm
                        </span>
                    </div>
                </div>
            </div>
            <div className="col-md-4 col-sm-12 col-xs-12 listInfo">
                <div className={css['calculate-area']}>
                    <div className={css['ct-ft-cart']}>
                        <div className={css['total-cart']}>
                            <div className={css['subtotal']}>
                                Tổng tiền <b>{fCurrency(totalBill * 1000)}</b>
                            </div>
                            <div className={`${css['final-total']} text-center`}>
                                <span
                                    onClick={() => navigate('/dashboard/checkout')}
                                    className={css['update-cart']}
                                >
                                    Thanh toán
                                </span>
                            </div>
                        </div>
                        <div className={css['note-item']}>
                            <div className="note-cart">
                                <label
                                    className={css['control-label']}
                                    htmlFor="CartSpecialInstructions"
                                >
                                    Ghi chú
                                </label>
                                <textarea
                                    name="note"
                                    className="form-control"
                                    value={note}
                                    placeholder="Bạn muốn mô tả rõ hơn về đơn hàng..."
                                    onChange={handleChangeNote}
                                    id="CartSpecialInstructions"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {itemRemove && (
                <ConFirmBox
                    itemRemove={itemRemove}
                    closeBox={() => setRemove(false)}
                    removed={() => setIsRemove(itemRemove)}
                />
            )}
        </div>
    );
}
