(function () {
  'use strict';

  angular
    .module('eliteApp')
    .controller('MyTeamsController', ['$state', 'MyTeamsService', 'EliteApi', MyTeamsController]);

  function MyTeamsController($state, MyTeamsService, EliteApi) {

    var self = this;

    init();

    function init() {
      self.myTeams = MyTeamsService.getFollowedTeams();
    }


    self.goToTeam = function (team) {
      EliteApi.setLeagueId(team.leagueId);
      $state.go("app.team-detail", {id: team.id});
    };

  }
})();
