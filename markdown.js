const log = console.log


/*
    write your 
    input element id,
    output element id

*/
const input = "#input";
const output = "#output";

const parse_md = (text)=>{

    // parse lists
    text = parse_ul(text);
    text = parse_ol(text);

    text = cover_list(text);

    //parse h
    text = parse_h(text);
    
    //parse blockquote\
    text = parse_blockquote(text)

    //parse link
    text = parse_link(text);
    //parse img
    text = parse_img(text);

    return text;
}

const cover_list = (text)=>{
    let ul_cover = /(<li>.+<\/li>\*(?:\n?))+/gm;
    let ol_cover = /(<li>.+<\/li>\.(?:\n?))+/gm;

    text = text.replace(ul_cover, (match, p1)=>{
        let lists = match.split("*");
        let result = '<ul>\n'
        for(let i = 0; i < lists.length; i++){
            result += lists[i];
        }
        result += '</ul>'

        return result;
    });

    text = text.replace(ol_cover, (match, p1)=>{
        let lists = match.split(".");
        let result = '<ol>\n'
        for(let i = 0; i < lists.length; i++){
            result += lists[i];
        }
        result += '</ol>'

        return result;
    });
    
    return text;
}

const parse_ul = (text)=>{
    let ul_dot = /^\*\s(.+)/gm;
    let ul_dash = /^\-\s(.+)/gm;


    text = text.replace(ul_dot, "<li>$1</li>*");
    text = text.replace(ul_dash, "<li>$1</li>*");

    return text;
}
const parse_ol = (text)=>{
    let ol = /^\d\.\s(.+)/gm;

    text = text.replace(ol, "<li>$1</li>.");

    return text;
}

const parse_h = (text)=>{
    let h1 = /^#{1}\s(.+)/gm;
    let h2 = /^#{2}\s(.+)/gm;
    let h3 = /^#{3}\s(.+)/gm;
    let h4 = /^#{4}\s(.+)/gm;
    let h5 = /^#{5}\s(.+)/gm;
    let h6 = /^#{6}\s(.+)/gm;

    text = text.replace(h1, "<h1># $1</h1>");
    text = text.replace(h2, "<h2># $1</h2>");
    text = text.replace(h3, "<h3># $1</h3>");
    text = text.replace(h4, "<h4># $1</h4>");
    text = text.replace(h5, "<h5># $1</h5>");
    text = text.replace(h6, "<h6># $1</h6>");

    return text;
}

const parse_blockquote = (text)=>{
    let block = /^\>\s(.+)/gm;

    text = text.replace(block, "<blockquote>$1</blockquote>")

    return text;
}

const parse_link = (text)=>{
    let link = /\[(.+)\]\((.+)\)/gm

    text = text.replace(link, "<a href='$2'>$1</a>");

    return text;
}
const parse_img = (text)=>{
    let img = /^\!\[(.+)\]\((.+)\)/gm

    text = text.replace(img, "<img src='$2' alt='$1'>");

    return text;
}

window.onload = ()=>{
    $(input)[0].addEventListener("keyup", (e)=>{
        $(output)[0].innerHTML = parse_md($(input)[0].innerText);
    })
}
