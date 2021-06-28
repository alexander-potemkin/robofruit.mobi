 
function t142_checkSize(recid){
  var el=$("#rec"+recid).find(".t142__submit");
  if(el.length){
    var btnheight = el.height() + 5;
    var textheight = el[0].scrollHeight;
    if (btnheight < textheight) {
      var btntext = el.text();
      el.addClass("t142__submit-overflowed");
    }
  }
} 
function t228__init(recid) {
    var el = $('#rec' + recid);
    var mobile = el.find('.t228__mobile');
    var fixedBlock = mobile.css('position') === 'fixed' && mobile.css('display') === 'block';

    setTimeout(function() {
        el.find('.t-menu__link-item:not(.t-menusub__target-link):not(.tooltipstered):not(.t794__tm-link)').on('click', function () {
            if ($(this).is('.tooltipstered, .t-menusub__target-link, .t794__tm-link, .t966__tm-link, .t978__tm-link')) { return; }
            if (fixedBlock) {
                mobile.trigger('click');
            }
        });

        el.find('.t-menusub__link-item').on('click', function () {
            if (fixedBlock) {
                mobile.trigger('click');
            }
        });
        
        el.find('.t228__right_buttons_but .t-btn').on('click', function () {
            if (fixedBlock) {
                mobile.trigger('click');
            }
        });
        
        el.find('.t228__positionabsolute');
        
        el.find('.t228').on('overflow', function() {
            t228_checkOverflow(recid);
        });
        
        el.find('.t228').on('nooverflow', function() {
            t228_checkNoOverflow(recid);
        });
    }, 500);
}

function t228_highlight() {
    var url = window.location.href;
    var pathname = window.location.pathname;
    if (url.substr(url.length - 1) == "/") {
        url = url.slice(0, -1);
    }
    if (pathname.substr(pathname.length - 1) == "/") {
        pathname = pathname.slice(0, -1);
    }
    if (pathname.charAt(0) == "/") {
        pathname = pathname.slice(1);
    }
    if (pathname == "") {
        pathname = "/";
    }
    $(".t228__list_item a[href='" + url + "']").addClass("t-active");
    $(".t228__list_item a[href='" + url + "/']").addClass("t-active");
    $(".t228__list_item a[href='" + pathname + "']").addClass("t-active");
    $(".t228__list_item a[href='/" + pathname + "']").addClass("t-active");
    $(".t228__list_item a[href='" + pathname + "/']").addClass("t-active");
    $(".t228__list_item a[href='/" + pathname + "/']").addClass("t-active");
}

function t228_checkAnchorLinks(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        var t228_navLinks = el.find(".t228__list_item a:not(.tooltipstered)[href*='#']");
        if (t228_navLinks.length > 0) {
            setTimeout(function () {
                t228_catchScroll(t228_navLinks);
            }, 500);
        }
    }
}

function t228_checkOverflow(recid) {
    var el = $('#rec' + recid);
    var menu = el.find('.t228');
    var winHeight = $(window).height();
    
    if (menu.css('position') === 'fixed') {
        menu.addClass('t228__overflow');
        menu[0].style.setProperty('height', winHeight - $('.t228__mobile_container').outerHeight(true) + 'px', 'important');
    }
}

function t228_checkNoOverflow(recid) {
    var el = $('#rec' + recid);
    var menu = el.find('.t228');
    var submenus = el.find('.t966__tooltip-menu_mobile');
    
    if (menu.css('position') === 'fixed' && submenus.length === 1) {
        menu.removeClass('t228__overflow');
        menu[0].style.setProperty('height', 'auto');
    }
}


function t228_catchScroll(t228_navLinks) {
    var t228_clickedSectionId = null,
        t228_sections = [],
        t228_sectionIdTonavigationLink = [],
        t228_interval = 100,
        t228_lastCall, t228_timeoutId;
    t228_navLinks = $(t228_navLinks.get().reverse());
    t228_navLinks.each(function () {
        var t228_cursection = t228_getSectionByHref($(this));
        if (typeof t228_cursection.attr("id") != "undefined") {
            t228_sections.push(t228_cursection);
        }
        t228_sectionIdTonavigationLink[t228_cursection.attr("id")] = $(this);
    });
    
    t228_sections.sort(function (a, b) {
        return b.offset().top - a.offset().top
    });

    t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);

    t228_navLinks.click(function () {
        var clickedSection = t228_getSectionByHref($(this));
        if (!$(this).hasClass("tooltipstered") && typeof clickedSection.attr("id") != "undefined") {
            t228_navLinks.removeClass('t-active');
            $(this).addClass('t-active');
            t228_clickedSectionId = t228_getSectionByHref($(this)).attr("id");
        }
    });
    $(window).scroll(function () {
        var t228_now = new Date().getTime();
        if (t228_lastCall && t228_now < (t228_lastCall + t228_interval)) {
            clearTimeout(t228_timeoutId);
            t228_timeoutId = setTimeout(function () {
                t228_lastCall = t228_now;
                t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
            }, t228_interval - (t228_now - t228_lastCall));
        } else {
            t228_lastCall = t228_now;
            t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
        }
    });
}

function t228_getSectionByHref(curlink) {
    var curLinkValue = curlink.attr('href').replace(/\s+/g, '').replace(/.*#/, '');
    if (curlink.is('[href*="#rec"]')) {
        return $(".r[id='" + curLinkValue + "']");
    } else {
        return $(".r[data-record-type='215']").has("a[name='" + curLinkValue + "']");
    }
}

function t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId) {
    var t228_scrollPosition = $(window).scrollTop();
    var t228_valueToReturn = t228_clickedSectionId;

    /*if first section is not at the page top (under first blocks)*/
    if (t228_sections.length !== 0 && t228_clickedSectionId === null && t228_sections[t228_sections.length - 1].offset().top > (t228_scrollPosition + 300)) {
        t228_navLinks.removeClass('t-active');
        return null;
    }

    $(t228_sections).each(function (e) {
        var t228_curSection = $(this),
            t228_id = t228_curSection.attr('id'),
            t228_sectionTop = t228_curSection.offset().top,
            t228_navLink = t228_sectionIdTonavigationLink[t228_id];

        if (((t228_scrollPosition + 300) >= t228_sectionTop) || (t228_sections[0].attr("id") == t228_id && t228_scrollPosition >= $(document).height() - $(window).height())) {
            if (t228_clickedSectionId == null && !t228_navLink.hasClass('t-active')) {
                t228_navLinks.removeClass('t-active');
                t228_navLink.addClass('t-active');
                t228_valueToReturn = null;
            } else {
                if (t228_clickedSectionId != null && t228_id == t228_clickedSectionId) {
                    t228_valueToReturn = null;
                }
            }
            return false;
        }
    });

    return t228_valueToReturn;
}

function t228_setWidth(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function () {
            var el = $(this);
            var left_exist = el.find('.t228__leftcontainer').length;
            var left_w = el.find('.t228__leftcontainer').outerWidth(true);
            var max_w = left_w;
            var right_exist = el.find('.t228__rightcontainer').length;
            var right_w = el.find('.t228__rightcontainer').outerWidth(true);
            var items_align = el.attr('data-menu-items-align');
            if (left_w < right_w) max_w = right_w;
            max_w = Math.ceil(max_w);
            var center_w = 0;
            el.find('.t228__centercontainer').find('li').each(function () {
                center_w += $(this).outerWidth(true);
            });
            var padd_w = 40;
            var maincontainer_width = el.find(".t228__maincontainer").outerWidth();
            if (maincontainer_width - max_w * 2 - padd_w * 2 > center_w + 20) {
                if (items_align == "center" || typeof items_align === "undefined") {
                    el.find(".t228__leftside").css("min-width", max_w + "px");
                    el.find(".t228__rightside").css("min-width", max_w + "px");
                    el.find(".t228__list").removeClass("t228__list_hidden");
                }
            } else {
                el.find(".t228__leftside").css("min-width", "");
                el.find(".t228__rightside").css("min-width", "");
            }
        });
    }
    
    el.find(".t228__centerside").removeClass("t228__centerside_hidden");
}

function t228_setBg(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function () {
            var el = $(this);
            if (el.attr('data-bgcolor-setbyscript') == "yes") {
                var bgcolor = el.attr("data-bgcolor-rgba");
                el.css("background-color", bgcolor);
            }
        });
    } else {
        el.find(".t228").each(function () {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-hex");
            el.css("background-color", bgcolor);
            el.attr("data-bgcolor-setbyscript", "yes");
        });
    }
}

function t228_appearMenu(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function () {
            var el = $(this);
            var appearoffset = el.attr("data-appearoffset");
            if (appearoffset != "") {
                if (appearoffset.indexOf('vh') > -1) {
                    appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                }

                appearoffset = parseInt(appearoffset, 10);

                if ($(window).scrollTop() >= appearoffset) {
                    if (el.css('visibility') == 'hidden') {
                        el.finish();
                        el.css("top", "-50px");
                        el.css("visibility", "visible");
                        var topoffset = el.data('top-offset');
                        if (topoffset && parseInt(topoffset) > 0) {
                            el.animate({
                                "opacity": "1",
                                "top": topoffset + "px"
                            }, 200, function () {});

                        } else {
                            el.animate({
                                "opacity": "1",
                                "top": "0px"
                            }, 200, function () {});
                        }
                    }
                } else {
                    el.stop();
                    el.css("visibility", "hidden");
                    el.css("opacity", "0");
                }
            }
        });
    }

}

