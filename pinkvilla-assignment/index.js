let express = require("express");
let app = express();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
//const fetch = require("./node_modules/node-fetch");

var count = 1;
var total = []
//while(data){
for(let i=0; i<15;i++){
    var data = fetch("http://www.pinkvilla.com/photo-gallery-feed-page/page/"+count)
    .then((res)=>res.json())
    .then((res)=>{return res});
    count = count+1;
    console.log(count);
    var data1
    const foo = async (data) => {
        data1 = await data;
        //console.log(data1);
        for(let i = 0; i < data1.nodes.length; i++){
            //total.push(data1.nodes[i]);
            var str = data1.nodes[i].node.field_photo_image_section;
            //console.log(str.length);
            var link = str.split("/")
            //console.log(link[5])
            var link1 = link[5].split("?")
            console.log(link1[0])
            var images = "https://www.pinkvilla.com/imageresize/"+link1[0]+"?width=270&t=pvorg&cropTop=true"
            data1.nodes[i].node.field_photo_image_section=images
            //total.push(images)
            total.push(data1.nodes[i]);
        }
        // var str = data1.nodes[0].node.field_photo_image_section;
        // console.log(str.length);
        // var link = str.split("/")
        // //console.log(link[5])
        // var link1 = link[5].split("?")
        // console.log(link1[0])

        //console.log("start",total,"new");
        //console.log(total);
        }

    foo(data)
}
app.set('view engine', 'ejs');

app.get('/',(req, res)=>{
    res.render('home',{total});
})

app.listen(4000);
