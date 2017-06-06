(function () {
  'use strict';

  angular
    .module('eliteApp')
    .controller('TeamsController', ['EliteApi',TeamsController]);

  function TeamsController(EliteApi) {
    var self = this;

    init();

    function init() {
      var data = EliteApi.getLeagueData();
      self.teams = data.teams;
    }


  }
})();
