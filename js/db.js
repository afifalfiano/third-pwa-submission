var dbPromised = idb.open("kabarbola", 1, function(upgradeDb) {
    var teamObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    teamObjectStore.createIndex("shortName", "shortName", {unique: false});
});

function saveForLater(team) {
    dbPromised
    .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        console.log(team);
        store.add(team);
        return tx.complete;
    })
    .then(function() {
        M.toast({html: 'Tim Berhasil disimpan!'});
    })
}

function getAll() {
    return new Promise((resolve, reject) => {
        dbPromised
        .then(function(db) {
            var tx = db.transaction("teams", "readonly");
            var store = tx.objectStore("teams");
            return store.getAll();
        })
        .then(function(team) {
            resolve(team)
        })
    })
}

function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          return store.get(id);
        })
        .then(function(team) {
          resolve(team);
        });
    });
  }