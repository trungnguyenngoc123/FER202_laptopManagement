// import favicon from '../../../public/favicon.ico';
// import favicon from '/images/logo512.png';
const About = () => {
	return (
		<div className="container d-flex flex-column align-items-center justify-content-center mt-4">
			<h6 className="display-6">Giới thiệu dụ án HexTech</h6>
			<div className="container d-flex flex-column align-items-center justify-content-center mt-5 mb-5">
				<div className="row align-items-center justify-content-center">
					<div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
						{/* <img src={favicon} alt="LabTrack Logo" className="img-fluid" /> */}
					</div>
					<div className="col-md-6 align-items-center justify-content-center">
						<p className="lead">
							<strong>HexTech</strong> là một dự án phát triển web độc đáo tập
							trung vào việc quản lý và theo dõi laptop một cách hiệu quả trong
							hệ thống quản lý kho.
						</p>
						<p className="lead">Tổng quan về Công nghệ:</p>
						<ul className="lead">
							<li>
								<strong>React</strong>: Thư viện JavaScript để xây dựng giao
								diện người dùng.
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="container d-flex flex-column align-items-center justify-content-center mt-2">
				<h6 className="display-6 mb-4">Thành viên</h6>
				<a href="https://github.com/PaimonZero/LaptopManager/graphs/contributors">
					<img src="https://contrib.rocks/image?repo=PaimonZero/LaptopManager" />
				</a>
			</div>
		</div>
	);
};

export default About;