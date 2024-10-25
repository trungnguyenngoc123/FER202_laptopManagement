import '../Sidebar.css'
function Navbar() {
    return (
        <div class="header">
            <div class="search-bar">
                <input type="text" class="form-control" placeholder="Search..." />
                <button type='submit' class="search-icon position-absolute btn btn-primary">
                    <i class="bi bi-search"></i>
                </button>
            </div>
            <div class="icons d-flex align-items-center">
                <div class="menu-item">
                    <span class="icon">
                        <ion-icon name="notifications-outline" class="icon mx-2"></ion-icon>
                    </span>
                </div>
                <div class="menu-item">
                    <span class="icon">
                        <ion-icon name="person-outline" class="icon mx-2"></ion-icon>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Navbar;