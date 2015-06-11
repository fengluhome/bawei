


$.mockjax({
    url: '/wap/create',
    dataType: "json",
    responseText: {
        imgHead: "/images/head.png",
        name: "张三",
        time: "2015/5/22 14:20",
        content: "如何理财？"
    }
});
/*
 *详情
 */
$.mockjax({
    url: '/wap/1',
    type: "get",
    responseText: "<div class='article'>\
            <div class='info'>\
                <h3>如何在风口下进行大资产配置操作</h3>\
                <table class='table'>\
                    <tr>\
                        <td rowspan='3' style='width: 100px; padding-left: 7px; vertical-align: top;'>\
                            <div class='user-header' style='background: url(/images/head.png) no-repeat; background-size: contain;; '></div>\
                        </td>\
                        <td>时&nbsp;&nbsp;&nbsp;间：</td>\
                        <td>2015/5/22 14:20</td>\
                    </tr>\
                    <tr>\
                        <td style='width: 60px;'>主讲师：</td>\
                        <td>谢霆锋</td>\
                    </tr>\
                    <tr>\
                        <td class='title'>职&nbsp;&nbsp;&nbsp;务：</td>\
                        <td>华泰证劵&nbsp;高级研究员&nbsp;注册高级研究员</td>\
                    </tr>\
                </table>\
            </div>\
            <div class='section'>\
                <h3>主讲人简历</h3>\
                <div class='txt'>\
                    主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲人简历主讲内容主讲内容\
                </div>\
            </div>\
            <div class='section'>\
                <h3>主讲内容</h3>\
                <div class='txt'>\
                    主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容主讲内容\
                </div>\
            </div>\
        </div>\
        <div class='footer2' style='position:relative;'>\
            <span class='clicbtn' ontouchstart='alerModal.shareModal.show()'>一键分享</span>\
        </div>"
});

/*
 *提问
 */
$.mockjax({
    url: '/wap/2',
    responseText: "    <div class='questioning'>\
            <div class='content' style='background:none; margin-bottom: 0px; ' id='questioning-form'>\
                <table class='postMesage'>\
                    <tr>\
                        <td style='width: 60px'>\
                            <span class='media-object' style='background: url(/images/head.png) no-repeat; background-size: contain;; '></span>\
                        </td>\
                        <td><span> Davia Beckhm</span></td>\
                    </tr>\
                    <tr>\
                        <td colspan='2'>\
                            <textarea class='text' id='questioning-form-txt' onfocus='questioning.foucs(this)' onblur=' questioning.blur(this)' maxlength='430' placeholder='您可向主讲人直接提问，主讲人会予以回复'></textarea>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan='2' style='overflow: hidden;'>\
                            <span class='note'> 您可以输入430个字！</span> <span ontouchstart='questioning.postQuestion(this)' class='clicbtn btn'>提交</span>\
                        </td>\
                    </tr>\
                </table>\
            </div>\
            <div id='questioning-List'>\
            </div>\
            <table class='btngroup' id='question-btngrop'>\
                <tr>\
                    <td><a class='page clicbtn' ontouchstart='questioning.pageNext()'>显示下10条</a></td>\
                </tr>\
            </table>\
        </div>"
});

/*
 *提问 分页
 */
$.mockjax({
    url: '/wap/question/id',
    responseText: " <div class='content'>\
            <div class='media'>\
                <div class='media-left'>\
                    <a href='#'>\
                        <span class='media-object' style='background: url(/images/head.png) no-repeat; background-size: contain; '></span>\
                    </a>\
                </div>\
                <div class='media-body'>\
                    <div class='media-heading'>谢霆锋<span class='time'>2015/5/22 14:20</span></div>\
                    <p><span class='begin'>问：</span>如何在风口下进行大资产下进行大资产配置操作？</p>\
                </div>\
            </div>\
            <div class='media dasheddiv'>\
                <div class='media-left'>\
                    <a href='#'>\
                        <span class='media-object' style='background: url(/images/head.png) no-repeat; background-size: contain; '></span>\
                    </a>\
                </div>\
                <div class='media-body'>\
                    <div class='media-heading'>谢霆锋<span class='time'>2015/5/22 14:20</span></div>\
                    <p><span class='begin'>答：</span>前几天顺丰社区一波三折王卫还是没想清楚一文反响跟预期差不多写此文的目的倒不是要对顺丰指手画脚也不敢妄言给王卫提建议，更不是要针对顺丰电商，只是想以顺丰为例，来探讨一下门店在社区O2O中究竟有没有用，并不是要针对顺丰什么</p>\
                </div>\
            </div>\
        </div>"
});

/*
 *评论
 */
$.mockjax({
    url: '/wap/3',
    responseText: "<table class='postMesage' id='comment-posMessage'>\
            <tbody>\
                <tr>\
                    <td colspan='2'>\
                        <textarea class='text' id='comment-txt' onblur='questioning.blur(this)' onfocus='questioning.foucs(this)' maxlength='430' placeholder='欢迎您评论...'></textarea>\
                    </td>\
                </tr>\
                <tr>\
                    <td colspan='2' style='overflow: hidden;'>\
                        <span class='note'> 您可以输入430个字！</span> <span ontouchstart='comment.postForm(this)' class='clicbtn btn'>提交</span>\
                    </td>\
                </tr>\
            </tbody>\
        </table>\
        <div class='comment'>\
            <div id='comment-List'>\
            </div>\
            <table class='btngroup'>\
                <tbody>\
                    <tr>\
                        <td><a class='page clicbtn' ontouchstart='comment.pageNext()'>显示下10条</a></td>\
                    </tr>\
                </tbody>\
            </table>\
        </div>"
});


/*
 *评论 分页
 */
$.mockjax({
    url: '/wap/comment/id',
    responseText: "<div class='item'>\
        <table>\
            <tr>\
                <td style=' width: 72px;'>\
                    <span class='media-object' style='background: url(/images/head.png) no-repeat; background-size: contain;; '></span>\
                </td>\
                <td>\
                    <div>梁海明</div>\
                    <div class='time'>05-22  14:00</div>\
                </td>\
            </tr>\
            <tr>\
                <td colspan='2'>\
                    <div class='txt'>前几天顺丰社区波三折王卫还是没想清楚一文反响跟预期差不多写此文的目的倒不是要对顺丰指手画脚。</div>\
                </td>\
            </tr>\
        </table>\
    </div>"
});