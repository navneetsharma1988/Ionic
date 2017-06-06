(function () {
  'use strict';

  angular
    .module('eliteApp')
    .controller('LeaguesController', ['EliteApi', '$state', LeaguesController]);

  function LeaguesController(EliteApi, $state) {
    var self = this;

    init();

    function init() {
      EliteApi.getLeagues().then(function (data) {
        self.leagues = data;
      });
    }

    self.selectLeague = function (leagueId) {
      EliteApi.setLeagueId(leagueId);
      $state.go('app.teams');
    };

  }
})();
