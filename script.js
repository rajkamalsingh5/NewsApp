const ham=document.querySelector(".hamburger");
const navbar =document.querySelector(".navbar");
const link =document.querySelector(".links");
const searchB =document.querySelector(".search");
const item =document.querySelectorAll(".hover-link");
ham.addEventListener("click",()=>{
    ham.classList.toggle("show");
    link.classList.toggle("show");
    searchB.classList.toggle("show");
    navbar.classList.toggle("show");
});

item.forEach((e)=>{
    e.addEventListener("click",()=>{
        ham.classList.remove("show");
        searchB.classList.remove("show");
        link.classList.remove("show");
        navbar.classList.remove("show");
    })
});





const API_Key="67e3bdbb109e47faa3c3c51b622051d8";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=>fetchNews("India"));
function reload(){
    window.location.reload();
}
async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_Key}`);
    const data=await res.json();
    // console.log(data);
    bindData(data.articles);
}
function bindData(articles){
    const cardsContainer=document.getElementById("cards-container")
    const  templateNews=document.getElementById("templateNews");
    cardsContainer.innerHTML='';

    articles.forEach((article)=> {
        if(!article.urlToImage)return;
        const cardClone=templateNews.content.cloneNode(true);
        fillData(cardClone,article);
        cardsContainer.appendChild(cardClone); 
    });

}
function fillData(cardClone,article){
    const newsImg=cardClone.querySelector('#news-img');
    const newstitle=cardClone.querySelector('#news-title');
    const newssrc=cardClone.querySelector('#news-src');
    const newsdes=cardClone.querySelector('#news-des');
    newsImg.src=article.urlToImage;
    newstitle.innerHTML=article.title;
    newsdes.innerHTML=article.description;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newssrc.innerHTML=`${article.source.name} .${date}`;
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });
}
let curSelected=null;
function ItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelected?.classList.remove("active");
    curSelected=navItem;
    curSelected.classList.add("active");
}
const Searchb=document.getElementById("searchbtn");
const Searchtext=document.getElementById("searchText");

Searchb.addEventListener("click",()=>{
    const query =Searchtext.value;
    if(!query)return;
    fetchNews(query);
    curSelected?.classList.remove("active");
    curSelected=null;
});

