const title = document.getElementById("input1");
const des = document.getElementById("input2");
const btn = document.getElementById("input3");
let delt = [];
let deld = [];
let deltd = [];
let deltt = [];
document.querySelector("#back").style.visibility = 'hidden';
document.querySelector("#del").style.visibility = 'hidden';
document.querySelector("#archive").style.visibility = 'hidden';
document.querySelector("#all").style.visibility = 'hidden';
document.querySelector("#delAll").style.visibility = 'hidden';
show();


btn.addEventListener('click', function() {
  let nTitle = localStorage.getItem('nTitle');
  let nDes = localStorage.getItem('nDes');
  let date = localStorage.getItem('date');
  let time = localStorage.getItem('time');
  if (nTitle == null) {
    t = [];
    d = [];
    td = [];
    tt = [];

  } else {
    t = JSON.parse(nTitle);
    d = JSON.parse(nDes);
    td = JSON.parse(date);
    tt = JSON.parse(time);
  }
  if (title.value === "") {
    alert("Please Enter title of notes!!!");
  } else {
    t.push(title.value);
    d.push(des.value);
    td.push(new Date().toDateString());
    tt.push(new Date().toLocaleTimeString());
    localStorage.setItem("nTitle", JSON.stringify(t));
    localStorage.setItem("nDes", JSON.stringify(d));
    localStorage.setItem("date", JSON.stringify(td));
    localStorage.setItem("time", JSON.stringify(tt));
    title.value = "";
    des.value = "";
    show();
  }
});

function show() {
  let nTitle = localStorage.getItem('nTitle');
  let nDes = localStorage.getItem('nDes');
  let date = localStorage.getItem('date');
  let time = localStorage.getItem('time');
  if (nTitle == null) {
    t = [];
    d = [];
    td = [];
    tt = [];

  } else {
    document.querySelector("#back").style.visibility = 'visible';
    document.querySelector("#del").style.visibility = 'visible';
    document.querySelector("#archive").style.visibility = 'visible';
    document.querySelector("#all").style.visibility = 'visible';
    document.querySelector("#delAll").style.visibility = 'visible';
    t = JSON.parse(nTitle);
    d = JSON.parse(nDes);
    td = JSON.parse(date);
    tt = JSON.parse(time);
  }
  let card_html = "";
  t.forEach((item, i) => {
    card_html += `<div class="noteCard col-lg-4 col-md-6" >
    <div class="card" style="background-image: linear-gradient(to bottom right, #393e8b, #11bcc4); height:15rem; box-shadow: 0 4px 8px 0 black, 0 6px 20px 0 black;">
      <div class="card-body">
      <input class="form-check-input" style="float:right" type="checkbox" value="">
        <h5 class="card-title">${item}</h5>
        <p class="card-text" >${d[i]}</p>
        <button style="background-color: #f70334;" class="btn"  onclick="delete1(${i})"><i class="fa-solid fa-trash-can"></i></button>
        <button style="background-color: #6e6865;" class="btn" onclick="edit(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
        <p style="float:right;" class="card-text">${tt[i]}<br>${td[i]}</p>
      </div>
    </div> </div>`
  });
  if (t.length != 0) {
    document.querySelector("#sentense").innerHTML = "Here are notes";
    document.querySelector("#allnotes").innerHTML = card_html;
  } else {
    card_html = "<p>Nothing to Show!!! Use Add note Section to Create your Notes.</p>";
    document.querySelector("#sentense").innerHTML = card_html;
    document.querySelector("#allnotes").innerHTML = "";
    document.querySelector("#back").style.visibility = 'hidden';
    document.querySelector("#del").style.visibility = 'hidden';
    document.querySelector("#archive").style.visibility = 'hidden';
    document.querySelector("#all").style.visibility = 'hidden';
    document.querySelector("#delAll").style.visibility = 'hidden';
  }
}

function delete1(index) {
  let nTitle = localStorage.getItem('nTitle');
  let nDes = localStorage.getItem('nDes');
  let date = localStorage.getItem('date');
  let time = localStorage.getItem('time');
  if (nTitle == null) {
    t = [];
    d = [];
    td = [];
    tt = [];

  } else {
    t = JSON.parse(nTitle);
    d = JSON.parse(nDes);
    td = JSON.parse(date);
    tt = JSON.parse(time);
  }
  delt.push(t.splice(index, 1).toString());
  deld.push(d.splice(index, 1).toString());
  deltd.push(td.splice(index, 1).toString());
  deltt.push(tt.splice(index, 1).toString());
  localStorage.setItem("nTitle", JSON.stringify(t));
  localStorage.setItem("nDes", JSON.stringify(d));
  localStorage.setItem("date", JSON.stringify(td));
  localStorage.setItem("time", JSON.stringify(tt));
  localStorage.setItem("deltitle", JSON.stringify(delt));
  localStorage.setItem("deldes", JSON.stringify(deld));
  localStorage.setItem("deldate", JSON.stringify(deltd));
  localStorage.setItem("deltime", JSON.stringify(deltt));
  show();
}

