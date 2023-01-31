
function makegrid(src)
{
    var imgs = figures[src];
    let list = Object.keys(imgs);
    var icol=0;
    var delaylist = [];
    for(var i=0; i<list.length; i++)
    {
        var idx = list.length - 1 - i;
        thisitem = imgs[list[idx]];

        // therow
        var therow = document.getElementById('col'+(icol+1).toString());

        var idiv = document.createElement("div");
        therow.appendChild(idiv);
        idiv.setAttribute('onclick', "openmodal(); currentslide('" + src + "', '" + list[idx] + "') ");        

        // img
        var iimg = document.createElement("img");
        iimg.src = thisitem.thumbnail;
        iimg.setAttribute('class', 'opacity0');
        // iimg.setAttribute('loading', 'lazy');
        iimg.style.width = '100%';
        iimg.style.height = 'auto';
        iimg.style.aspectRatio = '4/3';
        iimg.style.transitionProperty = 'opacity, filter';
        iimg.style.transitionDelay = Math.random()*1.2+"s, 0s";
        iimg.style.transitionDuration = '0.4s, 0.2s';
        idiv.appendChild(iimg);

        // txt
        var itt = document.createElement("a");
        itt.innerHTML = thisitem.caption.replaceAll(' | ', "<br />");
        idiv.appendChild(itt);
        
        icol = (icol+1)%4;
    }

}

function figfadein()
{
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity1');
	        return; 
            }
            // entry.target.classList.remove('opacity1');
        });
    });

    const images = document.querySelectorAll('img');
    images.forEach(image => observer.observe(image));
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
