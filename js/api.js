
var base_url = "https://api.football-data.org/v2/";
var inggris = document.getElementById("inggris");
var perancis = document.getElementById("perancis");
var jerman = document.getElementById("jerman");
var belanda = document.getElementById("belanda");
var spanyol = document.getElementById("spanyol");
var champion = document.getElementById("champion");
// https://api.football-data.org/v2/competitions/2021/matches?status=SCHEDULED = Premier League
// https://api.football-data.org/v2/competitions/2001/matches?status=SCHEDULED = Champion League
// https://api.football-data.org/v2/competitions/2002/matches?status=SCHEDULED = Liha Jerman
// https://api.football-data.org/v2/competitions/2003/matches?status=SCHEDULED = Liha Belanda
// https://api.football-data.org/v2/competitions/2014/matches?status=SCHEDULED = Liha Spanyol
// https://api.football-data.org/v2/competitions/2015/matches?status=SCHEDULED = Liha Perancis
// var checkTabActive = "";
  
// if (window.location.href === "#ligainggris") {
//     checkTabActive = base_url + "competitions/2021/matches?status=SCHEDULED";
// } else if (window.location.href === "#ligaperancis") {
//     checkTabActive = base_url + "competitions/2015/matches?status=SCHEDULED";
// } else if (window.location.href === "#ligajerman") {
//     checkTabActive = base_url + "competitions/2002/matches?status=SCHEDULED";
// } else if (window.location.href === "#ligabelanda") {
//     checkTabActive = base_url + "competitions/2003/matches?status=SCHEDULED";
// } else if (window.location.href === "#ligachampion") {
//     checkTabActive = base_url + "competitions/2001/matches?status=SCHEDULED";
// } else if (window.location.href === "#ligaspanyol") {
//     checkTabActive = base_url + "competitions/2014/matches?status=SCHEDULED";
// }

function status(response) {
    if(response.status !== 200) {
        console.log("Error: " + response.status);
        return Promise.reject(new Error(response.statusText))
    } else {
        return Promise.resolve(response)
    }
}

function jsonData(response) {
    return response.json()
}

function notifError(error) {
    console.log("Error: " + error);
}

function getScheduleCompetitions() {
    if ("caches" in window) {
        caches.match(base_url + "competitions/2021/matches?status=SCHEDULED").then(function(response){
            if(response) {
                response.json().then(function(data) {
                    var scheduleLeague = "";
                    data.matches.forEach(function(schedule) {
                        console.log(schedule);
                    })
                });
            }
        })
    }
   
    fetch(base_url + "competitions/2021/matches?status=SCHEDULED", {
        "headers": {
            "X-Auth-Token": "41f41c43e0a04c5e9c29a32a0db463b3"
        }
    })
    .then(status)
    .then(jsonData)
    .then(function(data) {
        var scheduleLeague = "";
        data.matches.forEach(function(team) {
            scheduleLeague += `
            <style>
            .league {
                padding-top: 15px;
                font-weight: 500;
                text-transform: uppercase;
            }
            </style>
            <div class="card">
                    <div class="card-content center">
                       <span class="card-title truncate center">Matchday ${team.matchday}</span>
                       <p> 
                       <a href="./tim.html?id=${team.awayTeam.id}">
                       <span>${team.homeTeam.name}</span>
                       </a>
                        <span>Vs</span>
                        <a href="./tim.html?id=${team.awayTeam.id}">
                        <span>${team.awayTeam.name}</span>
                        </a>
                       </p>
                       <p>Jadwal: ${team.utcDate}<p>
                       <p class="league">${data.competition.name}</p>
                    </div>
            </div>
            `;

            document.getElementById("ligainggris").innerHTML = scheduleLeague;
        });
    })
    .catch(notifError);
}

function getTopScorers() {
    if ("caches" in window) {
        caches.match(base_url + "competitions/2021/scorers").then(function(response){
            if(response) {
                response.json().then(function(data) {
                    var scheduleLeague = "";
                    data.scorers.forEach(function(schedule) {
                        console.log(schedule);
                    })
                });
            }
        })
    }

    fetch(base_url + "competitions/2021/scorers", {
        "headers": {
            "X-Auth-Token": "41f41c43e0a04c5e9c29a32a0db463b3"
        }
    })
    .then(status)
    .then(jsonData)
    .then(function(data) {
        var topScorer = `
        
        `;
        data.scorers.forEach(function(scorer, index) {
            topScorer += `
            <style>
            .same-width{
                width: 15%;
            }

            .index-number {
                width: 6%;
            }
            </style>
            <table class="responsive-table highlight">
                <thead>
                <tr>
                    <th >No</th>
                    <th >Nama</th>
                    <th >Negara</th>
                    <th >Club</th>
                    <th >Posisi</th>
                    <th >Total Gol</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td class="index-number">${index + 1}</td>
                    <td class="same-width">${scorer.player.name}</td>
                    <td class="same-width">${scorer.player.nationality}</td>
                    <td class="same-width">${scorer.team.name}</td>
                    <td class="same-width">${scorer.player.position}</td>
                    <td class="same-width">${scorer.numberOfGoals} Gol</td>
                </tr>
                </tbody>
            </table>
            `;

            document.getElementById("ligainggris").innerHTML = topScorer;
        });
    })
    .catch(notifError);
}

