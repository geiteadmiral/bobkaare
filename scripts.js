let sidebar = document.querySelector('.sidebar')

function openSidebar(){
    sidebar.style.width = '300px'
}

function closeSidebar(){
    sidebar.style.width = "0"
}

window.addEventListener("resize", () => {
    if (window.innerWidth <= 1024) {
        closeSidebar()
    }   
})