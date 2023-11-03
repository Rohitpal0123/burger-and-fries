const productSchema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    category: {
      type: "string",
      enum: [
        "653caaea6e80907536926f04",
        "653cb40ff97ae70b8cc6643f", //expose
        "653d09a61c7a2080eadddbde"
      ]
    },
    foodType: {
      type: "string",
      enum: ["veg", "non-veg"]
    },
    price: {
      type: "integer"
    },
    description: {
      type: "string"
    }
  },
  required: ["name", "category", "foodType", "price", "description"]
};

module.exports = productSchema;
