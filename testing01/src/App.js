import { useState } from "react";
import validator from "validator";

function App() {
	const [form, setForm] = useState({
		email: "",
		password: "",
		confirm_password: "",
	});
	const [error, setError] = useState("");

	function handleChange(e) {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		const invalidEmail = validator.isEmail(form.email);
		const emptyPassword = validator.isEmpty(form.password);
		const emptyConfirmPassword = validator.isEmpty(form.confirm_password);
		const isPasswordLengthValid = validator.isLength(form.password, {
			min: 5,
			max: 12,
		});
		const isEqual = validator.equals(form.confirm_password, form.password);

		if (!invalidEmail) {
			setError("invalid email was entered");
			return;
		}
		if (emptyPassword) {
			setError("password cannot be empty");
			return;
		}
		if (!isPasswordLengthValid) {
			setError("password length must be 5 or more");
			return;
		}
		if (!isPasswordLengthValid) {
			setError("password length must be 5 or more");
			return;
		}
		if (emptyConfirmPassword) {
			setError("confirm password cannot be empty");
			return;
		}
		if (!isEqual) {
			setError("confirm password must be equal to password");
			return;
		}
	}

	return (
		<div className="App">
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="email">email</label>
					<input
						type="email"
						name="email"
						id="email"
						value={form.email}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="password">password</label>
					<input
						type="password"
						name="password"
						id="password"
						value={form.password}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="confirm-password">confirm password</label>
					<input
						type="password"
						name="confirm_password"
						id="confirm-password"
						value={form.confirm_password}
						onChange={handleChange}
					/>
				</div>
				<p>{error ? error : null}</p>
				<button type="submit">submit</button>
			</form>
		</div>
	);
}

export default App;
