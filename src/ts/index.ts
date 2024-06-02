import { toggleSidebar } from "./layouts/sidebar.js";

document.addEventListener("DOMContentLoaded", function () {

    const openSidebarBtn: HTMLElement = document.querySelector(".asideOpen")!;
    openSidebarBtn.onclick = () => {
        toggleSidebar();
    };
    const closeSidebarBtn: HTMLElement = document.querySelector(".asideClose")!;
    closeSidebarBtn.onclick = () => {
        toggleSidebar();
    };
    
});
