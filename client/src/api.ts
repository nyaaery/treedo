import axios, { AxiosResponse } from "axios";

export interface RootResult {
    children: string[]
}

export interface NodeResult {
    content: string,
    children?: string[]
}

export async function get_root(): Promise<RootResult> {
    const response: AxiosResponse = await axios.get("http://localhost:3001/root");
    return response.data;
}

export async function get_nodes(ids: string[]): Promise<NodeResult[]> {
    const response: AxiosResponse = await axios.get("http://localhost:3001/nodes/" + ids.join(","));
    return response.data;
}