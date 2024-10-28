//sidebar -----------------------------------------------------
let sidebar = document.querySelector('.sidebar')

//lukker sidebaren om skjermen blir 640 piksler eller mindre
window.addEventListener("resize", () => {
    if (window.innerWidth >= 640) {
        closeSidebar();
    }
});

//sidebaren endrer bredde avhengig av om den er åpen eller ikke
function openSidebar(){
    sidebar.style.width = '330px'
}

function closeSidebar(){
    sidebar.style.width = "0"
}

