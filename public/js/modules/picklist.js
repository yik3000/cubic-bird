var PickList = function () {
  
    function render(){
     $(_sourceList).empty()
     $(_targetList).empty()
 
       $.each(_sourceDataForDisplay, function(i, item) {
         var $tr = $('<tr data-id='+item._id+'>').append(
             $('<td>').text(item.label),
             $('<td>').text(item.label2))
           $(_sourceList).append($tr);
        });
 
        $.each(_targetData, function(i, item) {
         var $tr = $('<tr data-id='+item._id+'>').append(
             $('<td>').text(item.label),
             $('<td>').text(item.label2))
           $(_targetList).append($tr);
        });    
   }
   var _targetData = []
   var _sourceData = []
   var _sourceDataForDisplay = []
   var _options = {}
 
   var _targetList = null
   var _sourceList = null
 
   function filter(){
     targetDataFlat = _targetData.map(function(x){return x._id})
     _sourceDataForDisplay = _sourceData.filter(function(x){
         if(targetDataFlat.indexOf(x._id) >= 0){
           return false
         }
         else{
           return true
         }
     })
 
 
 
   }
 
   return {
     data: function(){
       return _targetData
     },
     init: function (targetList, sourceList, targetData, sourceData, options) {
       // I can call `privateMethod()` you know...
         _options = Object.assign({}, {
           targetContainsOnlyId: false,
         }, options);
 
 
        _targetData = targetData
        _sourceData = sourceData
        _targetList = targetList
        _sourceList = sourceList
        if(_options.targetContainsOnlyId){
           var result = []
           $.each(_sourceData, function(index, item){
               if(_targetData.indexOf(item._id) > -1){                  
                 result.push(item);
               }
           })
           _targetData = result
        }
 
 
       filter()
       render()
 
       $(sourceList).on('click', 'tr', function(event){
         var id= $(event.currentTarget).data("id")
         data = _sourceData.filter(function(x){return x._id === id})[0]
         if(data){
           _targetData.push(data)
         }
         filter()
         render()
       })
 
       $(targetList).on('click','tr', function(event){
         var id = $(event.currentTarget).data("id")
         var target = _targetData.filter(function(x){return x._id === id})[0]
         _targetData.splice($.inArray(target,_targetData),1)
 
         filter()
         render()
 
       })
 
 
 
 
     },
   };
 };