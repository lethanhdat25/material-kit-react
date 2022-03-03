import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postBill } from 'src/store/slice/bills';
import { postCart } from 'src/store/slice/carts';
import { getProductById } from 'src/store/slice/products';
import { getProvinces } from 'src/store/slice/province';
import {editUser, getUser} from 'src/store/slice/user';
import { getCartItems, getSessionStorage } from 'src/utils/sessionStorage';

export default function Checkout() {
    const [user, setUser] = useState();
    const [cart, setCart] = useState([]);
    const [amounts, setAmounts] = useState([]);
    const [name, setName] = useState('');
    const [gmail, setGmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [userProvince, setUserProvince] = useState('');
    const [userDistrict, setUserDistrict] = useState('');
    const [userWard, setUserWard] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectProvince, setSelectProvince] = useState(undefined);
    const [selectDistrict, setSelectDistrict] = useState(undefined);
    const [selectWard, setSelectWard] = useState(undefined);
    const dispatch = useDispatch();
    const [checkValidity, setCheckValidity] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setName(getSessionStorage().name);
        setGmail(getSessionStorage().gmail);
        setPhoneNumber(getSessionStorage().phoneNumber);
        getCartItems().forEach((item) => {
            setAmounts((state) => [...state, item.amount]);
            fetchCart(item.id);
        });
        fetchData();
        fetchUser();
    }, []);

    //TODO: Get Cart
    const fetchCart = async (id) => {
        try {
            const res = await dispatch(getProductById(id));
            setCart((state) => [...state, res.payload]);
            unwrapResult(res);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchUser = async () => {
        try {
            console.log(gmail);
            const res = await dispatch(
                getUser({ type: 'gmail', value: getSessionStorage().gmail })
            );
            unwrapResult(res);
            setUser(res.payload);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchData = async () => {
        try {
            const res = await dispatch(getProvinces());
            setProvinces(res.payload.provinces);
            setDistricts(res.payload.districts);
            setWards(res.payload.wards);
            unwrapResult(res);
        } catch (e) {
            console.log(e);
        }
    };

    let totalBill = 0;

    cart.forEach((item, index) => {
        totalBill += item.product.price * amounts[index];
    });

    const billData = {
        total: totalBill,
        orderTime: new Date(),
        status: 'pending',
        userId:user?.id
    };

    const renderProvinces = () => {
        return (
            <div className="col-md-4 mb-3">
                <label htmlFor="country">Tỉnh / thành</label>
                <select
                    className="custom-select d-block w-100"
                    id="country"
                    required=""
                    value={selectProvince}
                    onChange={(e) => {
                        const indexOfWard = e.target.value;
                        setUserProvince(provinces[indexOfWard].name);
                        setSelectProvince(e.target.value);
                    }}
                >
                    <option value="">Choose...</option>
                    {provinces.map((province, index) => (
                        <option key={province.code} value={index}>
                            {province.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    const renderDistricts = () => {
        return (
            <div className="col-md-4 mb-3">
                <label htmlFor="state">Quận / huyện</label>
                <select
                    className="custom-select d-block w-100"
                    id="state"
                    required=""
                    value={selectDistrict}
                    onChange={(e) => {
                        const indexOfWard = e.target.value;
                        setUserDistrict(districts[selectProvince][indexOfWard].name);
                        setSelectDistrict(e.target.value);
                    }}
                >
                    <option value="">Choose...</option>
                    {districts[selectProvince]?.map((district, index) => (
                        <option key={index} value={index}>
                            {district.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    const renderWards = () => {
        return (
            <div className="col-md-4 mb-3">
                <label htmlFor="state">Xã / phường</label>
                <select
                    className="custom-select d-block w-100"
                    id="state"
                    required=""
                    value={selectWard}
                    onChange={(e) => {
                        const indexOfWard = e.target.value;
                        setUserWard(wards[selectProvince][selectDistrict][indexOfWard].name);
                        setSelectWard(indexOfWard);
                    }}
                >
                    <option value="">Choose...</option>
                    {selectProvince &&
                        selectDistrict &&
                        wards[selectProvince][selectDistrict]?.map((ward, index) => (
                            <option key={index} value={index}>
                                {ward.name}
                            </option>
                        ))}{' '}
                </select>
            </div>
        );
    };

    const checkForm = () => {
        if (
            selectDistrict &&
            selectProvince &&
            selectWard &&
            name !== '' &&
            gmail !== '' &&
            phoneNumber !== '' &&
            address !== ''
        ) {
            setCheckValidity(true);
            return true;
        }
        setCheckValidity(false);
        return false;
    };

    const handleSubmitForm = async (e) => {
        const isValid = checkForm();
        e.preventDefault();
        if (isValid) {
            try {
                const billRes = await dispatch(postBill(billData));

                await getCartItems().forEach( (item, index) => {
                    const cartRes =  dispatch(
                        postCart({
                            amount: item.amount,
                            productId: item.id,
                            billId: billRes.payload.id,
                            price: cart[index].product.price
                        })
                    );
                    unwrapResult(billRes);
                    unwrapResult(cartRes);
                });

                const editUserRes=await dispatch(editUser({
                    id:user.id,
                    accountPassword:user.accountPassword,
                    userAddress:`${address} - ${userWard} - ${userDistrict} - ${userProvince}`
                }));

                unwrapResult(editUserRes);

                navigate('/dashboard', { replace: true });
            } catch (e) {
                console.log(e);
            }
        }
        return;
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Your cart</span>
                        <span className="badge badge-secondary badge-pill">3</span>
                    </h4>
                    <ul className="list-group mb-3 sticky-top" style={{ top: 95 }}>
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 className="my-0">Product name</h6>
                                <small className="text-muted">Brief description</small>
                            </div>
                            <span className="text-muted">$12</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 className="my-0">Second product</h6>
                                <small className="text-muted">Brief description</small>
                            </div>
                            <span className="text-muted">$8</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 className="my-0">Third item</h6>
                                <small className="text-muted">Brief description</small>
                            </div>
                            <span className="text-muted">$5</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between bg-light">
                            <div className="text-success">
                                <h6 className="my-0">Promo code</h6>
                                <small>EXAMPLECODE</small>
                            </div>
                            <span className="text-success">-$5</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong>$20</strong>
                        </li>
                    </ul>
                    <form className="card p-2">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Promo code" />
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-secondary">
                                    Redeem
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Billing address</h4>
                    <form className="needs-validation" onSubmit={handleSubmitForm}>
                        <div className="mb-3">
                            <label htmlFor="username">Username</label>
                            <input
                                className="form-control"
                                placeholder="Username"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">
                                Email <span className="text-muted">(Optional)</span>
                            </label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">@</span>
                                </div>
                                <input
                                    className="form-control"
                                    value={gmail}
                                    placeholder="you@example.com"
                                    onChange={(e) => setGmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userphone">Phone Number</label>
                            <input
                                className="form-control"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                placeholder="1234 Main St"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="row">
                            {/* Render Provinces */}
                            {renderProvinces()}
                            {/* Render Districts */}
                            {renderDistricts()}
                            {/* Render Wards */}
                            {renderWards()}
                        </div>
                        <hr className="mb-4" />
                        <button className="btn btn-primary btn-lg btn-block" type="submit">
                            Continue to checkout
                        </button>
                    </form>
                    {checkValidity || (
                        <div style={{ color: 'red', textAlign: 'center', fontSize: 20 }}>
                            Please enter information in the form
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
