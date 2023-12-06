const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const downloader = require("image-downloader");

const mongoose = require("mongoose");

const User = require("./models/User.js");
const Product = require("./models/Product.js");
const Cart = require("./models/Cart.js");
const Order = require("./models/Order.js");
const Review = require("./models/Review.js");

require("dotenv").config();

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "jiasdfoha7ds82dsa3a9jia98duaskl"

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cors({
    credentials: true,
    origin:'http://localhost:5173',
    // origin: "'http://localhost:5173'"
}));

//mongoose.connect(process.env.MONGO_URL);

app.listen(4000);


// ------------------------------ User Token --------------------------------------

const getUserDataFromToken = (req) => {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    });
}

// ------------------------------- User API ---------------------------------------
app.post("/api/register", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {name, email, password} = req.body;
    const type = "customer";
    
    try {
        const userData = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
            type,
        });
    
        res.json(userData);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post("/api/login", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {name, password} = req.body;
    const userData = await User.findOne({name});

    if (userData) {
        const passOk = bcrypt.compareSync(password, userData.password);
        if (passOk) {
            jwt.sign({name: userData.name, id: userData._id}, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie("token", token).json(userData);
            });
            
        } else {
            res.status(422).json("pass not ok");
        }
    } else { res.json("not found")}
});

app.get("/api/profile", (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {name, type} = await User.findById(userData.id);
            res.json({name, type});
        });
    } else {
        res.json(null);
    }
});

app.post("/api/logout", (req, res) => {
    res.cookie("token", "").json(true);
});

/* ------------------------------ Product API ------------------------------*/

app.post("/upload-by-links", async (req, res) => {
    const { links } = req.body;

    try {
        let newName = `photo${Date.now()}`;

        links.map(async (link, index) => {
            await downloader.image({
                url: link,
                dest: `${__dirname}/uploads/${newName}${index}.jpg`
            });
        })

        res.json([...Array(links.length)].map((v,i) => `${newName}${i}.jpg`));
    } catch (e) {res.status(422).json(e);}
});


app.post("/api/product/create", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {title, detail, category, gender, store, keywords, price, sizes, colors, stock, photos} = req.body;
        
    try {
        const productData = await Product.create({
            title, detail, category,
            gender, store, keywords, price,
            sizes, colors, stock, photos,
        });
    
        res.json(productData);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.get("/api/search/:id", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {id} = req.params;
    try {
        const productData = await Product.findById(id).select("-__v");
        res.json(productData);
    } catch (e) {
        res.json(null);
    }
});

app.post("/api/search/keyword", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {keyword} = req.body;
    try {
        const productData = await Product.find({
            keywords: {"$regex": keyword, "$options": "i"}
        }).select("-__v");
        
        res.json(productData);
    } catch (e) {
        res.status(422).json(e);
    }
});

// app.post("/search/keyword", async (req, res) => {
//     const {keyword} = req.body;
//     try {
//         const productData = await Product.find({
//             $and: [
//                 {"keywords": {"$regex": keyword, "$options": "i"}}
//             ],
//         }).select("-__v");
        
//         res.json(productData);
//     } catch (e) {
//         res.status(422).json(e);
//     }
// });

// -------------------------- Cart API ------------------------------
app.post("/api/cart", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {id} = await getUserDataFromToken(req);
    const {productId, title, store, photo, gender, price, color, size, amount} = req.body;
    
    const cartData = await Cart.findOne({productId: productId, size: size, color: color, checkout: false});
    try {
        if (cartData == null) {
            const cart = await Cart.create({
                ownerId: id, productId, title, store, photo,
                gender, price, color, size, amount
            });
            res.json("Cart Created!!");

        } else {
            let newAmount = cartData.amount + parseInt(amount);
            cartData.set({
                ownerId: id, productId, title, store, photo,
                gender, price, color, size, amount: newAmount
            });
            cartData.save();
            res.json("Cart Updated!!");
        }
    } catch (e) {res.json("Cart creation failed!!")}
    
});

app.get("/api/cart", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    try {
        const {id} = await getUserDataFromToken(req);
        const cartData = await Cart.find({ownerId: id}).select("-__v");
        
        res.json(cartData);
    } catch (e) {res.json("get cart error!!")}
})

