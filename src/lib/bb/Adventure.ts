/**
 * Page data struct
 * @param d: Date
 * @param c: Command
 * @param b: Content
 * @param n: Next page(s?)
 */
export interface PageData {
    d: number,
    c: string,
    b: string,
    n: [number]
}

/**
 * Comic data struct
 * @param i: ID
 * @param d: Creation date
 * @param u: Owner
 * @param c: Collaborator?
 * @param e: Editors?
 * @param n: Title
 * @param r: Description
 * @param h: No idea what this is
 * @param t: tags
 * @param a: Author name
 * @param w: ???
 * @param o: Logo
 * @param q: ???
 * @param x: Banner image
 * @param b: Probably whether this is qualified for a banner?
 * @param y: CSS
 * @param j: ??? Javascript??
 * @param v: ???
 * @param m: Default next command
 * @param p: Array of pages.
 */
export interface ComicData {
    i: number,
    d: number,
    u: number,
    c: string,
    e: [string],
    n: string,
    r: string,
    h: number,
    t: [string],
    a: string,
    w: string,
    o: string,
    q: string,
    x: string,
    b: number,
    y: string,
    j: string,
    v: string,
    m: string,
    p: [PageData]
}

import json from "../../assets/defaultAdventure.json";
export const default_adventure: ComicData = json as ComicData;