function t228_changebgopacitymenu(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function () {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-rgba");
            var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
            var bgopacityone = el.attr("data-bgopacity");
            var bgopacitytwo = el.attr("data-bgopacity-two");
            var menushadow = el.attr("data-menushadow");
            if (menushadow == '100') {
                var menushadowvalue = menushadow;
            } else {
                var menushadowvalue = '0.' + menushadow;
            }
            if ($(window).scrollTop() > 20) {
                el.css("background-color", bgcolor_afterscroll);
                if (bgopacitytwo == '0' || (typeof menushadow == "undefined" && menushadow == false)) {
                    el.css("box-shadow", "none");
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")");
                }
            } else {
                el.css("background-color", bgcolor);
                if (bgopacityone == '0.0' || (typeof menushadow == "undefined" && menushadow == false)) {
                    el.css("box-shadow", "none");
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")");
                }
            }
        });
    }
}

function t228_createMobileMenu(recid) {
    var el = $("#rec" + recid);
    var menu = el.find(".t228");
    var burger = el.find(".t228__mobile");
    burger.on('click', function (e) {
        menu.fadeToggle(300);
        burger.toggleClass("t228_opened");
    });
    $(window).bind('resize', t_throttle(function () {
        if ($(window).width() > 980) {
            menu.fadeIn(0);
        }
    }));
} 
function t270_scroll(hash, offset, speed) {
    if (hash.indexOf('#!/tproduct/') !== -1 || hash.indexOf('#!/tab/') !== -1) {
        return true;
    }

    var root = $('html, body');
    var target = "";
    
    if (speed === undefined) {
        speed = 500;
    }

    try {
        target = $(hash);
    } catch(event) {
        console.log("Exception t270: " + event.message);
        return true;
    }
    if (target.length === 0) {
        target = $('a[name="' + hash.substr(1) + '"]');
        if (target.length === 0) {
            return true;
        }
    }
    
    var isHistoryChangeAllowed = !(window.location.hash === hash);

    root.animate({
        scrollTop: target.offset().top - offset
    }, speed, function() {
        if (!isHistoryChangeAllowed) {
            return;
        }
        
        if(history.pushState) {
            history.pushState(null, null, hash);
        } else {
            window.location.hash = hash;
        }
        
        isHistoryChangeAllowed = false;
    });

    return true;
} 
function t282_showMenu(recid) {
    var el = $("#rec" + recid);

    el.find('.t282__burger, .t282__menu__item:not(".tooltipstered"):not(".t282__menu__item_submenu"), .t282__overlay').click(function () {
        if ($(this).is(".t282__menu__item.tooltipstered, .t794__tm-link, .t978__tm-link, .t966__tm-link")) {
            return;
        }
        $('body').toggleClass('t282_opened');
        el.find('.t282__menu__container, .t282__overlay').toggleClass('t282__closed');
        var height = el.find(".t282__container").get(0).getBoundingClientRect().height;
        el.find(".t282__menu__container").css({
            'top': height
        });
    });

    el.find('.t282').bind('clickedAnchorInTooltipMenu', function () {
        $('body').removeClass('t282_opened');
        $('#rec' + recid + ' .t282__menu__container, #rec' + recid + ' .t282__overlay').addClass('t282__closed');
    });

    if (el.find('.t-menusub__link-item')) {
        el.find('.t-menusub__link-item').on('click', function () {
            $('body').removeClass('t282_opened');
            $('#rec' + recid + ' .t282__menu__container, #rec' + recid + ' .t282__overlay').addClass('t282__closed');
        });
    }
}

function t282_changeSize(recid) {
    var el = $("#rec" + recid);
    var bottomheight = el.find(".t282__menu__container");
    var headerheight = el.find(".t282__container");
    var menu = bottomheight.height() + headerheight.height();
    var win = $(window).height();
    if (menu > win) {
        $("#nav" + recid).addClass('t282__menu_static');
    } else {
        $("#nav" + recid).removeClass('t282__menu_static');
    }
}

function t282_changeBgOpacityMenu(recid) {
    var window_width = $(window).width();
    var record = $("#rec" + recid);
    record.find(".t282__container__bg").each(function () {
        var el = $(this);
        var bgcolor = el.attr("data-bgcolor-rgba");
        var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
        var bgopacity = el.attr("data-bgopacity");
        var bgopacity_afterscroll = el.attr("data-bgopacity2");
        var menu_shadow = el.attr("data-menu-shadow");
        if ($(window).scrollTop() > 20) {
            el.css("background-color", bgcolor_afterscroll);
            if (bgopacity_afterscroll != "0" && bgopacity_afterscroll != "0.0") {
                el.css('box-shadow', menu_shadow);
            } else {
                el.css('box-shadow', 'none');
            }
        } else {
            el.css("background-color", bgcolor);
            if (bgopacity != "0" && bgopacity != "0.0") {
                el.css('box-shadow', menu_shadow);
            } else {
                el.css('box-shadow', 'none');
            }
        }
    });
}

function t282_highlight(recid) {
    var url = window.location.href;
    var pathname = window.location.pathname;
    if (url.substr(url.length - 1) == "/") {
        url = url.slice(0, -1);
    }
    if (pathname.substr(pathname.length - 1) == "/") {
        pathname = pathname.slice(0, -1);
    }
    if (pathname.charAt(0) == "/") {
        pathname = pathname.slice(1);
    }
    if (pathname === "") {
        pathname = "/";
    }
    $(".t282__menu a[href='" + url + "']").addClass("t-active");
    $(".t282__menu a[href='" + url + "/']").addClass("t-active");
    $(".t282__menu a[href='" + pathname + "']").addClass("t-active");
    $(".t282__menu a[href='/" + pathname + "']").addClass("t-active");
    $(".t282__menu a[href='" + pathname + "/']").addClass("t-active");
    $(".t282__menu a[href='/" + pathname + "/']").addClass("t-active");
}

function t282_appearMenu(recid) {
    var window_width = $(window).width();
    $(".t282").each(function () {
        var el = $(this);
        var appearoffset = el.attr("data-appearoffset");
        if (appearoffset !== "") {
            if (appearoffset.indexOf('vh') > -1) {
                appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
            }

            appearoffset = parseInt(appearoffset, 10);

            if ($(window).scrollTop() >= appearoffset) {
                if (el.css('visibility') == 'hidden') {
                    el.finish();
                    el.css("top", "-50px");
                    el.css("visibility", "visible");
                    el.animate({
                        "opacity": "1",
                        "top": "0px"
                    }, 200, function () {});
                }
            } else {
                el.stop();
                el.css("visibility", "hidden");
            }
        }
    });
}
 
function t391_checkSize(recid){
  var el=$("#rec"+recid);
  var cover = el.find('.t-cover');
  var carrier = el.find('.t-cover__carrier');
  var filter = el.find('.t-cover__filter');
  var height = el.find('.t391__firstcol').height() + el.find('.t391__secondcol').height();
  if (window.matchMedia('(max-width: 960px)').matches && height > 0) {
    cover.css('height',height);
    carrier.css('height',height);
    filter.css('height',height);
  }
} 

