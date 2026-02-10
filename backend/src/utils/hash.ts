import bcrypt from 'bcryptjs';

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

export async function hashPassword(password: string): Promise<string>{
    const hashed = await bcrypt.hash(password, SALT_ROUNDS); 
    return hashed;
}

export async function comparePassword(password: string, hashedPassword: string):Promise<boolean>{
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}