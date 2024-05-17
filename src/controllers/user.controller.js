const soma = (req, res) => {
    const soma = 200 + 100

    res.send({soma: soma});
};

module.exports = {soma};