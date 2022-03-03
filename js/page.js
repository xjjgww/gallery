
function makegrid(src)
{
    var imgs = figures[src];
    let list = Object.keys(imgs);
    var icol=0;
    for(var i=0; i<list.length; i++)
    {
        var idx = list.length - 1 - i;
        thisitem = imgs[list[idx]];

        // therow
        var therow = document.getElementById(src+'_col'+(icol+1).toString());

        var idiv = document.createElement("div");
        therow.appendChild(idiv);
        idiv.setAttribute('onclick', "openmodal(); currentslide('" + src + "', '" + list[idx] + "') ");        
        
        // img
        var iimg = document.createElement("img");
        iimg.src = thisitem.thumbnail;
        iimg.setAttribute('class', 'bfadein');
        iimg.setAttribute('loading', 'lazy');
        iimg.style.width = '100%';
        iimg.style.height = 'auto';
        iimg.style.aspectRatio = '4/3';
        idiv.appendChild(iimg);

        // txt
        var itt = document.createElement("a");
        itt.innerHTML = thisitem.caption;
        idiv.appendChild(itt);
        
        icol = (icol+1)%4;
    }
}

function openmodal()
{
    document.getElementById("mymodal").style.display = "block";
}

function closemodal()
{
    document.getElementById("mymodal").style.display = "none";
}

function currentslide(src, key)
{
    var imgs = figures[src];
    var slideimg = document.getElementById('slideimg');
    slideimg.src = imgs[key].imglink;
    slideimg.alt = key;
    var caption = document.getElementById('caption');
    caption.innerText = imgs[key].caption;

    // adjustslide();
}

// function adjustslide()
// {
//     var slideimg = document.getElementById('slideimg');
//     if(slideimg.naturalWidth > slideimg.naturalHeight)
//         // if(slideimg.clientWidth > slideimg.clientHeight)
//         slideimg.style = 'width:100%';
//     else
//         slideimg.style = 'height:600px';        
// }

function changeslide(src, interval)
{
    var slideimg = document.getElementById('slideimg');
    var key = slideimg.alt;
    let list = Object.keys(figures[src]);
    let nextidx = (list.indexOf(key) + interval + list.length)%list.length;
    currentslide(src, list[nextidx]);
}
