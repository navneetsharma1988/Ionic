(function () {
  'use strict';

  angular
    .module('eliteApp')
    .controller('TeamDetailController',
      ['$stateParams',
        'EliteApi',
        '$ionicPopup',
        'MyTeamsService',
        TeamDetailController
      ]);

  function TeamDetailController($stateParams, EliteApi, $ionicPopup, MyTeamsService) {
    var self = this,
            team = null,
            leagueData = null;
    init();

    function init() {
      self.teamId = Number($stateParams.id);
      EliteApi.getLeagueData().then(function (data) {

        team = _.chain(data.teams)
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
            leagueData = data.league;
        });


      //self.following = false;
      self.following = MyTeamsService.isFollowingTeam(self.teamId.toString());
    }

    self.toggleFollow = function () {

      if (self.following) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Unfollow?',
          template: 'Are you sure you want to unfollow?'
        });
        confirmPopup.then(function (res) {
          if (res) {
            self.following = !self.following;
            MyTeamsService.unfollowTeam(team.id);
          }
        });
      } else {
        self.following = !self.following;
        MyTeamsService.followTeam({id: team.id, name: team.name, leagueId: leagueData.id, leagueName: leagueData.name});
      }
    };


    function isTeamInGame(item) {
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
