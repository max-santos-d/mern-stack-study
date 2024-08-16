import loginService from '../services/auth.service.js'

const login = async (req, res) => {

    const { email, password } = req.body

    try {
        const response = await loginService.login(email, password);        
        res.status(200).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Erro ao realizar login' });
    }
};
 
export { login };