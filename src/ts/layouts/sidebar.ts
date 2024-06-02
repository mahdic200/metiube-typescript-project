export const toggleSidebar = () => {
    const sidebar: HTMLElement = document.querySelector("#adminpanel_sidebar")!;
    sidebar.classList.toggle("active");
};

