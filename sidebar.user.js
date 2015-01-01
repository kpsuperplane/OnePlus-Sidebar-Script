// ==UserScript==
// @name         OnePlus Forum Sidebar
// @namespace    *.oneplus.net*
// @version      2.3.8
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
        $('<style type="text/css"></style').text('.xenOverlay .xenForm.animateClose{-webkit-transition:300ms cubic-bezier(0.215,.61,.355,1);transition:300ms cubic-bezier(0.215,.61,.355,1);opacity:0;-webkit-transform: scale(0.9,0.9);transform: scale(0.9,0.9);}.xenOverlay .xenForm.animateClose.open{opacity:1;-webkit-transform: scale(1,1);transform: scale(1,1);}.xenOverlay .xenForm{border-radius:3px;box-shadow:0px 0px 600px #000;border-style:none;background:#151515 !important;}.xenOverlay .formOverlay .heading {color: #FFF;background: transparent;padding-left: 0px;border-style:none;}.sidebar{position:absolute;right:0px;}.sidebar.fixed{position:fixed;top:80px;box-sizing:border-box;}.custom-inner li{padding-top:16px;}.custom-inner li:first-child{padding-top: 0px;}.sidebar .section h3{padding:0px;padding-bottom:0px !important;cursor:pointer; color:#000 !important;}.sidebar .section h3 a{color:#000 !important;}#create-thread-button .inner{margin-bottom:30px;}.sidebar .section h3 a:hover{text-decoration:none;}#widget-11 .widget_header_small:hover{text-decoration:underline;}#create-thread-button .inner{margin-bottom:30px;}.sidebar .section .widget{padding:8px 0px 14px 0px;}.sidebar .section .section-wrapper{display:none;padding:10px 0px;}').appendTo('head');
    }
    else {
        $('<style type="text/css"></style').text('.xenOverlay .xenForm.animateClose{-webkit-transition:300ms cubic-bezier(0.215,.61,.355,1);transition:300ms cubic-bezier(0.215,.61,.355,1);opacity:0;-webkit-transform: scale(0.9,0.9);transform: scale(0.9,0.9);}.xenOverlay .xenForm.animateClose.open{opacity:1;-webkit-transform: scale(1,1);transform: scale(1,1);}.xenOverlay .xenForm{border-radius:3px;box-shadow:0px 0px 600px #000;border-style:none;background:#151515 !important;}.xenOverlay .formOverlay .heading {color: #FFF;background: transparent;padding-left: 0px;border-style:none;}').appendTo('head');
    }
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}
function main() {
    function filter() {
        var iframe = document.getElementsByClassName('redactor_textCtrl')[0].contentWindow.document.getElementsByTagName('body')[0];
        var quoteReg=/(\[QUOTE\]?[\s\S]*?\[\/QUOTE\])/igm;
        var message = iframe.innerHTML;
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
        iframe.innerHTML=message;   
    }
    function update() {
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
                    var updateText = "New version found! you may need to allow popup windows\nWould you like to view the release page and update?";
                    new modal('Update!', updateText, {
                        'Yes': {
                            type: 'red',
                            click: function(){
                                this.close();
                                document.getElementById('updateLink').click();
                            }
                        },
                        'Not Now': {
                            type: 'grey',
                            click: function(){
                                this.close();
                            }
                        }
                    });
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
    if ($('input[value="Post Reply"]').length > 0 || $('input[value="Reply to Conversation"]').length > 0 || $('input[value="Reply to Thread"]').length > 0) {
        /* ------------ EMOJI TEMPLATE ------------- */
        function Emoji(source, classname) {
            $('li.smilieCategory').find('ul')
            .append($('<li></li>')
                    .append($('<img>')
                            .attr({
                                src: source,
                                'data-smilie': "yes",
                            }).addClass(classname)
                           ).addClass("Smilie")
                   );
        }
        
        /* ------------ DEFINE EMOJIS ------------- */
        function EmojiIcons(){
            var emojis = [
                //default
                'http://i.imgur.com/s2mnHPj.png', 'http://i.imgur.com/xQEgir2.png', 'http://i.imgur.com/uQKnAHL.png', 'http://i.imgur.com/77QKaCF.png', 'http://i.imgur.com/aEIFMOD.png', 
                'http://i.imgur.com/3xmvLQB.png', 'http://i.imgur.com/j8kVjQx.png', 'http://i.imgur.com/U7sQeeB.png', 'http://i.imgur.com/NJ6VaZd.png', 'http://i.imgur.com/JKsX6sA.png',
                'http://i.imgur.com/Z6rEbOj.png', 'http://i.imgur.com/7x4vE57.png', 'http://i.imgur.com/4kuBhCa.png', 'http://i.imgur.com/5ySsWCx.png', 'http://i.imgur.com/oGC5iz9.png',
                'http://i.imgur.com/mlVCJNQ.png', 'http://i.imgur.com/exbEJw6.png', 'http://i.imgur.com/XtcLVi8.png', 'http://i.imgur.com/oXnPJzK.png', 'http://i.imgur.com/7nQzs1N.png',
                'http://i.imgur.com/C35tWRr.png', 'http://i.imgur.com/dTeca6e.png', 'http://i.imgur.com/kz4sU6E.png', 'http://i.imgur.com/dXV0bPZ.png', 'http://i.imgur.com/jpgBiOo.png',
                'http://i.imgur.com/e1rc3vr.png', 'http://i.imgur.com/Pq6xcYg.png', 'http://i.imgur.com/hO7m9ga.png',
                //Xat
                ,"http://i.imgur.com/usDwzaJ.gif", "http://i.imgur.com/Pf3Hb6O.gif",
                //hangouts
                'http://i.imgur.com/xp1jqJf.png', 'http://i.imgur.com/Y1vZjiX.png', 'http://i.imgur.com/qPVDTQ9.png', 'http://i.imgur.com/zkaTlAd.png', 'http://i.imgur.com/scUISw8.png', 
                'http://i.imgur.com/4Kn0YBJ.png', 'http://i.imgur.com/hK8EFTv.png', 'http://i.imgur.com/X9SqjQ2.png', 'http://i.imgur.com/aYRlrHV.png', 'http://i.imgur.com/I3AS64C.png', 
                'http://i.imgur.com/kJJNiwZ.png', 'http://i.imgur.com/fKAFbm0.png', 'http://i.imgur.com/JICfIFj.png', 'http://i.imgur.com/FytXaEh.png', 'http://i.imgur.com/rrekvUn.png', 
                'http://i.imgur.com/ad6HSLi.png', 'http://i.imgur.com/ER0gWHb.png', 'http://i.imgur.com/1wkDeWB.png', 'http://i.imgur.com/KwDoZ9A.png', 'http://i.imgur.com/ovqPLQn.png', 
                'http://i.imgur.com/qOtWwcH.png', 'http://i.imgur.com/mU1RKXd.png', 'http://i.imgur.com/x0pychj.png', 'http://i.imgur.com/u1WHrgx.png', 'http://i.imgur.com/G3w9kef.png', 
                'http://i.imgur.com/HzTxh21.png', 'http://i.imgur.com/dFUn4OG.png', 'http://i.imgur.com/ejes95e.png', 'http://i.imgur.com/OwA33Zb.png', 'http://i.imgur.com/kmvVMTC.png', 
                'http://i.imgur.com/AX9Rut8.png', 'http://i.imgur.com/pQpnv0k.png', 'http://i.imgur.com/pf4L6gk.png', 'http://i.imgur.com/AOKKQP1.png', 'http://i.imgur.com/WAaoHfp.png', 
                'http://i.imgur.com/GmMXwZB.png', 'http://i.imgur.com/XPVBoet.png', 'http://i.imgur.com/jbNBigO.png', 'http://i.imgur.com/817AGU4.png', 'http://i.imgur.com/sCKxAV9.png', 
                'http://i.imgur.com/vI1c2TU.png', 'http://i.imgur.com/vP3I9w3.png', 'http://i.imgur.com/pAUELjY.png', 'http://i.imgur.com/urJYVoa.png', 'http://i.imgur.com/kV7PgWJ.png', 
                'http://i.imgur.com/esFvxar.png', 'http://i.imgur.com/zDZkc7W.png', 'http://i.imgur.com/5fC1h4r.png', 'http://i.imgur.com/TheqhpC.png', 'http://i.imgur.com/VJnirgH.png', 
                'http://i.imgur.com/xLhnK5d.png', 'http://i.imgur.com/E9W6WN3.png', 'http://i.imgur.com/kP2djp2.png', 'http://i.imgur.com/Qx2wwAi.png', 'http://i.imgur.com/WwrbsDX.png', 
                'http://i.imgur.com/Zj2aBHy.png', 'http://i.imgur.com/QRr7pgi.png', 'http://i.imgur.com/ynah5l8.png', 'http://i.imgur.com/TPqkjBo.png', 'http://i.imgur.com/mXZQQyR.png',
                'http://i.imgur.com/VOesKVE.png', 'http://i.imgur.com/sPrcwnI.png', 'http://i.imgur.com/v3eZTzx.png', 'http://i.imgur.com/QjrFTOo.png', 'http://i.imgur.com/Oul1J4D.png', 
                'http://i.imgur.com/REaECno.png', 'http://i.imgur.com/tZD9WDu.png', 'http://i.imgur.com/1snuG0r.png', 'http://i.imgur.com/nzAP2JG.png', 'http://i.imgur.com/j7C4Aq0.png', 
                'http://i.imgur.com/tMxIx7S.png', 'http://i.imgur.com/SJbR6sm.png', 'http://i.imgur.com/YKlOs0W.png', 'http://i.imgur.com/WTMNq8v.png', 'http://i.imgur.com/GWilqh2.png', 
                'http://i.imgur.com/Bbsm9n5.png', 'http://i.imgur.com/pGU6x8S.png', 'http://i.imgur.com/FDP39zz.png', 'http://i.imgur.com/79VA6TT.png', 'http://i.imgur.com/WdCtOnn.png',
                // Other1
                'http://i.imgur.com/KaCv5op.gif', 'http://i.imgur.com/ejU2fcF.png', 'http://i.imgur.com/bio1pvI.gif', 'http://i.imgur.com/Ltd5iU6.png', 'http://i.imgur.com/T4IgzTY.gif',
                'http://i.imgur.com/PbUaxYx.png', 'http://i.imgur.com/R8W6I0w.png', 'http://i.imgur.com/xG4RIrA.gif', 'http://i.imgur.com/rbFuPXF.gif', 'http://i.imgur.com/wyYOabT.gif',
                'http://i.imgur.com/S6UEbHD.gif', 'http://i.imgur.com/4xMO5KD.gif', 'http://i.imgur.com/TwFgi2c.gif', 'http://i.imgur.com/hbETBD0.png', 'http://i.imgur.com/tQ9iHT6.gif', 
                'http://i.imgur.com/jomyAJ4.gif', 'http://i.imgur.com/1hHjhXy.gif', 'http://i.imgur.com/JBLi3hO.png', 'http://i.imgur.com/2zCelqA.gif', 'http://i.imgur.com/v6wvs7A.gif',
                'http://i.imgur.com/HN61JpJ.png', 'http://i.imgur.com/p80TRPX.gif', 'http://i.imgur.com/jKIo5cV.gif', 'http://i.imgur.com/qENwY90.gif', 'http://i.imgur.com/3fIiDj2.gif', 
                'http://i.imgur.com/6t2Edws.png', 'http://i.imgur.com/QFgTdCv.gif', 'http://i.imgur.com/IesFNjq.gif', 'http://i.imgur.com/dqSaOBe.png', 'http://i.imgur.com/LFhYb3I.gif',
                'http://i.imgur.com/7ggKVAO.gif', 'http://i.imgur.com/AccmU5M.gif', 'http://i.imgur.com/T2CfvSd.gif', 'http://i.imgur.com/ueULm7y.gif', 'http://i.imgur.com/euU0YPC.gif',
                'http://i.imgur.com/2cgWGlH.gif', 'http://i.imgur.com/MPPaTyz.png', 'http://i.imgur.com/iy5JEtV.gif', 'http://i.imgur.com/ZENu745.gif', 'http://i.imgur.com/nfFXKjo.gif',
                'http://i.imgur.com/ebWpush.png', 'http://i.imgur.com/ZF06woy.gif', 'http://i.imgur.com/PQ46nnT.gif', 'http://i.imgur.com/ERHUlCz.gif', 'http://i.imgur.com/6RjFMle.gif', 
                'http://i.imgur.com/f5T2Orb.png', 'http://i.imgur.com/Sjxv94d.gif', 'http://i.imgur.com/j79a9aH.gif', 'http://i.imgur.com/V5cCsWh.png', 'http://i.imgur.com/cMyP5ad.gif', 
                'http://i.imgur.com/HCRlrTz.gif', 'http://i.imgur.com/UEJ07GO.gif', 'http://i.imgur.com/FhxkvG1.gif', 'http://i.imgur.com/OphqGmp.gif', 'http://i.imgur.com/ltpLsUw.gif',
                'http://i.imgur.com/L8qFDbk.gif', 'http://i.imgur.com/VdsR7Kd.gif', 'http://i.imgur.com/Qh7HS3l.gif', 'http://i.imgur.com/sR5ERGu.png', 'http://i.imgur.com/NSLcMn7.gif', 
                'http://i.imgur.com/1goqhMM.gif', 'http://i.imgur.com/HrYLFFB.gif', 'http://i.imgur.com/Jbt4I2Z.gif', 'http://i.imgur.com/CKbSOtO.png', 'http://i.imgur.com/hd1dUWI.png', 
                'http://i.imgur.com/ylaLgZg.gif', 'http://i.imgur.com/lYIYWaG.gif', 'http://i.imgur.com/OfDMTt5.gif', 'http://i.imgur.com/DtZamGL.gif', 'http://i.imgur.com/2PfclL5.gif',
                'http://i.imgur.com/mjDDoYp.png', 'http://i.imgur.com/AFAlTnd.gif', 'http://i.imgur.com/AbXv6rW.gif', 'http://i.imgur.com/DdGW27Z.png', 'http://i.imgur.com/1PWsDVr.gif',
                'http://i.imgur.com/qsn9fnc.png', 'http://i.imgur.com/p9FSUKE.gif', 'http://i.imgur.com/Uh85EFc.gif', 'http://i.imgur.com/WVE2soK.png', 'http://i.imgur.com/ynRV5zk.png',
                'http://i.imgur.com/hXawssJ.gif',
                // Skype
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0100-smile.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0101-sadsmile.gif",
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0102-bigsmile.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0103-cool.gif",
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0105-wink.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0106-crying.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0107-sweating.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0108-speechless.gif",
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0109-kiss.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0110-tongueout.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0111-blush.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0112-wondering.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0113-sleepy.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0114-dull.gif",
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0115-inlove.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0116-evilgrin.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0117-talking.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0118-yawn.gif",
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0119-puke.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0120-doh.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0121-angry.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0122-itwasntme.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0123-party.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0124-worried.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0125-mmm.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0126-nerd.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0127-lipssealed.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0128-hi.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0129-call.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0130-devil.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0131-angel.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0132-envy.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0133-wait.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0134-bear.gif",
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0135-makeup.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0136-giggle.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0137-clapping.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0138-thinking.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0139-bow.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0140-rofl.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0141-whew.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0142-happy.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0143-smirk.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0144-nod.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0145-shake.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0146-punch.gif",
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0147-emo.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0148-yes.gif",
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0149-no.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0150-handshake.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0152-heart.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0153-brokenheart.gif",
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0154-mail.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0155-flower.gif",
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0156-rain.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0157-sun.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0158-time.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0159-music.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0160-movie.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0161-phone.gif",
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0162-coffee.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0163-pizza.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0164-cash.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0165-muscle.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0166-cake.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0167-beer.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0168-drink.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0169-dance.gif",
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0170-ninja.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0171-star.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0174-bandit.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0175-drunk.gif",
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0176-smoke.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0177-toivo.gif",
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0178-rock.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0179-headbang.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0180-bug.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0181-fubar.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0182-poolparty.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0183-swear.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0184-tmi.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0185-heidy.gif", 
                "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0186-myspace.gif", "http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0189-priidu.gif",
                //other2
                'http://tweakimg.net/g/s/smile.gif', 'http://tweakimg.net/g/s/frown.gif', 'http://tweakimg.net/g/s/redface.gif', 'http://tweakimg.net/g/s/biggrin.gif', 
                'http://tweakimg.net/g/s/biggrin.gif', 'http://tweakimg.net/g/s/cry.gif', 'http://tweakimg.net/g/s/devil.gif', 'http://tweakimg.net/g/s/clown.gif',
                'http://tweakimg.net/g/s/wink.gif', 'http://tweakimg.net/g/s/puh2.gif', 'http://tweakimg.net/g/s/yummie.gif', 'http://tweakimg.net/g/s/shiny.gif',
                'http://tweakimg.net/g/s/heart.gif', 'http://tweakimg.net/g/s/sleephappy.gif', 'http://tweakimg.net/g/s/vork.gif', 'http://tweakimg.net/g/s/rc5.gif',
                'http://tweakimg.net/g/s/yawnee.gif', 'http://tweakimg.net/g/s/sadley.gif', 'http://tweakimg.net/g/s/coool.gif', 'http://tweakimg.net/g/s/confused.gif',
                'http://tweakimg.net/g/s/frusty.gif', 'http://tweakimg.net/g/s/nosmile2.gif', 'http://tweakimg.net/g/s/nosmile.gif', 'http://tweakimg.net/g/s/puh.gif',
                'http://tweakimg.net/g/s/kwijl.gif', 'http://tweakimg.net/g/s/shutup.gif', 'http://tweakimg.net/g/s/bonk.gif', 'http://tweakimg.net/g/s/hypocrite.gif',
                'http://tweakimg.net/g/s/worshippy.gif'];
            for(a=0;a<emojis.length;a++){
                new Emoji(emojis[a], "emoji");
            }
        }
        
        // Creates the new emoji when emoji button is clicked
        var writeEmoji = setInterval(function(){
            if($('div.redactor_smilies').is(':visible')) {
                console.log("running hfemoji");
                EmojiIcons();
                clearInterval(writeEmoji);
            }
        }, 300);
        
        $("input.primary").first().click(function (){
            filter();
        });
        
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
            var iframe = document.getElementsByClassName('redactor_textCtrl')[0];
            var message = iframe.contentWindow.document.getElementsByTagName('body')[0].innerHTML;
            
            /*if (message.indexOf("http") == -1 && message.indexOf("www") == -1 && message.indexOf("@") == -1 && message.indexOf("QUOTE") == -1 && message.indexOf("[/color]") == -1 && message.indexOf("<font color") == -1&& message.indexOf(":") == -1 && message.indexOf("[COLOR") == -1) {
                iframe.contentWindow.document.getElementsByTagName('body')[0].innerHTML = MakeSFX(message, false);
            } else {*/
            var quotereg = /(\[QUOTE\]?[\s\S]*?\[\/QUOTE\])|(\[SPOILER\]?[\s\S]*?\[\/SPOILER\])/igm;
            var imgregex = /(\<img([\s\S]*?)\>)/igm;
            var linkregex= /(\<a([\s\S]*?)<\/a\>)/igm;
            var urlregex = /(((f|ht)tps?:\/\/)(.*?)[\S][^<▓▒╗╞§>╢]+)/igm;
            var regex =/(\@(\badam kristo\b|\bHanson Lee\b|[\S]+))|(\[IMG\]?[\s\S]*?\[\/IMG\])|(\[MEDIA\]?[\s\S]*?\[\/MEDIA\])|(\[PHP\]?[\s\S]*?\[\/PHP\])|(\[CODE\]?[\s\S]*?\[\/CODE\])|(\[HTML\]?[\s\S]*?\[\/HTML\])|(\[COLOR\]?[\s\S]*?\[\/COLOR\])|\:P/igm;         
            var emojir = /\;\)|\:D|\:\(|8\-\)|\:\)|(\:\/)(?![\/])|(o\.O)|(O\.o)|(O_o)|(o_O)/gm;
            var quoterest = /(\[color=#[\w\d]+\]╞\[\/color\])/im;
            var imgrest = /(\[color=#[\w\d]+\]§\[\/color\])/im;
            var linkrest = /(\[color=#[\w\d]+\]╗\[\/color\])/im;
            var urlrest = /(\[color=#[\w\d]+\]▒\[\/color\])/im;
            var tagrest = /(\[color=#[\w\d]+\]▓\[\/color\])/im;
            var emojirest = /(\[color=#[\w\d]+\]╢\[\/color\])/im;
            
            var quotes = message.match(quotereg);
            message = message.replace(quotereg, '╞');
            var imgs = message.match(imgregex);      
            message = message.replace(imgregex, "§");
            var links = message.match(linkregex);
            message = message.replace(linkregex, "╗");
            var urls = message.match(urlregex);
            message = message.replace(urlregex, "▒");
            var misc = message.match(regex);
            message = message.replace(regex, "▓");
            var emojis = message.match(emojir);
            message = message.replace(emojir, "╢");
            
            message = MakeSFX(message, false);
            
            var numQuot = (quotes === null) ? 0 : quotes.length;
            var numImgs = (imgs === null) ? 0 : imgs.length;
            var numLink = (links === null) ? 0 : links.length;
            var numUrls = (urls === null) ? 0 : urls.length;
            var numMisc = (misc === null) ? 0 : misc.length;
            var numEmoj = (emojis === null) ? 0 : emojis.length;
            
            for (var a = 0 ; a < numQuot; a++) {
                message = message.replace(quoterest, quotes[a]);
            }
            for (var b = 0; b < numImgs; b++) {
                message = message.replace(imgrest, imgs[b]);
            }
            for (var c = 0; c < numLink; c++) {
                message = message.replace(linkrest, links[c]);
            }
            for (var d = 0; d < numUrls; d++) {
                message = message.replace(urlrest, /*" <a href=\"" +*/urls[d]/*+ "\">" +urls[d]+ "</a> "*/);
            }
            for (var e = 0; e < numMisc; e++) {
                message = message.replace(tagrest, misc[e]);
            }
            for (var f = 0; f < numEmoj; f++) {
                message = message.replace(emojirest, emojis[f]);
            }
            iframe.contentWindow.document.getElementsByTagName('body')[0].innerHTML = message;
            //}
        }
        
        //Ninja Text Viewer
        function ninja() {
            //change signature color because above changed it as well
            var c = document.getElementsByClassName('signature');
            for (d = 0; d < c.length; d++) {
                c[d].style.color = 'black';
            }
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
        
        
        //Rainbowfy Text
        if(window.location.href.indexOf("thread") > -1 || window.location.href.indexOf("conversation") > -1) {
            var rainbowfyBtn = $('&nbsp;<button class="button">Rainbowfy</button>');
            $('input[value="Post Reply"]').after(rainbowfyBtn);
            
            rainbowfyBtn.click(function(e) {
                e.preventDefault();
                rainbow();
            });
        }
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
            this.wrapper.append('<div class="secondaryContent widget" id="widget-12"><h3 style="padding-bottom:0px;">' + title + '</h3><ul class="custom-inner ' + (options.layout == 'twoColumns' ? 'xenforo-list-2cols' : '') + '"></ul><div class="clearfix" style="clear:left"></div></div>');
            this.wrapper.find('h3').click(function(){
                options.clicked();
            });
            this.content = this.wrapper.find('.custom-inner');
            this.clear = function(){this.content.html('');};
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
                        var updateText = "New version found! you may need to allow popup windows\nWould you like to view the release page and update?";
                        new modal('Update!', updateText, {
                            'Yes': {
                                type: 'red',
                                click: function(){
                                    this.close();
                                    document.getElementById('updateLink').click();
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
                        new modal('Update!', "No update found! :3", {'Close': {type: 'grey', click: function(){this.close();}}});
                    }
                }
            });
        });
        
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
        
        ninjaTextBtn.addEventListener("click",function(){
            ninja();
        });
        
        //Notifications
        var nBar = new sidebar("Notifications",{
            clicked: function(){getAlertInfo();}
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
