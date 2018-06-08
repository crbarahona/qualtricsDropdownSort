
Qualtrics.SurveyEngine.addOnload(function()
{

	function jq( myid ) {

    return "#" + myid.replace( /(:|\.|\[|\]|\~|,|=|@)/g, "\\$1" );

	}

	if(typeof(QSettings) != 'undefined'){
  // Get Complete items list for dropdown
  var itemsList = $j("#QID2items li,#QID2group0 li").sort(function (a, b) {
    if(parseInt(a.id.split("~")[2]) > parseInt(b.id.split("~")[2]))
        return 1;
    else
        return -1
  });

  var itemsArr = [];

  //Add removes glyphs to existing selected counties
  $j($j(jq("QID2group0"))).find("label").append($j("<span></span>").addClass("glyphicon glyphicon-remove"));
  //Add click listener to remove
  $j($j(jq("QID2group0"))).find("label span.glyphicon-remove").click(function(e){
    e.preventDefault();
    var item = this.parentNode.parentNode.parentNode.parentNode.parentNode;
    $j(jq("QID2items")).append($j(jq(item.id)));
    $j(item).find(".glyphicon").remove();
    $j("#properties option[value='" + item.id +"']").prop("disabled", false);
	var choiceId = item.id.split("~")[2]
	var choice = Qualtrics.SurveyEngine.getInstance("QID2").question.runtime.Choices[choiceId];
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
  $j("#QID2 .Items h2").text("Sectors")
  $j(".Items").append($j('<select></select>').attr("id","properties").addClass("form-control"));
  $j(".Items").append($j('<button>Add Selected</button>').addClass("btn btn-primary").attr("type","button"));
  $j("#properties").append($j("<option value=''></option>"));

  $j.each(itemsArr, function(key, value){
    $j("#properties").append(
      $j("<option></option>")
      .attr("value", value.id)
      .text(value.name));
  });

  $j("#QID2group0 li").each(function(a,b){
    $j("#properties option[value='" + b.id +"']").prop("disabled", true);
  });
  $j("button").click(function(e){
		debugger;
    e.preventDefault();
	choice = Qualtrics.SurveyEngine.getInstance("QID2").question.runtime.Choices[$j($j(jq($j(jq("properties")).val()))).attr("data-choiceid")];
	choice.Value = "" + 1;
	choice.Group = "" + 0;
	choice.Selected = true;
    $j(jq("QID2group0")).append($j(jq($j(jq("properties")).val())));
    $j($j(jq($j(jq("properties")).val()))).find("label").append($j("<span></span>").addClass("glyphicon glyphicon-remove"));
    $j($j(jq($j(jq("properties")).val()))).find("label span.glyphicon-remove").click(function(e){
      e.preventDefault();
    var item = this.parentNode.parentNode.parentNode.parentNode.parentNode;
      $j(jq("QID2items")).append($j(item.id));
      $j(item).find(".glyphicon").remove();
      $j("#properties option[value='" + item.id +"']").prop("disabled", false);
      var choiceId = item.id.split("~")[2]
	  var choice = Qualtrics.SurveyEngine.getInstance("QID2").question.runtime.Choices[choiceId];
	  choice.Value = null;
	  choice.Group = null;
	  choice.Selected = false;
      });
    $j("#properties option[value='" + $j(jq("properties")).val() +"']").prop("disabled", true);
    $j("#properties option[value='']").attr('selected', true);
  });
}
	else{
  var itemsList = $j("#QID2items li,#QID2group0 li").sort(function (a, b) {
    if(parseInt(a.id.split("~")[2]) > parseInt(b.id.split("~")[2]))
        return 1;
    else
        return -1
  });
  var itemsArr = [];
  $j($j(jq("QID2group0"))).find("label").append($j("<span></span>").addClass("glyphicon glyphicon-remove"));
  $j($j(jq("QID2group0"))).find("label span.glyphicon-remove").click(function(e){
    e.preventDefault(); debugger;
    var item = this.parentNode.parentNode.parentNode.parentNode;
    $j(jq("QID2items")).append($j(item.id));
    $j(item).find(".glyphicon").remove();
    $j("#properties option[value='" + item.id +"']").prop("disabled", false);
    updateInputValues(["QID2group0","QID2items"]);
    });
  for(var i=0; i < itemsList.length; i++){
    var item = itemsList[i];
    var id = $j(item).attr("id");
    var name = $j(item).find("label").text();
    itemsArr[i] = {"id": id, "name": name };
  }
  $j(".Items ul").hide();
  $j("#QID2 .Items h2").text("Counties")
  $j(".Items").append($j('<select></select>').attr("id","properties").addClass("form-control"));
  $j(".Items").append($j('<button>Add Selected</button>').addClass("btn btn-primary").attr("type","button"));
  $j("#properties").append($j("<option value=''></option>"));

  $j.each(itemsArr, function(key, value){
    $j("#properties").append(
      $j("<option></option>")
      .attr("value", value.id)
      .text(value.name));
  });

  $j("#QID2group0 li").each(function(a,b){
    $j("#properties option[value='" + b.id +"']").prop("disabled", true);
  });
  $j("button").click(function(e){
    e.preventDefault();
    $j("QID2group0").append($j($j(jq("properties")).val()));
    $j($j($j(jq("properties")).val())).find("label").append($j("<span></span>").addClass("glyphicon glyphicon-remove"));
    $j($j($j(jq("properties")).val())).find("label span.glyphicon-remove").click(function(e){
      e.preventDefault();
      var item = this.parentNode.parentNode.parentNode.parentNode;
      $j(jq("QID2items")).append($j(item.id));
      $j(item).find(".glyphicon").remove();
      $j("#properties option[value='" + item.id +"']").prop("disabled", false);
      updateInputValues(["QID2group0","QID2items"]);
      });
    updateInputValues("QID2group0");
    $j("#properties option[value='" + $j(jq("properties")).val() +"']").prop("disabled", true);
    $j("#properties option[value='']").attr('selected', true);
  });
	}
});


Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});
