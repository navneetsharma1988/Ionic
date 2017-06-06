(function () {
  'use strict';

  angular
    .module('eliteApp')
    .controller('TeamDetailController', ['$stateParams', 'EliteApi', TeamDetailController]);

  function TeamDetailController($stateParams, EliteApi) {
    var self = this;

    init();

    function init() {
      self.teamId = Number($stateParams.id);
      var data = EliteApi.getLeagueData();

      var team = _.chain(data.teams)
        .flatten("divisionTeams")
        .find({"id": self.teamId})
        .value();

      self.teamName = team.name;

      self.games = _.chain(data.games)
        .filter(isTeamInGame)
        .map(function (item) {
          var isTeam1 = (item.team1Id === self.teamId ? true : false);
          var opponentName = isTeam1 ? item.team2 : item.team1;
          var scoreDisplay = getScoreDisplay(isTeam1, item.team1Score, item.team2Score);
          return {
            gameId: item.id,
            opponent: opponentName,
            time: item.time,
            location: item.location,
            locationUrl: item.locationUrl,
            scoreDisplay: scoreDisplay,
            homeAway: (isTeam1 ? "vs." : "at")
          };
        })
        .value();

      self.teamStanding = _.chain(data.standings)
        .flatten("divisionStandings")
        .find({"teamId": self.teamId})
        .value();

      //console.log('$stateParams', $stateParams);
    }

    function isTeamInGame(item){
      return item.team1Id === self.teamId || item.team2Id === self.teamId;
    }

    function getScoreDisplay(isTeam1, team1Score, team2Score) {
      if (team1Score && team2Score) {
        var teamScore = (isTeam1 ? team1Score : team2Score);
        var opponentScore = (isTeam1 ? team2Score : team1Score);
        var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
        return winIndicator + teamScore + "-" + opponentScore;
      }
      else {
        return "";
      }
    }

  }
})();
