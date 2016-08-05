$(()=>{
  $('table').on('click', '.delete', deleteMsg)
  //$('table').on('click', '.edit', editMsg)
  $('#addNew').click(openAddModal);
  $('#newMsg').submit(addMsg);

});

function openAddModal(){
  $('#msgName').val("");
  $('#msgContent').val("");

  $('#newMsgModal').modal();
}

function addMsg(event){
  event.preventDefault();
  let newMsg = {
    name: $('#newName').val(),
    content: $('#msgContent').val()
  }

  $.post(`/msg`, newMsg)
   .done(() =>{
     renderList();
     $('#closeModalAdd').click();
   })
   .fail(err =>{
     console.log('err:', err)
   });
}

 function deleteMsg(){
   let msgId = $(this).closest('tr') //traversing upwards with a selector
          .data('id');
   //let catID = $(this).closest('tr').data('id');
   $.ajax(`/msg/${msgId}`, {
     method: 'DElETE'
   })
    .done(() =>{
      console.log('delete success')
      renderList();
    })
    .fail(err =>{
      console.log('err:', err)
    });
 }

function renderList(){
  $.get('/msg')
   .done(msgs =>{
     let $trs = msgs.map(msg =>{
       let $tr = $('#template').clone()
       $tr.removeAttr('id');
       $tr.find('.name').text(msg.name);
       $tr.find('.time').text(msg.time);
       $tr.find('.content').text(msg.content);
       $tr.data('id', msg.id);
       return $tr;
     })

     $('#msgList').empty().append($trs);
   })
}
