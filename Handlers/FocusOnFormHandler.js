(function (ns, $)
{
    "use strict";

    //ns.Extesion.Handlers namespace has be used
	if (ns.Extensions.Handlers.FocusOnFormHandler)
        return;
	
	ns.Extensions.Handlers.FocusOnFormHandler = function ()
    {

        var _init = function (options)
        {

			if (options.isKeyboardNav)
            {

				var formElement = $.find("form").first();

				if(formElement.length > 0)				
				{
					var tabbables = $(formElement).find("[tabindex]").filter(":not([tabindex='-1'])");

					if (tabbables.length != 0)
					{
						var firstTabElement = tabbables.first();
						if(firstTabElement.length > 0)
						{
							ns.focus(firstTabElement);
						}
					}
				}

			}
        },


        handler = {
            handle: function (options)
            {
                _init(options);
            },
            dispose: function ()
            {

            }
        }

        return handler;
    }

    ns.Extensions.Extesion.addHandler("FocusOnFormHandler",
                    ns.handlerTarget.Page,
                    20000,
                    null,
                    null,
                    ns.Extensions.Handlers.FocusOnFormHandler.handle,
                    ns.Extensions.Handlers.FocusOnFormHandler.dispose,
                    null);



})(User1st.Web, uf$);
