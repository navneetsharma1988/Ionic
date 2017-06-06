(function () {
  'use strict';

  angular
    .module('eliteApp')
    .controller('LeaguesController', ['EliteApi', '$state', LeaguesController]);

  function LeaguesController(EliteApi, $state) {
    var self = this;

    init();

    function init() {
      self.leagues = EliteApi.getLeagues();
    }

    self.selectLeague = function (leagueId) {
      //TODO: select correct league
      $state.go('app.teams');
    };

  }
})();
