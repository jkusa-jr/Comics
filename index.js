let params = new URL(document.location).searchParams;
if (params.get("comic") == null || params.get("comic") == ""){
    comic = "garfield"
} else{
    comic = params.get("comic");
}
async function updateImg() {
   
    //const RSS_URL = "https://www.comicsrss.com/rss/garfield.rss";
    const RSS_URL = `https://www.comicsrss.com/rss/${comic}.rss`;
    //console.log(params.get("comic"))
    try {
        //fetch rss feed
        const feed = await (await fetch(RSS_URL)).text();

        //parse rss feed text into dom tree
        const parser = new DOMParser();
        const rssDoc = parser.parseFromString(feed, "text/xml");

        //find first item description element
        const item = rssDoc.querySelector("item description")

        //get text of first item element
        const html = item.innerText || item.textContent;

        //put item text into div element so we can query for the img element
        const tmpDiv = document.createElement("div");
        tmpDiv.innerHTML = html;

        //query for img element
        const newImg = tmpDiv.querySelector("img");
        newImg.removeAttribute("title")
        //newImg.setAttribute("height", "100%");

        //attach img element to document body
        const oldImg = document.querySelector("img")
        
        oldImg.replaceWith(newImg);

        

        } catch (error) {

    }
}


setInterval(updateImg,(1*1000))
//updateImg();

var w = window.innerWidth;
var h = window.innerHeight;