(function (ns, $)
{
    "use strict";

    //ns.Extesion.Handlers namespace hast be used

	if(ns.Extesion.Handlers.FocusAfterRefreshHandler)
	return;
	
	ns.Extesion.Handlers.FocusAfterRefreshHandler = function()
	{
			var _checkFocusStorage = function (storage, options)
			{
				var itemJson = ns.Viewstate.get(storage);

				if (itemJson)
				{
					itemJson = ns.parseEscapedJSON(itemJson)
					var selectors = [];
					for (var j = 0; j < itemJson.length; j++)
					{
						if ((!itemJson[j].condition || eval(unescape(itemJson[j].condition))) &&
							(!options || _checkForParent(itemJson[j].selectors, options.items)))
						{
							selectors.push.apply(selectors, itemJson[j].selectors);
						}
					}

					if (selectors.length > 0)
					{
						var recursion = function (value)
						{
							var isFound = false;
							for (var i = 0; i < selectors.length; i++)
							{
								var $el = $(unescape(selectors[i]));

								if ($el != undefined && $el != null && $el.length > 0)
								{
									User1st.Web.Handlers.tabIndexerKeyboard.focusOnAbsoluteElement($el);

									if (options.isKeyboardNav)
									{
										ns.serviceLocator.consumeService(ns.Consts.serviceLocator.topics.applyHighlighter, null, { element: $el });
									}

									isFound = true;
									break;
								}
							}
							if (!isFound && value > 0)
								window.setTimeout(function () { recursion(value - 1); }, 50);
						};

						recursion(60);
					}

				}
			},
			_checkForParent = function (selectors, parentselectors)
			{
				var isIn = false;
				for (var j = 0; j < parentselectors.length; j++)
				{
					var parent = ns.parseEscapedJSON(parentselectors[j].selector).selector;
					for (var i = 0; i < selectors.length; i++)
						if ($(selectors[i]).parents().find(parent).length > 0)
						{
							isIn = true; break;
						}
					if (isIn) break;
				}
				return isIn;
			}
			_init(scope, options){
					if(scope == ns.handlerTarget.page)	
						_checkFocusStorage("u1st-focusAfterRefresh");
					else	
						_checkFocusStorage("u1st-focusAfterDynamicRefresh", options);
				},
			
			handler = {
			handle: function(scope, options){
				_init(scope, options);
			},
			dispose: function(){
			}
		}
		
		return handler;
	};
	
	ns.Extensions.Extesion.FocusAfterRefreshHandler("FocusAfterRefreshHandler_Page",
                    ns.handlerTarget.page,
                    20000,
                    null,
                    null,
                    ns.Extensions.Handlers.CloseDialogHandler.handle(ns.handlerTarget.page),
                    ns.Extensions.Handlers.CloseDialogHandler.dispose(),
                    null);
					
	ns.Extensions.Extesion.FocusAfterRefreshHandler("FocusAfterRefreshHandler_Dynamic",
                    ns.handlerTarget.item | ns.handlerTarget.dynamicElement | ns.handlerTarget.popUp,
                    20000,
                    null,
                    null,
                    ns.Extensions.Handlers.CloseDialogHandler.handle,
                    ns.Extensions.Handlers.CloseDialogHandler.dispose,
                    null);

})(User1st.Web, uf$);
