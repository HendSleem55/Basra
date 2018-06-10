var cards=[]
/////////////////////////////////////////make a random deck //////////////////////////////////////////////////
var the_types = ["_of_diamonds" , "_of_spades" , "_of_hearts" ,"_of_clubs"]
var numbers = [ 1,2,3,4,5,6,7,8,9,10,"jack" ,"king" , "queen"]
for (var i = 0 ; i<numbers.length ; i++)
{		
		for(var j = 0 ; j<the_types.length; j++)
        {	var obj = {}
            obj.name= numbers[i]+ the_types[j]
            obj.value=numbers[i]
			cards.push(obj)
        }
}

var i =0
var tableCards = []
var computerCards = []
var playerCards = []
var score = []
var computer_score = []
var computer = false 
// var jackFlag = true 
var round = 0 
var computerBasra=0;
var playerBasra=0





////////////////////////////////////////make random cards////////////////////////////////////////////////////

function MakeTableCards(){
    // if (jackFlag){
		var count = 0 
		while(count < 4)
		{   
			var random = Math.round((Math.random())*(cards.length-1))
	        if( (cards[random].name.search("jack")) == -1)
			{   
		    	tableCards.push(cards[random])
				count++;
				cards.splice(random, 1);
			}
		}
		// jackFlag = false
	// }

	// else
	// {
	// 	for(var i =0 ; i<4 ; i++){
	// 		var random = Math.round((Math.random())*(cards.length-1))
	// 		tableCards.push(cards[random])
	// 		cards.splice(random , 1)
	//     }
	// }
}

function MakePlayerCards(){
	for(var i =0 ; i<4 ; i++){
		var random = Math.round((Math.random())*(cards.length-1))
		playerCards.push(cards[random])
		cards.splice(random , 1)
	}
}

function MakeComputerCards(){
	for(var i =0 ; i<4 ; i++){
		var random = Math.round((Math.random())*(cards.length-1))
		// console.log(cards[random])
		computerCards.push(cards[random])
		cards.splice(random , 1)
	}
}

///////////////////////////////////draw the view //////////////////////////////////////////

function drawView(){
	var table = $(".table")
	table.html("")
	var player = $(".player")
	player.html("")
	var computer = $(".computer")
    computer.html("")

	for(var i =0 ; i<playerCards.length ; i++){
		var player_img = $("<img>")
		player.eq(0).append(player_img)
		player_img.attr("src" ,"./Imgs/"+ playerCards[i].name+".png")
		player_img.attr("value" , playerCards[i].value)

	}

	for(var i =0 ; i<tableCards.length ; i++){	
		var table_img = $("<img>")
		table.eq(0).append(table_img)
		table_img.attr("src" ,"./Imgs/"+ tableCards[i].name+".png")
		table_img.attr("value" , tableCards[i].value)
	}

	for(var i =0 ; i<computerCards.length ; i++){	
		var computer_img = $("<img>")
		computer.eq(0).append(computer_img)
		// computer_img.attr("src" , computerCards[i].name+".png")
	   computer_img.attr("src" ,"./Imgs/facedown.png")

		computer_img.attr("value",computerCards[i].value)
	}
}
////////////////////////////////////////////winner/////////////////////////////////////////////////
	
function winner(){
	 $("#win").css("display","flex")
	 if (parseInt($(".comScore span").html()) > parseInt($(".PlyScore span").html())){
	    $("#win p").html("computer Wins")
	}

}

////////////////////////////////////////////computer turn////////////////////////////////////////////

