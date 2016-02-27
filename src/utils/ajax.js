var class2type = {},
    toString = class2type.toString;


function itype (obj) {
    return obj == null ? String(obj) :
    class2type[toString.call(obj)] || "object";
}

// Populate the class2type map
each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function extend ( t, s, defaults ) {
    if ( defaults ) {
        extend( t, defaults );
    }
    if ( s && typeof s == 'object' ) {
        for ( var p in s ) {
            t[ p ] = s[ p ];
        }
    }
    return t;
}

function each (elements, callback) {
    var i, key;
    if ( likeArray(elements) ) {
        for ( i = 0; i < elements.length; i++ ) {
            if ( callback.call(elements[i], i, elements[i] ) === false ) {
                return elements;
            }
        }
    } else {
        for ( key in elements ) {
            if ( callback.call(elements[key], key, elements[key] ) === false ) {
                return elements;
            }
        }
    }

    return elements;
}

var isType = function ( type ) {
    return function ( obj ) {
        return {}.toString.call( obj ) == '[object ' + type + ']';
    }
};

var isObject = isType( 'Object' );
var isFunction = isType( 'Function' );
var isArray = Array.isArray || isType( 'Array' );
var isString = isType( 'String' );

function isWindow (obj) {
    return obj != null && obj == obj.window;
}
function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}
function likeArray (obj) {
    return typeof obj.length == 'number';
}


var jsonpID = 0,
    document = window.document,
    key,
    active = 0, // Number of active Ajax requests
    name,
    rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    scriptTypeRE = /^(?:text|application)\/javascript/i,
    xmlTypeRE = /^(?:text|application)\/xml/i,
    jsonType = 'application/json',
    htmlType = 'text/html',
    blankRE = /^\s*$/,
    originAnchor = document.createElement('a');

originAnchor.href = window.location.href;

var escape = encodeURIComponent;

// triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
function ajaxBeforeSend(xhr, settings) {
    var context = settings.context;
    if (settings.beforeSend.call(context, xhr, settings) === false) {
        return false;
    }
}

function ajaxSuccess(data, xhr, settings, resolve) {
    var context = settings.context, status = 'success';
    settings.success.call(context, data, status, xhr);
    resolve({
        data: data,
        status: status,
        xhr: xhr
    });
    ajaxComplete(status, xhr, settings);
}

// type: "timeout", "error", "abort", "parsererror"
function ajaxError(error, type, xhr, settings, reject) {
    var context = settings.context;
    settings.error.call(context, xhr, type, error);
    reject({
        xhr: xhr,
        type: type,
        error: error
    });

    ajaxComplete(type, xhr, settings);
}

// status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
function ajaxComplete(status, xhr, settings) {
    var context = settings.context;
    settings.complete.call(context, xhr, status);
}

// Empty function, used as default callback
function empty() {}

var ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr: function () {
        return new window.XMLHttpRequest()
    },
    // MIME types mapping
    // IIS returns Javascript as "application/x-javascript"
    accepts: {
        script: 'text/javascript, application/javascript, application/x-javascript',
        json:   jsonType,
        xml:    'application/xml, text/xml',
        html:   htmlType,
        text:   'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    // Whether data should be serialized to string
    processData: true,
    // Whether the browser should be allowed to cache GET responses
    cache: true
};

function mimeToDataType (mime) {
    if ( mime ) {
        mime = mime.split(';', 2)[0];
    }
    return mime && ( mime == htmlType ? 'html' :
            mime == jsonType ? 'json' :
                scriptTypeRE.test(mime) ? 'script' :
                xmlTypeRE.test(mime) && 'xml' ) || 'text';
}

function appendQuery(url, query) {
    if ( query == '' ) {
        return url;
    }
    return (url + '&' + query).replace(/[&?]{1,2}/, '?');
}


