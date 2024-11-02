import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { reset, changeCurrentPrice, changeDescription, changeName, changePrice, changeImage } from '../../redux/slides/NewProductSlide';

export const AddProductForm = () => {
    const dispatch = useDispatch();
    const { name, description, price, currentPrice, image } = useSelector(state => state.newProduct);
    const navigate = useNavigate();

    const isValidated = () => {
        if (name.trim().length === 0) {
            return 'Tên sản phẩm không được để trống!';
        }

        if (description.trim().length === 0) {
            return 'Mô tả không được để trống!';
        }

        if (price <= 0) {
            return 'Giá gốc phải lớn hơn 0!';
        }

        if (currentPrice <= 0) {
            return 'Ưu đãi phải lớn hơn 0!';
        }

        if (currentPrice >= price) {
            console.log(price, currentPrice);
            return 'Ưu đãi phải nhỏ hơn giá gốc!';
        }

        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = isValidated();

        if (message.length > 0) {
            Swal.fire({
                title: 'Lỗi!',
                text: message,
                icon: 'error',
            });
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3001/products`, {
                name,
                description,
                price,
                currentPrice,
                image,
            });

            if (response.status === 201) {
                Swal.fire({
                    title: 'Thành công!',
                    text: 'Thêm sản phẩm thành công!',
                    icon: 'success',
                }).then(() => {
                    dispatch(reset());
                    navigate('/hextech/products');
                });
            }
        } catch (error) {
            console.error('Error adding product:', error);
            Swal.fire({
                title: 'Lỗi!',
                text: 'Không thể thêm sản phẩm. Vui lòng thử lại!',
                icon: 'error',
            });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            dispatch(changeImage(reader.result));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container mt-5 w-50 shadow-lg py-5">
            <div className="mx-5">
                <h6 className="display-6 mb-4 text-center">Thêm sản phẩm</h6>

                <form onSubmit={handleSubmit}>
                    <div className="d-flex flex-column align-items-center mb-3">
                        <label htmlFor="input-name" className="form-label w-75 text-start">Tên sản phẩm</label>
                        <input
                            type="text"
                            className="form-control w-75"
                            id="input-name"
                            value={name}
                            autoComplete="off"
                            onChange={(e) => dispatch(changeName(e.target.value.replace(/\s/g, '')))}
                            required
                        />
                    </div>
                    <div className="d-flex flex-column align-items-center mb-3">
                        <label htmlFor="input-price" className="form-label w-75 text-start">Giá gốc</label>
                        <input
                            type="number"
                            className="form-control w-75"
                            id="input-price"
                            value={price}
                            autoComplete="off"
                            onChange={(e) => dispatch(changePrice(Number(e.target.value)))}
                            required
                        />
                    </div>
                    <div className="d-flex flex-column align-items-center mb-3">
                        <label htmlFor="input-currentPrice" className="form-label w-75 text-start">Ưu đãi</label>
                        <input
                            type="number"
                            className="form-control w-75"
                            id="input-currentPrice"
                            value={currentPrice}
                            autoComplete="off"
                            onChange={(e) => dispatch(changeCurrentPrice(Number(e.target.value)))}
                            required
                        />
                    </div>
                    <div className="d-flex flex-column align-items-center mb-3">
                        <label htmlFor="input-description" className="form-label w-75 text-start">Mô tả</label>
                        <textarea
                            className="form-control w-75"
                            id="input-description"
                            value={description}
                            autoComplete="off"
                            onChange={(e) => dispatch(changeDescription(e.target.value))}
                            required
                        />
                    </div>
                    <div className="d-flex flex-column align-items-center mb-3">
                        <label htmlFor="input-image" className="form-label w-75 text-start">Hình ảnh</label>
                        <input
                            type="file"
                            className="form-control w-75"
                            id="input-image"
                            accept="image/*"
                            autoComplete="off"
                            onChange={handleImageChange}
                            required
                        />
                        {image && <img src={image} alt="preview" className="w-75 mt-3" />}
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <button
                            type="button"
                            className="btn btn-secondary col-3"
                            style={{ marginRight: '20px' }}
                            onClick={() => navigate(-1)}
                        >
                            Quay lại
                        </button>
                        <button type="submit" className="btn btn-primary col-3">
                            Thêm sản phẩm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductForm;
