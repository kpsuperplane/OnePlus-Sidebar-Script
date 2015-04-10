// ==UserScript==
// @name         OnePlus Forum Sidebar
// @namespace    *.oneplus.net*
// @version      2.7.4
// @description  Useful sidebar addon for the OnePlus forum! :)
// @author       Mikasa Ackerman aka Kallen, Kevin Pei aka kp1234, Sam Prescott aka sp99, awkward_potato
// @include      *forums.oneplus.net*
// @grant        none
// @license      MIT License; http://opensource.org/licenses/MIT
// ==/UserScript==
//ADD JQUERY SCRIPT ADAPTED FROM https://gist.github.com/eristoddle/4440713
sidebarVersion = GM_info.script.version;
function addJQuery(callback) {
    //Checks width for mobiles etc
    if ( $( document ).width() > 850){
        $('<style type="text/css"></style').text('.emoji-active{background:#EEE !important;color:#333 !important;font-weight:bold !important;}#emojis-top a{display: inline-block;padding: 5px 10px 5px;border-radius: 5px;margin-right: 5px;text-decoration: none;}#emojis-top a:hover {background: #EEE;}.mceSmilieSprite{display:inline-block;margin-right:5px;margin-bottom:5px;height:25px;width:auto;transform:scale(1);-webkit-transform:scale(1);transition:200ms;}#emojis .mceSmilieSprite:hover{transform:scale(1.3);-webkit-transform:scale(1.3);}.mceSmilieSprite img{display:inline-block;margin:0px;padding:0px;height:100%;width:auto;}.xenOverlay .xenForm.animateClose{-webkit-transition:300ms cubic-bezier(0.215,.61,.355,1);transition:300ms cubic-bezier(0.215,.61,.355,1);opacity:0;-webkit-transform: scale(0.9,0.9);transform: scale(0.9,0.9);}.xenOverlay .xenForm.animateClose.open{opacity:1;-webkit-transform: scale(1,1);transform: scale(1,1);}.xenOverlay .xenForm{border-radius:3px;box-shadow:0px 0px 600px #000;border-style:none;background:#151515 !important;}.xenOverlay .formOverlay .heading {color: #FFF;background: transparent;padding-left: 0px;border-style:none;}.sidebar{position:absolute;right:0px;}.sidebar.fixed{position:fixed;top:80px;box-sizing:border-box;}.custom-inner li{padding-top:16px;}.custom-inner li:first-child{padding-top: 0px;}.sidebar .section h3{padding:0px;padding-bottom:0px !important;cursor:pointer; color:#000 !important;}.sidebar .section h3 a{color:#000 !important;}#create-thread-button .inner{margin-bottom:30px;}.sidebar .section h3 a:hover{text-decoration:none;}#widget-11 .widget_header_small:hover, #widget-12 .widget_header_small:hover{text-decoration:underline;}#create-thread-button .inner{margin-bottom:30px;}.sidebar .widget .section .secondaryContent{padding: 8px 0px 14px 0px;}.sidebar .section .widget{padding:8px 0px 14px 0px;}.sidebar .section .section-wrapper{display:none;padding:10px 0px;}').appendTo('head');    }
    else {
        $('<style type="text/css"></style').text('.emoji-active{background:#EEE !important;color:#333 !important;font-weight:bold !important;}#emojis-top a{display: inline-block;padding: 5px 10px 5px;border-radius: 5px;margin-right: 5px;text-decoration: none;}#emojis-top a:hover {background: #EEE;}.mceSmilieSprite{display:inline-block;margin-right:5px;margin-bottom:5px;height:25px;width:auto;transform:scale(1);-webkit-transform:scale(1);transition:200ms;}#emojis .mceSmilieSprite:hover{transform:scale(1.3);-webkit-transform:scale(1.3);}.mceSmilieSprite img{display:inline-block;margin:0px;padding:0px;height:100%;width:auto;}.xenOverlay .xenForm.animateClose{-webkit-transition:300ms cubic-bezier(0.215,.61,.355,1);transition:300ms cubic-bezier(0.215,.61,.355,1);opacity:0;-webkit-transform: scale(0.9,0.9);transform: scale(0.9,0.9);}.xenOverlay .xenForm.animateClose.open{opacity:1;-webkit-transform: scale(1,1);transform: scale(1,1);}.xenOverlay .xenForm{border-radius:3px;box-shadow:0px 0px 600px #000;border-style:none;background:#151515 !important;}.xenOverlay .formOverlay .heading {color: #FFF;background: transparent;padding-left: 0px;border-style:none;}').appendTo('head');    }
    var script = document.createElement("script");
	var scriptData = callback.toString();
	var position = scriptData.indexOf("{")+1;
	scriptData = [scriptData.slice(0, position), 'var sidebarVersion = "'+sidebarVersion+'";', scriptData.slice(position)].join('');
	//
	console.log(scriptData);
    script.textContent = "(" + scriptData + ")();";
    document.body.appendChild(script);
}
function main() {
	/*!
	 * jQuery Cookie Plugin v1.4.1
	 * https://github.com/carhartl/jquery-cookie
	 *
	 * Copyright 2006, 2014 Klaus Hartl
	 * Released under the MIT license
	 */
	 !function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){function n(e){return u.raw?e:encodeURIComponent(e)}function o(e){return u.raw?e:decodeURIComponent(e)}function i(e){return n(u.json?JSON.stringify(e):String(e))}function t(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(c," ")),u.json?JSON.parse(e):e}catch(n){}}function r(n,o){var i=u.raw?n:t(n);return e.isFunction(o)?o(i):i}var c=/\+/g,u=e.cookie=function(t,c,s){if(arguments.length>1&&!e.isFunction(c)){if(s=e.extend({},u.defaults,s),"number"==typeof s.expires){var a=s.expires,d=s.expires=new Date;d.setMilliseconds(d.getMilliseconds()+864e5*a)}return document.cookie=[n(t),"=",i(c),s.expires?"; expires="+s.expires.toUTCString():"",s.path?"; path="+s.path:"",s.domain?"; domain="+s.domain:"",s.secure?"; secure":""].join("")}for(var f=t?void 0:{},p=document.cookie?document.cookie.split("; "):[],l=0,m=p.length;m>l;l++){var x=p[l].split("="),g=o(x.shift()),j=x.join("=");if(t===g){f=r(j,c);break}t||void 0===(j=r(j))||(f[g]=j)}return f};u.defaults={},e.removeCookie=function(n,o){return e.cookie(n,"",e.extend({},o,{expires:-1})),!e.cookie(n)}});
    var Konami=function(callback){var konami={addEvent:function(obj,type,fn,ref_obj){if(obj.addEventListener)
        obj.addEventListener(type,fn,false);else if(obj.attachEvent){obj["e"+type+fn]=fn;obj[type+fn]=function(){obj["e"+type+fn](window.event,ref_obj);};obj.attachEvent("on"+type,obj[type+fn]);}},input:"",pattern:"38384040373937396665",load:function(link){this.addEvent(document,"keydown",function(e,ref_obj){if(ref_obj)konami=ref_obj;konami.input+=e?e.keyCode:event.keyCode;if(konami.input.length>konami.pattern.length)
            konami.input=konami.input.substr((konami.input.length-konami.pattern.length));if(konami.input==konami.pattern){konami.code(link);konami.input="";e.preventDefault();return false;}},this);this.iphone.load(link);},code:function(link){window.location=link;},iphone:{start_x:0,start_y:0,stop_x:0,stop_y:0,tap:false,capture:false,orig_keys:"",keys:["UP","UP","DOWN","DOWN","LEFT","RIGHT","LEFT","RIGHT","TAP","TAP"],code:function(link){konami.code(link);},load:function(link){this.orig_keys=this.keys;konami.addEvent(document,"touchmove",function(e){if(e.touches.length==1&&konami.iphone.capture===true){var touch=e.touches[0];konami.iphone.stop_x=touch.pageX;konami.iphone.stop_y=touch.pageY;konami.iphone.tap=false;konami.iphone.capture=false;konami.iphone.check_direction();}});konami.addEvent(document,"touchend",function(evt){if(konami.iphone.tap===true)konami.iphone.check_direction(link);},false);konami.addEvent(document,"touchstart",function(evt){konami.iphone.start_x=evt.changedTouches[0].pageX;konami.iphone.start_y=evt.changedTouches[0].pageY;konami.iphone.tap=true;konami.iphone.capture=true;});},check_direction:function(link){x_magnitude=Math.abs(this.start_x-this.stop_x);y_magnitude=Math.abs(this.start_y-this.stop_y);x=((this.start_x-this.stop_x)<0)?"RIGHT":"LEFT";y=((this.start_y-this.stop_y)<0)?"DOWN":"UP";result=(x_magnitude>y_magnitude)?x:y;result=(this.tap===true)?"TAP":result;if(result==this.keys[0])this.keys=this.keys.slice(1,this.keys.length);if(this.keys.length===0){this.keys=this.orig_keys;this.code(link);}}}};typeof callback==="string"&&konami.load(callback);if(typeof callback==="function"){konami.code=callback;konami.load();}
                                  return konami;};
    var easter_egg = new Konami(function() {alert('Potato is proud of you. :3');});

    function filter() {
        var iframe = $('iframe.redactor_textCtrl').contents().find("body");
        var message = iframe.html();
        message = message.replace(/\[ATTACH(=full)?\](\d{1,6})\[\/ATTACH\]/igm, "<img src=\"https://forums.oneplus.net/attachments/$2\">");
        var quoteReg=/(\[QUOTE\]?[\s\S]*?\[\/QUOTE\])/igm;
        var misc = message.match(quoteReg);
        var numMisc = (misc === null) ? 0 : misc.length;
        message = message.replace(quoteReg, "▓");
        var em = [/:3&lt;3/igm, /&gt;:3/igm, /:'3/igm, 
                  /x#3/gm, /=3/gm, /8\)/gm,
                  /&gt;:\(/gm, /:poop:/igm, /X\)/igm,
                  /}:\(/igm, /:\|/gm, /-\.-/igm,
                  /:\\/gm, /(\:\/)(?![\/])/gm, /:'\(/gm,
                  /:o(?![\w\d])/gm, /D:/gm, /:O/gm,
                  /X\(/igm, /\\o\//igm, /o\/(?![\w\d])/igm, 
                  /\\o(?![\w\d])/igm, /&gt;_&lt;/igm, /B\)/gm, 
                  /&lt;3/gm, /;3/gm,/:3/gm,
                  /-_-/gm];
        var li = ['<img src="http://i.imgur.com/esFvxar.png">','<img src="http://i.imgur.com/77QKaCF.png">', '<img src="http://i.imgur.com/3xmvLQB.png">',
                  '<img src="http://i.imgur.com/uQKnAHL.png">', '<img src="http://i.imgur.com/s2mnHPj.png">', '<img src="http://i.imgur.com/U7sQeeB.png">',
                  ':mad:', '<img src="http://i.imgur.com/FDP39zz.png">', '<img src="http://i.imgur.com/X9SqjQ2.png">',
                  '<img src="http://i.imgur.com/I3AS64C.png">', '<img src="http://i.imgur.com/JICfIFj.png">', '<img src="http://i.imgur.com/FytXaEh.png">',
                  '<img src="http://i.imgur.com/rrekvUn.png">', '<img src="http://i.imgur.com/rrekvUn.png">', '<img src="http://i.imgur.com/KwDoZ9A.png">',
                  '<img src="http://i.imgur.com/qOtWwcH.png">', '<img src="http://i.imgur.com/G3w9kef.png">', '<img src="http://i.imgur.com/pQpnv0k.png">',
                  '<img src="http://i.imgur.com/AOKKQP1.png">', '<img src="http://i.imgur.com/ynah5l8.png">', '<img src="http://i.imgur.com/QRr7pgi.png">',
                  '<img src="http://i.imgur.com/QRr7pgi.png">', '<img src="http://i.imgur.com/mU1RKXd.png">', '<img src="http://i.imgur.com/5fC1h4r.png">',
                  '<img src="http://i.imgur.com/817AGU4.png">', '<img src="http://i.imgur.com/aEIFMOD.png">', '<img src="http://i.imgur.com/xQEgir2.png">',
                  '<img src="http://i.imgur.com/FytXaEh.png">'
                 ];
        console.log(message);
        for(x=0;x<em.length;x++){
            message = message.replace(em[x], li[x]);
            console.log(message);
        }

        for (var i = 0; i < numMisc; i++) {
            message = message.replace(/▓/im, misc[i]);
        }
        iframe.html(message);   
    }
    function attToImg(){
        var att = $("a:contains('View attachment')");
        for(var i = 0; i<att.length;i++){
            var a = att[i].toString();
            console.log(a);
            var a2 = $("a[href='"+a+"']");
            a2.replaceWith("<img src="+a+">");
        }
    }
    function update(manual) {
        var re;
        $.ajax({
            type : 'GET',
            url : 'https://forums.oneplus.net/threads/tool-oneplus-forum-sidebar-mod.208545/#post-8332926',
            success : function (data) {
                var ver2 = data.match(/\d\.\d\.\d/i);
                var v1 = sidebarVersion.toString().split(".");
                var v2 = ver2[0].split(".");
                console.log(v1);
                console.log(v2);
                for(y=0;y<v2.length;y++){
                    v2[y] = parseInt(v2[y]);
                    v1[y] = parseInt(v1[y]);
                }
                if (v1[0] < v2[0] || v1[1] < v2[1] || v1[2] < v2[2]) {
                    var updateText = "New version found! \nWould you like to view the release page and update?";
                    new modal('Update!', updateText, {
                        'Yes': {
                            type: 'red',
                            click: function(){
                                this.close();
                                location.href="https://github.com/kpsuperplane/OnePlus-Sidebar-Script/raw/master/sidebar.user.js";
                                setTimeout(function(){
                                    location.reload(true);
                                }, 1000);
                            }
                        },
                        'Not Now': {
                            type: 'grey',
                            click: function(){
                                this.close();
                            }
                        }
                    });
                }else{
                    if(manual){
                        new modal('No New Updates Found', updateText, {
                            'Ok': {
                                type: 'red',
                                click: function(){
                                    this.close();
                                }
                            }
                        });
                    }
                }
            }
        });
    }

    function modal(title, content, btns){
        var overlayObj = $('<div style="position: fixed;margin: auto;top: 0;left: 0;width: 100%;height: 100%;z-index: 209998;opacity: 0.9;filter: alpha(opacity=90);background-color: rgb(255,255,255);"></div>');
        var modalObj = $('<div class="xenOverlay" style="display: block;position: fixed;left: 50%;width: 600px;z-index:209999;margin-left: -300px;top: 50%;height: auto;"><form class="formOverlay xenForm animateClose"><div class="heading" id="redactor_modal_header">'+title+'</div><div id="redactor_modal_inner"><dl class="ctrlUnit"><div class="modal-inner-content"></div></dl><dl class="ctrlUnit submitUnit modal-btn-wrapper"></dl></div></form></div>');
        modalObj.find('.modal-inner-content').append(content);
        var modalMethods = {
            close: function(){
                modalObj.find('.xenForm').removeClass('open').delay(300).hide(1, function(){
                    modalObj.remove();
                });
                overlayObj.fadeOut(300, function(){
                    overlayObj.remove();
                });
            },
            add: function(data){
                modalObj.find('.modal-inner-content').append(data);
            }
        };
        this.methods = modalMethods;
        $.each(btns, function(index, value) {
            var btn = $('<button class="redactor_modal_btn button" style="margin-right:5px;">'+index+'</button>');
            if(value.type == "red"){
                btn.addClass('primary');
            }
            modalObj.find('.modal-btn-wrapper').append(btn);
            btn.click(function(e){
                e.preventDefault();
                btns[index].click.call(modalMethods);
            });
        });
        modalObj.appendTo('body');
        modalObj.css('margin-top', -modalObj.outerHeight()/2);
        overlayObj.hide().appendTo('body').fadeIn(300);
        modalObj.find('.xenForm').addClass('open');
    }
    function quickPM(user) {
        var pm_title = $('<input id="title" class="textCtrl" type="text" style="width:50%;"/><br>');
        var pm_msg = $('<textarea id="message" class="textCtrl" style="height: 100px;resize: none;display:block;width:100%;"></textarea>');
        var sendMsg = $('<div>Subject: </div>');
        sendMsg.append(pm_title);
        sendMsg.append('<br><br>Message:');
        sendMsg.append(pm_msg);
        new modal('QUICK PM', sendMsg, {
            'Send Message': {
                type: 'red',
                click: function(){
                    this.close();
                    console.log(pm_msg.val().replace('<br>', '\n'));
                    var url = 'https://forums.oneplus.net/conversations/add';
                    var token = document.getElementsByName('_xfToken')[0].getAttribute('value');
                    var msgTitle = pm_title.val();
                    var msg = pm_msg.val().replace('\n', '<br>');
                    $.get('/conversations/add', function(data) {
                        $.post('/conversations/insert', {
                            recipients: user,
                            title: msgTitle,
                            message_html: msg,
                            last_date: Date.now(),
                            last_known_date: Date.now(),
                            xfRelativeResolver: url,
                            _xfToken: token,
                            _xfRequestUri: url.replace("https://forums.oneplus.net", ""),
                            _xfNoRedirect: 1,
                            _xfResponseType: "json"
                        });
                    });
                }
            },
            'Cancel': {
                type: 'grey',
                click: function(){
                    this.close();
                }
            }
        });
    }

    //Emoji
    if ($('input[value="Post Reply"]').length > 0 || $('input[value="Reply to Conversation"]').length > 0 || $('input[value="Reply to Thread"]').length > 0 || $('input[value="Create Thread"]').length > 0) {
        var iframe = $('iframe.redactor_textCtrl').contents().find("body");

        var c = [
            'http://i.imgur.com/s2mnHPj.png','http://i.imgur.com/xQEgir2.png','http://i.imgur.com/uQKnAHL.png','http://i.imgur.com/77QKaCF.png','http://i.imgur.com/aEIFMOD.png',
            'http://i.imgur.com/3xmvLQB.png','http://i.imgur.com/9woDg2j.png','http://i.imgur.com/j8kVjQx.png','http://i.imgur.com/Osrk8Z6.png','http://i.imgur.com/PLXyQoG.png',
            'http://i.imgur.com/Wt6Mt5Y.png','http://i.imgur.com/coW4gmv.png','http://i.imgur.com/U7sQeeB.png','http://i.imgur.com/SOIm2QI.png','http://i.imgur.com/1CQnfI4.png',
            'http://i.imgur.com/n0LxE67.png','http://i.imgur.com/0vO27Us.png','http://i.imgur.com/NJ6VaZd.png','http://i.imgur.com/Iz9dIeF.png','http://i.imgur.com/SCcL49G.png',
            'http://i.imgur.com/jJz11mk.png','http://i.imgur.com/JKsX6sA.png','http://i.imgur.com/TE23JDQ.png','http://i.imgur.com/Z6rEbOj.png','http://i.imgur.com/7x4vE57.png',
            'http://i.imgur.com/4kuBhCa.png','http://i.imgur.com/5ySsWCx.png','http://i.imgur.com/oGC5iz9.png','http://i.imgur.com/mlVCJNQ.png','http://i.imgur.com/exbEJw6.png',
            'http://i.imgur.com/XtcLVi8.png','http://i.imgur.com/oXnPJzK.png','http://i.imgur.com/7nQzs1N.png','http://i.imgur.com/C35tWRr.png','http://i.imgur.com/dTeca6e.png',
            'http://i.imgur.com/kz4sU6E.png','http://i.imgur.com/dXV0bPZ.png','http://i.imgur.com/jpgBiOo.png','http://i.imgur.com/e1rc3vr.png','http://i.imgur.com/Pq6xcYg.png',
            'http://i.imgur.com/hO7m9ga.png'];

        var h = [
            //hangouts
            'http://i.imgur.com/vpOXVGK.png','http://i.imgur.com/Y1vZjiX.png','http://i.imgur.com/qPVDTQ9.png','http://i.imgur.com/zkaTlAd.png','http://i.imgur.com/scUISw8.png',
            'http://i.imgur.com/xp1jqJf.png','http://i.imgur.com/4Kn0YBJ.png','http://i.imgur.com/hK8EFTv.png','http://i.imgur.com/X9SqjQ2.png','http://i.imgur.com/aYRlrHV.png',
            'http://i.imgur.com/I3AS64C.png','http://i.imgur.com/kJJNiwZ.png','http://i.imgur.com/fKAFbm0.png','http://i.imgur.com/JICfIFj.png','http://i.imgur.com/FytXaEh.png',
            'http://i.imgur.com/rrekvUn.png','http://i.imgur.com/ad6HSLi.png','http://i.imgur.com/ER0gWHb.png','http://i.imgur.com/1wkDeWB.png','http://i.imgur.com/KwDoZ9A.png',
            'http://i.imgur.com/ovqPLQn.png','http://i.imgur.com/qOtWwcH.png','http://i.imgur.com/mU1RKXd.png','http://i.imgur.com/x0pychj.png','http://i.imgur.com/u1WHrgx.png',
            'http://i.imgur.com/G3w9kef.png','http://i.imgur.com/HzTxh21.png','http://i.imgur.com/dFUn4OG.png','http://i.imgur.com/ejes95e.png','http://i.imgur.com/OwA33Zb.png',
            'http://i.imgur.com/kmvVMTC.png','http://i.imgur.com/AX9Rut8.png','http://i.imgur.com/pQpnv0k.png','http://i.imgur.com/pf4L6gk.png','http://i.imgur.com/AOKKQP1.png',
            'http://i.imgur.com/WAaoHfp.png','http://i.imgur.com/GmMXwZB.png','http://i.imgur.com/XPVBoet.png','http://i.imgur.com/jbNBigO.png','http://i.imgur.com/817AGU4.png',
            'http://i.imgur.com/sCKxAV9.png','http://i.imgur.com/vI1c2TU.png','http://i.imgur.com/vP3I9w3.png','http://i.imgur.com/pAUELjY.png','http://i.imgur.com/urJYVoa.png',
            'http://i.imgur.com/kV7PgWJ.png','http://i.imgur.com/esFvxar.png','http://i.imgur.com/zDZkc7W.png','http://i.imgur.com/5fC1h4r.png','http://i.imgur.com/TheqhpC.png',
            'http://i.imgur.com/VJnirgH.png','http://i.imgur.com/xLhnK5d.png','http://i.imgur.com/E9W6WN3.png','http://i.imgur.com/kP2djp2.png','http://i.imgur.com/Qx2wwAi.png',
            'http://i.imgur.com/WwrbsDX.png','http://i.imgur.com/Zj2aBHy.png','http://i.imgur.com/QRr7pgi.png','http://i.imgur.com/ynah5l8.png','http://i.imgur.com/TPqkjBo.png',
            'http://i.imgur.com/mXZQQyR.png','http://i.imgur.com/VOesKVE.png','http://i.imgur.com/sPrcwnI.png','http://i.imgur.com/v3eZTzx.png','http://i.imgur.com/QjrFTOo.png',
            'http://i.imgur.com/Oul1J4D.png','http://i.imgur.com/REaECno.png','http://i.imgur.com/tZD9WDu.png','http://i.imgur.com/1snuG0r.png','http://i.imgur.com/nzAP2JG.png',
            'http://i.imgur.com/j7C4Aq0.png','http://i.imgur.com/tMxIx7S.png','http://i.imgur.com/SJbR6sm.png','http://i.imgur.com/YKlOs0W.png','http://i.imgur.com/WTMNq8v.png',
            'http://i.imgur.com/GWilqh2.png','http://i.imgur.com/Bbsm9n5.png','http://i.imgur.com/pGU6x8S.png','http://i.imgur.com/FDP39zz.png','http://i.imgur.com/79VA6TT.png',
            'http://i.imgur.com/WdCtOnn.png'];

        var o1 = [
            //other1
            'http://i.imgur.com/KaCv5op.gif','http://i.imgur.com/ejU2fcF.png','http://i.imgur.com/bio1pvI.gif','http://i.imgur.com/Ltd5iU6.png','http://i.imgur.com/T4IgzTY.gif',
            'http://i.imgur.com/PbUaxYx.png','http://i.imgur.com/R8W6I0w.png','http://i.imgur.com/xG4RIrA.gif','http://i.imgur.com/rbFuPXF.gif','http://i.imgur.com/wyYOabT.gif',
            'http://i.imgur.com/S6UEbHD.gif','http://i.imgur.com/4xMO5KD.gif','http://i.imgur.com/TwFgi2c.gif','http://i.imgur.com/hbETBD0.png','http://i.imgur.com/tQ9iHT6.gif',
            'http://i.imgur.com/jomyAJ4.gif','http://i.imgur.com/1hHjhXy.gif','http://i.imgur.com/JBLi3hO.png','http://i.imgur.com/2zCelqA.gif','http://i.imgur.com/v6wvs7A.gif',
            'http://i.imgur.com/HN61JpJ.png','http://i.imgur.com/p80TRPX.gif','http://i.imgur.com/jKIo5cV.gif','http://i.imgur.com/qENwY90.gif','http://i.imgur.com/3fIiDj2.gif',
            'http://i.imgur.com/6t2Edws.png','http://i.imgur.com/QFgTdCv.gif','http://i.imgur.com/IesFNjq.gif','http://i.imgur.com/dqSaOBe.png','http://i.imgur.com/LFhYb3I.gif',
            'http://i.imgur.com/7ggKVAO.gif','http://i.imgur.com/AccmU5M.gif','http://i.imgur.com/T2CfvSd.gif','http://i.imgur.com/ueULm7y.gif','http://i.imgur.com/euU0YPC.gif',
            'http://i.imgur.com/2cgWGlH.gif','http://i.imgur.com/MPPaTyz.png','http://i.imgur.com/iy5JEtV.gif','http://i.imgur.com/ZENu745.gif','http://i.imgur.com/nfFXKjo.gif',
            'http://i.imgur.com/ebWpush.png','http://i.imgur.com/ZF06woy.gif','http://i.imgur.com/PQ46nnT.gif','http://i.imgur.com/ERHUlCz.gif','http://i.imgur.com/6RjFMle.gif',
            'http://i.imgur.com/f5T2Orb.png','http://i.imgur.com/Sjxv94d.gif','http://i.imgur.com/j79a9aH.gif','http://i.imgur.com/V5cCsWh.png','http://i.imgur.com/cMyP5ad.gif',
            'http://i.imgur.com/HCRlrTz.gif','http://i.imgur.com/UEJ07GO.gif','http://i.imgur.com/FhxkvG1.gif','http://i.imgur.com/OphqGmp.gif','http://i.imgur.com/ltpLsUw.gif',
            'http://i.imgur.com/L8qFDbk.gif','http://i.imgur.com/VdsR7Kd.gif','http://i.imgur.com/Qh7HS3l.gif','http://i.imgur.com/sR5ERGu.png','http://i.imgur.com/NSLcMn7.gif',
            'http://i.imgur.com/1goqhMM.gif','http://i.imgur.com/HrYLFFB.gif','http://i.imgur.com/Jbt4I2Z.gif','http://i.imgur.com/CKbSOtO.png','http://i.imgur.com/hd1dUWI.png',
            'http://i.imgur.com/ylaLgZg.gif','http://i.imgur.com/lYIYWaG.gif','http://i.imgur.com/OfDMTt5.gif','http://i.imgur.com/DtZamGL.gif','http://i.imgur.com/2PfclL5.gif',
            'http://i.imgur.com/mjDDoYp.png','http://i.imgur.com/AFAlTnd.gif','http://i.imgur.com/AbXv6rW.gif','http://i.imgur.com/DdGW27Z.png','http://i.imgur.com/1PWsDVr.gif',
            'http://i.imgur.com/qsn9fnc.png','http://i.imgur.com/p9FSUKE.gif','http://i.imgur.com/Uh85EFc.gif','http://i.imgur.com/WVE2soK.png','http://i.imgur.com/ynRV5zk.png',
            'http://i.imgur.com/hXawssJ.gif'];

        var o2 =[
            //other2
            'http://i.imgur.com/COG3I9X.gif','http://i.imgur.com/8Rd6nJf.gif','http://i.imgur.com/x6qX0iH.gif','http://i.imgur.com/Q3tdtjD.gif','http://i.imgur.com/9tAbXnQ.gif',
            'http://i.imgur.com/SytGnYR.gif','http://i.imgur.com/3cSjRYd.gif','http://i.imgur.com/BuSbsme.gif','http://i.imgur.com/N0ZkFjs.gif','http://i.imgur.com/UprdpYz.gif',
            'http://i.imgur.com/AcnPHLP.gif','http://i.imgur.com/Qw7gfYs.gif','http://i.imgur.com/zpFDqqL.gif','http://i.imgur.com/qaxKlZR.gif','http://i.imgur.com/HFkts5E.gif',
            'http://i.imgur.com/eb7f1gV.gif','http://i.imgur.com/7wGKDC1.gif','http://i.imgur.com/bmXjNOf.gif','http://i.imgur.com/B4LZWzN.gif','http://i.imgur.com/9vIt1FN.gif',
            'http://i.imgur.com/WV7oiuS.gif','http://i.imgur.com/lFf92El.gif','http://i.imgur.com/n2p9dM0.gif','http://i.imgur.com/9eUJPdm.gif','http://i.imgur.com/hEHocBG.gif',
            'http://i.imgur.com/76mwtQe.gif','http://i.imgur.com/WEri5K1.gif','http://i.imgur.com/MHEm5T0.gif','http://i.imgur.com/yBvrFiU.gif'];

        var s = [
            //skype
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0100-smile.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0101-sadsmile.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0102-bigsmile.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0103-cool.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0105-wink.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0106-crying.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0107-sweating.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0108-speechless.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0109-kiss.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0110-tongueout.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0111-blush.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0112-wondering.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0113-sleepy.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0114-dull.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0115-inlove.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0116-evilgrin.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0117-talking.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0118-yawn.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0119-puke.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0120-doh.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0121-angry.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0122-itwasntme.gif', 
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0123-party.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0124-worried.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0125-mmm.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0126-nerd.gif', 
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0127-lipssealed.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0128-hi.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0129-call.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0130-devil.gif', 
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0131-angel.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0132-envy.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0133-wait.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0134-bear.gif', 
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0135-makeup.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0136-giggle.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0137-clapping.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0138-thinking.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0139-bow.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0140-rofl.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0141-whew.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0142-happy.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0143-smirk.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0144-nod.gif', 
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0145-shake.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0146-punch.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0147-emo.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0148-yes.gif', 
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0149-no.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0150-handshake.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0152-heart.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0153-brokenheart.gif', 
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0154-mail.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0155-flower.gif', 
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0156-rain.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0157-sun.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0158-time.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0159-music.gif', 
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0160-movie.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0161-phone.gif', 
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0162-coffee.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0163-pizza.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0164-cash.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0165-muscle.gif', 
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0166-cake.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0167-beer.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0168-drink.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0169-dance.gif', 
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0170-ninja.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0171-star.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0174-bandit.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0175-drunk.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0176-smoke.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0177-toivo.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0178-rock.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0179-headbang.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0180-bug.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0181-fubar.gif', 
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0182-poolparty.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0183-swear.gif',
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0184-tmi.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0185-heidy.gif', 
            'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0186-myspace.gif', 'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0189-priidu.gif'];

        var blankojis = [
            'http://i.imgur.com/9LNul5R.gif','http://i.imgur.com/1jndLAj.gif','http://i.imgur.com/QHCHpHA.gif','http://i.imgur.com/1Nav1ce.gif','http://i.imgur.com/DCuXvUq.gif',
            'http://i.imgur.com/bNdMBsI.gif','http://i.imgur.com/Xbn5YEK.gif','http://i.imgur.com/1zlQ76l.gif','http://i.imgur.com/G0tSt54.gif','http://i.imgur.com/W0NqIo3.gif',
            'http://i.imgur.com/bmwWFS5.gif','http://i.imgur.com/ZhT509S.gif','http://i.imgur.com/mBjTEMY.gif','http://i.imgur.com/5HgsPXX.gif','http://i.imgur.com/W0LOdYV.gif',
            'http://i.imgur.com/WF29Jd3.gif','http://i.imgur.com/PAE1lWZ.gif','http://i.imgur.com/CVlVruI.gif','http://i.imgur.com/wYRa0l7.gif','http://i.imgur.com/BlfnwZO.gif'];

        var onion = [
            "http://emoticoner.com/files/emoticons/onion-head/admire-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/admire2-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/ahaaah-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/angel1-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/angel2-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/bad-atmosphere-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/beaten-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/beg-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/big-eye-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/bike-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/bird-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/bled1-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/bled2-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/bleeding-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/blocked-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/bsod-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/bye1-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/bye2-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/cheer1-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/cheer2-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/cheer3-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/confused-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/congrats-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/cool-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/cruch-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/crying1-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/crying2-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/crying3-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/cute1-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/cute2-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/dead-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/depressed1-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/depressed2-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/desperate1-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/desperate2-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/dong-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/dreaming-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/dying-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/eaten-alive-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/eating-me-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/embarrassed1-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/embarrassed2-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/embarrassed3-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/embarrassed4-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/evil-smile-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/expulsion-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/falling-asleep-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/freezing-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/frozen-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/full-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/ghost-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/good-job-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/good-luck-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/happy-birth-day1-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/happy-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/hate-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/hehe-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/hell-yes-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/help-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/hi-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/hot1-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/hot2-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/hypnosis-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/ill-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/info-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/innocent-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/kick-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/kicked1-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/kicked2-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/lie-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/lol2-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/lonely-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/love-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/meh-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/nonono-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/noooo-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/not-listening-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/objection-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/oh-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/payup-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/pff1-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/pff2-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/pointing-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/pretty-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/punch-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/push-up-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/relax1-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/relax2-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/robot-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/running-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/scared-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/scary-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/serenade-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/shock1-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/shock2-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/shy-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/sigh-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/silence-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/sleeping-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/smoking1-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/smoking2-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/spa-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/starving-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/steal-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/stoned-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/stress-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/studying-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/super-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/super-sayan-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/sweating-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/sweetdrop-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/tar-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/uhuhuh-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/victory-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/vomiting-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/wait-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/waiting-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/warning-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/washing-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/wet-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/wew-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/whaaat1-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/whaaat2-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/whaaat3-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/what-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/whip-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/whistling-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/woa-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/work-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/wow1-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/wow2-onion-head-emoticon.gif","http://emoticoner.com/files/emoticons/onion-head/lol1-onion-head-emoticon.gif",
            "http://emoticoner.com/files/emoticons/onion-head/yawn-onion-head-emoticon.gif"];

        var twitch = [
            "http://static-cdn.jtvnw.net/emoticons/v1/354/1.0","http://static-cdn.jtvnw.net/emoticons/v1/3792/1.0","http://static-cdn.jtvnw.net/emoticons/v1/50/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/74/1.0","http://static-cdn.jtvnw.net/emoticons/v1/9809/1.0","http://static-cdn.jtvnw.net/emoticons/v1/32035/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/9800/1.0","http://static-cdn.jtvnw.net/emoticons/v1/9801/1.0","http://static-cdn.jtvnw.net/emoticons/v1/22639/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/1905/1.0","http://static-cdn.jtvnw.net/emoticons/v1/30/1.0","http://static-cdn.jtvnw.net/emoticons/v1/86/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/1904/1.0","http://static-cdn.jtvnw.net/emoticons/v1/24/1.0","http://static-cdn.jtvnw.net/emoticons/v1/38/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/69/1.0","http://static-cdn.jtvnw.net/emoticons/v1/243/1.0","http://static-cdn.jtvnw.net/emoticons/v1/881/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/4057/1.0","http://static-cdn.jtvnw.net/emoticons/v1/27602/1.0","http://static-cdn.jtvnw.net/emoticons/v1/21/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/973/1.0","http://static-cdn.jtvnw.net/emoticons/v1/33/1.0","http://static-cdn.jtvnw.net/emoticons/v1/170/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/73/1.0","http://static-cdn.jtvnw.net/emoticons/v1/29695/1.0","http://static-cdn.jtvnw.net/emoticons/v1/1903/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/20/1.0","http://static-cdn.jtvnw.net/emoticons/v1/4339/1.0","http://static-cdn.jtvnw.net/emoticons/v1/72/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/360/1.0","http://static-cdn.jtvnw.net/emoticons/v1/30260/1.0","http://static-cdn.jtvnw.net/emoticons/v1/42/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/65/1.0","http://static-cdn.jtvnw.net/emoticons/v1/39/1.0","http://static-cdn.jtvnw.net/emoticons/v1/244/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/48/1.0","http://static-cdn.jtvnw.net/emoticons/v1/168/1.0","http://static-cdn.jtvnw.net/emoticons/v1/9802/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/32/1.0","http://static-cdn.jtvnw.net/emoticons/v1/3632/1.0","http://static-cdn.jtvnw.net/emoticons/v1/20225/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/68/1.0","http://static-cdn.jtvnw.net/emoticons/v1/30259/1.0","http://static-cdn.jtvnw.net/emoticons/v1/357/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/27301/1.0","http://static-cdn.jtvnw.net/emoticons/v1/169/1.0","http://static-cdn.jtvnw.net/emoticons/v1/90/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/15/1.0","http://static-cdn.jtvnw.net/emoticons/v1/26/1.0","http://static-cdn.jtvnw.net/emoticons/v1/9803/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/25/1.0","http://static-cdn.jtvnw.net/emoticons/v1/1902/1.0","http://static-cdn.jtvnw.net/emoticons/v1/40/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/1901/1.0","http://static-cdn.jtvnw.net/emoticons/v1/41/1.0","http://static-cdn.jtvnw.net/emoticons/v1/5248/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/5249/1.0","http://static-cdn.jtvnw.net/emoticons/v1/5250/1.0","http://static-cdn.jtvnw.net/emoticons/v1/5251/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/5252/1.0","http://static-cdn.jtvnw.net/emoticons/v1/5253/1.0","http://static-cdn.jtvnw.net/emoticons/v1/30134/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/9804/1.0","http://static-cdn.jtvnw.net/emoticons/v1/28/1.0","http://static-cdn.jtvnw.net/emoticons/v1/29/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/9805/1.0","http://static-cdn.jtvnw.net/emoticons/v1/45/1.0","http://static-cdn.jtvnw.net/emoticons/v1/44/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/13084/1.0","http://static-cdn.jtvnw.net/emoticons/v1/91/1.0","http://static-cdn.jtvnw.net/emoticons/v1/66/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/356/1.0","http://static-cdn.jtvnw.net/emoticons/v1/16/1.0","http://static-cdn.jtvnw.net/emoticons/v1/22998/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/3668/1.0","http://static-cdn.jtvnw.net/emoticons/v1/19/1.0","http://static-cdn.jtvnw.net/emoticons/v1/3412/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/27509/1.0","http://static-cdn.jtvnw.net/emoticons/v1/27/1.0","http://static-cdn.jtvnw.net/emoticons/v1/4240/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/9808/1.0","http://static-cdn.jtvnw.net/emoticons/v1/36/1.0","http://static-cdn.jtvnw.net/emoticons/v1/92/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/88/1.0","http://static-cdn.jtvnw.net/emoticons/v1/358/1.0","http://static-cdn.jtvnw.net/emoticons/v1/28328/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/47/1.0","http://static-cdn.jtvnw.net/emoticons/v1/30252/1.0","http://static-cdn.jtvnw.net/emoticons/v1/27679/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/1900/1.0","http://static-cdn.jtvnw.net/emoticons/v1/22/1.0","http://static-cdn.jtvnw.net/emoticons/v1/245/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/4338/1.0","http://static-cdn.jtvnw.net/emoticons/v1/361/1.0","http://static-cdn.jtvnw.net/emoticons/v1/9807/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/9806/1.0","http://static-cdn.jtvnw.net/emoticons/v1/87/1.0","http://static-cdn.jtvnw.net/emoticons/v1/27903/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/52/1.0","http://static-cdn.jtvnw.net/emoticons/v1/51/1.0","http://static-cdn.jtvnw.net/emoticons/v1/1906/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/355/1.0","http://static-cdn.jtvnw.net/emoticons/v1/14706/1.0","http://static-cdn.jtvnw.net/emoticons/v1/46/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/17/1.0","http://static-cdn.jtvnw.net/emoticons/v1/37/1.0","http://static-cdn.jtvnw.net/emoticons/v1/31/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/34/1.0","http://static-cdn.jtvnw.net/emoticons/v1/1899/1.0","http://static-cdn.jtvnw.net/emoticons/v1/18/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/70/1.0","http://static-cdn.jtvnw.net/emoticons/v1/7427/1.0","http://static-cdn.jtvnw.net/emoticons/v1/1898/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/67/1.0","http://static-cdn.jtvnw.net/emoticons/v1/359/1.0","http://static-cdn.jtvnw.net/emoticons/v1/171/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/49/1.0","http://static-cdn.jtvnw.net/emoticons/v1/3666/1.0","http://static-cdn.jtvnw.net/emoticons/v1/71/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/166/1.0","http://static-cdn.jtvnw.net/emoticons/v1/1896/1.0","http://static-cdn.jtvnw.net/emoticons/v1/167/1.0",
            "http://static-cdn.jtvnw.net/emoticons/v1/1897/1.0","http://static-cdn.jtvnw.net/emoticons/v1/28087/1.0","http://static-cdn.jtvnw.net/emoticons/v1/4337/1.0"]

        var emojiData = [
            {
                name: 'Regular',
                emojis: c,
            },
            {
                name: 'Hangouts',
                emojis: h,
            },
            {
                name: 'Skype',
                emojis: s,
            },
            {
                name: 'potat/chocojis',
                emojis: blankojis,
            },
            {
                name: 'onion face',
                emojis: onion,
            },
            {
                name: 'Twitchemotes',
                emojis: twitch,
            },
            {
                name: 'Other(1)',
                emojis: o1,
            }	,
            {
                name: 'Other(2)',
                emojis: o2,
            }	
        ];
        var emojis = $('<div id="emojis"></div>');
        $('.submitUnit:first').before(emojis);
        emojis = $('#emojis');
        var emojisTop = $('<div id="emojis-top" style="padding: 10px 0px 0px;"></div>'), emojisContent = $('<div style="padding:10px 0px;max-height:120px;overflow-y:auto;"></div>');
        emojis.append(emojisTop).append(emojisContent);
        $.each(emojiData, function(idx, val){
            var btn = $('<a href="javascript:void(0);">'+val.name+'</a>');
            emojisTop.append(btn);
            var cont = $('<div class="emojiContainer"></div>');
            cont.appendTo(emojisContent);
            cont.hide();
            $.each(val.emojis, function(index, emote){
                var emoji = $('<a href="javascript:void(0);" class="mceSmilieSprite"><img src="'+emote+'"/></a>');
                cont.append(emoji);
                emoji.click(function(){
                    var pp = $('iframe.redactor_textCtrl').contents().find("body").find('p').last();
                    pp.html(pp.html() + ' <img src="' + emote + '"> ');
                });	
            });
            btn.click(function(){
                $('.emoji-active').removeClass('emoji-active');
                $('.emojiContainer').hide();
                cont.show();
                btn.addClass('emoji-active');
            });
            if(idx === 0){
                btn.trigger('click');
            }
        });
        $('div.emojiContainer:eq(3) img').each(function(ii){this.style.height="40px";});
        $('div.emojiContainer:eq(4) img').each(function(ii){this.style.height="40px";});
        $('div.emojiContainer:eq(5) img').each(function(ii){this.style.height="40px";});

        $("input.primary").first().click(function (){
            filter();
        });
        var egg = $('<a href="javascript:void(0);"></a>');
        egg.click(function(){alert('Magikarp used splash but nothing happened');});
        $('#emojis-top').append(egg);

        //Rainbowify
        function tohex(decval) {
            var l, h;
            var str = "";
            l = Math.floor(decval % 16);
            h = Math.floor(decval / 16);
            if (h < 10) {
                str = "" + h;
            }
            if (h > 9) {
                switch (h) {
                    case 10:
                        str = "A";
                        break;
                    case 11:
                        str = "B";
                        break;
                    case 12:
                        str = "C";
                        break;
                    case 13:
                        str = "D";
                        break;
                    case 14:
                        str = "E";
                        break;
                    case 15:
                        str = "F";
                        break;
                    default:
                        str = "X";
                        break;
                }
            }
            if (l < 10) {
                str = str + "" + l;
            }
            if (l > 9) {
                switch (l) {
                    case 10:
                        str += "A";
                        break;
                    case 11:
                        str += "B";
                        break;
                    case 12:
                        str += "C";
                        break;
                    case 13:
                        str += "D";
                        break;
                    case 14:
                        str += "E";
                        break;
                    case 15:
                        str += "F";
                        break;
                    default:
                        str += "X";
                        break;
                }
            }
            return str;
        }

        function todec(hexval) {
            var l, h;
            hexstr = new String(hexval).toUpperCase();
            switch (hexstr.charAt(0)) {
                case "A":
                    h = 10;
                    break;
                case "B":
                    h = 11;
                    break;
                case "C":
                    h = 12;
                    break;
                case "D":
                    h = 13;
                    break;
                case "E":
                    h = 14;
                    break;
                case "F":
                    h = 15;
                    break;
                default:
                    h = eval(hexstr.charAt(0));
            }
            switch (hexstr.charAt(1)) {
                case "A":
                    l = 10;
                    break;
                case "B":
                    l = 11;
                    break;
                case "C":
                    l = 12;
                    break;
                case "D":
                    l = 13;
                    break;
                case "E":
                    l = 14;
                    break;
                case "F":
                    l = 15;
                    break;
                default:
                    l = eval(hexstr.charAt(1));
            }
            return l + 16 * h;
        }

        function hexToRGB(hexval) {
            str = new String(hexval).toUpperCase();
            if (str.charAt(0) == "#") str = str.substr(1);
            g_r = todec(str.substr(0, 2));
            g_g = todec(str.substr(2, 2));
            g_b = todec(str.substr(4, 2));
        }

        function getSFXColor(k) {
            var r, g, b, k1, min, max;
            k1 = k;
            r = 127 + 127 * Math.cos(k1 - .5);
            g = 127 + 127 * Math.cos(k1 - 2.5);
            b = 127 + 127 * Math.cos(k1 - 4.5);
            min = r;
            if (g < min) min = g;
            if (b < min) min = b;
            r -= min;
            g -= min;
            b -= min;
            max = r;
            if (g > max) max = g;
            if (b > max) max = b;
            max = 255.0 / max;
            r *= max;
            g *= max;
            b *= max;
            var tekBright = 200;
            var tekContrast = 255;
            max = (tekBright / 255) * (tekContrast / 255);
            min = (255 - tekContrast) * (tekBright / 255);
            r = r * max + min;
            g = g * max + min;
            b = b * max + min;
            if (r < 0) r = 0;
            if (g < 0) g = 0;
            if (b < 0) b = 0;
            if (r > 255) r = 255;
            if (g > 255) g = 255;
            if (b > 255) b = 255;
            g_r = r;
            g_g = g;
            g_b = b;
        }

        function setOutSizeIndicator(divtext) {
            document.getElementById("charssub").setAttribute("id", "oldsub");
            var newdiv = document.createElement("div");
            newdiv.setAttribute("id", "charssub");
            var newtext = document.createTextNode(divtext);
            newdiv.appendChild(newtext);
            document.getElementById("chars").appendChild(newdiv);
            document.getElementById("chars").removeChild(document.getElementById("oldsub"));
        }

        function preview() {}

        function MakeSFX(inputString, outputHTML) {
            var r, g, b;
            var i, j, k, l;
            var x, scale, res;
            var min, max;
            var in_tag = 0;
            var oignumi = 0;
            temp = new String("");
            var numreps = 1;
            if (numreps < 1) numreps = 1;
            if (numreps > 10) numreps = 10;
            instr = inputString;
            outstr = new String("");
            tempstr = new String("");
            res = 1;
            j = instr.length;
            scale = Math.PI * (2 * eval(numreps) - .21) / j;
            g_cstyle = 0;

            for (i = 0; i < j; i++) {
                if (instr.charAt(i) == "<") in_tag = 1;
                if (in_tag == 0) {
                    k = scale * i;
                    getSFXColor(k);
                    r = g_r;
                    g = g_g;
                    b = g_b;
                    tempstr = tohex(r) + tohex(g) + tohex(b);
                    temp = instr.charAt(i);
                    if (instr.charAt(i) == "&") {
                        for (l = i + 1; l < j; l++) {
                            if (instr.charAt(l) == " ") break;
                            if (instr.charAt(l) == "<") break;
                            if (instr.charAt(l) == ">") break;
                            if (instr.charAt(l) == ";") break;
                        }
                        if (instr.charAt(l) == ";") {
                            temp = instr.substr(i, l - i + 1);
                        }
                    }
                    if (outputHTML) {
                        if (i % res == 0) {
                            outstr = outstr + "<font color='#" + tempstr + "'>";
                            oignumi = 1;
                        }
                        outstr = outstr + temp;
                        if ((i + 1) % res == 0) {
                            outstr = outstr + "</font>";
                            oignumi = 0;
                        }
                    } else {
                        if (i % res == 0) {
                            outstr = outstr + "[color=#" + tempstr + "]";
                            oignumi = 1;
                        }
                        outstr = outstr + temp;
                        if ((i + 1) % res == 0) {
                            outstr = outstr + "[/color]";
                            oignumi = 0;
                        }
                    }
                    if (temp.length > 1) i += (temp.length - 1);
                }
                if (in_tag == 1) outstr = outstr + instr.charAt(i);
                if (instr.charAt(i) == ">") in_tag = 0;
            }
            if (oignumi > 0) {
                if (document.colorform.out_format.value == "html") outstr = outstr + "</font>";
                if (document.colorform.out_format.value == "bbc") outstr = outstr + "[/color]";
            }
            return outstr;
        }

        function UpdateRGB(ctl) {
            var lum;
            ctl.style.backgroundColor = ctl.value;
            hexToRGB(ctl.value);
            lum = .29 * g_r + .57 * g_g + .14 * g_b;
            if (lum < 96) {
                ctl.style.color = "#FFFFFF";
            } else {
                ctl.style.color = "#000000";
            }
            preview();
        }

        function flipbkg(ctl) {
            if (prevbkc == "#FFFFFF") prevbkc = "#000000";
            else prevbkc = "#FFFFFF";
            ctl.style.backgroundColor = prevbkc;
        }

        function rainbow() {
            filter();
            var iframe = $('iframe.redactor_textCtrl').contents().find("body");
            var message = iframe.html();

            message = message.replace(/(&nbsp;)/gi, ' ');

            var quotereg = /(\[QUOTE\]?[\s\S]*?\[\/QUOTE\])|(\[SPOILER\]?[\s\S]*?\[\/SPOILER\])/igm;
            var imgregex = /(\<img([\s\S]*?)\>)/igm;
            var linkregex= /(\<a([\s\S]*?)<\/a\>)/igm;
            var urlregex = /(((f|ht)tps?:\/\/)(.*?)[\S][^ @&<▓▒╗╞§>╢]+)/igm;
            var regex =/(\@(\badam kristo\b|\bHanson Lee\b|[\S][^ @&<▓▒╗╞§>╢]+))|(\[IMG\]?[\s\S]*?\[\/IMG\])|(\[MEDIA\]?[\s\S]*?\[\/MEDIA\])|(\[PHP\]?[\s\S]*?\[\/PHP\])|(\[CODE\]?[\s\S]*?\[\/CODE\])|(\[HTML\]?[\s\S]*?\[\/HTML\])|(\[COLOR\]?[\s\S]*?\[\/COLOR\])|\:P/igm;         
            var emojir = /\;\)|\:D|\:\(|8\-\)|\:\)|(\:\/)(?![\/])|(o\.O)|(O\.o)|(O_o)|(o_O)/gm;
            var quoterest = /(\[color=#[\w\d]+\]╞\[\/color\])/im;
            var imgrest = /(\[color=#[\w\d]+\]§\[\/color\])/im;
            var linkrest = /(\[color=#[\w\d]+\]╗\[\/color\])/im;
            var urlrest = /(\[color=#[\w\d]+\]▒\[\/color\])/im;
            var tagrest = /(\[color=#[\w\d]+\]▓\[\/color\])/im;
            var emojirest = /(\[color=#[\w\d]+\]╢\[\/color\])/im;
            console.log(message);
            var quotes = message.match(quotereg);
            message = message.replace(quotereg, '╞');
            console.log(message);
            var imgs = message.match(imgregex);      
            message = message.replace(imgregex, "§");
            console.log(message);
            var links = message.match(linkregex);
            message = message.replace(linkregex, "╗");
            console.log(message);
            var urls = message.match(urlregex);
            message = message.replace(urlregex, "▒");
            console.log(message);
            var misc = message.match(regex);
            message = message.replace(regex, "▓");
            console.log(message);
            var emojis = message.match(emojir);
            message = message.replace(emojir, "╢");
            console.log(message);

            message = MakeSFX(message, false);

            var numQuot = (quotes === null) ? 0 : quotes.length;
            var numImgs = (imgs === null) ? 0 : imgs.length;
            var numLink = (links === null) ? 0 : links.length;
            var numUrls = (urls === null) ? 0 : urls.length;
            var numMisc = (misc === null) ? 0 : misc.length;
            var numEmoj = (emojis === null) ? 0 : emojis.length;

            for (var a = 0 ; a < numQuot; a++) {
                message = message.replace(quoterest, quotes[a]);
                console.log(message);
            }
            for (var b = 0; b < numImgs; b++) {
                message = message.replace(imgrest, imgs[b]);
                console.log(message);
            }
            for (var c = 0; c < numLink; c++) {
                message = message.replace(linkrest, links[c]);
                console.log(message);
            }
            for (var d = 0; d < numUrls; d++) {
                message = message.replace(urlrest, /*" <a href=\"" +*/urls[d]/*+ "\">" +urls[d]+ "</a> "*/);
                console.log(message);
            }
            for (var e = 0; e < numMisc; e++) {
                message = message.replace(tagrest, misc[e]);
                console.log(message);
            }
            for (var f = 0; f < numEmoj; f++) {
                message = message.replace(emojirest, emojis[f]);
                console.log(message);
            }
            iframe.html(message);
        }

        //Add rainbow button
        if(window.location.href.indexOf("thread") > -1 || window.location.href.indexOf("conversation") > -1) {
            var rainbowfyBtn = $('&nbsp;<button class="button">Rainbowfy</button>');
            $('.submitUnit:first input[type=submit]:first').after(rainbowfyBtn);
            rainbowfyBtn.click(function(e) {
                e.preventDefault();
                rainbow();
            });
        }
    }

    //Ninja Text Viewer
    function ninja() {
        //change ninja text
        var s = document.getElementsByTagName('span');
        for (q = 0; q < s.length; q++) {
            if (s[q].style.color.indexOf("#ffffff") >= 0 || s[q].style.color.indexOf("255, 255, 255") >= 0 || s[q].style.color.indexOf("white") >= 0  || s[q].style.color.indexOf("transparent") >= 0)
            {
                s[q].style.color = '#a8a8a8';
            }
            if (s[q].style.color.indexOf("#ecebea") >= 0 || s[q].style.color.indexOf("236, 235, 234") >= 0)
            {
                s[q].style.color = '#8a8a8a';
            }
        }
    }

    if($('#newthread-category').length){
        $('#newthread-category').appendTo('#top');
    }
    //Checks width for mobiles etc
    if ( $( document ).width() > 850){
        //Sidebar
        function sidebar(title, opts) {
            var options = {
                layout: 'oneColumn',
                clicked: function(){}
            };
            $.extend(options, opts);
            this.wrapper = $('<div class="section widget-group-no-name widget-container"></div>');
            this.wrapper.append('<div class="secondaryContent widget"><h3 style="padding-bottom:0px;">' + title + '</h3><ul class="custom-inner ' + (options.layout == 'twoColumns' ? 'xenforo-list-2cols' : '') + '"></ul><div class="clearfix" style="clear:left"></div></div>');
            this.wrapper.find('h3').click(function(){
                options.clicked();
            });
            this.content = this.wrapper.find('.custom-inner');
            this.clear = function(){this.content.html('');};
            this.custom = function(html){this.content.html(html);};
            this.add = function(elem, callback) {
                this.content.append(elem);
                elem.wrap('<li></li>');
                if (typeof callback != "undefined") {
                    callback(elem);
                }
            };
            $('.sidebar .section:first').after(this.wrapper);
        }
        //Sidebar Info
        var sidebarInfo = new sidebar("Sidebar Help", {
            layout: "twoColumns"
        });
        sidebarInfo.add($('<a href="/threads/tool-oneplus-forum-sidebar-mod.208545/">Sidebar Thread</a>'));
        sidebarInfo.add($('<a href="#" onClick="return false;" id="eUpdates">Email Updates</a>'));
        sidebarInfo.add($('<a href="https://github.com/kpsuperplane/OnePlus-Sidebar-Script/releases/" target="_blank" id="updateLink">Github Releases</a>'));
        sidebarInfo.add($('<a href="https://github.com/kpsuperplane/OnePlus-Sidebar-Script/blob/v' + sidebarVersion + '/README.md">View README</a>'));
        sidebarInfo.add($('<a href="https://forums.oneplus.net/threads/tool-oneplus-forum-sidebar-mod.208545/#post-8332933">View Changelog</a>'));
        sidebarInfo.add($('<a href="https://github.com/kpsuperplane/OnePlus-Sidebar-Script/issues/new">Report an Issue</a>'));
        sidebarInfo.add($('<a href="#" onClick="return false;" id="featureRequest">Request a Feature</a>'));
        sidebarInfo.add($('<a href="#" onClick="return false;" id="vInfo">Version Info</a>'));
        sidebarInfo.add($('<a href="#" onClick="return false;" id="check">Check for updates</a>'));

        vInfo.addEventListener("click", function(){
            alert("Sidebar Version - v" + sidebarVersion);
        });

        featureRequest.addEventListener("click", function(){
            var featureForm = $('<iframe src="https://docs.google.com/forms/d/1W2xyAM3HdwdrAxhsdcSB8BefnPSa6NngRbxU-IZN37w/viewform?embedded=true" width="550" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe></center>');
            new modal('Feature Request Form', featureForm, {
                'Done': {
                    type: 'red',
                    click: function(){
                        this.close();
                    }
                }
            });		
        });

        eUpdates.addEventListener("click", function(){
            var emailForm = $('<center><iframe src="https://docs.google.com/forms/d/1NmKqdgBI-rcZviGtNawZRva1KsLUOWpP8b_kfli653E/viewform?embedded=true" width="550" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe></center>');
            new modal('Email Update Form', emailForm, {
                'Done': {
                    type: 'red',
                    click: function(){
                        this.close();
                    }
                }
            });		
        });
        if(window.location.href.indexOf("thread") == -1 && window.location.href.indexOf("conversation") == -1){
            update();
        }
        check.addEventListener("click", function(){
            update(true);
        });

        //Fan Gatherings
        var fanGather = new sidebar("Fan Gatherings", {
            layout: "twoColumns"
        });
        fanGather.add($('<a href="/threads/aussie-thread.48896/">Australia</a>'));
        fanGather.add($('<a href="/threads/club-canada.62048/">Canada</a>'));
        fanGather.add($('<a href="/threads/members-from-croatia-or-balkan.9557/">Croatia / Balkan</a>'));
        fanGather.add($('<a href="/threads/greek-fan-community.117867/">Greece</a>'));
        fanGather.add($('<a href="/threads/members-from-hungary.3057/">Hungary</a>'));
        fanGather.add($('<a href="/threads/club-india.61073/">India</a>'));
        fanGather.add($('<a href="/threads/its-our-movement-now-were-ind-one-sia-plus.14364/">Indonesia</a>'));
        fanGather.add($('<a href="/threads/members-from-ireland.1698/">Ireland</a>'));
        fanGather.add($('<a href="/threads/malaysia-opo-fan-club.23332/">Malaysia</a>'));
        fanGather.add($('<a href="/threads/member-from-poland.1699/">Poland</a>'));
        fanGather.add($('<a href="/threads/romania-fans-invites.9703/">Romania</a>'));
        fanGather.add($('<a href="/threads/opo-fans-from-singapore.35482/">Singapore</a>'));
        fanGather.add($('<a href="/threads/turkey-opo-fans.44672/">Turkey</a>'));

        //Quick Links
        var quickLinks = new sidebar("Quick Links", {
            layout: "twoColumns"
        });
        quickLinks.add($('<a href="/account/signature/">Edit Signature</a>'));
        quickLinks.add($('<a href="https://account.oneplus.net/invite/overview">View Invites</a>'));
        quickLinks.add($('<a href="/conversations/add">Start PM</a>'));
        quickLinks.add($('<a href="/account/ignored">Blocked People</a>'));
        quickLinks.add($('<a href="/account/following">Following</a>'));
        quickLinks.add($('<a href="/watched/threads">Watched Threads</a>'));
        quickLinks.add($('<a href="/account/likes">Likes Received</a>'));
        quickLinks.add($('<a href="/account/avatar">Change Avatar</a>'));
        quickLinks.add($('<a href="#" onClick="return false;" id="ninjaTextBtn">View Ninja Text</a>'));
        quickLinks.add($('<a href="javascript:void(0);">Tag mods</a>'), function(elem) {
            elem.click(function() {
                var c = confirm("This is going send many http requests and is not recommended on slow internet.");
                if(c){
                    var offline = [{id: 720, name: "@Andrew Z"}, {id: 76118, name: "@Cervantes"}, {id: 67255, name: "@elkolonel"}, {id: 4428, name: "@domifer"}, {id: 2053, name: "@Gerardo Miele"}, {id: 1404, name: "@GregOrevo"}, {id: 1141, name: "@Hanson Lee"}, {id: 190760, name: "@kovalski"}, {id: 5675, name: "@moonwitch"}, {id: 4219, name: "@NeverSettle"}, {id: 139254, name: "@mcsememo"}, {id: 1039, name: "@Noel"}, {id: 11608, name: "@pizdek"}, {id: 1580, name: "@puma95"}, {id: 7, name: "@Robert W"}, {id: 5916, name: "@saimon"}, {id: 1678, name: "@Seijmo"}, {id: 37656, name: "@So_ony"}, {id: 15636, name: "@thepanttherlady"}, {id: 5691, name: "@Viljanteri"}];

                    var semiOffline = [{id: 15177, name: "@An.I.Am"}, {id: 8619, name: "@Garzla"}, {id: 327804, name: "@Lucy L"}, {id: 1362, name: "@muddy46"}, {id: 25387, name: "@Jevoly"}, {id: 206057, name: "@oalexander"}, {id: 24503, name: "@thedocbob"}, {id: 326, name: "@script"}, {id: 248737, name: "@ZIoTibia"}];

                    var mods = [{id: 19, name: "@Adam Krisko"}, {id: 26837, name: "@AlexGuroff"}, {id: 21293, name: "@BeAlive75"}, {id: 20674, name: "@BrettPlusOne"}, {id: 1354, name: "@Chinda"}, {id: 51241, name: "@Chris05"}, {id: 66944, name: "@Dexter Morgan"}, {id: 42948, name: "@DRCH"}, {id: 36247, name: "@drmartin"}, {id: 1507, name: "@dsmonteiro"}, {id: 6897, name: "@Fabio.Mar"}, {id: 9492, name: "@finaldentiny"}, {id: 83211, name: "@gaster"}, {id: 2587, name: "@Hige"}, {id: 29429, name: "@inffy"}, {id: 2097, name: "@izaka"}, {id: 1502, name: "@J0han"}, {id: 3594, name: "@kaptainen"}, {id: 103473, name: "@kp1234"}, {id: 4541, name: "@maccamania"}, {id: 22710, name: "@Maica"}, {id: 515, name: "@Mark Falsing"}, {id: 25748, name: "@Martin Hotmann"}, {id: 115324, name: "@Mike9966"}, {id: 1021, name: "@nguser"}, {id: 11401, name: "@nirgale"}, {id: 151804, name: "@pablofg1978"}, {id: 3187, name: "@pablomoreno"}, {id: 20124, name: "@Plenkske"}, {id: 59953, name: "@PLPeeters"}, {id: 185495, name: "@Ponds186"}, {id: 19254, name: "@Pringles"}, {id: 23345, name: "@purplesticks"}, {id: 1621, name: "@Rahul"}, {id: 645, name: "@ram gupta"}, {id: 4980, name: "@ravi4ever"}, {id: 32740, name: "@rikardo1979"}, {id: 3167, name: "@RubixRae"}, {id: 1783, name: "@Sam_in_PGH"}, {id: 41614, name: "@Sergiorodrigues1974"}, {id: 5567, name: "@Skizz"}, {id: 71200, name: "@sp99"}, {id: 981, name: "@Sparkolo"}, {id: 4701, name: "@stfsad"}, {id: 3234, name: "@Vinkel"}, {id: 2404, name: "@viraaj11"}, {id: 11423, name: "@Waterdroid"}, {id: 5826, name: "@wtfhsf"}, {id: 7504, name: "@xaser240"}, {id: 37378, name: "@youbi"}];

                    var done = 0;

                    var online = [];

                    var baseUrl1 = "https://forums.oneplus.net/members/";
                    var baseUrl2 = "/?card=1&_xfNoRedirect=1&_xfToken=";
                    var baseUrl3 = "&_xfResponseType=json";

                    function finished() {
                        var onlines = "";
                        for(var i = 0; i < online.length; i++) {
                            onlines += online[i] + " ";
                        }
                        alert(onlines + "should be online and have been inserted in your post. Go post :3");
                        $('iframe.redactor_textCtrl').contents().find("body").html($('iframe.redactor_textCtrl').contents().find("body").html() + onlines);
                    }

                    var checkDone = setInterval(function(){
                        if (done == (offline.length + mods.length + semiOffline.length)) {
                            console.log("Finished mods");
                            finished();
                            clearInterval(checkDone);
                        }
                    }, 300);

                    for (var x = 0; x < mods.length; x++) {
                        try {
                            var token = document.getElementsByName('_xfToken')[0].getAttribute('value');
                            $.get(baseUrl1 + mods[x].id + baseUrl2 + token + baseUrl3,
                                  function (data) {
                                      var ap;
                                      var name;
                                      try {
                                          ap = (data.templateHtml.match(/data-diff="(\d+)"/igm)[0].match(/\d+/igm)[0]) / 60;
                                          name = data.templateHtml.match(/dir="auto">(.*?)<\/a>/igm)[0].match(/>(.*?)</)[0];
                                          name = name.substring(1, name.length - 1);
                                          console.log("@" + name + " was seen " + (ap) + " minutes ago.");
                                          if (ap < 11) online.push("@" + name);
                                      } catch (e) {
                                          name = data.templateHtml.match(/dir="auto">(.*?)<\/a>/igm)[0].match(/>(.*?)</)[0];
                                          name = name.substring(1, name.length - 1);
                                          console.log("ERRR" + name);
                                      }
                                      done++;
                                  }
                                 );
                        } catch (e) {
                            console.log("err");
                        }
                    }

                    for (var x = 0; x < offline.length; x++) {
                        try {
                            $.get("https://forums.oneplus.net/search/member?user_id=" + offline[x].id,
                                  function (data) {
                                      var ap;
                                      var name;
                                      try {
                                          ap = (data.match(/data-diff="(\d+)"/igm)[0].match(/\d+/igm)[0]) / 60;
                                          name = data.match(/dir="auto">(.*?)<\/a>/igm)[0].match(/>(.*?)</)[0];
                                          name = name.substring(1, name.length - 1);
                                          console.log("@" + name + " was seen " + (ap) + " minutes ago.");
                                          if (ap < 11) online.push("@" + name);
                                      } catch (e) {
                                          name = data.match(/dir="auto">(.*?)<\/a>/igm)[0].match(/>(.*?)</)[0];
                                          name = name.substring(1, name.length - 1);
                                          console.log("ERRR" + name);
                                      }
                                      done++;
                                  }
                                 );
                        } catch (e) {
                            console.log("err");
                        }
                    }

                    for (var x = 0; x < semiOffline.length; x++) {
                        try {
                            $.get(baseUrl1 + semiOffline[x].id + "/recent-Content",
                                  function (data) {
                                      var ap;
                                      var name;
                                      try {
                                          ap = (data.match(/data-diff="(\d+)"/igm)[0].match(/\d+/igm)[0]) / 60;
                                          name = data.match(/dir="auto">(.*?)<\/a>/igm)[0].match(/>(.*?)</)[0];
                                          name = name.substring(1, name.length - 1);
                                          console.log("@" + name + " was seen " + (ap) + " minutes ago.");
                                          if (ap < 11) online.push("@" + name);
                                      } catch (e) {
                                          name = data.match(/dir="auto">(.*?)<\/a>/igm)[0].match(/>(.*?)</)[0];
                                          name = name.substring(1, name.length - 1);
                                          console.log("ERRR" + name);
                                      }
                                      done++;
                                  }
                                 );
                        } catch (e) {
                            console.log("err");
                        }
                    }
                }
            });
        });


        ninjaTextBtn.addEventListener("click",function(){
            ninja();
        });

        //Notifications
        var nBar = new sidebar("Notifications",{
            clicked: function(){getAlertInfo();}
        });

		//Lollipop
		var lollipopBtn = {
			wrapper: $('<form action="account/toggle-visibility" method="post" class="AutoValidator visibilityForm"><label><input type="checkbox" name="visible" value="1">Lollipop!</label></form>'),
			style : $('<style type="text/css"></style>'),
			css :'#content>.pageWidth>.pageContent {background: transparent !important;}.PageNav .scrollable {margin-top: -5px !important;padding: 5px 0px !important;}.PageNav a, .itemPageNav a {background: transparent !important;border-style: none !important;box-shadow: none !important;color: #344 !important;margin-top: -2px !important;padding: 4px !important;transition: all 200ms !important; width:19px !important; letter-spacing: 0.2px!important;font-size:12px;}body .itemPageNav a{width:auto !important;}.PageNav a.currentPage {color: rgb(235,0,40) !important;font-weight: bold !important;}.PageNav a:hover, .itemPageNav a:hover {background: rgb(235,0,40) !important;box-shadow: rgb(229, 229, 229) 0px -1px 0px 0px, rgba(0, 0, 0, 0.117647) 0px 0px 2px 0px, rgba(0, 0, 0, 0.239216) 0px 2px 4px 0px !important;color: #FFF !important;}.mainContent {background: #FFF !important;border-radius: 2px !important;box-shadow: rgb(229, 229, 229) 0px -1px 0px 0px, rgba(0, 0, 0, 0.117647) 0px 0px 2px 0px, rgba(0, 0, 0, 0.239216) 0px 2px 4px 0px !important;padding: 20px !important;}.navPopup,#AccountMenu {border-style: none !important;box-shadow: rgb(229, 229, 229) 0px -4px 0px 0px, rgba(0, 0, 0, 0.117647) 0px 0px 8px 0px, rgba(0, 0, 0, 0.239216) 0px 8px 16px 0px  !important;}.neversettle-image {background-image: none !important;}.redbutton .inner, input[type="submit"], button, .button {box-shadow: rgb(229, 229, 229) 0px -1px 0px 0px, rgba(0, 0, 0, 0.117647) 0px 0px 2px 0px, rgba(0, 0, 0, 0.239216) 0px 2px 4px 0px !important;transition: all 200ms !important;}.redbutton .inner:hover, input[type="submit"]:hover, button:hover, .button:hover {box-shadow: rgb(229, 229, 229) 0px -2px 0px 0px, rgba(0, 0, 0, 0.117647) 0px 0px 4px 0px, rgba(0, 0, 0, 0.239216) 0px 4px 8px 0px !important;}.sidebar .secondaryContent {background: transparent !important;border-style: none !important;padding: 0px !important;}.sidebar .section {border-radius: 2px !important;box-shadow: none !important;margin: 0px !important;margin-top: 20px !important;opacity: 0.8 !important;padding: 5px 10px 10px 5px !important;transition: all 200ms !important;}.sidebar .section:hover {background: #FFF !important;box-shadow: rgb(229, 229, 229) 0px -1px 0px 0px, rgba(0, 0, 0, 0.117647) 0px 0px 2px 0px, rgba(0, 0, 0, 0.239216) 0px 2px 4px 0px !important;box-sizing: content-box !important;margin-bottom: 5px !important;margin-left: -5px !important;margin-top: 15px !important;opacity: 1 !important;padding: 10px !important;}.sidebar .section:hover a {color: rgb(235,0,40) !important;}.sidebar a {color: #444 !important;transition: all 200ms !important;}.sticky-wrapper>#header-sticky, .sticky-wrapper>#header-sticky.stuck {background-color: #FFF !important;box-shadow: rgb(229, 229, 229) 0px -1px 0px 0px, rgba(0, 0, 0, 0.117647) 0px 0px 2px 0px, rgba(0, 0, 0, 0.239216) 0px 2px 4px 0px  !important;padding-bottom: 6px !important;position: fixed !important;top: 0 !important;width: 100% !important;}body {background: rgb(240, 240, 240) !important;}header {height: auto !important;}'
		};
		lollipopBtn.style.appendTo('head');
		if($.cookie('lollipop') == 'undefined'){
			$.cookie('lollipop', 'false', { expires: 60 * 1000 });
		}
		$('.col2.blockLinksList').first().append(lollipopBtn.wrapper);
		lollipopBtn.inner = lollipopBtn.wrapper.find('input').first();
		if($.cookie('lollipop') == 'false'){
			lollipopBtn.inner.prop('checked', false);
			lollipopBtn.style.html('');
		}else{
			lollipopBtn.inner.prop('checked', true);
			lollipopBtn.style.html(lollipopBtn.css);
		}
		lollipopBtn.inner.click(function(){
			if(lollipopBtn.inner.prop('checked') == false){
				$.cookie('lollipop', 'false', { expires: 60 * 1000 });
				lollipopBtn.style.html('');
			}else{
				$.cookie('lollipop', 'true', { expires: 60 * 1000 });
				lollipopBtn.style.html(lollipopBtn.css);
			} 
		});
		
        //Alert Info
        var checkAlerts=true;
        function getAlertInfo() {
            if(checkAlerts){
                nBar.clear();
                nBar.add($('<span> On first page of alerts:</span>'));
                $.get('/account/alerts?page=' + 0, function(data) {
                    var tagNum = $(data).find("h3:contains('tagged')").length;
                    var likeNum = $(data).find("h3:contains('liked')").length;
                    var quoteNum = $(data).find("h3:contains('quoted')").length;
                    var replyNum = $(data).find("h3:contains('replied')").length;
                    var startedNum = $(data).find("h3:contains('started')").length;
                    if(tagNum > 0){nBar.add($('<span> Tags: '+tagNum+'</span>'));}
                    if(likeNum > 0){nBar.add($('<span> Likes: '+likeNum+'</span>'));}
                    if(quoteNum > 0){nBar.add($('<span> Quotes: '+quoteNum+'</span>'));}
                    if(replyNum > 0){nBar.add($('<span> Replies: '+replyNum+'</span>'));}
                    if(startedNum > 0){nBar.add($('<span> Threads Started: '+startedNum+'</span>'));}
                });
            }
            checkAlerts = !checkAlerts;
        }

        //get rid of big picture if there
        if($(".sidebar img[src*='content.oneplus.net/media']").length > 0){
            var picture = new sidebar("News");
            picture.custom("<div id='picture'></div>");
            $(".sidebar img[src*='content.oneplus.net/media']").parent().parent().insertAfter($("#picture"));
        }


        //Turn attachments to images
        attToImg();        

        //Quick PM
        var pmBtn = $('<input type="button" value="Quick PM" accesskey="s" style="font-size:11px;padding:5px;height:auto;line-height:12px;margin-top:5px;" class="button PreviewButton JsOnly" href="#"  id="number[0]">');
        $('em.userTitle').after(pmBtn);
        var numb = $('input.button.PreviewButton.JsOnly').length;
        for (i = 0; i < numb; i++) {
            $('input.button.PreviewButton.JsOnly')[i].id = i;
        }
        var button = document.getElementsByClassName("button PreviewButton JsOnly");
        for (i=0; i<button.length; i++){
            button[i].addEventListener("click", function bob(){ var t = this.id; quickPM($('li.message')[t].getAttribute('data-author'));});
        }

        //Sidebar Customizations
        $('.sidebar .section .widget').each(function(){
            $(this).children('*').not('h3').wrapAll('<div class="section-wrapper"></div>');
        });
        $('.sidebar .widget .section .secondaryContent').each(function(){
            $(this).children('*').not('h3').wrapAll('<div class="section-wrapper"></div>');
        });
        $('body').on('click','.sidebar h3', function(e){
            e.preventDefault();
            $(this).next().stop().slideToggle(500, function(){
                if($(window).scrollTop() > $('#top').offset().top-40){
                    if($(window).scrollTop() + $('.sidebar')[0].scrollHeight + 160 > $(document).height() - 286){
                        $('.sidebar').removeClass('fixed').css('top', $('.mainContent').height() - $('.sidebar')[0].scrollHeight + 200);
                    }
                }
            }); 
        });
        $('#widget-11 .widget_header_small').click(function(){
            location.href = "/forums/"; 
        });
        $('#widget-11 ul.xenforo-list-2cols').append(
            "<li><a href=\"/forums/oxygenos/\">OxygenOS</a></li>"+
            "<li><a href=\"/forums/accessories/\">Accessories</a></li>"+
            "<li><a href=\"/forums/introduce-yourself/\">Introduce Yourself</a></li>");
        $('#widget-11 ul.xenforo-list-2cols li:eq(0)').after("<li><a href=\"/forums/contests/\">Contests</a></li>");
        $("#widget-11 ul.xenforo-list-2cols li:eq(7)").insertAfter($("#widget-11 ul.xenforo-list-2cols li:eq(2)"));
        $("#widget-11 ul.xenforo-list-2cols li:eq(8)").insertAfter($("#widget-11 ul.xenforo-list-2cols li:eq(5)"));
        $("#widget-11 ul.xenforo-list-2cols li:eq(8)").insertAfter($("#widget-11 ul.xenforo-list-2cols li:eq(6)"));

        $('#widget-12 .widget_header_small').click(function(){
            location.href = "/forums/#language.33"; 
        });
        $('#widget-12 ul.xenforo-list-2cols').append(
            "<li><a href=\"/forums/dansk/\">Dansk</a></li>"+
            "<li><a href=\"forums/francais/\">Français</a></li>"+
            "<li><a href=\"forums/portugues/\">Português</a></li>"+
            "<li><a href=\"forums/suomi/\">Suomi</a></li>"+
            "<li><a href=\"forums/svenska/\">Svenska</a></li>"+
            "<li><a href=\"forums/indonesia/\">Indonesia</a></li>"+
            "<li><a href=\"forums/malaysia/\">Malaysia</a></li>");
        $("#widget-12 ul.xenforo-list-2cols li:eq(6)").insertBefore($("#widget-12 ul.xenforo-list-2cols li:eq(0)"));
        $("#widget-12 ul.xenforo-list-2cols li:eq(7)").insertBefore($("#widget-12 ul.xenforo-list-2cols li:eq(3)"));
        $("#widget-12 ul.xenforo-list-2cols li:eq(7)").insertBefore($("#widget-12 ul.xenforo-list-2cols li:eq(4)"));
        $("#widget-12 ul.xenforo-list-2cols li:eq(11)").insertBefore($("#widget-12 ul.xenforo-list-2cols li:eq(5)"));
        $("#widget-12 ul.xenforo-list-2cols li:eq(12)").insertBefore($("#widget-12 ul.xenforo-list-2cols li:eq(7)"));
        
        $(window).scroll(function(){
            if($(window).scrollTop() > $('#top').offset().top-40){
                if($(window).scrollTop() + $('.sidebar')[0].scrollHeight + 160 > $(document).height() - 286){
                    $('.sidebar').removeClass('fixed').css('top', $('.mainContent').height() - $('.sidebar')[0].scrollHeight + 200);
                }else{
                    $('.sidebar').addClass('fixed').css('top', '');
                }
            }else{
                $('.sidebar').removeClass('fixed').css('top', '');
            }
        }).resize(function(){
            $('.sidebar').css('left',$('.mainContent').outerWidth()+$('#top').offset().left+10).css('max-height', $(window).height()-110);
        }).trigger('resize').trigger('scroll');
    }
}
var $ = jQuery;
addJQuery(main);
