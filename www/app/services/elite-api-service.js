(function () {
  'use strict';

  angular
    .module('eliteApp')
    .factory('EliteApi', ['$http', '$q', '$ionicLoading', 'DSCacheFactory', EliteApi]);

  function EliteApi($http, $q, $ionicLoading, DSCacheFactory) {

        self.leaguesCache = DSCacheFactory.get("leaguesCache");
        self.leagueDataCache = DSCacheFactory.get("leagueDataCache");

        self.leaguesCache.setOptions({
          onExpire: function (key, value) {
            getLeagues().then(function () {
              console.log("Leagues Cache was automatically refreshed", new Date());
            }, function () {
              console.log("Error getting data. Putting expired item back cache", new Date());
              self.leaguesCache.put(key, value);
            })
          }
        });

        self.staticCache = DSCacheFactory.get("staticCache");

    function setLeagueId(leagueId) {
      self.staticCache.put("currentLeagueId", leagueId);
    }

    function getLeagueId() {
      return self.staticCache.get("currentLeagueId");
    }


    self.leagueDataCache.setOptions({
      onExpire: function (key, value) {
        getLeagues().then(function () {
          console.log("Leagues Cache was automatically refreshed", new Date());
        }, function () {
          console.log("Error getting data. Putting expired item back cache", new Date());
          self.leagueDataCache.put(key, value);
        })
      }
    });


    function getLeagues() {
      var deferred = $q.defer(),
        cacheKey = "leagues",
        leaguesData = self.leaguesCache.get(cacheKey);

      if (leaguesData) {
        console.log("Found data inside the cache", leaguesData);
        deferred.resolve(leaguesData);
      } else {
        $ionicLoading.show({template: 'Loading...'});
        $http.get("http://elite-schedule.net/api/leaguedata")
          .success(function (data) {
            console.log("Received data via HTTP");
            self.leaguesCache.put(cacheKey, data);
            $ionicLoading.hide();
            deferred.resolve(data);
          })
          .error(function () {
            console.log("Error while making HTTP call.");
            $ionicLoading.hide();
            deferred.reject(data);
          });
      }
      return deferred.promise;
    }

    function getLeagueData() {
      var deferred = $q.defer(),
        cacheKey = "leagueData-" + getLeagueId(),
        leagueData = self.leagueDataCache.get(cacheKey);

      if (leagueData) {
        console.log("Found data in cache", leagueData);
        deferred.resolve(leagueData);
      } else {
        $ionicLoading.show({
          template: 'Loading...'
        });
        $http.get("http://elite-schedule.net/api/leaguedata/" + getLeagueId())
          .success(function (data, status) {
            console.log("Received schedule data via HTTP.", data, status);
            self.leagueDataCache.put(cacheKey, data);
            $ionicLoading.hide();
            deferred.resolve(data);
          })
          .error(function () {
            console.log("Error while making HTTP call.");
            $ionicLoading.hide();
            deferred.reject();
          });
      }
      return deferred.promise;
    }


    return {
      getLeagues: getLeagues,
      getLeagueData: getLeagueData,
      setLeagueId: setLeagueId
    }
  }

})();
