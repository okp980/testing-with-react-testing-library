import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("<App/>", () => {
	describe("default UI", () => {
		test("inputs are empty", () => {
			render(<App />);
			const emailInputElem = screen.getByLabelText(/email/i);
			const passwordINputElement = screen.getByLabelText("password");
			const confirmPasswordINputElement =
				screen.getByLabelText(/confirm password/i);
			expect(emailInputElem.value).toBe("");
			expect(passwordINputElement.value).toBe("");
			expect(confirmPasswordINputElement.value).toBe("");
		});

		test("should check if a button is present", () => {
			render(<App />);
			const buttonElem = screen.getByRole("button", { name: /submit/i });
			expect(buttonElem).toBeInTheDocument();
		});
	});

	describe("type into inputs", () => {
		test("should be able to type into the email input", () => {
			render(<App />);
			const emailInputElem = screen.getByRole("textbox", {
				name: /email/i,
			});
			userEvent.type(emailInputElem, "emmanuelokp@gmail.com");
			expect(emailInputElem.value).toBe("emmanuelokp@gmail.com");
		});

		test("should be able to type into the password input", () => {
			render(<App />);
			const passwordInputElem = screen.getByLabelText("password");
			userEvent.type(passwordInputElem, "1234@");
			expect(passwordInputElem.value).toBe("1234@");
		});
		test("should be able to type into the confirm password input", () => {
			render(<App />);
			const confirmPasswordInputElem =
				screen.getByLabelText(/confirm password/i);
			userEvent.type(confirmPasswordInputElem, "1234@");
			expect(confirmPasswordInputElem.value).toBe("1234@");
		});
	});
	describe("check for error", () => {
		test("should show email invalid error on wrong input", () => {
			render(<App />);

			const emailInputElem = screen.getByRole("textbox", {
				name: /email/i,
			});
			userEvent.type(emailInputElem, "emmanuelokpgmail.com");
			expect(
				screen.queryByText(/invalid email was entered/i)
			).not.toBeInTheDocument();
			userEvent.click(screen.getByRole("button", { name: /submit/i }));
			expect(
				screen.getByText(/invalid email was entered/i)
			).toBeInTheDocument();
		});

		test("should show password error if input correct email but invalid password input", () => {
			render(<App />);
			expect(
				screen.queryByText(/password cannot be empty/i)
			).not.toBeInTheDocument();
			userEvent.type(
				screen.getByRole("textbox", {
					name: /email/i,
				}),
				"emmanuelokp@gamil.com"
			);
			userEvent.type(screen.getByLabelText("password"), "");
			userEvent.click(screen.getByRole("button", { name: /submit/i }));
			expect(screen.getByText(/password cannot be empty/i)).toBeInTheDocument();
		});

		test("should show  error if the password length is less than 5", () => {
			render(<App />);
			expect(
				screen.queryByText(/password length must be 5 or more/i)
			).not.toBeInTheDocument();
			userEvent.type(
				screen.getByRole("textbox", {
					name: /email/i,
				}),
				"emmanuelokp@gamil.com"
			);
			userEvent.type(screen.getByLabelText("password"), "qwet");
			userEvent.click(screen.getByRole("button", { name: /submit/i }));
			expect(
				screen.getByText(/password length must be 5 or more/i)
			).toBeInTheDocument();
		});

		test("should show error if confirm password length is empty", () => {
			render(<App />);
			expect(
				screen.queryByText(/confirm password cannot be empty/i)
			).not.toBeInTheDocument();
			userEvent.type(
				screen.getByRole("textbox", {
					name: /email/i,
				}),
				"emmanuelokp@gamil.com"
			);
			userEvent.type(screen.getByLabelText("password"), "qweting");
			userEvent.type(screen.getByLabelText(/confirm password/i), "");
			userEvent.click(screen.getByRole("button", { name: /submit/i }));
			expect(
				screen.getByText(/confirm password cannot be empty/i)
			).toBeInTheDocument();
		});

		test("should show error if confirm password is not equal to password", () => {
			render(<App />);
			expect(
				screen.queryByText(/confirm password must be equal to password/i)
			).not.toBeInTheDocument();
			userEvent.type(
				screen.getByRole("textbox", {
					name: /email/i,
				}),
				"emmanuelokp@gamil.com"
			);
			userEvent.type(screen.getByLabelText("password"), "qweting");
			userEvent.type(screen.getByLabelText(/confirm password/i), "qweweere");
			userEvent.click(screen.getByRole("button", { name: /submit/i }));
			expect(
				screen.getByText(/confirm password must be equal to password/i)
			).toBeInTheDocument();
		});
	});
	describe("valid input fileds", () => {
		test("should not display any error when all inputs are correct", () => {
			render(<App />);
			userEvent.type(
				screen.getByRole("textbox", { name: /email/i }),
				"okpunorrex@gmail.com"
			);
			userEvent.type(screen.getByLabelText("password"), "1234@");
			userEvent.type(screen.getByLabelText(/confirm password/i), "1234@");
			expect(
				screen.queryByLabelText(/invalid email was entered/i)
			).not.toBeInTheDocument();
			expect(
				screen.queryByText(/password cannot be empty/i)
			).not.toBeInTheDocument();
			expect(
				screen.queryByText(/password length must be 5 or more/i)
			).not.toBeInTheDocument();
			expect(
				screen.queryByText(/confirm password cannot be empty/i)
			).not.toBeInTheDocument();
			expect(
				screen.queryByText(/confirm password must be equal to password/i)
			).not.toBeInTheDocument();
		});
	});
});
