'use strict';
const {IP2Location} = require("ip2location-nodejs");
const MissingAdditionException = require("../Exceptions/MissingAdditionException");


const ip2location = (function() {
    let ipAddress, filePath;
    function ip2location(ipAddress, filePath) {
        if(!filePath)
            throw new MissingAdditionException('ip2location','file')
        this.ipAddress = ipAddress;
        this.filePath = filePath;
        
    }
    ip2location.prototype.get = async function() {
        let ip2location = new IP2Location();
        ip2location.open(this.filePath);
        let result = await ip2location.getAll(this.ipAddress);
        return {
            'ip': result.ip,
            'country_name': result.countryLong,
            'country_code': result.countryShort,
        };
    }

    return ip2location;
})()

module.exports = ip2location;