function param (obj, traditional) {
    var params = [];
    params.add = function (key, value) {
        if ( isFunction(value) ) {
            value = value();
        }
        if (value == null) {
            value = "";
        }
        this.push(escape(key) + '=' + escape(value));
    };
    serialize(params, obj, traditional);
    return params.join('&').replace(/%20/g, '+');
}

function serialize (params, obj, traditional, scope) {
    var type,
        array = isArray(obj),
        hash = isPlainObject(obj);

    each(obj, function (key, value) {
        type = itype(value);
        if ( scope ) {
            key = traditional ? scope :
            scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
        }
        // handle data in serializeArray() format
        if ( !scope && array ) {
            params.add(value.name, value.value);
        } else if ( type == "array" || ( !traditional && type == "object") ) {   // recurse into nested objects
            serialize(params, value, traditional, key);
        } else {
            params.add(key, value);
        }
    });
}

// serialize payload and append it to the URL for GET requests
function serializeData(options) {
    if ( options.processData && options.data && !isString(options.data) ) {
        options.data = param(options.data, options.traditional);
    }
    if ( options.data && ( !options.type || options.type.toUpperCase() == 'GET') ) {
        options.url = appendQuery(options.url, options.data);
        options.data = undefined;
    }
}

function ajax (options) {

    var settings = extend({}, options || {}),
        urlAnchor, hashIndex;

    for ( key in ajaxSettings ) {
        if ( settings[key] === undefined ) {
            settings[key] = ajaxSettings[key];
        }
    }

    if ( !settings.crossDomain ) {
        urlAnchor = document.createElement('a');
        urlAnchor.href = settings.url;
        // cleans up URL for .href (IE only), see https://github.com/madrobby/zepto/pull/1049
        urlAnchor.href = urlAnchor.href;
        settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host);
    }

    if ( !settings.url ) {
        settings.url = window.location.toString();
    }

    if ( (hashIndex = settings.url.indexOf('#')) > -1 ) {
        settings.url = settings.url.slice(0, hashIndex);
    }

    // 序列化参数
    serializeData(settings);

    var dataType = settings.dataType,
        hasPlaceholder = /\?.+=\?/.test(settings.url);
    if ( hasPlaceholder ) {
        dataType = 'jsonp';
    }

    if ( settings.cache === false || (
            (!options || options.cache !== true) &&
            ('script' == dataType || 'jsonp' == dataType)
        ) ) {
        settings.url = appendQuery(settings.url, '_=' + Date.now())
    }

    if ( 'jsonp' == dataType ) {
        if ( !hasPlaceholder ) {
            settings.url = appendQuery(settings.url,
                settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?');
        }
        return ajaxJSONP(settings);
    }

    var mime = settings.accepts[dataType],
        headers = {},
        setHeader = function (name, value) {
            headers[name.toLowerCase()] = [name, value];
        },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(),
        nativeSetHeader = xhr.setRequestHeader,
        abortTimeout;

    //if (deferred) deferred.promise(xhr)

    if ( !settings.crossDomain ) {
        setHeader('X-Requested-With', 'XMLHttpRequest');
    }
    setHeader('Accept', mime || '*/*');

    if ( mime = settings.mimeType || mime ) {
        if ( mime.indexOf(',') > -1 ) {
            mime = mime.split(',', 2)[0];
        }
        xhr.overrideMimeType && xhr.overrideMimeType(mime);
    }

    if ( settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET') ) {
        setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');
    }

    if ( settings.headers ) {
        for (name in settings.headers) {
            setHeader(name, settings.headers[name]);
        }
    }
    xhr.setRequestHeader = setHeader;

    return new Promise(function (resolve, reject) {

        xhr.onreadystatechange = function () {
            if ( xhr.readyState == 4 ) {
                xhr.onreadystatechange = empty;
                clearTimeout(abortTimeout);
                var result, error = false;

                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {

                    dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));
                    result = xhr.responseText;

                    try {
                        // http://perfectionkills.com/global-eval-what-are-the-options/
                        if (dataType == 'script') {
                            (1,eval)(result);
                        } else if (dataType == 'xml') {
                            result = xhr.responseXML;
                        } else if (dataType == 'json') {
                            result = blankRE.test(result) ? null : JSON.parse(result);
                        }
                    } catch (e) { error = e }

                    if (error) {
                        ajaxError(error, 'parsererror', xhr, settings, reject);
                    } else {
                        ajaxSuccess(result, xhr, settings, resolve);
                    }
                } else {
                    ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, reject);
                }
            }
        };

        if (ajaxBeforeSend(xhr, settings) === false) {
            xhr.abort();
            ajaxError(null, 'abort', xhr, settings, reject);
            return;
        }

        if (settings.xhrFields) {
            for (name in settings.xhrFields) {
                xhr[name] = settings.xhrFields[name];
            }
        }

        var async = 'async' in settings ? settings.async : true;
        xhr.open(settings.type, settings.url, async, settings.username, settings.password);

        for (name in headers) {
            nativeSetHeader.apply(xhr, headers[name]);
        }

        if (settings.timeout > 0) {
            abortTimeout = setTimeout(function () {
                xhr.onreadystatechange = empty;
                xhr.abort();
                ajaxError(null, 'timeout', xhr, settings, reject);
            }, settings.timeout);
        }

        // avoid sending empty string (#319)
        xhr.send(settings.data ? settings.data : null);
    });
}

