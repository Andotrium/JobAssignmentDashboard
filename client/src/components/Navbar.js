import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
	const { user, logout } = useAuth() || {};

	return (
		<header className="site-header">
			<div className="nav-inner">
				<div className="brand">JobAssignment</div>

				<nav className="nav-links">
					{user ? (
						<>
							<Link to="/jobs">Jobs</Link>
							<Link to="/create-job">Create</Link>
							<span className="muted ml-sm">{user.email}</span>
							<button className="btn btn-ghost ml-sm" onClick={logout}>
								Logout
							</button>
						</>
					) : (
						<>
							<Link to="/login">Login</Link>
							<Link to="/register">Register</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
