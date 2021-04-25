const appController = () => {
  const appStatus = (req, res) => {
    return res.status(200).send({
      message: "OK",
      data: {},
    });
  };

  return {
    appStatus,
  };
};

module.exports = appController;
