const getAvatarByCoins = (coins) => {
  if (coins >= 0 && coins <= 200) return "avatar1.jpeg";
  if (coins >= 201 && coins <= 400) return "avatar2.jpeg";
  if (coins >= 401 && coins <= 600) return "avatar3.jpeg";
  if (coins >= 601 && coins <= 800) return "avatar4.jpeg";
  return "avatar5.jpeg";
};

module.exports = { getAvatarByCoins };
