import "./login.css";
import { Button, IconButton, InputAdornment, Typography } from "@mui/material";
import CustomTextField from "../../components/TextInput/CustomTextField";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { Link, redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/types";
import { loginWithEmailAndPassword } from "../../redux/slices/authSlice";

function Login() {
	const dispatch = useDispatch<AppDispatch>();
	const [userDetails, setUserDetails] = useState({
		email: "newuser@email.com",
		// email: "",
		password: "1234567",
	});
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleChange = (name: string, value: string) => {
		setUserDetails((prev: any) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const handleLogin = async () => {
		dispatch(loginWithEmailAndPassword({ email: userDetails.email, password: userDetails.password }));
	};
	return (
		<div className="login-root">
			{/* <div> */}
			<div>
				<Typography variant="h3">Login</Typography>
			</div>
			{/* <div> */}
			<div className="form-root-layout">
				<div className="login-form">
					<CustomTextField
						autoFocus
						name="email"
						variant="outlined"
						className="custom-login-text-field"
						label="Email"
						margin="normal"
						value={userDetails.email}
						onChange={(e) => handleChange(e.target.name, e.target.value)}
					/>
					<CustomTextField
						value={userDetails.password}
						onChange={(e) => handleChange(e.target.name, e.target.value)}
						name="password"
						variant="outlined"
						className="custom-login-text-field"
						label="Password"
						margin="normal"
						type={showPassword ? "text" : "password"}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<Button variant="contained" className="login-button" onClick={() => handleLogin()}>
						Login with Google
					</Button>
				</div>

				<Link className="signup-link" to={"/sign-up"}>
					Sign up
				</Link>
			</div>
			{/* </div> */}
		</div>
	);
}

export default Login;