function player_turn(){
	var flag = true
	    var myValue
		var myImgs = $(".player img")
		var tableImgs = $(".table img")
		// for(var i = 0 ; i<myImgs.length ; i++){
		    myImgs.on("click",function(){
			    myValue = $(this).attr("value")
				if((myValue=="jack" || $(this).attr("src").search("7_of_diamonds") > -1)&& tableCards.length>0)
	 				{   
	 					score= score.concat(tableCards)
						tableCards=[]
						score.push($(this))
						var x = playerCards.indexOf($(this))
						console.log(x)
						playerCards.splice(x,1);
						flag = false;
	                    // for(var m=0;m<playerCards.length;m++){
		                //     if(playerCards[m].value == myValue )
		                //     {   
		                //     	score.push(playerCards[m])
			            //         playerCards.splice(m,1)
			            //         flag = false
			            //         break
			            //     }
	                    // } 
					}
					
		        else{
						for (var i = 0 ;i<tableCards.length ; i++)
						{   
							if (tableCards[i].value== myValue)
							{       

								for(var m=0;m<playerCards.length;m++){
				                    if(playerCards[m].value == myValue )
				                    {   score.push(playerCards[m])
					                    playerCards.splice(m,1)
					                    break    
					                }
				                } 

			                    score.push(tableCards[i])
			                    tableCards.splice(i,1)

			                    if(tableCards.length == 0)
			                    {   
			                        $("#basra").fadeIn(1000,function(){
			                    	$("#basra").hide()
			                    })
								   playerBasra++;
			                    }
			                    flag = false 
			                
						    }  
						}
		            }

					for (var i = 0 ;i<tableCards.length ; i++)
					{   
						for(var j =i+1 ; j<tableCards.length ; j++)
						{ 
							if (tableCards[i].value+tableCards[j].value == myValue)
							{  
								score.push(tableCards[i],tableCards[j])

								for(var s=0 ; s<playerCards.length;s++)
								{
										if(this.src.search(playerCards[s].name) >-1 )	
									{   score.push(playerCards[s])
										playerCards.splice(s,1)
										break
									}			
								}
								tableCards = tableCards.filter(item => score.indexOf(item) < 0);

								if(tableCards.length ==0)
								{  $("#basra").fadeIn(1000,function(){
									$("#basra").hide()
								})
									playerBasra++;
								}
								flag = false
								break
							}
						}	
					}

	            if (flag){
	                for(var s=0 ; s<playerCards.length;s++)
	                {
	 				    if(this.src.search(playerCards[s].name) >-1 )	
	 				    { 
	 				     	tableCards.push(playerCards[s])
	 						playerCards.splice(s,1)
	 				    	break
	 				    }			
					}
	            }
	             $(".PlyScore").html(secondData+ " : <span>" + (score.length+ (9*playerBasra) ) +"</span>")
	               drawView()
	               setTimeout( function(){ 
		   			    $(".PlyScore").removeClass("currnet")
				        $(".comScore").addClass("currnet")},700)
				    setTimeout(computer_turn,1000)
		    })
	}
// }

////////////////////////////////////////////computer turn//////////////////////////////////

function computer_turn(){
	var flag = true ;
	if((computerCards[i].value=="jack" || computerCards[i].name.search("7_of_diamonds") > -1) && tableCards.length>0)
    {
    	computer_score= computer_score.concat(tableCards)
        tableCards=[]
        flag = false ;
    }  


    else
    {
        var temp = []
        for (var k = 0;k<tableCards.length ; k++)
        {    
         if(  tableCards[k].value == computerCards[i].value )
            { 
               if(tableCards.length ==0)
                 {
                	computerBasra++
                	 $("#basra").fadeIn(1000,function(){
	                    	$("#basra").hide()
	                    })
                }

                computer_score.push(tableCards[k])
                temp.push(tableCards[k])
                flag = false ;
                break
            }
        } 


        for (var k = 0 ;k<tableCards.length ; k++)
			{   
			    for(var j =k+1 ; j<tableCards.length ; j++)
			    { 
			        if (tableCards[j].value+tableCards[k].value == computerCards[i].value )
			        {  
			            computer_score.push(tableCards[k],tableCards[j])
			            temp.push(tableCards[k],tableCards[j])
			            flag = false
			            break
			        }      
			    }

			     tableCards = tableCards.filter(item => temp.indexOf(item) < 0);
			     if(tableCards.length ==0)
       		    {
				   computerBasra++;
				    $("#basra").fadeIn(1000,function(){
		                    	$("#basra").hide()
		                    })
        		}
		    }
        }   

    if(flag)
    {  
    	tableCards.push(computerCards[i])
    	computerCards.splice(i,1)
    }
    else{
    	computer_score.push(computerCards[i])
    	computerCards.splice(i,1)
    }

    $(".comScore").html("computer : <span>" + (computer_score.length + (computerBasra*9))+"</span>")
    if (computerCards.length == 0 ){
        round++
		if(round<6)
		{
			MakePlayerCards() 
		    MakeComputerCards()
		}

		else{
			winner()
		}
    }
    drawView()
    player_turn()
}



    var myData = localStorage['objectToPass'];
    localStorage.removeItem( 'objectToPass' ); 
    myData = myData.split(",")
    var firstData = myData[0];
    var secondData = myData[1];
    if(firstData==""){
   		$("#userimg").attr("src" ,"");
    }
    else
    {
   		$("#userimg").attr("src" ,firstData);
    }

    $("#userName").html(secondData);

	MakePlayerCards() 
    MakeComputerCards()
    MakeTableCards()
    drawView()
    player_turn()
    $(".PlyScore").show()
    $(".comScore").show();