function t396_init(recid){var data='';var res=t396_detectResolution();t396_initTNobj();t396_switchResolution(res);t396_updateTNobj();t396_artboard_build(data,recid);window.tn_window_width=$(window).width();$( window ).resize(function () {tn_console('>>>> t396: Window on Resize event >>>>');t396_waitForFinalEvent(function(){if($isMobile){var ww=$(window).width();if(ww!=window.tn_window_width){t396_doResize(recid);}}else{t396_doResize(recid);}}, 500, 'resizeruniqueid'+recid);});$(window).on("orientationchange",function(){tn_console('>>>> t396: Orient change event >>>>');t396_waitForFinalEvent(function(){t396_doResize(recid);}, 600, 'orientationuniqueid'+recid);});$( window ).load(function() {var ab=$('#rec'+recid).find('.t396__artboard');t396_allelems__renderView(ab);if (typeof t_lazyload_update === 'function' && ab.css('overflow') === 'auto') {ab.bind('scroll', t_throttle(function() {if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {t_onFuncLoad('t_lazyload_update', function () {t_lazyload_update();});}}, 500));}if (window.location.hash !== '' && ab.css('overflow') === 'visible') {ab.css('overflow', 'hidden');setTimeout( function() { ab.css('overflow', 'visible');}, 1);}});var rec = $('#rec' + recid);if (rec.attr('data-connect-with-tab') == 'yes') {rec.find('.t396').bind('displayChanged', function() {var ab = rec.find('.t396__artboard');t396_allelems__renderView(ab);});}}function t396_doResize(recid){var ww;if($isMobile){ww=$(window).width();} else {ww=window.innerWidth;}window.tn_window_width=ww;var res=t396_detectResolution();var ab=$('#rec'+recid).find('.t396__artboard');t396_switchResolution(res);t396_updateTNobj();t396_ab__renderView(ab);t396_allelems__renderView(ab);}function t396_detectResolution(){var ww;if($isMobile){ww=$(window).width();} else {ww=window.innerWidth;}var res;res=1200;if(ww<1200){res=960;}if(ww<960){res=640;}if(ww<640){res=480;}if(ww<480){res=320;}return(res);}function t396_initTNobj(){tn_console('func: initTNobj');window.tn={};window.tn.canvas_min_sizes = ["320","480","640","960","1200"];window.tn.canvas_max_sizes = ["480","640","960","1200",""];window.tn.ab_fields = ["height","width","bgcolor","bgimg","bgattachment","bgposition","filteropacity","filtercolor","filteropacity2","filtercolor2","height_vh","valign"];}function t396_updateTNobj(){tn_console('func: updateTNobj');if(typeof window.zero_window_width_hook!='undefined' && window.zero_window_width_hook=='allrecords' && $('#allrecords').length){window.tn.window_width = parseInt($('#allrecords').width());}else{window.tn.window_width = parseInt($(window).width());}/* window.tn.window_width = parseInt($(window).width()); */window.tn.window_height = parseInt($(window).height());if(window.tn.curResolution==1200){window.tn.canvas_min_width = 1200;window.tn.canvas_max_width = window.tn.window_width;}if(window.tn.curResolution==960){window.tn.canvas_min_width = 960;window.tn.canvas_max_width = 1200;}if(window.tn.curResolution==640){window.tn.canvas_min_width = 640;window.tn.canvas_max_width = 960;}if(window.tn.curResolution==480){window.tn.canvas_min_width = 480;window.tn.canvas_max_width = 640;}if(window.tn.curResolution==320){window.tn.canvas_min_width = 320;window.tn.canvas_max_width = 480;}window.tn.grid_width = window.tn.canvas_min_width;window.tn.grid_offset_left = parseFloat( (window.tn.window_width-window.tn.grid_width)/2 );}var t396_waitForFinalEvent = (function () {var timers = {};return function (callback, ms, uniqueId) {if (!uniqueId) {uniqueId = "Don't call this twice without a uniqueId";}if (timers[uniqueId]) {clearTimeout (timers[uniqueId]);}timers[uniqueId] = setTimeout(callback, ms);};})();function t396_switchResolution(res,resmax){tn_console('func: switchResolution');if(typeof resmax=='undefined'){if(res==1200)resmax='';if(res==960)resmax=1200;if(res==640)resmax=960;if(res==480)resmax=640;if(res==320)resmax=480;}window.tn.curResolution=res;window.tn.curResolution_max=resmax;}function t396_artboard_build(data,recid){tn_console('func: t396_artboard_build. Recid:'+recid);tn_console(data);/* set style to artboard */var ab=$('#rec'+recid).find('.t396__artboard');t396_ab__renderView(ab);/* create elements */ab.find('.tn-elem').each(function() {var item=$(this);if(item.attr('data-elem-type')=='text'){t396_addText(ab,item);}if(item.attr('data-elem-type')=='image'){t396_addImage(ab,item);}if(item.attr('data-elem-type')=='shape'){t396_addShape(ab,item);}if(item.attr('data-elem-type')=='button'){t396_addButton(ab,item);}if(item.attr('data-elem-type')=='video'){t396_addVideo(ab,item);}if(item.attr('data-elem-type')=='html'){t396_addHtml(ab,item);}if(item.attr('data-elem-type')=='tooltip'){t396_addTooltip(ab,item);}if(item.attr('data-elem-type')=='form'){t396_addForm(ab,item);}if(item.attr('data-elem-type')=='gallery'){t396_addGallery(ab,item);}});$('#rec'+recid).find('.t396__artboard').removeClass('rendering').addClass('rendered');if(ab.attr('data-artboard-ovrflw')=='visible'){$('#allrecords').css('overflow','hidden');}if($isMobile){$('#rec'+recid).append('<style>@media only screen and (min-width:1366px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio:2) {.t396__carrier {background-attachment:scroll!important;}}</style>');}}function t396_ab__renderView(ab){var fields = window.tn.ab_fields;for ( var i = 0; i < fields.length; i++ ) {t396_ab__renderViewOneField(ab,fields[i]);}var ab_min_height=t396_ab__getFieldValue(ab,'height');var ab_max_height=t396_ab__getHeight(ab);var offset_top=0;if(ab_min_height==ab_max_height){offset_top=0;}else{var ab_valign=t396_ab__getFieldValue(ab,'valign');if(ab_valign=='top'){offset_top=0;}else if(ab_valign=='center'){offset_top=parseFloat( (ab_max_height-ab_min_height)/2 ).toFixed(1);}else if(ab_valign=='bottom'){offset_top=parseFloat( (ab_max_height-ab_min_height) ).toFixed(1);}else if(ab_valign=='stretch'){offset_top=0;ab_min_height=ab_max_height;}else{offset_top=0;}}ab.attr('data-artboard-proxy-min-offset-top',offset_top);ab.attr('data-artboard-proxy-min-height',ab_min_height);ab.attr('data-artboard-proxy-max-height',ab_max_height);var filter = ab.find('.t396__filter');var carrier = ab.find('.t396__carrier');var abHeightVh = t396_ab__getFieldValue(ab,'height_vh');if (window.isMobile && abHeightVh) {var height = document.documentElement.clientHeight * parseFloat( abHeightVh/100 );ab.css('height', height);filter.css('height', height);carrier.css('height', height);}}function t396_addText(ab,el){tn_console('func: addText');/* add data atributes */var fields_str='top,left,width,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addImage(ab,el){tn_console('func: addImage');/* add data atributes */var fields_str='img,width,filewidth,fileheight,top,left,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);el.find('img').on("load", function() {t396_elem__renderViewOneField(el,'top');if(typeof $(this).attr('src')!='undefined' && $(this).attr('src')!=''){setTimeout( function() { t396_elem__renderViewOneField(el,'top');} , 2000);} }).each(function() {if(this.complete) $(this).load();}); el.find('img').on('tuwidget_done', function(e, file) { t396_elem__renderViewOneField(el,'top');});}function t396_addShape(ab,el){tn_console('func: addShape');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addButton(ab,el){tn_console('func: addButton');/* add data atributes */var fields_str='top,left,width,height,container,axisx,axisy,caption,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);return(el);}function t396_addVideo(ab,el){tn_console('func: addVideo');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);var viel=el.find('.tn-atom__videoiframe');var viatel=el.find('.tn-atom');viatel.css('background-color','#000');var vihascover=viatel.attr('data-atom-video-has-cover');if(typeof vihascover=='undefined'){vihascover='';}if(vihascover=='y'){viatel.click(function() {var viifel=viel.find('iframe');if(viifel.length){var foo=viifel.attr('data-original');viifel.attr('src',foo);}viatel.css('background-image','none');viatel.find('.tn-atom__video-play-link').css('display','none');});}var autoplay=t396_elem__getFieldValue(el,'autoplay');var showinfo=t396_elem__getFieldValue(el,'showinfo');var loop=t396_elem__getFieldValue(el,'loop');var mute=t396_elem__getFieldValue(el,'mute');var startsec=t396_elem__getFieldValue(el,'startsec');var endsec=t396_elem__getFieldValue(el,'endsec');var tmode=$('#allrecords').attr('data-tilda-mode');var url='';var viyid=viel.attr('data-youtubeid');if(typeof viyid!='undefined' && viyid!=''){ url='//www.youtube.com/embed/'; url+=viyid+'?rel=0&fmt=18&html5=1'; url+='&showinfo='+(showinfo=='y'?'1':'0'); if(loop=='y'){url+='&loop=1&playlist='+viyid;} if(startsec>0){url+='&start='+startsec;} if(endsec>0){url+='&end='+endsec;} if(mute=='y'){url+='&mute=1';} if(vihascover=='y'){ url+='&autoplay=1'; viel.html('<iframe id="youtubeiframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); }else{ if(typeof tmode!='undefined' && tmode=='edit'){}else{ if(autoplay=='y'){url+='&autoplay=1';} } if(window.lazy=='y'){ viel.html('<iframe id="youtubeiframe" class="t-iframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="lazy"></iframe>'); el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});<\/script>'); }else{ viel.html('<iframe id="youtubeiframe" width="100%" height="100%" src="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); } }}var vivid=viel.attr('data-vimeoid');if(typeof vivid!='undefined' && vivid>0){url='//player.vimeo.com/video/';url+=vivid+'?color=ffffff&badge=0';if(showinfo=='y'){url+='&title=1&byline=1&portrait=1';}else{url+='&title=0&byline=0&portrait=0';}if(loop=='y'){url+='&loop=1';}if(mute=='y'){url+='&muted=1';}if(vihascover=='y'){url+='&autoplay=1';viel.html('<iframe data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}else{if(typeof tmode!='undefined' && tmode=='edit'){}else{if(autoplay=='y'){url+='&autoplay=1';}}if(window.lazy=='y'){viel.html('<iframe class="t-iframe" data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});<\/script>');}else{viel.html('<iframe src="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}}}}function t396_addHtml(ab,el){tn_console('func: addHtml');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addTooltip(ab, el) {tn_console('func: addTooltip');var fields_str = 'width,height,top,left,';fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits,tipposition';var fields = fields_str.split(',');el.attr('data-fields', fields_str);t396_elem__renderView(el);var pinEl = el.find('.tn-atom__pin');var tipEl = el.find('.tn-atom__tip');var tipopen = el.attr('data-field-tipopen-value');if (isMobile || (typeof tipopen!='undefined' && tipopen=='click')) {t396_setUpTooltip_mobile(el,pinEl,tipEl);} else {t396_setUpTooltip_desktop(el,pinEl,tipEl);}setTimeout(function() {$('.tn-atom__tip-img').each(function() {var foo = $(this).attr('data-tipimg-original');if (typeof foo != 'undefined' && foo != '') {$(this).attr('src', foo);}})}, 3000);}function t396_addForm(ab,el){tn_console('func: addForm');/* add data atributes */var fields_str='width,top,left,';fields_str+='inputs,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addGallery(ab,el){tn_console('func: addForm');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='imgs,container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_elem__setFieldValue(el,prop,val,flag_render,flag_updateui,res){if(res=='')res=window.tn.curResolution;if(res<1200 && prop!='zindex'){el.attr('data-field-'+prop+'-res-'+res+'-value',val);}else{el.attr('data-field-'+prop+'-value',val);}if(flag_render=='render')elem__renderViewOneField(el,prop);if(flag_updateui=='updateui')panelSettings__updateUi(el,prop,val);}function t396_elem__getFieldValue(el,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}if(res==640){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}if(res==480){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}if(res==320){r=el.attr('data-field-'+prop+'-res-320-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}}}else{r=el.attr('data-field-'+prop+'-value');}return(r);}function t396_elem__renderView(el){tn_console('func: elem__renderView');var fields=el.attr('data-fields');if(! fields) {return false;}fields = fields.split(',');/* set to element value of every fieldvia css */for ( var i = 0; i < fields.length; i++ ) {t396_elem__renderViewOneField(el,fields[i]);}}function t396_elem__renderViewOneField(el,field){var value=t396_elem__getFieldValue(el,field);if(field=='left'){value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('left',parseFloat(value).toFixed(1)+'px');}if(field=='top'){value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('top',parseFloat(value).toFixed(1)+'px');}if(field=='width'){value = t396_elem__getWidth(el,value);el.css('width',parseFloat(value).toFixed(1)+'px');var eltype=el.attr('data-elem-type');if(eltype=='tooltip'){var pinSvgIcon = el.find('.tn-atom__pin-icon');/*add width to svg nearest parent to fix InternerExplorer problem*/if (pinSvgIcon.length > 0) {var pinSize = parseFloat(value).toFixed(1) + 'px';pinSvgIcon.css({'width': pinSize, 'height': pinSize});}el.css('height',parseInt(value).toFixed(1)+'px');}if(eltype=='gallery') {var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');if (borderStyle=='none' || typeof borderStyle=='undefined' || typeof borderWidth=='undefined' || borderWidth=='') borderWidth=0;value = value*1 - borderWidth*2;el.css('width', parseFloat(value).toFixed(1)+'px');el.find('.t-slds__main').css('width', parseFloat(value).toFixed(1)+'px');el.find('.tn-atom__slds-img').css('width', parseFloat(value).toFixed(1)+'px');}}if(field=='height'){var eltype = el.attr('data-elem-type');if (eltype == 'tooltip') {return;}value=t396_elem__getHeight(el,value);el.css('height', parseFloat(value).toFixed(1)+'px');if (eltype === 'gallery') {var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');if (borderStyle=='none' || typeof borderStyle=='undefined' || typeof borderWidth=='undefined' || borderWidth=='') borderWidth=0;value = value*1 - borderWidth*2;el.css('height',parseFloat(value).toFixed(1)+'px');el.find('.tn-atom__slds-img').css('height', parseFloat(value).toFixed(1) + 'px');el.find('.t-slds__main').css('height', parseFloat(value).toFixed(1) + 'px');}}if(field=='container'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='width' || field=='height' || field=='fontsize' || field=='fontfamily' || field=='letterspacing' || field=='fontweight' || field=='img'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='inputs'){value=el.find('.tn-atom__inputs-textarea').val();try {t_zeroForms__renderForm(el,value);} catch (err) {}}}function t396_elem__convertPosition__Local__toAbsolute(el,field,value){value = parseInt(value);if(field=='left'){var el_container,offset_left,el_container_width,el_width;var container=t396_elem__getFieldValue(el,'container');if(container=='grid'){el_container = 'grid';offset_left = window.tn.grid_offset_left;el_container_width = window.tn.grid_width;}else{el_container = 'window';offset_left = 0;el_container_width = window.tn.window_width;}/* fluid or not*/var el_leftunits=t396_elem__getFieldValue(el,'leftunits');if(el_leftunits=='%'){value = t396_roundFloat( el_container_width * value/100 );}value = offset_left + value;var el_axisx=t396_elem__getFieldValue(el,'axisx');if(el_axisx=='center'){el_width = t396_elem__getWidth(el);value = el_container_width/2 - el_width/2 + value;}if(el_axisx=='right'){el_width = t396_elem__getWidth(el);value = el_container_width - el_width + value;}}if(field=='top'){var ab=el.parent();var el_container,offset_top,el_container_height,el_height;var container=t396_elem__getFieldValue(el,'container');if(container=='grid'){el_container = 'grid';offset_top = parseFloat( ab.attr('data-artboard-proxy-min-offset-top') );el_container_height = parseFloat( ab.attr('data-artboard-proxy-min-height') );}else{el_container = 'window';offset_top = 0;el_container_height = parseFloat( ab.attr('data-artboard-proxy-max-height') );}/* fluid or not*/var el_topunits=t396_elem__getFieldValue(el,'topunits');if(el_topunits=='%'){value = ( el_container_height * (value/100) );}value = offset_top + value;var el_axisy=t396_elem__getFieldValue(el,'axisy');if(el_axisy=='center'){/* var el_height=parseFloat(el.innerHeight()); */el_height=t396_elem__getHeight(el);if (el.attr('data-elem-type') === 'image') {el_width = t396_elem__getWidth(el);var fileWidth = t396_elem__getFieldValue(el,'filewidth');var fileHeight = t396_elem__getFieldValue(el,'fileheight');if (fileWidth && fileHeight) {var ratio = parseInt(fileWidth) / parseInt(fileHeight);el_height = el_width / ratio;}}value = el_container_height/2 - el_height/2 + value;}if(el_axisy=='bottom'){/* var el_height=parseFloat(el.innerHeight()); */el_height=t396_elem__getHeight(el);if (el.attr('data-elem-type') === 'image') {el_width = t396_elem__getWidth(el);var fileWidth = t396_elem__getFieldValue(el,'filewidth');var fileHeight = t396_elem__getFieldValue(el,'fileheight');if (fileWidth && fileHeight) {var ratio = parseInt(fileWidth) / parseInt(fileHeight);el_height = el_width / ratio;}}value = el_container_height - el_height + value;} }return(value);}function t396_ab__setFieldValue(ab,prop,val,res){/* tn_console('func: ab__setFieldValue '+prop+'='+val);*/if(res=='')res=window.tn.curResolution;if(res<1200){ab.attr('data-artboard-'+prop+'-res-'+res,val);}else{ab.attr('data-artboard-'+prop,val);}}function t396_ab__getFieldValue(ab,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}if(res==640){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}if(res==480){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}if(res==320){r=ab.attr('data-artboard-'+prop+'-res-320');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}}}else{r=ab.attr('data-artboard-'+prop);}return(r);}function t396_ab__renderViewOneField(ab,field){var value=t396_ab__getFieldValue(ab,field);}function t396_allelems__renderView(ab){tn_console('func: allelems__renderView: abid:'+ab.attr('data-artboard-recid'));ab.find(".tn-elem").each(function() {t396_elem__renderView($(this));});}function t396_ab__filterUpdate(ab){var filter=ab.find('.t396__filter');var c1=filter.attr('data-filtercolor-rgb');var c2=filter.attr('data-filtercolor2-rgb');var o1=filter.attr('data-filteropacity');var o2=filter.attr('data-filteropacity2');if((typeof c2=='undefined' || c2=='') && (typeof c1!='undefined' && c1!='')){filter.css("background-color", "rgba("+c1+","+o1+")");}else if((typeof c1=='undefined' || c1=='') && (typeof c2!='undefined' && c2!='')){filter.css("background-color", "rgba("+c2+","+o2+")");}else if(typeof c1!='undefined' && typeof c2!='undefined' && c1!='' && c2!=''){filter.css({background: "-webkit-gradient(linear, left top, left bottom, from(rgba("+c1+","+o1+")), to(rgba("+c2+","+o2+")) )" });}else{filter.css("background-color", 'transparent');}}function t396_ab__getHeight(ab, ab_height){if(typeof ab_height=='undefined')ab_height=t396_ab__getFieldValue(ab,'height');ab_height=parseFloat(ab_height);/* get Artboard height (fluid or px) */var ab_height_vh=t396_ab__getFieldValue(ab,'height_vh');if(ab_height_vh!=''){ab_height_vh=parseFloat(ab_height_vh);if(isNaN(ab_height_vh)===false){var ab_height_vh_px=parseFloat( window.tn.window_height * parseFloat(ab_height_vh/100) );if( ab_height < ab_height_vh_px ){ab_height=ab_height_vh_px;}}} return(ab_height);} function t396_hex2rgb(hexStr){/*note: hexStr should be #rrggbb */var hex = parseInt(hexStr.substring(1), 16);var r = (hex & 0xff0000) >> 16;var g = (hex & 0x00ff00) >> 8;var b = hex & 0x0000ff;return [r, g, b];}String.prototype.t396_replaceAll = function(search, replacement) {var target = this;return target.replace(new RegExp(search, 'g'), replacement);};function t396_elem__getWidth(el,value){if(typeof value=='undefined')value=parseFloat( t396_elem__getFieldValue(el,'width') );var el_widthunits=t396_elem__getFieldValue(el,'widthunits');if(el_widthunits=='%'){var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( window.tn.window_width * parseFloat( parseInt(value)/100 ) );}else{value=parseFloat( window.tn.grid_width * parseFloat( parseInt(value)/100 ) );}}return(value);}function t396_elem__getHeight(el,value){if(typeof value=='undefined')value=t396_elem__getFieldValue(el,'height');value=parseFloat(value);if(el.attr('data-elem-type')=='shape' || el.attr('data-elem-type')=='video' || el.attr('data-elem-type')=='html' || el.attr('data-elem-type')=='gallery'){var el_heightunits=t396_elem__getFieldValue(el,'heightunits');if(el_heightunits=='%'){var ab=el.parent();var ab_min_height=parseFloat( ab.attr('data-artboard-proxy-min-height') );var ab_max_height=parseFloat( ab.attr('data-artboard-proxy-max-height') );var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( ab_max_height * parseFloat( value/100 ) );}else{value=parseFloat( ab_min_height * parseFloat( value/100 ) );}}}else if(el.attr('data-elem-type')=='button'){value = value;}else{value =parseFloat(el.innerHeight());}return(value);}function t396_roundFloat(n){n = Math.round(n * 100) / 100;return(n);}function tn_console(str){if(window.tn_comments==1)console.log(str);}function t396_setUpTooltip_desktop(el, pinEl, tipEl) {var timer;pinEl.mouseover(function() {/*if any other tooltip is waiting its timeout to be hided — hide it*/$('.tn-atom__tip_visible').each(function(){var thisTipEl = $(this).parents('.t396__elem');if (thisTipEl.attr('data-elem-id') != el.attr('data-elem-id')) {t396_hideTooltip(thisTipEl, $(this));}});clearTimeout(timer);if (tipEl.css('display') == 'block') {return;}t396_showTooltip(el, tipEl);});pinEl.mouseout(function() {timer = setTimeout(function() {t396_hideTooltip(el, tipEl);}, 300);})}function t396_setUpTooltip_mobile(el,pinEl,tipEl) {pinEl.on('click', function(e) {if (tipEl.css('display') == 'block' && $(e.target).hasClass("tn-atom__pin")) {t396_hideTooltip(el,tipEl);} else {t396_showTooltip(el,tipEl);}});var id = el.attr("data-elem-id");$(document).click(function(e) {var isInsideTooltip = ($(e.target).hasClass("tn-atom__pin") || $(e.target).parents(".tn-atom__pin").length > 0);if (isInsideTooltip) {var clickedPinId = $(e.target).parents(".t396__elem").attr("data-elem-id");if (clickedPinId == id) {return;}}t396_hideTooltip(el,tipEl);})}function t396_hideTooltip(el, tipEl) {tipEl.css('display', '');tipEl.css({"left": "","transform": "","right": ""});tipEl.removeClass('tn-atom__tip_visible');el.css('z-index', '');}function t396_showTooltip(el, tipEl) {var pos = el.attr("data-field-tipposition-value");if (typeof pos == 'undefined' || pos == '') {pos = 'top';};var elSize = el.height();var elTop = el.offset().top;var elBottom = elTop + elSize;var elLeft = el.offset().left;var elRight = el.offset().left + elSize;var winTop = $(window).scrollTop();var winWidth = $(window).width();var winBottom = winTop + $(window).height();var tipElHeight = tipEl.outerHeight();var tipElWidth = tipEl.outerWidth();var padd=15;if (pos == 'right' || pos == 'left') {var tipElRight = elRight + padd + tipElWidth;var tipElLeft = elLeft - padd - tipElWidth;if ((pos == 'right' && tipElRight > winWidth) || (pos == 'left' && tipElLeft < 0)) {pos = 'top';}}if (pos == 'top' || pos == 'bottom') {var tipElRight = elRight + (tipElWidth / 2 - elSize / 2);var tipElLeft = elLeft - (tipElWidth / 2 - elSize / 2);if (tipElRight > winWidth) {var rightOffset = -(winWidth - elRight - padd);tipEl.css({"left": "auto","transform": "none","right": rightOffset + "px"});}if (tipElLeft < 0) {var leftOffset = -(elLeft - padd);tipEl.css({"left": leftOffset + "px","transform": "none"});}}if (pos == 'top') {var tipElTop = elTop - padd - tipElHeight;var tipElBottom = elBottom + padd + tipElHeight;if (winBottom > tipElBottom && winTop > tipElTop) {pos = 'bottom';}}if (pos == 'bottom') {var tipElTop = elTop - padd - tipElHeight;var tipElBottom = elBottom + padd + tipElHeight;if (winBottom < tipElBottom && winTop < tipElTop) {pos = 'top';}}tipEl.attr('data-tip-pos', pos);tipEl.css('display', 'block');tipEl.addClass('tn-atom__tip_visible');el.css('z-index', '1000');}function t396_hex2rgba(hexStr, opacity){var hex = parseInt(hexStr.substring(1), 16);var r = (hex & 0xff0000) >> 16;var g = (hex & 0x00ff00) >> 8;var b = hex & 0x0000ff;return [r, g, b, parseFloat(opacity)];} 
 
function t397_init(recid) {
    var el = $('#rec' + recid);
    var curMode = $('.t-records').attr('data-tilda-mode');
    var tabs = el.find('.t397__tab');

    if (curMode != 'edit' && curMode != 'preview') {
        t397_scrollToTabs(recid);
    }

    if (tabs.length > 0) {
        tabs.click(function () {
            if ($(this).hasClass('t397__tab_active')) {
                return;
            }
            el.find('.t397__tab').removeClass('t397__tab_active');
            $(this).addClass('t397__tab_active');

            t397_removeUrl();
            var tabNumber = el.find(".t397__tab_active").index() + 1;
            if (curMode != 'edit' && curMode != 'preview' && tabNumber !== 0) {
                if (typeof history.replaceState != 'undefined') {
                    window.history.replaceState('', '', window.location.href + '#!/tab/' + recid + '-' + tabNumber);
                }
            }

            t397_alltabs_updateContent(recid);
            t397_updateSelect(recid);

            var recids = $(this).attr('data-tab-rec-ids').split(',');
            recids.forEach(function (recid) {
                var el = $('#rec' + recid);
                el.find('.t-feed, .t-store, .t-store__product-snippet, .t117, .t121, .t132, .t223, .t226, .t228, .t229, .t230, .t268, .t279, .t341, .t346, .t347, .t349, .t351, .t353, .t384, .t385, .t386, .t396, .t400, .t404, .t409, .t410, .t412, .t418, .t422, .t425, .t428, .t433, .t456, .t477, .t478, .t480, .t486, .t498, .t504, .t506, .t509, .t511, .t517, .t518, .t519, .t520, .t532, .t533, .t538, .t539, .t544, .t545, .t552, .t554, .t570, .t577, .t592, .t598, .t599, .t601, .t604, .t605, .t609, .t615, .t616, .t650, .t659, .t670, .t675, .t686, .t688, .t694, .t698, .t700, .t726, .t728, .t730, .t734, .t738, .t740, .t744, .t754, .t760, .t762, .t764, .t774, .t776, .t778, .t780, .t786, .t798, .t799, .t801, .t813, .t814, .t822, .t826, .t827, .t829, .t842, .t843, .t849, .t850, .t851, .t856, .t858, .t859, .t860, .t881, .t902, .t912, .t923, .t937, .t959, .t979, .t982, .t983, .t989').trigger('displayChanged');
            });

            t397_startUpdateLazyLoad($(this));
            if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function () {
                    t_lazyload_update();
                });
            }
        });

        t397_alltabs_updateContent(recid);
        t397_updateContentBySelect(recid);

        var bgcolor = el.css("background-color");
        var bgcolor_target = el.find(".t397__select, .t397__firefoxfix");
        bgcolor_target.css("background-color", bgcolor);
    }

    /* Scroll and open proper tab on a valid link click */
    $('.r').on('click', '[href*="#!/tab/' + recid + '"]', function (e) {
        var hash = e.currentTarget.hash;
        t397_scrollToTabs(recid, hash);
    });
}

