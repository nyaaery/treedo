import { Writable, writable } from "svelte/store";
import { get_nodes, get_root, NodeResult, RootResult } from "./api";

export interface Node {
    content: string,
    children?: Node[]
}

export class NodeManager {

    nodes: Writable<Node[]> = writable([]);
    // node_map: Map<string, Node> - id -> Node
    // queue: [id: string, parent: string][]

    async get_nodes() {
        const root: RootResult = await get_root();
        const node_results: NodeResult[] = await get_nodes(root.children);
        this.nodes.set(node_results.map(node => ({
            content: node.content
        })));
    }

    /*
        n = 50
        parent_map: Map<string, string> - id -> parent
        request first n queued requests from queue
        map each fetched node with parent_node and add node to parent's children
    */

}