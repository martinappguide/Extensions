var User1st = User1st || {};
User1st.Web = User1st.Web || {};

(function (ns, $)
{
    "use strict";

    if (ns.Extension)
        return;

    ns.Extension = function ()
    {

        var _handlers = new Array(),
            _apiFuncs = new Array(),
            _ccsRules = new Array(),
            _getHanlderByName = function (name)
            {
                var handler = null;
                for (var i = 0; i < _handlers.length; i++)
                {
                    if (_handlers[i].name.toLowerCase().trim() == name.toLowerCase().trim())
                    {
                        handler = _handlers[i];
                        break;
                    }
                }
                return handler;
            },
            _getApiFuncByName = function (name)
            {
                var func = null;
                for (var i = 0; i < _apiFuncs.length; i++)
                {
                    if (_apiFuncs[i].name.toLowerCase().trim() == name.toLowerCase().trim())
                    {
                        func = _apiFuncs[i];
                        break;
                    }
                }
                return func;
            },
            _getCSSRuleByName = function (name)
            {
                var rule = null;
                for (var i = 0; i < _ccsRules.length; i++)
                {
                    if (_ccsRules[i].name.toLowerCase().trim() == name.toLowerCase().trim())
                    {
                        rule = _ccsRules[i];
                        break;
                    }
                }
                return rule;
            },
            _log = function (message)
            {
                u1stLogger.isEnabled() && u1stLogger.warning(message);
            };

        Extension = {
            addHandler: function (name, scope, order, parameters, services, handle, dispose, device)
            {


                if (!_getHanlderByName(name))
                {
                    var handler = {
                        name: name,
                        scope: scope || ns.handlerTarget.page,
                        order: order || 20000,
                        parameters: parameters || {},
                        services: services || {},
                        handle: handle || function () { },
                        dispose: dispose || function () { },
                        device: device || ns.Extension.handlerDevice.all,
                        approved: false
                    };

                    _handlers.push(handler);
                }
                else
                {
                    _log("[Extension - addHandler] Name '" + property + "' already exists");
                }
            },
            addAPIFunction: function (name, func)
            {
                if (!_getApiFuncByName(name))
                {
                    var func =
                        {
                            name: name,
                            func: func,
                            approved : false
                        }

                    _apiFuncs.push(func);
                }
            },
            addCSSRule: function (name, selector, rules, mediaQuery)
            {
                if (!_getCSSRuleByName(name))
                {
                    var rule =
                        {
                            name: name,
                            selector: selector,
                            rules: rules,
                            mediaQuery: mediaQuery,
                            approved: false
                        }

                    _ccsRules.push(rule);
                }
            },
            getHandler: function (name)
            {
                return _getHanlderByName(name);
            },
            getAPIFunction: function (name)
            {
                return _getApiFuncByName(name);
            },
            getCSSRule: function (name)
            {
                return _getCSSRuleByName(name);
            },
            getApprovedHandlers: function ()
            {
                var approved = new Array();
                for (var i = 0; i < _handlers.length; i++)
                {
                    if (_handlers[i].approved)
                    {
                        //clone the handler without passing by reference to avoid "memory leaks" in dynamic pages
                        var clone = {
                            name: _handlers[i].name,
                            scope: _handlers[i].scope,
                            order: _handlers[i].order,
                            parameters: _handlers[i].parameters,
                            services: _handlers[i].services,
                            handle: _handlers[i].handle,
                            dispose: _handlers[i].dispose,
                            device: _handlers[i].device,
                            approved: true
                        }
                        approved.push(clone);
                    }
                }

                return approved;
            },
            getApprovedAPIFunctions: function ()
            {
                var approved = new Array();
                for (var i = 0; i < _apiFuncs.length; i++)
                {
                    if (_apiFuncs[i].approved)
                    {
                        //clone the function without passing by reference to avoid "memory leaks" in dynamic pages
                        var clone = {
                            name: _apiFuncs[i].name,
                            func: _apiFuncs[i].func,
                            approved: true
                        }
                        approved.push(clone);
                    }
                }

                return approved;
            },
            getApprovedCSSRules: function ()
            {
                var approved = new Array();
                for (var i = 0; i < _ccsRules.length; i++)
                {
                    if (_ccsRules[i].approved)
                    {
                        //clone the function without passing by reference to avoid "memory leaks" in dynamic pages
                        var clone = {
                            name: _ccsRules[i].name,
                            selector: _ccsRules[i].selector,
                            rules: _ccsRules[i].rules,
                            mediaQuery: _ccsRules[i].mediaQuery,
                            approved: true
                        }
                        approved.push(clone);
                    }
                }

                return approved;
            },
            approveHandler: function (name)
            {
                var h = _getHanlderByName(name);
                if (h) h.approved == true;
            },
            approveAPIFunction: function (name)
            {
                var a = _getApiFuncByName(name);
                if (a) a.approved == true;
            },
            approveCSSRule: function (name)
            {
                var c = _getCSSRuleByName(name);
                if (c) c.approved == true;
            },
            applyHandlers: function ()
            {
                for (var i = 0; i < _handlers.length; i++)
                {
                    if (_handlers[i].approved)
                    {
                        ns.Handlers.manager.registerHandler(
                        {
                            name: _handlers[i].name,
                            scope: _handlers[i].scope,
                            order: _handlers[i].order,
                            parameters: _handlers[i].parameters,
                            services: _handlers[i].services,
                            handle: _handlers[i].handle,
                            dispose: _handlers[i].dispose
                        });
                    }
                }
            },
            applyAPIFunctions: function ()
            {
                for (var i = 0; i < _apiFuncs.length; i++)
                {
                    if (_apiFuncs[i].approved)
                    {
                        User1st.Web.executeScriptsAPI.utilities.register(_apiFuncs[i].name, _apiFuncs[i].func);
                    }
                }
            },
            applyCSSRules: function ()
            {
                for (var i = 0; i < _ccsRules.length; i++)
                {
                    if (_ccsRules[i].approved)
                    {
                        User1st.Web.executeScriptsAPI.addCSSRule(_ccsRules[i].name, _ccsRules[i].selector, _ccsRules[i].rules, _ccsRules[i].mediaQuery);
                    }
                }
            },
            applyAll: function ()
            {
                ns.Extension.applyHandlers();
                ns.Extension.applyAPIFunctions();
                ns.Extension.applyCSSRules();
            }
        };
        return Extension;
    };

    ns.Extension.Handlers = {};
    ns.Extension.API = {};
    ns.Extension.CSS = {};

    ns.Extension.handlerDevice =
    {
        all: 1,
        desktop: 2,
        tablet: 4,
        mobile: 8
    };
    
})(User1st.Web, uf$);