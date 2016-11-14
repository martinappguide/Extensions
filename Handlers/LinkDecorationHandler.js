(function (ns, $)
{
    "use strict";

    if (ns.Extensions.Handlers.LinkDecorationHandler)
        return;


    ns.Extensions.Handlers.LinkDecorationHandler = function ()
    {
        var _init = function ()
        {
            
			window.setTimeout(
				function(){
					$("a").removeClass("linkDecoration");
					var activeElement = ns.getActiveElement();
					if($(activeElement).is("a"))
					{
						$(activeElement).addClass("linkDecoration");
					}						
				}, 50
			)
			
			
			
			
			$("video").each(function ()
            {
                var desc = $(this).find("track[kind='description']");
                if (desc)
                {
                    $("<div />").html(desc.attr("label")).prependTo($(this).parent());
                }
            });
        },
        handler = {
            handle: function ()
            {
                _init();
            },
            dispose: function ()
            {

            }
        };

        return handler;
    };

    ns.Extensions.Extesion.addHandler("LinkDecorationHandler",
                    ns.handlerTarget.page,
                    20000,
                    null,
                    null,
                    ns.Extensions.Handlers.LinkDecorationHandler.handle,
                    ns.Extensions.Handlers.LinkDecorationHandler.dispose,
                    null);



})(User1st.Web, uf$);
