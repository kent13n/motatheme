(()=>{"use strict";class t{constructor(){this.duration=300,this.active=!1,this.overlay=document.querySelector(".overlay"),this.timeout=null,this.open=this.open.bind(this),this.close=this.close.bind(this)}toggle(){this.active?this.close():this.open()}open(){this.overlay||this.init(),this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout((()=>{this.active=!0,this.overlay.style.setProperty("display","block"),this.overlay.animate({opacity:1},{duration:this.duration,fill:"forwards"})}),50)}close(){this.overlay||this.init(),this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout((()=>{this.active=!1,this.overlay.animate({opacity:0},{duration:this.duration+100,fill:"forwards"}).onfinish=()=>{this.overlay.style.setProperty("display","none")}}),50)}init(){this.overlay=document.querySelector(".overlay")}static bind(){return new t}}const e=t.bind();class i{constructor(){this.toggle=this.toggle.bind(this),this.header=document.querySelector("header"),document.addEventListener("click",this.toggle)}toggle(t){t.target.closest(".hamburger")&&!document.body.classList.contains("menu-initialized")&&document.body.classList.add("menu-initialized"),t.target.closest(".hamburger")&&(this.header.classList.contains("opened")?(this.header.classList.remove("opened"),e.close()):(this.header.classList.add("opened"),e.open())),t.target.closest("nav")&&"a"===t.target.tagName.toLowerCase()&&this.header.classList.contains("opened")&&(this.header.classList.remove("opened"),e.close())}static bind(){return new i}}class s{constructor(){this.duration=200,this.modal=document.querySelector(".contact-modal > .modal__content"),this.contactForm=this.modal.querySelector("form"),this.refPhotoField=this.contactForm.querySelector('input[name="ref-photo"]'),this.openElements=document.querySelectorAll('[href="#contact"]'),this.close=this.close.bind(this),this.click=this.click.bind(this),this.toggle=this.toggle.bind(this),document.addEventListener("click",this.click),document.addEventListener("wpcf7mailsent",this.close)}click(t){let e=!1;this.openElements.forEach((i=>{if(i.contains(t.target)){t.preventDefault();const s=i.getAttribute("data-ref");s&&this.refPhotoField&&(this.refPhotoField.value=s),this.toggle(),e=!0}})),e||!this.active||this.modal.contains(t.target)||(t.preventDefault(),this.close())}clear(){this.active=!1,this.contactForm.reset()}close(){this.clear(),this.modal.parentElement.animate({opacity:0},{duration:this.duration,fill:"forwards"}).onfinish=()=>{this.modal.parentElement.style.setProperty("display","none")},e.close()}open(){this.active=!0,this.modal.parentElement.style.setProperty("display","block"),this.modal.parentElement.animate({opacity:1},{duration:this.duration,fill:"forwards"}),e.open()}toggle(){this.active?this.close():this.open()}static bind(){return new s}}class o{constructor(){this.activeEl=null,this.toggle=this.toggle.bind(this),this.enter=this.enter.bind(this),this.leave=this.leave.bind(this),this.wrapper=document.querySelector(".previous-next > .wrapper"),this.prevLink=document.querySelector(".links > .prev-link"),this.nextLink=document.querySelector(".links > .next-link"),this.prevImg=document.querySelector(".thumbnails > .prev-thumbnail > img"),this.nextImg=document.querySelector(".thumbnails > .next-thumbnail > img"),this.nextLink&&this.nextLink.addEventListener("mouseenter",this.enter),this.prevLink&&this.prevLink.addEventListener("mouseenter",this.enter),this.wrapper&&this.wrapper.addEventListener("mouseleave",this.leave)}enter(t){this.prevLink&&this.prevLink.contains(t.target)&&this.toggle(this.prevImg),this.nextLink&&this.nextLink.contains(t.target)&&this.toggle(this.nextImg)}leave(t){this.toggle(this.activeEl,!0)}toggle(t,e=!1){e?this.activeEl&&(this.activeEl.animate({opacity:0},{duration:300,fill:"forwards"}).onfinish=()=>{this.activeEl&&(this.activeEl.style.setProperty("display","none"),this.activeEl=null)}):(this.activeEl&&(this.activeEl.style.setProperty("opacity",0),this.activeEl.style.setProperty("display","none")),t.style.setProperty("opacity",0),t.style.setProperty("display","block"),t.animate({opacity:1},{duration:300,fill:"forwards"}),this.activeEl=t)}static bind(){return new o}}class n{constructor(){this.index=null,this.duration=300,this.timeout=null,this.show=this.show.bind(this),this.getData=this.getData.bind(this),this.open=this.open.bind(this),this.close=this.close.bind(this),this.click=this.click.bind(this),this.previous=this.previous.bind(this),this.next=this.next.bind(this),this.refresh=this.refresh.bind(this),this.lightbox=document.querySelector(".lightbox"),this.closeEl=this.lightbox.querySelector("img.close"),this.previousEl=this.lightbox.querySelector(".previous-image"),this.nextEl=this.lightbox.querySelector(".next-image"),this.elements=document.querySelectorAll(".icon-fullscreen"),document.addEventListener("click",this.click),this.preload(),this.mutationObserver=new MutationObserver(this.refresh),this.mutationObserver.observe(document.documentElement,{attributes:!1,characterData:!1,childList:!0,subtree:!0,attributeOldValue:!1,characterDataOldValue:!1})}refresh(t){this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout((()=>this.elements=document.querySelectorAll(".icon-fullscreen")),300)}preload(){this.elements.forEach((t=>(new Image).src=this.getTarget(t).querySelector("img[data-lightbox-image]").getAttribute("data-lightbox-image")))}previous(){let t=this.index-1;t<0&&(t=0),t!==this.index&&this.show(t)}next(){let t=this.index+1;t>=this.elements.length&&(t=this.elements.length-1),t!==this.index&&this.show(t)}click(t){return this.closeEl.contains(t.target)?(t.preventDefault(),void this.close()):this.previousEl.contains(t.target)?(t.preventDefault(),void this.previous()):this.nextEl.contains(t.target)?(t.preventDefault(),void this.next()):void this.elements.forEach(((e,i)=>{e.contains(t.target)&&(t.preventDefault(),this.index=i,this.open())}))}show(t=!1){!1!==t&&(this.index=t);const e=this.getData();this.lightbox.querySelector(".lightbox-image > img")?this.lightbox.querySelector(".lightbox-image > img").src=e.image:this.lightbox.querySelector(".lightbox-image").innerHTML=`<img src="${e.image}" alt="lightbox image">`,this.lightbox.querySelector(".ref-photo").innerText=e.ref,this.lightbox.querySelector(".category-photo").innerText=e.category}open(){e.open(),this.getData(),this.show(),this.lightbox.style.setProperty("display","flex"),this.lightbox.animate({opacity:1},{duration:this.duration,fill:"forwards"})}close(){e.close(),this.lightbox.animate({opacity:0},{duration:this.duration,fill:"forwards"}).onfinish=()=>{this.lightbox.style.setProperty("display","none")}}getData(){let t=null;if(null!==this.index&&this.elements[this.index]){const e=this.elements[this.index];let i=this.getTarget(e);i&&(t={},t.ref=i.querySelector(".ref-photo").innerText||"",t.category=i.querySelector(".categories-photo").innerText||"",t.image=i.querySelector("img[data-lightbox-image]").getAttribute("data-lightbox-image")||"")}return t}getTarget(t){let e=t.closest(".post-photo");return e||(e=t.closest(".thumbnail"),e&&(e=e.closest("article.photo"))),e}static bind(){return new n}}class r{async getPhotos(t=new FormData){return(await fetch("/wp-json/mota/v1/photos",{method:"POST",body:t})).json()}static bind(){return new r}}const l=r.bind();class a{constructor(){console.log("load more"),this.loadMoreBtn=null,this.init=this.init.bind(this),this.click=this.click.bind(this),window.addEventListener("DOMContentLoaded",this.init)}init(){this.loadMoreBtn=document.querySelector(".load-more > a"),this.loadMoreBtn&&document.addEventListener("click",this.click)}async click(t){if(this.loadMoreBtn.contains(t.target)){const t=this.getCurrentPage()+1,e=c.getFilters();e.append("page",t);const i=await l.getPhotos(e);i&&(document.querySelector(".photos-wrapper").insertAdjacentHTML("beforeend",i.content),i.total_pages>t?this.show():this.hide())}}getCurrentPage(){const t=document.querySelector(".photos-wrapper");if(!t)return 0;const e=parseInt(t.getAttribute("data-posts-per-page"))||0,i=document.querySelectorAll(".photos-wrapper .post-photo").length;return Math.ceil(i/e)}show(){this.loadMoreBtn&&this.loadMoreBtn.parentElement.style.setProperty("display","flex")}hide(){this.loadMoreBtn&&this.loadMoreBtn.parentElement.style.setProperty("display","none")}static bind(){return new a}}const h=a.bind();class c{constructor(){this.timeout=null,this.init=this.init.bind(this),this.open=this.open.bind(this),this.close=this.close.bind(this),this.toggle=this.toggle.bind(this),this.select=this.select.bind(this),this.unselect=this.unselect.bind(this),this.reset=this.reset.bind(this),this.selects=document.querySelectorAll("[data-select]"),this.init()}init(){this.selects.forEach((t=>{const e=t.querySelector(".dropdown-toggle > [data-placeholder]");e.innerText=e.getAttribute("data-placeholder")})),document.addEventListener("click",this.toggle)}toggle(t){this.selects.forEach((e=>{e.querySelector(".dropdown-toggle").contains(t.target)&&!e.classList.contains("active")?this.open(e):e.querySelector(".dropdown").contains(t.target)&&t.target.closest("[data-filter]")?(t.preventDefault(),this.select(t.target.closest("[data-filter]"))):e.querySelector(".dropdown").contains(t.target)&&t.target.closest("[data-reset]")?(t.preventDefault(),this.reset(e)):this.close(e)}))}open(t){t.classList.add("active")}close(t){t&&t.classList.contains("active")&&t.classList.remove("active")}async select(t){this.unselect(t),t.classList.add("active"),t.closest("[data-select]").querySelector("[data-placeholder]").innerText=t.innerText,this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout((()=>{this.close(t.closest("[data-select]"))}),300),await this.filterPhotos()}unselect(t){let e=t.closest("ul.dropdown");e||(e=t.querySelector("ul.dropdown")),e&&e.querySelectorAll("a.active").forEach((t=>t.classList.remove("active")))}async reset(t){const e=t.querySelector("[data-placeholder]");e.innerText=e.getAttribute("data-placeholder"),this.unselect(t),this.close(t),await this.filterPhotos()}async filterPhotos(){const t=await l.getPhotos(c.getFilters());t&&(document.querySelector(".photos-wrapper").innerHTML=t.content,t.total_pages&&t.total_pages>1?h.show():h.hide())}static getFilters(){const t=new FormData;return document.querySelectorAll("[data-select]").forEach((e=>{const i=e.querySelector("ul.dropdown a.active");if(i){const s=i.getAttribute("data-filter"),o=e.getAttribute("data-select");t.append(o,s)}})),t}static bind(){return new c}}window.addEventListener("DOMContentLoaded",(function(){i.bind(),s.bind(),o.bind(),n.bind(),c.bind()}))})();
//# sourceMappingURL=scripts.js.map