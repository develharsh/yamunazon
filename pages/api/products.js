import connectDB from '../../utils/connectDB'
import Product from '../../models/ProductModel'

connectDB()

const PropertyApi = async (req, res) => {
    switch (req.method) {
        case 'GET':
            await getAllProps(req, res);
            break;
        case 'POST':
            await saveProperty(req, res)
            break;
    }
}

const getAllProps = async (req, res) => {
    const properties = await Product.find()
    res.status(200).json(properties)
}

const saveProperty = async (req, res) => {
    const { authorization } = req.headers
    if (!authorization) return res.status(422).json({ error: "Login First" })
    if (authorization !== 'yagya') return res.status(422).json({ error: "You are not permitted" })
    try {
        const { title, price, desc, media } = req.body
        const product = await new Product({
            title, price, desc, mediaUrl: media
        }).save()
        res.status(201).json({ success: 'Success' })
    }
    catch (error) {
        return res.status(422).json({ error: 'Something went wrong in Creating' })
    }
}

export default PropertyApi