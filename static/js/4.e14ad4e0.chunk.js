(this["webpackJsonpflow-frontend"]=this["webpackJsonpflow-frontend"]||[]).push([[4],{118:function(t,e,n){"use strict";n.d(e,"a",(function(){return b}));var c=n(18),a=n(39),i=(n(1),n(137)),o=n.n(i),r=n(175),d=n(174),s=n(2),l=(n(119),n(8)),b=function(t){var e=t.handleSave,n=t.hasPreviewButton,i=t.children,b=Object(a.a)(t,["handleSave","hasPreviewButton","children"]),u=Object(s.g)();return Object(l.jsxs)("div",Object(c.a)(Object(c.a)({className:"CardHeader"},b),{},{children:[Object(l.jsxs)("div",{className:"left-section",children:[i,Object(l.jsx)(d.a,{disableRipple:!0,children:Object(l.jsx)(o.a,{})})]}),Object(l.jsxs)("div",{className:"d-flex",children:[n&&Object(l.jsx)(r.a,{variant:"text",className:"btn-preview",onClick:function(){u.push({pathname:"/preview"})},children:"Go to Preview"}),e&&Object(l.jsx)(r.a,{variant:"contained",onClick:e,children:"Save"})]})]}))}},119:function(t,e,n){},123:function(t,e,n){"use strict";n.d(e,"a",(function(){return f}));var c=n(18),a=n(39),i=n(113),o=n(1),r=n(175),d=n(138),s=n.n(d),l=n(139),b=n.n(l),u=n(140),j=n.n(u),O=(n(124),n(8)),f=function(t){var e=Object(o.useState)(!1),n=Object(i.a)(e,2),d=n[0],l=n[1],u=t.type,f=t.listItems,h=t.nodeId,v=t.selectedId,p=t.onFocusId,m=t.handleSelect,x=Object(a.a)(t,["type","listItems","nodeId","selectedId","onFocusId","handleSelect"]);return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("div",Object(c.a)(Object(c.a)({className:"CardBody ".concat(f.length>3?"has-show-more":""," ").concat(d?"show-all":"")},x),{},{children:("actions"===u||"conditions"===u?f.filter((function(t){var e;return!(null===(e=v[h])||void 0===e?void 0:e.includes(t.id))})):f.filter((function(t){return!v.includes(t.id)}))).map((function(t){return Object(O.jsx)(r.a,{onClick:function(){return m(t.id)},disableRipple:!0,variant:"text",className:"btn-card-item ".concat(p===t.id?"on-focus":""),startIcon:Object(O.jsx)(s.a,{}),children:t.name},t.id)}))})),f.length>3&&Object(O.jsx)("div",{className:"btn-show-more",children:Object(O.jsxs)(r.a,{onClick:function(){return l(!d)},variant:"text",disableRipple:!0,endIcon:d?Object(O.jsx)(b.a,{}):Object(O.jsx)(j.a,{}),children:["Show ",d?"less":"more"]})})]})}},124:function(t,e,n){},125:function(t,e,n){"use strict";var c=n(1),a=n.n(c),i=n(114),o=n(176),r=n(175),d=n(141),s=n.n(d),l=n(174),b=(n(126),n(8));e.a=Object(c.memo)((function(t){var e,n,c=t.id,d=t.data,u=t.isConnectable,j=Object(i.e)((function(t){return t.selectedElements}));return Object(b.jsxs)("div",{className:"ButtonSelectorNode ".concat(j&&j[0].id===c?"is-selected":""),onClick:function(){return d.focusNodeAction()},children:[Object(b.jsx)("div",{children:Object(b.jsx)(o.a,{variant:"body1",children:d.label})}),"event"===d.type&&(d.event?Object(b.jsx)(r.a,{variant:"contained",disabled:!0,className:"lbl-event",children:d.event.name}):d.btnLabel&&Object(b.jsx)(r.a,{onClick:function(t){d.btnAction(),t.stopPropagation()},variant:"contained",children:d.btnLabel})),("condition"===d.type||"choice"===d.type)&&((null===(e=d.conditions)||void 0===e?void 0:e.length)>0?d.conditions.map((function(t,e){return Object(b.jsx)(a.a.Fragment,{children:Object(b.jsxs)("div",{className:"label-div",children:[Object(b.jsx)(r.a,{variant:"contained",disabled:!0,className:"lbl-condition",children:t.name}),Object(b.jsx)(l.a,{disableRipple:!0,onClick:function(){return d.handleDeleteCondition(t.id)},children:Object(b.jsx)(s.a,{})}),e!==d.conditions.length-1&&Object(b.jsx)(o.a,{variant:"h6",children:"AND"})]})},t.id)})):d.btnLabel&&Object(b.jsx)(r.a,{onClick:function(t){d.btnAction(),t.stopPropagation()},variant:"contained",children:d.btnLabel})),d.type.includes("action")&&((null===(n=d.actions)||void 0===n?void 0:n.length)>0?d.actions.map((function(t,e){return Object(b.jsx)(a.a.Fragment,{children:Object(b.jsxs)("div",{className:"label-div",children:[Object(b.jsxs)(r.a,{variant:"contained",disabled:!0,className:"lbl-action",children:[t.name," - ",t.value]}),Object(b.jsx)(l.a,{disableRipple:!0,onClick:function(){return d.handleDeleteAction(t.id)},children:Object(b.jsx)(s.a,{})}),e!==d.actions.length-1&&Object(b.jsx)(o.a,{variant:"h6",children:"AND"})]})},t.id)})):d.btnLabel&&Object(b.jsx)(r.a,{onClick:function(t){d.btnAction(),t.stopPropagation()},variant:"contained",children:d.btnLabel})),"choice"===d.type&&Object(b.jsx)(o.a,{variant:"h6",className:"text-or",children:"OR"}),d.btnLabel2&&Object(b.jsx)(r.a,{onClick:function(t){d.btnAction2(),t.stopPropagation()},variant:"contained",children:d.btnLabel2}),Object(b.jsx)(i.a,{type:"source",position:"bottom",style:{bottom:10,top:"auto",background:"#555"},isConnectable:u})]})}))},126:function(t,e,n){},127:function(t,e,n){"use strict";n.d(e,"c",(function(){return c})),n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return i}));var c=[{id:1,name:"New order placed"},{id:2,name:"New signup"},{id:3,name:"New subscriber"},{id:4,name:"New cancellation"}],a=[{id:1,name:"Amount > 100"},{id:2,name:"Amount < 100"},{id:3,name:"Product is Coffee"},{id:4,name:"Product is Tea"},{id:5,name:"Date > Today"},{id:6,name:"Date < Today"}],i=[{id:1,name:"Send email to Contact",type:"email",label:"Email address"},{id:2,name:"Call Contact",type:"tel",label:"Contact Number"},{id:3,name:"Add Tag to Contact",type:"tel",label:"Contact Number"},{id:4,name:"Remove Contact",type:"tel",label:"Contact Number"}]},151:function(t,e,n){},173:function(t,e,n){"use strict";n.r(e);var c=n(40),a=n(18),i=n(142),o=n(113),r=n(1),d=n(114),s=n(175),l=n(176),b=n(178),u=n(41),j=n(118),O=n(123),f=n(125),h=n(127),v=(n(151),n(8)),p={btnSelectorNode:f.a};e.default=function(){var t=Object(r.useState)("events"),e=Object(o.a)(t,2),n=e[0],f=e[1],m=Object(r.useState)("1"),x=Object(o.a)(m,2),g=x[0],y=x[1],N=Object(r.useState)([]),S=Object(o.a)(N,2),A=S[0],C=S[1],I=Object(r.useState)({}),w=Object(o.a)(I,2),k=w[0],L=w[1],R=Object(r.useState)({}),D=Object(o.a)(R,2),P=D[0],F=D[1],T=Object(r.useState)(null),B=Object(o.a)(T,2),E=B[0],H=B[1],W=[{id:"1",type:"btnSelectorNode",data:{label:"When",type:"event",btnLabel:"Select event trigger",focusNodeAction:function(){f("events"),y("1")},btnAction:function(){f("events"),y("1")}},position:{x:250,y:25}}],J=Object(r.useState)(W),G=Object(o.a)(J,2),K=G[0],M=G[1],q=Object(r.useRef)();q.current=K;var z=Object(r.useRef)();z.current=g;var Q=Object(r.useRef)();Q.current=k;var U=Object(r.useRef)();U.current=P;var V=function t(e,n){return{label:"Next Step",type:"choice",btnLabel:"Add condition",focusNodeAction:function(){f(null),y(e)},btnAction:function(){var c;f("conditions"),y(e);var a=Object.assign([],q.current);(c=a=a.filter((function(t){return t.id!==e&&t.id!=="edges-".concat((Number(e)-1).toString(),"-").concat(e)}))).push.apply(c,[{id:e,type:"btnSelectorNode",data:{label:"If...",type:"condition",btnLabel:"Add condition",focusNodeAction:function(){f("conditions"),y(e)},btnAction:function(){f("conditions"),y(e)},handleDeleteCondition:function(t){return X(e,t)}},position:n},{id:(Number(e)+1).toString(),type:"btnSelectorNode",data:{label:"Then...",type:"action-yes",btnLabel:"Add action",focusNodeAction:function(){f("actions"),y((Number(e)+1).toString())},btnAction:function(){f("actions"),y((Number(e)+1).toString())},handleDeleteAction:function(t){return Y((Number(e)+1).toString(),t)}},position:{x:n.x,y:n.y+400}},{id:(Number(e)+2).toString(),type:"btnSelectorNode",data:t((Number(e)+2).toString(),{x:n.x+300,y:n.y+150}),position:{x:n.x+300,y:n.y+150}}].concat(Object(i.a)("2"===e?[{id:"edges-".concat((Number(e)-1).toString(),"-").concat(e),source:(Number(e)-1).toString(),target:e,type:"smoothstep"}]:[]),[{id:"edges-".concat(e,"-").concat((Number(e)+1).toString()),source:e,target:(Number(e)+1).toString(),type:"smoothstep",label:"yes"},{id:"edges-".concat(e,"-").concat((Number(e)+2).toString()),source:e,target:(Number(e)+2).toString(),type:"smoothstep",label:"no"}])),M(a)},btnLabel2:"Add Action",btnAction2:function(){var t;f("actions"),y(e);var c=Object.assign([],q.current);(t=c=c.filter((function(t){return t.id!==e&&t.id!=="edges-".concat((Number(e)-1).toString(),"-").concat(e)}))).push.apply(t,[{id:e,type:"btnSelectorNode",data:{label:"Then...",type:"action",btnLabel:"Add action",focusNodeAction:function(){f("actions"),y(e)},btnAction:function(){f("actions"),y(e)},handleDeleteAction:function(t){return Y(e,t)}},position:n}].concat(Object(i.a)("2"===e?[{id:"edges-".concat((Number(e)-1).toString(),"-").concat(e),source:(Number(e)-1).toString(),target:e,type:"smoothstep"}]:[]))),M(c)},handleDeleteCondition:function(t){return X(e,t)}}},X=function(t,e){var n,i=Object.assign([],q.current),o=i.findIndex((function(e){return e.id===t}));i[o]=Object(a.a)(Object(a.a)({},i[o]),{},{data:Object(a.a)(Object(a.a)({},i[o].data),{},{conditions:((null===(n=i[o].data)||void 0===n?void 0:n.conditions)||[]).filter((function(t){return t.id!==e}))})}),L(Object(a.a)(Object(a.a)({},Q.current),{},Object(c.a)({},z.current,(Q.current[z.current]||[]).filter((function(t){return t!==e}))))),M(i)},Y=function(t,e){var n,i=Object.assign([],q.current),o=i.findIndex((function(e){return e.id===t}));i[o]=Object(a.a)(Object(a.a)({},i[o]),{},{data:Object(a.a)(Object(a.a)({},i[o].data),{},{actions:((null===(n=i[o].data)||void 0===n?void 0:n.actions)||[]).filter((function(t){return t.id!==e}))})}),F(Object(a.a)(Object(a.a)({},U.current),{},Object(c.a)({},z.current,(U.current[z.current]||[]).filter((function(t){return t!==e}))))),M(i)};return Object(v.jsxs)(u.a,{fullHeight:!0,color:"HomePage grey100",children:[n&&Object(v.jsxs)("div",{className:"drawer",children:["events"===n&&Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(j.a,{children:Object(v.jsx)(l.a,{variant:"h3",children:"Events"})}),Object(v.jsx)(O.a,{type:"events",nodeId:g,listItems:h.c,selectedId:A,handleSelect:function(t){C([t]);var e=Object.assign([],K);e[0]={id:"1",type:"btnSelectorNode",data:{label:"When",type:"event",event:h.c.find((function(e){return e.id===t})),focusNodeAction:function(){f("events"),y("1")},btnAction:function(){f("events"),y("1")}},position:{x:250,y:25}},1===e.length&&e.push({id:"2",type:"btnSelectorNode",data:V("2",{x:250,y:200}),position:{x:250,y:200}},{id:"edges-1-2",source:"1",target:"2",type:"smoothstep"}),f(null),M(e)}})]}),"conditions"===n&&Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(j.a,{children:Object(v.jsx)(l.a,{variant:"h3",children:"Conditions"})}),Object(v.jsx)(O.a,{type:"conditions",nodeId:g,listItems:h.b,selectedId:k,handleSelect:function(t){var e;L((function(e){return Object(a.a)(Object(a.a)({},e),{},Object(c.a)({},g,[].concat(Object(i.a)(k[g]||[]),[t])))}));var n=Object.assign([],K),o=n.findIndex((function(t){return t.id===g}));n[o]=Object(a.a)(Object(a.a)({},n[o]),{},{data:Object(a.a)(Object(a.a)({},n[o].data),{},{conditions:[].concat(Object(i.a)((null===(e=n[o].data)||void 0===e?void 0:e.conditions)||[]),[h.b.find((function(e){return e.id===t}))])})}),M(n)}})]}),"actions"===n&&Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(j.a,{children:Object(v.jsx)(l.a,{variant:"h3",children:"Actions"})}),Object(v.jsx)(O.a,{type:"actions",nodeId:g,listItems:h.a,selectedId:P,onFocusId:null===E||void 0===E?void 0:E.id,handleSelect:function(t){H(h.a.find((function(e){return e.id===t})))}}),E&&Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(j.a,{children:Object(v.jsx)(l.a,{variant:"h3",children:"Action Details"})}),Object(v.jsxs)("div",{className:"card-body",children:[Object(v.jsx)(b.a,{fullWidth:!0,margin:"dense",onChange:function(t){return H((function(e){return Object(a.a)(Object(a.a)({},e),{},{value:t.target.value})}))},type:E.type,value:E.value||"",label:E.label}),Object(v.jsx)(s.a,{variatn:"text",disableRipple:!0,onClick:function(){var t;F((function(t){return Object(a.a)(Object(a.a)({},t),{},Object(c.a)({},g,[].concat(Object(i.a)(P[g]||[]),[E.id])))}));var e=Object.assign([],K),n=e.findIndex((function(t){return t.id===g}));e[n]=Object(a.a)(Object(a.a)({},e[n]),{},{data:Object(a.a)(Object(a.a)({},e[n].data),{},{actions:[].concat(Object(i.a)((null===(t=e[n].data)||void 0===t?void 0:t.actions)||[]),[E])})}),M(e)},children:"Add"})]})]})]})]}),Object(v.jsxs)("div",{className:"home-section",children:[Object(v.jsx)(j.a,{hasPreviewButton:!0,handleSave:function(){var t=K.filter((function(t){return"btnSelectorNode"===t.type})),e=[];t.forEach((function(t){switch(t.data.type){case"event":e.push({event:t.data.event});break;case"condition":e.push({condition:t.data.conditions});break;case"action-yes":case"action":e.push(Object(c.a)({},t.data.type,Object(i.a)(t.data.actions||[])))}})),console.log("output",e)},children:Object(v.jsx)(l.a,{variant:"h3",children:"Map your automation"})}),Object(v.jsx)("div",{className:"flow-body",children:Object(v.jsx)(d.c,{elementsSelectable:!0,elements:K,onElementsRemove:function(t){return M((function(e){return Object(d.d)(t,e)}))},onConnect:function(t){return M((function(e){return Object(d.b)(t,e)}))},nodeTypes:p,deleteKeyCode:46,onSelectionChange:function(t){t||f(null)}})})]})]})}}}]);
//# sourceMappingURL=4.e14ad4e0.chunk.js.map