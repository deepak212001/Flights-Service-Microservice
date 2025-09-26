// const express = require("express");
// const { PORT } = require("./config");

const express = require("express");
const { ServerConfig, Logger } = require("./config/index.js");
const apiRoutes = require("./routes/index.js");
const app = express();
const db = require("./models/index.js");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db.sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected");
    app.listen(ServerConfig.PORT, () =>
      console.log(`Server started on port ${ServerConfig.PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfullly Started the server on ${ServerConfig.PORT}`);
  // Logger.info(`Successfullly Started the server on ${ServerConfig.PORT}`, {});
  //2025-09-21 15:17:56 : info : Successfullly Started the server on 7000
  // Logger.error aur logger.

  // const { City, Airport } = require('./models')
  // const Bengaluru = await City.findByPk(4)
  // console.log(delhi)
  // const airport = await Airport.create({
  //   name: "Chennai International Airport",
  //   code: 'MAA',
  //   cityId: 5
  // })
  // console.log(airport)
  //and 

  // const Kempegowda = await Bengaluru.createAirport({ name: 'Kempegowda International Airport Bengaluru', code: 'BLR' })
  // console.log(Kempegowda)
  // const Kempegowda = await Bengaluru.createAirport({ name: 'Huballi Airport Bengaluru', code: 'HBL' })
  // console.log(Kempegowda)
  // const aurportInBLR = await Bengaluru.getAirports();
  // console.log(aurportInBLR)
  // await City.destroy({ where: { id: 4 } })
  // const hbairport = await Airport.findByPk(13)
});

app.get("/", (req, res) => {
  res.send(`Successfullly Started the server on PORT : ${ServerConfig.PORT}`);
});
