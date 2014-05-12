define([], function () {
    "use strict";

    function routeManager($route) {

        function pathRegExp(path, opts) {
            var insensitive = opts.caseInsensitiveMatch,
                ret = {
                    originalPath: path,
                    regexp: path
                },
                keys = ret.keys = [];

            path = path.replace(/([().])/g, '\\$1')
                .replace(/(\/)?:(\w+)([\?\*])?/g, function (_, slash, key, option) {
                    var optional = option === '?' ? option : null;
                    var star = option === '*' ? option : null;
                    keys.push({
                        name: key,
                        optional: !!optional
                    });
                    slash = slash || '';
                    return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (star && '(.+?)' || '([^/]+)') + (optional || '') + ')' + (optional || '');
                })
                .replace(/([\/$\*])/g, '\\$1');

            ret.regexp = new RegExp('^' + path + '$', insensitive ? 'i' : '');
            return ret;
        }

        function addRoute(path, route) {
            $route.routes[path] = angular.extend({
                    reloadOnSearch: true
                },
                route,
                path && pathRegExp(path, route));

            // create redirection for trailing slashes
            if (path) {
                var redirectPath = (path[path.length - 1] == '/') ? path.substr(0, path.length - 1) : path + '/';

                $route.routes[redirectPath] = angular.extend({
                        redirectTo: path
                    },
                    pathRegExp(redirectPath, route));
            }

            return this;
        }

        function removeRoute(path) {
            delete $route.routes[path];
            delete $route.routes[path + "/"];
            return this;
        }

        return {
            addRoute: addRoute,
            removeRoute: removeRoute
        };

    }


    return ['$route', routeManager];
});
