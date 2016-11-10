(function (ns, $)
{
    "use strict";

    if (ns.Extensions.Handlers.CloseDialogHandler)
        return;

    ns.Extensions.Handlers.CloseDialogHandler = function ()
    {

        var _init = function (domElement)
        {


            var tabindex = 0,
                tabbables = $(domElement).find("[tabindex]").filter(":not([tabindex='-1'])");

            if (tabbables.length === 0)
            {
                var tooltipApi = User1st.Web.getData(domElement, "tooltipApi");
                var triggerElement = tooltipApi.getTriggerElement();
                var trgElTabindex = triggerElement.getAttr("tabindex");
                tabindex = parseInt(trgElTabindex) + 1;
            }
            else
            {
                var lastTabIndex = tabbables.last().getAttr("tabindex");
                tabindex = parseInt(lastTabIndex) + 1;
            }

            var closeButton = $("<a />")
                .setAttr("href", "#")
                .addClass("tooltip-container-fake-close")
                .setAttr("tabindex", tabindex)
                .setAttr("aria-label", "close tooltip")
                .setAttr("aria-haspopup", "true")
                .setAttr("role", "link")
                .css({ "bottom": "-7px", "right": "-7px" })
                .append($("<span class='_u1st_hiddenElement' />").text("close tooltip"))
                .click($.proxy(function (ev)
                {

                    ev.preventDefault();

                    var tooltipApi = User1st.Web.getData(this.tooltipContent, "tooltipApi");
                    if (tooltipApi !== undefined)
                    {
                        tooltipApi.close();
                        User1st.Web.focus(tooltipApi.getTriggerElement());

                    }
                    return false;
                },
                {
                    closebtn: $(this),
                    tooltipContent: $(domElement)
                }))
                .bind("keydown", $.proxy(function (ev)
        	     {
        	            var keyCode = (ev.which || ev.keyCode);
        	            if (keyCode == 13 || keyCode == 32 || (keyCode == 9 && !ev.shiftKey))
        	            {
        	                ev.preventDefault();

        	                var tooltipApi = User1st.Web.getData(this.tooltipContent, "tooltipApi");

        	                if (tooltipApi !== undefined)
        	                {
        	                    tooltipApi.close();

        	                    if (options.isScreenReader || (keyCode != 9 || ev.shiftKey))
        	                        User1st.Web.focus(tooltipApi.getTriggerElement());
        	                    else
        	                    {
        	                        tooltipApi.focusAfterClose();
        	                    }
        	                }
        	                
        	                return false;
        	            }
        	        }
            	,
            	{
            	    tooltipContent: $(domElement),
            	    closeButton: closeButton
            	}),
            	true
            );

            if (options.isScreenReader)
            {
                closeButton
                .setAttr("tabindex", "0");
            }
            $(domElement).append(closeButton);
        },


        handler = {
            handle: function (container)
            {
                _init(container);
            },
            dispose: function ()
            {

            }
        }

        return handler;
    }

    ns.Extensions.Extesion.addHandler("CloseDialogHandler",
                    ns.handlerTarget.item | ns.handlerTarget.dynamicElement | ns.handlerTarget.popUp,
                    20000,
                    null,
                    null,
                    ns.Extensions.Handlers.CloseDialogHandler.handle(),
                    ns.Extensions.Handlers.CloseDialogHandler.dispose(),
                    null);

})(User1st.Web, uf$);
