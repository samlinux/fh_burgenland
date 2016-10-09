/**
 * FH-Übung
 * Soap Client 
 * - ermittelt den Namen der Hauptstadt eines Landes 
 * - auf Basis des Landesnamen
 * - gibt als Ergebnis einen formatierten String zurück
 */

(function(){
	'use strict';
	// import des SOAP Clients
	var soap = require('soap');

	// Promise zur Ablaufsteuerung, node.js ist asynchron
	var q = require('q');

	// helper zum debuggen
	//var util = require('util');
	//console.log(util.inspect(result ,false, null));
	
	/**
	 * Basisklasse
	 */
	var CapitalCity = function(modulConfig){
		this.ModulOptions =modulConfig;
		this.Url = modulConfig.url;
		this.Args = modulConfig.args;

		this.Country = this.Args.sCountryName;
		this.CountryIsoCode = '';
		this.CountryCapitalName = '';	
	};

	/**
	  * Ablaufsteuerung des Moduls
  	  */ 
	CapitalCity.prototype.init = function(){
		var _this = this;

		this.getCountryISOCode().then(function(result){
			_this.CountryIsoCode = result.CountryISOCodeResult;
			return _this.getCapitalCity();
		}).then(function(result){
			_this.CountryCapitalName = result.CapitalCityResult;
			return _this.getCountryCapitalName();
		}).then(function(result){
			console.log(result);
		}).done();
	};

	/**
	 * ermittle den Länder ISO Code des gewünschten Landes
	 */
	CapitalCity.prototype.getCountryISOCode = function(){
		var deferred = q.defer(), _this = this;

		soap.createClient(this.Url, function(err, client) {
			client.CountryISOCode(_this.Args, function(err, result) {
				deferred.resolve(result);	
			});
		});
		return deferred.promise;
	};

	/**
	 * ermittle die Hauptstadt aufgrund des ermittelten ISO-Code
	 */
	CapitalCity.prototype.getCapitalCity = function(){
		var deferred = q.defer(), _this = this;

		soap.createClient(this.Url, function(err, client) {
			var config = {
				'sCountryISOCode':_this.CountryIsoCode
			};

			client.CapitalCity(config, function(err, result) {
				deferred.resolve(result);	
			});
		});
		return deferred.promise;
	};

	/**
	 * erzeuge ein passenden Output
	 */
	CapitalCity.prototype.getCountryCapitalName = function(){
		var erg = 'Die Hauptstadt von '+this.Country+' ist '+this.CountryCapitalName+'.';
		return erg;
	};

	module.exports.CapitalCity = CapitalCity;	
})();

