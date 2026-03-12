import { prisma } from "../config/db.js";
import { generateJWT } from "../utilities/generateJWT.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";
import bcrypt from 'bcryptjs';

const register = async (req, res) => {
  const validation = registerSchema.safeParse(req.body);

  // console.log("Received registration data:", req.body); // Debugging log
  // console.log("Validation result:", validation); // Debugging log
  if (!validation.success) {
    return res.status(400).json({ message: validation.error.errors[0].message });
  }

  const { name, email, password } = validation.data;

  const userCheck = await prisma.users.findUnique({
    where: {
      email: email
    }
  });

  if (userCheck) {
    return res.status(400).json({ message: 'User already exists' });
  }else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = await prisma.users.create({
      data: { name, email, password: hashedPassword }
    });
    res.status(201).json({ 
      status: 'success',
      message: `User ${user.name} registered successfully`
    });
  }
};

const login = async (req, res) => {
  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ message: validation.error.errors[0].message });
  }

  const { email, password } = validation.data;

  const usercheck = await prisma.users.findUnique({
    where: {
      email: email
    }
  });

  if (!usercheck) {
    res.status(400).json({ message: 'Invalid email or password, please make sure you have an account here' });
  }

  const passCheck = await bcrypt.compare(password, usercheck.password);

  if(!passCheck) {
    res.status(400).json({ message: 'Invalid email or password, please make sure you have an account here' });
  }

  const token = generateJWT(usercheck.id, res);

  res.status(201).json({ 
    status: 'success',
    message: `Hi ${usercheck.name}, welcome back!`,
    token: token
  });
};

const logout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0)
  });
  res.status(200).json({ message: 'Logged out successfully' });
}

export { register, login, logout };