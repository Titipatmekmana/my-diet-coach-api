require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// const { sequelize } = require("./models");

const authRoute = require("./routes/auth-route");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 100,
    message: { message: "too many requests,please try again later" },
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());
// sequelize.sync({ alter: true });
app.use("/auth", authRoute);

// app.use('/login',rateLimit({
//     windowMs: 1000 * 60 * 15,
//     max: 100,
//     message: { message: "too many requests,please try again later" },
// }))

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 9000;
app.listen(port, () =>
  console.log(
    chalk.bgYellowBright.italic.bold(`server running on port: ${port}`)
  )
);
