var $ = {};

$.toQueryPair = function (key, value) {
    return encodeURIComponent(String(key)) + "=" + encodeURIComponent(String(value));
};
$.ToQueryString = function (obj) {
    var result = [];
    for (var key in obj) {
        result.push($.toQueryPair(key, obj[key]));
    }
    return result.join("&");
};

(function ($) {
    /**
    * Ajax封装
    * 
    * @memberOf shangyan
    * @method  ajax
    * 
    * @param {Object} option 配置对象，如：isAsync,data,arguments,success,error,complete,timeout,contentType,dataType
    * @return {Object} ajax 返回一个ajax对象，可以abort掉
    */
    $.ajax = function (option) {
        var httpRequest,
            httpSuccess,
            timeout,
            isTimeout = false,
            isComplete = false,
            url = option.url + "?time=" + (new Date()).valueOf();
        option = {
            url: url,
            method: (option.type || "GET").toUpperCase(),
            data: option.data || null,
            arguments: option.arguments || null,

            success: option.success || function () { },
            error: option.error || function () { },
            complete: option.complete || function () { },


            isAsync: option.isAsync || true,
            timeout: option.timeout || 30000,
            contentType: option.contentType,
            dataType: option.dataType || "xml",
            getLoading: option.getLoading || false


        };
     

        if (option.data && typeof option.data === "object") {
            option.data = $.ToQueryString(option.data);
        }

        //检查ajax请求
        var httpSuccess = function (r) {
            try {
                return (!r.status && location.protocol == "file:")
                    || (r.status >= 200 && r.status < 300)
                    || (r.status == 304)
                    || (navigator.userAgent.indexOf("Safari") > -1 && typeof r.status == "undefined");
            } catch (e) {

            }
            return false;
        };
        timeout = option.timeout;

        httpRequest = new window.XMLHttpRequest();

        /**
         * @ignore
         */
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4) {
                if (!isTimeout) {
                    var o = {};
                    o.responseText = httpRequest.responseText;
                    o.responseXML = httpRequest.responseXML;
                    o.data = option.data;
                    o.status = httpRequest.status;
                    o.uri = option.url;
                    o.arguments = option.arguments;
                    if (option.dataType === 'json') {
                        try {
                            o.responseJSON = JSON.parse(httpRequest.responseText);
                        } catch (e) {
                        }
                    }
                    if (httpSuccess(httpRequest)) {
                        if (option.getLoading) {

                        }

                        option.success(option.dataType === 'json' ? o.responseJSON : o.responseText);
                    } else {
                        if (o.status === 401) {
                          
                        }
                        option.error(o);
                    }
                    option.complete(o);
                }
                isComplete = true;
                //删除对象,防止内存溢出
                httpRequest = null;
            }
        };
        if (option.getLoading) {


        }
        if (option.method === "GET") {
            if (option.data) {
                option.url += (option.url.indexOf("?") > -1 ? "&" : "?") + option.data;
                option.data = null;
            }
            httpRequest.open("GET", option.url, option.isAsync);
            httpRequest.setRequestHeader("Content-Type", option.contentType || "text/plain;charset=UTF-8");
            httpRequest.send();
        } else if (option.method === "POST") {
            httpRequest.open("POST", option.url, option.isAsync);
            httpRequest.setRequestHeader("Content-Type", option.contentType || "application/x-www-form-urlencoded;charset=UTF-8");
            httpRequest.send(option.data);
        } else {
            httpRequest.open(option.method, option.url, option.isAsync);
            httpRequest.send();
        }

        window.setTimeout(function () {
            var o;
            if (!isComplete) {
                isTimeout = true;
                o = {};
                o.uri = option.url;
                o.arguments = option.arguments;

                option.complete(o);
            }
        }, timeout);

        return httpRequest;
    };
}($));