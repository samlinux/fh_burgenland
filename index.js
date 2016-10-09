/**
 * FH-Übung
 * Soap Client 
 */

//--------------------------
// Config Block
//--------------------------
var config = {
	// Pfad zum WSDL Datei
	url : 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL',
	// übergabe des gewünschten Landes (dies kann natürlich auch anders erfolgen!)
	args :{'sCountryName':'Germany'}
};

//--------------------------
// Programm Block
//--------------------------
var CapitalCity = require('./CapitalCity.js').CapitalCity;	
var capitalCity = new CapitalCity(config);
capitalCity.init();
