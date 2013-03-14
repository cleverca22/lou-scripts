// ==UserScript==
// @name           DaveLoU TM Assist
// @description    Trade Minister utility
// @namespace      davelou
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        0.3.2
// ==/UserScript==

(function() {
	var inject = function daveloutm() {
		if (webfrontend.data.City.getInstance().getId()<1) {
			window.setTimeout(daveloutm, 5000);
			return;
		}
	qx.Class.define("dave.lou.TMC", {
		extend: qx.core.Object,
		construct: function() {
			qx.event.Timer.once(this.k,this,2000);
		},
		members: {
			i: null,
			j: null,
			menu: null,
			k:function(){
				if (!p.ministerInfoWidget) {
					qx.event.Timer.once(this.k,this,2000);
				} else {
					if (!this.i) {
						this.i =p.ministerInfoWidget;
					}
					if (this.i[4]&&!this.j) {
						this.j=this.i[4].clientArea.getChildren()[0].getSelection()[0];
						if (this.j.classname!="webfrontend.gui.TradeMinisterOptionsPage"){
							this.j=null;
							qx.event.Timer.once(this.k,this,2000);
							return;
						}
						this.j=this.j.getChildren()[1].getChildren()[1];
						if (this.j.getChildren().length==3) {
							this.menu = v = new qx.ui.menu.Menu().set({
								iconColumnWidth: 0,
							});
							var b= new qx.ui.form.MenuButton("TM Assist",null,this.menu);
							this.j.addAt(b,2)
							this.j.addAt(new qx.ui.core.Spacer(),3,{
								flex:1
							})
							new dave.lou.TMS()
							console.log('made TM Assist button '+v);
						}
					} else qx.event.Timer.once(this.k,this,2000);
				}
			},
			getMenu: function () {
				return this.menu;
			}
		}
	});
	qx.Class.define("dave.lou.L", {
		extend: qx.core.Object,
		construct: function() {
			this.w();
		},members: {
			j:[],
			o: {},
			i: d=dave||function(){},
			w: function(){
				l=this;
				var e=null;
				try{
					e=this.o=this.v();
				} catch(r){}
				if (!e) {
					e=this.o={};
					e.s="hub";
					e.t="hub";
					e.l={};
					e.l[1]={m:"null"}
					e.l[100]={
							i:150,
							j:150,
							k:0,
							l:0,
							m:"Res build"
					}
					e.l[101]={
							i:0,
							j:0,
							k:0,
							l:0,
							m:"Res done"
					}
					e.l[102]={
							i:200,
							j:200,
							k:200,
							l:200,
							m:"Mil build"
					}
					this.p();
				}
				if (!e.t) e.t="hub";
				this.k();
			},
			k: function() {
			if (!this.o.l[1]) {
			var l={};
			l[1]={
			m:"null"
			};
			var a=100;
			for (var i in this.o.l) {
			var j=this.o.l[i];
			j.m=i;
			l[a++]=j;
			}
			this.o.l=l;
			this.p()
			}
			},
			p: function(){
			if (localStorage)
			localStorage["daveloutm"]=JSON.stringify(this.o);
			},
			v: function () {
			var j = localStorage["daveloutm"];
			if (j) return JSON.parse(j);
			else return null;
			},
		},
	});
	qx.Class.define("dave.lou.TMS", {
		extend: qx.core.Object,
		construct: function() {
			this.i();
			this.n();
			r=this;
		},members: {
			j: null,
			n: function (i) {
				v.removeAll();
				for (var j in l.o.l) {
					if (j==1)continue;
					var k = new qx.ui.menu.Button(l.o.l[j].m);
					k.setUserData("i",j);
					v.add(k);
					k.addListener("execute", function(e){
						var i=e.getTarget().getUserData("i");
						this.m(i);
					},this, false);
				}
				k = new qx.ui.menu.Button("Config");
				k.set({
					blockToolTip: false,
					toolTipText : "Manage config",
				});
				v.add(k)
				k.addListener("execute", function(){
					if (!this.j) this.j=new dave.lou.TMW()
					this.j.i();
				},this, false);
			},
			m: function(i){
				new dave.lou.TMF().n(l.o.l[i])
			},
			q:null,
			o:null,
			p:null,
			i: function(){
				var app = qx.core.Init.getApplication();
				var a  = app.currentOverlay;
				if (!a) return;
				if (a.classname!="webfrontend.gui.MinisterInfo.Trade")return;
				if (a.getVisibility()!="visible") return;
				a = a.clientArea.getChildren()[0].getSelection()[0];
				if (a.classname!="webfrontend.gui.TradeMinisterOptionsPage") return;
				if (!a||a.getVisibility()!="visible") return;
				for (var k in a) {
					if (a.hasOwnProperty(k)) {
						var l = a[k];
						if (l instanceof Array && l.length==4) {
							if (l[0].classname=="webfrontend.ui.CustomSelectBox"&&l[0].getUserData("Type")==0) {
								this.o=x=l;
							}
							if (l[0].classname=="webfrontend.ui.CustomSelectBox"&&l[0].getUserData("Type")==1) {
								this.q=z=l;
							}
							if (l[0].classname=="webfrontend.ui.SpinnerInt") {
								this.p=y=l;
							}
						}
					}
				}
			},
		}
	});
qx.Class.define("dave.lou.TMF", {
extend: qx.core.Object,
construct: function()
{
},
members: {
n: function(i){
var h = new dave.lou.TMH().n(l.o.s.toLowerCase());
this.m(h,x);
h = new dave.lou.TMH().n(l.o.t.toLowerCase());
this.m(h,z);
y[0].setValue(i.i*1000);
y[1].setValue(i.j*1000);
y[2].setValue(i.k*1000);
y[3].setValue(i.l*1000);
},
m:function(h,x){
for (var m = 0; m < 4; m++) {
var b = x[m];
var s = b.getSelectables();
for (var j = 0; j < s.length; j++) {
var t = s[j];
if (t.getModel()==h) {
b.setSelection([t]);
break;
}
}
}
}
}
});
qx.Class.define("dave.lou.TMH", {
extend: qx.core.Object,
construct: function()
{
},
members: {
l: "citygroups",
n: function(b) {
var x = s.getId();
var y = x >>> 16;
x = x & 0xFFFF;
var cont = a.getContinentFromCoords(x, y);
var m={};
for (var i = 0; i < t[this.l].length; i++) {
var g = t[this.l][i];
if (g.n.toLowerCase().indexOf(b)>=0) {
m[i]=g;
}
}
var d=10000;
var n=0;
for (var k in m) {
g=m[k];
for (i = 0; i < g.c.length; i++) {
var j = g.c[i];
var y2 = j >>> 16;
var x2 = j & 0xFFFF;
var cont2 = a.getContinentFromCoords(x2, y2);
if (cont2 == cont) {
var z = this.d(x,y,x2,y2)
if (z<d) {
n=j;
d=z;
}
}
}
}
return n;
},
d: function(x,y,x2,y2) {
var xd = (x-x2)*(x-x2);
var yd = (y-y2)*(y-y2);
return Math.sqrt(xd+yd);
},
}
});
qx.Class.define("dave.lou.TMW", {
extend: qx.ui.window.Window,
construct: function()
{
this.base(arguments,"Trade Minister Assist Config");
this.buildGUI();
},
members: {
buildGUI: function() {
this.set({
resizable: false,
showMaximize : false,
showMinimize : false,
showStatusbar : false,
useMoveFrame : true,
contentPadding:5,
});
this.setLayout(new qx.ui.layout.VBox());
var m = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add( new qx.ui.core.Spacer(10,10));
this.add(m)
var n = new qx.ui.basic.Label("Hub groups search. From:").set({
width: 130
});
m.add(n)
n = this.n1=new qx.ui.form.TextField().set({
maxLength: 10,
height: 20,
width: 60,
allowGrowX:false,
})
n.setValue(l.o.s)
n.addListener("focusin",this.g,this);
n.addListener("focusout",this.h,this);
n.addListener("changeValue",function(){
var r = this.getValue();
if (r) {
if (r!=l.o.s) {
l.o.s = r.toLowerCase();
l.p();
}
}
this.setValue(l.o.s)
},false);
m.add(n);
m.add( new qx.ui.core.Spacer(10,10));
n = new qx.ui.basic.Label("To:").set({
width: 20
});
m.add(n)
n = this.n2=new qx.ui.form.TextField().set({
maxLength: 10,
height: 20,
width: 60,
allowGrowX:false,
})
n.setValue(l.o.t)
n.addListener("focusin",this.g,this);
n.addListener("focusout",this.h,this);
n.addListener("changeValue",function(){
var r = this.getValue();
if (r) {
if (r!=l.o.t) {
l.o.t = r.toLowerCase();
l.p();
}
}
this.setValue(l.o.t)
},false);
m.add(n);
this.add( new qx.ui.core.Spacer(10,10));
this.a = new qx.ui.container.Composite(new qx.ui.layout.VBox());
this.a.setEnabled(false);
this.add(this.a)
n = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.a.add(n);
var o = new qx.ui.basic.Label("Name ").set({
width: 30
});
n.add(o)
this.j = new qx.ui.form.TextField().set({
maxLength: 20,
height: 20,
width: 120,
allowGrowX:false,
})
n.add(this.j);
this.a.add(new qx.ui.core.Spacer(5,5));
n = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.a.add(n);
o = new qx.ui.basic.Label("Wood").set({
width: 30
});
n.add(o)
this.k = new qx.ui.form.TextField().set({
filter: /\d/,
maxLength: 4,
height: 20,
width: 40,
allowGrowX:false,
})
n.add(this.k)
n.add(new qx.ui.core.Spacer(10,10));
o = new qx.ui.basic.Label("Stone").set({
width: 30
});
n.add(o)
this.l = new qx.ui.form.TextField().set({
filter: /\d/,
maxLength: 4,
height: 20,
width: 40,
allowGrowX:false,
})
n.add(this.l)
n.add(new qx.ui.core.Spacer(10,10));
o = new qx.ui.basic.Label("Iron").set({
width: 30
});
n.add(o)
this.m = new qx.ui.form.TextField().set({
filter: /\d/,
maxLength: 4,
height: 20,
width: 40,
allowGrowX:false,
})
n.add(this.m)
n.add(new qx.ui.core.Spacer(10,10));
o = new qx.ui.basic.Label("Food").set({
width: 30
});
n.add(o)
this.n = new qx.ui.form.TextField().set({
filter: /\d/,
maxLength: 4,
height: 20,
width: 40,
allowGrowX:false,
})
n.add(this.n)
n = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
alignX: "middle"
}));
this.add(new qx.ui.core.Spacer(5,5));
this.add(n);
this.add(new qx.ui.core.Spacer(5,5));
this.z1 = new qx.ui.form.Button("Import");
this.z1.addListener("execute",this.z3,this);
n.add(this.z1);
n.add(new qx.ui.core.Spacer(5,5))
this.z2 = new qx.ui.form.Button("Export");
this.z2.addListener("execute",this.z4,this);
n.add(this.z2);
n.add(new qx.ui.core.Spacer(30,5))
this.d = new qx.ui.form.Button("New");
this.d.addListener("execute",this.s,this);
n.add(this.d);
n.add(new qx.ui.core.Spacer(5,5))
this.b = new qx.ui.form.Button("Save");
this.b.addListener("execute",this.o,this);
this.b.setEnabled(false);
n.add(this.b);
n.add(new qx.ui.core.Spacer(5,5))
this.c = new qx.ui.form.Button("Cancel");
this.c.addListener("execute",this.p,this);
this.c.setEnabled(false);
n.add(this.c);
this.add( new qx.ui.core.Spacer(10,10));
o=new qx.ui.layout.Grid(2,2);
this.r=new qx.ui.container.Composite(o);
this.q();
o=new qx.ui.container.Scroll(this.r);
this.add(o,{
flex:1
});
this.open();
this.center();
},
i: function(){
this.show();
this.setActive(true);
},
n1:null,
n2:null,
z1:null,
z2:null,
z3: function() {
if (!c) c=new dave.lou.TMIE();
try {
c.m();
}
catch(e) {
console.error(e)
}
},
z4: function() {
if (!c) c=new dave.lou.TMIE();
try {
c.l();
}
catch(e) {
console.error(e)
}
},
a:null,
b:null,
c:null,
d:null,
e:null,
g: function() {
p.allowHotKey=false;
},
h: function() {
p.allowHotKey=true;
},
j: null,
k: null,
l: null,
m: null,
n: null,
f: null,
q: function() {
this.r.removeAll();
var a=0;
var m;
for (var i in l.o.l) {
this.w=i*1;
if (i==1) continue;
this.r.add(new qx.ui.basic.Label(l.o.l[i].m).set({
width:100
}),{
row:a,
column:0
})
this.r.add(new qx.ui.basic.Label(l.o.l[i].i.toString()).set({
width:30,
textAlign:"right"
}),{
row:a,
column:1
})
this.r.add(new qx.ui.basic.Label(l.o.l[i].j.toString()).set({
width:30,
textAlign:"right"
}),{
row:a,
column:2
})
this.r.add(new qx.ui.basic.Label(l.o.l[i].k.toString()).set({
width:30,
textAlign:"right"
}),{
row:a,
column:3
})
this.r.add(new qx.ui.basic.Label(l.o.l[i].l.toString()).set({
width:30,
textAlign:"right"
}),{
row:a,
column:4
})
var b=new qx.ui.basic.Image("webfrontend/theme/scrollbar/scrollbar-up.png").set({
cursor:"pointer",
});
this.r.add(b,{
row:a,
column:5
})
b.setUserData("row",i);
b.addListener("click",this.x,this)
if (a==0) b.setEnabled(false);
m=b=new qx.ui.basic.Image("webfrontend/theme/scrollbar/scrollbar-down.png").set({
cursor:"pointer",
});
this.r.add(b,{
row:a,
column:6
})
b.setUserData("row",i);
b.addListener("click",this.y,this)
b=new qx.ui.basic.Image("resource/webfrontend/ui/menues/forum/icon_btn_edit_post.png").set({
cursor:"pointer",
});
this.r.add(b,{
row:a,
column:7
})
b.setUserData("row",i);
b.addListener("click",this.t,this)
this.e=b=new qx.ui.basic.Image("resource/webfrontend/ui/menues/forum/icon_btn_delete_post.png").set({
cursor:"pointer",
});
this.r.add(b,{
row:a,
column:8
})
b.setUserData("row",i);
b.addListener("click",this.u,this)
a++;
}
m.setEnabled(false);
if (a==1) {
this.e.setEnabled(false);
}
},
r: null,
o: function() {
if (!this.j.getValue()) {
alert("Name cannot be empty");
return;
}
if (this.j.getValue().length==0) {
alert("Name cannot be empty");
return;
}
var a={};
a.i=this.k.getValue();
if (!a.i||a.i=="") a.i=0;
else a.i=a.i*1;
a.j=this.l.getValue();
if (!a.j||a.j=="") a.j=0;
else a.j=a.j*1;
a.k=this.m.getValue();
if (!a.k||a.k=="") a.k=0;
else a.k=a.k*1;
a.l=this.n.getValue();
if (!a.l||a.l=="") a.l=0;
else a.l=a.l*1;
a.m=this.j.getValue();
l.o.l[this.f]=a;
if (this.j.getEnabled()) r.n();
this.a.setEnabled(false);
this.j.setEnabled(false);
this.b.setEnabled(false);
this.c.setEnabled(false);
this.d.setEnabled(true);
this.r.setEnabled(true);
this.z1.setEnabled(true);
this.z2.setEnabled(true);
this.q();
l.p();
this.v();
},
p: function() {
this.a.setEnabled(false);
this.j.setEnabled(false);
this.b.setEnabled(false);
this.c.setEnabled(false);
this.d.setEnabled(true);
this.r.setEnabled(true);
this.z1.setEnabled(true);
this.z2.setEnabled(true);
this.v();
},
s: function() {
this.a.setEnabled(true);
this.j.setEnabled(true);
this.j.setValue("");
this.b.setEnabled(true);
this.c.setEnabled(true);
this.d.setEnabled(false);
this.r.setEnabled(false);
this.z1.setEnabled(false);
this.z2.setEnabled(false);
this.k.setValue("0");
this.l.setValue("0");
this.m.setValue("0");
this.n.setValue("0");
this.f=(this.w*1)+1;
this.g();
},
t: function(e) {
var t=e.getTarget();
var i=t.getUserData("row")*1
this.a.setEnabled(true);
this.j.setEnabled(false);
this.b.setEnabled(true);
this.c.setEnabled(true);
this.d.setEnabled(false);
this.r.setEnabled(false);
this.z1.setEnabled(false);
this.z2.setEnabled(false);
var d=l.o.l[i];
this.j.setValue(d.m);
this.k.setValue(d.i.toString());
this.l.setValue(d.j.toString());
this.m.setValue(d.k.toString());
this.n.setValue(d.l.toString());
this.f=i;
},
u: function(e) {
var t=e.getTarget()
var i=t.getUserData("row")*1;
delete l.o.l[i];
this.q();
l.p();
r.n();
},
v: function() {
this.j.setValue("");
this.k.setValue("");
this.l.setValue("");
this.m.setValue("");
this.n.setValue("");
this.h();
},
w: null,
x: function(e) {
var t=e.getTarget();
var i=t.getUserData("row")*1;
var j=1;
for (var k in l.o.l) {
if (k==i) break;
j=k;
}
this.z(i,j);
},
y: function(e) {
var t=e.getTarget();
var i=t.getUserData("row")*1;
var j=1;
for (var k in l.o.l) {
if (k>i) {
j=k;
break;
}
}
this.z(i,j);
},
z: function(i,j) {
var k=l.o.l[i];
l.o.l[i]=l.o.l[j];
l.o.l[j]=k;
r.n();
l.p();
this.q();
},
}
});
qx.Class.define("dave.lou.TMIE", {
extend: qx.ui.window.Window,
construct: function()
{
this.base(arguments,"TM Assist Import/Export");
this.buildGUI();
},
members: {
buildGUI: function() {
this.set({
resizable: false,
showMaximize : false,
showMinimize : false,
showStatusbar : false,
useMoveFrame : true,
contentPadding:5,
});
c=this;
this.setLayout(new qx.ui.layout.VBox());
this.i = new qx.ui.basic.Label("");
this.add(this.i)
this.add( new qx.ui.core.Spacer(10,10));
this.j = new qx.ui.form.TextArea().set({
width: 330,
height:340,
});
this.j.addListener("click",this.o,this);
this.add(this.j)
this.add( new qx.ui.core.Spacer(10,10));
this.k = new qx.ui.form.Button("Load");
this.k.addListener("execute",this.n,this);
this.k.setVisibility("hidden");
this.add(this.k)
this.add( new qx.ui.core.Spacer(10,10));
this.open();
this.center();
},
i:null,
j:null,
k:null,
l: function () {
this.i.setValue("Control-C to copy export string");
this.k.setVisibility("hidden")
this.j.setReadOnly(false);
var i=JSON.stringify(l.o);
this.show();
this.setActive(true);
this.j.setValue(i);
this.j.selectAllText();
this.j.focus();
this.j.setReadOnly(true);
},
m: function () {
this.i.setValue("Control-V to paste import string");
this.j.setReadOnly(false);
this.j.setValue("");
this.k.setVisibility("visible")
this.show();
this.setActive(true);
this.j.focus();
},
n: function () {
this.hide();
this.k.setVisibility("hidden")
var i=this.j.getValue();
if (!i) return;
try {
i=JSON.parse(i);
if (!i.s) return;
if (!i.t) return;
if (!i.l) return;
if (!i.l[1]) return;
for (var j in i.l) {
if (j*1==1) continue;
if (j*1!=j) return;
if (!i.l[j].m) return;
if (i.l[j].i*1!=i.l[j].i) return;
if (i.l[j].j*1!=i.l[j].j) return;
if (i.l[j].k*1!=i.l[j].k) return;
if (i.l[j].l*1!=i.l[j].l) return;
}
l.o=i;
r.j.q();
r.j.n1.setValue(l.o.s);
r.j.n2.setValue(l.o.t);
l.p();
}
catch(e) {
console.error(e)
}
},
o:function(){
this.j.selectAllText();
},
}
		});
		var a,b,i,m,p,r,y,d,s,j,l,v,c,t,x,z=false,tmc;
		try {
			b=webfrontend;
			p=qx.core.Init.getApplication();
			b=b.data;
			t=b.Player.getInstance();
			s=b.City.getInstance();
			a=b.Server.getInstance();
			tmc = new dave.lou.TMC();
			new dave.lou.L();
		} catch (e) {
			console.error(e);
		}
	} // </inject>
	inject();
})();
