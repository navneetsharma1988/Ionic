(function () {
  'use strict';

  angular
    .module('eliteApp')
    .controller('LocationScheduleController', ['$stateParams', 'EliteApi', LocationScheduleController]);

  function LocationScheduleController($stateParams, EliteApi) {
    var self = this;

    self.locationId = Number($stateParams.id);

    EliteApi.getLeagueData().then(function (data) {
      self.location = _.find(data.locations, {id: self.locationId});
      self.games = _.filter(data.games, function (item) {
        return item.location === self.location.name;
      });
    });

    self.setScoreCss = function (firstScore, secondScore) {
      return (Number(firstScore) > Number(secondScore) ? "positive bold" : "");
    }
  };
})();