function edit(index) {
  title.value = t[index];
  des.value = d[index];
  pdelete(index);
}


let search = document.getElementById('search');
search.addEventListener("input", function() {

  let inputVal = search.value;
  let inputVal_lower = inputVal.toLowerCase();
  let noteCards = document.getElementsByClassName('noteCard');

  Array.from(noteCards).forEach(function(element) {
    let cardTxt = element.getElementsByTagName("h5")[0].innerText
    let cardTxt_lower = cardTxt.toLowerCase();
    if (cardTxt.includes(inputVal) || cardTxt === inputVal || cardTxt_lower.includes(inputVal_lower)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }

  })

});

function Backup() {
  let nTitle = localStorage.getItem('nTitle');
  let nDes = localStorage.getItem('nDes');
  let date = localStorage.getItem('date');
  let time = localStorage.getItem('time');
  if (nTitle == null) {
    t = [];
    d = [];
    td = [];
    tt = [];

  } else {
    t = JSON.parse(nTitle);
    d = JSON.parse(nDes);
    td = JSON.parse(date);
    tt = JSON.parse(time);
  }
  var deltitle = JSON.parse(localStorage.getItem("deltitle"));
  var deldes = JSON.parse(localStorage.getItem("deldes"));
  var deldate = JSON.parse(localStorage.getItem("deldate"));
  var deltime = JSON.parse(localStorage.getItem("deltime"));
  let j = deltitle.length;
  for (var i = 0; i < j; i++) {
    t.push(deltitle[i]);
    d.push(deldes[i]);
    td.push(deldate[i]);
    tt.push(deltime[i]);
  }
  delt = [];
  deld = [];
  deltd = [];
  deltt = [];
  localStorage.setItem("deltitle", JSON.stringify(delt));
  localStorage.setItem("deldes", JSON.stringify(deld));
  localStorage.setItem("deldate", JSON.stringify(deltd));
  localStorage.setItem("deltime", JSON.stringify(deltt));
  localStorage.setItem("nTitle", JSON.stringify(t));
  localStorage.setItem("nDes", JSON.stringify(d));
  localStorage.setItem("date", JSON.stringify(td));
  localStorage.setItem("time", JSON.stringify(tt));
  show();
}

function deleteAll() {
  let nTitle = localStorage.getItem('nTitle');
  let nDes = localStorage.getItem('nDes');
  let date = localStorage.getItem('date');
  let time = localStorage.getItem('time');
  if (nTitle == null) {
    t = [];
    d = [];
    td = [];
    tt = [];

  } else {
    t = JSON.parse(nTitle);
    d = JSON.parse(nDes);
    td = JSON.parse(date);
    tt = JSON.parse(time);
  }
  let noteCards = document.getElementsByClassName('noteCard');
  let crr = [];
  for (var i = 0; i < noteCards.length; i++) {
    let cardTxt = noteCards[i].getElementsByTagName("input")[0].checked;
    if (cardTxt === true) {
      crr.push(i);
    }
  }
  crr.sort(function(a, b) {
    return b - a
  });
  for (var i = 0; i < crr.length; i++) {
    delete1(crr[i]);
  }

}



function archiveall() {
  let nTitle = localStorage.getItem('nTitle');
  let nDes = localStorage.getItem('nDes');
  let date = localStorage.getItem('date');
  let time = localStorage.getItem('time');
  if (nTitle == null) {
    t = [];
    d = [];
    td = [];
    tt = [];

  } else {
    t = JSON.parse(nTitle);
    d = JSON.parse(nDes);
    td = JSON.parse(date);
    tt = JSON.parse(time);
  }
  let noteCards = document.getElementsByClassName('noteCard');
  let crr = [];
  for (var i = 0; i < noteCards.length; i++) {
    let cardTxt = noteCards[i].getElementsByTagName("input")[0].checked;
    if (cardTxt === true) {
      crr.push(i);
    }
  }
  console.log(crr);
  crr.sort(function(a, b) {
    return b - a
  });
  console.log(crr);
  for (var i = 0; i < crr.length; i++) {
    del_archive(crr[i]);
  }
}

