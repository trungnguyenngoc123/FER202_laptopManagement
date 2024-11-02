import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { reset, changeId, changeName, changeDescription, changePrice, changeCurrentPrice, changeImage } from '../../redux/slides/UpdateableProductSlide';
// import { RootState } from '../../redux/store';

const UpdateProductForm = (props) => {
    const dispatch = useDispatch();
    const { id, name, description, price, currentPrice, image } = useSelector((state) => state.updateableProduct);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/products/${props.id}`);

                if (response.status === 200) {
                    dispatch(changeId(response.data.id));
                    dispatch(changeName(response.data.name));
                    dispatch(changeDescription(response.data.description));
                    dispatch(changePrice(response.data.price));
                    dispatch(changeCurrentPrice(response.data.currentPrice));
                    dispatch(changeImage(response.data.image));
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    Swal.fire({
                        title: 'Lỗi!',
                        text: 'Không tìm thấy sản phẩm!',
                        icon: 'error',
                    }).then(() => {
                        dispatch(reset());
                        navigate('/hextech/products');
                    });
                }
            }
        };

        fetchProduct();
    }, [dispatch, props.id, navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            dispatch(changeImage(reader.result));
        };

        reader.readAsDataURL(file);
    };

    const isValidated = () => {
        if (name.trim().length < 1) {
            return 'Tên sản phẩm không được để trống!';
        }

        if (description.trim().length < 1) {
            return 'Mô tả không được để trống!';
        }

        if (price <= 0) {
            return 'Giá gốc phải lớn hơn 0!';
        }

        if (currentPrice <= 0) {
            return 'Ưu đãi phải lớn hơn 0!';
        }

        if (currentPrice >= price) {
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
            const response = await axios.put(`http://localhost:3001/products/${id}`, {
                name,
                description,
                price,
                currentPrice,
                image,
            });

            if (response.status === 200) {
                Swal.fire({
                    title: 'Thành công!',
                    text: 'Cập nhật sản phẩm thành công!',
                    icon: 'success',
                }).then(() => {
                    dispatch(reset());
                    navigate(`/hextech/detail-product/${id}`);
                });
            }
        } catch (error) {
            console.error('Error updating product:', error);
            Swal.fire({
                title: 'Lỗi!',
                text: 'Có lỗi xảy ra khi cập nhật sản phẩm!',
                icon: 'error',
            });
        }
    };

    return (
        <div className="container mt-5 shadow-lg py-5">
            <div className="mx-5">
                <h6 className="display-6 mb-4 text-center">Cập nhật sản phẩm</h6>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-lg-6 col-md-8 col-sm-12 mx-auto">
                            <div className="mb-3">
                                <label htmlFor="input-name" className="form-label">
                                    Tên sản phẩm
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="input-name"
                                    value={name}
                                    autoComplete="off"
                                    onChange={(e) => dispatch(changeName(e.target.value.replace(/\s/g, '')))}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="input-price" className="form-label">
                                    Giá gốc
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="input-price"
                                    value={price}
                                    autoComplete="off"
                                    onChange={(e) => dispatch(changePrice(Number(e.target.value)))}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="input-currentPrice" className="form-label">
                                    Ưu đãi
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="input-currentPrice"
                                    value={currentPrice}
                                    autoComplete="off"
                                    onChange={(e) => dispatch(changeCurrentPrice(Number(e.target.value)))}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="input-description" className="form-label">
                                    Mô tả
                                </label>
                                <textarea
                                    className="form-control"
                                    id="input-description"
                                    value={description}
                                    autoComplete="off"
                                    onChange={(e) => dispatch(changeDescription(e.target.value.trim()))}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="input-image" className="form-label">
                                    Hình ảnh
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="input-image"
                                    accept="image/*"
                                    autoComplete="off"
                                    onChange={handleImageChange}
                                    required
                                />
                                {image && <img src={image} alt="preview" className="w-100 mt-3" />}
                            </div>
                            <div className="d-flex justify-content-center mt-4">
                                <button
                                    type="button"
                                    className="btn btn-secondary col-6"
                                    style={{ marginRight: '20px' }}
                                    onClick={() => navigate(-1)}
                                >
                                    Quay lại
                                </button>
                                <button type="submit" className="btn btn-primary col-6">
                                    Cập nhật sản phẩm
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProductForm;
