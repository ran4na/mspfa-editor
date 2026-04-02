import { bb_tree } from "./BBparser.js";
/* 
    named snippets can be used to generate bbcode?
    bbcode tags can be like this
    [tag]content[/tag] => <>content</>
    or [tag]content[/tag] => <x="content"></>
    or [tag=value]content[/tag] argh!!!
    how to differentiate between the two?
    idea: put in special tokens for position

    <img $width$ $height$>$children$</img>

    <a $url$>$children$</a>

    and then parameter handlers:

    width: width="$val$px"
    height: height="$val$px"

    if a parameter isn't provided, there can be a fallback value
    url: href="$val$" | href="$children$"
    size: style="font-size: $val$px" | style="font-size: 2rem;" or whatever
 */
export class ParamHandler {
    name: string;
    output: string;
    fallback: string;

    constructor(name: string, output: string, fallback: string) {
        this.name = name;
        this.output = output;
        this.fallback = fallback;
    }

    // Converts an attribute to the output
    parse(attribute_value: string) {
        if(attribute_value == undefined) {
            // Return fallback
            return this.fallback;
        } else {
            // Return value w/ params filled
            return this.output.replaceAll("$val$", attribute_value);
        }
    }
}

export class TagMapping {
    name: string;
    positions: string;
    param_handlers: ParamHandler[];

    constructor(name: string, positions: string, param_handlers: ParamHandler[]) {
        this.name = name;
        this.positions = positions;
        this.param_handlers = param_handlers;
    }

    get_parameter_string(bbcode_tag: bb_tree) {
        let output_string = this.positions;
        for(const handler of this.param_handlers) {
            // get parameter of name's value
            // will return undefined if the param isn't defined...
            let param_value = bbcode_tag.parameters.find(o => o.name == handler.name)?.value;
            output_string = output_string.replaceAll(`$${handler.name}$`, handler.parse(param_value ?? ""))
        }
        // output string has all values except $children$ replaced
        return output_string;
    }
}

// Thing that parses bbcode to html for u
export class HTML_Parser {
    mappings: Map<string, TagMapping>;

    constructor(mappings = HTML_default_mappings()) {
        this.mappings = mappings;
    }

    parse_tree(bbcode_tree: bb_tree | undefined) {
        if(bbcode_tree === undefined) {
            return "";
        }
        let html_string = "";
        for(const tag of bbcode_tree.children) {

            // tag
            if(tag instanceof bb_tree) {
                if(this.mappings.has(tag.name)) {
                    // get the corresponding mapping
                    const mapping = this.mappings.get(tag.name);
                    if(mapping !== undefined) {
                        // first evaluate the parameters
                        let html = mapping.get_parameter_string(tag);                                
                        // now render all children
                        const children_string = this.parse_tree(tag);
                        // then substitute $children$ for the final string
                        html_string += html.replaceAll("$children$", children_string);
                    }
                } else {
                    // make a generic tag. who carr. put it in a span at least so i can style it later
                    let new_tag = `<span><${tag.name} ${tag.parameters.map((p) => `${p.name}="${p.value}"`).join(" ")}></span>`;
                    html_string += new_tag;
                    html_string += this.parse_tree(tag);
                    html_string += `</${tag.name}>`;
                }
            } 
            // plain text
            else {
                html_string += tag.replaceAll("\n", "<br/>");
                
            }
        }
        return html_string;
    }

}

export function HTML_default_mappings() {
    let mappings = new Map();
    mappings.set("img", new TagMapping(
        "img",
            `<img src="$children$" $width$ $height$></img>`,
            [
                new ParamHandler("width",
                        `width="$val$px"`,
                        ``
                ),
                new ParamHandler("height",
                        `height="$val$px"`,
                        ``
                ),
            ]
    ))

    mappings.set("url", new TagMapping(
        "url",
            `<a $url$>$children$</a>`,
            [
                new ParamHandler("url",
                    `href="$val$"`,
                    `href="$children$"`
                )
            ]
    ))

    mappings.set("i", new TagMapping(
        "i",
            `<i>$children$</i>`,
            []
    ))

    mappings.set("b", new TagMapping(
        "b",
            `<b>$children$</b>`,
            []
    ))


    mappings.set("b", new TagMapping(
        "b",
            `<b>$children$</b>`,
            []
    ))

    mappings.set("u", new TagMapping(
        "u",
            `<u>$children$</u>`,
            []
    ))


    mappings.set("size", new TagMapping(
        "size",
            `<span $size$>$children$</span>`,
            [
                new ParamHandler("size",
                    `style="font-size: $val$px"`,
                    ``
                )
            ]
    ))

    mappings.set("color", new TagMapping(
        "color",
            `<span $color$>$children$</span>`,
            [
                new ParamHandler("color",
                    `style="color: $val$"`,
                    ``
                )
            ]
    ))
    mappings.set("center", new TagMapping(
        "center",
            `<div style="text-align: center">$children$</div>`,
            []
    ))

    mappings.set("left", new TagMapping(
        "left",
            `<div style="text-align: left">$children$</div>`,
            []
    ))

    mappings.set("right", new TagMapping(
        "right",
            `<div style="text-align: right">$children$</div>`,
            []
    ))

    mappings.set("spoiler", new TagMapping(
        "spoiler",
            `<div class="spoiler">
                <button class="spoiler-button" open="$open$" close="$close$">$open$</button>
                <div class="spoiler-content">
                    $children$
                </div>
            </div>`,
            [
                new ParamHandler("open", "$val$", "Show"),
                new ParamHandler("close", "$val$", "Hide"),
            ]
    ))

    mappings.set("ul", new TagMapping(
        "ul",`<ul>$children$</ul>`,[]
    ))

    mappings.set("ol", new TagMapping(
        "ol",`<ol>$children$</ol>`,[]
    ))

    mappings.set("li", new TagMapping(
        "li",`<li>$children$</li>`,[]
    ))

    mappings.set("code", new TagMapping(
        "code",
            `<div class="code" $code$>$children$</pre>`,
            [new ParamHandler("code", `language="$val$"`, "")]
    ))

    mappings.set("pre", new TagMapping(
        "pre",`<pre>$children$</pre>`,[]
    ))

    return mappings;
}