function t397_alltabs_updateContent(recid) {
    var mainRecid = recid;
    var el = $('#rec' + recid);

    var activeTab = el.find(".t397__tab_active");
    if (activeTab.length === 1) {
        var active = activeTab.attr('data-tab-rec-ids').split(',');
        var noactive = [];

        el.find(".t397__tab:not(.t397__tab_active)").each(function (i, tab) {
            noactive = noactive.concat($(tab).attr('data-tab-rec-ids').split(','));
        });

        var unique = noactive.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });

        var off = unique.filter(function (value) {
            return $.inArray(value, active) === -1;
        });

        if (el.find(".t397__tab_active").is(":visible") || el.find(".t397__select").is(":visible")) {
            active.forEach(function (recid) {
                if (recid !== '') {
                    var el = $('#rec' + recid);
                    var recordType = el.attr('data-record-type');
                    el.removeClass('t397__off');
                    el.css('opacity', '');

                    if (recordType === '395' && t395_alltabs_updateContent !== undefined && t395_updateSelect !== undefined && mainRecid !== recid) {
                        t395_alltabs_updateContent(recid);
                        t395_updateSelect(recid);
                        el.find('.t395__tab:nth-child(1)').trigger('click');
                    }

                    if (recordType === '397' && mainRecid !== recid) {
                        t397_alltabs_updateContent(recid);
                        t397_updateSelect(recid);
                        el.find('.t397__tab:nth-child(1)').trigger('click');
                    }
                }
            });
        } else {
            active.forEach(function (recid) {
                var el = $('#rec' + recid);
                el.attr('data-animationappear', 'off');
                el.addClass('t397__off');
            });
        }

        off.forEach(function (recid) {
            if (recid !== '') {
                var el = $('#rec' + recid);
                var recordType = el.attr('data-record-type');
                el.attr('data-connect-with-tab', 'yes');
                el.attr('data-animationappear', 'off');
                el.addClass('t397__off');

                if (recordType === '395' && t395_alltabs_updateContent !== undefined && t395_updateSelect !== undefined && mainRecid !== recid) {
                    t395_alltabs_updateContent(recid);
                    t395_updateSelect(recid);
                    el.find('.t395__tab:nth-child(1)').trigger('click');
                }

                if (recordType === '397' && mainRecid !== recid) {
                    t397_alltabs_updateContent(recid);
                    t397_updateSelect(recid);
                    el.find('.t397__tab:nth-child(1)').trigger('click');
                }
            }
        });
    }
}

