(function (ns, $)
{
    "use strict";

    if (ns.Extensions.Handlers.VideoHandler)
        return;


    ns.Extensions.Handlers.VideoHandler = function ()
    {
        var _init = function ()
        {
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

    ns.Extensions.Extesion.addHandler("VideoHandler",
                    ns.handlerTarget.page,
                    20000,
                    null,
                    null,
                    ns.Extensions.Handlers.VideoHandler.handle,
                    ns.Extensions.Handlers.VideoHandler.dispose,
                    null);

})(User1st.Web, uf$);
