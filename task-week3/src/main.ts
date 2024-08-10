import '../assets/scss/all.scss';

// Remove links point to the same page.
let pageName = window.location.pathname.split('/').pop()?.split('.')[0];
pageName = pageName?.length === 0 ? 'index' : pageName;
let samePageLinkClassName = 'link-main-' + pageName;
let samePageLinks = document.getElementsByClassName(samePageLinkClassName);

for (let link of samePageLinks) {
    link.setAttribute('href', '#');
}

// Activate selection for series page.
let firstSelection = document.querySelector('.selection');
let firstBanner = document.querySelector('.banner');
let firstItems = document.querySelector('.items');
firstSelection?.classList.add('active');
firstBanner?.classList.add('active');
firstItems?.classList.add('active');

// Add switch selection for series page.
let selectionOnClick = (ev: MouseEvent) => {
    // Deactivate all selections, banners, and items.
    let selections: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a.selection');
    let banners: NodeListOf<HTMLDivElement> = document.querySelectorAll('div.banner');
    let itemsAll: NodeListOf<HTMLDivElement> = document.querySelectorAll('div.items');
    selections?.forEach(tag => tag.classList.remove('active'));
    banners.forEach(tag => tag.classList.remove('active'));
    itemsAll.forEach(tag => tag.classList.remove('active'));
    // Activate selected selection and banner.
    if (ev.target instanceof HTMLAnchorElement) {
        let selection: HTMLAnchorElement = ev.target;
        let banner = document.getElementById(ev.target.id.replace('selection', 'banner'));
        let items = document.getElementById(ev.target.id.replace('selection', 'items'));
        selection?.classList.add('active');
        banner?.classList.add('active');
        items?.classList.add('active');
    }
}
let selectionLink: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a.selection');
selectionLink.forEach(tag => tag.onclick = selectionOnClick);