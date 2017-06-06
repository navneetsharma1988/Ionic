(function () {
  'use strict';

  angular
    .module('eliteApp')
    .controller('TeamsController', ['EliteApi', TeamsController]);

  function TeamsController(EliteApi) {
    var self = this;

    init();

    function init() {
      EliteApi.getLeagueData().then(function (data) {
        self.teams = data.teams;
      });
    }
  }
})();
