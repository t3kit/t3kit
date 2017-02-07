define([], function () {

    function CustomLogger() {
        this._options = {
            disabled: true
        }
    }

    CustomLogger.prototype.isDisabled = function() {
        return this._options.disabled;
    };

    CustomLogger.prototype.disableLogger = function() {
        this._options.disabled = true;
    };
    CustomLogger.prototype.enableLogger = function() {
        this._options.disabled = false;
    };

    CustomLogger.prototype.log = function() {
        if(!this.isDisabled() && typeof console !== "undefined" ) {
            console.log.apply(console, arguments);
        }
    };

    CustomLogger.prototype.error = function() {
        if(typeof console !== "undefined") {
            console.error.apply(console, arguments);
        }

    };

    return new CustomLogger();

});