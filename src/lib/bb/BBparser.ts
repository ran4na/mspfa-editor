export class bb_param {
    name: string;
    value: string;

    constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }
}

export class bb_tree {
    tagtext: string
    children: (bb_tree | string)[];
    parameters: bb_param[];
    name: string;

    constructor(tag_text: string) {
        this.tagtext = tag_text;
        this.children = [];
        this.parameters = this.get_params(tag_text);
        this.name = this.get_name(tag_text);
    }

    get_params(tag_text: string) {
        const params = tag_text.matchAll(/(\w+)=(?:"([^"]*)"|([^"'\]\[\s]+))/gm);
        const param_result = [];
        for(const param of params) {
            let name = param[1];
            let value = param[2] ?? param[3];
            param_result.push(new bb_param(name, value));
        }

        return param_result;
    }

    get_name(tag_text: string) {
        let name_match = [...tag_text.matchAll(/\[\/?\b(\w+)\b[^=\]]*/gm)];
        let n = tag_text;
        if(name_match.length > 0) {
            n = name_match[0][1];
        }
        return n;
    }
}

export function parse_tokens(tokens: string[], root_tag: string = "root", index: number = 0) {
    // tree to build
    const tree = new bb_tree(root_tag);

    // first, try getting information about the tag
    // unless its the root lol

    while(index < tokens.length) {
        const token = tokens[index];
        
        // if the token is a tag
        if(token.startsWith("[") && !token.startsWith("[/")) {
            // starting tag
            const t = new bb_tree(token);
            const closing = `[/${t.name}]`;
            const has_closing_token = tokens.slice(index + 1).some(t => t === closing);
            if(has_closing_token) {
                const result = parse_tokens(tokens, token, index + 1);
                tree.children.push(result.tree);
                index = result.index;
            } else {
                tree.children.push(token);
                index++;
            }
        }
        else if(token.startsWith("[/")) {
            return { tree, index: index + 1 };
        }
        else {
            // text
            tree.children.push(token);
            index++;
        }
    }
    return { tree, index };
}

export function build_bbcode_tree(text: string) {
    const tokens = text.match(/(\[[\/]?[^\[\]]+\]|\n|[^\[\]\n]+)/gm)
    console.log(tokens);
    if(tokens) {
        const tree = parse_tokens(tokens, "root", 0).tree;
        console.log(JSON.stringify(tree))
        return tree;
    }
    return undefined;
    
}