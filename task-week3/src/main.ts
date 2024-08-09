import '../assets/scss/all.scss';

// Remove links point to the same page.
let pageName = window.location.pathname.split('/').pop()?.split('.')[0];
pageName = pageName?.length === 0 ? 'index' : pageName;
let samePageLinkClassName = 'link-main-' + pageName;
let samePageLinks = document.getElementsByClassName(samePageLinkClassName);

for (let link of samePageLinks) {
    link.setAttribute('href', '#');
}