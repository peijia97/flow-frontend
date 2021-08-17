(this["webpackJsonpflow-frontend"]=this["webpackJsonpflow-frontend"]||[]).push([[4],{175:function(e,t,n){},177:function(e,t,n){},178:function(e,t,n){},181:function(e,t,n){},182:function(e,t,n){},185:function(e,t,n){},200:function(e,t,n){"use strict";n.r(t);var i=n(31),a=n(32),c=n(166),o=n(0),l=n.n(o),r=n(167),d=n(145),s=n(57),u=n(147),b=n(176),j=n.n(b),v=n(146),O=(n(175),n(7)),f=function(e){var t=e.handleSave,n=e.hasPreviewButton,a=e.handlePreview,c=e.children,o=Object(s.a)(e,["handleSave","hasPreviewButton","handlePreview","children"]);return Object(O.jsxs)("div",Object(i.a)(Object(i.a)({className:"CardHeader"},o),{},{children:[Object(O.jsxs)("div",{className:"left-section",children:[c,Object(O.jsx)(v.a,{disableRipple:!0,children:Object(O.jsx)(j.a,{})})]}),Object(O.jsxs)("div",{className:"d-flex",children:[n&&Object(O.jsx)(u.a,{variant:"text",className:"btn-preview",onClick:a,children:"View Preset Flow"}),t&&Object(O.jsx)(u.a,{variant:"contained",onClick:t,children:"Save"})]})]}))},p=n(154),h=n.n(p),y=n(163),m=n.n(y),x=n(164),g=n.n(x),N=[{eventKey:"NewOrder",eventDisplay:"New order placed",fields:[{conditionKey:"ProductTitle",conditionDisplay:"Product Title",type:"string"},{conditionKey:"ProductAmount",conditionDisplay:"Product Amount",type:"int"}]},{eventKey:"NewSignup",eventDisplay:"New signup",fields:[{conditionKey:"Gender",conditionDisplay:"Customer Gender",type:"option",options:["Male","Female"]},{conditionKey:"DOB",conditionDisplay:"Birthday",type:"date"}]}],S=[{actionKey:"SendEmail",actionDisplay:"Send email to contact",fields:[{key:"emailAddress",placeHolder:"Email Address",type:"string"}]},{actionKey:"CallContact",actionDisplay:"Call contact",fields:[{key:"callContact",placeHolder:"Contact Number",type:"string"},{key:"callContactCountry",placeHolder:"Country",type:"selection",option:["Singapore","Malaysia"]}]}],C=[{name:"Equal",value:"=",type:"string"},{name:"Not equal",value:"!=",type:"string"},{name:"Contains",value:"contains",type:"string"},{name:"Not contains",value:"not contains",type:"string"},{name:"Greater than",value:">",type:"int"},{name:"Less than",value:"<",type:"int"},{name:"Greater and equal than",value:">=",type:"int"},{name:"Less and equal than",value:"<=",type:"int"},{name:"Equal",value:"=",type:"date"},{name:"Earlier than",value:"earlier than",type:"date"},{name:"Later than",value:"later than",type:"date"}],k="NewOrder",A=[{"Fn::If":[[{"Fn::And":[{conditionKey:"ProductTitle",value:["coke","pepsi"],operator:"contains"},{conditionKey:"ProductAmount",value:["30"],operator:">="}]}],[{"Fn::If":[[{conditionKey:"ProductTitle",value:["coke"],operator:"="}],[{actionKey:"CallContact",actionInputs:[{key:"callContact",value:"999"},{key:"callContactCountry",value:"Singapore"}]}],[{actionKey:"SendEmail",actionInputs:[{key:"emailAddress",value:"simon@gmail.com"}]}]]}],[{actionKey:"CallContact",actionInputs:[{key:"callContact",value:"0123456789"},{key:"callContactCountry",value:"Malaysia"}]},{actionKey:"SendEmail",actionInputs:[{key:"emailAddress",value:"hello@gmail.com"}]}]]}],K=(n(177),function(e){var t=e.handleSelect,n=e.selectedEventKey,c=Object(s.a)(e,["handleSelect","selectedEventKey"]),l=Object(o.useState)(!1),r=Object(a.a)(l,2),b=r[0],j=r[1];return Object(O.jsxs)("div",Object(i.a)(Object(i.a)({className:"Events"},c),{},{children:[Object(O.jsx)(f,{children:Object(O.jsx)(d.a,{variant:"h3",children:"Events"})}),Object(O.jsx)("div",Object(i.a)(Object(i.a)({className:"content-body ".concat(N.length>3?"has-show-more":""," ").concat(b?"show-all":"")},c),{},{children:N.map((function(e){return Object(O.jsx)(u.a,{onClick:function(){return t(e)},disableRipple:!0,variant:"text",className:"btn-card-item ".concat(n===e.eventKey?"on-focus":""),startIcon:Object(O.jsx)(h.a,{}),children:e.eventDisplay},e.eventKey)}))})),N.length>3&&Object(O.jsx)("div",{className:"btn-show-more",children:Object(O.jsxs)(u.a,{onClick:function(){return j(!b)},variant:"text",disableRipple:!0,endIcon:b?Object(O.jsx)(m.a,{}):Object(O.jsx)(g.a,{}),children:["Show ",b?"less":"more"]})})]}))}),w=n(62),I=n(197),F=n(202),P=n(203),E=n(194),D=n(198),R=n(199),L=n(180),H=n.n(L),T=(n(178),function(e){var t=e.selectedEventKey,n=e.selectedConditionObj,r=e.handleSelect,b=Object(s.a)(e,["selectedEventKey","selectedConditionObj","handleSelect"]);Object(o.useEffect)((function(){var e,t;A((null===(e=Object.keys(n)[0])||void 0===e?void 0:e.includes("Fn::"))?Object.values(n)[0]:[{conditionKey:n.conditionKey||"",value:n.value||[],operator:n.operator||""}]),x((null===(t=Object.keys(n)[0])||void 0===t?void 0:t.includes("Fn::"))?Object.keys(n)[0]:"")}),[n]);var j={conditionKey:"",value:[],operator:""},v=N.find((function(e){return e.eventKey===t})).fields,p=Object(o.useState)(""),y=Object(a.a)(p,2),m=y[0],x=y[1],g=Object(o.useState)([{conditionKey:"",value:[],operator:""}]),S=Object(a.a)(g,2),k=S[0],A=S[1],K=function(e,t,n){var i=Object.assign([],k);"value"===n?i[t].value=e.split(","):i[t][n]=e,A(i)};return Object(O.jsxs)("div",Object(i.a)(Object(i.a)({className:"Conditions"},b),{},{children:[Object(O.jsx)(f,{children:Object(O.jsx)(d.a,{variant:"h3",children:"Conditions"})}),Object(O.jsxs)("div",Object(i.a)(Object(i.a)({className:"content-body"},b),{},{children:[k.length>1&&Object(O.jsxs)(E.a,{className:"mb-1-5",children:[Object(O.jsx)(F.a,{id:"label-must-meet",children:"All conditions must meet"}),Object(O.jsxs)(R.a,{labelId:"label-must-meet",id:"must-meet",value:m,onChange:function(e){return x(e.target.value)},children:[Object(O.jsx)(P.a,{value:"Fn::And",children:"AND"}),Object(O.jsx)(P.a,{value:"Fn::Or",children:"OR"})]})]}),k.map((function(e,t){var n,i;return Object(O.jsxs)(l.a.Fragment,{children:[0!==t&&Object(O.jsx)(u.a,{className:"btn-clear",variant:"text",startIcon:Object(O.jsx)(H.a,{}),disableRipple:!0,onClick:function(){return function(e){2===k.length&&x("");var t=Object.assign([],k);t.splice(e,1),A(t)}(t)},children:"Remove"}),Object(O.jsxs)(E.a,{children:[Object(O.jsxs)(F.a,{id:"label-condition-".concat(t),children:["Condition ",t+1]}),Object(O.jsx)(R.a,{labelId:"label-condition-".concat(t),id:"condition-".concat(t),value:e.conditionKey||"",onChange:function(e){return K(e.target.value,t,"conditionKey")},children:v.map((function(e){return Object(O.jsx)(P.a,{value:e.conditionKey,children:e.conditionDisplay},e.conditionKey)}))})]}),Object(O.jsxs)(E.a,{children:[Object(O.jsxs)(F.a,{id:"label-operator-".concat(t),children:["Operator ",t+1]}),Object(O.jsx)(R.a,{labelId:"label-operator-".concat(t),id:"operator-".concat(t),value:e.operator||"",onChange:function(e){return K(e.target.value,t,"operator")},children:"option"===(null===(n=v.find((function(t){return t.conditionKey===e.conditionKey})))||void 0===n?void 0:n.type)?v.find((function(t){return t.conditionKey===e.conditionKey})).options.map((function(e){return Object(O.jsx)(P.a,{value:e,children:e},e)})):null===(i=C.filter((function(t){var n;return t.type===(null===(n=v.find((function(t){return t.conditionKey===e.conditionKey})))||void 0===n?void 0:n.type)})))||void 0===i?void 0:i.map((function(e){return Object(O.jsx)(P.a,{value:e.value,children:e.name},e.value)}))})]}),Object(O.jsxs)(E.a,{children:[Object(O.jsx)(I.a,{fullWidth:!0,margin:"dense",onChange:function(e){return K(e.target.value,t,"value")},type:"text",value:e.value.join(",")||"",label:"Value ".concat(t+1)}),Object(O.jsx)(D.a,{children:"Please separate multiple values by comma"})]}),k.length-1!==t&&Object(O.jsx)(d.a,{variant:"h6",className:"must-meet-separator",children:"Fn::And"===m?"AND":"OR"})]},t)})),Object(O.jsx)(u.a,{variant:"text",startIcon:Object(O.jsx)(h.a,{}),disableRipple:!0,className:"btn-add",onClick:function(){m||x("Fn::And"),A([].concat(Object(c.a)(k),[j]))},children:"Add Condition"}),Object(O.jsx)(u.a,{variant:"contained",disableRipple:!0,onClick:function(){var e=m?Object(w.a)({},m,k):k[0];r(e)},children:"Save Condition"})]}))]}))}),B=(n(181),function(e){var t=e.handleSelect,n=(e.handleAddAction,e.actionsArr,e.selectedActionObj),c=Object(s.a)(e,["handleSelect","handleAddAction","actionsArr","selectedActionObj"]);Object(o.useEffect)((function(){Object.keys(n).length?v(l(n)):v({})}),[n]);var l=function(e){var t,n=Object.assign({},S.find((function(t){return t.actionKey===e.actionKey})));return null===(t=n.fields)||void 0===t||t.forEach((function(t){var n;t.value=null===(n=e.actionInputs.find((function(e){return e.key===t.key})))||void 0===n?void 0:n.value})),n},r=Object(o.useState)({}),b=Object(a.a)(r,2),j=b[0],v=b[1],p=Object(o.useState)(!1),y=Object(a.a)(p,2),x=y[0],N=y[1],C=function(e,t){var n=Object.assign({},j),i=j.fields.findIndex((function(e){return e.key===t.key}));n.fields[i].value=e.target.value,v(n)};return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)("div",Object(i.a)(Object(i.a)({className:"Actions"},c),{},{children:[Object(O.jsx)(f,{children:Object(O.jsx)(d.a,{variant:"h3",children:"Actions"})}),Object(O.jsx)("div",Object(i.a)(Object(i.a)({className:"content-body ".concat(S.length>3?"has-show-more":""," ").concat(x?"show-all":"")},c),{},{children:S.map((function(e){return Object(O.jsx)(u.a,{onClick:function(){v(e)},disableRipple:!0,variant:"text",className:"btn-card-item ".concat((null===j||void 0===j?void 0:j.actionKey)===e.actionKey?"on-focus":""),startIcon:Object(O.jsx)(h.a,{}),children:e.actionDisplay},e.actionKey)}))})),S.length>3&&Object(O.jsx)("div",{className:"btn-show-more",children:Object(O.jsxs)(u.a,{onClick:function(){return N(!x)},variant:"text",disableRipple:!0,endIcon:x?Object(O.jsx)(m.a,{}):Object(O.jsx)(g.a,{}),children:["Show ",x?"less":"more"]})})]})),Object.keys(j).length>0&&Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(f,{children:Object(O.jsx)(d.a,{variant:"h3",children:"Action Details"})}),Object(O.jsxs)("div",{className:"card-body",children:[j.fields.map((function(e){return"selection"===e.type?Object(O.jsxs)(E.a,{children:[Object(O.jsx)(F.a,{id:"label-".concat(e.key),children:e.placeHolder}),Object(O.jsx)(R.a,{labelId:"label-".concat(e.key),id:e.key,value:e.value||"",onChange:function(t){return C(t,e)},children:e.option.map((function(e){return Object(O.jsx)(P.a,{value:e,children:e},e)}))})]},e.key):Object(O.jsx)(I.a,{fullWidth:!0,margin:"dense",onChange:function(t){return C(t,e)},type:"text",value:e.value||"",label:e.placeHolder,placeholder:e.placeHolder},e.key)})),Object(O.jsx)(u.a,{variant:"text",disableRipple:!0,onClick:function(){var e={actionKey:j.actionKey,actionInputs:j.fields.map((function(e){return{key:e.key,value:e.value}}))};t(e,Object.keys(n).length?"update":"add")},children:Object.keys(n).length?"Update":"Add"})]})]})]})}),q=n(65),W=n(184),G=n.n(W),M=n(183),J=n.n(M),V=(n(182),Object(o.memo)((function(e){var t,n,i=e.id,a=e.data,c=e.isConnectable,o=Object(r.e)((function(e){return e.selectedElements}));return Object(O.jsxs)("div",{className:"ButtonSelectorNode ".concat(o&&o[0].id===i?"is-selected":""),onClick:function(){return a.focusNodeAction(i)},children:[Object(O.jsx)("div",{children:Object(O.jsx)(d.a,{variant:"body1",children:a.label})}),"event"===a.type&&(a.item?Object(O.jsx)(u.a,{variant:"contained",disabled:!0,className:"lbl-event",children:null===(t=a.item)||void 0===t?void 0:t.eventDisplay}):a.btnLabel&&Object(O.jsx)(u.a,{onClick:function(e){a.btnAction(i),e.stopPropagation()},variant:"contained",children:a.btnLabel})),("condition"===a.type||"choice"===a.type)&&Object(O.jsxs)(O.Fragment,{children:["condition"===a.type&&Object(O.jsx)(v.a,{disableRipple:!0,className:"btn-swap",onClick:function(e){a.handleSwapConditionArrows(i),e.stopPropagation()},children:Object(O.jsx)(J.a,{})}),a.item?Object(O.jsx)(u.a,{variant:"contained",disabled:!0,className:"lbl-condition",children:Object.keys(a.item)[0].includes("Fn::")?Object.values(a.item)[0].map((function(e){return"".concat(e.conditionKey," ").concat(e.operator," ").concat(e.value.join(", "))})).join(" ".concat(Object.keys(a.item)[0].replace("Fn::","")," ")):"".concat(a.item.conditionKey," ").concat(a.item.operator," ").concat(a.item.value.join(", "))}):a.btnLabel&&Object(O.jsx)(u.a,{onClick:function(e){a.btnAction(i),e.stopPropagation()},variant:"contained",children:a.btnLabel})]}),"action"===a.type&&((null===(n=a.item)||void 0===n?void 0:n.length)?Object(O.jsxs)(O.Fragment,{children:[a.item.map((function(e,t){return Object(O.jsx)(l.a.Fragment,{children:Object(O.jsxs)("div",{className:"label-div",children:[Object(O.jsx)(u.a,{variant:"contained",onClick:function(e){a.handleSelectAction(i,t),e.stopPropagation()},className:"lbl-action",children:"Action: ".concat(e.actionKey,"\n                    ").concat(e.actionInputs.map((function(e){return"".concat(e.key," - ").concat(e.value)})).join(", "))}),Object(O.jsx)(v.a,{disableRipple:!0,onClick:function(e){a.handleDeleteAction(i,t),e.stopPropagation()},children:Object(O.jsx)(G.a,{})}),t!==a.item.length-1&&Object(O.jsx)(d.a,{variant:"h6",children:"AND"})]})},t)})),Object(O.jsx)(u.a,{onClick:function(e){a.btnAction(i),e.stopPropagation()},variant:"contained",children:"Add Action"})]}):a.btnLabel&&Object(O.jsx)(u.a,{onClick:function(e){a.btnAction(i),e.stopPropagation()},variant:"contained",children:a.btnLabel})),"choice"===a.type&&Object(O.jsx)(d.a,{variant:"h6",className:"text-or",children:"OR"}),a.btnLabel2&&Object(O.jsx)(u.a,{onClick:function(e){a.btnAction2(i),e.stopPropagation()},variant:"contained",children:a.btnLabel2}),Object(O.jsx)(r.a,{type:"source",position:"bottom",style:{bottom:10,top:"auto",background:"#555"},isConnectable:c})]})}))),U=n(68),z=(n(185),{btnSelectorNode:V});t.default=function(){var e,t,n,l,s,u,b,j,v,p;Object(o.useEffect)((function(){window.innerWidth<768&&Object(U.a)({title:"Warning",subtitle:"Device must be larger than 768px x 1024px to support flow",btnLabel:"OK"})}),[]);var h=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{x:250,y:25};return{id:t.toString(),position:n,type:"btnSelectorNode",data:{item:e,type:"event",label:"When",btnLabel:"Select Event Trigger",focusNodeAction:function(e){P("events"),L(e)},btnAction:function(e){P("events"),L(e)}}}},y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{x:250,y:25};return{id:t.toString(),position:n,type:"btnSelectorNode",data:{item:e,type:"condition",label:"If...",btnLabel:"Add condition",focusNodeAction:function(e){P("conditions"),L(e)},handleSwapConditionArrows:function(e){return ee(e)},btnAction:function(e){P("conditions"),L(e)}}}},m=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{x:250,y:25};return{id:t.toString(),position:n,type:"btnSelectorNode",data:{item:e,type:"action",label:"Then...",btnLabel:"Add action",focusNodeAction:function(e){P(null),M(null),L(e)},btnAction:function(e){P("actions"),M(null),L(e)},handleSelectAction:function(e,t){P("actions"),L(e),$(t)},handleDeleteAction:function(e,t){L(e),_(t)}}}},x=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{x:250,y:25};return{id:t.toString(),position:n,type:"btnSelectorNode",data:{type:"choice",label:"Next Step",btnLabel:"Add condition",btnLabel2:"Add action",focusNodeAction:function(e){P(null),L(e)},btnAction:function(i){var a;P("conditions"),L(i);var o=Object.assign([],Y.current);(a=o=o.filter((function(e){return e.id!==t&&e.id!=="edges-".concat((Number(t)-1).toString(),"-").concat(t)}))).push.apply(a,[y(null,t,n),m(null,Number(t)+1,{x:n.x,y:n.y+400}),e((Number(t)+2).toString(),{x:n.x+300,y:n.y+150})].concat(Object(c.a)("2"===t?[g({source:(Number(t)-1).toString(),target:t})]:[]),[g({source:t,target:(Number(t)+1).toString(),label:"yes"}),g({source:t,target:(Number(t)+2).toString(),label:"no"})])),X(o)},btnAction2:function(e){var i;P("actions"),L(e);var a=Object.assign([],Y.current);(i=a=a.filter((function(e){return e.id!==t&&e.id!=="edges-".concat((Number(t)-1).toString(),"-").concat(t)}))).push.apply(i,[m(null,t,n)].concat(Object(c.a)("2"===t?[g({source:(Number(t)-1).toString(),target:t})]:[]))),X(a)}}}},g=function(e){var t=e.source,n=e.target,i=e.label;return{id:"edges-".concat(t,"-").concat(n),source:t.toString(),target:n.toString(),type:"smoothstep",label:i}},S=Object(o.useState)({}),C=Object(a.a)(S,2),w=(C[0],C[1],Object(o.useState)("events")),I=Object(a.a)(w,2),F=I[0],P=I[1],E=Object(o.useState)("1"),D=Object(a.a)(E,2),R=D[0],L=D[1],H=Object(o.useState)(null),W=Object(a.a)(H,2),G=W[0],M=W[1],J=Object(o.useState)([h()]),V=Object(a.a)(J,2),Q=V[0],X=V[1],Y=Object(o.useRef)();Y.current=Q;var Z=Object(o.useRef)();Z.current=R;var $=function(e){M(e)},_=function(e){var t,n,a,c=Object.assign([],Y.current),o=c.findIndex((function(e){return e.id===Z.current}));c[o]=Object(i.a)(Object(i.a)({},c[o]),{},{data:Object(i.a)(Object(i.a)({},null===(t=c[o])||void 0===t?void 0:t.data),{},{item:((null===(n=c[o])||void 0===n||null===(a=n.data)||void 0===a?void 0:a.item)||[]).filter((function(t,n){return n!==e}))})}),X(c),P(null)},ee=function(e){var t=Object.assign([],Y.current),n=t.findIndex((function(t){return t.source===e&&"yes"===t.label})),i=t.findIndex((function(t){return t.source===e&&"no"===t.label}));t[n].label="yes"===t[n].label?"no":"yes",t[i].label="yes"===t[i].label?"no":"yes",X(t)},te=function e(t,n){var i,a,c,o,l,r={"Fn::If":[(null===(i=t.find((function(e){return e.id===n})).data)||void 0===i?void 0:i.item)?[null===(a=t.find((function(e){return e.id===n})).data)||void 0===a?void 0:a.item]:[]]},d=(t=t.filter((function(e){return e.target!==n&&e.id!==n}))).find((function(e){return e.source===n&&"yes"===e.label})).target;"condition"===(null===(c=t.find((function(e){return e.id===d})).data)||void 0===c?void 0:c.type)?r["Fn::If"].push([e(t,n)]):r["Fn::If"].push((null===(l=t.find((function(e){return e.id===d})).data)||void 0===l?void 0:l.item)||[]);var s,u=(t=t.filter((function(e){return e.target!==d&&e.id!==d}))).find((function(e){return e.source===n&&"no"===e.label})).target;"condition"===(null===(o=t.find((function(e){return e.id===u})).data)||void 0===o?void 0:o.type)?r["Fn::If"].push([e(t,u)]):r["Fn::If"].push((null===(s=t.find((function(e){return e.id===u})).data)||void 0===s?void 0:s.item)||[]);return t=t.filter((function(e){return e.target!==u&&e.id!==u})),r},ne=function e(t,n,i){return[y(Object.values(t[0])[0],n,i),m(t[2],n+1,{x:i.x,y:i.y+400})].concat(Object(c.a)(Object.keys(t[1][0])[0].includes("Fn::")?e(Object.values(t[1][0])[0],n+2,{x:i.x+300,y:i.y+150}):[m(t[1],n+2,{x:i.x+300,y:i.y+150})]),[g({source:n,target:Number(n)+1,label:"yes"}),g({source:n,target:Number(n)+2,label:"no"})])};return Object(O.jsxs)(q.a,{fullHeight:!0,color:"HomePage grey100",children:[F&&Object(O.jsxs)("div",{className:"drawer",children:["events"===F&&Object(O.jsx)(K,{selectedEventKey:null===(e=Q[0].data)||void 0===e||null===(t=e.item)||void 0===t?void 0:t.eventKey,handleSelect:function(e){var t=Object.assign([],Y.current);t[0]=h(e),1===t.length&&t.push(x("2",{x:250,y:200}),g({source:"1",target:"2"})),P(null),X(t)}}),"conditions"===F&&Object(O.jsx)(T,{selectedEventKey:null===(n=Q[0].data)||void 0===n||null===(l=n.item)||void 0===l?void 0:l.eventKey,selectedConditionObj:(null===(s=Y.current.find((function(e){return e.id===Z.current})))||void 0===s||null===(u=s.data)||void 0===u?void 0:u.item)||{},handleSelect:function(e){var t,n=Object.assign([],Y.current),a=n.findIndex((function(e){return e.id===Z.current}));n[a]=Object(i.a)(Object(i.a)({},n[a]),{},{data:Object(i.a)(Object(i.a)({},null===(t=n[a])||void 0===t?void 0:t.data),{},{item:e})}),X(n)}}),"actions"===F&&Object(O.jsx)(B,{actionsArr:(null===(b=Y.current.find((function(e){return e.id===Z.current})))||void 0===b||null===(j=b.data)||void 0===j?void 0:j.item)||[],selectedActionObj:((null===(v=Y.current.find((function(e){return e.id===Z.current})))||void 0===v||null===(p=v.data)||void 0===p?void 0:p.item)||[])[G]||{},handleSelect:function(e,t){var n,a,o,l,r,d,s,u=Object.assign([],Y.current),b=u.findIndex((function(e){return e.id===Z.current}));u[b]=Object(i.a)(Object(i.a)({},u[b]),{},{data:Object(i.a)(Object(i.a)({},null===(n=u[b])||void 0===n?void 0:n.data),{},{item:"update"===t?[].concat(Object(c.a)(null===(a=u[b])||void 0===a||null===(o=a.data)||void 0===o?void 0:o.item.slice(0,G)),[e],Object(c.a)(null===(l=u[b])||void 0===l||null===(r=l.data)||void 0===r?void 0:r.item.slice(G+1))):[].concat(Object(c.a)((null===(d=u[b])||void 0===d||null===(s=d.data)||void 0===s?void 0:s.item)||[]),[e])})}),X(u)}})]}),Object(O.jsxs)("div",{className:"home-section",children:[Object(O.jsx)(f,{hasPreviewButton:!0,handlePreview:function(){var e=1,t={x:250,y:200},n=[],i=Object.assign([],A[0]["Fn::If"]);n.push(h(N.find((function(e){return e.eventKey===k}))));for(var a=0;a<3;)e+=1,Object.keys(i[a]).includes("Fn::")||Object.keys(i[a].includes("conditionKey"))?(n=[].concat(Object(c.a)(n),Object(c.a)(ne(i,e,t)),[g({source:"1",target:"2"})]),a+=2):i[a+1]&&n.push(m(i[a+1],e,{x:250,y:25}),g({source:(Number(e)-1).toString(),target:e})),a++;X(n)},handleSave:function(){for(var e=Object.assign([],Q),t={eventKey:"",conditions:[]},n=0,i=function(){var i,a,c,o=e[n].id;if("event"===(null===(i=e[n].data)||void 0===i?void 0:i.type)){var l,r;t.eventKey=null===(l=e[n].data)||void 0===l||null===(r=l.item)||void 0===r?void 0:r.eventKey,e.splice(n,1)}else{if("condition"===(null===(a=e[n].data)||void 0===a?void 0:a.type))return t.conditions.push(te(e,o)),"break";var d;1===e.filter((function(e){return"btnSelectorNode"===e.type})).length&&"action"===(null===(c=e[n].data)||void 0===c?void 0:c.type)?(t.conditions.push({"Fn::If":[[{noCondition:!0}],(null===(d=e[n].data)||void 0===d?void 0:d.item)||[],[]]}),e=e.filter((function(e){return e.id!==o&&e.target!==o}))):n++}};e.length>0;){if("break"===i())break}console.log("output",t)},children:Object(O.jsx)(d.a,{variant:"h3",children:"Map your automation"})}),Object(O.jsx)("div",{className:"flow-body",children:Object(O.jsx)(r.c,{elementsSelectable:!0,elements:Q,onElementsRemove:function(e){return X((function(t){return Object(r.d)(e,t)}))},onConnect:function(e){return X((function(t){return Object(r.b)(e,t)}))},nodeTypes:z,onSelectionChange:function(e){e||P(null)}})})]})]})}}}]);
//# sourceMappingURL=4.a77dcce0.chunk.js.map