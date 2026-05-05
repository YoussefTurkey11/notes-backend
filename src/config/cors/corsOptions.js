import allowedOirign from "./allowedOrigins.js";

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOirign.indexOf !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credential: true,
  optionSuccessStatus: 200,
};

export default corsOptions;
