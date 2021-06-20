let Product = require("../models/Products");


//Products
exports.productsIndex = async function (req, res) {
    let aggregate_options = [];
    let page = req.query.page || 1;
    let limit = req.query.limit || 15;
    let match = {};
    let rate={}
    let pricing={}
    let category={}
    let desc={}
    const options = {
      page,
      limit,
      collation: { locale: "en" },
      customLabels: {
        totalDocs: "totalResults",
        docs: "products",
      },
    };
    
    //Filtering by Client
    if(req.query.hardware){
      let isTrueSet = (req.query.hardware === 'true')
        category = {hardware:isTrueSet};

    }
    if(req.query.rate){
      rate= {rating:{$gte:Number(req.query.rate)}};
    }
    if(req.query.price){
      let [minimum, maximum] = JSON.parse(req.query.price);
      pricing= {$and:[{price:{$gt:minimum}},{price:{$lt:maximum}}]};
    }
    if (req.query.q){
      
      match.title = {$regex: req.query.q, $options: 'i'};
      desc.description = {$regex: req.query.q, $options: 'i'};

    } 
    aggregate_options.push({$match:{$and:[{$or:[match,desc]},pricing,rate,category]}})
    

    //Filtering by Admin Board
  
    // if (req.query.filter)
    //   if (Object.keys(JSON.parse(req.query.filter)).length) {
    //     let filterField = JSON.parse(req.query.filter);
    //     aggregate_options.push({ $match: {$or:[ { match:{title: { $regex: filterField.title, $options: "i" } }}, { match:{description: { $regex: filterField.title, $options: "i" } }} ] }});
    //   }
    //Sorting
    if (req.query.sort) {
      let [sortBy, sortOrder] = JSON.parse(req.query.sort);
      sortOrder = sortOrder === "DESC" ? -1 : 1;
      aggregate_options.push({ $sort: { [sortBy]: sortOrder } });
    }
      //Pagination
      if (req.query.range) {
        let [from, to] = JSON.parse(req.query.range)
        options.limit=to+1-from
        options.page=(to+1)/options.limit
  
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