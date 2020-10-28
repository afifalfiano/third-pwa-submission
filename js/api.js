var base_url = "https://api.football-data.org/v2/";
var idTab = "#ligainggris";
var checkTabActive = "";
var options = {
    "mode": "cors",
    "headers": {
        "X-Auth-Token": "41f41c43e0a04c5e9c29a32a0db463b3"
    }
};

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
    
    checkTabActive = base_url + "competitions/2021/matches?status=SCHEDULED";
    if (idTab === '#ligainggris' || idTab === '#home') {
        checkTabActive = base_url + "competitions/2021/matches?status=SCHEDULED";
    } else if (idTab === '#ligajerman') {
        checkTabActive = base_url + "competitions/2002/matches?status=SCHEDULED";
    } else if (idTab === '#ligabelanda') {
        checkTabActive = base_url + "competitions/2003/matches?status=SCHEDULED";
    } else if (idTab === '#ligaspanyol') {
        checkTabActive = base_url + "competitions/2014/matches?status=SCHEDULED";
    } else if (idTab === '#ligaperancis') {
        checkTabActive = base_url + "competitions/2015/matches?status=SCHEDULED";
    } else if (idTab === '#ligachampion') {
        checkTabActive = base_url + "competitions/2001/matches?status=SCHEDULED";
    }

    if ("caches" in window) {
        caches.match(checkTabActive).then(function(response){
            if(response) {
                response.json().then(function(data) {
                    var scheduleLeague = "";
                    data.matches.splice(15, 322);
                    data.matches.forEach(function(team) {
                        const dateParse = new Date(team.utcDate);
                        const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        const parse = dateParse.toLocaleDateString("id-ID", optionsDate);
                        scheduleLeague += `
                        <style>
                        .league {
                            padding-top: 15px;
                            font-weight: 500;
                            text-transform: uppercase;
                        }
                        .card {
                            width: 240px;
                            height: 340px;
                            padding: 20px;
                            padding-bottom: 0px;
                            margin: 0 auto;
                            margin-top: 0;
                            margin-bottom: 40px;
                        }
                        </style>
                        <div class="col s12 m4 lg4">
                        <div class="card">
                                <div class="card-content center">
                                   <span class="card-title truncate center">Matchday ${team.matchday}</span>
                                   <p> 
                                        <a href="./tim.html?id=${team.awayTeam.id}">
                                        <span>${team.homeTeam.name}</span>
                                        </a>
                                   </p>
                                    <p>Vs</p>
                                    <p>
                                        <a href="./tim.html?id=${team.awayTeam.id}">
                                        <span>${team.awayTeam.name}</span>
                                        </a>
                                   </p>
                                   <hr/>
                                   <p>${parse}</p>
                                   <hr/>
                                   <p class="league">${data.competition.name}</p>
                                </div>
                        </div>
                        </div>
                        `;
            
                        document.getElementById("jadwal").innerHTML = scheduleLeague;
                    });
                    checkRequestSchedule();
                });
            }
        })
    }
   
    fetch(checkTabActive, options)
    .then(status)
    .then(jsonData)
    .then(function(data) {
        var scheduleLeague = "";
        data.matches.splice(15, 322);
        data.matches.forEach(function(team) {
            const dateParse = new Date(team.utcDate);
            const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const parse = dateParse.toLocaleDateString("id-ID", optionsDate);
            scheduleLeague += `
            <style>
            .league {
                padding-top: 15px;
                font-weight: 500;
                text-transform: uppercase;
            }
            .card {
                width: 240px;
                height: 340px;
                padding: 20px;
                padding-bottom: 0px;
                margin: 0 auto;
                margin-top: 0;
                margin-bottom: 40px;
            }
            </style>
            <div class="col s12 m4 lg4">
            <div class="card">
                    <div class="card-content center">
                       <span class="card-title truncate center">Matchday ${team.matchday}</span>
                       <p> 
                            <a href="./tim.html?id=${team.awayTeam.id}">
                            <span>${team.homeTeam.name}</span>
                            </a>
                       </p>
                        <p>Vs</p>
                        <p>
                            <a href="./tim.html?id=${team.awayTeam.id}">
                            <span>${team.awayTeam.name}</span>
                            </a>
                       </p>
                       <hr/>
                       <p>${parse}</p>
                       <hr/>
                       <p class="league">${data.competition.name}</p>
                    </div>
            </div>
            </div>
            `;
            document.getElementById("jadwal").innerHTML = scheduleLeague;
        });
        checkRequestSchedule();
    })
    .catch(notifError);
}

