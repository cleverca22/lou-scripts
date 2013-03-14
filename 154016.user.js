// ==UserScript==
// @name           Dave LoU Raid
// @description    Raid assistant
// @namespace      davelou
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        0.6.8
// ==/UserScript==

(function() {
var inject = function davelouraid() {
if (!window.qx || !window.webfrontend
||!qx.core.Init.getApplication().initDone
||webfrontend.data.City.getInstance().getId()<1) {
window.setTimeout(davelouraid, 5000);
return;
}
var l = {
"en":{
"type":">Type:<",
"name":">Name:<",
"coord":"Coord.*Contin",
"prog":"Progre.*Coord",
"leveld":"Level.*Progr",
"levelb":"Level.*Coord",
"mnt":"Mountain ",
"forest":"Forest ",
"hill":"Hill ",
"sea":"Sea E",
"hydra":"Hydra",
"dragon":"Dragon",
"moloch":"Moloch",
"octopus":"Octopus",
},
"de":{
"type":">Typ:<",
"name":">Name:<",
"coord":"Koord.*Kontin",
"prog":"Forts.*Koord",
"leveld":"Stufe.*Forts",
"levelb":"Stufe.*Koord",
"mnt":"Bergh",
"forest":"Waldh",
"hill":"gelgrab",
"sea":"zur See",
"hydra":"Hydra",
"dragon":"Drache",
"moloch":"Moloch",
"octopus":"Oktopus",
},
"es":{
"type":">Tipo:<",
"name":">Nombre:<",
"coord":"Coord.*Contin",
"prog":"Prog.*Coord",
"leveld":"Nivel.*Prog",
"levelb":"Nivel.*Coord",
"mnt":"monta",
"forest":"bosque",
"hill":"colina",
"sea":"el mar",
"hydra":"Hidra",
"dragon":"Drag",
"moloch":"Moloch",
"octopus":"Pulpo",
},
"pt":{
"type":">Tipo<",
"name":">Nome:<",
"coord":"Coord.*Contin",
"prog":"Prog.*Coord",
"leveld":"N.vel.*Prog",
"levelb":"N.vel.*Coord",
"mnt":"Montan",
"forest":"Floresta",
"hill":"Colina",
"sea":"no Mar",
"hydra":"Hidra",
"dragon":"Drag",
"moloch":"Moloq",
"octopus":"Polvo",
},
"fr":{
"type":">Type",
"name":">Nom",
"coord":"Coord.*Contin",
"prog":"Prog.*Coord",
"leveld":"Niveau.*Prog",
"levelb":"Niveau.*Coord",
"mnt":"montagn",
"forest":"for.t",
"hill":"collin",
"sea":"maritime",
"hydra":"Hydre",
"dragon":"Drag",
"moloch":"Moloc",
"octopus":"Pieuvre ",
},
"pt_BR":{
"type":">Tipo<",
"name":">Nome:<",
"coord":"Coord.*Contin",
"prog":"Prog.*Coord",
"leveld":"N.vel.*Prog",
"levelb":"N.vel.*Coord",
"mnt":"Montan",
"forest":"Floresta",
"hill":"Colina",
"sea":"no Mar",
"hydra":"Hidra",
"dragon":"Drag",
"moloch":"Moloq",
"octopus":"Polvo",
},
"it":{
"type":">Tipo:<",
"name":">Nome:<",
"coord":"Coord.*Contin",
"prog":"Prog.*Coord",
"leveld":"Livel.*Prog",
"levelb":"Livel.*Coord",
"mnt":"montag",
"forest":"forest",
"hill":"collin",
"sea":"marit",
"hydra":"Idra",
"dragon":"Drag",
"moloch":"Moloc",
"octopus":"Piovr",
},
"pl":{
"type":">Typ:<",
"name":"gracza:<",
"coord":"rz.dne:.*Kontyn",
"prog":"Post.*rz.dne:",
"leveld":"Poziom.*Post",
"levelb":"Poziom.*rz.dne:",
"mnt":"G.rskie ",
"forest":"Le.ne ",
"hill":"Wy.ynne ",
"sea":"Morska ",
"hydra":"Hydra",
"dragon":"Smok",
"moloch":"Moloc",
"octopus":"miornica",
},
"ru":{
"type":"Тип:<",
"name":"Имя:<",
"coord":"Коор.*Конт",
"prog":"Прог.*Коор",
"leveld":"Урове.*Прог",
"levelb":"Урове.*Коор",
"mnt":"горах",
"forest":"лесу",
"hill":"холмах",
"sea":"море",
"hydra":"Гидра",
"dragon":"Дракон",
"moloch":"Молох",
"octopus":"Осьминог",
},
}
var la=qx.locale.Manager.getInstance().getLocale();
la=(l[la])?l[la]:l["en"];
qx.Class.define("dave.lou.RaidIdle", {
extend: qx.ui.window.Window,
construct: function()
{
this.base(arguments,null);
c = new dave.lou.Cities();
this.buildGUI();
w=this;
},
members: {
p: null,
q: new Date(),
buildGUI: function() {
this.set({
showClose: false,
resizable: false,
allowMaximize : false,
allowMinimize : false,
showMaximize : false,
showMinimize : false,
showStatusbar : false,
useMoveFrame : true,
contentPadding:0,
});
this.setLayout(new qx.ui.layout.VBox());
this.a = new qx.ui.form.Button("N").set({
appearance: "button-text-small",
backgroundColor:"gold",
toolTipText: "Go to next city",
})
this.a.addListener("execute",function(){
w.g();
c.g();
},c,false);
this.add(this.a);
this.d = new qx.ui.form.Button("R").set({
appearance: "button-text-small",
toolTipText: "Regenerate list",
})
this.d.addListener("execute",function(){
w.g();
c.d={};
c.g();
},c,false);
if (c.o.r) {
this.d.setVisibility("excluded")
}
else {
this.d.setVisibility("visible")
}
this.add(this.d);
this.b = new qx.ui.form.Button("I").set({
appearance: "button-text-small",
toolTipText: "Add current city to Ignore List",
})
this.b.addListener("execute",function(){
w.g();
c.x();
},c,false);
this.add(this.b);
this.e = new qx.ui.form.Button("W").set({
appearance: "button-text-small",
toolTipText: "Add whole continent to Ignore List",
})
this.e.addListener("execute",function(){
w.g();
c.u();
},c,false);
this.add(this.e);
this.c = new qx.ui.form.Button("C").set({
appearance: "button-text-small",
toolTipText: "Clear Ignore List",
})
this.c.addListener("execute",function(){
c.b()
},c,false);
this.add(this.c);
var j = new qx.ui.menu.Menu().set({
iconColumnWidth: 0,
});
var m = new qx.ui.form.MenuButton("M",null,j).set({
appearance: "button-text-small",
toolTipText: "Menu for dungeon reset and utils",
})
this.add(m);
var k = new qx.ui.menu.Button("Reset to once");
k.set({
blockToolTip: false,
toolTipText : "Reset raids to Once",
});
j.add(k)
k.addListener("execute", function(){
this.v(0,0);
},this, false);
k = new qx.ui.menu.Button("Reset to Complete");
k.set({
blockToolTip: false,
toolTipText : "Reset all raids to Complete",
});
j.add(k)
k.addListener("execute", function(){
this.v(0,1);
},this, false);
k = new qx.ui.menu.Button("Reset to Earliest Order");
k.set({
blockToolTip: false,
toolTipText : "Reset all raids to finish before orders",
});
j.add(k)
k.addListener("execute", function(){
this.t();
},this, false);
k = new qx.ui.menu.Button("Toggle WorldView Panel");
k.set({
blockToolTip: false,
toolTipText : "Hide/Show left panel in World View",
});
j.add(k)
k.addListener("execute", function(){
this.x();
},this, false);
var vx = qx.bom.Viewport.getWidth();
var vy = qx.bom.Viewport.getHeight();
if (c.o.tl&&c.o.tt)
this.moveTo(c.o.tl,c.o.tt);
else
this.moveTo(vx-270,vy-220);
this.p = new qx.ui.window.Window("Idle Troops").set({
allowMaximize : false,
allowMinimize : false,
allowClose: false,
showMaximize : false,
showMinimize : false,
showStatusbar : false,
allowGrowX:false,
allowGrowY:false,
showClose : false,
useMoveFrame : true,
contentPadding: 0,
margin: 0,
});
this.p.setLayout(new qx.ui.layout.HBox());
this.p.text = new qx.ui.form.TextArea("Type").set({
autoSize:true,
minimalLineHeight: 3,
width:100
});
this.p.text.setReadOnly(true);
this.p.add(this.p.text);
if (c.o.pl&&c.o.pt)
this.p.moveTo(c.o.pl,c.o.pt);
else
this.p.moveTo(790,400);
},
a: null,
b: null,
c: null,
d: null,
e: null,
o: false,
s: function(){
c.addListener("changeIdle", function(e){
this.p.text.setValue(e.getData());
this.p.show();
this.q = new Date();
},this,false)
t.addListener("changeVersion", this.l, this);
var v= new dave.lou.RIo();
this.w();
this.addListener("move",function(){
var b=this.getBounds();
if (c.o.tl!=b.left&&c.o.tt!=b.top) {
c.o.tl = b.left;
c.o.tt = b.top;
c.p();
}
},this,false)
this.p.addListener("move",function(){
var b=this.getBounds();
if (c.o.pl!=b.left&&c.o.pt!=b.top) {
c.o.pl = b.left;
c.o.pt = b.top;
c.p();
}
},this.p,false)
},
n: false,
j: 0,
l: function(){
if (!this.n) {
this.n = true
var newc = t.getId()*1;
if (this.j != newc) {
this.j=newc;
w.h();
}
this.n = false;
}
},
w: function(){
if (!this.o){
this.o = true
this.open();
}
else {
this.show();
this.setActive(true)
}
},
f: false,
g:function(){
this.a.setEnabled(false);
this.b.setEnabled(false);
if (!c.o.r)
this.d.setEnabled(false);
this.f=true;
},
h:function(){
var d = this.q - new Date() + c.o.p*1000;
if (d > 0) {
new qx.event.Timer.once(this.h,this,d);
return;
}
else
this.p.hide();
this.a.setEnabled(true);
this.b.setEnabled(true);
if (!c.o.r)
this.d.setEnabled(true);
this.f=false;
},
t: function(){
var r = t.unitOrders;
if (!r) return;
var s=0;
for (var i = 0; i < r.length; i++) {
var o = r[i];
if (o.player>=0&&o.isDelayed) {
if (s==0) s = o.start;
else if (s > o.start) s = o.start;
}
}
if (s>0){
s-=c.o.a*60;
this.v(s,2);
}
},
v: function(s,m){
var k = t.unitOrders;
for (var i = 0; i < k.length; i++) {
var j = k[i];
if (j.type == 8
&& !j.isDelayed)
{
var end=s;
if (end== 0) end = j.end;
var aa = new dave.lou.CO(j.id,end,m);
aa.x();
}
}
},
x: function() {
if (a.worldMapConfig) {
this.y=!this.y;
if (this.y) {
a.worldMapConfig.setVisibility("visible");
}
else {
a.worldMapConfig.setVisibility("hidden")
}
}
},
y: true,
}
});
qx.Class.define("dave.lou.RaidTip", {
extend: qx.core.Object,
construct: function()
{
this.s();
dave.lou.x = this;
this.h=a.worldViewToolTip;
this.h.addListener("appear", this.j, this);
},
properties: {
targetChanged : {
init: false,
check: "Boolean",
event: "changeTarget"
},
},
members: {
h:null,
ii:0,
i: function(i) {
this.ii=i;
this.toggleTargetChanged();
},
j: function () {
try {
var t = this.h.getLabel();
if (t!=null&&t.length>20) {
var i = t.match(/\d+/g);
if (i==null) return;
var j = i.length;
if (t.match(new RegExp(la["type"]))){
this.k(i,j,t);
}
else if (t.match(new RegExp(la["name"]))){
this.l(i,j,t);
}
else this.i(0);
}
else this.i(0);
}
catch (e) {
console.error(e);
}
},
k: function (i,j,l) {
var r=l.match(new RegExp(la["coord"]))[0].match(/\d+/g),s=0;
this.c = r[1];
this.d = r[0];
this.x(this.d,this.c);
this.e = l.match(new RegExp(la["prog"]))[0].match(/\d+/)[0]*1;
this.f = l.match(new RegExp(la["leveld"]))[0].match(/\d+/)[0];
if (l.match(new RegExp(la["mnt"]))) this.g=1;
else if (l.match(new RegExp(la["forest"]))) this.g=2;
else if (l.match(new RegExp(la["hill"]))) this.g=3;
else if (l.match(new RegExp(la["sea"]))) this.g=4;
else this.g=0;
this.y();
n=this.w/3;
this.o = this.m(this.g,this.a[this.f-1]*100);
r = this.o/3;
this.p = Math.round(r + (this.o-r)*this.e/100);
if (this.e+n>90) n=Math.round((100-this.e)/2)
this.n = Math.round(r + (this.o-r)*(this.e+n)/100);
if (this.e+n+10>90) n=Math.round((100-this.e-10)/2)-10
this.r = Math.round(r + (this.o-r)*(this.e+n+10)/100);
if (this.n > this.o) this.n=this.o;
if (this.r > this.o) this.r=this.o;
this.q=0;
var n="";
for (var k in t.units) {
if (k==1||k>17||k==2||k==8||k==13||k==14||k==15) continue;
this.q += t.units[k].count * m.units[k].c;
n=n+m.units[k].dn+": "+t.units[k].count+" ";
if (s<this.t[k].s)s=this.t[k].s
}
if (z) this.i(1);
else this.i(3);
if (c&&!c.o.w) return;
this.u=this.u*s+3600;
s=new Date();
s.setHours(0, 0, this.u, 0);
r = "Raid info: Cur: "+Math.round(this.q/this.p*100)
+"%, 1D: "+ Math.round(this.q/this.n*100)
+"%, 2D: "+ Math.round(this.q/this.r*100)
+"%, Max: "+Math.round(this.q/this.o*100)+"%<br>"+n;
l+=r+"<br>Travel time "+ s.toLocaleTimeString()
this.h.setLabel(l);
},
l: function (i,j,l) {
var r=l.match(new RegExp(la["coord"]))[0].match(/\d+/g),s=0;
this.c = r[1];
this.d = r[0];
this.x(this.d,this.c);
this.e = -1;
this.f = l.match(new RegExp(la["levelb"]))[0].match(/\d+/)[0];
if (l.match(new RegExp(la["hydra"]))) this.g=1;
else if (l.match(new RegExp(la["dragon"]))) this.g=2;
else if (l.match(new RegExp(la["moloch"]))) this.g=3;
else if (l.match(new RegExp(la["octopus"]))) this.g=4;
else this.g=0;
var n="";
this.q=0;
for (var k in t.units) {
if (k==1||k>17||k==2||k==8||k==13||k==14||k==15) continue;
if (this.g!=4&&(k==16||k==17)) continue;
if (this.g==4&&(k!=16&&k!=17)) continue;
r= t.units[k].count * this.t[k].i;
if (this.t[k].j==this.g) r*=1.5;
this.q+=r;
n=n+m.units[k].dn+": "+t.units[k].count+" ";
if (s<this.t[k].s)s=this.t[k].s
}
this.i(2);
if (c&&!c.o.w) return;
k = this.b[this.f-1]*100;
this.u*=s;
s=new Date();
s.setHours(0, 0, this.u, 0);
l=l+"Raid info: Enough for "+Math.round(this.q/k)+" bosses<br>"+n
+"<br>Travel time "+ s.toLocaleTimeString();
this.h.setLabel(l);
},
s: function() {
var j,k,t=this.t={},a=b.Tech,c=a.getInstance(),d="unitDamage",e="unitSpeed",f="research",g="shrine"
for (var i in m.units) {
j=m.units[i],t[i]={};
k=(c.getBonus(d,a[f],i*1)+100+c.getBonus(d,a[g],i*1))/100;
t[i].i=j.av*k;
k=(c.getBonus(e,a[f],i*1)+100+c.getBonus(e,a[g],i*1))/100;
t[i].s=j.s/k;
t[i].j=this.z[j.ut];
if (i==19)break;
}
},
x: function(a,b){
var c=t.getId();
var d=c>>>16;
c&=0xFFFF;
this.u=Math.sqrt(Math.pow(a-c,2)+Math.pow(b-d,2));
},
m: function(i,j) {
if (i==1) return Math.round(j*1.2);
else if (i==2) return j;
else if (i==3) return j;
else if (i==4) return Math.round(j*.85);
else return j;
},
a: [4, 18, 72, 230, 690, 1600, 3100, 5700, 9300, 13800],
b: [25, 150, 1000, 2000, 5000, 7500, 10000, 15000, 22500],
c: null,
d: null,
e: null,
f: null,
g: null,
o: null,
n: null,
r: null,
p: null,
q: null,
t: null,
u: null,
v: null,
w: null,
y: function() {
var d = new Date();
if (c) d.setHours(c.o.f,0,0);
else d.setHours(20,0,0);
d.setMinutes(0);
d.setSeconds(0);
d.setMilliseconds(d.getTimezoneOffset()*60*-1000-o+150);
while ((this.w=(d-new Date())/3600000)<12){
d.setHours(d.getHours()+24);
}
this.v=d.getTime();
},
z: [0,1,2,0,4,0,0,3]
},
});
qx.Class.define("dave.lou.Cities", {
extend: qx.core.Object,
construct: function()
{
this.k = false;
this.c = {};
this.w();
},
properties: {
idle : {
init: null,
check: "String",
event:"changeIdle"
},
},
members: {
k: null,
i: 0,
c: null,
s: function (){
this.f = false;
this.k = false;
this.c = {};
j.addConsumer("COMO", this);
},
getRequestDetails: function() {
if (this.k) return "";
else return "a";
},
dispatchResults: function(data) {
if (!data) return;
if (!this.k) {
this.totals={};
this.incity={};
}
this.k = true;
try {
for (var i = 0; i < data.length; i++) {
var r = data[i];
if (r.i) this.a(r);
}
} catch (e) {
console.error(e)
}
},
a: function(data) {
var city = this.c[data.i];
if (!city) {
this.c[data.i] = {
t:0,
n:false
};
}
var w=false;
var q = 0;
var v = false;
var o = 0;
var u = {};
var d = new Date();
d=(d-r)/1000;
for (var i = 0; i < data.c.length; i++) {
var e = data.c[i];
for (var j = 0; j < e.u.length; j++) {
var h = e.u[j];
var k = h.t;
if (this.o[k]) continue;
if (!c.o.d)
if (k==3||k==4||k==5||k==9||k==10) {
continue;
}
if (!c.o.o)
if (k==6||k==7||k==11||k==12) {
continue;
}
if (!c.o.n)
if (k==16||k==17||k==15) continue;
if (k==16||k==17||k==15) v=true;
var b = h.c;
var n = m.units[k];
var s = n.c
var t = b * s;
if (k==15) t=1;
if (e.i == 0) {
q += t;
if (u[n.dn]) u[n.dn]+=b;
else u[n.dn]=b
}
else {
if (e.d==1) {
if (e.e-d <10000) {
q -= t;
if (u[n.dn]) u[n.dn]-=b;
else u[n.dn]=b
}
else if (this.o.s){
w=true;
q -= t;
if (u[n.dn]) u[n.dn]-=b;
else u[n.dn]=b
}
else{
w=true;
}
}
o++;
}
}
}
if (o == 15) {
q=0;
}
d = "";
if (w) d="Scheduled orders\n"
for (var x in u) {
t = u[x]
if (t >0)
d = d + x+" "+t  + "\n"
}
this.c[data.i] = {
t:q,
n:v,
d:d,
o:data,
};
},
d: {},
g1:0,
gl:{},
gs: function() {
if(!c.o.g){
this.g1=-1;
return;
}
var g=a.cityBar.getCurrentGroup();
if(g!=this.g1) {
this.g1=g
this.gl={}
if (g>0) {
for (var i=0;i<p.citygroups.length;i++) {
if (p.citygroups[i].i==g) {
for (var j=0;j<p.citygroups[i].c.length;j++) {
this.gl[p.citygroups[i].c[j]]=true
}
}
}
}
}
},
m: function() {
this.gs();
var t = {
c:-1,
t:-1,
n:false,
d:null,
p:null
};
var prev = t;
for (var d in this.c) {
if (t.c==-1) t.c=0;
var w = s.getContinentFromCoords(d&0xffff, d>>>16);
if (this.d[d]) continue;
if (this.h[d]) continue;
if (this.e[w]) continue;
if (this.g1>0&&!this.gl[d]) continue;
var r = this.c[d];
if (r.t < this.o.t*10000) continue;
if (t.t < r.t) {
prev = t;
prev.p = null;
t = {
c:d,
t:r.t,
n:r.n,
d:r.d,
p:prev,
};
} else if ((t.p!=null&&t.p.t<r.t)||t.p==null){
t.p = {
c:d,
t:r.t,
n:r.n,
d:r.d,
p:null
}
}
}
if (!this.o.r) this.d[t.c]=1;
return t;
},
f:false,
g: function () {
var c = j.reciever.COMO
if (!c||this.f) this.s();
else {
var o = c.obj;
if (o != this) {
var r = a.getOverviewWindow();
var v = r.getVisibility();
var p = r.getTab();
if (v == "visible" && p == 3) {
alert("Command Overview window must be closed for this to work");
return;
}
else
this.s();
}
}
var i = this.m();
if (i.c == -1||!this.k) {
new qx.event.Timer.once(this.g,this,1000);
return;
}
if (i.c == 0) {
this.d={};
i = this.m();
if (i.c==0) {
w.h();
alert("No more idle troops.  Try again later.");
return;
}
}
var h = i;
if (i.c == t.getId()&&i.p&&i.p.c) h = i.p;
if (a.currentOverlay) a.switchOverlay();
var m = "r"
if (h.n) m = "w"
p=this.getIdle();
if (p==h.d) h.d+=" ";
this.setIdle(h.d);
this.j(h.c, m);
},
t: function(i){
if (!p.cities[i]) return;
t.setRequestId(i);
a.visMain.selectEntity();
ClientLib.Vis.VisMain.GetInstance().ResetSelection();
},
r: function (x,y,m){
if (!x||!y) return;
if (m!="r"&&m!="w") m=null;
if (!m) {
m=a.visMain.getMapMode()
if (m=="c") m="r";
}
webfrontend.gui.Util.showMapModeViewPos(m,0,x,y);
},
j: function(i, j) {
var k = i >> 16;
var l = i & 0xFFFF;
this.r(l,k,j);
this.t(i);
},
h: {},
e: {},
x: function(){
var i = t.getId();
this.h[i] = true;
this.g();
},
u: function(){
var i = t.getId();
var c = s.getContinentFromCoords(i&0xffff, i>>>16);
this.e[c] = true;
this.g();
},
b: function(){
this.h = {};
this.e={};
},
o: {
p:4,
t:10,
r:true,
s:true,
},
l: function(t) {
if (this.o[t]) return false;
else return true;
},
n: function (t,v) {
if (!v) this.o[t]=1;
else delete this.o[t];
this.p()
this.f=true;
},
w: function(){
var e = this.o = this.v();
if (!e) {
e=this.o={};
e.p=4;
e.t=10;
e.r=true;
e.s=true;
e.d=true;
e.o=true;
e.n=true;
e.w=true;
e.g=false;
e.a=60;
e.f=20;
e[1]=1;
e[2]=1;
e[8]=1;
e[13]=1;
e[14]=1;
e[15]=1;
e[19]=1;
this.p();
}
if (e.p==null) e.p=4;
if (e.t==null) e.t=10;
if (e.a==null) e.a=60;
if (e.r==null) e.r=true;
if (e.s==null) e.s=true;
if (e.d==null) e.d=true;
if (e.o==null) e.o=true;
if (e.n==null) e.n=true;
if (e.w==null) e.w=true;
if (e.g==null) e.g=false;
if (e.f==null) e.f=20;
},
p: function(){
if (localStorage)
localStorage["davelouraid"+i]=JSON.stringify(this.o);
},
v: function () {
var j = localStorage["davelouraid"+i];
if (j) return JSON.parse(j);
else return null;
},
},
});
qx.Class.define("dave.lou.RIo", {
extend: qx.ui.container.Composite,
construct: function()
{
this.base(arguments,new qx.ui.layout.VBox());
this.buildGUI();
var i=new qx.ui.tabview.Page("Raid");
i.setLayout(new qx.ui.layout.Grow());
var j=new qx.ui.container.Scroll(this).set({
allowStretchY:true,
allowStretchX:true
});
i.add(j)
a.getOptionsPage().clientArea.getChildren()[0].add(i)
},
members: {
off:null,
def:null,
nav:null,
buildGUI: function(){
this.setLayout(new qx.ui.layout.VBox())
var t = "<b>DaveLoU Raid Assistant</b> <br><br>  "
+"<b>Idle Troops</b> <br>"
+"Included troops:"
var l = new qx.ui.basic.Label(t).set({
rich:true,
})
this.add(l)
this.add( new qx.ui.core.Spacer(5,5));
var h = new qx.ui.container.Composite(new qx.ui.layout.HBox({
alignY:"middle"
}));
this.add(h)
var n=new qx.ui.form.CheckBox("OFFENSE").set({
width: 100,
})
n.setValue(c.o.o)
n.addListener("changeValue",function(e){
if (e.getData()) {
this.off.setEnabled(true);
c.o.o=true;
}
else {
this.off.setEnabled(false);
c.o.o=false;
}
c.p();
c.f=true;
},this,false)
h.add(n);
this.off = new qx.ui.container.Composite(new qx.ui.layout.Flow());
h.add(this.off);
if (!c.o.o){
this.off.setEnabled(false);
}
this.add( new qx.ui.core.Spacer(5,5));
h = new qx.ui.container.Composite(new qx.ui.layout.HBox({
alignY:"middle"
}));
this.add(h)
n = new qx.ui.form.CheckBox("DEFENSE").set({
width: 100,
})
n.setValue(c.o.d)
n.addListener("changeValue",function(e){
if (e.getData()) {
this.def.setEnabled(true);
c.o.d=true;
}
else {
this.def.setEnabled(false);
c.o.d=false;
}
c.p();
c.f=true;
},this,false)
h.add(n)
this.def = new qx.ui.container.Composite(new qx.ui.layout.Flow());
h.add(this.def);
if (!c.o.d){
this.def.setEnabled(false);
}
this.add( new qx.ui.core.Spacer(5,5));
h = new qx.ui.container.Composite(new qx.ui.layout.HBox({
alignY:"middle"
}));
this.add(h)
n = new qx.ui.form.CheckBox("NAVY").set({
width: 100,
})
n.setValue(c.o.n)
n.addListener("changeValue",function(e){
if (e.getData()) {
this.nav.setEnabled(true);
c.o.n=true;
}
else {
this.nav.setEnabled(false);
c.o.n=false;
}
c.p();
c.f=true;
},this,false)
h.add(n)
this.nav = new qx.ui.container.Composite(new qx.ui.layout.Flow());
h.add(this.nav);
if (!c.o.n){
this.nav.setEnabled(false);
}
var n2=1;
var n1=1;
var n3=1;
for (t in m.units) {
if (t==1||t==2||t==8||t==13||t==14) continue;
if (t>17) break;
var u = m.units[t];
n = new qx.ui.form.CheckBox(u.dn).set({
width: 100,
});
if (t==3||t==4||t==5||t==9||t==10) {
n1++;
this.def.add(n,{
lineBreak: (n1%4==0)
});
}
else if (t==15||t==16||t==17) {
n3++;
this.nav.add(n,{
lineBreak: (n3%4==0)
});
}
else {
n2++;
this.off.add(n,{
lineBreak: (n2%4==0)
})
}
n.setModel(t);
n.setValue(c.l(t))
n.addListener("changeValue",function(e){
c.n(this.getModel(),e.getData())
},false);
}
l = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add( new qx.ui.core.Spacer(10,10));
this.add(l)
n = new qx.ui.basic.Label("Minimum seconds to display troop popup ").set({
width: 250
});
l.add(n)
n = new qx.ui.form.TextField().set({
filter: /\d/,
maxLength: 1,
height: 20,
width: 20,
allowGrowX:false,
})
n.setValue(c.o.p.toString())
n.addListener("changeValue",function(){
var r = this.getValue();
if (r) {
if (r!=c.o.p) {
c.o.p = r*1;
c.p();
}
}
else
this.setValue(c.o.p.toString())
},false);
l.add(n);
l = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(l)
n = new qx.ui.basic.Label("Ignore cities with less than (in 1000s) ").set({
width:250,
});
l.add(n)
n = new qx.ui.form.TextField().set({
filter: /\d/,
maxLength: 2,
height: 20,
width: 30,
allowGrowX:false,
})
n.setValue(c.o.t.toString())
n.addListener("changeValue",function(){
var r = this.getValue();
if (r) {
if (r!=c.o.t) {
c.o.t = r*1;
c.p();
}
}
else
this.setValue(c.o.t.toString())
},false);
l.add(n);
l = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(l)
n = new qx.ui.basic.Label("Regenerate list every time (hides R Button) ").set({
width:250,
});
l.add(n)
n = new qx.ui.form.CheckBox().set({
height:20,
});
n.setValue(c.o.r)
n.addListener("changeValue",function(){
var r = this.getValue();
c.o.r = r;
c.p();
if (r) {
if (w) w.d.setVisibility("excluded")
c.d={};
}
else {
if (w) w.d.setVisibility("visible")
}
},false);
l.add(n);
l = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(l)
n = new qx.ui.basic.Label("Subtract scheduled orders from count").set({
width:250,
});
l.add(n)
n = new qx.ui.form.CheckBox().set({
height:20,
});
n.setValue(c.o.s)
n.addListener("changeValue",function(){
var s = this.getValue();
c.o.s = s;
c.p();
},false);
l.add(n);
l = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(l)
n = new qx.ui.basic.Label("Restrict to current selected group").set({
width:250,
});
l.add(n)
n = new qx.ui.form.CheckBox().set({
height:20,
});
n.setValue(c.o.g)
n.addListener("changeValue",function(){
var s = this.getValue();
c.o.g = s;
c.p();
},false);
l.add(n);
l = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(l)
n = new qx.ui.basic.Label("Reset raids minutes before scheduled orders").set({
width:250,
});
l.add(n)
n = new qx.ui.form.TextField().set({
filter: /\d/,
maxLength: 3,
width: 30,
})
n.setValue(c.o.a.toString())
n.addListener("changeValue",function(){
var s = this.getValue();
if (s&&(s*1)!=c.o.a) {
c.o.a = s*1;
c.p();
}
else
this.setValue(c.o.a.toString())
},false);
l.add(n);
this.add( new qx.ui.core.Spacer(5,5));
t = "<br><b>Raid Send</b> <br>"
l = new qx.ui.basic.Label(t).set({
rich:true,
})
this.add(l)
this.add( new qx.ui.core.Spacer(5,5));
l = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(l)
n = new qx.ui.basic.Label("Show info on region/world tooltip").set({
width:250,
});
l.add(n)
n = new qx.ui.form.CheckBox().set({
height:20,
});
n.setValue(c.o.w)
n.addListener("changeValue",function(){
var s = this.getValue();
c.o.w = s;
c.p();
},false);
l.add(n);
l = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(l)
n = new qx.ui.basic.Label("Raid 1-2 day end time (0-23) 20=8pm").set({
width:250,
});
l.add(n)
n = new qx.ui.form.Spinner(0,c.o.f,23).set({
width: 50,
})
n.addListener("changeValue",function(){
var s = this.getValue();
c.o.f = s*1;
c.p();
},false);
l.add(n);
},
},
});
qx.Class.define("dave.lou.RaidSend", {
extend: qx.core.Object,
construct: function()
{
this.m = new qx.ui.menu.Menu();
this.m.set({
width:100,
iconColumnWidth:0
});
this.m1 = new qx.ui.menu.Button("Raid 1 day");
this.m.add(this.m1);
this.m1.addListener("click",function(e){
this.k2(e)
this.n(1)
},this);
this.m2 = new qx.ui.menu.Button("Raid 2 days");
this.m.add(this.m2);
this.m2.addListener("click",function(e){
this.k2(e)
this.n(2)
},this);
this.m3 = new qx.ui.menu.Button("Raid Complete");
this.m.add(this.m3);
this.m3.addListener("click",function(e){
this.k2(e)
this.h()
},this);
this.m5 = new qx.ui.menu.Button("Raid Once");
this.m.add(this.m5);
this.m5.addListener("click",function(e){
this.k2(e)
this.n(0)
},this);
this.m4 = new qx.ui.menu.Button("Raid Boss");
this.m.add(this.m4);
this.m4.addListener("execute",this.i,this);
dave.lou.x.addListener("changeTarget",this.k,this)
},
members: {
mo:null,
m:null,
m1: null,
m2: null,
m3: null,
m4: null,
m5: null,
k: function () {
this.m.hide();
if (!this.mo) {
var m=a.worldView.getContextMenu();
if (m&&m!=this.m) this.mo=m
}
if (dave.lou.x.ii==0) {
a.worldView.setContextMenu(this.mo);
}
else if (dave.lou.x.ii==1) {
a.worldView.setContextMenu(this.m);
this.m1.setVisibility("visible");
this.m2.setVisibility("visible");
this.m3.setVisibility("visible");
this.m5.setVisibility("visible");
this.m4.setVisibility("excluded");
}
else if (dave.lou.x.ii==2) {
a.worldView.setContextMenu(this.m);
this.m1.setVisibility("excluded");
this.m2.setVisibility("excluded");
this.m3.setVisibility("excluded");
this.m5.setVisibility("excluded");
this.m4.setVisibility("visible");
}
else if (dave.lou.x.ii==3) {
a.worldView.setContextMenu(this.m);
this.m1.setVisibility("excluded");
this.m2.setVisibility("excluded");
this.m3.setVisibility("excluded");
this.m5.setVisibility("visible");
this.m4.setVisibility("excluded");
}
},
k4: 0,
k3: 5,
k2: function(i) {
if (!t.unitOrders) var n=0;
else  n=t.unitOrders.length;
this.k3 = t.getOrderLimit()-n;
this.k4=0;
if (i.isCtrlPressed()) this.k4=1;
else if (i.isMetaPressed()) this.k4=1;
if (i.isAltPressed())this.k4+=2;
if (i.isShiftPressed()) this.k4+=4;
if (this.k4>this.k3||this.k4==0) this.k4=this.k3
},
n: function (a) {
var x = dave.lou.x,b = {},p = t.getUnits(),u=0;
for (var k in p ) {
var q = p[k];
if (k==1||k>18||k==2||k==8||k==13||k==14||k==15) continue;
r = {
c: m.units[k].c,
l: q.count,
y: q.count,
};
u += r.l * r.c;
b[k] = r;
}
if (a==2) p=x.r
else if (a==1) p=x.n
else p=x.p
var i = p/u;
if (t.unitOrders==null) u=0;
else  u=t.unitOrders.length;
var j = p = u=t.getOrderLimit()-u;
for (k in b) {
r = b[k];
r.t = Math.round(r.l * i);
r.m = Math.round(r.t*.9);
r.j = Math.floor(r.l/r.t);
r.p = Math.floor(r.l/r.m);
j = Math.min(j,r.j);
p = Math.min(p,r.p);
}
if (p>j)j=p;
if (j==0) return;
for (k in b) {
r = b[k];
r.v = r.x = Math.floor(r.l/j);
r.y=r.l-r.x*(j-1);
}
var y={};
y.playerName="";
y.coord=x.d+":"+x.c;
k=x.v;
if (a==2)k+=0x14997<<10;
if (j>1) {
i = [];
j=j-1;
if (this.k4<j)j=this.k4;
for (q in b) {
p=b[q].x;
r = {
t: q,
c: p
};
i.push(r);
}
if (a==0)
u = new dave.lou.OU(0,1,true,y,8,i,1,0,0,j);
else
u = new dave.lou.OU(0,1,true,y,8,i,1,2,k,j);
u.x();
if (j==this.k4) return;
}
i = [];
for (q in b) {
p=b[q].y;
r = {
t: q,
c: p
};
i.push(r);
}
if (a==0)
u = new dave.lou.OU(0,1,true,y,8,i,1,0,0,1);
else
u = new dave.lou.OU(0,1,true,y,8,i,1,2,k,1);
u.x();
},
h: function () {
var x = dave.lou.x;
var l = x.m(x.g,x.a[x.f-1]*100);
var r = l/3;
var u = Math.round(r + (l-r)*x.e/100);
u = x.e+(100-x.e)*.75
u =(l-r)*u/100;
l=Math.round(r+u);
var b = {};
var p = t.getTargetArmy();
u=0;
for (var k =0; k<p.length; k++ ) {
var q = p[k];
var n = q.t;
if (n==1||n>18||n==2||n==8||n==13||n==14||n==15) continue;
r = {
c: m.units[n].c,
s: q.c,
l: t.units[n].count,
r: t.units[n].total
};
r.y = r.l;
u += r.s * r.c;
b[n] = r;
}
var i = l/u;
if (t.unitOrders==null) n=0;
else  n=t.unitOrders.length;
var j = p = t.getOrderLimit()-n;
for (k in b) {
r = b[k];
r.t = Math.round(r.s * i);
r.m = Math.round(r.t*.9);
r.k = Math.min(t.getOrderLimit(),Math.floor(r.s/r.m))
r.u = Math.floor(r.s/r.k);
r.j = Math.floor(r.l/r.t);
r.p = Math.floor(r.l/r.m);
k = Math.min(k,r.k);
j = Math.min(j,r.j);
p = Math.min(p,r.p);
}
if (p>j)j=p;
if (j==0) return;
u=true;
for (k in b) {
r = b[k];
r.v = r.x = Math.floor(r.l/j);
if (r.r/r.s < (1-1/r.k)&&r.x>r.t) u=false;
if (r.x/r.t>1.3&&r.k!=1) u=false;
}
var y={};
k=this.k4;
y.playerName="";
y.coord=x.d+":"+x.c;
if (j>1) {
i = [];
j=j-1;
if (this.k4<j)j=this.k4;
for (q in b) {
if (u)
p=b[q].x;
else
if (b[q].t>b[q].l) p=b[q].l;
else p=b[q].t;
b[q].y -= j*p;
r = {
t: q,
c: p
};
i.push(r);
}
n = new dave.lou.OU(0,1,true,y,8,i,1,1,0,j);
n.x();
if (this.k4==j) return;
}
i = [];
for (q in b) {
if (u)
if ((b[q].y-b[q].x<10)) p=b[q].y;
else p=b[q].x;
else
p=b[q].t;
b[q].y -= p;
r = {
t: q,
c: p
};
i.push(r);
}
n = new dave.lou.OU(0,1,true,y,8,i,1,1,0,1);
n.x();
},
j: null,
i: function () {
var x=dave.lou.x;
var l = x.b[x.f-1]*100;
var r = 0;
var u = 0;
var b = {};
var p = t.getUnits();
for (var k in p ) {
var q = p[k];
if (k==1||k>18||k==2||k==8||k==13||k==14||k==15) continue;
if (x.g!=4&&(k==16||k==17)) continue;
if (x.g==4&&(k!=16&&k!=17)) continue;
r = {
c: x.t[k].i,
l: q.count,
};
if (x.t[k].j==x.g) r.c*=1.5;
u += r.l * r.c;
b[k] = r;
}
var i = l/u;
p=[];
for (k in b) {
r = b[k];
l=r.l*i/10;
r.t = Math.round(l)*10;
if (l>1000) r.t=Math.round(l/100)*1000;
else if (l>100) r.t=Math.round(l/10)*100;
r.m = Math.round(r.t*.9);
if (r.l < r.m) return;
if (r.l < r.t) r.x=r.l
else r.x=r.t;
q = {
t: k,
c: r.x
};
p.push(q);
}
var y={};
y.playerName="";
y.coord=x.d+":"+x.c;
var a = new dave.lou.OU(0,1,true,y,8,p,1,0,0,1);
a.x();
},
},
});
qx.Class.define("dave.lou.Cmd",
{
extend: qx.core.Object,
construct: function()
{
},
members: {
i: "null",
j: {},
m: null,
n: null,
p: false,
x: function () {
x.sendCommand(this.i, this.j, this, this.o);
},
o: function (i, j, k) {
this.m = i;
this.n = j;
this.p = k;
}
}
});
qx.Class.define("dave.lou.OU",
{
extend: dave.lou.Cmd,
construct: function(time, ship, ally, target, type, units, tref, repeat, until, count)
{
if (time !=0) this.time=time.getTime();
if (ally) ally = 0;
else ally = 1;
if (repeat==null) repeat=0;
if (until==null) until=0;
this.i = "OrderUnits";
if (count==null) count=0;
this.j = {
createCity: "",
cityid: t.getId(),
iUnitOrderOptions: ally,
iOrderCountRaid: count,
raidReferenceTimeUTCMillis: until,
raidTimeReferenceType: repeat,
order : type,
timeReferenceType : tref,
referenceTimeUTCMillis : this.time,
targetPlayer : target.playerName,
targetCity : target.coord,
transport : ship,
units : units
};
},
members: {
time: 0,
}
});
qx.Class.define("dave.lou.CO",
{
extend: dave.lou.Cmd,
construct: function(i,j,k)
{
this.i = "UnitOrderSetRecurringOptions";
this.j = {
id : i,
cityid: t.getId(),
isDelayed: false,
recurringEndStep : j,
recurringType : k
};
},
members: {
}
});
var a,b,o,u,i,m,t,p,r,s,j,c,x,w,z=false;
try {
b=webfrontend;
a=qx.core.Init.getApplication();
m=b.res.Main.getInstance();
x=b.net.CommandManager.getInstance();
j=b.net.UpdateManager.getInstance();
b=b.data;
u=b.ServerTime.getInstance();
t=b.City.getInstance();
r=b.ServerTime.getInstance().refTime;
p=b.Player.getInstance();
s=b.Server.getInstance();
i=((p.getId()<<11)+s.getName().match(/\d+/)[0]*1).toString(15);
o = u.serverOffset;
if (p.getMinisterMilitaryPresent()) {
new dave.lou.RaidIdle().s();
z=true
}
new dave.lou.RaidTip();
new dave.lou.RaidSend();
} catch (e) {
console.error(e);
}
}
var script = document.createElement("script");
script.innerHTML = "(" + inject.toString() + ")();";
script.type = "text/javascript";
script.title = "dave.lou.raid";
document.getElementsByTagName("head")[0].appendChild(script);
})();
