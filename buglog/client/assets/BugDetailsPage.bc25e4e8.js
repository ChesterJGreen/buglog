import{k as s,c as a,q as t,d as o,o as e,a as d,b as r,l as n}from"./vendor.130f7694.js";import{b as c,n as l,P as u,A as i}from"./index.b8927da3.js";const g={name:"BugDetailsPage",setup(){const o=t();return s((async()=>{try{await c.getById(o.params.id),await l.getAllNotesByBugId(o.params.id)}catch(s){u.toast("FAILED TO LOAD BUG "+s,"error")}})),{bug:a((()=>i.bug)),notes:a((()=>i.notes))}},components:{}},b={class:"col-md-12 shadow p-2 hero-img"},m={class:"row"},p={class:"col-md-12 px-5 pt-5"},v={class:"row",id:"bug-detail-change"},w={key:0,class:"content col-md-12 "},y={class:"row m-0 p-0"},B={key:0,class:"content col-md-12 mt-4 border "};g.render=function(s,a,t,c,l,u){const i=o("BugDetails"),g=o("NotesThread");return e(),d("div",b,[r("div",m,[r("div",p,[r("div",v,[c.bug?(e(),d("div",w,[r(i,{bug:c.bug},null,8,["bug"])])):n("",!0)])])]),r("div",y,[c.bug?(e(),d("div",B,[r(g,{bug:c.bug},null,8,["bug"])])):n("",!0)])])};export default g;
