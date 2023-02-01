import { styled, TextField } from "@mui/material";

const CustomTextField = styled(TextField)({
	// "& label.Mui-focused": {
	// 	color: "green",
	// },
	// "& .MuiInput-underline:after": {
	// 	borderBottomColor: "green",
	// },
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderRadius: 10,
			borderWidth: 0,
			height: 40,
		},
		// "&:hover fieldset": {
		// 	boxShadow: "-5px -5px 21px 0.5px #A6EEF4",
		// },
		// "&.Mui-focused fieldset": {
		// 	borderColor: "green",
		// },
	},
});

export default CustomTextField;
