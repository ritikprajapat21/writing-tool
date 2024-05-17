import { Link, Outlet } from "react-router-dom";

const Create = () => {
	return (
		<>
			<Outlet />
			<div>
				Create
				<Link to="/create/text">Text</Link>
				<Link to="/create/image">image</Link>
			</div>
		</>
	);
};

export default Create;
