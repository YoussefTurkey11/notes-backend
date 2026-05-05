import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes Api",
      version: "1.0.0",
      description: "API documentation for notes project",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
    components: {
      schemas: {
        Note: {
          type: "object",
          required: ["title", "content"],
          properties: {
            title: { type: "string", example: "My Note" },
            content: { type: "string", example: "Some content" },
          },
        },
      },
    },
  },
  apis: [path.resolve("src/routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
