import "./login.css";
import { Button, IconButton, InputAdornment, Typography } from "@mui/material";
import CustomTextField from "../../components/TextInput/CustomTextField";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
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
                        name="useremail"
                        variant="outlined"
                        className="custom-login-text-field"
                        label="Email"
                        margin="normal"
                    />
                    <CustomTextField
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
                    <Button variant="contained" className="login-button">
                        Login
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