function t397_updateContentBySelect(recid) {
    var el = $('#rec' + recid);
    el.find(".t397__select").change(function () {
        var select_val = el.find(".t397__select").val();
        var tab_index = el.find(".t397__tab[data-tab-rec-ids='" + select_val + "']");
        tab_index.trigger('click')
    })
}

function t397_updateSelect(recid) {
    var el = $('#rec' + recid);
    var current_tab = el.find(".t397__tab_active").attr('data-tab-rec-ids');
    var el_select = el.find(".t397__select");
    el_select.val(current_tab)
}

function t397_startUpdateLazyLoad($this) {
    var rec_ids = $this.attr('data-tab-rec-ids').split(',');
    rec_ids.forEach(function (rec_id, i, arr) {
        var rec_el = $('#rec' + rec_id);

        var video = rec_el.find('.t-video-lazyload');
        if (video.length > 0) {
            t397_updateVideoLazyLoad(video);
        }
    });
}

function t397_updateVideoLazyLoad(video) {
    setTimeout(function () {
        video.each(function () {
            var div = $(this);

            if (!div.hasClass('t-video__isload')) {

                var height = div.attr('data-videolazy-height') ? $(this).attr('data-videolazy-height') : '100%';
                if (height.indexOf('vh') != -1) {
                    height = '100%';
                }

                var videoId = div.attr('data-videolazy-id').trim();
                var blockId = div.attr('data-blocklazy-id') || '';
                if (typeof div.attr('data-videolazy-two-id') != 'undefined') {
                    var videoTwoId = '_' + div.attr('data-videolazy-two-id') + '_';
                } else {
                    var videoTwoId = '';
                }

                if (div.attr('data-videolazy-type') == 'youtube') {
                    div.find('iframe').remove();
                    div.prepend('<iframe id="youtubeiframe' + videoTwoId + blockId + '" width="100%" height="' + height + '" src="//www.youtube.com/embed/' + videoId + '?rel=0&fmt=18&html5=1&showinfo=0" frameborder="0" allowfullscreen></iframe>');
                }
            }

            div.addClass('t-video__isload');
        });
    }, 2);
}

