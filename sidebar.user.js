// ==UserScript==
// @name         Quick Links for OnePlus Forum Users
// @namespace    *.oneplus.net*
// @version      1.2
// @description  enter something useful
// @author       Mikasa Ackerman aka Kallen & Kevin Pei
// @match        *.oneplus.net*
// @include        *.oneplus.net*
// @grant        none
// ==/UserScript==
//ADD JQUERY SCRIPT ADAPTED FROM https://gist.github.com/eristoddle/4440713
function addJQuery(callback) {
    $('<style type="text/css"></style').text('.sidebar{position:absolute;right:0px;}.sidebar.fixed{position:fixed;top:80px;box-sizing:border-box;}.custom-inner li{padding-top:16px;}.custom-inner li:first-child{padding-top: 0px;}.sidebar .section h3{padding:0px;padding-bottom:0px !important;cursor:pointer; color:#000 !important;}.sidebar .section h3 a{color:#000 !important;}#create-thread-button .inner{margin-bottom:30px;}.sidebar .section h3 a:hover{text-decoration:none;}#widget-11 .widget_header_small:hover{text-decoration:underline;}#create-thread-button .inner{margin-bottom:30px;}.sidebar .section .widget{padding:8px 0px 14px 0px;}.sidebar .section .section-wrapper{display:none;padding:10px 0px;}').appendTo('head');
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}
$.fn.overflown=function(){var e=this[0];return e.scrollHeight>e.clientHeight||e.scrollWidth>e.clientWidth;}
function main() {
    function closeThread(batch) {
        function getWarningMsg(option, name, title) {
            if (option == 1) {
                return '<p>Hi there @' + name + '!</p><br/><p>It has come to my attention that you have created a thread to ask for invites, however that is not allowed.</p><br/><p>The best way to receive an invite is to hang around the forums, join in on the community discussion and create quality replies and threads.</p><br/><p>If you have any further questions, please read the following thread https://forums.oneplus.net/threads/2-rules-revisited-and-restated.78159/, or feel free to message me via the private message feature.</p><br/><p>Thanks for your understanding!</p><br/><p>Thread closed.</p>';
            }
            if (option == 2) {
                var link = prompt("Duplicate link for " + title + "? (enter 0 to skip this)");
                return '<p>Hi there @' + name + '!</p><br/><p>It appears that this has already been discussed ' + (link ? ('at ' + link + '.</p>') : 'before.') + '<p>Please search in the future prior to creating a thread, so we don\'t encounter any duplicates :).</p><br/><p>If you have any further questions, feel free to message me via the private message feature.</p><br/><p>Thanks for your understanding!</p><br/><p>Thread closed.</p>';
            }
            if (option == 3) {
                return '<p>Hi there @' + name + '!</p><br/><p>It has come to my attention that you have linked to a scalper site, however that is not allowed.</p><br/><p>OnePlus is the one and only official retailer of the OnePlus One at the moment, and buying from other sources puts people at risk of scamming and other dangers.</p><br/><p>If you have any further questions, please read the following thread https://forums.oneplus.net/threads/5-reasons-to-not-buy-the-oneplus-one-from-scalpers.35689/, or feel free to message me via the private message feature.</p><br/><p>Thanks for your understanding!</p>';
            }
            if (option == 4) {
                return '<p>Congrats to the winner(s)!</p><br/><p>Thank you @' + name + ' for sharing with the OnePlus community :)</p><br/>Invites given, thread closed.</p>';
            }
        }

        function closePost(url, message) {
            $.get(url, function(data) {
                var token = data.match(/_csrfToken: \"(.*)\"/)[1];
                var dataObject = $(data);
                var name = dataObject.find('.message:first').attr('data-author');
                var msg = getWarningMsg(message, name, dataObject.find('.titleBar:first h1').text());
                $.post(url + '/add-reply', {
                    message_html: msg,
                    _xfRelativeResolver: url,
                    last_date: Date.now(),
                    last_known_date: Date.now(),
                    _xfToken: token,
                    _xfRequestUri: url.replace("https://forums.oneplus.net", ""),
                    _xfNoRedirect: 1,
                    _xfResponseType: "json"
                }, function(data) {
                    if (data.error) {
                        alert(data.error[0]);
                        return 0;
                    }
                    $.post(url + '/quick-update', {
                        'set[discussion_open]': 1,
                        'set[sticky]': 1,
                        _xfToken: token,
                        _xfRequestUri: url.replace("https://forums.oneplus.net", ""),
                        _xfNoRedirect: 1,
                        _xfResponseType: 'json'
                    }, function(data) {
                        if (batch) {
                            modal.find('#close-messages').append('<li>Closed ' + (url.replace('https://forums.oneplus.net/threads/', '').replace('/', '').replace('-', ' ')) + '. Waiting 30 seconds...</li>');
                        } else {
                            location.reload(1);
                        }
                    });
                });
            });
        }
        var links = [];

        function runClose() {
            window.queue = [];
            for (var i = 0; i < links.length; i++) {
                var message = 0;
                while (message < 1 || message > 4) {
                    message = Number(prompt("Warning type for \"" + (links[i].replace('https://forums.oneplus.net/threads/', '').replace('/', '').replace('-', ' ')) + "\": \n1. Begging\n2. Duplicate\n3. Scalpers\n4. Contest over"));
                    if (!message) {
                        return;
                    }
                }
                window.queue.push([links[i].replace(/page-\d+/, '').split("#")[0], message]);
            }
            var thisArgs = window.queue.shift();
            closePost(thisArgs[0], thisArgs[1]);
            if (window.queue.length != 0) {
                window.closeInterval = setInterval(function() {
                    thisArgs = window.queue.shift();
                    closePost(thisArgs[0], thisArgs[1]);
                    if (window.queue.length == 0 && modal) {
                        alert('All thread(s) successfully closed!');
                        modal.remove();
                        clearInterval(window.closeInterval);
                    }
                }, 35000);
            } else {
                if (modal) {
                    alert('All thread(s) successfully closed!');
                    modal.remove();
                }
            }
        }
        if (batch) {
            var modal = $('<div class="xenOverlay" id="url_modal" style="display: block;position: fixed;left: 50%;width: 600px;margin-left: -300px;top: 50%;height: auto;margin-top: -174px;"><form class="formOverlay xenForm"><div class="heading" id="redactor_modal_header"> Autoclose </div><div id="redactor_modal_inner"><dl class="ctrlUnit"><dt> Links: </dt><dd><textarea id="postUrls" class="textCtrl" style="height: 100px;resize: none"></textarea></dd></dl><ul id="close-messages"></ul><dl class="ctrlUnit submitUnit"><dt></dt><dd><input name="upload" class="redactor_modal_btn button primary" id="redactor_insert_urls_btn" value="Close!" type="button"><a href="javascript:void(null);" class="redactor_modal_btn redactor_btn_modal_close button"> Cancel </a></dd></dl></div></form></div>');
            modal.appendTo('body');
            modal.find('.redactor_btn_modal_close').click(function() {
                modal.remove();
            });
            modal.find('#redactor_insert_urls_btn').click(function() {
                modal.find('.button').remove();
                links = modal.find('#postUrls').val().split("\n");
                runClose();
            });
        } else {
            links.push(location.href);
            runClose();
        }
    }

    function like(method) {
        //---------------------------- CURRENT PAGE LIKING FUNCTION -------------------------------//  
        function like() {
            for (k = 0; k < document.getElementsByClassName('LikeLink item control like').length; k++) {
                document.getElementsByClassName('LikeLink item control like')[k].click();
            }
        }
        //---------------------------- THREAD LIKING FUNCTION -------------------------------//  
        function likeThreadPosts() {
            var links = [];
            jQuery.ajaxSetup({
                async: false
            });
            try {
                document.getElementsByClassName('PageNav')[0].getAttribute('data-last')
                var pages = parseInt(document.getElementsByClassName('PageNav')[0].getAttribute('data-last')) + 2;
            } catch (err) {
                var pages = 1;
            }
            var url = '/' + window.location.pathname.split('/')[1] + '/' + window.location.pathname.split('/')[2] + '/'
            getLikeURLs();
            likeLinks();

            function getLikeURLs() {
                for (i = 1; i <= pages; i++) {
                    $.get(url + 'page-' + i, function(data) {
                        //gets the like links from current page
                        $(data).find('a[class="LikeLink item control like"]').each(function() {
                            links.push($(this).attr('href')); // get the normalized `href` property; fastest solution
                        });
                        async: false
                    });
                }
            }

            function likeLinks() {
                var numbLinks = links.length + 2;
                for (t = 0; t <= numbLinks; t++) {
                    var token = document.getElementsByName('_xfToken')[0].getAttribute('value')
                    jQuery.ajaxSetup({
                        async: false
                    });
                    $.post(links[t], {
                        _xfToken: token,
                        _xfNoRedirect: 1,
                        _xfResponseType: 'json'
                    }, function(data) {});
                }
                alert('done');
            }
        }
        //---------------------------- FORWARD POST LIKING FUNCTION -------------------------------//
        function likeForward() {
            var links = [];
            jQuery.ajaxSetup({
                async: false
            });
            try {
                document.getElementsByClassName('PageNav')[0].getAttribute('data-last')
                var pages = parseInt(document.getElementsByClassName('PageNav')[0].getAttribute('data-last'));
            } catch (err) {
                var pages = 1;
            }
            var url = '/' + window.location.pathname.split('/')[1] + '/' + window.location.pathname.split('/')[2] + '/'
            getForward();
            likeLinks();

            function getForward() {
                for (i = parseInt(document.getElementsByClassName('PageNav')[0].getAttribute('data-end')); i <= pages; i++) {
                    $.get(url + 'page-' + i, function(data) {
                        //gets the like links from current page
                        $(data).find('a[class="LikeLink item control like"]').each(function() {
                            links.push($(this).attr('href')); // get the normalized `href` property; fastest solution
                        });
                        async: false
                    });
                }
            }

            function likeLinks() {
                var numbLinks = links.length + 2;
                for (t = 0; t <= numbLinks; t++) {
                    var token = document.getElementsByName('_xfToken')[0].getAttribute('value')
                    jQuery.ajaxSetup({
                        async: false
                    });
                    $.post(links[t], {
                        _xfToken: token,
                        _xfNoRedirect: 1,
                        _xfResponseType: 'json'
                    }, function(data) {});
                }
                alert('done');
            }
        }
        //---------------------------- ALERT LIKING FUNCTION -------------------------------//
        function likeAlert() {
            var url = 'https://forums.oneplus.net/account/alerts'
            jQuery.ajaxSetup({
                async: false
            });
            var alertPages = 5;
            var links = []; //contains all the tagged / quoted links
            getAlertLinks();
            likeLinks();
            //Gets the links of posts you've been tagged or quoted in
            function getAlertLinks() {
                for (i = 0; i <= alertPages; i++) {
                    $.get(url + '?page=' + i, function(data) {
                        $(data).find("h3:contains('tagged')").each(function(likes) {
                            links.push($(this).find("a[class='PopupItemLink']").attr('href') + 'like')
                        });
                        async: false
                    });
                }
            }
            //Likes the links stored into the array.
            function likeLinks() {
                var numbLinks = links.length + 2;
                for (t = 0; t <= numbLinks; t++) {
                    var token = document.getElementsByName('_xfToken')[0].getAttribute('value')
                    jQuery.ajaxSetup({
                        async: false
                    });
                    $.post(links[t], {
                        _xfToken: token,
                        _xfNoRedirect: 1,
                        _xfResponseType: 'json'
                    }, function(data) {});
                }
                alert('done');
            }
        }
        //---------------------------- POST LIKING MENU -------------------------------//
        function option() {
            var menu = window.prompt("Choose an option below.\n1. Like all posts on page.\n2. like all posts in thread.\n3. Like posts from this page forward");
            if (menu == 1) {
                like();
            } else if (menu == 2) {
                likeThreadPosts();
            } else if (menu == 3) {
                likeForward();
            }
        }
        if (method == "allPosts") {
            option();
        }
        if (method == "alerts") {
            likeAlert();
        }
    }

    function sidebar(title, opts) {
        var options = {
            layout: 'oneColumn'
        };
        $.extend(options, opts);
        this.wrapper = $('<div class="section widget-group-no-name widget-container"></div>');
        this.wrapper.append('<div class="secondaryContent widget" id="widget-12"><h3 style="padding-bottom:0px;">' + title + '</h3><ul class="custom-inner ' + (options.layout == 'twoColumns' ? 'xenforo-list-2cols' : '') + '"></ul><div class="clearfix" style="clear:left"></div></div>');
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
    //Misc. Tools
    var miscTools = new sidebar("Misc. Tools");
    miscTools.add($('<a href="javascript:void(0);">Like All Posts</a>'), function(elem) {
        elem.click(function() {
            like('allPosts');
        });
    });
    miscTools.add($('<a href="javascript:void(0);">Like Alerts</a>'), function(elem) {
        elem.click(function() {
            like('alerts');
        });
    });
    //Mod Tools
    var moderatorTools = new sidebar("Moderator Tools");
    moderatorTools.add($('<a href="javascript:void(0);">Close Current Thread</a>'), function(elem) {
        elem.click(function() {
            closeThread(false);
        });
    });
    moderatorTools.add($('<a href="javascript:void(0);">Batch Close Threads</a>'), function(elem) {
        elem.click(function() {
            closeThread(true);
        });
    });
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
    }).trigger('resize');
}
addJQuery(main);