function showAll() {
  let nTitle = localStorage.getItem('nTitle');
  let nDes = localStorage.getItem('nDes');
  let date = localStorage.getItem('date');
  let time = localStorage.getItem('time');
  if (nTitle == null) {
    t = [];
    d = [];
    td = [];
    tt = [];

  } else {
    t = JSON.parse(nTitle);
    d = JSON.parse(nDes);
    td = JSON.parse(date);
    tt = JSON.parse(time);
  }
  archived_tit = JSON.parse(localStorage.getItem('arch_t'));
  archived_des = JSON.parse(localStorage.getItem('arch_d'));
  archived_da = JSON.parse(localStorage.getItem('arch_td'));
  archived_time = JSON.parse(localStorage.getItem('arch_tt'));
  if (archived_tit != null) {
    for (var i = 0; i < archived_tit.length; i++) {
      t.push(archived_tit[i]);
      d.push(archived_des[i]);
      td.push(archived_da[i]);
      tt.push(archived_time[i]);
    }
  }

  localStorage.setItem("nTitle", JSON.stringify(t));
  localStorage.setItem("nDes", JSON.stringify(d));
  localStorage.setItem("date", JSON.stringify(td));
  localStorage.setItem("time", JSON.stringify(tt));
  show();
  archived_tit = [];
  archived_des = [];
  archived_da = [];
  archived_time = [];
  localStorage.setItem("arch_t", JSON.stringify(archived_tit));
  localStorage.setItem("arch_d", JSON.stringify(archived_des));
  localStorage.setItem("arch_td", JSON.stringify(archived_da));
  localStorage.setItem("arch_tt", JSON.stringify(archived_time));
}


function del_archive(index) {
  let nTitle = localStorage.getItem('nTitle');
  let nDes = localStorage.getItem('nDes');
  let date = localStorage.getItem('date');
  let time = localStorage.getItem('time');
  if (nTitle == null) {
    t = [];
    d = [];
    td = [];
    tt = [];

  } else {
    t = JSON.parse(nTitle);
    d = JSON.parse(nDes);
    td = JSON.parse(date);
    tt = JSON.parse(time);
  }
  archived_tit = JSON.parse(localStorage.getItem('arch_t'));
  archived_des = JSON.parse(localStorage.getItem('arch_d'));
  archived_da = JSON.parse(localStorage.getItem('arch_td'));
  archived_time = JSON.parse(localStorage.getItem('arch_tt'));
  if (archived_tit == null) {
    archived_tit = [];
    archived_des = [];
    archived_da = [];
    archived_time = [];
  }
  archived_tit.push(t.splice(index, 1));
  archived_des.push(d.splice(index, 1));
  archived_da.push(td.splice(index, 1));
  archived_time.push(tt.splice(index, 1));
  localStorage.setItem("nTitle", JSON.stringify(t));
  localStorage.setItem("nDes", JSON.stringify(d));
  localStorage.setItem("date", JSON.stringify(td));
  localStorage.setItem("time", JSON.stringify(tt));
  localStorage.setItem("arch_t", JSON.stringify(archived_tit));
  localStorage.setItem("arch_d", JSON.stringify(archived_des));
  localStorage.setItem("arch_td", JSON.stringify(archived_da));
  localStorage.setItem("arch_tt", JSON.stringify(archived_time));
  show();
}


function pdelete(index) {
  let nTitle = localStorage.getItem('nTitle');
  let nDes = localStorage.getItem('nDes');
  let date = localStorage.getItem('date');
  let time = localStorage.getItem('time');
  if (nTitle == null) {
    t = [];
    d = [];
    td = [];
    tt = [];

  } else {
    t = JSON.parse(nTitle);
    d = JSON.parse(nDes);
    td = JSON.parse(date);
    tt = JSON.parse(time);
  }
  t.splice(index, 1);
  d.splice(index, 1);
  td.splice(index, 1);
  tt.splice(index, 1);
  localStorage.setItem("nTitle", JSON.stringify(t));
  localStorage.setItem("nDes", JSON.stringify(d));
  localStorage.setItem("date", JSON.stringify(td));
  localStorage.setItem("time", JSON.stringify(tt));
  show();
}

function permanant_del() {
  let isExecuted = confirm("Are you sure you want to delete notes permanantly?");
  if (isExecuted === true) {
    let nTitle = localStorage.getItem('nTitle');
    let nDes = localStorage.getItem('nDes');
    let date = localStorage.getItem('date');
    let time = localStorage.getItem('time');
    if (nTitle == null) {
      t = [];
      d = [];
      td = [];
      tt = [];

    } else {
      t = JSON.parse(nTitle);
      d = JSON.parse(nDes);
      td = JSON.parse(date);
      tt = JSON.parse(time);
    }
    let noteCards = document.getElementsByClassName('noteCard');
    let crr = [];
    for (var i = 0; i < noteCards.length; i++) {
      let cardTxt = noteCards[i].getElementsByTagName("input")[0].checked;
      if (cardTxt === true) {
        crr.push(i);
      }
    }
    crr.sort(function(a, b) {
      return b - a
    });
    for (var i = 0; i < crr.length; i++) {
      pdelete(crr[i]);
    }

}
  }