function t397_scrollToTabs(recid, hash) {
    var el = $('#rec' + recid);
    var curUrl = '';
    if (hash) {
        curUrl = hash;
    } else {
        curUrl = window.location.href;
    }
    var tabIndexNumber = curUrl.indexOf('#!/tab/');
    var tabIndexNumberStart = curUrl.indexOf('tab/');

    el.find('.t397__wrapper_mobile .t397__select option:eq(0)').prop('selected', false);

    if (tabIndexNumber !== -1) {
        var tabRec = curUrl.substring(tabIndexNumberStart + 4, tabIndexNumberStart + 4 + recid.length);

        if (tabRec == recid) {
            var tabBlock = $('#rec' + tabRec).find('.t397');
            var tabNumber = parseInt(curUrl.slice(tabIndexNumberStart + 4 + recid.length + 1), 10);
            el.find('.t397__tab').removeClass('t397__tab_active');
            el.find('.t397__tab:eq(' + (tabNumber - 1) + ')').addClass('t397__tab_active').trigger('click');
            el.find('.t397__wrapper_mobile .t397__select option:eq(' + (tabNumber - 1) + ')').prop('selected', true);

            var targetOffset = tabBlock.offset().top;
            var target = targetOffset;

            if ($(window).width() > 960) {
                target = targetOffset - 200;
            } else {
                target = targetOffset - 100;
            }

            $('html, body').animate({
                scrollTop: target
            }, 300);
        }
    }
}

function t397_removeUrl() {
    var curUrl = window.location.href;
    var indexToRemove = curUrl.indexOf('#!/tab/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove < 0) {
        indexToRemove = curUrl.indexOf('%23!/tab/');
    }

    curUrl = curUrl.substring(0, indexToRemove);
    if (indexToRemove != -1) {
        if (typeof history.replaceState != 'undefined') {
            window.history.replaceState('', '', curUrl);
        }
    }
}
 
function t650_unifyHeights(recid) {
if($(window).width()>=960){
	$('#rec'+recid+' .t650 .t-container .t650__row').each(function() {
		var t650_highestBox = 0,
			t650_currow = $(this);
		$('.t650__inner-col', this).each(function(){
			var t650_curCol = $(this),
                t650_curText = t650_curCol.find(".t650__text"),
                t650_curBtn = t650_curCol.find(".t650__btn-container"),
                t650_curColHeight = t650_curText.outerHeight() + t650_curBtn.outerHeight();			
			if(t650_curColHeight > t650_highestBox){t650_highestBox = t650_curColHeight;}
		});
		$('.t650__inner-col',this).css('height', t650_highestBox);
	});
} else {
	$('.t650__inner-col').css('height', 'auto');
}
}
 
function t670_init(recid) {
    t670_imageHeight(recid);
    t670_show(recid);
    t670_hide(recid);
}

function t670_show(recid) {
    var el = $('#rec' + recid);
    var play = el.find('.t670__play');
    play.click(function () {
        if ($(this).attr('data-slider-video-type') == 'youtube') {
            var url = $(this).attr('data-slider-video-url');
            $(this).next().html("<iframe class=\"t670__iframe\" width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/" + url + "?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
        }
        if ($(this).attr('data-slider-video-type') == 'vimeo') {
            var url = $(this).attr('data-slider-video-url');
            $(this).next().html("<iframe class=\"t670__iframe\" width=\"100%\" height=\"100%\" src=\"https://player.vimeo.com/video/" + url + "\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>");
        }
        $(this).next().css('z-index', '3');
    });
}

function t670_hide(recid) {
    var el = $('#rec' + recid);
    var body = el.find('.t670__frame');
    el.on('updateSlider', function () {
        body.html('').css('z-index', '');
    });
}

function t670_imageHeight(recid) {
    var el = $('#rec' + recid);
    var image = el.find('.t670__separator');
    image.each(function () {
        var width = $(this).attr('data-slider-image-width');
        var height = $(this).attr('data-slider-image-height');
        var ratio = height / width;
        var padding = ratio * 100;
        $(this).css('padding-bottom', padding + '%');
    });
} 
function t702_initPopup(recid) {
    $('#rec' + recid).attr('data-animationappear', 'off');
    $('#rec' + recid).css('opacity', '1');
    var el = $('#rec' + recid).find('.t-popup'),
        hook = el.attr('data-tooltip-hook'),
        analitics = el.attr('data-track-popup');

    el.bind('scroll', t_throttle(function () {
        if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
            t_onFuncLoad('t_lazyload_update', function () {
                t_lazyload_update();
            });
        }
    }));

    if (hook !== '') {
        $('.r').on('click', 'a[href="' + hook + '"]', function (e) {
            t702_showPopup(recid);
            t702_resizePopup(recid);
            e.preventDefault();
            if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function () {
                    t_lazyload_update();
                });
            }
            if (analitics > '') {
                var virtTitle = hook;
                if (virtTitle.substring(0, 7) == '#popup:') {
                    virtTitle = virtTitle.substring(7);
                }
                Tilda.sendEventToStatistics(analitics, virtTitle);
            }
        });
    }
}

