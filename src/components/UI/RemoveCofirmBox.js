import { getCartItems, setCartItems } from 'src/utils/sessionStorage';
import Modal from './Modal';

const ConFirmBox = ({ itemRemove, closeBox, removed }) => {
    const handleRemoveItem = async () => {
        const cartItems = await getCartItems();
        const newCartItems = cartItems.filter((item) => item.id !== itemRemove.id);
        closeBox();
        removed();
        setCartItems(newCartItems);
    };

    return (
        <Modal>
            <div style={{ marginTop: 10 }}>
                <h3>{`Bạn muốn xóa sản phẩm ${itemRemove.name} ra khỏi giỏ hàng?`}</h3>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        justifyContent: 'space-around',
                        width: '20%',
                        float: 'right',
                        marginTop: 40
                    }}
                >
                    <button type="button" className="btn btn-primary" onClick={closeBox}>
                        No
                    </button>
                    <button type="button" className="btn btn-danger" onClick={handleRemoveItem}>
                        Yes
                    </button>
                </div>
            </div>
        </Modal>
    );
};
export default ConFirmBox;