function checkRequestSchedule() {

    document.querySelectorAll('ul li').forEach(function(el) {
        el.addEventListener('click', function(event) {
            idTab = event.target.hash;
             if (idTab === '#ligainggris' || idTab === '#home') {
                getScheduleCompetitions();
            } else if (idTab === '#ligajerman') {
                getScheduleCompetitions();
            } else if (idTab === '#ligaperancis') {
                getScheduleCompetitions();
            } else if (idTab === '#ligaspanyol') {
                getScheduleCompetitions();
            } else if (idTab === '#ligabelanda'){
                getScheduleCompetitions();
            } else if (idTab === '#ligachampion') {
                getScheduleCompetitions();
            }
            console.log(idTab);
        })
    })
}

function getTopScorers() {
    checkTabActive = base_url + "competitions/2021/scorers";
    if (idTab === '#ligainggris' || idTab === '#topskor') {
        checkTabActive = base_url + "competitions/2021/scorers";
    } else if (idTab === '#ligajerman') {
        checkTabActive = base_url + "competitions/2002/scorers";
    } else if (idTab === '#ligabelanda') {
        checkTabActive = base_url + "competitions/2003/scorers";
    } else if (idTab === '#ligaspanyol') {
        checkTabActive = base_url + "competitions/2014/scorers";
    } else if (idTab === '#ligaperancis') {
        checkTabActive = base_url + "competitions/2015/scorers";
    } else if (idTab === '#ligachampion') {
        checkTabActive = base_url + "competitions/2001/scorers";
    }
    if ("caches" in window) {
        caches.match(checkTabActive).then(function(response){
            if(response) {
                response.json().then(function(data) {
                    var topScorer = "";
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
                                <td class="same-width">
                                <a href="./tim.html?id=${scorer.team.id}">${scorer.team.name}</a>
                                </td>
                                <td class="same-width">${scorer.player.position}</td>
                                <td class="same-width">${scorer.numberOfGoals} Gol</td>
                            </tr>
                            </tbody>
                        </table>
                        `;
            
                        document.getElementById("topskorer").innerHTML = topScorer;
                    });
                    checkRequestTopScorer();
                });
            }
        })
    }

    fetch(checkTabActive, options)
    .then(status)
    .then(jsonData)
    .then(function(data) {
        var topScorer = "";
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
                    <td class="same-width">
                    <a href="./tim.html?id=${scorer.team.id}">${scorer.team.name}</a>
                    </td>
                    <td class="same-width">${scorer.player.position}</td>
                    <td class="same-width">${scorer.numberOfGoals} Gol</td>
                </tr>
                </tbody>
            </table>
            `;

            document.getElementById("topskorer").innerHTML = topScorer;
        });
        checkRequestTopScorer();
    })
    .catch(notifError);
}

function checkRequestTopScorer() {

    document.querySelectorAll('ul li').forEach(function(el) {
        el.addEventListener('click', function(event) {
            idTab = event.target.hash;
             if (idTab === '#ligainggris' || idTab === '#topskor') {
                getTopScorers();
            } else if (idTab === '#ligajerman') {
                getTopScorers();
            } else if (idTab === '#ligaperancis') {
                getTopScorers();
            } else if (idTab === '#ligachampion') {
                getTopScorers();
            } else if (idTab === '#ligaspanyol') {
                getTopScorers();
            } else if (idTab === '#ligabelanda'){
                getTopScorers();
            }
        })
    })
}

function getClassmenLeague() {
    checkTabActive = base_url + "competitions/2021/standings";
    if (idTab === '#ligainggris' || idTab === '#klasmenall') {
        checkTabActive = base_url + "competitions/2021/standings";
    } else if (idTab === '#ligajerman') {
        checkTabActive = base_url + "competitions/2002/standings";
    } else if (idTab === '#ligabelanda') {
        checkTabActive = base_url + "competitions/2003/standings";
    } else if (idTab === '#ligaspanyol') {
        checkTabActive = base_url + "competitions/2014/standings";
    } else if (idTab === '#ligaperancis') {
        checkTabActive = base_url + "competitions/2015/standings";
    } else if (idTab === '#ligachampion') {
        checkTabActive = base_url + "competitions/2001/standings";
    }
    if ("caches" in window) {
        caches.match(checkTabActive).then(function(response){
            if(response) {
                response.json().then(function(data) {
                    var klasmenLiga = "";
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
                        klasmenLiga += `
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
                        document.getElementById("klasmenclub").innerHTML = klasmenLiga;
                    });
                    checkRequestLeague();
                });
            }
        })
    }
    

    fetch(checkTabActive, options )
    .then(status)
    .then(jsonData)
    .then(function(data) {
        var klasmenLiga = "";
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
            klasmenLiga += `
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
            document.getElementById("klasmenclub").innerHTML = klasmenLiga;
        });
        checkRequestLeague();
    })
    .catch(notifError);
}

function checkRequestLeague() {
    
    document.querySelectorAll('ul li').forEach(function(el) {
        el.addEventListener('click', function(event) {
            idTab = event.target.hash;
             if (idTab === '#ligainggris' || idTab === '#klasmenall') {
                getClassmenLeague();
            } else if (idTab === '#ligajerman') {
                getClassmenLeague();
            } else if (idTab === '#ligaperancis') {
                getClassmenLeague();
            } else if (idTab === '#ligachampion') {
                getClassmenLeague();
            } else if (idTab === '#ligaspanyol') {
                getClassmenLeague();
            } else if (idTab === '#ligabelanda'){
                getClassmenLeague();
            }
            console.log(idTab);
            // return;
        })
    })
}

function getListTeam() {
    checkTabActive = base_url + "teams?areas=2072";
    if (idTab === '#ligainggris' || idTab === '#daftartim') {
        checkTabActive = base_url + "teams?areas=2072";
    } else if (idTab === '#ligajerman') {
        checkTabActive = base_url + "teams?areas=2088";
    } else if (idTab === '#ligabelanda') {
        checkTabActive = base_url + "teams?areas=2163";
    } else if (idTab === '#ligaspanyol') {
        checkTabActive = base_url + "teams?areas=2224";
    } else if (idTab === '#ligaperancis') {
        checkTabActive = base_url + "teams?areas=2081";
    } 

    if ("caches" in window) {
        caches.match(checkTabActive).then(function(response){
            if(response) {
                response.json().then(function(data) {
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
                    checkRequestTeamSquad();
                });
            }
        })
    }


    fetch(checkTabActive, options)
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
        checkRequestTeamSquad();
    })
    .catch(notifError);
}

function checkRequestTeamSquad() {

    document.querySelectorAll('ul li').forEach(function(el) {
        el.addEventListener('click', function(event) {
            idTab = event.target.hash;
             if (idTab === '#ligainggris' || idTab === '#daftartim') {
                getListTeam();
            } else if (idTab === '#ligajerman') {
                getListTeam();
            } else if (idTab === '#ligaperancis') {
                getListTeam();
            } else if (idTab === '#ligaspanyol') {
                getListTeam();
            } else if (idTab === '#ligabelanda'){
                getListTeam();
            }
            console.log(idTab);
        })
    })
}

function getTeamById() {
    return new Promise((resolve, reject)  => {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
    
        if ("caches" in window) {
          caches.match(base_url + "teams/" + idParam).then(function(response) {
            if (response) {
              response.json().then(function(data) {
  
                var teamHTML = `
                <style>
                  .row {
                      margin-top: 2em;
                  }
                </style>
                <div class="row">
                <div class="card">
                  <div class="card-content">
                  <p><img src="${data.crestUrl}" width="100"></p>
                  <p>Club: ${data.name}</p>
                  <p>Stadium: ${data.venue}</p>
                  <p>Phone: <telp>${data.phone}</telp></p>
                  <p>Email: <a href = "mailto:${data.email}?subject = Information&body = 'Test'">${data.email}</a></p>
                  <p>Website: <a href="${data.website}">${data.website}</a></p>
                  </div>
                </div>
                </div>
                  `;
                  data.squad.forEach(function(player, index) {
                      const dateParse = new Date(player.dateOfBirth);
                      const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                      const parse = dateParse.toLocaleDateString("id-ID", optionsDate);
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
                              <td class="same-width">${parse}</td>
                          </tr>
                          </tbody>
                      </table>
                      `;
                  })
                  var footerTeam = `
                  <style>
                  footer {
                      margin-top: 20px;
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
              document.getElementById("body-content").innerHTML = teamHTML;
              document.getElementById("footer-content").innerHTML = footerTeam;
              resolve(data);
            });
            }
          });
        } 
  
      fetch(base_url + "teams/" + idParam, options)
      .then(status)
      .then(jsonData)
      .then(function(data) {
  
          var teamHTML = `
          <style>
            .row {
                margin-top: 2em;
            }
          </style>
          <div class="row">
          <div class="card">
            <div class="card-content">
            <p><img src="${data.crestUrl}" width="100"></p>
            <p>Club: ${data.name}</p>
            <p>Stadium: ${data.venue}</p>
            <p>Phone: <telp>${data.phone}</telp></p>
            <p>Email: <a href = "mailto:${data.email}?subject = Information&body = 'Test'">${data.email}</a></p>
            <p>Website: <a href="${data.website}">${data.website}</a></p>
            </div>
          </div>
          </div>
            `;
            data.squad.forEach(function(player, index) {
                const dateParse = new Date(player.dateOfBirth);
                const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const parse = dateParse.toLocaleDateString("id-ID", optionsDate);
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
                        <td class="same-width">${parse}</td>
                    </tr>
                    </tbody>
                </table>
                `;
            })
            var footerTeam = `
            <style>
            footer {
                margin-top: 20px;
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
        document.getElementById("body-content").innerHTML = teamHTML;
        document.getElementById("footer-content").innerHTML = footerTeam;
        resolve(data);
      })
    })
}

function getSavedTeamFavorit() {
    getAll().then(function(team) {
        console.log(team);
        var teamHTML = "";
        if (team.length !== 0 && team.length !== -1) {
            team.forEach(function(tim) {
                teamHTML += `
                <div class="col s12 m3 lg3">
                <div class="card center">
                    <div class="card-content">
                    <a href="./tim.html?id=${tim.id}">
                    <p class="card-title">${tim.name}</p></br>
                    <p><img src="${tim.crestUrl}" width="100"></p><br/>
                    <em class="card-title">${tim.venue}</em>
                    </a>
                    </div>
                </div>
                </div>
                `;
            });
        } else {
            teamHTML += `
            <div class="col s12 m12 lg12">
                <div class="card center">
                    <div class="card-content">Tidak ada tim favorit!</div>
                </div>
            </div>
            `;
        }
        document.getElementById("timfavorit").innerHTML = teamHTML;
        
    });
}