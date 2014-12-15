// ==UserScript==
// @name         OnePlus Forum Sidebar
// @namespace    *.oneplus.net*
// @version      1.4.1
// @description  enter something useful
// @author       Mikasa Ackerman aka Kallen, Kevin Pei aka kp1234, Sam Prescott aka sp99, awkward_potato
// @include      *forums.oneplus.net*
// @grant        none
// @license      MIT License; http://opensource.org/licenses/MIT
// ==/UserScript==
//ADD JQUERY SCRIPT ADAPTED FROM https://gist.github.com/eristoddle/4440713
function addJQuery(callback) {
    $('<style type="text/css"></style').text('.xenOverlay .xenForm.animateClose{-webkit-transition:300ms cubic-bezier(0.215,.61,.355,1);transition:300ms cubic-bezier(0.215,.61,.355,1);opacity:0;-webkit-transform: scale(0.9,0.9);transform: scale(0.9,0.9);}.xenOverlay .xenForm.animateClose.open{opacity:1;-webkit-transform: scale(1,1);transform: scale(1,1);}.xenOverlay .xenForm{border-radius:3px;box-shadow:0px 0px 600px #000;border-style:none;background:#151515 !important;}.xenOverlay .formOverlay .heading {color: #FFF;background: transparent;padding-left: 0px;border-style:none;}.sidebar{position:absolute;right:0px;}.sidebar.fixed{position:fixed;top:80px;box-sizing:border-box;}.custom-inner li{padding-top:16px;}.custom-inner li:first-child{padding-top: 0px;}.sidebar .section h3{padding:0px;padding-bottom:0px !important;cursor:pointer; color:#000 !important;}.sidebar .section h3 a{color:#000 !important;}#create-thread-button .inner{margin-bottom:30px;}.sidebar .section h3 a:hover{text-decoration:none;}#widget-11 .widget_header_small:hover{text-decoration:underline;}#create-thread-button .inner{margin-bottom:30px;}.sidebar .section .widget{padding:8px 0px 14px 0px;}.sidebar .section .section-wrapper{display:none;padding:10px 0px;}').appendTo('head');
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
		var pm_msg = $('<textarea id="message" class="textCtrl" style="height: 100px;resize: none;display:block;width:100%;"></textarea>')
		var sendMsg = $('<div>Subject: </div>');
		sendMsg.append(pm_title);
		sendMsg.append('<br><br>Message:')
		sendMsg.append(pm_msg);
		new modal('QUICK PM', sendMsg, {
			'Send Message': {
				type: 'red',
				click: function(){
					this.close();
					console.log(pm_msg.val().replace('<br>', '\n'))
					var url = 'https://forums.oneplus.net/conversations/add';
					var token = document.getElementsByName('_xfToken')[0].getAttribute('value')
					var msgTitle = pm_title.val()
					var msg = pm_msg.val().replace('\n', '<br>')
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
    //if (g_cstyle == 0) {
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
    /*}
	if (g_cstyle == 1) {
		k -= Math.floor(k);
		r = r1 + k * dr;
		g = g1 + k * dg;
		b = b1 + k * db;
	}
	if (g_cstyle == 2) {
		k -= 2 * Math.floor(k / 2);
		if (k < 1) {
			r = r1 + k * dr;
			g = g1 + k * dg;
			b = b1 + k * db;
		}
		if (k >= 1) {
			k -= 2;
			r = r1 - k * dr;
			g = g1 - k * dg;
			b = b1 - k * db;
		}
	}
	if (g_cstyle == 3) {
		k -= 3 * Math.floor(k / 3);
		if (k < 1) {
			r = r1 + k * dr;
			g = g1 + k * dg;
			b = b1 + k * db;
		}
		if (k >= 1 && k < 2) {
			k -= 1;
			r = r2 + k * dr1;
			g = g2 + k * dg1;
			b = b2 + k * db1;
		}
		if (k >= 2) {
			k -= 2;
			r = r3 + k * dr2;
			g = g3 + k * dg2;
			b = b3 + k * db2;
		}
	}*/
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
    var numreps = 1;//parseInt($("#gradient_repeat").val());
    if (numreps < 1) numreps = 1;
    if (numreps > 10) numreps = 10;
    instr = inputString;
    outstr = new String("");
    tempstr = new String("");
    res = 1;
    j = instr.length;
    //if (gradientType == "rainbow") {
    scale = Math.PI * (2 * eval(numreps) - .21) / j;
    g_cstyle = 0;
    /*}
	if (gradientType == "oneway") {
		scale = numreps / j;
		g_cstyle = 1;
	}
	if (gradientType == "backandforth") {
		scale = 2.0 * numreps / j;
		g_cstyle = 2;
	}
	if (gradientType == "tricolor") {
		scale = 3.0 * numreps / j;
		g_cstyle = 3;
	}
	if (gradientType == 'oneway' || gradientType == 'backandforth') {
		hexToRGB($("#gradient_1").val());
		r1 = g_r;
		g1 = g_g;
		b1 = g_b;
		hexToRGB($("#gradient_2").val());
		r2 = g_r;
		g2 = g_g;
		b2 = g_b;
		dr = 0.0 + r2 - r1;
		dg = 0.0 + g2 - g1;
		db = 0.0 + b2 - b1;
	}*/
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
    if(window.location.href.indexOf("thread") > -1 || window.location.href.indexOf("conversation") > -1) {
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
        var imgregex = /(\<img([\s\S]*?)\>)/igm;
        var linkregex= /(\<a([\s\S]*?)<\/a\>)/igm;
        var urlregex = /(((f|ht)tps?:\/\/)(.*?)[\S][^<>]+)/igm;
        var regex =/(\@(\badam kristo\b|\bHanson Lee\b|[\S]+))|(\[QUOTE\]?[\s\S]*?\[\/QUOTE\])|(\[SPOILER\]?[\s\S]*?\[\/SPOILER\])|(\[IMG\]?[\s\S]*?\[\/IMG\])|(\[MEDIA\]?[\s\S]*?\[\/MEDIA\])|(\[PHP\]?[\s\S]*?\[\/PHP\])|(\[CODE\]?[\s\S]*?\[\/CODE\])|(\[HTML\]?[\s\S]*?\[\/HTML\])|(\[COLOR\]?[\s\S]*?\[\/COLOR\])|\;\)|\:D|\:\(|8\-\)|\:\)|(\:\/)(?![\/])|\:P/igm
        var imgrest = /(\[color=#[\w\d]+\]§\[\/color\])/im;
        var linkrest = /(\[color=#[\w\d]+\]╗\[\/color\])/im;
        var urlrest = /(\[color=#[\w\d]+\]▒\[\/color\])/im;
        var tagrest = /(\[color=#[\w\d]+\]▓\[\/color\])/im;
        
        var imgs = message.match(imgregex);
        var links = message.match(linkregex);
        var urls = message.match(urlregex);
        var misc = message.match(regex);
        
        message = message.replace(imgregex, "§");
        message = message.replace(linkregex, "╗");
        message = message.replace(urlregex, "▒");
        message = message.replace(regex, "▓");
        message = MakeSFX(message, false);
        
        var numImgs = (imgs === null) ? 0 : imgs.length;
        var numLink = (links === null) ? 0 : links.length;
        var numUrls = (urls === null) ? 0 : urls.length;
        var numMisc = (misc === null) ? 0 : misc.length;
        
        for (var u = 0; u < numImgs; u++) {
            message = message.replace(imgrest, imgs[u]);
        }
        for (var u = 0; u < numLink; u++) {
            message = message.replace(linkrest, links[u]);
        }
        for (var u = 0; u < numUrls; u++) {
            message = message.replace(urlrest, " <a href=\"" +urls[u]+ "\">" +urls[u]+ "</a> ");
        }
        for (var i = 0; i < numMisc; i++) {
            message = message.replace(tagrest, misc[i]);
        }
        iframe.contentWindow.document.getElementsByTagName('body')[0].innerHTML = message;
        }
}
    var iframe2;
    if (document.getElementsByClassName('redactor_textCtrl redactor_MessageEditor redactor_BbCodeWysiwygEditor redactor_NoAutoComplete')[0]) {
        iframe2 = document.getElementsByClassName('redactor_textCtrl redactor_MessageEditor redactor_BbCodeWysiwygEditor redactor_NoAutoComplete')[0];
    } else if (document.getElementsByClassName('redactor_textCtrl redactor_MessageEditor redactor_BbCodeWysiwygEditor redactor_')[0]) {
        iframe2 = document.getElementsByClassName('redactor_textCtrl redactor_MessageEditor redactor_BbCodeWysiwygEditor redactor_')[0];
    }
        iframe2=iframe2.contentWindow.document.getElementsByTagName('body')[0];
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
        }
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

    /*
//Misc. Tools
    var miscTools = new sidebar("Misc. Tools");
    */

    //Notifications
    var nBar = new sidebar("Notifications");
    nBar.add($('<span> On first page of alerts:</span>'))
    $.get('/account/alerts?page=' + 0, function(data) {
        var tagNum = $(data).find("h3:contains('tagged')").length
        var likeNum = $(data).find("h3:contains('liked')").length
        var quoteNum = $(data).find("h3:contains('quoted')").length
        nBar.add($('<span> Tags: '+tagNum+'</span>'))
        nBar.add($('<span> Likes: '+likeNum+'</span>'))
        nBar.add($('<span> Quotes: '+quoteNum+'</span>'))
    })
	
	//Quick PM
	var pmBtn = $('<input type="button" value="Quick PM" accesskey="s" style="font-size:11px;padding:5px;height:auto;line-height:12px;margin-top:5px;" class="button PreviewButton JsOnly" href="#"  id="number[0]">');
	pmBtn.appendTo('.userTitle');
	var numb = $('input.button.PreviewButton.JsOnly').length
	for (i = 0; i < numb; i++) {
		$('input.button.PreviewButton.JsOnly')[i].id = i
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