function getClassmenLeague() {
    if ("caches" in window) {
        caches.match(base_url + "competitions/2021/standings").then(function(response){
            if(response) {
                response.json().then(function(data) {
                    var classmenLeague = "";
                    // data.scorers.forEach(function(schedule) {
                    //     console.log(schedule);
                    // })
                });
            }
        })
    }

    
   
    fetch(base_url + "competitions/2021/standings", {
        "headers": {
            "X-Auth-Token": "41f41c43e0a04c5e9c29a32a0db463b3"
        }
    })
    .then(status)
    .then(jsonData)
    .then(function(data) {
        var classmenLeague = "";
        
        data.standings[0].table.forEach(function(team, index) {
            const split = team.form.split(',');
            const edit = split.map(item => {
                if (item === 'W') {
                    item = `
                    <span class="W">W</span>
                    `;
                } else if (item === 'D') {
                    item = `
                    <span class="D">D</span>
                    `;
                } else if (item === 'L') {
                    item = `
                    <span class="L">L</span>
                    `;
                } 
                return item;
            });
            classmenLeague += `
            <style>
            .same-width{
                width: 10%;
            }
            .same-width-form {
                width: 20%;
            }
            .index-number {
                width: 6%;
            }
            .club {
                width: 20%;
            }
            .D{
                background-color: blue;
                padding-top:3px;
                padding-bottom:3px;
                padding-left:5px;
                padding-right:5px;
                color: white;
                border-radius: 5px;
            }
            .W{
                background-color: green;
                padding: 3px;
                color: white;
                border-radius: 5px;
            }
            .L{
                background-color: red;
                padding-left: 5px;
                padding-right: 5px;
                padding-top: 3px;
                padding-bottom: 3px;
                color: white;
                border-radius: 5px;
            }
            
            </style>
            <table class="responsive-table highlight">
                <thead>
                <tr>
                    <th >No</th>
                    <th >Club</th>
                    <th >Permainan Terkahir</th>
                    <th >Menang</th>
                    <th >Kalah</th>
                    <th >Seri</th>
                    <th >Total Gol</th>
                    <th >Point</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td class="index-number">${index + 1}</td>
                    <td class="club"><a href="./tim.html?id=${team.team.id}"><img src="${team.team.crestUrl}" alt="${team.team.name}" width="30"/> ${team.team.name}</a></td>
                    <td class="same-width-form">${edit}</td>
                    <td class="same-width">${team.won}</td>
                    <td class="same-width">${team.lost}</td>
                    <td class="same-width">${team.draw}</td>
                    <td class="same-width">${team.goalsFor} Gol</td>
                    <td class="same-width">${team.points}</td>
                </tr>
                </tbody>
            </table>
            `;

            document.getElementById("klasmen").innerHTML = classmenLeague;
        });
    })
    .catch(notifError);
}

function getListTeam() {
    // if ("caches" in window) {
    //     caches.match(base_url + "teams?areas=2072").then(function(response){
    //         if(response) {
    //             // response.json().then(function(data) {
    //             //     var scheduleLeague = "";
    //             //     data.scorers.forEach(function(schedule) {
    //             //         console.log(schedule);
    //             //     })
    //             // });
    //         }
    //     })
    // }

    fetch(base_url + "teams?areas=2072", {
        "headers": {
            "X-Auth-Token": "41f41c43e0a04c5e9c29a32a0db463b3"
        }
    })
    .then(status)
    .then(jsonData)
    .then(function(data) {
        var listTeam = "";
        data.teams.forEach(function(tim) {
            listTeam += `
                <style>
                .row .club {
                    margin-top: 0;
                }
                .card {
                    width: 200px;
                    height: 300px;
                    padding: 20px;
                    padding-bottom: 0px;
                    margin: 0 auto;
                    margin-top: 0;
                    margin-bottom: 40px;
                }
                .text {
                    font-size: 1.4em;
                    font-height: 500;
                }
                </style>
                <div class="col s12 lg3 m4">
                <div class="card">
                    <div class="card-image">
                    <a href="./tim.html?id=${tim.id}">
                    <img src="${tim.crestUrl}" alt="${tim.name}" class="responsive-img">
                    </div>
                    <div class="card-content">
                    <p class="text center">${tim.name}</p>
                    </div>
                    </a>
                </div>
                </div>
            `;

            document.getElementById("daftartim").innerHTML = listTeam;
        });
    })
    .catch(notifError);
}

