function stringToTitle(str) {
    const title = str.replace(str.charAt(0),str.charAt(0).toUpperCase());
    return title.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")
}

export default stringToTitle;