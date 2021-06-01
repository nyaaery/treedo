import * as fs from "fs";
const { promises: async_fs } = fs;
import * as path from "path";

import * as express from "express";
import * as cors from "cors";
import { Snowfall, Snowflake } from "snowfall";
import { Data } from "ncode";
import { bigint_to_base } from "bigintbase";

const ROOT = "../root.json";
const DIR = "../nodes";
const EPOCH = new Date("2021-06-01");
const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const root_path: string = path.resolve(__dirname, ROOT);
const dir_path: string = path.resolve(__dirname, DIR);
const snowfall = new Snowfall(56, Snowfall.TIME, 8, Snowfall.INCREMENT, {
    epoch: EPOCH
});
const app = express();

let root: Root;

/*
    APINode {
        id: string,
        content: string,
        children?: string[]
    }
*/

interface Node {
    content: string,
    children?: string[]
}

interface Root {
    children: string[]
}

function is_children(obj: any): obj is string[] {
    if (!(obj instanceof Array)) return false;
    if (obj.reduce((acc: boolean, cur: any) => typeof cur != "string" || acc, false)) return false;
    return true;
}

function is_node(obj: any): obj is Node {
    if (typeof obj != "object") return false;
    if (typeof obj.content != "string") return false;
    if (obj.children !== undefined && !is_children(obj.children)) return false;
    return true;
}

function is_root(obj: any): obj is Root {
    if (typeof obj != "object") return false;
    if (!(obj.children instanceof Array) || !is_children(obj.children)) return false;
    return true;
}

async function generate_id(): Promise<string> {
    const snowflake: Snowflake<Data> = await snowfall.generate();
    const id: string = bigint_to_base(snowflake.to_number(), BASE62);
    return id;
}

function ensure_dir() {
    const exists: boolean = fs.existsSync(dir_path);
    if (!exists) {
        fs.mkdirSync(dir_path);
    }
}

function ensure_root() {
    const exists: boolean = fs.existsSync(root_path);
    if (exists) {
        const data: string = fs.readFileSync(root_path).toString();
        const json: any = JSON.parse(data);
        if (!is_root(json)) {
            throw new Error();
        }

        root = json;
    } else {
        root = {
            children: []
        };

        const data: string = JSON.stringify(root);
        fs.writeFileSync(root_path, data);
    }
}

async function read_node(id: string): Promise<Node> {
    const node_path: string = path.resolve(dir_path, id + ".json");
    const data: string = (await async_fs.readFile(node_path)).toString();
    const json: any = JSON.parse(data);
    if (!is_node(json)) {
        throw new Error();
    }
    return json;
}

app.use(cors());

app.get("/root", async (req, res) => {
    res.send(root);
});

app.get("/nodes/:ids", async (req, res) => {
    const ids: string[] = req.params.ids.split(",");
    const promises: Promise<Node>[] = [];
    for (const id of ids) {
        promises.push(read_node(id));
    }
    let nodes: Node[];
    try {
        nodes = await Promise.all(promises);
    } catch (err) {
        return res.sendStatus(400);
    }
    res.send(nodes);
});

app.listen(3001, () => {
    console.log("Listening");
});

ensure_root();
ensure_dir();