# User1st API Extensions

<p>
User1st is the most robust & effective product for digital accessibility. User1st Accessibility Suite provides solutions to monitor and modify your website to support diverse disability needs. User1st Accessibility Suite adheres to the internationally accepted standard of the Web Content Accessibility Guidelines (WCAG) 2.0 AA. User1st’s proprietary platform gives web accessibility specialists, webmasters and content managers a unique set of tools to enable their teams to achieve and sustain the recommendations of the WCAG 2.0 AA.</p>

<p>The project “Extensions” allows extending of User1st accessibility suite. 

</p>

<h3>What inside</h3>
<p>User1st gives possibility to extend the Accessibility Suite by three options: creation of new handlers, registration of new Suite's functions and setting custom CSS rules.</p>


<h3>How to add extensions</h3>

<ul>
  <li>
    Every extension element should be placed inside appropriate namespace 
: User1st.Web.Extesion.Handlers for handlers, User1st.Web.Extesion.Handlers.API for API functions, User1st.Web.Extesion.CSS for custom CSS rules

  </li>
  <li>Extension common template is:
    <pre><code class="language-javascript">
    (function (ns, $)<br />
    {
       "use strict";
	
	    // place code here		

    })(User1st.Web, uf$);

    </code></pre>
  </li>
  <li>
  Use <code class="language-javascript">User1st.Web.Extesion.addHandler(name, scope, order, parameters, services, handle, dispose, device)</code> to apply a handler to Extensions: 
  <ul>
    <li>Name – unique name of the handler</li>
    <li>Scope – action scope of the handler, could be page, item , dynamicElement or popup, the values are located in User1st.Web.handlerTarget enumeration</li>
    <li>Order – priority of the handler</li>
    <li>Parameters – additional parameters that will be used in the handler</li>
    <li>Services – data services that will be used in the handler</li>
    <li>Handle – handle function to initiate the handler</li>
    <li>Dispose – function for the Handler destroy</li>
    <li>Device – target device of the handler. The value could be all, desktop, tablet, mobile; the values are located User1st.Web. Extensions.handlerDevice enumeration</li>
  </ul>
  </li>
 <li>
  Use <code class="language-javascript">User1st.Web.Extesion.addAPIFunction(name, func)</code> to apply an API function to Extensions: 
  <ul>
    <li>Name – unique name of the function</li>
    <li>Func – inline function. The function will be called using the following syntax inside the mapping scripts: <code class="language-javascript">api.utilities.name(…)</code></li>
    </ul>
  </li>
  <li>
  Use <code class="language-javascript">User1st.Web.Extesion.addCSSRule(name, selector, rules, mediaQuery) </code> to apply a custom CSS rule to Extensions: 
  <ul>
    <li>Name – unique name of the CSS rule</li>
    <li>Selector – CSS selector or selectors to define the targets of the rules</li>
    <li>Rules – CSS rules body</li>
    <li>MediaQuery – CSS media queries</li>
    </ul>
  </li>
  <li>All extensions aren't applied automatically and should be approved by website administrators</li>
</ul>
<h3>Browsers & Devices support</h3>
<ul>
    <li>Handlers should support 3 last version of the most popular browsers on specific device(s)</li>
    <li>API functions and CSS rules should support 3 last version of the most popular browsers on all popular devices</li>
    <li>All extensions should be tested with the modern Screen readers such as Jaws, NVDA, Voice over</li>
</ul>

	

