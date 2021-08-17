let Product = require("../../models/Products");


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
  