function t702_onSuccess(t702_form) {
    var t702_inputsWrapper = t702_form.find('.t-form__inputsbox');
    var t702_inputsHeight = t702_inputsWrapper.height();
    var t702_inputsOffset = t702_inputsWrapper.offset().top;
    var t702_inputsBottom = t702_inputsHeight + t702_inputsOffset;
    var t702_targetOffset = t702_form.find('.t-form__successbox').offset().top;

    if ($(window).width() > 960) {
        var t702_target = t702_targetOffset - 200;
    } else {
        var t702_target = t702_targetOffset - 100;
    }

    if (t702_targetOffset > $(window).scrollTop() || ($(document).height() - t702_inputsBottom) < ($(window).height() - 100)) {
        t702_inputsWrapper.addClass('t702__inputsbox_hidden');
        setTimeout(function () {
            if ($(window).height() > $('.t-body').height()) {
                $('.t-tildalabel').animate({
                    opacity: 0
                }, 50);
            }
        }, 300);
    } else {
        $('html, body').animate({
            scrollTop: t702_target
        }, 400);
        setTimeout(function () {
            t702_inputsWrapper.addClass('t702__inputsbox_hidden');
        }, 400);
    }

    var successurl = t702_form.data('success-url');
    if (successurl && successurl.length > 0) {
        setTimeout(function () {
            window.location.href = successurl;
        }, 500);
    }

}


function t702_lockScroll() {
    var body = $("body");
    if (!body.hasClass('t-body_scroll-locked')) {
        var bodyScrollTop = (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        body.addClass('t-body_scroll-locked');
        body.css("top", "-" + bodyScrollTop + "px");
        body.attr("data-popup-scrolltop", bodyScrollTop);
    }
}

function t702_unlockScroll() {
    var body = $("body");
    if (body.hasClass('t-body_scroll-locked')) {
        var bodyScrollTop = $("body").attr("data-popup-scrolltop");
        body.removeClass('t-body_scroll-locked');
        body.css("top", "");
        body.removeAttr("data-popup-scrolltop")
        window.scrollTo(0, bodyScrollTop);
    }
}


function t702_showPopup(recid) {
    var el = $('#rec' + recid),
        popup = el.find('.t-popup');

    popup.css('display', 'block');
    el.find('.t-range').trigger('popupOpened');
    if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
        t_onFuncLoad('t_lazyload_update', function () {
            t_lazyload_update();
        });
    }
    setTimeout(function () {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
    }, 50);

    $('body').addClass('t-body_popupshowed t702__body_popupshowed');
    /*fix IOS11 cursor bug + general IOS background scroll*/
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
        setTimeout(function () {
            t702_lockScroll();
        }, 500);
    }
    el.find('.t-popup').mousedown(function (e) {
        var windowWidth = $(window).width();
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if (e.clientX > windowWithoutScrollBar) {
            return;
        }
        if (e.target == this) {
            t702_closePopup(recid);
        }
    });

    el.find('.t-popup__close').click(function (e) {
        t702_closePopup(recid);
    });

    el.find('.t-submit[href*="#"]').click(function (e) {
        if ($('body').hasClass('t-body_scroll-locked')) {
            $('body').removeClass('t-body_scroll-locked');
        }
    });

    el.find('a[href*="#"]').click(function (e) {
        var url = $(this).attr('href');
        if (!url || url.substring(0, 7) != '#price:') {
            t702_closePopup(recid);
            if (!url || url.substring(0, 7) == '#popup:') {
                setTimeout(function () {
                    $('body').addClass('t-body_popupshowed');
                }, 300);
            }
        }
    });

    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            t702_closePopup(recid);
        }
    });
}

function t702_closePopup(recid) {
    $('body').removeClass('t-body_popupshowed t702__body_popupshowed');
    $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');
    /*fix IOS11 cursor bug + general IOS background scroll*/
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
        t702_unlockScroll();
    }
    setTimeout(function () {
        $('.t-popup').not('.t-popup_show').css('display', 'none');
    }, 300);
}

function t702_resizePopup(recid) {
    var el = $("#rec" + recid),
        div = el.find(".t-popup__container").height(),
        win = $(window).height() - 120,
        popup = el.find(".t-popup__container");
    if (div > win) {
        popup.addClass('t-popup__container-static');
    } else {
        popup.removeClass('t-popup__container-static');
    }
}
/* deprecated */
function t702_sendPopupEventToStatistics(popupname) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0, 7) == '#popup:') {
        popupname = popupname.substring(7);
    }

    virtPage += popupname;
    virtTitle += popupname;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
    } else {
        if (ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {
                    'hitType': 'pageview',
                    'page': virtPage,
                    'title': virtTitle
                });
            }
        }

        if (window.mainMetrika > '' && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {
                title: virtTitle,
                referer: window.location.href
            });
        }
    }
} 
function t706_onSuccessCallback(t706_form) {
    $(".t706__cartwin-products").slideUp(10, function () {});
    $(".t706__cartwin-bottom").slideUp(10, function () {});
    $(".t706 .t-form__inputsbox").slideUp(700, function () {});
    try {
        /*fix IOS11 cursor bug + general IOS background scroll*/
        tcart__unlockScroll();
    } catch (e) {}
} 
function t744_init(recid) {
    t_onFuncLoad('t_sldsInit', function () {
        t_sldsInit(recid);
    });

    setTimeout(function () {
        t_onFuncLoad('t_prod__init', function () {
            t_prod__init(recid);
        });
        t744__hoverZoom_init(recid);
    }, 500);

    $('#rec' + recid).find('.t744').bind('displayChanged', function () {
        t744_updateSlider(recid);
    });
}

function t744__hoverZoom_init(recid) {
    if (window.isMobile) {
        return;
    }
    var rec = $('#rec' + recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function (url) {
                    var options = {
                        dataType: 'script',
                        cache: true,
                        url: url
                    };
                    return jQuery.ajax(options);
                };
            }
            $.cachedZoomScript(
                'https://static.tildacdn.com/https://roosyak.github.io/js/tilda-hover-zoom-1.0.min.js'
            ).done(function (script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function () {
                        t_hoverZoom_init(recid, '.t-slds__container');
                    }, 500);
                } else {
                    console.log('Upload script error: ' + textStatus);
                }
            });
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message);
    }
}

function t744_updateSlider(recid) {
    var el = $('#rec' + recid);
    t_onFuncLoad('t_slds_SliderWidth', function () {
        t_slds_SliderWidth(recid);
    });
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_onFuncLoad('t_slds_UpdateSliderHeight', function () {
        t_slds_UpdateSliderHeight(recid);
    });

    t_onFuncLoad('t_slds_UpdateSliderArrowsHeight', function () {
        t_slds_UpdateSliderArrowsHeight(recid);
    });
} 
function t764_init(recid){
    var el = $('#rec' + recid);
    
    t_onFuncLoad('t_sldsInit', function () {
        t_sldsInit(recid);
    });
    t_onFuncLoad('t_slds_SliderWidth', function () {
        t_slds_SliderWidth(recid);
    });
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'), 10);
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });

    t_onFuncLoad('t_slds_UpdateSliderHeight', function () {
        t_slds_UpdateSliderHeight(recid);
    });
    t_onFuncLoad('t_slds_UpdateSliderArrowsHeight', function () {
        t_slds_UpdateSliderArrowsHeight(recid);
    });
    
    el.find('.t764').bind('displayChanged', function() {
        t_onFuncLoad('t_slds_updateSlider', function () {
            t_slds_updateSlider(recid);
        });
    });
}
 
function t774_init(recid){
  t774_unifyHeights(recid);

  $(window).bind('resize', t_throttle(function(){t774_unifyHeights(recid)}, 200));

  $(".t774").bind("displayChanged",function(){
    t774_unifyHeights(recid);
  });
  
    $(window).load(function() {
        t774_unifyHeights(recid);
    });  
    
    setTimeout(function(){
      t774__updateLazyLoad(recid);
    }, 500);    
}


function t774__updateLazyLoad(recid) {
  var scrollContainer = $("#rec"+recid+" .t774__container_mobile-flex");
  var curMode = $(".t-records").attr("data-tilda-mode");
  if (scrollContainer.length && curMode!="edit" && curMode!="preview" && window.lazy === "y") {
    scrollContainer.bind('scroll', t_throttle(function() {
        if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
            t_onFuncLoad('t_lazyload_update', function () {
                t_lazyload_update();
            });
        }
    }, 500));
  }
}


