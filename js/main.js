
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e6; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


function clearArray(){
	var row = document.getElementById("sortedArray").rows[0];
	var colPos = 0;
	for ( var i=0; i<row.cells.length; i++ )
	{	
		colPos = i + 1;
		$( "table tr:nth-child(1) td:nth-child(" + colPos + ")" ).css("background-color", "white");
	}	
}


function changePosition(pos0, pos1){
	
	var parent = document.getElementsByClassName("box");	
	var val0 = parent[pos0].innerHTML;
	var val1 = parent[pos1].innerHTML; 
	
	parent[pos0].innerHTML = val1;
	parent[pos1].innerHTML = val0;
}


function prepareArray(){
	
	var items = [];
	var parent = document.getElementsByClassName("box");
	var colPos = 0;
	
	for ( var i=0; i<parent.length; i++ )
	{	
		
		var iValue = parent[i].innerHTML;
		var iPosition = i + 1; 
		var item = { value:iValue, position:iPosition };
		items.push(item);
	}	
	

	return items;
}

function printItems( items ){

	for (var i=0; i<items.length; i++)
		console.log( " Value : " + items[i].value + " Position: " + items[i].position  );
}

function animateAll(items){

	for (var i=0; i < items.length; i++){
        for (var j=i+1; j < items.length; j++){
        	
        	$( "div#id" + items[i].position ).slideUp( 100 ).fadeIn( 100 );
        	$( "div#id" + items[j].position ).slideUp( 100 ).fadeIn( 100 );
        }
    }

}

function generateId( id1, id2, minV, minI ){
	var len = 15;

	if ( id1 >= len ){
		$("div#id" + id1 ).css("background-color", "blue");	
		//$("div#id" + (id1+1) ).css("background-color", "blue");		
		return;	
	}

	if ( id2 >= len ){
		if ( id1 >= len ){
			$("div#id" + id1 ).css("background-color", "blue");	
			//return ; 
		}
		else{
			if ( minV !=  $( "div#id" + (id1) ).html() ){
				var tmp = $( "div#id" + minI ).html();
				$( "div#id" + minI ).html( $( "div#id" + id1 ).html() );
				$( "div#id" + id1 ).html( tmp );
			}

			$("div#id" + id1 ).css("background-color", "blue");
			if ( (id1+1) >= len   ){
				$("div#id" + (id1+1) ).css("background-color", "blue");
				return;
			}		
			an( id1+1, id1+2, $( "div#id" + (id1+1) ).html(), (id1+1)  );		
		}
	}
	else{
		if ( minV == "-1" || minV == -1){
			an( id1, id2+1, $( "div#id" + id1 ).html(), id1 )
		}
		else{	
			an( id1, id2+1, minV, minI );
		}
	}
}


function an( id1, id2, minV, minI ){
	
	console.log( "ID: " + id1 + " MinV: " + minV );
	$( "div#id" + id1 ).slideUp( 100 ).delay(200).fadeIn( 100 );
    $( "div#id" + id2 ).slideUp( 100 ).delay(200).fadeIn( 100, function()
    {	

    	if ( $( "div#id" + id2 ).html() < minV  ){
    		generateId( id1, id2, $( "div#id" + id2 ).html(), id2 );
    	}
    	else{
    		generateId( id1, id2, minV, minI );
    	}	
    });
	
}

function selectionSortAnimation(){
	generateId( 1, 1, -1 );
}

function selectionSort(){

	var items = prepareArray();
    var len = items.length;
    var minIndex;

    for (var i=0; i < len; i++){

        //set minimum to this position
        minIndex = i;

        //check the rest of the array to see if anything is smaller
        for (var j=i+1; j < len; j++){
            if (items[j].value < items[minIndex].value){
                minIndex = j;
            }
        }
        //if the minimum isn't in the position, swap it
        if (i != minIndex){
        	
        	changePosition( i, minIndex );
        	var tmpV = items[minIndex].value;
        	items[minIndex].value = items[i].value;
 			items[i].value = tmpV;
        //	$("#id1").animate({width: "300px"});
        }
    }

    console.log("After Sorting: ");
    printItems(items);
}

function pureValueArray( items ){
	var pureArray = [];

	items.forEach( function (arrayItem)
	{
    	var x = arrayItem.value;
    	pureArray.push( x );
	});

	return pureArray;
}

function generateID2( i ){
	var len = 15;
	if ( i > len )
		return;

	var value = $( "div#id" + i ).html(); 
	console.log("i: " + i);

	for ( var j=i; (j>1) &&  ($( "div#id" + (j-1) ).html() > value); j-- ){
		$( "div#id" + j ).html( $( "div#id" + (j-1) ).html() );
	}
	$( "div#id" + j ).html( value );	
	
	an2( i, j );
}

function an2( i, j ){
	$( "div#id" + i ).slideUp( 200 ).delay(200).fadeIn( 200 );
    $( "div#id" + j ).slideUp( 200 ).delay(200).fadeIn( 200, function()
    {	
    	$("div#id" + i ).css("background-color", "blue");		
    	generateID2( i+1 );	
    });
}

function insertionSortAnimation(){
	generateID2(1);
}

function insertionSort() {

	var array = [];
	var items = prepareArray();
	var sortedLast = 0;
	printItems(items);	
	array = pureValueArray(items);
	var len = array.length;

	for ( var i=0; i<len; i++ ){
		sortedLast = array[i];

		for ( var j=i; j>0 && array[j-1] > sortedLast; j-- ){
 			array[j] = array[j-1];
		}	
		array[j] = sortedLast;
	}
	console.log("After Sorting: " + array);
    return items;
}

function reset(){
    window.location = document.URL;
}