function getTeamById() {
    return new Promise((resolve, reject)  => {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
    
        if ("caches" in window) {
          caches.match(base_url + "teams/" + idParam).then(function(response) {
            if (response) {
              response.json().then(function(data) {
            //     var articleHTML = `
            //     <div class="card">
            //       <div class="card-image waves-effect waves-block waves-light">
            //         <img src="${data.result.cover}" />
            //       </div>
            //       <div class="card-content">
            //         <span class="card-title">${data.result.post_title}</span>
            //         ${snarkdown(data.result.post_content)}
            //       </div>
            //     </div>
            //   `;
            //     document.getElementById("body-content").innerHTML = articleHTML;
                // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
                resolve(data);
              });
            }
          });
        } 
  
      fetch(base_url + "teams/" + idParam, {
        "headers": {
            "X-Auth-Token": "41f41c43e0a04c5e9c29a32a0db463b3"
        }
      })
      .then(status)
      .then(jsonData)
      .then(function(data) {
  
          var teamHTML = `
          <div class="card">
            <p><img src="${data.crestUrl}" width="100"></p>
            <p>Club: ${data.name}</p>
            <p>Stadium: ${data.venue}</p>
            <p>Phone: ${data.phone}</p>
            <p>Email: ${data.email}</p>
            <p>Website: ${data.website}</p>
          </div>
            `;
            // <div class="card-content">
            //   <span class="card-title">${data.result.post_title}</span>
            //   ${snarkdown(data.result.post_content)}
            // </div>
            data.squad.forEach(function(player, index) {
                if(player.shirtNumber === null) {
                    player.shirtNumber = 'Tidak diketahui';
                };
                
                teamHTML += `
                <style>
                .width-number {
                    width: 6%;
                }

                .same-width {
                    width: 15%;
                }
                </style>
                <table class="responsive-table highlight">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Negara</th>
                        <th>Posisi</th>
                        <th>Role</th>
                        <th>Nomer Jersey</th>
                        <th>Tanggal Lahir</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td class="width-number">${index + 1}</td>
                        <td class="same-width">${player.name}</td>
                        <td class="same-width">${player.nationality}</td>
                        <td class="same-width">${player.position}</td>
                        <td class="same-width">${player.role}</td>
                        <td class="same-width">${player.shirtNumber}</td>
                        <td class="same-width">${player.dateOfBirth}</td>
                    </tr>
                    </tbody>
                </table>
                `
            })
        document.getElementById("body-content").innerHTML = teamHTML;
        resolve(data);
      })
    })
}

function getSavedTeamFavorit() {
    // getAll().then(function(team) {
    //     console.log(team);

    //     var teamHTML = "";


    // });
}

function getSavedTeamById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    
    getById(idParam).then(function(team) {
        var teamHTML = `
        <div class="card">
          <p><img src="${team.crestUrl}" width="100"></p>
          <p>Club: ${team.name}</p>
          <p>Stadium: ${team.venue}</p>
          <p>Phone: ${team.phone}</p>
          <p>Email: ${team.email}</p>
          <p>Website: ${team.website}</p>
        </div>`;

      team.squad.forEach(function(tim, index) {
          if(tim.shirtNumber === null) {
              tim.shirtNumber = 'Tidak diketahui';
          };
          
          teamHTML += `
          <style>
          .width-number {
              width: 6%;
          }

          .same-width {
              width: 15%;
          }
          </style>
          <table class="responsive-table highlight">
              <thead>
              <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Negara</th>
                  <th>Posisi</th>
                  <th>Role</th>
                  <th>Nomer Jersey</th>
                  <th>Tanggal Lahir</th>
              </tr>
              </thead>

              <tbody>
              <tr>
                  <td class="width-number">${index + 1}</td>
                  <td class="same-width">${tim.name}</td>
                  <td class="same-width">${tim.nationality}</td>
                  <td class="same-width">${tim.position}</td>
                  <td class="same-width">${tim.role}</td>
                  <td class="same-width">${tim.shirtNumber}</td>
                  <td class="same-width">${tim.dateOfBirth}</td>
              </tr>
              </tbody>
          </table>
          `;
      });
      document.getElementById("body-content").innerHTML = teamHTML;
    });
};