function t774_unifyHeights(recid){
    var t774_el = $('#rec'+recid),
        t774_blocksPerRow = t774_el.find(".t774__container").attr("data-blocks-per-row"),
        t774_cols = t774_el.find(".t774__content"),
		t774_mobScroll = t774_el.find(".t774__scroll-icon-wrapper").length;

	if($(window).width()<=480 && t774_mobScroll==0){
		t774_cols.css("height","auto");
		return;
	}

   	var t774_perRow = +t774_blocksPerRow;	
	if ($(window).width()<=960 && t774_mobScroll>0) {var t774_perRow = t774_cols.length;}
	else { if ($(window).width()<=960) {var t774_perRow = 2;} }

	for( var i = 0; i < t774_cols.length; i +=t774_perRow ){
		var t774_maxHeight = 0,
			t774_row = t774_cols.slice(i, i + t774_perRow);		
		t774_row.each(function(){
          var t774_curText = $(this).find(".t774__textwrapper"),
              t774_curBtns = $(this).find(".t774__btn-wrapper, .t774__btntext-wrapper"),
              t774_itemHeight = t774_curText.outerHeight() + t774_curBtns.outerHeight();		  
          if ( t774_itemHeight > t774_maxHeight ) { t774_maxHeight = t774_itemHeight; }
		});
		t774_row.css( "height", t774_maxHeight );
	}
} 
function t825_initPopup(recid) {
    var rec = $('#rec' + recid);
    $('#rec' + recid).attr('data-animationappear', 'off');
    $('#rec' + recid).css('opacity', '1');
    var el = $('#rec' + recid).find('.t825__popup');
    var analitics = el.attr('data-track-popup');
    var hook = "TildaSendMessageWidget" + recid;
    var obj = $('#rec' + recid + ' .t825__btn');

    obj.click(function (e) {
        if (obj.hasClass('t825__btn_active')) {
            t825_closePopup(rec);
            return;
        }
        obj.addClass('t825__btn_active');
        $('#rec' + recid + ' .t825').addClass('t825_active');
        t825_showPopup(recid);
        e.preventDefault();
        if (analitics > '') {
            Tilda.sendEventToStatistics(analitics, hook);
        }
    });
    
    var whatsAppElement = rec.find('.t825__whatsapp');
    var whatsAppHref = whatsAppElement.attr('href');
    if (typeof whatsAppHref !== 'undefined') {
        t825_removeExtraSymbolsFromWhatsApp(rec, whatsAppElement, whatsAppHref);   
    }

    if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
        t_onFuncLoad('t_lazyload_update', function () {
            t_lazyload_update();
        });
    }
}


function t825_removeExtraSymbolsFromWhatsApp(rec, whatsAppElement, whatsAppHref) {
    if (whatsAppHref.indexOf('?text=') !== -1) {
        var whatsAppHrefArr = whatsAppHref.split('?text=');
        whatsAppHrefArr[0] = whatsAppHrefArr[0].replace(/[\(\)+-]/g, '');
        whatsAppHref = whatsAppHrefArr[0] + '?text=' + whatsAppHrefArr[1];
    } else {
        whatsAppHref = whatsAppHref.replace(/[\(\)+-]/, '');
    }
    
    whatsAppElement.attr('href', whatsAppHref);
}


function t825_showPopup(recid) {
    var el = $('#rec' + recid);
    var popup = el.find('.t825__popup');

    el.find('.t825__btn_wrapper').removeClass('t825__btn_animate');
    el.find('.t825__btn-text').css('display', 'none');
    if ($(window).width() < 960) {
        $('body').addClass('t825__body_popupshowed');
    }

    popup.css('display', 'block');
    setTimeout(function () {
        popup.addClass('t825__popup_show');
    }, 50);

    el.find('.t825__mobile-icon-close').click(function (e) {
        t825_closePopup(el);
    });

    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            t825_closePopup(el);
        }
    });

    if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
        t_onFuncLoad('t_lazyload_update', function () {
            t_lazyload_update();
        });
    }
}

function t825_closePopup(rec) {
    if ($(window).width() < 960) {
        $('body').removeClass('t825__body_popupshowed');
    }
    rec.find('.t825').removeClass('t825_active');
    rec.find('.t825__btn').removeClass('t825__btn_active');
    rec.find('.t825__popup').removeClass('t825__popup_show');
    setTimeout(function () {
        rec.find('.t825__popup').not('.t825__popup_show').css('display', 'none');
    }, 300);
}

function t825_sendPopupEventToStatistics(popupname) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0, 7) == '#popup:') {
        popupname = popupname.substring(7);
    }

    virtPage += popupname;
    virtTitle += popupname;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
    } else {
        if (ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {
                    'hitType': 'pageview',
                    'page': virtPage,
                    'title': virtTitle
                });
            }
        }
        if (window.mainMetrika > '' && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {
                title: virtTitle,
                referer: window.location.href
            });
        }
    }
} 
function t827_init(recid) {
    var rec = $('#rec' + recid);
    var grid = rec.find('.t827__grid');
    var sizer = rec.find('.t827__grid-sizer');
    var item = rec.find('.t827__grid-item');
    var images = rec.find('.t827__grid img');
    var overlay = rec.find('.t827__overlay');
    var startContainerWidth = rec.find('.t827__grid-sizer').width();

    t827_reverse(grid, item);

    images.load(function () {
        t827_initMasonry(rec, recid, grid);
        setTimeout(function () {
            t827_showOverlay(overlay, item);
        }, 500);
    });

    if (overlay.hasClass('t827__overlay_preview')) {
        setTimeout(function () {
            t827_showOverlay(overlay, item);
        }, 1000);
    }

    t827_initMasonry(rec, recid, grid);

    $(window).bind('resize', t_throttle(function() {
        if (typeof window.noAdaptive !== 'undefined' && window.noAdaptive === true && window.isMobile) { return; }
        t827_calcColumnWidth(rec, startContainerWidth, grid, sizer, item);
    }));

    rec.find('.t827').bind('displayChanged', function () {
        t827_initMasonry(rec, recid, grid);
        t827_calcColumnWidth(rec, startContainerWidth, grid, sizer, item);
    });

    setTimeout(function() {
        t827_calcColumnWidth(rec, startContainerWidth, grid, sizer, item);
    });
}


function t827_reverse(grid, item) {
    if (grid.hasClass('t827__grid_reverse')) {
        grid.append(function () {
            return $(this).children().get().reverse();
        });
    }
}

function t827_initMasonry(rec, recid, grid) {
    var $grid = grid;
    var gutterSizerWidth = rec.find('.t827__gutter-sizer').width();
    var gutterElement = rec.find('.t827__gutter-sizer').width() == 40 ? 39 : '#rec' + recid + ' .t827__gutter-sizer';
    t_onFuncLoad('imagesLoaded', function () {
        $grid.imagesLoaded(function () {
            $grid.masonry({
                itemSelector: '#rec' + recid + ' .t827__grid-item',
                columnWidth: '#rec' + recid + ' .t827__grid-sizer',
                gutter: gutterElement,
                isFitWidth: true,
                transitionDuration: 0
            });
        });
    });
}

function t827_showOverlay(overlay, item) {
    if ($(window).width() >= 1024) {
        overlay.css('display', 'block');
    } else {
        item.click(function () {
            if ($(this).find('.t827__overlay').css('opacity') == '0') {
                overlay.css('opacity', '0');
                $(this).find('.t827__overlay').css('opacity', '1');
            } else {
                $(this).find('.t827__overlay').css('opacity', '0');
            }
        });
    }
}

function t827_calcColumnWidth(rec, startcontainerwidth, grid, sizer, item) {
    var containerWidth = rec.find('.t827__container').width();
    var sizerWidth = rec.find('.t827__grid-sizer').width();
    var itemWidth = rec.find('.t827__grid-item').width();
    var gutterSizerWidth = rec.find('.t827__gutter-sizer').width() == 40 ? 39 : rec.find('.t827__gutter-sizer').width();
    var columnAmount = Math.round(containerWidth / startcontainerwidth);
    var newSizerWidth = ((containerWidth - gutterSizerWidth * (columnAmount - 1)) / columnAmount);

    if (containerWidth >= itemWidth) {
        sizer.css('width', newSizerWidth);
        item.css('width', newSizerWidth);
    } else {
        grid.css('width', '100%');
        sizer.css('width', '100%');
        item.css('width', '100%');
    }
}
 
function t923_init(recid) {
    var el = $('#rec' + recid);

    t923_unifyHeights(recid);

    $(window).bind('resize', t_throttle(function () {
        t923_unifyHeights(recid);
    }));

    el.find(".t923").bind("displayChanged", function () {
        t923_unifyHeights(recid);
    });

    $(window).load(function () {
        t923_unifyHeights(recid);
    });
}

function t923_unifyHeights(recid) {
    var el = $('#rec' + recid);
    var cols = el.find(".t923__content");

    var maxHeight = 0;

    cols.each(function () {
        var text = $(this).find(".t923__textwrapper");
        var btns = $(this).find(".t923__btn-wrapper, .t923__btntext-wrapper");
        var itemHeight = text.outerHeight() + btns.outerHeight();

        if (itemHeight > maxHeight) {
            maxHeight = itemHeight;
        }
    });

    cols.each(function (i, el) {
        var height = $(el).css("height");
        if (height !== maxHeight + 'px') {
            $(el).css("height", maxHeight);
        }
    });

    t_onFuncLoad('t_slds_updateSlider', function () {
        t_slds_updateSlider(recid);
    });
}
