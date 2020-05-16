import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<section className="footer mt-5 bg-light p-5">
			<div className="container">
				<div className="row">
					<div className="col-md-4 col-sm-6 contact">
						<h5>Contact</h5>
						<ul className="nav">
							<li className="address">
								<span className="street">
									20, ikeja Lagos Nigeria
								</span>
							</li>
						</ul>
					</div>

					<div className="col-md-4 col-sm-6 open-hours">
						<h5>Open hours</h5>
						<p>Monday - Sunday 24 hours</p>
					</div>

					<div className="col-md-4 col-sm-6 links">
						<h5>links</h5>
						<div>
							<Link to="/">Home</Link>
						</div>
						<div>
							<Link to="/about">About</Link>
						</div>
						<div>
							<Link to="/services">Services</Link>
						</div>
						<div>
							<Link to="/contact">Contact</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Footer;
