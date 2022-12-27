import cors from "cors";
import express from "express";
import morgan from "morgan";

const port = 4000;

const app = express();

app.set("port", port);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// TODO: Your end-points here

app.listen(port, () => console.log(`Listening on port ${port}.`));
