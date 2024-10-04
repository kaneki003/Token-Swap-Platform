const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

const deployRoutes = require("./Routes/DeploymentRoutes.js");
const poolFactoryRoutes = require("./Routes/PoolFactoryRoutes.js");
const liquidityPoolRoutes = require("./Routes/LiquidityPoolRoutes.js");
const tokenRoutes = require("./Routes/TokenRoutes.js");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/deployRoutes", deployRoutes);
app.use("/api/tokenRoutes", tokenRoutes);
app.use("/api/poolFactoryRoutes", poolFactoryRoutes);
app.use("/api/liquidityPoolRoutes", liquidityPoolRoutes);

app.get("/", function (req, res) {
  res.send("server is up and running");
});

const server = app.listen(PORT, () => {
  console.log(`Server Running on port http://localhost:${PORT}`);
});
