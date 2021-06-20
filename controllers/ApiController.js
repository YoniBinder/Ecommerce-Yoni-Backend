let Product = require("../models/Products");
let Blog = require("../models/Blogs");
let Post = require("../models/Posts");
let Comment = require("../models/Comments");
let Order = require("../models/Orders");
let User = require("../models/Users");
let bcrypt = require("bcrypt");
const saltRounds = 10;

//Products
exports.productsIndex = async function (req, res) {
  let aggregate_options = [];
  let page = 1;
  let limit = 15;
  let match = {};

  // Pagination
  //  if (req.query.range) {
  //     let [start, end] = JSON.parse(req.query.range)

  // }
  const options = {
    page,
    limit,
    collation: { locale: "en" },
    customLabels: {
      totalDocs: "totalResults",
      docs: "products",
    },
  };

  //Filtering

  if (req.query.filter)
    if (Object.keys(JSON.parse(req.query.filter)).length) {
      let filterField = JSON.parse(req.query.filter);
      match.title = { $regex: filterField.title, $options: "i" };
      aggregate_options.push({ $match: match });
    }

  //Sorting
  if (req.query.sort) {
    let [sortBy, sortOrder] = JSON.parse(req.query.sort);
    sortOrder = sortOrder === "DESC" ? -1 : 1;
    aggregate_options.push({ $sort: { [sortBy]: sortOrder } });
  }

  const myAggregate = Product.aggregate(aggregate_options);
  const result = await Product.aggregatePaginate(myAggregate, options);
  res.setHeader("Content-Range", `${result.products.length}`);
  res.send(result.products);
};

exports.findOneProduct = function (req, res) {
  Product.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    return res.json(result);
  });
};

exports.addProduct = function (req, res) {
  const product = {
    id: "",
    title: req.body.title,
    description: req.body.description,
    hardware: req.body.hardware,
    image: req.body.image,
    onsale: req.body.onsale,
    price: req.body.price,
    rating: req.body.rating,
  };
  Product.create(product, function (err, result) {
    if (err) {
      console.log(err);
      return res.send(err);
    } else {
      result.id = String(result._id);
      Product.findByIdAndUpdate(
        { _id: result.id },
        result,
        function (err, result) {
          if (err) {
            console.log(err);
            return res.send(err);
          } else {
            return res.json(result);
          }
        }
      );
    }
  });
};

exports.updateProduct = function (req, res) {
  const product = {
    title: req.body.title,
    description: req.body.description,
    hardware: req.body.hardware,
    image: req.body.image,
    onsale: req.body.onsale,
    price: req.body.price,
    rating: req.body.rating,
  };

  Product.findByIdAndUpdate(
    { _id: req.params.id },
    product,
    function (err, result) {
      if (err) {
        return res.send(err);
      } else {
        return res.send(result);
      }
    }
  );
};

exports.deleteProduct = function (req, res) {
  console.log(req.params.id);
  Product.findByIdAndDelete({ _id: req.params.id }, function (err, result) {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ message: "Document Deleted" });
    }
  });
};
//Blogs
exports.blogsIndex = function (req, res) {
  Blog.find({}, function (err, result) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.setHeader("Content-Range", `${result.length}`);
    res.json(result);
  });
};
exports.findOneBlog = function (req, res) {
  Blog.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    return res.json(result);
  });
};

//Users
exports.usersIndex = function (req, res) {
  User.find({}, function (err, result) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.setHeader("Content-Range", `${result.length}`);
    res.json(result);
  });
};
exports.findOneUser = function (req, res) {
  User.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    return res.json(result);
  });
};

exports.addToken = function (req, res) {
    const user = {
        email: req.body.email
    }
    //   const { password, ...userdata } = user;
  
      const token = User.generateAccessToken(user);
  
      return res.json({ token });
    
  };

exports.addUser = function (req, res) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (err) console.log(err);

    const user = {
        id: "",
        email: req.body.email,
        username: req.body.username,
        password: hash,
        role: "User",
        activity: "Active",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        country: "",
        profileImage: "",   
    };

    User.create(user, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        result.id = String(result._id);
        User.findByIdAndUpdate(
          { _id: result.id },
          result,
          function (err, result) {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
            }
          }
        );
      }
    });
    const { password, ...userdata } = user;

    const token = User.generateAccessToken(userdata);

    return res.json({ token });
  });
};
exports.deleteUser = function (req, res) {
  console.log(req.params.id);
  User.findByIdAndDelete({ _id: req.params.id }, function (err, result) {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ message: "Document Deleted" });
    }
  });
};

exports.updateUser = function (req, res) {
  const user = {
    id: "",
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: "User",
    activity: "Active",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "",
    profileImage: "",
  };

  User.findByIdAndUpdate({ _id: req.params.id }, user, function (err, result) {
    if (err) {
      return res.send(err);
    } else {
      return res.send(result);
    }
  });
};





//Posts
exports.postsIndex = function (req, res) {
  Post.find({}, function (err, result) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.setHeader("Content-Range", `${result.length}`);
    res.json(result);
  });
};
exports.findOnePost = function (req, res) {
  Post.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    return res.json(result);
  });
};

//Orders
exports.ordersIndex = function (req, res) {
  Order.find({}, function (err, result) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.setHeader("Content-Range", `${result.length}`);
    res.json(result);
  });
};
exports.findOneOrder = function (req, res) {
  Order.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    return res.json(result);
  });
};

exports.addOrder = function (req, res) {
    const order = {
        id:"",
        userId:req.body.userId,
        city: req.body.city,
        street:req.body.street,
        house_number:req.body.house_number,
        reference:Math.floor(Math.random() * 10000 + 1),
        status:"Order Recieved",
        total:req.body.total
    };
    Order.create(order, function (err, result) {
      if (err) {
        console.log(err);
        return res.send(err);
      } else {
        result.id = String(result._id);
        Order.findByIdAndUpdate(
          { _id: result.id },
          result,
          function (err, result) {
            if (err) {
              console.log(err);
              return res.send(err);
            } else {
              return res.json(result);
            }
          }
        );
      }
    });
  };

  exports.updateOrder = function (req, res) {
    const order = {
      status: req.body.status,
    };
  
    Order.findByIdAndUpdate(
      { _id: req.params.id },
      order,
      function (err, result) {
        if (err) {
          return res.send(err);
        } else {
          return res.send(result);
        }
      }
    );
  };
  exports.deleteOrder = function (req, res) {
    Order.findByIdAndDelete({ _id: req.params.id }, function (err, result) {
      if (err) {
        return res.send(err);
      } else {
        return res.json({ message: "Document Deleted" });
      }
    });
  };


//Comments
exports.commentsIndex = function (req, res) {
  Comment.find({}, function (err, result) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.setHeader("Content-Range", `${result.length}`);
    res.json(result);
  });
};
exports.findOneComment = function (req, res) {
  Comment.findOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    return res.json(result);
  });
};
