import * as express from "express";
import { Snowfall, Snowflake } from "snowfall";
import { bigint_to_base } from "bigintbase";

const EPOCH = new Date("2021-06-01");
const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const snowfall = new Snowfall(48, Snowfall.TIME, 16, Snowfall.INCREMENT, {
    epoch: EPOCH
});

const app = express();

app.get("/", async (req, res) => {
    res.send(bigint_to_base((await snowfall.generate()).to_number(), BASE62));
});

app.listen(3001, () => {
    console.log("listening");
});