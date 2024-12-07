import React from 'react'

const Footer: React.FC = () => {
	return (
		<footer className="footer mt-4">
			<div className="text-center">
				<p>© 2024 Lightning Proxies. All rights reserved.</p>
				<div>
					<a href="#" className="footer-link">
						Terms of Service
					</a>{' '}
					|{' '}
					<a href="#" className="footer-link">
						Privacy Policy
					</a>
				</div>
				<div className="social-icons mt-3">
					<a href="#" aria-label="Facebook" className="social-link">
						<i className="fab fa-facebook"></i>
					</a>
					<a href="#" aria-label="Twitter" className="social-link">
						<i className="fab fa-twitter"></i>
					</a>
					<a href="#" aria-label="Instagram" className="social-link">
						<i className="fab fa-instagram"></i>
					</a>
				</div>
			</div>
		</footer>
	)
}

export default Footer
