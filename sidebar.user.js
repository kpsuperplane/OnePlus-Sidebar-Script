// ==UserScript==
// @name         Quick Links for OnePlus Forum Users
// @namespace    *.oneplus.net*
// @version      1.3.2
// @description  enter something useful
// @author       Mikasa Ackerman aka Kallen, Kevin Pei aka kp1234, Sam Prescott aka sp99
// @include      *forums.oneplus.net*
// @grant        none
// @license      MIT License; http://opensource.org/licenses/MIT
// ==/UserScript==
//ADD JQUERY SCRIPT ADAPTED FROM https://gist.github.com/eristoddle/4440713
function addJQuery(callback) {
    $('<style type="text/css"></style').text('.xenOverlay .xenForm{border-radius:3px;box-shadow:0px 0px 600px #000;border-style:none;background:#232323;}.xenOverlay .formOverlay .heading {color: #FFF;background: transparent;padding-left: 0px;border-style:none;}.sidebar{position:absolute;right:0px;}.sidebar.fixed{position:fixed;top:80px;box-sizing:border-box;}.custom-inner li{padding-top:16px;}.custom-inner li:first-child{padding-top: 0px;}.sidebar .section h3{padding:0px;padding-bottom:0px !important;cursor:pointer; color:#000 !important;}.sidebar .section h3 a{color:#000 !important;}#create-thread-button .inner{margin-bottom:30px;}.sidebar .section h3 a:hover{text-decoration:none;}#widget-11 .widget_header_small:hover{text-decoration:underline;}#create-thread-button .inner{margin-bottom:30px;}.sidebar .section .widget{padding:8px 0px 14px 0px;}.sidebar .section .section-wrapper{display:none;padding:10px 0px;}').appendTo('head');
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}
function main() {
	function modal(title, content, btns){
		var overlayObj = $('<div id="redactor_modal_overlay"></div>');
		var modalObj = $('<div class="xenOverlay" style="display: block;position: fixed;left: 50%;width: 600px;z-index:209999;margin-left: -300px;top: 50%;height: auto;"><form class="formOverlay xenForm"><div class="heading" id="redactor_modal_header">'+title+'</div><div id="redactor_modal_inner"><dl class="ctrlUnit"><div class="modal-inner-content"></div></dl><dl class="ctrlUnit submitUnit modal-btn-wrapper"></dl></div></form></div>');
		modalObj.find('.modal-inner-content').append(content);
		var modalMethods = {
			close: function(){
				modalObj.remove();
				overlayObj.remove();
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
		overlayObj.appendTo('body');
		modalObj.appendTo('body');
		modalObj.css('margin-top', -modalObj.outerHeight()/2);
	}
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

        function closePost(url, message, modalObj) {
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
                            modalObj.add('<li>Closed ' + (url.replace('https://forums.oneplus.net/threads/', '').replace('/', '').replace('-', ' ')) + '. Waiting 30 seconds...</li>');
                        } else {
                            location.reload(1);
                        }
                    });
                });
            });
        }
        function runClose(links, modalObj) {
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
            closePost(thisArgs[0], thisArgs[1], modalObj);
            if (window.queue.length != 0) {
                window.closeInterval = setInterval(function() {
                    thisArgs = window.queue.shift();
                    closePost(thisArgs[0], thisArgs[1], modalObj);
                    if (window.queue.length == 0) {
                        alert('All thread(s) successfully closed!');
                        modalObj.remove();
                        clearInterval(window.closeInterval);
                    }
                }, 35000);
            } else {
                if (batch) {
                    alert('All thread(s) successfully closed!');
                    modalObj.close();
                }
            }
        }
        if (batch) {
			var txtArea = $('<textarea id="postUrls" class="textCtrl" style="height: 100px;resize: none;display:block;width:100%;"></textarea>');
			var modalInner = $('<div>Links:</div>');
			modalInner.append(txtArea);
			modal('Batch Close Threads', modalInner, {
				'Close!': {
					type: 'red',
					click: function(){
						runClose(txtArea.val().split("\n"), this);
					}
				},
				'Cancel': {
					type: 'grey',
					click: function(){
						this.close();
					}
				}
			});
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
            runClose([location.href]);
        }
    }

    function like(method) {
        //---------------------------- CURRENT PAGE LIKING FUNCTION -------------------------------//  
        function like() {
            for (k = 0; k < document.getElementsByClassName('LikeLink item control like').length; k++) {
                document.getElementsByClassName('LikeLink item control like')[k].click();
            }
        }
        //---------------------------- SPECIFIC USER LIKING FUNCTION -------------------------------//  
        function likeSpecific() {
			var userlinks = [];
			jQuery.ajaxSetup({
			    async: false
			});
			try {
		        document.getElementsByClassName('PageNav')[0].getAttribute('data-last')
		        var pages = parseInt(document.getElementsByClassName('PageNav')[0].getAttribute('data-last')) + 2;
		    } catch (err) {
		        var pages = 1;
		    }
			var modalProgress = $('<div></div>');
			var progressModal;
			function getSpecificUserLinks() {
				jQuery.ajaxSetup({
			    	async: false
				});
				for (i = 1; i <= pages; i++) {
					$.get(url + 'page-' + i, function(data) {
						$.expr[":"].contains = $.expr.createPseudo(function(arg) {
						    return function( elem ) {
						        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
						    };
						});
						$(data.replace(/<img[^>]*>/g,"")).find("li:contains("+name+")").each(function() {
							userlinks.push($(this).find('a[class="LikeLink item control like"]').attr('href'));
							console.log($(this).find('a[class="LikeLink item control like"]').attr('href'))
						});
					});
					modalProgress.text('Checking Page '+i+' of '+pages+'...');
				}
				likeSpecificLinks();
			}

			function likeSpecificLinks() {
			    var numbLinks = userlinks.length + 2;
			    for (t = 0; t <= numbLinks; t++) {
			        var token = document.getElementsByName('_xfToken')[0].getAttribute('value')
			        jQuery.ajaxSetup({
			            async: false
			        });
			        $.post(userlinks[t], {
			            _xfToken: token,
			            _xfNoRedirect: 1,
			            _xfResponseType: 'json'
			        }, function(data) {});
					modalProgress.text('Liking '+t+'/'+numbLinks+' ('+Math.round(t*100/numbLinks)+'%)');
			    }
			}
		    var url = '/' + window.location.pathname.split('/')[1] + '/' + window.location.pathname.split('/')[2] + '/';
			var usernameInput = $('<input type="text" style="width:100%;"/>');
			new modal('Enter username', usernameInput, {
				'Like!': {
					type: 'red',
					click: function(){
						this.close();
						progressModal = new modal('Liking..', modalProgress, {});
						name = usernameInput.val();
						getSpecificUserLinks();
						progressModal.methods.close();
						alert('done');
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
            var url = '/' + window.location.pathname.split('/')[1] + '/' + window.location.pathname.split('/')[2] + '/';
			var modalProgress = $('<div></div>');
			var progressModal = new modal('Liking..', modalProgress, {});
            getLikeURLs();
            likeLinks();
			progressModal.methods.close();
			alert('done');
            function getLikeURLs() {
                for (i = 1; i <= pages; i++) {
                    $.get(url + 'page-' + i, function(data) {
                        //gets the like links from current page
                        $(data.replace(/<img[^>]*>/g,"")).find('a[class="LikeLink item control like"]').each(function() {
                            links.push($(this).attr('href')); // get the normalized `href` property; fastest solution
                        });
                        async: false
                    });
					modalProgress.text('Checking Page '+i+' of '+pages+'...');
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
					modalProgress.text('Liking '+t+'/'+numbLinks+' ('+Math.round(t*100/numbLinks)+'%)');
                }
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
			var modalProgress = $('<div></div>');
			var progressModal = new modal('Liking..', modalProgress, {});
			console.log(progressModal);
            getForward(modalProgress);
            likeLinks(modalProgress);
			jQuery.ajaxSetup({
				async: false
			});
			progressModal.methods.close();
			alert('done');
            function getForward(modalProgress) {
                for (i = parseInt(document.getElementsByClassName('PageNav')[0].getAttribute('data-end')); i <= pages; i++) {
                    $.get(url + 'page-' + i, function(data) {
                        //gets the like links from current page
                        $(data.replace(/<img[^>]*>/g,"")).find('a[class="LikeLink item control like"]').each(function() {
                            links.push($(this).attr('href')); // get the normalized `href` property; fastest solution
                        });
                        async: false
                    });
					modalProgress.text('Checking Page '+i+' of '+pages+'...');
                }
            }
            function likeLinks(modalProgress) {
				console.log(progressModal);
                var numbLinks = links.length + 2;
                for (t = 0; t <= numbLinks; t++) {
                    var token = document.getElementsByName('_xfToken')[0].getAttribute('value');
                    $.post(links[t], {
                        _xfToken: token,
                        _xfNoRedirect: 1,
                        _xfResponseType: 'json'
                    }, function(data) {});
					modalProgress.text('Liking '+t+'/'+numbLinks+' ('+Math.round(t*100/numbLinks)+'%)');
                }
            }
        }
        //---------------------------- ALERT LIKING FUNCTION -------------------------------//
        function likeAlert() {
            var alerts = [];
            $.get('account/alerts?page=' + 0, function(data) {
                var token = data.match(/_csrfToken: \"(.*)\"/)[1];
                for (i = 0; i <= 30; i++) {
                    alerts.push($(data).find('a.PopupItemLink').eq(i).attr('href') + 'like');
                    console.log('Liking post: ' + alerts[i].split('/')[1])
                    $.post(alerts[i], {
                        _xfToken: token,
                        _xfNoRedirect: 1,
                        _xfResponseType: 'json'
                    }, function(data) {});
                }
            });
			alert('done')
        }
        //---------------------------- POST LIKING MENU -------------------------------//
        function option() {
			var selection = $('<select style="width:100%;"><option value="1">Like all posts on page</option><option value="2">Like all posts in thread</option><option value="3">Like posts from this page forward</option><option value="4">Like all posts by specific user</option></select>');
			var modalContent = $('<div></div>').append(selection);
			new modal('Choose an option below', modalContent, {
				'Like!': {
					type: 'red',
					click: function(){
						this.close();
						var likeChoice = Number(selection.find('option:selected').val());
						if (likeChoice == 1) {
							like();
						} else if (likeChoice == 2) {
							likeThreadPosts();
						} else if (likeChoice == 3) {
							likeForward();
						} else if (likeChoice == 4) {
							likeSpecific();
						}
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
    }).trigger('resize').trigger('scroll');
}
addJQuery(main);
