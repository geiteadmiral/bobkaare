let sidebar = document.querySelector('.sidebar')

window.addEventListener("resize", () => {
    if (window.innerWidth >= 640) {
        closeSidebar();
    }
});

function openSidebar(){
    sidebar.style.width = '300px'
}

function closeSidebar(){
    sidebar.style.width = "0"
}

