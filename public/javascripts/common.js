
function rootPath() {
  return window.location.protocol + '//' + window.location.host;
}

function formatSeconds(value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
            if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
            }
    }
        var result = ""+parseInt(theTime)+"秒";
        if(theTime1 > 0) {
        result = ""+parseInt(theTime1)+"分"+result;
        }
        if(theTime2 > 0) {
        result = ""+parseInt(theTime2)+"时"+result;
        }
    return result;
}

function bookDetailPage(id) {
  var url = rootPath() + '/book/detail/' + id;
  // //console.log(url);
  window.location.href = url;
}

function ajaxHotdownloads(){
  var url = '/book/hotdownloads/';
  $.ajax({
    type:'get',
    async:true,
    cache:false,
    dataType:"json",
    url:url,
    success:function (books){
      // //console.log(books);
      if (books.count > 0){
        $("#hotdownloadBlock > div").remove();
      }
      // $("#hotdownloadBlock").append("<div class=\"panel panel-default\"id=\"hotdownloadpanel\">");
      // $("#hotdownloadpanel").append("<div class=\"panel-heading\">热门下载</div>");
      // $("#hotdownloadpanel").append("<div class=\"panel-body\" id=\"hotdownload-panel-body\">");
      for (var i=0;i<books.length;i++) {
        var aBook = books[i];
        //console.log('id:' + aBook.id);
        var dom = "<div class=\"col-md-4\">";
        dom += "<div class=\"recommend-item\">";
        dom += "<a onclick=\"javascript:bookDetailPage("
        dom += aBook.id;
        dom += "); return false;\" href=\"#\""
        dom += " class=\"text-center\">";
        dom += "<img src=\"/"
        dom += aBook.cover_url
        dom += "\" class=\"img-responsive center-block\">"
        dom += "<h6>"
        dom += aBook.name;
        dom += "</h6>";
        dom += "</a>";
        dom += "</div>";
        dom += "</div>";

        $("#hotdownloadBlock").append(dom);
      }
      // $("#hotdownloadpanel").append("</div>");
      // $("#hotdownloadBlock").append("</div>");
    }
  })
} 


function ajaxHotArticles(){
  $.ajax({
    type:'get',
    async:true,
    cache:false,
    dataType:"json",
    url:'/article/hot',
    success:function (hot_articles){
      // //console.log(hot_articles);
      $("#hot-articles > ul").remove();
      $("#hot-articles > p").remove();
      $("#hot-articles").append("<p class=\"center-block hotarticle-title\">热门文章</p>");
      $("#hot-articles").append("<ul>");
      for (var i = 0;i<hot_articles.length;i++) {
        var article = hot_articles[i];
        var articleLi = "<li><a class=\"normal\" href=\"/article/detail/" + article.id + "\"><div class=\"hot-article-item\">" + article.title + "</div></a></li>";
        $("#hot-articles").append(articleLi);
      }
      $("#hot-articles").append("</ul>");
    }
  });
}

function ajaxRecommendCourses(){
  $.ajax({
    type:'get',
    async:true,
    cache:true,
    dataType:"json",
    url:'/course/recommends',
    success:function (courses){
      // //console.log(courses);
      $("#recommend-courses-loading").remove();
      if (courses.length == 0) {
        $("#recommend-courses").append("<p class=\"center-block\" id=\"recommend-courses-loading\">暂未找到合适的课程,我们正在计划一大波干货视频,请关注我们的更新...</p>");
      } 
      var coursesDom = "<div class=\"row\">";
      for (var i=0;i<courses.length;i++) {
        var aCourse = courses[i];
        coursesDom += "<div class=\"col-sm-6 col-md-4 col-lg-3\">";
        coursesDom += "<div class=\"course-item\">";
        coursesDom += "<a href=\"/course/detail/";
        coursesDom += aCourse.id;
        coursesDom += "\" class=\"thumbnail\">";

        coursesDom += "<img src=\"/";
        coursesDom += aCourse.cover_url;
        coursesDom += "\" class=\"course-cover-thumbnail\">";

        coursesDom += "<h5>";
        coursesDom += aCourse.title;
        coursesDom += "</h5>";

        coursesDom += "<div class=\"tips\">"
        coursesDom += "<p>";
        coursesDom += aCourse.tip;
        coursesDom += "</p>";

        coursesDom += "<span class=\"l\">";
        coursesDom += aCourse.update_status;
        coursesDom += "</span>";

        coursesDom += "<span class=\"l ml20\">";
        coursesDom += aCourse.studynum;
        coursesDom += "人在学</span>";

        coursesDom += "</div>";
        coursesDom += "</a>";
        coursesDom += "</div>";
        coursesDom += "</div>";

      }
      coursesDom += "</div>";
      $("#recommend-courses").append(coursesDom);
    }
  })
}


