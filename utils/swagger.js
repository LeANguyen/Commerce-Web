const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "Red Fashion (generic CRUD app) API",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger"
    }
  },
  apis: [
    "./routes/userRoutes",
    "./routes/cartRoutes",
    "./routes/cartItemRoutes",
    "./routes/itemRoutes.js"
  ]
};

const swagger = swaggerJsdoc(options);

module.exports = swagger;