app.get("/api/cart/:id", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {id} = req.params;
    try {
        const cartData = await Cart.findById(id).select("-__v");
        
        res.json(cartData);
    } catch (e) {res.json("get cart error!!")}
})

app.get("/api/cart/order/:orderId", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    try {
        const { orderId } = req.params;
        const cartData = await Cart.find({orderId}).select("-__v");
        
        res.json(cartData);
    } catch (e) {res.json("get cart error!!")}
})

app.get("/api/cartSuccess", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    try {
        const {id} = await getUserDataFromToken(req);
        const cartData = await Cart.find({ownerId: id, checkout: true}).select("-__v");

        res.json(cartData);
    } catch (e) {res.json("get cartSuccess error!!")}
})

app.get("/api/cartWait", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    try {
        const {id} = await getUserDataFromToken(req);
        const cartData = await Cart.find({ownerId: id, checkout: false}).select("-__v");
        
        res.json(cartData);
    } catch (e) {res.json("get cartWait error!!")}
})


app.delete("/api/cart/:id", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {id} = req.params;
    try {
        await Cart.deleteOne({_id: id});
        res.json("deleted cart successful!!");
    } catch (e) {
        res.json("delete cart failed!!");
    }
});

app.put("/api/cart/:id", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {id} = req.params;
    const {amount} = req.body;

    try {
        const cartData = await Cart.findById({_id: id})
        if (cartData != null) {
            cartData.set({
                amount: amount
            });
            cartData.save();
            res.json("Updated cart successful!!");
        } else {
            res.json("Cart not found!!");
        }
    } catch (e) {
        res.json("Update cart failed!!");
    }
});

app.put("/api/cart/checkout/:id", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {id} = req.params;
    const {orderId} = req.body;

    try {
        const cartData = await Cart.findById({_id: id})
        if (cartData != null) {
            cartData.set({
                orderId: orderId,
                checkout: true,
            });
            cartData.save();
            res.json("Updated cart successful!!");
        } else {
            res.json("Cart not found!!");
        }
    } catch (e) {
        res.json("Update cart failed!!");
    }
});

app.put("/api/cart/review/:id", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {id} = req.params;

    try {
        const cartData = await Cart.findById({_id: id})
        if (cartData != null) {
            cartData.set({
                review: true,
            });
            cartData.save();
            res.json("Updated review cart successful!!");
        } else {
            res.json("Cart not found!!");
        }
    } catch (e) {
        res.json("Update review cart failed!!");
    }
});

// ----------------------- Order API --------------------------
app.post("/api/order", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { firstname, lastname, phone,
            address1, address2,
            province, postcode,
            shipmethod, paymethod,
            country, total, amount, date } = req.body;
    const {id} = await getUserDataFromToken(req);

    try {
        const order = await Order.create({
            ownerId: id, firstname, lastname, phone,
            address1, address2,
            province, postcode,
            shipmethod, paymethod,
            country, total, amount, date,
        });

        res.json(order);

    } catch (e) {res.json("Order creation failed!!")}
});

app.get("/api/order", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    try {
        const {id} = await getUserDataFromToken(req);
        const orderData = await Order.find({ownerId: id}).select("-__v");
        
        if (orderData == null) {
            res.json("Order not found");
        } else {
            res.json(orderData);
        }
    } catch (e) {res.json("Get orders error!!")}
});

// ----------------------- Review API --------------------------
app.post("/api/review", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { cartId, productId,
            owner, rate, textReview, date } = req.body;

    try {
        const { id } = await getUserDataFromToken(req);
        const review = await Review.create({
            ownerId: id, cartId, productId,
            owner, rate, textReview, date });

        res.json(review);

    } catch (e) {res.json("Review creation failed!!")}
});

app.get("/api/review/product/:productId", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { productId } = req.params;

    try {
        const reviews = await Review.find({productId});

        res.json(reviews);
    } catch (e) {res.json("get Review Data failed!!")}
});

app.get("/api/review/user", async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    try {
        const { id } = await getUserDataFromToken(req);
        const reviews = await Review.find({ownerId: id});

        res.json(reviews);
    } catch (e) {res.json("get Review Data failed!!")}
});