// ==UserScript==
// @name         OnePlus Forum Sidebar
// @namespace    *.oneplus.net*
// @version      2.2.0
// @description  Useful sidebar addon for the OnePlus forum! :)
// @author       Mikasa Ackerman aka Kallen, Kevin Pei aka kp1234, Sam Prescott aka sp99, awkward_potato
// @include      *forums.oneplus.net*
// @grant        none
// @license      MIT License; http://opensource.org/licenses/MIT
// ==/UserScript==
//ADD JQUERY SCRIPT ADAPTED FROM https://gist.github.com/eristoddle/4440713
function addJQuery(callback) {
    //Checks width for mobiles etc
    if ( $( document ).width() > 850){
        $('<style type="text/css"></style').text('.emoji-active{background:#EEE !important;color:#333 !important;font-weight:bold !important;}#emojis-top a{display: inline-block;padding: 5px 10px 5px;border-radius: 5px;margin-right: 5px;text-decoration: none;}#emojis-top a:hover {background: #EEE;}.mceSmilieSprite{display:inline-block;margin-right:5px;margin-bottom:5px;height:25px;width:auto;transform:scale(1);-webkit-transform:scale(1);transition:200ms;}.mceSmilieSprite:hover{transform:scale(1.3);-webkit-transform:scale(1.3);}.mceSmilieSprite img{display:inline-block;margin:0px;padding:0px;height:100%;width:auto;}.xenOverlay .xenForm.animateClose{-webkit-transition:300ms cubic-bezier(0.215,.61,.355,1);transition:300ms cubic-bezier(0.215,.61,.355,1);opacity:0;-webkit-transform: scale(0.9,0.9);transform: scale(0.9,0.9);}.xenOverlay .xenForm.animateClose.open{opacity:1;-webkit-transform: scale(1,1);transform: scale(1,1);}.xenOverlay .xenForm{border-radius:3px;box-shadow:0px 0px 600px #000;border-style:none;background:#151515 !important;}.xenOverlay .formOverlay .heading {color: #FFF;background: transparent;padding-left: 0px;border-style:none;}.sidebar{position:absolute;right:0px;}.sidebar.fixed{position:fixed;top:80px;box-sizing:border-box;}.custom-inner li{padding-top:16px;}.custom-inner li:first-child{padding-top: 0px;}.sidebar .section h3{padding:0px;padding-bottom:0px !important;cursor:pointer; color:#000 !important;}.sidebar .section h3 a{color:#000 !important;}#create-thread-button .inner{margin-bottom:30px;}.sidebar .section h3 a:hover{text-decoration:none;}#widget-11 .widget_header_small:hover{text-decoration:underline;}#create-thread-button .inner{margin-bottom:30px;}.sidebar .section .widget{padding:8px 0px 14px 0px;}.sidebar .section .section-wrapper{display:none;padding:10px 0px;}').appendTo('head');
    }
    else {
        $('<style type="text/css"></style').text('.emoji-active{background:#EEE !important;color:#333 !important;font-weight:bold !important;}#emojis-top a{display: inline-block;padding: 5px 10px 5px;border-radius: 5px;margin-right: 5px;text-decoration: none;}#emojis-top a:hover {background: #EEE;}.mceSmilieSprite{display:inline-block;margin-right:5px;margin-bottom:5px;height:25px;width:auto;transform:scale(1);-webkit-transform:scale(1);transition:200ms;}.mceSmilieSprite:hover{transform:scale(1.3);-webkit-transform:scale(1.3);}.mceSmilieSprite img{display:inline-block;margin:0px;padding:0px;height:100%;width:auto;}.xenOverlay .xenForm.animateClose{-webkit-transition:300ms cubic-bezier(0.215,.61,.355,1);transition:300ms cubic-bezier(0.215,.61,.355,1);opacity:0;-webkit-transform: scale(0.9,0.9);transform: scale(0.9,0.9);}.xenOverlay .xenForm.animateClose.open{opacity:1;-webkit-transform: scale(1,1);transform: scale(1,1);}.xenOverlay .xenForm{border-radius:3px;box-shadow:0px 0px 600px #000;border-style:none;background:#151515 !important;}.xenOverlay .formOverlay .heading {color: #FFF;background: transparent;padding-left: 0px;border-style:none;}').appendTo('head');
    }
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}
function main() {
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
        var iframe = document.getElementsByClassName('redactor_textCtrl')[0].contentWindow.document.getElementsByTagName('body')[0];
        var c = [
            {'src':'http://i.imgur.com/s2mnHPj.png'},
            {'src':'http://i.imgur.com/xQEgir2.png'},
            {'src':'http://i.imgur.com/uQKnAHL.png'},
            {'src':'http://i.imgur.com/77QKaCF.png'},
            {'src':'http://i.imgur.com/aEIFMOD.png'},
            {'src':'http://i.imgur.com/3xmvLQB.png'},
            
            {'src':'http://i.imgur.com/j8kVjQx.png'},
            {'src':'http://i.imgur.com/Osrk8Z6.png'},
            {'src':'http://i.imgur.com/PLXyQoG.png'},
            {'src':'http://i.imgur.com/Wt6Mt5Y.png'},
            {'src':'http://i.imgur.com/coW4gmv.png'},
            {'src':'http://i.imgur.com/U7sQeeB.png'},
            {'src':'http://i.imgur.com/SOIm2QI.png'},
            {'src':'http://i.imgur.com/1CQnfI4.png'},
            {'src':'http://i.imgur.com/n0LxE67.png'},
            {'src':'http://i.imgur.com/0vO27Us.png'},
            {'src':'http://i.imgur.com/NJ6VaZd.png'},
            {'src':'http://i.imgur.com/Iz9dIeF.png'},
            {'src':'http://i.imgur.com/SCcL49G.png'},
            {'src':'http://i.imgur.com/jJz11mk.png'},
            {'src':'http://i.imgur.com/JKsX6sA.png'},
            {'src':'http://i.imgur.com/TE23JDQ.png'},
            {'src':'http://i.imgur.com/Z6rEbOj.png'},
            {'src':'http://i.imgur.com/7x4vE57.png'},
            {'src':'http://i.imgur.com/4kuBhCa.png'},
            {'src':'http://i.imgur.com/5ySsWCx.png'},
            {'src':'http://i.imgur.com/oGC5iz9.png'},
            {'src':'http://i.imgur.com/mlVCJNQ.png'},
            {'src':'http://i.imgur.com/exbEJw6.png'},
            {'src':'http://i.imgur.com/XtcLVi8.png'},
            {'src':'http://i.imgur.com/oXnPJzK.png'},
            {'src':'http://i.imgur.com/7nQzs1N.png'},
            {'src':'http://i.imgur.com/C35tWRr.png'},
            {'src':'http://i.imgur.com/dTeca6e.png'},
            {'src':'http://i.imgur.com/kz4sU6E.png'},
            {'src':'http://i.imgur.com/dXV0bPZ.png'},
            {'src':'http://i.imgur.com/jpgBiOo.png'},
            {'src':'http://i.imgur.com/e1rc3vr.png'},
            {'src':'http://i.imgur.com/Pq6xcYg.png'},
            {'src':'http://i.imgur.com/hO7m9ga.png'},
        ];
            
            var h = [
            //hangouts        
            {'src':'http://i.imgur.com/vpOXVGK.png'},
            {'src':'http://i.imgur.com/Y1vZjiX.png'},
            {'src':'http://i.imgur.com/qPVDTQ9.png'},
            {'src':'http://i.imgur.com/zkaTlAd.png'},
            {'src':'http://i.imgur.com/scUISw8.png'},
            {'src':'http://i.imgur.com/xp1jqJf.png'},
            {'src':'http://i.imgur.com/4Kn0YBJ.png'},
            {'src':'http://i.imgur.com/hK8EFTv.png'},
            {'src':'http://i.imgur.com/X9SqjQ2.png'},
            
            {'src':'http://i.imgur.com/aYRlrHV.png'},
            {'src':'http://i.imgur.com/I3AS64C.png'},
            {'src':'http://i.imgur.com/kJJNiwZ.png'},
            {'src':'http://i.imgur.com/fKAFbm0.png'},
            {'src':'http://i.imgur.com/JICfIFj.png'},
            {'src':'http://i.imgur.com/FytXaEh.png'},
            {'src':'http://i.imgur.com/rrekvUn.png'},
            {'src':'http://i.imgur.com/ad6HSLi.png'},
            {'src':'http://i.imgur.com/ER0gWHb.png'},
            {'src':'http://i.imgur.com/1wkDeWB.png'},
            {'src':'http://i.imgur.com/KwDoZ9A.png'},
            {'src':'http://i.imgur.com/ovqPLQn.png'},
            {'src':'http://i.imgur.com/qOtWwcH.png'},
            {'src':'http://i.imgur.com/mU1RKXd.png'},
            {'src':'http://i.imgur.com/x0pychj.png'},
            {'src':'http://i.imgur.com/u1WHrgx.png'},
            {'src':'http://i.imgur.com/G3w9kef.png'},
            {'src':'http://i.imgur.com/HzTxh21.png'},
            {'src':'http://i.imgur.com/dFUn4OG.png'},
            {'src':'http://i.imgur.com/ejes95e.png'},
            {'src':'http://i.imgur.com/OwA33Zb.png'},
            {'src':'http://i.imgur.com/kmvVMTC.png'},
            {'src':'http://i.imgur.com/AX9Rut8.png'},
            {'src':'http://i.imgur.com/pQpnv0k.png'},
            {'src':'http://i.imgur.com/pf4L6gk.png'},
            {'src':'http://i.imgur.com/AOKKQP1.png'},
            {'src':'http://i.imgur.com/WAaoHfp.png'},
            {'src':'http://i.imgur.com/GmMXwZB.png'},
            {'src':'http://i.imgur.com/XPVBoet.png'},
            {'src':'http://i.imgur.com/jbNBigO.png'},
            {'src':'http://i.imgur.com/817AGU4.png'},
            {'src':'http://i.imgur.com/sCKxAV9.png'},
            {'src':'http://i.imgur.com/vI1c2TU.png'},
            {'src':'http://i.imgur.com/vP3I9w3.png'},
            {'src':'http://i.imgur.com/pAUELjY.png'},
            {'src':'http://i.imgur.com/urJYVoa.png'},
            {'src':'http://i.imgur.com/kV7PgWJ.png'},
            {'src':'http://i.imgur.com/esFvxar.png'},
            {'src':'http://i.imgur.com/zDZkc7W.png'},
            {'src':'http://i.imgur.com/5fC1h4r.png'},
            {'src':'http://i.imgur.com/TheqhpC.png'},
            {'src':'http://i.imgur.com/VJnirgH.png'},
            {'src':'http://i.imgur.com/xLhnK5d.png'},
            {'src':'http://i.imgur.com/E9W6WN3.png'},
            {'src':'http://i.imgur.com/kP2djp2.png'},
            {'src':'http://i.imgur.com/Qx2wwAi.png'},
            {'src':'http://i.imgur.com/WwrbsDX.png'},
            {'src':'http://i.imgur.com/Zj2aBHy.png'},
            {'src':'http://i.imgur.com/QRr7pgi.png'},
            {'src':'http://i.imgur.com/ynah5l8.png'},
            {'src':'http://i.imgur.com/TPqkjBo.png'},
            {'src':'http://i.imgur.com/mXZQQyR.png'},
            {'src':'http://i.imgur.com/VOesKVE.png'},
            {'src':'http://i.imgur.com/sPrcwnI.png'},
            {'src':'http://i.imgur.com/v3eZTzx.png'},
            {'src':'http://i.imgur.com/QjrFTOo.png'},
            
            {'src':'http://i.imgur.com/Oul1J4D.png'},
            {'src':'http://i.imgur.com/REaECno.png'},
            {'src':'http://i.imgur.com/tZD9WDu.png'},
            {'src':'http://i.imgur.com/1snuG0r.png'},
            {'src':'http://i.imgur.com/nzAP2JG.png'},
            {'src':'http://i.imgur.com/j7C4Aq0.png'},
            {'src':'http://i.imgur.com/tMxIx7S.png'},
            {'src':'http://i.imgur.com/SJbR6sm.png'},
            {'src':'http://i.imgur.com/YKlOs0W.png'},
            {'src':'http://i.imgur.com/WTMNq8v.png'},
            {'src':'http://i.imgur.com/GWilqh2.png'},
            {'src':'http://i.imgur.com/Bbsm9n5.png'},
            {'src':'http://i.imgur.com/pGU6x8S.png'},
            {'src':'http://i.imgur.com/FDP39zz.png'},
            {'src':'http://i.imgur.com/79VA6TT.png'},
            {'src':'http://i.imgur.com/WdCtOnn.png'},
        ];
        
        var o1 = [
            //other1
            {'src':'http://i.imgur.com/KaCv5op.gif'},
            {'src':'http://i.imgur.com/ejU2fcF.png'},
            {'src':'http://i.imgur.com/bio1pvI.gif'},
            {'src':'http://i.imgur.com/Ltd5iU6.png'},
            {'src':'http://i.imgur.com/T4IgzTY.gif'},
            {'src':'http://i.imgur.com/PbUaxYx.png'},
            {'src':'http://i.imgur.com/R8W6I0w.png'},
            {'src':'http://i.imgur.com/xG4RIrA.gif'},
            {'src':'http://i.imgur.com/rbFuPXF.gif'},
            {'src':'http://i.imgur.com/wyYOabT.gif'},
            {'src':'http://i.imgur.com/S6UEbHD.gif'},
            {'src':'http://i.imgur.com/4xMO5KD.gif'},
            {'src':'http://i.imgur.com/TwFgi2c.gif'},
            {'src':'http://i.imgur.com/hbETBD0.png'},
            {'src':'http://i.imgur.com/tQ9iHT6.gif'},
            {'src':'http://i.imgur.com/jomyAJ4.gif'},
            {'src':'http://i.imgur.com/1hHjhXy.gif'},
            {'src':'http://i.imgur.com/JBLi3hO.png'},
            {'src':'http://i.imgur.com/2zCelqA.gif'},
            {'src':'http://i.imgur.com/v6wvs7A.gif'},
            {'src':'http://i.imgur.com/HN61JpJ.png'},
            {'src':'http://i.imgur.com/p80TRPX.gif'},
            {'src':'http://i.imgur.com/jKIo5cV.gif'},
            {'src':'http://i.imgur.com/qENwY90.gif'},
            {'src':'http://i.imgur.com/3fIiDj2.gif'},
            {'src':'http://i.imgur.com/6t2Edws.png'},
            {'src':'http://i.imgur.com/QFgTdCv.gif'},
            {'src':'http://i.imgur.com/IesFNjq.gif'},
            {'src':'http://i.imgur.com/dqSaOBe.png'},
            {'src':'http://i.imgur.com/LFhYb3I.gif'},
            {'src':'http://i.imgur.com/7ggKVAO.gif'},
            {'src':'http://i.imgur.com/AccmU5M.gif'},
            {'src':'http://i.imgur.com/T2CfvSd.gif'},
            {'src':'http://i.imgur.com/ueULm7y.gif'},
            {'src':'http://i.imgur.com/euU0YPC.gif'},
            {'src':'http://i.imgur.com/2cgWGlH.gif'},
            {'src':'http://i.imgur.com/MPPaTyz.png'},
            {'src':'http://i.imgur.com/iy5JEtV.gif'},
            {'src':'http://i.imgur.com/ZENu745.gif'},
            {'src':'http://i.imgur.com/nfFXKjo.gif'},
            {'src':'http://i.imgur.com/ebWpush.png'},
            {'src':'http://i.imgur.com/ZF06woy.gif'},
            {'src':'http://i.imgur.com/PQ46nnT.gif'},
            {'src':'http://i.imgur.com/ERHUlCz.gif'},
            {'src':'http://i.imgur.com/6RjFMle.gif'},
            {'src':'http://i.imgur.com/f5T2Orb.png'},
            {'src':'http://i.imgur.com/Sjxv94d.gif'},
            {'src':'http://i.imgur.com/j79a9aH.gif'},
            {'src':'http://i.imgur.com/V5cCsWh.png'},
            {'src':'http://i.imgur.com/cMyP5ad.gif'},
            {'src':'http://i.imgur.com/HCRlrTz.gif'},
            {'src':'http://i.imgur.com/UEJ07GO.gif'},
            {'src':'http://i.imgur.com/FhxkvG1.gif'},
            {'src':'http://i.imgur.com/OphqGmp.gif'},
            {'src':'http://i.imgur.com/ltpLsUw.gif'},
            {'src':'http://i.imgur.com/L8qFDbk.gif'},
            {'src':'http://i.imgur.com/VdsR7Kd.gif'},
            {'src':'http://i.imgur.com/Qh7HS3l.gif'},
            {'src':'http://i.imgur.com/sR5ERGu.png'},
            {'src':'http://i.imgur.com/NSLcMn7.gif'},
            {'src':'http://i.imgur.com/1goqhMM.gif'},
            {'src':'http://i.imgur.com/HrYLFFB.gif'},
            {'src':'http://i.imgur.com/Jbt4I2Z.gif'},
            {'src':'http://i.imgur.com/CKbSOtO.png'},
            {'src':'http://i.imgur.com/hd1dUWI.png'},
            {'src':'http://i.imgur.com/ylaLgZg.gif'},
            {'src':'http://i.imgur.com/lYIYWaG.gif'},
            {'src':'http://i.imgur.com/OfDMTt5.gif'},
            {'src':'http://i.imgur.com/DtZamGL.gif'},
            {'src':'http://i.imgur.com/2PfclL5.gif'},
            {'src':'http://i.imgur.com/mjDDoYp.png'},
            {'src':'http://i.imgur.com/AFAlTnd.gif'},
            {'src':'http://i.imgur.com/AbXv6rW.gif'},
            {'src':'http://i.imgur.com/DdGW27Z.png'},
            {'src':'http://i.imgur.com/1PWsDVr.gif'},
            {'src':'http://i.imgur.com/qsn9fnc.png'},
            {'src':'http://i.imgur.com/p9FSUKE.gif'},
            {'src':'http://i.imgur.com/Uh85EFc.gif'},
            {'src':'http://i.imgur.com/WVE2soK.png'},
            {'src':'http://i.imgur.com/ynRV5zk.png'},
            {'src':'http://i.imgur.com/hXawssJ.gif'},
        ];
            
            var s = [
            //skype
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0100-smile.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0101-sadsmile.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0102-bigsmile.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0103-cool.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0105-wink.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0106-crying.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0107-sweating.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0108-speechless.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0109-kiss.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0110-tongueout.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0111-blush.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0112-wondering.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0113-sleepy.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0114-dull.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0115-inlove.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0116-evilgrin.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0117-talking.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0118-yawn.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0119-puke.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0120-doh.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0121-angry.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0122-itwasntme.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0123-party.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0124-worried.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0125-mmm.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0126-nerd.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0127-lipssealed.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0128-hi.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0129-call.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0130-devil.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0131-angel.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0132-envy.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0133-wait.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0134-bear.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0135-makeup.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0136-giggle.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0137-clapping.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0138-thinking.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0139-bow.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0140-rofl.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0141-whew.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0142-happy.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0143-smirk.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0144-nod.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0145-shake.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0146-punch.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0147-emo.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0148-yes.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0149-no.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0150-handshake.gif'},
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0152-heart.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0153-brokenheart.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0154-mail.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0155-flower.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0156-rain.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0157-sun.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0158-time.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0159-music.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0160-movie.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0161-phone.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0162-coffee.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0163-pizza.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0164-cash.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0165-muscle.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0166-cake.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0167-beer.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0168-drink.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0169-dance.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0170-ninja.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0171-star.gif'},
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0174-bandit.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0175-drunk.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0176-smoke.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0177-toivo.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0178-rock.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0179-headbang.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0180-bug.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0181-fubar.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0182-poolparty.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0183-swear.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0184-tmi.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0185-heidy.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0186-myspace.gif'}, 
            {'src':'http://factoryjoe.s3.amazonaws.com/emoticons/emoticon-0189-priidu.gif'},
        ];
        
        var o2 = [
            //other2
            {'src':'http://tweakimg.net/g/s/smile.gif'},
            {'src':'http://tweakimg.net/g/s/frown.gif'},
            {'src':'http://tweakimg.net/g/s/redface.gif'},
            {'src':'http://tweakimg.net/g/s/biggrin.gif'},
            {'src':'http://tweakimg.net/g/s/biggrin.gif'},
            {'src':'http://tweakimg.net/g/s/cry.gif'},
            {'src':'http://tweakimg.net/g/s/devil.gif'},
            {'src':'http://tweakimg.net/g/s/clown.gif'},
            {'src':'http://tweakimg.net/g/s/wink.gif'},
            {'src':'http://tweakimg.net/g/s/puh2.gif'},
            {'src':'http://tweakimg.net/g/s/yummie.gif'},
            {'src':'http://tweakimg.net/g/s/shiny.gif'},
            {'src':'http://tweakimg.net/g/s/heart.gif'},
            {'src':'http://tweakimg.net/g/s/sleephappy.gif'},
            {'src':'http://tweakimg.net/g/s/vork.gif'},
            {'src':'http://tweakimg.net/g/s/rc5.gif'},
            {'src':'http://tweakimg.net/g/s/yawnee.gif'},
            {'src':'http://tweakimg.net/g/s/sadley.gif'},
            {'src':'http://tweakimg.net/g/s/coool.gif'},
            {'src':'http://tweakimg.net/g/s/confused.gif'},
            {'src':'http://tweakimg.net/g/s/frusty.gif'},
            {'src':'http://tweakimg.net/g/s/nosmile2.gif'},
            {'src':'http://tweakimg.net/g/s/nosmile.gif'},
            {'src':'http://tweakimg.net/g/s/puh.gif'},
            {'src':'http://tweakimg.net/g/s/kwijl.gif'},
            {'src':'http://tweakimg.net/g/s/shutup.gif'},
            {'src':'http://tweakimg.net/g/s/bonk.gif'},
            {'src':'http://tweakimg.net/g/s/hypocrite.gif'},
            {'src':'http://tweakimg.net/g/s/worshippy.gif'}
        ];
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
                name: 'Other(1)',
                emojis: o1,
            }	,
            {
                name: 'Other(2)',
                emojis: o2,
            }	
        ];
        var emojis = $('<div id="emojis"></div>');
        if($('input[value="Post Reply"]').length > 0) {
            $('.submitUnit').before(emojis);
        }else{
            $('form.Preview').after(emojis);
        }
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
                var emoji = $('<a href="javascript:void(0);" class="mceSmilieSprite"><img src="'+emote.src+'"/></a>');
                cont.append(emoji);
                emoji.click(function(){					
                    var pp = iframe.getElementsByTagName('p');
                    pp[pp.length -1].innerHTML = pp[pp.length -1].innerHTML + '<img src="' + emote.src + '">&nbsp;';
                });	
            });
            btn.click(function(){
                $('.emoji-active').removeClass('emoji-active');
                $('.emojiContainer').hide();
                cont.show();
                btn.addClass('emoji-active');
            });
            if(idx == 0){
                btn.trigger('click');
            }
        });
        $("input.primary").first().click(function (){
            //var iframe2 = document.getElementsByClassName('redactor_textCtrl')[0].contentWindow.document.getElementsByTagName('body')[0];
            var quoteReg=/(\[QUOTE\]?[\s\S]*?\[\/QUOTE\])/igm;
            
            var message = iframe.innerHTML;
            var misc = message.match(quoteReg);
            var numMisc = (misc === null) ? 0 : misc.length;
            message = message.replace(quoteReg, "▓");
            var em = [/:3&lt;3/igm,/&gt;:3/igm,/:'3/igm, 
                      /x#3/gm,/=3/gm,
                      /8\)/gm,/&gt;:\(/gm, 
                      /:poop:/igm, /X\)/igm,
                      /}:\(/igm, /:\|/gm, 
                      /-\.-/igm, /:\\/gm,
                      /(\:\/)(?![\/])/gm, /:'\(/gm,
                      /:o(?![\w\d])/gm, /D:/gm,
                      /:O/gm, /X\(/igm,
                      /\\o\//igm, /o\/(?![\w\d])/igm,
                      /\\o(?![\w\d])/igm, /&gt;_&lt;/igm,
                      /B\)/gm, /&lt;3/gm, 
                      /;3/gm,
                      /:3/gm];
            var li = ['<img src="http://i.imgur.com/esFvxar.png">&nbsp;','<img src="http://i.imgur.com/77QKaCF.png">&nbsp;',
                      '<img src="http://i.imgur.com/3xmvLQB.png">&nbsp;',
                      '<img src="http://i.imgur.com/uQKnAHL.png">&nbsp;', '<img src="http://i.imgur.com/s2mnHPj.png">&nbsp;',
                      '<img src="http://i.imgur.com/U7sQeeB.png">&nbsp;', ' :mad: ',
                      '<img src="http://i.imgur.com/FDP39zz.png">&nbsp;', '<img src="http://i.imgur.com/X9SqjQ2.png">&nbsp;',
                      '<img src="http://i.imgur.com/I3AS64C.png">&nbsp;', '<img src="http://i.imgur.com/JICfIFj.png">&nbsp;',
                      '<img src="http://i.imgur.com/FytXaEh.png">&nbsp;', '<img src="http://i.imgur.com/rrekvUn.png">&nbsp;',
                      '<img src="http://i.imgur.com/rrekvUn.png">&nbsp;', '<img src="http://i.imgur.com/KwDoZ9A.png">&nbsp;',
                      '<img src="http://i.imgur.com/qOtWwcH.png">&nbsp;', '<img src="http://i.imgur.com/G3w9kef.png">&nbsp;',
                      '<img src="http://i.imgur.com/pQpnv0k.png">&nbsp;', '<img src="http://i.imgur.com/AOKKQP1.png">&nbsp;',
                      '<img src="http://i.imgur.com/ynah5l8.png">&nbsp;', '<img src="http://i.imgur.com/QRr7pgi.png">&nbsp;',
                      '<img src="http://i.imgur.com/QRr7pgi.png">&nbsp;', '<img src="http://i.imgur.com/mU1RKXd.png">&nbsp;',
                      '<img src="http://i.imgur.com/5fC1h4r.png">&nbsp;', '<img src="http://i.imgur.com/817AGU4.png">&nbsp;',
                      '<img src="http://i.imgur.com/aEIFMOD.png">&nbsp;',
                      '<img src="http://i.imgur.com/xQEgir2.png">&nbsp;'
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
            var iframe;
            if (document.getElementsByClassName('redactor_textCtrl redactor_MessageEditor redactor_BbCodeWysiwygEditor redactor_NoAutoComplete')[0]) {
                iframe = document.getElementsByClassName('redactor_textCtrl redactor_MessageEditor redactor_BbCodeWysiwygEditor redactor_NoAutoComplete')[0];
            } else if (document.getElementsByClassName('redactor_textCtrl redactor_MessageEditor redactor_BbCodeWysiwygEditor redactor_')[0]) {
                iframe = document.getElementsByClassName('redactor_textCtrl redactor_MessageEditor redactor_BbCodeWysiwygEditor redactor_')[0];
            }
                
                var message = iframe.contentWindow.document.getElementsByTagName('body')[0].innerHTML;
            
            if (message.indexOf("http") == -1 && message.indexOf("www") == -1 && message.indexOf("@") == -1 && message.indexOf("QUOTE") == -1 && message.indexOf("[/color]") == -1 && message.indexOf("<font color") == -1&& message.indexOf(":") == -1 && message.indexOf("[COLOR") == -1) {
                iframe.contentWindow.document.getElementsByTagName('body')[0].innerHTML = MakeSFX(message, false);
            } else {
                var quotereg = /(\[QUOTE\]?[\s\S]*?\[\/QUOTE\])|(\[SPOILER\]?[\s\S]*?\[\/SPOILER\])/igm;
                var imgregex = /(\<img([\s\S]*?)\>)/igm;
                var linkregex= /(\<a([\s\S]*?)<\/a\>)/igm;
                var urlregex = /(((f|ht)tps?:\/\/)(.*?)[\S][^<>]+)/igm;
                var regex =/(\@(\badam kristo\b|\bHanson Lee\b|[\S]+))|(\[IMG\]?[\s\S]*?\[\/IMG\])|(\[MEDIA\]?[\s\S]*?\[\/MEDIA\])|(\[PHP\]?[\s\S]*?\[\/PHP\])|(\[CODE\]?[\s\S]*?\[\/CODE\])|(\[HTML\]?[\s\S]*?\[\/HTML\])|(\[COLOR\]?[\s\S]*?\[\/COLOR\])|\;\)|\:D|\:\(|8\-\)|\:\)|(\:\/)(?![\/])|\:P/igm;
                var quoterest = /(\[color=#[\w\d]+\]╞\[\/color\])/im;
                var imgrest = /(\[color=#[\w\d]+\]§\[\/color\])/im;
                var linkrest = /(\[color=#[\w\d]+\]╗\[\/color\])/im;
                var urlrest = /(\[color=#[\w\d]+\]▒\[\/color\])/im;
                var tagrest = /(\[color=#[\w\d]+\]▓\[\/color\])/im;
                
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
                
                message = MakeSFX(message, false);
                
                var numQuot = (quotes === null) ? 0 : quotes.length;
                var numImgs = (imgs === null) ? 0 : imgs.length;
                var numLink = (links === null) ? 0 : links.length;
                var numUrls = (urls === null) ? 0 : urls.length;
                var numMisc = (misc === null) ? 0 : misc.length;
                
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
                    message = message.replace(urlrest, " <a href=\"" +urls[d]+ "\">" +urls[d]+ "</a> ");
                }
                for (var e = 0; e < numMisc; e++) {
                    message = message.replace(tagrest, misc[e]);
                }
                iframe.contentWindow.document.getElementsByTagName('body')[0].innerHTML = message;
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
            this.add = function(elem, callback) {
                this.content.append(elem);
                elem.wrap('<li></li>');
                if (typeof callback != "undefined") {
                    callback(elem);
                }
            };
            $('.sidebar .section:first').after(this.wrapper);
        }
        
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
	quickLinks.add($('<a href="/threads/tool-oneplus-forum-sidebar-mod.208545/">Sidebar Thread</a>'));
        quickLinks.add($('<a href="#" onClick="return false;" id="eUpdates">Email Updates</a>'))
        
        eUpdates.addEventListener("click", function(){
            var emailForm = $('<center><iframe src="https://docs.google.com/forms/d/1NmKqdgBI-rcZviGtNawZRva1KsLUOWpP8b_kfli653E/viewform?embedded=true" width="550" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe></center>');
            new modal('Email Update Form', emailForm, {
                'Close Window': {
                    type: 'red',
                    click: function(){
                        this.close();
                    }
                }
            });		
        });
        
        //Notifications
        var nBar = new sidebar("Notifications",{
            clicked: function(){getAlertInfo();}
        });
        
        
        //Alert Info
        function getAlertInfo() {
            nBar.add($('<span> On first page of alerts:</span>'));
            $.get('/account/alerts?page=' + 0, function(data) {
                var tagNum = $(data).find("h3:contains('tagged')").length;
                var likeNum = $(data).find("h3:contains('liked')").length;
                var quoteNum = $(data).find("h3:contains('quoted')").length;
                var replyNum = $(data).find("h3:contains('replied')").length;
                var startedNum = $(data).find("h3:contains('started')").length;
                nBar.add($('<span> Tags: '+tagNum+'</span>'));
                nBar.add($('<span> Likes: '+likeNum+'</span>'));
                nBar.add($('<span> Quotes: '+quoteNum+'</span>'));
                nBar.add($('<span> Replies: '+replyNum+'</span>'));
                nBar.add($('<span> Threads Started: '+startedNum+'</span>'));
            });
        }
    }
    
    //Quick PM
    var pmBtn = $('<input type="button" value="Quick PM" accesskey="s" style="font-size:11px;padding:5px;height:auto;line-height:12px;margin-top:5px;" class="button PreviewButton JsOnly" href="#"  id="number[0]">');
    pmBtn.appendTo('.userTitle');
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
var $ = jQuery;
addJQuery(main);

