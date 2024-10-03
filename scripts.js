let sidebar = document.querySelector('.sidebar')

function openSidebar(){
    sidebar.style.width = '350px'
}

function closeSidebar(){
    sidebar.style.width = "0"
}

window.addEventListener("resize", () => {
    if (window.innerWidth >= 640) {
        closeSidebar();
    }
});
