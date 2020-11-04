var dbPromised = idb.open("kabarbola", 1, (upgradeDb) => {
    var teamObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    teamObjectStore.createIndex("shortName", "shortName", {unique: false});
});

function checkData(team) {
    return new Promise((resolve, reject) => {
        dbPromised
        .then((db) => {
            var tx = db.transaction("teams", "readonly");
            var store = tx.objectStore("teams");
            return store.get(team.id);
        })
        .then((data) => {
            console.log(data);
            resolve(data);
        })
        .catch(err => {
            console.log('Error: '+ err);
        })
    })    
}

function saveForLater(team) {
    dbPromised
    .then((db) => {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        console.log(team);
        store.put(team);
        return tx.complete;
    })
    .then(() => {
        M.toast({html: 'Tim Berhasil disimpan!'});
    })
    .catch(err => {
        console.log('Error: '+ err);
    })
}

function deleteItem(team) {
    dbPromised.then((db) => {
        var tx = db.transaction('teams', "readwrite");
        var store = tx.objectStore("teams");
        store.delete(team.id);
        return tx.complete;
    }).then(() => {
        M.toast({html: 'Tim Berhasil dihapus!'});
    })
    .catch(err => {
        console.log('Error: '+ err);
    })
}

function getAll() {
    return new Promise((resolve, reject) => {
        dbPromised
        .then((db) => {
            var tx = db.transaction("teams", "readonly");
            var store = tx.objectStore("teams");
            return store.getAll();
        })
        .then((team) => {
            resolve(team)
        })
        .catch(err => {
            console.log('Error: '+ err);
        })
    })
    
}

function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then((db) => {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          return store.get(id);
        })
        .then((team) => {
          console.log(team);
          resolve(team);
        })
        .catch(err => {
            console.log('Error: '+ err);
        })
    });
  }