export var setupper = {

  setUpElements: function(mainOrExtraCol){
    let $container = this.setUpContainer($('body'));
    let $row = this.setUpRow($container);
    let $col = this.setUpCol($row, mainOrExtraCol);

    return [$col, $row, $container];
  },

  setUpContainer: function($where){
    let $containerDiv = $('<div></div>');

    $containerDiv.addClass('container');

   // this.cacheContainer(containerDiv);

    $where.append($containerDiv);

    return $containerDiv;
  },

  setUpRow: function($where){
    let $rowDiv = $('<div></div>');
    $rowDiv.addClass('row');

    $where.append($rowDiv);

    return $rowDiv;
  },

  setUpCol: function($where, idToAssign){
    let $colDiv = $('<div></div>');
    $colDiv.addClass('col-xs-12');
    $colDiv.attr('id', idToAssign);

    $where.append($colDiv);

    return $colDiv;
  },

  setUpH3: function($where, idToAssign){
    let $h3 = $('<h3></h3>');
    $h3.attr('id', idToAssign);
    
    $where.append($h3);

    return $h3;
  }



};