if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/sw.js")
        .then(function() {
          console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function() {
          console.log("Pendaftaran ServiceWorker gagal");
        });
    });
  } else {
    console.log("ServiceWorker belum didukung browser ini.");
  }

document.addEventListener("DOMContentLoaded", () => {
var urlParams = new URLSearchParams(window.location.search);
var isFromSaved = urlParams.get("timfavorit");
var save = document.getElementById("save");
var del = document.getElementById("delete");

if (isFromSaved) {
    // Hide fab jika dimuat dari indexed db
    save.style.display = 'none';
    del.style.display = 'none';
    
} else {
    var item = getTeamById();
}

item.then(function(tim) {
  checkData(tim).then((cek) => {
    console.log(cek);
    if (cek === null || cek === undefined) {
      del.style.display = 'none';
      save.onclick = () => {
            console.log("Tombol FAB di klik.");
              saveForLater(tim);
              setTimeout(
                  () => {
                      location.reload(true);
                  }, 2000
              )
      };
    } else {
      save.style.display = 'none';
      del.onclick = () => {
          console.log('Tombol Delete di klik');
          deleteItem(tim);
          setTimeout(
            () => {
                location.reload(true);
            }, 2000
        )
      }
    }
  })
  
});
});