function ajaxArticles(){
  $.ajax({
    type:'get',
    async:true,
    cache:true,
    dataType:"json",
    url:'/article/latest',
    success:function (articles){
      //console.log(articles);
      $("#latest-articles-loading").remove();
      if (articles.length == 0) {
        $("#latest-articles").append("<p class=\"center-block\" id=\"recommend-courses-loading\">暂未找到文章,我正在撰写一大波干货分享,请关注我们的更新...</p>");
      } 
      var articlesDom = "<div class=\"row\">";
      articlesDom += "<div class=\"col-md-12\">"
      articlesDom += "<table>";
      articlesDom += "<tbody>";
      for (var i=0;i<articles.length;i++) {
        var article = articles[i];
        articlesDom += "<tr>";
        articlesDom += "<td>";
        articlesDom += "<article class=\"article-except\">";
        articlesDom += "<header>";
        articlesDom += "<h4 class=\"post-title\">";
        articlesDom += "<a href=\"/article/detail/";
        articlesDom += article.id;
        articlesDom += "\">";
        articlesDom += article.title;
        articlesDom += "</a>";
        articlesDom += "</h4>";
        articlesDom += "</header>";

        articlesDom += "<section class=\"post-excerpt\">";
        articlesDom += "<p>";
        articlesDom += article.excerpt;
        console.log(article.excerpt);
        articlesDom += "<a class=\"read-more\" href=\"/article/detail/";
        articlesDom += article.id;
        articlesDom += "\"><button type=\"button\" class=\"btn btn-success btn-xs btn-readmore\">阅读全文</button></a></p>";
        articlesDom += "</section>";


        articlesDom += "<footer class=\"articleFooter\">";
        articlesDom += "<label class=\"label-author\">";
        articlesDom += article.author.nickname;
        articlesDom += "</label>";
        if (article.tags.length > 0) {
          article.tags.forEach(function(tag){
            articlesDom += "<a href=\"/article/list/";
            articlesDom += tag.id;
            articlesDom += "/1\"><button type=\"button\" class=\"btn btn-info btn-xs tag-button\">";
            articlesDom += tag.name;
            articlesDom += "</button></a>";
          })
        }
        articlesDom += "<time class=\"post-date\">";
        articlesDom += new Date(article.createdAt).Format("yyyy-MM-dd hh:mm");
        articlesDom += "</time>";
        articlesDom +="</footer>";
        articlesDom += "</article>";
        articlesDom += "</td>"
        articlesDom += "</tr>"
      }
      articlesDom += "<tbody>";
      articlesDom += "</div>";
      articlesDom += "</div>";

      $("#latest-articles").append(articlesDom);
    }
  })
}


function ajaxBooks(){
  $.ajax({
    type:'get',
    async:true,
    cache:true,
    dataType:"json",
    url:'/book/latest',
    success:function (books){
      //console.log(books);
      $("#latest-books-loading").remove();
      if (books.length == 0) {
        $("#latest-books").append("<p class=\"center-block\" id=\"recommend-courses-loading\">暂未找到书籍,我正在撰写收集一大波精选书籍,请关注我们的更新...</p>");
      } 
      // var booksDom = "<div class=\"row\">";
      // booksDom += "<div class=\"col-md-12\">"
      // booksDom += "<table>";
      // booksDom += "<tbody>";
      // for (var i=0;i<books.length;i++) {
      //   var book = books[i];
      //   booksDom += "<tr>";
      //   booksDom += "<td>";
      //   booksDom += "<a href=\"/book/detail/";
      //   booksDom += book.id;
      //   booksDom += "\">";
      //   booksDom += book.name;
      //   booksDom += "</a>"
      //   booksDom += "</td>"
      //   booksDom += "</tr>"
      // }
      // booksDom += "<tbody>";
      // booksDom += "</div>";
      // booksDom += "</div>";
      for (var i=0;i<books.length;i++) {
        var aBook = books[i];
        //console.log('id:' + aBook.id);
        var dom = "<div class=\"col-md-4\">";
        dom += "<div class=\"recommend-item\">";
        dom += "<a onclick=\"javascript:bookDetailPage("
        dom += aBook.id;
        dom += "); return false;\" href=\"#\""
        dom += " class=\"text-center\">";
        dom += "<img src=\"/"
        dom += aBook.cover_url
        dom += "\" class=\"img-responsive center-block\">"
        dom += "<h6>"
        dom += aBook.name;
        dom += "</h6>";
        dom += "</a>";
        dom += "</div>";
        dom += "</div>";

        $("#latest-books").append(dom);
      }
    }
  })
}