function ajaxJSONP (options, deferred) {
    if (!('type' in options)) {
        return ajax(options);
    }

    return new Promise(function (resolve, reject) {
        var _callbackName = options.jsonpCallback,
            callbackName = (isFunction(_callbackName) ?
                    _callbackName() : _callbackName) || ('jsonpx' + (++jsonpID)),
            script = document.createElement('script'),
            originalCallback = window[callbackName],
            responseData,
            abort = function(errorType) {
                reject({errorType: errorType});
            },
            xhr = { abort: abort }, abortTimeout;

        function onLoad () {
            script.onload = script.onreadystatechange = null;
            document.head.removeChild(script);
            script = null;

            clearTimeout(abortTimeout);

            ajaxSuccess(responseData && responseData.length ? responseData[0] : null, xhr, options, resolve);

            window[callbackName] = originalCallback;
            if ( responseData && isFunction(originalCallback) ) {
                originalCallback(responseData[0]);
            }
            originalCallback = responseData = undefined;
        }

        if (ajaxBeforeSend(xhr, options) === false) {
            abort('abort');
            return;
        }

        if ( 'onload' in script ) {
            script.onload = onLoad;
        } else {
            script.onreadystatechange = function () {
                if ( /loaded|complete/.test(script.readyState) ) {
                    onLoad();
                }
            };
        }

        script.onerror = function () {
            ajaxError(null, 'error', xhr, options, reject);
        };

        window[callbackName] = function() {
            responseData = arguments;
        }

        script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName);
        document.head.appendChild(script);

        if (options.timeout > 0) {
            abortTimeout = setTimeout(function(){
                abort('timeout');
            }, options.timeout);
        }
    });
}

// handle optional data/success arguments
function parseArguments (url, data, success, dataType) {

    if ( isFunction(data) ) {
        dataType = success;
        success = data;
        data = undefined;
    }
    if ( !isFunction(success) ) {
        dataType = success;
        success = undefined;
    }
    return {
        url: url,
        data: data,
        success: success,
        dataType: dataType
    };
}

ajax.get = function(/* url, data, success, dataType */){
    return ajax(parseArguments.apply(null, arguments))
};

ajax.post = function(/* url, data, success, dataType */){
    var options = parseArguments.apply(null, arguments);
    options.type = 'POST';
    return ajax(options);
};

ajax.getJSON = function(/* url, data, success */){
    var options = parseArguments.apply(null, arguments);
    options.dataType = 'json';
    return ajax(options);
};

module.exports = ajax;
