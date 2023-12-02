const UserModel = require('../models/userModel')
const jwtService = require('jsonwebtoken')

module.exports= {
    createUser: async (req, res) => {
        try {
            const userExists = await UserModel.findOne({ email: req.body.email });

            if (userExists) {
                return res.status(409).json({ message: 'Este email já está em uso.' });
            } else {
                const result = await UserModel.create(req.body)
                res.status(201).json({message: `Usuário cadastrado com sucesso!`})
            }
        } catch (err) {
            res.status(500).json({message: `Não foi possível cadastrar o usuário.`})
        }
    },
    getUsers: (req, res) => {
        UserModel.find({}).select(["-__v", "-_id"]).then((result) => {
            res.status(200).json(result)
        }).catch(() => {
            res.status(500).json({message: "Não foi possível encontrar os usuários."})
        })
    },
    getUserById: async (req, res) => {
        try {
            const result = await UserModel.findById({id: req.body.id})
            res.status(200).send(result)
        } catch (err) {
            res.status(500).json({message: "Não foi possível encontrar o usuário."})
        }
    },
    deleteUserById: async (req, res) => {
        try {
            const result = await UserModel.deleteOne({id: req.params.id})
            res.status(200).send({message: "Usuário removido!"})
        } catch (err) {
            res.status(500).json({message: "Não foi possível remover."})
        }
    },
    updateUser: async (req, res) => {
        try {
            const result = await UserModel.updateOne({id: req.body.id}, req.body)
            res.status(200).send({message: 'Dados atualizados com sucesso!'})
        } catch (err) {
            res.status(500).json({message: 'Não foi possível atualizar os dados.'})
        }
    },
    loginUser: async (req, res) => {
            const result = await UserModel.findOne({ email: req.body.email, password: req.body.password })
    
            if (!result) {
                res.status(401).json({ message: "Dados incorretos ou usuário não cadastrado." })
            } else {
                const secret = process.env.SECRET
                jwtService.sign(req.body, secret, {expiresIn: 86400} ,(err, token) => {
                    if (err) {
                        res.status(401).json({ message: "Usuário não autorizado." })
                    } else {
                        res.status(200).json({message: "Usuário logado!", "Access-Token": token})
                        console.log(token)
                    }
                })
            }
    }
}