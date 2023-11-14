import bcrypt from 'bcrypt';

export async function hashPassword(password) {
    const saltRounds = 5;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Can not hash password');
    }
}

export async function comparePasswords(inputPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(inputPassword, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Passwords hashes are different');
    }
}
