$(document).ready( function() {
    app.initialized()
        .then(function(_client) {
          var client = _client;
          client.events.on('app.activated',
            function() {
                $('#containerbox').empty();
                client.data.get('ticket')
                .then(function(ticketdata){
                    console.log('ticketdata',ticketdata);
                    var ticketid=ticketdata.ticket.id;
                    var ticketattachmentsArray=ticketdata.ticket.attachments;
                    console.log('ticketattachmentsArray',ticketattachmentsArray);
                    var convurl= "https://spritlesoftware.freshdesk.com/api/v2/tickets/"+ticketid+"/conversations";
                    console.log('convurl',convurl);
                    var options= {  
                        headers: {
                            'Content-Type' : 'application/json',
                            'Authorization': 'Basic dEptbTVtQVRINUJlSUhCcTdrc2w='
                        }
                    };
                    client.request.get(convurl,options)
                    .then(function(convDataSuccess){
                        console.log('convDataSuccess',convDataSuccess);
                            var convDataSuccessResp = JSON.parse(convDataSuccess.response);
                            console.log('convDataSuccessResp',convDataSuccessResp);
                            if(convDataSuccessResp.length==0){
                                console.log('Response is empty');
                            }
                            else{
                                convDataSuccessResp.map(function(conversationsItem) {
                                console.log('conversationsItem', conversationsItem);
                                var conversationsItemAttachment = conversationsItem.attachments;
                                console.log('conversationsItemAttachment',conversationsItemAttachment);
                                conversationsItemAttachment.map(function(a) {
                                    ticketattachmentsArray.push(a);                                    
                                })
                                console.log('ticketattachmentsArray'.ticketattachmentsArray);
                                ticketattachmentsArray.map(function(array){
                                    console.log('array',array);
                                    var attachmentFileName=array.name;
                                    console.log('attachmentFileName',attachmentFileName);
                                    var attachmentUrl=array.attachment_url;
                                    console.log('attachmentUrl',attachmentUrl);
                                })

                                if(ticketattachmentsArray==0){
                                $('#containerbox').text('No attachments found');
                                }
                                else{

                                    $('#containerbox').append(ticketattachmentsArray);
                                    console.log('ticketattachmentsArray',ticketattachmentsArray);
                                    ticketattachmentsArray.map(function(iteration){
                                        console.log('iteration',iteration);
                                        var a=iteration.attachment_url;
                                        var b=iteration.name;
                                        var c= '<a href= '+ a +'" target="_blank">'+b+'</a>';
                                        $('#containerbox').append(c);
                                    })
                                }
                            });     
                            }
                            

                    },  

                    function(convdataerr){
                        console.log('convdataerr',convdataerr);
                    });

                    
                },
                function(ticketdataerr){
                    console.log('ticketdataerr',ticketdataerr);
               });
           });
            });
});
    

