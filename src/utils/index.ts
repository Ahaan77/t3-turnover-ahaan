export const SignUp = async (name: string, email: string): Promise<boolean> => {
    try {
        localStorage?.setItem("username", name);
        localStorage?.setItem("email", email);
        return true;
    } catch (err) {
        throw new Error("Something went wrong");
    }
};

export const Verify = async (code: string): Promise<boolean> => {
    try {
        if (code.length == 8) {
            return true
        } else {
            return false
        }
    } catch (err) {
        throw new Error("Something went wrong")
    }
}
