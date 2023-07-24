import { VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton, Button } from "@mui/material";
import CustomTextField from "../../components/TextInput/CustomTextField";
import "./signup.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    // const [state, dispatch] = useReducer(signUpUserReducerFunction, companyDetailsState);
    const [companyDetails, setCompanyDetails] = useState({
        fullName: "",
        email: "",
        companyName: "",
        phoneNumber: "",
        comments: "",
    });

    const handleChangeEvent = (name: string, value: string) => {
        setCompanyDetails((prevState) => {
            return { ...prevState, [name]: value };
        });
    };

    const handleClickshowPassword = () => setShowPassword((showPassword) => !showPassword);

    const handleMouseDownPassword = () => setShowPassword((showPassword) => !showPassword);

    const textFieldNames = [
        { name: "Full Name", fieldName: "fullName" },
        { name: "Email", fieldName: "email" },
        { name: "Company/Property Name", fieldName: "companyName" },
        // { name: "Password", fieldName: "password" },
        { name: "Phone Number", fieldName: "phoneNumber" },
        { name: "Comments", fieldName: "comments" },
    ];
    return (
        <div className="signup-layout">
            <div className="left-image-div">
                <img
                    src="https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    className="left-image"
                />
            </div>
            <div className="signup-root-div">
                <div className="signup-form">
                    {textFieldNames.map(({ fieldName, name }) => (
                        <CustomTextField
                            // autoFocus
                            key={fieldName}
                            name={fieldName}
                            variant="outlined"
                            className="custom-signup-text-field"
                            label={name}
                            margin="normal"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                            ) => handleChangeEvent(e.target.name, e.target.value)}
                        />
                    ))}
                    {/* <CustomTextField
                        autoFocus
                        name="useremail"
                        variant="outlined"
                        className="custom-signup-text-field"
                        label="Email"
                        margin="normal"
                    /> */}
                    <CustomTextField
                        name="password"
                        variant="outlined"
                        className="custom-signup-text-field"
                        label="Password"
                        margin="normal"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickshowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => console.log(companyDetails)}
                        className="login-button"
                    >
                        Sign up
                    </Button>
                </div>

                <div>
                    Got an account? <Link to={"/sign-in"}>Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
