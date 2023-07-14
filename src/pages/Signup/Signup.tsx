import { Link } from "react-router-dom";

function Signup() {
    return (
        <div>
            Signup Page
            <Link to={"/sign-in"}>Login</Link>
        </div>
    );
}

export default Signup;
