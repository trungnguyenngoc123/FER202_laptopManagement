import '../Sidebar.css';
import React, { useState } from 'react';
import Navbar from './Navbar';


function Sidebar() {
    // State to manage sidebar expansion
    const [isExpanded, setIsExpanded] = useState(false);

    // Toggle function to expand/collapse the sidebar
    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <Navbar/>
            <div className="wrapper">
            
                {/* Apply the 'expand' class based on the isExpanded state */}
                <aside id="sidebar" className={isExpanded ? "expand" : ""}>
                    <div className="d-flex">
                        <button className="toggle-btn" type="button" onClick={toggleSidebar}>
                            <i class="bi bi-grid"></i>
                        </button>
                        <div className="sidebar-logo">
                            <a href="#">CodzSword</a>
                        </div>
                    </div>
                    
                    {/* <div className="d-flex px-3">
                        <button className="btn btn-outline-primary" type="button">
                            <i class="bi bi-search"></i>
                        </button>
                        <div className='sidebar-logo'>
                            <input className="form-control mx-2" size={30} type="search" placeholder="Search" aria-label="Search" />
                        </div>
                    </div> */}
                    <ul className="sidebar-nav">
                        <li className="sidebar-item active">
                            <a href="#" className="sidebar-link">
                                <i class="bi bi-house"></i>
                                <span>Home</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link">
                                <i class="bi bi-person"></i>
                                <span>Hồ sơ</span>
                            </a>
                        </li>

                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                                data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                                <i className="lni lni-protection"></i>
                                <span>Ôn tập</span>
                            </a>
                            <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link">Login</a>
                                </li>
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link">Register</a>
                                </li>
                            </ul>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                                data-bs-target="#multi" aria-expanded="false" aria-controls="multi">
                                <i className="lni lni-layout"></i>
                                <span>Multi Level</span>
                            </a>
                            <ul id="multi" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link collapsed" data-bs-toggle="collapse"
                                        data-bs-target="#multi-two" aria-expanded="false" aria-controls="multi-two">
                                        Two Links
                                    </a>
                                    <ul id="multi-two" className="sidebar-dropdown list-unstyled collapse">
                                        <li className="sidebar-item">
                                            <a href="#" className="sidebar-link">Link 1</a>
                                        </li>
                                        <li className="sidebar-item">
                                            <a href="#" className="sidebar-link">Link 2</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link">
                                <i className="lni lni-popup"></i>
                                <span>Notification</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link">
                                <i className="lni lni-cog"></i>
                                <span>Setting</span>
                            </a>
                        </li>
                    </ul>
                    <div className="sidebar-footer">
                        <a href="#" className="sidebar-link text-decoration-none">
                            <i className="lni lni-exit"></i>
                            <span>Logout</span>
                        </a>
                    </div>
                </aside>
                <div className="main p-3">
                    {/* <div className="text-center">
                    <h1>
                        Sidebar Bootstrap 5
                    </h1>
                </div> */}
                    {/* code body ở đây */}
                    
                </div>
            </div>
           
        </div>
    );
}

export default Sidebar;
