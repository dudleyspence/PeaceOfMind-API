function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res
        .status(403)
        .json({ message: "Access forbidden: Incorrect role" });
    }
    next();
  };
}

module.exports = requireRole;
