const ProductModel = require('../models/productModel')

module.exports= {
    createProduct: async (req, res) => {
        try {
            const idExists = await ProductModel.findOne({ id: req.body.id });

            if (idExists) {
                return res.status(409).json({ message: 'O código informado já está em uso' });
            } else {
            const result = await ProductModel.create(req.body)
            res.status(201).json({message: `O produto foi criado com sucesso!`})
            }
        } catch (err) {
            res.status(500).json({message: `Não foi possível adicionar o produto.`})
        }
    },
    getProducts: (req, res) => {
        ProductModel.find({}).select(["-__v", "-_id"]).then((result) => {
            res.status(200).json(result)
        }).catch(() => {
            res.status(500).json({message: "Não foi possível listar os produtos"})
        })
    },
    getProductById: async (req, res) => {
        try {
            const result = await ProductModel.findById({id: req.body.id})
            res.status(200).send(result)
        } catch (err) {
            res.status(500).json({message: "Não foi possível listar este produto."})
        }
    },
    deleteProductById: async (req, res) => {
        try {
            const productId = req.params.id;
            const result = await ProductModel.deleteOne({ id: productId });
            
            if (result.deletedCount === 1) {
              return res.status(200).json({ message: 'Produto removido com sucesso!' });
            } else {
              return res.status(404).json({ message: 'Produto não encontrado.' });
            }
          } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Não foi possível remover o produto.' });
          }
    },
    updateProduct: async (req, res) => {
        try {
            const result = await ProductModel.updateOne({id: req.body.id}, req.body)
            res.status(200).send({message: 'Produto  atualizado com sucesso!'})
        } catch (err) {
            res.status(500).json({message: 'Não foi possível atualizar o produto.'})
        }
    },
}