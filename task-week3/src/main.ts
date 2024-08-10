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
let selectionOnClickEvent = (ev: MouseEvent) => {
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
selectionLink.forEach(tag => tag.addEventListener("click", selectionOnClickEvent));

// Add locations selection filter
let locationFilterEvent = (ev: Event) => {
    let select = ev.target;
    if (select instanceof HTMLSelectElement) {
        let locations: NodeListOf<HTMLLIElement> = document.querySelectorAll('li.location');
        if (select.value.length != 0) {
            let locationFilter = 'location-' + select.value;
            let locationsFiltered: NodeListOf<HTMLLIElement> = document.querySelectorAll('li.' + locationFilter);
            locations.forEach(tag => tag.classList.remove('selected'));
            locationsFiltered.forEach(tag => tag.classList.add('selected'));
        } else {
            locations.forEach(tag => tag.classList.add('selected'));
        }
    }
}
let selectLocation = document.getElementById('select-location')
if (selectLocation instanceof HTMLSelectElement) {
    selectLocation.addEventListener("change", locationFilterEvent);
}
