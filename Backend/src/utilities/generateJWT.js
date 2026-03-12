import jwt from 'jsonwebtoken';

const generateJWT = (userId, res) => {
  // const payload = {
  //   id: user.id,
  // };
  const token = jwt.sign({id: userId}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  
  res.cookie('Token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Hanya kirim cookie melalui HTTPS di production
    sameSite: 'strict', // Cegah pengiriman cookie dalam permintaan lintas situs
    maxAge: 24 * 60 * 60 * 1000, // 1 hari
  });

  return token;
};

export { generateJWT };