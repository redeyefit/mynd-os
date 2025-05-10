module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  res.status(200).json({
    success: true,
    message: '🔥 deployAll route is active',
  });
};
