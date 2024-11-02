import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const isValidated = () => {
        if (username.trim().length === 0) return false;
        if (password.trim().length === 0) return false;

        // const pattern = /\b[dD][eE]\d{6}\b/i;
        // return pattern.test(username);
        return username;
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (isValidated()) {
    //         try {
    //             const response = await axios.get(`http://localhost:3001/accounts`);

    //             if (response.status === 200) {
    //                 const account = response.data.find(
    //                     (acc) =>
    //                         acc.username === username &&
    //                         acc.password === password
    //                 );

    //                 if (account) {
    //                     Swal.fire({
    //                         title: 'Đăng nhập thành công!',
    //                         text: 'Chào mừng bạn đến với hệ thống quản lý laptop!',
    //                         icon: 'success',
    //                     }).then(() => {
    //                         localStorage.setItem('account_name', account.name);
    //                         localStorage.setItem('username_github', account.username_github);
    //                         navigate('/');
    //                     });
    //                 } else {
    //                     Swal.fire({
    //                         icon: 'error',
    //                         title: 'Đăng nhập thất bại',
    //                         text: 'Mã số sinh viên hoặc mật khẩu không chính xác!',
    //                     }).then(() => {
    //                         navigate('/hextech/login');
    //                     });
    //                 }
    //             }
    //         } catch (error) {
    //             console.error('Error fetching accounts:', error);
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Lỗi hệ thống',
    //                 text: 'Vui lòng thử lại sau!',
    //             });
    //         }
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (isValidated()) {
            try {
                const response = await axios.get(`http://localhost:3001/accounts`);
                console.log(response.data); // Log response to check the data
    
                if (response.status === 200) {
                    const account = response.data.find(
                        (acc) =>
                            acc.username.toLowerCase() === username.toLowerCase() &&
                            acc.password === password
                    );
    
                    if (account) {
                        Swal.fire({
                            title: 'Đăng nhập thành công!',
                            text: 'Chào mừng bạn đến với hệ thống quản lý laptop!',
                            icon: 'success',
                        }).then(() => {
                            localStorage.setItem('account_name', account.name);
                            localStorage.setItem('username_github', account.username_github);
                            navigate('/');
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Đăng nhập thất bại',
                            text: 'Mã số sinh viên hoặc mật khẩu không chính xác!',
                        }).then(() => {
                            navigate('/hextech/login');
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching accounts:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi hệ thống',
                    text: 'Vui lòng thử lại sau!',
                });
            }
        }
    };
    

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: '100vh', overflow: 'hidden' }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 shadow-lg p-5">
                        <div className="mx-5">
                            <h6 className="display-6 mb-5 text-center">
                                Đăng nhập vào HexTech
                            </h6>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="input-username" className="form-label">
                                        Nhập username:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="input-username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value.replace(/\s/g, ''))
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="input-password" className="form-label">
                                        Nhập mật khẩu:
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="input-password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value.replace(/\s/g, ''))
                                        }
                                        required
                                    />
                                </div>
                                <div className="d-flex justify-content-center mt-4">
                                    <button type="submit" className="btn btn-primary w-100">
                                        Đăng nhập
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
