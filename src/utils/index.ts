export const Authenticate = async (name: string, email: string): Promise<any>  => {
    try {
        if (isValidEmail(email) && name.length > 0 && email.length > 0) {
            localStorage?.setItem("username", name);
            localStorage?.setItem("email", email);
            return true;
        } else if (!isValidEmail(email)) {
            return "Invalid Email. Please try again!"
        } else if (email.length === 0) {
            return "Email cannot be empty!"
        } else if (name.length === 0) {
            return "Username cannot be empty!"
        }
    } catch (err) {
        throw new Error("Something went wrong");
    }
};


export const Verify = async (code: string): Promise<boolean> => {
    try {
        if (code.length == 8) {
            localStorage?.setItem("loggedIn", "true")
            return true
        } else {
            return false
        }
    } catch (err) {
        throw new Error("Something went wrong")
    }
}

function isValidEmail(email: string) {
    // Regular expression for validating email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
}



