var Handlebars = require("handlebars/runtime");  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['chart_image'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"chart\">\n  <div class=\"section-title\"><strong>Lá số "
    + alias4(((helper = (helper = helpers.currentYear || (depth0 != null ? depth0.currentYear : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currentYear","hash":{},"data":data}) : helper)))
    + "</strong></div>\n  <img src=\""
    + alias4(((helper = (helper = helpers.chartImage || (depth0 != null ? depth0.chartImage : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"chartImage","hash":{},"data":data}) : helper)))
    + "\" />\n</div>";
},"useData":true});
templates['client_info'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"client-info\">\n  <div class=\"section-title\"><strong>Thông tin đương số</strong></div>\n  <table>\n    <tbody>\n      <tr>\n        <td class=\"label\">Họ và tên:</td>\n        <td class=\"info\"><strong>"
    + alias4(((helper = (helper = helpers.fullName || (depth0 != null ? depth0.fullName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fullName","hash":{},"data":data}) : helper)))
    + " ("
    + alias4(((helper = (helper = helpers.gender || (depth0 != null ? depth0.gender : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gender","hash":{},"data":data}) : helper)))
    + ")</strong></td>\n      </tr>\n      <tr>\n        <td class=\"label\">Ngày sinh:</td>\n        <td class=\"info\"><strong>"
    + alias4(((helper = (helper = helpers.birthHour || (depth0 != null ? depth0.birthHour : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"birthHour","hash":{},"data":data}) : helper)))
    + ", ngày "
    + alias4(((helper = (helper = helpers.birthDay || (depth0 != null ? depth0.birthDay : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"birthDay","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.birthMonth || (depth0 != null ? depth0.birthMonth : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"birthMonth","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.birthYear || (depth0 != null ? depth0.birthYear : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"birthYear","hash":{},"data":data}) : helper)))
    + " (Dương lịch)</strong></td>\n      </tr>\n      <tr>\n        <td class=\"label\">Email/SĐT:</td>\n        <td class=\"info\"><strong>"
    + alias4(((helper = (helper = helpers.contactDetail || (depth0 != null ? depth0.contactDetail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"contactDetail","hash":{},"data":data}) : helper)))
    + "</strong></td>\n      </tr>\n    </tbody>\n  </table>\n</div>";
},"useData":true});
templates['footer'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"footer wooden\">\n  <div class=\"company-info\">\n    <strong class=\"title\">Phong Thuỷ Tài Vận</strong>\n    <div class=\"address\">\n      <strong class=\"label\">Địa chỉ:</strong>\n      <span>99 Quán Nam, Lê Chân, Hải Phòng</span>\n    </div>\n    <div class=\"address\">\n      <strong class=\"label\">Hotline:</strong>\n      <a href=\"tel:+84886688656\">088.6688.656</a>\n    </div>\n    <div class=\"address\">\n      <strong class=\"label\">Facebook:</strong>\n      <a href=\"https://facebook.com/phongthuytaivan.vn\">phongthuytaivan.vn</a>\n    </div>\n  </div>\n</div>";
},"useData":true});
templates['general_readings'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <div class=\"text-block\">\n      <h2>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\n      <h3>1. Ý nghĩa</h3>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.meanings : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      <h3>2. Luận giải</h3>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.readings : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "        <p>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"content\">\n  <div class=\"section-title\"><strong>Tổng quan lá số</strong></div>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.generalReadings : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
templates['header'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"header wooden\">\n  <div class=\"logo\"></div>\n  <strong class=\"title\">Luận giải lá số Tử vi</strong>\n</div>";
},"useData":true});
templates['opportunities'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "      <p>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"content\">\n  <div class=\"section-title\"><strong>Vận hạn</strong></div>\n  <div class=\"text-block\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.opportunities : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n</div>";
},"useData":true});
templates['questions'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "  <div class=\"content\">\n    <div class=\"section-title\"><strong>Câu hỏi</strong></div>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.questions : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <div class=\"text-block\">\n      <h3>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.answer : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "        <p>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.questions : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['report'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<html>\n  <head>\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"report.css\" />\n    <title>"
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "</title>\n  </head>\n  <body>\n    <div class=\"report\">\n"
    + ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.clientInfo,depth0,{"name":"clientInfo","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.chartImage,depth0,{"name":"chartImage","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.generalReadings,depth0,{"name":"generalReadings","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.opportunities,depth0,{"name":"opportunities","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.questions,depth0,{"name":"questions","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "      <span class=\"eof\">※※※</span>\n"
    + ((stack1 = container.invokePartial(partials.footer,depth0,{"name":"footer","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n  </body>\n</html>";
},"usePartial":true,"useData":true});
