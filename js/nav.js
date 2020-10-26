document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if(this.status != 200) return;

                document.querySelectorAll('.topnav, .sidenav').forEach(
                    function(elm) {
                        elm.innerHTML = xhttp.responseText;
                    });
                
                document.querySelectorAll(".sidenav a, .topnav a").forEach(
                    function(elm) {
                        elm.addEventListener("click", function(event) {
                            var sidenav = document.querySelector(".sidenav");
                            M.Sidenav.getInstance(sidenav).close();

                            page = event.target.getAttribute("href").substr(1);
                            loadPage(page);
                        })
                    }
                )
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    var page = window.location.hash.substr(1);

    if (page == "") page = "home";
    loadPage(page);

    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                var content = document.querySelector('#body-content');
                var footer = document.querySelector('#footer-content');
                const tabFeature = document.querySelector(".tabs");
                M.Tabs.init(tabFeature, {
                    duration: 500,
                    swipeable: true

                });

                footer.innerHTML = `
                <style>
                footer {
                    bottom:0;
                    left:0;
                }
                .page-footer {
                    padding-top: 0;
                    width: 100%;
                }
                </style>     
                <footer class="page-footer  teal darken-3">
                    <div class="footer-copyright teal darken-3">
                    <div class="container">
                    © 2020 Copyright all reserved by Afif Alfiano
                    </div>
                    </div>
                </footer>
                `;
                if (page === "home") {
                    getScheduleCompetitions();
                } else if (page === "timfavorit") {
                    getSavedTeamFavorit();
                } else if (page === "topskor") {
                    getTopScorers()
                } else if (page === "klasmenall") {
                    getClassmenLeague();
                } else if (page === "daftartim") {
                    getListTeam();
                }
                if (this.status = 200) {
                    content.innerHTML = xhttp.responseText
                } else if (this.status == 404) {
                    content.innerHTML = "<p> Halaman tidak ditemukan.</p<"
                } else {
                    content.innerHTML = "<p>Upsss... halaman tidak dapat diakses</p>"
                }
            }
        }
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
})