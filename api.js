Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/

});

Qualtrics.SurveyEngine.addOnload(function()
{

	function jq( myid ) {

    return "#" + myid.replace( /(:|\.|\[|\]|\~|,|=|@)/g, "\\$1" );

	}

	if(typeof(QSettings) != 'undefined'){
  // Get Complete items list for dropdown
  var itemsList = $j("#QID18items li,#QID18group0 li").sort(function (a, b) {
    if(parseInt(a.id.split("~")[2]) > parseInt(b.id.split("~")[2]))
        return 1;
    else
        return -1
  });

  var itemsArr = [];

  //Add removes glyphs to existing selected counties
  $j($(jq("QID18group0"))).find("label").append($j("<span></span>").addClass("glyphicon glyphicon-remove"));
  //Add click listener to remove
  $j($(jq("QID18group0"))).find("label span.glyphicon-remove").click(function(e){
    e.preventDefault();
    var item = this.parentNode.parentNode.parentNode.parentNode.parentNode;
    $(jq("QID18items")).append($(jq(item.id)));
    $j(item).find(".glyphicon").remove();
    $j("#properties option[value='" + item.id +"']").prop("disabled", false);
	var choiceId = item.id.split("~")[2]
	var choice = Qualtrics.SurveyEngine.getInstance("QID18").question.runtime.Choices[choiceId];
	choice.Value = null;
	choice.Group = null;
	choice.Selected = false;
    });
  for(var i=0; i < itemsList.length; i++){
    var item = itemsList[i];
    var id = $j(item).attr("id");
    var name = $j(item).find("label").text();
    itemsArr[i] = {"id": id, "name": name };
  }
  $j(".Items ul").hide();
  $j("#QID18 .Items h2").text("Sectors")
  $j(".Items").append($j('<select></select>').attr("id","properties").addClass("form-control"));
  $j(".Items").append($j('<button>Add Selected</button>').addClass("btn btn-primary").attr("type","button"));
  $j("#properties").append($j("<option value=''></option>"));

  $j.each(itemsArr, function(key, value){
    $j("#properties").append(
      $j("<option></option>")
      .attr("value", value.id)
      .text(value.name));
  });

  $j("#QID18group0 li").each(function(a,b){
    $j("#properties option[value='" + b.id +"']").prop("disabled", true);
  });
  $j("button").click(function(e){
		debugger;
    e.preventDefault();
	choice = Qualtrics.SurveyEngine.getInstance("QID18").question.runtime.Choices[$j($(jq($(jq("properties")).val()))).attr("data-choiceid")];
	choice.Value = "" + 1;
	choice.Group = "" + 0;
	choice.Selected = true;
    $(jq("QID18group0")).append($(jq($(jq("properties")).val())));
    $j($(jq($(jq("properties")).val()))).find("label").append($j("<span></span>").addClass("glyphicon glyphicon-remove"));
    $j($(jq($(jq("properties")).val()))).find("label span.glyphicon-remove").click(function(e){
      e.preventDefault();
    var item = this.parentNode.parentNode.parentNode.parentNode.parentNode;
      $(jq("QID18items")).append($(item.id));
      $j(item).find(".glyphicon").remove();
      $j("#properties option[value='" + item.id +"']").prop("disabled", false);
      var choiceId = item.id.split("~")[2]
	  var choice = Qualtrics.SurveyEngine.getInstance("QID18").question.runtime.Choices[choiceId];
	  choice.Value = null;
	  choice.Group = null;
	  choice.Selected = false;
      });
    $j("#properties option[value='" + $(jq("properties")).value +"']").prop("disabled", true);
    $j("#properties option[value='']").attr('selected', true);
  });
}
	else{
  var itemsList = $j("#QID18items li,#QID18group0 li").sort(function (a, b) {
    if(parseInt(a.id.split("~")[2]) > parseInt(b.id.split("~")[2]))
        return 1;
    else
        return -1
  });
  var itemsArr = [];
  $j($(jq("QID18group0"))).find("label").append($j("<span></span>").addClass("glyphicon glyphicon-remove"));
  $j($(jq("QID18group0"))).find("label span.glyphicon-remove").click(function(e){
    e.preventDefault(); debugger;
    var item = this.parentNode.parentNode.parentNode.parentNode;
    $(jq("QID18items")).append($(item.id));
    $j(item).find(".glyphicon").remove();
    $j("#properties option[value='" + item.id +"']").prop("disabled", false);
    updateInputValues(["QID18group0","QID18items"]);
    });
  for(var i=0; i < itemsList.length; i++){
    var item = itemsList[i];
    var id = $j(item).attr("id");
    var name = $j(item).find("label").text();
    itemsArr[i] = {"id": id, "name": name };
  }
  $j(".Items ul").hide();
  $j("#QID18 .Items h2").text("Counties")
  $j(".Items").append($j('<select></select>').attr("id","properties").addClass("form-control"));
  $j(".Items").append($j('<button>Add Selected</button>').addClass("btn btn-primary").attr("type","button"));
  $j("#properties").append($j("<option value=''></option>"));

  $j.each(itemsArr, function(key, value){
    $j("#properties").append(
      $j("<option></option>")
      .attr("value", value.id)
      .text(value.name));
  });

  $j("#QID18group0 li").each(function(a,b){
    $j("#properties option[value='" + b.id +"']").prop("disabled", true);
  });
  $j("button").click(function(e){
    e.preventDefault();
    $("QID18group0").append($($(jq("properties")).val()));
    $j($($(jq("properties")).val())).find("label").append($j("<span></span>").addClass("glyphicon glyphicon-remove"));
    $j($($(jq("properties")).val())).find("label span.glyphicon-remove").click(function(e){
      e.preventDefault();
      var item = this.parentNode.parentNode.parentNode.parentNode;
      $(jq("QID18items")).append($(item.id));
      $j(item).find(".glyphicon").remove();
      $j("#properties option[value='" + item.id +"']").prop("disabled", false);
      updateInputValues(["QID18group0","QID18items"]);
      });
    updateInputValues("QID18group0");
    $j("#properties option[value='" + $(jq("properties")).value +"']").prop("disabled", true);
    $j("#properties option[value='']").attr('selected', true);
  });
	}
});


Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});
