//* Dynamic Routes => /user/:userId
export const userNameController = (req, res) => {
  const userId = req.params.userid;
  res.send(`Welcom User ${userId}`);
};

//* => /search?keyword=something
export const searchController = (req, res) => {
  const keyword = req.query.keyword;
  res.send(`Searching For ${keyword}`);
};
