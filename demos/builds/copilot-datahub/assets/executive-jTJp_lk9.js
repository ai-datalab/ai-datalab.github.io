import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{n as t,t as n}from"./createLucideIcon-BXuy7Wl9.js";import{$ as r,D as i,E as a,M as o,N as s,X as c,bt as l,f as u,ft as d,gt as f,l as p,m,pt as h,t as g,vt as _,xt as v,y}from"./utils-B_rklixx.js";import{i as b,r as x,t as S}from"./report-panels-QIAb9kRG.js";import{n as C}from"./theme.context-2xt8E0_s.js";import{t as w}from"./dist-DeUkDKuV.js";import{E as T,N as E,T as D,U as ee,W as O,w as k}from"./task-times.context-B2a9_38j.js";import{n as te}from"./source-availability.context-CY6cPDav.js";import{i as ne}from"./stage-filter.context-BO0XkIwy.js";import{S as re,c as ie,f as ae,s as oe}from"./root-CXseR8NA.js";import{a as se,n as A,o as ce,t as j}from"./kpi-card-CuYBNEgF.js";import{t as le}from"./filter-note-ErbSSUvP.js";import{t as M}from"./format-kpi-BhveZiQQ.js";import{t as N}from"./section-CWSChTRv.js";import{n as ue,t as de}from"./department-coverage-A8VcNb1U.js";import{r as fe}from"./headline-CtXokBCs.js";import{t as pe}from"./page-panel-gate-BxRxc_ep.js";import{r as P,t as F}from"./use-table-query-CMfYlf1e.js";import{t as me}from"./not-filtered-hint-xKnRw3EM.js";import{a as he,n as ge,t as _e}from"./heat-B0KU3dJ_.js";import{n as ve,t as ye}from"./open-destination-link-BvBgc7l0.js";import{A as be,U as xe,et as Se,r as Ce,t as we}from"./use-consumption-query-DdPNEoMh.js";import{a as Te,o as Ee}from"./agents-DfOfzrAX.js";import{c as I,o as De}from"./headlines-CGgDLbFN.js";import{a as Oe,r as ke}from"./feedback-BeNXzJNS.js";import{i as Ae,t as je}from"./licensing-C7Va6u2B.js";var Me={name:`circle-alert`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`,key:`1pkeuh`}],[`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`,key:`4dfq90`}]],aliases:[`alert-circle`]};Me.node;var Ne=n(Me),L=e(t(),1),Pe=`EVALUATE\r
// The last day Consumption Central has Copilot Studio or Cowork credits for.\r
// 'Reporting Date' runs on past the data, so its own last date says nothing\r
// about how fresh the credits are.\r
ROW(\r
    "Last Date",\r
        MAXX(\r
            FILTER(\r
                ALL('Reporting Date'[Date]),\r
                NOT ISBLANK([Reporting Studio Credits]) || NOT ISBLANK([Reporting Cowork Credits])\r
            ),\r
            'Reporting Date'[Date]\r
        )\r
)\r
`,Fe={"[Last Date]":{name:`Last Date`,displayName:`Credits through`}};function Ie(){return{connection:`cc`,filters:ee,query:Pe,columnMetadata:Fe}}var Le=`EVALUATE\r
// Copilot Studio and Cowork credits by month, for the whole tenant. The\r
// caller sets 'Reporting Date' to the same six months as the hours trend.\r
VAR _months =\r
    DISTINCT(\r
        SELECTCOLUMNS(\r
            VALUES('Reporting Date'[Date]),\r
            "Month Start", DATE(YEAR('Reporting Date'[Date]), MONTH('Reporting Date'[Date]), 1)\r
        )\r
    )\r
RETURN\r
    GENERATE(\r
        _months,\r
        VAR _start = [Month Start]\r
        RETURN\r
            CALCULATETABLE(\r
                ROW(\r
                    "Studio Credits", [Reporting Studio Credits],\r
                    "Cowork Credits", [Reporting Cowork Credits]\r
                ),\r
                KEEPFILTERS(\r
                    FILTER(\r
                        ALL('Reporting Date'[Date]),\r
                        'Reporting Date'[Date] >= _start && 'Reporting Date'[Date] <= EOMONTH(_start, 0)\r
                    )\r
                )\r
            )\r
    )\r
ORDER BY [Month Start]\r
`,Re={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{calculate:`timeFormat(toDate(datum['Month Start']), '%b %Y')`,as:`Month`},{calculate:`1`,as:`Emphasis`},{fold:[`Studio Credits`,`Cowork Credits`],as:[`Series`,`Value`]},{filter:`isValid(datum.Value) && datum.Value > 0`},{calculate:`datum.Series === 'Studio Credits' ? 'Copilot Studio agents' : 'Cowork'`,as:`Source`},{calculate:`indexof(['Studio Credits', 'Cowork Credits'], datum.Series)`,as:`Rank`}],encoding:{x:{field:`Month`,type:`ordinal`,title:null,sort:null,scale:{paddingInner:.45,paddingOuter:.25},axis:{labelAngle:0,ticks:!1}}},layer:[{mark:{type:`bar`},encoding:{y:{aggregate:`sum`,field:`Value`,type:`quantitative`,title:null,stack:`zero`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`,minExtent:48,tickCount:4}},color:{field:`Source`,type:`nominal`,title:null,sort:null,scale:{domain:[`Copilot Studio agents`,`Cowork`],range:[`#c46a12`,`#8783ff`]},legend:{orient:`top`,direction:`horizontal`,symbolType:`square`,symbolLimit:10,labelLimit:240}},order:{field:`Rank`,type:`quantitative`,sort:`ascending`},opacity:{field:`Emphasis`,type:`quantitative`,scale:null,legend:null},tooltip:[{field:`Month`,type:`ordinal`,title:`Month`},{field:`Source`,type:`nominal`,title:`Source`},{field:`Value`,type:`quantitative`,aggregate:`sum`,title:`Credits`,format:`,.0f`}]}},{transform:[{aggregate:[{op:`sum`,field:`Value`,as:`Total`},{op:`max`,field:`Emphasis`,as:`Emphasis`}],groupby:[`Month`]},{calculate:`abs(datum.Total) < 1000 ? format(datum.Total, ',.0f') : compactFormat(datum.Total, '#,0')`,as:`Total Label`}],mark:{type:`text`,baseline:`bottom`,dy:-4,fontWeight:600},encoding:{y:{field:`Total`,type:`quantitative`,title:null},text:{field:`Total Label`,type:`nominal`},opacity:{field:`Emphasis`,type:`quantitative`,scale:null,legend:null}}}]},ze=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];function R(e){return`${e.slice(0,7)}-01`}function Be(e,t){let[n,r]=e.split(`-`).map(Number);return new Date(Date.UTC(n,r-1+t,1)).toISOString().slice(0,10)}function z(e){let[t,n]=e.split(`-`).map(Number);return new Date(Date.UTC(t,n,0)).getUTCDate()}function Ve(e){return`${e.slice(0,8)}${String(z(e)).padStart(2,`0`)}`}function B(e){return ze[Number(e.slice(5,7))-1]}function He(e,t,n=6){let r=R(t),i=Array.from({length:n},(e,t)=>Be(r,t-(n-1)));return{from:i[0],to:t,months:i,rangeMonth:R(e)}}function Ue(e,t){if(t<e)return;let n=R(t),r=Ve(n)===t?n:Be(n,-1),i=Be(r,-1);return i>=e?{current:r,previous:i}:void 0}var We=new Intl.NumberFormat(`en-GB`,{style:`percent`,maximumFractionDigits:0}),Ge=new Intl.NumberFormat(`en-GB`,{maximumFractionDigits:1,minimumFractionDigits:1});function Ke(e){return typeof e==`number`&&Number.isFinite(e)}function qe(e,t,n,r){if(!Ke(n)||!Ke(r))return;let i=`${B(t.current)} vs ${B(t.previous)}`,a,o,s=i;if(e===`volume`){if(r<=0)return;a=n/z(t.current)/(r/z(t.previous))-1,o=We.format(Math.abs(a)),s=`${i}, per day`}else e===`rate`?(a=(n-r)*100,o=`${Ge.format(Math.abs(a))} pp`):(a=n-r,o=Ge.format(Math.abs(a)));let c=/^0(\.0)?(%| pp)?$/.test(o);return{direction:c?`flat`:a>0?`up`:`down`,amount:c?`No change`:o,comparison:s}}var Je=.35;function Ye(e){return`${B(e)} ${e.slice(0,4)}`}function Xe(e){return/^\d{4}-\d{2}-\d{2}$/.test(e)?e:void 0}function Ze(e,t={}){let n=structuredClone(e);t.months?.length&&(n.encoding.x.scale.domain=[...t.months]);let r=t.rangeMonth?Xe(t.rangeMonth):void 0,i=n.transform.find(e=>e.as===`Emphasis`);i&&r&&(i.calculate=`datum['Month Start'] < '${r}' ? ${Je} : 1`);let a=n.layer[0].encoding.color;return t.colors?.length===a.scale.domain.length&&(a.scale.range=[...t.colors]),n}var Qe={"[Month Start]":{name:`Month Start`,displayName:`Month`,format:`mmm yyyy`},"[Studio Credits]":{name:`Studio Credits`,displayName:`Copilot Studio agents`,format:`#,0`},"[Cowork Credits]":{name:`Cowork Credits`,displayName:`Cowork`,format:`#,0`}};function $e(e){return{connection:`cc`,filters:O,query:Le,columnMetadata:Qe,vegaLiteSpec:Ze(Re,e)}}var et=[`trend`,`range`];function tt(e,t){let n=_(Le),r=t=>`    ADDCOLUMNS(
        CALCULATETABLE(
${n}
,
            ${xe(e[t].from,e[t].to)}
        ),
        "Part", "${t}"
    )`;return{...$e(t),query:`EVALUATE\nUNION(\n${et.map(r).join(`,
`)}\n)\nORDER BY [Part], [Month Start]\n`}}var nt=`DEFINE\r
    // Months the date filter spans, from the tenant's first to last day of activity inside it.\r
    MEASURE 'Chat + Agent Interactions (Audit Logs)'[ValueLens Months In Range] =\r
        VAR _first =\r
            CALCULATE(\r
                MIN('Chat + Agent Interactions (Audit Logs)'[ActivityDate]),\r
                ALLEXCEPT('Chat + Agent Interactions (Audit Logs)', 'Chat + Agent Interactions (Audit Logs)'[ActivityDate]),\r
                VALUES('Calendar'[Date])\r
            )\r
        VAR _last =\r
            CALCULATE(\r
                MAX('Chat + Agent Interactions (Audit Logs)'[ActivityDate]),\r
                ALLEXCEPT('Chat + Agent Interactions (Audit Logs)', 'Chat + Agent Interactions (Audit Logs)'[ActivityDate]),\r
                VALUES('Calendar'[Date])\r
            )\r
        RETURN DIVIDE(INT(_last - _first) + 1, 365.25 / 12)\r
\r
EVALUATE\r
// Each department's seats, how many are in use, the habit rate and hours,\r
// then hours per licensed seat a month so departments of different sizes\r
// compare fairly.\r
VAR _rows =\r
    FILTER(\r
        SUMMARIZECOLUMNS(\r
            'Chat + Agent Org Data'[Organization],\r
            "Licensed Seats", [Licensed Users (Filter-Aware)],\r
            "Seats In Use Pct", [% Active Licensed Users],\r
            "Habit Pct", [Habitual Users %, Last Month] + [Power Users %, Last Month],\r
            "Hours", CALCULATE([Expert Equivalent Hours], 'Effort Scenario'[Scenario] = "Typical"),\r
            "People", [All Active Users]\r
        ),\r
        LEN(TRIM('Chat + Agent Org Data'[Organization])) > 0 && ([Licensed Seats] > 0 || [Hours] > 0)\r
    )\r
VAR _months = [ValueLens Months In Range]\r
RETURN\r
    ADDCOLUMNS(_rows, "Hours Per Seat Month", DIVIDE([Hours], [Licensed Seats] * _months))\r
ORDER BY [Hours Per Seat Month] DESC\r
`,rt={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,layer:[{transform:[{aggregate:[{op:`median`,field:`Seats In Use Pct`,as:`Seats In Use Pct`}]}],mark:{type:`rule`,strokeDash:[4,3],color:`#8a8886`},encoding:{x:{field:`Seats In Use Pct`,type:`quantitative`,title:`Licensed seats in use`}}},{transform:[{aggregate:[{op:`median`,field:`Hours Per Seat Month`,as:`Hours Per Seat Month`}]}],mark:{type:`rule`,strokeDash:[4,3],color:`#8a8886`},encoding:{y:{field:`Hours Per Seat Month`,type:`quantitative`,title:`Expert hours per seat a month`,axis:{format:`,.2f`,labelExpr:`format(datum.value, ',.2f')`,tickCount:5}}}},{mark:{type:`circle`,opacity:.75},encoding:{x:{field:`Seats In Use Pct`,type:`quantitative`,title:`Licensed seats in use`,scale:{zero:!1},axis:{format:`.0%`,tickCount:5}},y:{field:`Hours Per Seat Month`,type:`quantitative`,title:`Expert hours per seat a month`,axis:{format:`,.2f`,labelExpr:`format(datum.value, ',.2f')`,tickCount:5}},size:{field:`Licensed Seats`,type:`quantitative`,legend:null,scale:{range:[40,640]}},tooltip:[{field:`Chat + Agent Org DataOrganization`,type:`nominal`,title:`Group`},{field:`Seats In Use Pct`,type:`quantitative`,title:`Seats in use`,format:`.0%`},{field:`Hours Per Seat Month`,type:`quantitative`,title:`Hours per seat a month`,format:`,.2f`},{field:`Licensed Seats`,type:`quantitative`,title:`Licensed seats`,format:`,.0f`},{field:`Habit Pct`,type:`quantitative`,title:`Habit rate`,format:`.0%`}]}},{transform:[{window:[{op:`row_number`,as:`Seat Rank`}],sort:[{field:`Licensed Seats`,order:`descending`}]},{filter:`datum['Seat Rank'] <= 6`}],mark:{type:`text`,align:`left`,baseline:`middle`,dx:16,fontSize:11,limit:140},encoding:{x:{field:`Seats In Use Pct`,type:`quantitative`,title:`Licensed seats in use`},y:{field:`Hours Per Seat Month`,type:`quantitative`,title:`Expert hours per seat a month`,axis:{format:`,.2f`,labelExpr:`format(datum.value, ',.2f')`,tickCount:5}},text:{field:`Chat + Agent Org DataOrganization`,type:`nominal`}}}]},it=`Chat + Agent Org DataOrganization`,at={"Chat + Agent Org Data[Organization]":{name:it,displayName:`Organization`},"[Licensed Seats]":{name:`Licensed Seats`,displayName:`Licensed seats`,format:`#,0`},"[Seats In Use Pct]":{name:`Seats In Use Pct`,displayName:`Seats in use`,format:m},"[Habit Pct]":{name:`Habit Pct`,displayName:`Habit rate`,format:m},"[Hours]":{name:`Hours`,displayName:`Expert-equivalent hours`,format:u},"[People]":{name:`People`,displayName:`People with a task`,format:`#,0`},"[Hours Per Seat Month]":{name:`Hours Per Seat Month`,displayName:`Hours per seat a month`,format:u}};function ot(){return{connection:`vl`,query:nt,columnMetadata:at}}function st(e){let t=structuredClone(rt);for(let n of t.layer){let t=n.encoding.tooltip?.[0];t&&(t.title=e)}return t}var ct=`EVALUATE\r
// The Conservative to Optimistic range under the summary's hours, as its own\r
// query: the app asks it beside executive-summary.dax, under the same filters,\r
// so the summary's figures don't wait for it. On a large tenant it took about a\r
// quarter of the summary's time. Both columns are as they were in the summary.\r
ROW(\r
    "Hours Conservative", CALCULATE([Expert Equivalent Hours], 'Effort Scenario'[Scenario] = "Conservative"),\r
    "Hours Optimistic", CALCULATE([Expert Equivalent Hours], 'Effort Scenario'[Scenario] = "Optimistic")\r
)\r
`,lt={"[Hours Conservative]":{name:`Hours Conservative`,displayName:`Conservative hours`,format:u},"[Hours Optimistic]":{name:`Hours Optimistic`,displayName:`Optimistic hours`,format:u}};function ut(){return{connection:`vl`,query:ct,columnMetadata:lt}}var dt=`EVALUATE\r
// One row per month of the dates in the filter. The caller sets the dates to\r
// six whole months, so the trend always spans the same time, and compares the\r
// last two full months for the arrows on the cards.\r
VAR _months =\r
    DISTINCT(\r
        SELECTCOLUMNS(\r
            VALUES('Calendar'[Date]),\r
            "Month Start", DATE(YEAR('Calendar'[Date]), MONTH('Calendar'[Date]), 1)\r
        )\r
    )\r
// Dates and the audit log never filter the seat list or the people list, so\r
// the seat counts are the same every month: work them out once.\r
VAR _seats = [Licensed Users (Filter-Aware)]\r
VAR _seatsInScope =\r
    CALCULATE(\r
        [Total Licensed Users],\r
        TREATAS(VALUES('Chat + Agent Org Data'[PersonId]), 'Copilot Licensed'[UPN_Normalized])\r
    )\r
// [All Active Users] and [Active Licensed Users] now test each user ID with\r
// LEN(TRIM()) only when Audit_UserId is filtered directly, but models deployed\r
// from older templates still test every ID every month, which takes seconds\r
// on a large tenant. Counting the users with a usage row, less the blank IDs\r
// found once here, gives the same number on any model, so these counts stay.\r
VAR _blankIds =\r
    FILTER(\r
        ALL('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
        LEN(TRIM('Chat + Agent Interactions (Audit Logs)'[Audit_UserId])) = 0\r
    )\r
RETURN\r
    GENERATE(\r
        _months,\r
        VAR _start = [Month Start]\r
        RETURN\r
            CALCULATETABLE(\r
                // [All Active Users], and the [Active Licensed Users] that\r
                // Seats In Use and [Inactive Users (Monthly)] both read.\r
                VAR _users =\r
                    CALCULATE(\r
                        DISTINCTCOUNT('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
                        KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[Is Usage Row] = TRUE())\r
                    )\r
                        - CALCULATE(\r
                            DISTINCTCOUNT('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
                            KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[Is Usage Row] = TRUE()),\r
                            KEEPFILTERS(_blankIds)\r
                        )\r
                VAR _licensedUsers =\r
                    CALCULATE(\r
                        DISTINCTCOUNT('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
                        KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[Is Usage Row] = TRUE()),\r
                        KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[License Status] = "M365 Copilot Licensed")\r
                    )\r
                        - CALCULATE(\r
                            DISTINCTCOUNT('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
                            KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[Is Usage Row] = TRUE()),\r
                            KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[License Status] = "M365 Copilot Licensed"),\r
                            KEEPFILTERS(_blankIds)\r
                        )\r
                // Blank rather than 0 when nobody is counted, as COUNTROWS gives.\r
                VAR _active = IF(_users > 0, _users)\r
                VAR _activeLicensed = IF(_licensedUsers > 0, _licensedUsers)\r
                // [Inactive Users (Monthly)]: unused seats, only when every\r
                // activity and the licensed users are in view.\r
                VAR _activity = SELECTEDVALUE('Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)], "")\r
                VAR _licence = SELECTEDVALUE('Chat + Agent Interactions (Audit Logs)'[Environment], "")\r
                VAR _inactive =\r
                    IF(\r
                        NOT (_activity IN {"Agents", "Cowork"}) && _licence <> "Unlicensed" && COUNTROWS('Calendar') > 0,\r
                        MAX(_seatsInScope - _activeLicensed, 0)\r
                    )\r
                RETURN\r
                    ROW(\r
                        "Copilot Hours",\r
                            CALCULATE([Expert Equivalent Hours], 'Effort Scenario'[Scenario] = "Typical",\r
                                KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)] = "Copilot")),\r
                        "Agent Hours",\r
                            CALCULATE([Expert Equivalent Hours], 'Effort Scenario'[Scenario] = "Typical",\r
                                KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)] = "Agents")),\r
                        "Cowork Hours",\r
                            CALCULATE([Expert Equivalent Hours], 'Effort Scenario'[Scenario] = "Typical",\r
                                KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)] = "Cowork")),\r
                        "Hours", CALCULATE([Expert Equivalent Hours], 'Effort Scenario'[Scenario] = "Typical"),\r
                        "Tasks", [AI Tasks],\r
                        // [% Active Licensed Users].\r
                        "Seats In Use Pct", IF(_seats > 0 && _activeLicensed <= _seats, DIVIDE(_activeLicensed, _seats)),\r
                        // The Adoption page's monthly habit mix: Habitual and Power\r
                        // over everyone counted that month, inactive included.\r
                        "Habit Pct",\r
                            DIVIDE(\r
                                [Habitual Users (Monthly)] + [Power Users (Monthly)],\r
                                COALESCE(_inactive, 0) + _active\r
                            ),\r
                        "Satisfaction", 'ProductFeedback'[Satisfaction Rate],\r
                        "Feedback", 'ProductFeedback'[Total Feedback]\r
                    ),\r
                KEEPFILTERS(\r
                    FILTER(ALL('Calendar'[Date]), 'Calendar'[Date] >= _start && 'Calendar'[Date] <= EOMONTH(_start, 0))\r
                )\r
            )\r
    )\r
ORDER BY [Month Start]\r
`,ft={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{calculate:`timeFormat(toDate(datum['Month Start']), '%b %Y')`,as:`Month`},{calculate:`1`,as:`Emphasis`},{fold:[`Copilot Hours`,`Agent Hours`,`Cowork Hours`],as:[`Series`,`Value`]},{filter:`isValid(datum.Value) && datum.Value > 0`},{calculate:`datum.Series === 'Copilot Hours' ? 'Copilot Chat and apps' : datum.Series === 'Agent Hours' ? 'Agents' : 'Cowork'`,as:`Source`},{calculate:`indexof(['Copilot Hours', 'Agent Hours', 'Cowork Hours'], datum.Series)`,as:`Rank`}],encoding:{x:{field:`Month`,type:`ordinal`,title:null,sort:null,scale:{paddingInner:.45,paddingOuter:.25},axis:{labelAngle:0,ticks:!1}}},layer:[{mark:{type:`bar`},encoding:{y:{aggregate:`sum`,field:`Value`,type:`quantitative`,title:null,stack:`zero`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`,minExtent:48,tickCount:4}},color:{field:`Source`,type:`nominal`,title:null,sort:null,scale:{domain:[`Copilot Chat and apps`,`Agents`,`Cowork`],range:[`#4f73b8`,`#c46a12`,`#8783ff`]},legend:{orient:`top`,direction:`horizontal`,symbolType:`square`,symbolLimit:10,labelLimit:240}},order:{field:`Rank`,type:`quantitative`,sort:`ascending`},opacity:{field:`Emphasis`,type:`quantitative`,scale:null,legend:null},tooltip:[{field:`Month`,type:`ordinal`,title:`Month`},{field:`Source`,type:`nominal`,title:`Source`},{field:`Value`,type:`quantitative`,aggregate:`sum`,title:`Expert-equivalent hours`,format:`,.0f`}]}},{transform:[{aggregate:[{op:`sum`,field:`Value`,as:`Total`},{op:`max`,field:`Emphasis`,as:`Emphasis`}],groupby:[`Month`]},{calculate:`abs(datum.Total) < 1000 ? format(datum.Total, ',.0f') : compactFormat(datum.Total, '#,0')`,as:`Total Label`}],mark:{type:`text`,baseline:`bottom`,dy:-4,fontWeight:600},encoding:{y:{field:`Total`,type:`quantitative`,title:null},text:{field:`Total Label`,type:`nominal`},opacity:{field:`Emphasis`,type:`quantitative`,scale:null,legend:null}}}]},pt={"[Month Start]":{name:`Month Start`,displayName:`Month`,format:`mmm yyyy`},"[Copilot Hours]":{name:`Copilot Hours`,displayName:`Copilot Chat and apps`,format:u},"[Agent Hours]":{name:`Agent Hours`,displayName:`Agents`,format:u},"[Cowork Hours]":{name:`Cowork Hours`,displayName:`Cowork`,format:u},"[Hours]":{name:`Hours`,displayName:`Expert-equivalent hours`,format:u},"[Tasks]":{name:`Tasks`,displayName:`Tasks delivered`,format:`#,0`},"[Seats In Use Pct]":{name:`Seats In Use Pct`,displayName:`Licensed seats in use`,format:m},"[Habit Pct]":{name:`Habit Pct`,displayName:`Habit rate`,format:m},"[Satisfaction]":{name:`Satisfaction`,displayName:`Satisfaction`,format:m},"[Feedback]":{name:`Feedback`,displayName:`Ratings`,format:`#,0`}};function mt(e){return{connection:`vl`,query:dt,columnMetadata:pt,vegaLiteSpec:Ze(ft,e)}}var ht=l(dt,e=>`
// With no date filter, the trend covers the 6 months to the last day of activity.
VAR _trendEnd = CALCULATE(MAX('Chat + Agent Interactions (Audit Logs)'[ActivityDate]), REMOVEFILTERS())
VAR _trendFrom = EOMONTH(_trendEnd, -6) + 1
RETURN
    CALCULATETABLE(
${e}
,
        FILTER(ALL('Calendar'[Date]), 'Calendar'[Date] >= _trendFrom && 'Calendar'[Date] <= _trendEnd)
    )
`);function gt(e){return{...mt(e),query:ht}}var _t=`DEFINE\r
    // The catalogue: every behaviour ValueLens recognises, and every Cowork\r
    // task category seen. General chat and general assistance say nothing\r
    // about what Copilot was used for, so they never count (EXCLUDED_KINDS in\r
    // executive/skills.ts lists the same names).\r
    MEASURE 'Chat + Agent Interactions (Audit Logs)'[ValueLens Skills Available] =\r
        VAR _kinds =\r
            DISTINCT(\r
                UNION(\r
                    SELECTCOLUMNS(ALL('Behavior Value Map'[Behavior]), "Kind", 'Behavior Value Map'[Behavior]),\r
                    SELECTCOLUMNS(\r
                        CALCULATETABLE(VALUES('Chat + Agent Interactions (Audit Logs)'[Cowork Task Category]), REMOVEFILTERS()),\r
                        "Kind", 'Chat + Agent Interactions (Audit Logs)'[Cowork Task Category]\r
                    )\r
                )\r
            )\r
        RETURN\r
            COUNTROWS(\r
                FILTER(\r
                    _kinds,\r
                    LEN(TRIM([Kind])) > 0\r
                        && NOT [Kind] IN { "General Chat", "General Assistance", "General assistance / Other" }\r
                )\r
            )\r
\r
EVALUATE\r
// As on the Leaderboards, Security Copilot's automated sessions are left out of the agent figures.\r
VAR _noSecurityCopilot =\r
    FILTER(\r
        ALL('Chat + Agent Interactions (Audit Logs)'[AppHost]),\r
        NOT CONTAINSSTRING('Chat + Agent Interactions (Audit Logs)'[AppHost], "SecurityCopilot")\r
    )\r
VAR _seats = [Licensed Users (Filter-Aware)]\r
// [Active Licensed Users] now tests each user ID with LEN(TRIM()) only when\r
// Audit_UserId is filtered directly, but models deployed from older templates\r
// still test every ID, which takes seconds on a large tenant. Counting the\r
// licensed users with a usage row, less the blank IDs, gives the same number\r
// on any model, so this inline count stays (as in executive-months.dax).\r
VAR _blankIds =\r
    FILTER(\r
        ALL('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
        LEN(TRIM('Chat + Agent Interactions (Audit Logs)'[Audit_UserId])) = 0\r
    )\r
VAR _licensedUsers =\r
    CALCULATE(\r
        DISTINCTCOUNT('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
        KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[Is Usage Row] = TRUE()),\r
        KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[License Status] = "M365 Copilot Licensed")\r
    )\r
        - CALCULATE(\r
            DISTINCTCOUNT('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
            KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[Is Usage Row] = TRUE()),\r
            KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[License Status] = "M365 Copilot Licensed"),\r
            KEEPFILTERS(_blankIds)\r
        )\r
// Blank rather than 0 when nobody is counted, as COUNTROWS gives.\r
VAR _seatsInUse = IF(_licensedUsers > 0, _licensedUsers)\r
// Agents In Use asked [Active Agent Users] about each agent. That measure now\r
// tests each user ID with LEN(TRIM()) only when Audit_UserId is filtered\r
// directly, but models deployed from older templates still test every ID, so\r
// this inline count stays. As in the measure, an agent is in use when its\r
// prompts in the agent audience come from more user IDs than blank ones.\r
VAR _agents =\r
    CALCULATETABLE(\r
        ADDCOLUMNS(\r
            FILTER(\r
                VALUES('Chat + Agent Interactions (Audit Logs)'[AgentName]),\r
                LEN(TRIM('Chat + Agent Interactions (Audit Logs)'[AgentName])) > 0\r
            ),\r
            "@Ids", CALCULATE(DISTINCTCOUNT('Chat + Agent Interactions (Audit Logs)'[Audit_UserId])),\r
            "@BlankIds",\r
                CALCULATE(\r
                    DISTINCTCOUNT('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
                    KEEPFILTERS(_blankIds)\r
                )\r
        ),\r
        KEEPFILTERS(_noSecurityCopilot),\r
        KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)] = "Agents"),\r
        KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[Is Prompt Row] = TRUE())\r
    )\r
// Same people as [All Active Users]: a prompt or a Cowork scheduled run.\r
VAR _promptOrCowork =\r
    FILTER(\r
        ALL(\r
            'Chat + Agent Interactions (Audit Logs)'[Is Prompt Row],\r
            'Chat + Agent Interactions (Audit Logs)'[Is_Cowork]\r
        ),\r
        'Chat + Agent Interactions (Audit Logs)'[Is Prompt Row]\r
            || 'Chat + Agent Interactions (Audit Logs)'[Is_Cowork]\r
    )\r
VAR _activeIds =\r
    CALCULATE(\r
        DISTINCTCOUNT('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
        KEEPFILTERS(_promptOrCowork)\r
    )\r
        - CALCULATE(\r
            DISTINCTCOUNT('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
            KEEPFILTERS(_promptOrCowork),\r
            KEEPFILTERS(_blankIds)\r
        )\r
RETURN\r
    ROW(\r
        "Hours", CALCULATE([Expert Equivalent Hours], 'Effort Scenario'[Scenario] = "Typical"),\r
        "Tasks", [AI Tasks],\r
        "People", [All Active Users],\r
        "Weeks",\r
            CALCULATE(\r
                DISTINCTCOUNT('Chat + Agent Interactions (Audit Logs)'[WeekStart]),\r
                ALLEXCEPT('Chat + Agent Interactions (Audit Logs)', 'Chat + Agent Interactions (Audit Logs)'[WeekStart]),\r
                VALUES('Calendar'[Date])\r
            ),\r
        "Skills Available", [ValueLens Skills Available],\r
        "Licensed Seats", _seats,\r
        "Seats In Use", _seatsInUse,\r
        // [% Active Licensed Users].\r
        "Seats In Use Pct", IF(_seats > 0 && _seatsInUse <= _seats, DIVIDE(_seatsInUse, _seats)),\r
        "Unlicensed Users", [Active Unlicensed Users],\r
        "Habit Month", [Last Full Month Start],\r
        "Habitual Pct", [Habitual Users %, Last Month],\r
        "Power Pct", [Power Users %, Last Month],\r
        "Agent Users", CALCULATE([Active Agent Users], KEEPFILTERS(_noSecurityCopilot)),\r
        "Agent Hours",\r
            CALCULATE(\r
                [Expert Equivalent Hours],\r
                'Effort Scenario'[Scenario] = "Typical",\r
                KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)] = "Agents")\r
            ),\r
        "Agents In Use", COUNTROWS(FILTER(_agents, [@Ids] > [@BlankIds])),\r
        "Satisfaction", 'ProductFeedback'[Satisfaction Rate],\r
        "Feedback", 'ProductFeedback'[Total Feedback],\r
        // This asked each person for their organization, but the audit log never\r
        // filters the org table, so everyone got the same answer. Asking once,\r
        // and counting the active people less the blank IDs, gives the same number.\r
        "People With Organization",\r
            IF(_activeIds > 0 && LEN(TRIM(MAX('Chat + Agent Org Data'[Organization]))) > 0, _activeIds)\r
    )\r
`,vt={"[Hours]":{name:`Hours`,displayName:`Expert-equivalent hours`,format:u},"[Tasks]":{name:`Tasks`,displayName:`Tasks delivered`,format:`#,0`},"[People]":{name:`People`,displayName:`People with a task`,format:`#,0`},"[Weeks]":{name:`Weeks`,displayName:`Weeks`,format:`#,0`},"[Skills Available]":{name:`Skills Available`,displayName:`Kinds of work`,format:`#,0`},"[Licensed Seats]":{name:`Licensed Seats`,displayName:`Licensed seats`,format:`#,0`},"[Seats In Use]":{name:`Seats In Use`,displayName:`Seats in use`,format:`#,0`},"[Seats In Use Pct]":{name:`Seats In Use Pct`,displayName:`Licensed seats in use`,format:m},"[Unlicensed Users]":{name:`Unlicensed Users`,displayName:`Unlicensed users`,format:`#,0`},"[Habit Month]":{name:`Habit Month`,displayName:`Habit month`,format:`mmm yyyy`},"[Habitual Pct]":{name:`Habitual Pct`,displayName:`Habitual`,format:m},"[Power Pct]":{name:`Power Pct`,displayName:`Power`,format:m},"[Agent Users]":{name:`Agent Users`,displayName:`Agent users`,format:`#,0`},"[Agent Hours]":{name:`Agent Hours`,displayName:`Agent hours`,format:u},"[Agents In Use]":{name:`Agents In Use`,displayName:`Agents in use`,format:`#,0`},"[Satisfaction]":{name:`Satisfaction`,displayName:`Satisfaction`,format:m},"[Feedback]":{name:`Feedback`,displayName:`Ratings`,format:`#,0`},"[People With Organization]":{name:`People With Organization`,displayName:`People with an organization`,format:`#,0`}};function yt(){return{connection:`vl`,query:_t,columnMetadata:vt}}var bt=`EVALUATE\r
// The kinds of work that produced the most expert-equivalent hours. General\r
// Chat and General Assistance are left out, as they are from unique skills.\r
VAR _kinds =\r
    FILTER(\r
        SUMMARIZECOLUMNS(\r
            'Chat + Agent Interactions (Audit Logs)'[Task Breakdown Category],\r
            "Hours", CALCULATE([Expert Equivalent Hours], 'Effort Scenario'[Scenario] = "Typical"),\r
            "Tasks", [AI Tasks],\r
            "People", [All Active Users]\r
        ),\r
        LEN(TRIM('Chat + Agent Interactions (Audit Logs)'[Task Breakdown Category])) > 0\r
            && NOT 'Chat + Agent Interactions (Audit Logs)'[Task Breakdown Category]\r
                IN { "General Chat", "General Assistance", "General assistance / Other" }\r
            && [Hours] > 0\r
    )\r
RETURN\r
    TOPN(6, _kinds, [Hours], DESC, 'Chat + Agent Interactions (Audit Logs)'[Task Breakdown Category], ASC)\r
ORDER BY [Hours] DESC, 'Chat + Agent Interactions (Audit Logs)'[Task Breakdown Category] ASC\r
`,xt={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Chat + Agent Interactions (Audit Logs)Task Breakdown Category`,type:`nominal`,title:null,sort:`-x`,axis:{labelLimit:220}},x:{field:`Hours`,type:`quantitative`,title:`Expert-equivalent hours`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`,tickCount:4}},tooltip:[{field:`Chat + Agent Interactions (Audit Logs)Task Breakdown Category`,type:`nominal`,title:`Kind of work`},{field:`Hours`,type:`quantitative`,title:`Expert-equivalent hours`,format:`,.0f`},{field:`Tasks`,type:`quantitative`,title:`Tasks`,format:`,.0f`},{field:`People`,type:`quantitative`,title:`People`,format:`,.0f`}]}},St={"Chat + Agent Interactions (Audit Logs)[Task Breakdown Category]":{name:`Chat + Agent Interactions (Audit Logs)Task Breakdown Category`,displayName:`Kind of work`},"[Hours]":{name:`Hours`,displayName:`Expert-equivalent hours`,format:u},"[Tasks]":{name:`Tasks`,displayName:`Tasks`,format:`#,0`},"[People]":{name:`People`,displayName:`People`,format:`#,0`}};function Ct(){return{connection:`vl`,query:bt,columnMetadata:St,vegaLiteSpec:structuredClone(xt)}}function V(e){return e?e.rows.map(t=>Object.fromEntries(e.columns.map((e,n)=>[e.name,t[n]]))):[]}function H(e,t){return e===void 0||t===void 0||t<=0?void 0:e/t}function U(...e){let t=e.filter(e=>e!==void 0);return t.length===0?void 0:t.reduce((e,t)=>e+t,0)}function wt(e,t,n,r){if(!n||!r)return;let i=e&&e>n?e:n,a=t&&t<r?t:r;if(!(a<i))return{start:i,end:a,window:He(i,a),pair:Ue(i,a)}}function Tt(e){let t=new Map;for(let n of e){let e=n[`Month Start`];typeof e==`string`&&t.set(e.slice(0,10),n)}return t}function W(e,t,n,r,i){if(!t)return;let a=qe(e,t,r(n.get(t.current)),r(n.get(t.previous)));return a&&(i?{...a,polarity:i}:a)}function G(e,t,n,r){if(!t)return;let i=[];for(let a of t.window.months){if(a<t.start||Ve(a)>t.end)continue;let o=r(n.get(a));o!==void 0&&Number.isFinite(o)&&i.push({label:B(a),value:e===`volume`?o/z(a):o})}if(i.length<3)return;let a=i[0],o=i[i.length-1],s=a.value===0?o.value-a.value:(o.value-a.value)/Math.abs(a.value),c=Math.abs(s)<.01?`about level`:s>0?`higher at the end`:`lower at the end`;return{points:i,description:`Trend by full month${e===`volume`?`, per day`:``}, ${a.label} to ${o.label}: ${c}.`}}function Et(e){let t=a(e,`[Hours]`),n=a(e,`[Tasks]`),r=a(e,`[People]`),i=a(e,`[Weeks]`),o=r!==void 0&&i!==void 0?r*i:void 0,s=t===void 0?void 0:t*60,c=a(e,`[Habitual Pct]`),l=a(e,`[Power Pct]`);return{minutesPerPersonWeek:H(s,o),tasksPerPersonWeek:H(n,o),minutesPerTask:H(s,n),agentShare:H(a(e,`[Agent Hours]`),t),habitRate:c===void 0&&l===void 0?void 0:(c??0)+(l??0)}}function Dt(e,t){if(e.refreshing||t.refreshing)return{status:`pending`};if(t.error!==void 0)return{status:`error`,message:t.error};if(!e.loaded||!t.loaded)return{status:`pending`};let n=a(t.row,`[Hours Conservative]`),r=a(t.row,`[Hours Optimistic]`);return n===void 0||r===void 0?{status:`none`}:{status:`ready`,conservative:n,optimistic:r}}var Ot=new Intl.ListFormat(`en-GB`,{style:`long`,type:`conjunction`});function kt(e){return Ot.format(e)}var At=new Intl.DateTimeFormat(`en-GB`,{day:`numeric`,month:`short`,year:`numeric`,timeZone:`UTC`}),jt=new Intl.DateTimeFormat(`en-GB`,{month:`long`,timeZone:`UTC`});function Mt(e){if(typeof e==`string`&&/^\d{4}-\d{2}-\d{2}/.test(e))return At.format(new Date(`${e.slice(0,10)}T00:00:00Z`))}function Nt(e){if(typeof e==`string`&&/^\d{4}-\d{2}/.test(e))return jt.format(new Date(`${e.slice(0,7)}-01T00:00:00Z`))}var K=[`idle-seats`,`cowork-over-allowance`,`enablement-gap`,`weakest-theme`],Pt=.25,Ft=.5,q=new Intl.NumberFormat(void 0,{style:`percent`,maximumFractionDigits:0});function J(e,t,n){return e===1?t:n}function It(e){return e.charAt(0).toLowerCase()+e.slice(1)}function Lt({summary:e,dormancy:t,estate:n}){let r=a(n,`[License Inventory Usable]`);if(r===void 0||r===0||!t)return;let o=t.map(e=>({order:a(e,`Dormancy Bucket Order`),name:i(e,`Dormancy Bucket`),seats:a(e,`Licensed Users`)??0})).filter(e=>e.order!==void 0&&e.seats>0),s=o.reduce((e,t)=>e+t.seats,0),c=o.filter(e=>(e.order??0)>=2).sort((e,t)=>t.seats-e.seats||(e.order??0)-(t.order??0)),l=c.reduce((e,t)=>e+t.seats,0);if(s<=0||l===0||l/s<.05)return;let u=kt(c.map(e=>`${M(e.seats,`whole`)} ${It(e.name??`idle`)}`)),d=a(e,`[Unlicensed Users]`)??0,f=d>0?` ${M(d,`whole`)} ${J(d,`person already uses`,`people already use`)} Copilot without a license.`:``;return{rule:`idle-seats`,tone:`caution`,title:`Reassign ${M(l,`whole`)} idle ${J(l,`seat`,`seats`)}`,evidence:`Licensed seats with no Copilot activity in 30 days or more: ${u}.${f}`,reach:l,stake:`${q.format(l/s)} of seats`,link:{destination:`readiness`,stage:`license-readiness`,label:`Open Readiness`}}}function Rt({cowork:e}){let t=a(e,`[Users Over Limit]`),n=a(e,`[Consuming Users]`);if(t===void 0||n===void 0)return;let r=Math.round(t*n);if(r<1)return;let o=i(e,`[Period Label]`),s=a(e,`[Policies]`)??0,c=s>0?`, across ${M(s,`whole`)} spending ${J(s,`policy`,`policies`)}`:``;return{rule:`cowork-over-allowance`,tone:`negative`,title:`${M(r,`whole`)} ${J(r,`person is`,`people are`)} over their Cowork allowance`,evidence:`${q.format(t)} of the ${M(n,`whole`)} people using Cowork${o?` in ${o}`:``} went past their spending policy's credit limit${c}.`,reach:r,stake:`${q.format(t)} of Cowork users`,link:{destination:`consumption`,stage:`cowork-credits`,label:`Open Consumption`}}}function zt(e){if(e.length===0)return;let t=[...e].sort((e,t)=>e-t);return t[Math.floor((t.length-1)*Pt)]}function Bt({departments:e,orgPlural:t}){let n=(e??[]).map(e=>({name:i(e,it),seats:a(e,`Licensed Seats`)??0,hours:a(e,`Hours Per Seat Month`)})).filter(e=>e.name!==void 0&&e.seats>0&&e.hours!==void 0);if(n.length<4)return;let r=zt(n.map(e=>e.hours))??0,o=n.reduce((e,t)=>e+t.seats,0),s=n.reduce((e,t)=>e+t.hours*t.seats,0)/o,c=n.filter(e=>e.hours<=r&&e.hours<s).sort((e,t)=>e.hours-t.hours||e.name.localeCompare(t.name)),l=c.reduce((e,t)=>e+Ft*(s-t.hours)*t.seats*3,0);if(c.length===0||Math.round(l)<1)return;let u=kt(c.map(e=>e.name)),d=c.length===1,f=c.reduce((e,t)=>e+t.seats,0);return{rule:`enablement-gap`,tone:`caution`,title:`Focus enablement on ${u}`,evidence:`${d?`It is`:`They are`} in the bottom quarter of ${t} for expert hours per seat. Closing half ${d?`its`:`their`} gap to the average of ${M(s,`hours`)} hours per seat a month would add about ${M(l,`whole`)} expert hours a quarter.`,reach:f,stake:`+${M(l,`whole`)} hours a quarter`,link:{destination:`adoption`,label:`Open Adoption`}}}function Vt({summary:e,themes:t}){let n=a(e,`[Satisfaction]`);if(n===void 0||!t)return;let r=new Map;for(let e of t){let t=i(e,`Category`),n=a(e,`Total Feedback`),o=a(e,`Satisfaction`);t&&n!==void 0&&o!==void 0&&!r.has(t)&&r.set(t,{total:n,rate:o})}let[o]=[...r].map(([e,t])=>({name:e,...t})).filter(e=>e.total>=20&&e.rate<n).sort((e,t)=>e.rate-t.rate||t.total-e.total||e.name.localeCompare(t.name));if(!o)return;let s=Math.round((n-o.rate)*100);if(!(s<1))return{rule:`weakest-theme`,tone:`caution`,title:`${o.name} is the least liked theme`,evidence:`${q.format(o.rate)} thumbs up across ${M(o.total,`whole`)} ratings, against ${q.format(n)} across all feedback.`,reach:o.total,stake:`${s} pp below overall`,link:{destination:`feedback`,stage:`feedback`,label:`Open Feedback`}}}var Ht={"idle-seats":Lt,"cowork-over-allowance":Rt,"enablement-gap":Bt,"weakest-theme":Vt};function Ut(e){return K.map(t=>Ht[t](e)).filter(e=>e!==void 0).sort((e,t)=>t.reach-e.reach||K.indexOf(e.rule)-K.indexOf(t.rule))}var Y=v(),X=[`dateRange`,`organizations`],Wt=[Oe],Gt={connection:``,query:``},Kt={negative:{Icon:Ne,className:`text-negative`,label:`Problem`},caution:{Icon:re,className:`text-caution`,label:`Opportunity`}};function qt({item:e}){let t=Kt[e.tone];return(0,Y.jsxs)(`li`,{className:`grid grid-cols-[16px_minmax(0,1fr)] gap-x-300 gap-y-200 px-500 py-400 sm:grid-cols-[16px_minmax(0,1fr)_auto]`,children:[(0,Y.jsx)(t.Icon,{className:g(`icon-size-200 mt-[2px]`,t.className),"aria-hidden":`true`}),(0,Y.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,Y.jsxs)(`h3`,{className:g(oe,`font-semibold text-foreground`),children:[(0,Y.jsxs)(`span`,{className:`sr-only`,children:[t.label,`: `]}),e.title]}),(0,Y.jsx)(`p`,{className:g(ie,`max-w-[72ch] text-muted-foreground`),children:e.evidence})]}),(0,Y.jsxs)(`div`,{className:`col-start-2 flex flex-col items-start gap-100 sm:col-start-3 sm:items-end`,children:[(0,Y.jsx)(`span`,{className:g(ie,`font-semibold text-foreground`),children:e.stake}),(0,Y.jsx)(ve,{destination:e.link.destination,stage:e.link.stage,children:e.link.label})]})]})}function Jt(e,t,n){let r=n?` Updated ${n}.`:``;switch(e.kind){case`complete`:return`Every agent session matches a registered agent; ${M(e.seenInUse,`whole`)} of ${M(e.registryAgents,`whole`)} are in use.${r}`;case`partial`:return`${M(e.unmatchedSessions,`whole`)} agent sessions came from agents it doesn't list.${r}`;case`none`:return`None of the ${M(e.unmatchedSessions,`whole`)} agent sessions match an agent it lists, so agents go by the names the audit log gives them.${r}`;default:return t===void 0?void 0:`${M(t,`whole`)} agents listed, with no agent sessions yet to match against them.${r}`}}function Yt(e){if(e!==void 0)return e===0?`Doesn't reconcile with activity yet, so idle seats can't be counted. Readiness explains why.`:`Reconciles with activity`}function Xt(e){let t=e.filter(e=>e.error!==void 0);if(t.length!==0)return{message:t[0].error,retry:()=>t.forEach(e=>e.refetch())}}function Zt(e){return`loaded`in e?e.loaded:!e.isLoading}function Qt({data:e}){let{summary:t,departments:n}=e,r=s(),{options:c}=o(),l=(0,L.useMemo)(()=>je(),[]),u=(0,L.useMemo)(()=>ke(),[]),f=(0,L.useMemo)(()=>I?be():{...be(),...Gt},[]),m=(0,L.useMemo)(()=>I?Ie():{...Ie(),...Gt},[]),h=P(l,[],X),g=F(Ae(),[],X),_=P(u,Wt),v=we(f),y=we(m),b=F(Te()),S=[t,n,h,g,_,...I?[v]:[]],C=Xt(S),w=S.every(Zt),E=(0,L.useMemo)(()=>w?Ut({summary:t.row,dormancy:V(h.table),estate:g.row,departments:V(n.table),cowork:v.row,themes:V(_.table),orgPlural:r.plural}):[],[w,t.row,h.table,g.row,n.table,v.row,_.table,r.plural]),ee=Ee(b.row),O=Mt(i(y.row,`[Last Date]`)),te=Mt(c?.lastDate);return(0,Y.jsxs)(N,{id:p(`what-needs-attention`),title:`What needs attention`,description:`Decisions the data points to, the most people or hours affected first.`,children:[(0,Y.jsx)(le,{ignored:X,scope:`to idle seats`,reason:`they describe the license roster as it stands, for the whole tenant.`}),(0,Y.jsx)(me,{from:[_.notFilteredBy,I?v.notFilteredBy:void 0,b.notFilteredBy]}),(0,Y.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,Y.jsx)(`div`,{className:`min-w-0`,children:C?(0,Y.jsx)(D,{message:C.message,onRetry:C.retry}):w?E.length===0?(0,Y.jsx)(k,{title:`Nothing needs attention`,description:`No rule found anything to raise: idle seats, Cowork allowances, the gap between ${r.plural} and the least liked feedback theme are all within bounds.`}):(0,Y.jsx)(`ol`,{"aria-label":`What needs attention`,className:`flex flex-col divide-y divide-border rounded-xl border border-border bg-card`,children:E.map(e=>(0,Y.jsx)(qt,{item:e},e.rule))}):(0,Y.jsx)(T,{className:`h-[320px]`})}),(0,Y.jsx)(`div`,{className:`xl:self-start`,children:(0,Y.jsx)(x,{title:`Can we trust these numbers?`,notes:[{term:`Activity data`,text:te&&`Through ${te}`},{term:`Credit data`,text:I&&O?`Through ${O}`:void 0},{term:`License inventory`,text:Yt(a(g.row,`[License Inventory Usable]`))},{term:`People with ${d(r.noun)}`,text:de(r)},{term:`Agent registry`,text:Jt(ee,a(b.row,`[Registry Agents]`),Mt(i(b.row,`[Registry Updated]`)))}]})})]})]})}function $t({label:e,value:t}){return(0,Y.jsxs)(`div`,{className:`flex items-baseline justify-between gap-200`,children:[(0,Y.jsx)(`span`,{children:e}),(0,Y.jsx)(`span`,{className:`font-numeric font-semibold whitespace-nowrap tabular-nums text-[length:var(--text-300)] text-foreground`,children:t})]})}var en=`Conservative to Optimistic`;function tn({range:e,onRetry:t}){switch(e.status){case`ready`:return(0,Y.jsx)($t,{label:en,value:`${M(e.conservative,`whole`)} – ${M(e.optimistic,`whole`)}`});case`none`:return null;case`pending`:return(0,Y.jsxs)(`div`,{className:`flex items-center justify-between gap-200`,children:[(0,Y.jsx)(`span`,{children:en}),(0,Y.jsxs)(`span`,{role:`status`,"data-query-loading":``,children:[(0,Y.jsx)(`span`,{className:`sr-only`,children:`Loading`}),(0,Y.jsx)(`span`,{"aria-hidden":`true`,className:`block h-200 w-[10ch] animate-pulse rounded-sm bg-muted`})]})]});case`error`:{let n=E(e.message);return(0,Y.jsxs)(`div`,{className:`flex flex-wrap items-baseline justify-between gap-x-200`,children:[(0,Y.jsx)(`span`,{children:en}),(0,Y.jsxs)(`span`,{className:`flex items-baseline gap-200`,children:[(0,Y.jsx)(`span`,{title:n?void 0:e.message,children:n?`Power BI is busy`:`Didn't load`}),(0,Y.jsx)(`button`,{type:`button`,onClick:t,className:`font-semibold text-foreground underline underline-offset-2 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`,children:`Try again`})]})]})}}}function Z({children:e}){return(0,Y.jsx)(`div`,{className:`flex flex-col gap-100`,children:e})}function nn({title:e,className:t,children:n}){return(0,Y.jsxs)(`div`,{className:`flex flex-col gap-300`,children:[(0,Y.jsx)(`h3`,{className:g(oe,`font-semibold text-foreground`),children:e}),(0,Y.jsx)(`div`,{className:t,children:n})]})}var Q=e=>t=>a(t,e),rn=e=>U(a(e,`Studio Credits`),a(e,`Cowork Credits`)),an=I?`grid gap-300 md:grid-cols-3`:`grid gap-300 md:grid-cols-2`;function on(e){return e?I?{scope:`to satisfaction or credits`,reason:`feedback isn't linked to people, and Consumption Central records credits for the whole tenant.`}:{scope:`to satisfaction`,reason:`feedback isn't linked to people, so it covers everyone.`}:I?{scope:`to credits`,reason:`Consumption Central records credits for the whole tenant.`}:void 0}function sn({data:e}){let{summary:t,hoursRange:n,months:r,credits:o,creditsInRange:s,range:c}=e,l=t.row,u=c.range?.pair,d=!y(te(),`productFeedback`),f=on(d),m=(0,L.useMemo)(()=>Tt(V(r.table)),[r.table]),h=(0,L.useMemo)(()=>Tt(V(o.table)),[o.table]),_=(0,L.useMemo)(()=>{let e=V(s.table),t=U(...e.map(e=>a(e,`Studio Credits`))),n=U(...e.map(e=>a(e,`Cowork Credits`)));return{studio:t,cowork:n,total:U(t,n)}},[s.table]),v=Et(l),b=Nt(i(l,`[Habit Month]`)),x=u?`Arrows compare ${Nt(u.current)}, the last full month, with ${Nt(u.previous)}; totals are compared per day so month length doesn't skew them.`:`Arrows comparing one month with the one before appear when the date range covers two full months.`;return(0,Y.jsxs)(N,{id:p(`the-bottom-line`),title:`The bottom line`,description:`What Copilot did, how widely people use it, and whether it is becoming how they work. ${x}`,children:[t.error===void 0?t.loaded?l?(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsxs)(nn,{title:`Is it doing real work?`,className:an,children:[(0,Y.jsx)(j,{label:`Expert-equivalent hours · Typical effort`,value:a(l,`[Hours]`),emphasis:!0,delta:W(`volume`,u,m,Q(`Hours`)),trend:G(`volume`,c.range,m,Q(`Hours`)),detail:(0,Y.jsxs)(Z,{children:[(0,Y.jsx)(tn,{range:Dt(t,n),onRetry:n.refetch}),v.minutesPerPersonWeek!==void 0&&(0,Y.jsx)($t,{label:`Per person a week`,value:`${M(v.minutesPerPersonWeek,`whole`)} min`})]})}),(0,Y.jsx)(j,{label:`Tasks delivered`,value:a(l,`[Tasks]`),delta:W(`volume`,u,m,Q(`Tasks`)),trend:G(`volume`,c.range,m,Q(`Tasks`)),detail:(0,Y.jsxs)(Z,{children:[(0,Y.jsx)(A,{label:`Per person a week`,value:v.tasksPerPersonWeek,format:`hours`}),(0,Y.jsx)(A,{label:`Expert minutes per task`,value:v.minutesPerTask,format:`hours`})]})}),I&&(s.error===void 0?s.isLoading?(0,Y.jsx)(T,{}):(0,Y.jsx)(j,{label:`Credits consumed · whole tenant`,value:_.total===void 0?void 0:_.total/1e6,format:`millions`,delta:W(`volume`,u,h,rn,`neutral`),trend:G(`volume`,c.range,h,rn),detail:(0,Y.jsxs)(Z,{children:[(0,Y.jsx)(A,{label:`Copilot Studio agents`,value:_.studio===void 0?void 0:_.studio/1e6,format:`millions`}),(0,Y.jsx)(A,{label:`Cowork`,value:_.cowork===void 0?void 0:_.cowork/1e6,format:`millions`})]})}):(0,Y.jsx)(D,{message:s.error,onRetry:s.refetch}))]}),(0,Y.jsxs)(nn,{title:`Is it becoming how people work?`,className:g(`grid gap-300`,d?`md:grid-cols-3`:`md:grid-cols-2`),children:[(0,Y.jsx)(j,{label:`Licensed seats in use`,value:a(l,`[Seats In Use Pct]`),format:`percent`,delta:W(`rate`,u,m,Q(`Seats In Use Pct`)),trend:G(`rate`,c.range,m,Q(`Seats In Use Pct`)),detail:(0,Y.jsxs)(Z,{children:[(0,Y.jsx)(A,{label:`Licensed seats`,value:a(l,`[Licensed Seats]`)}),(0,Y.jsx)(A,{label:`Seats in use`,value:a(l,`[Seats In Use]`)})]})}),(0,Y.jsx)(j,{label:b?`Habit rate · ${b}`:`Habit rate`,value:v.habitRate,format:`percent`,delta:W(`rate`,u,m,Q(`Habit Pct`)),trend:G(`rate`,c.range,m,Q(`Habit Pct`)),detail:(0,Y.jsxs)(Z,{children:[(0,Y.jsx)(A,{label:`Habitual`,value:a(l,`[Habitual Pct]`),format:`percent`}),(0,Y.jsx)(A,{label:`Power`,value:a(l,`[Power Pct]`),format:`percent`})]})}),d&&(0,Y.jsx)(j,{label:`Satisfaction · thumbs up`,value:a(l,`[Satisfaction]`),format:`percent`,delta:W(`rate`,u,m,Q(`Satisfaction`)),trend:G(`rate`,c.range,m,Q(`Satisfaction`)),detail:(0,Y.jsx)(Z,{children:(0,Y.jsx)(A,{label:`Ratings`,value:a(l,`[Feedback]`)})})})]})]}):(0,Y.jsx)(k,{title:`No Copilot activity`,description:`The semantic model returned nothing for the current selection.`}):(0,Y.jsx)(`div`,{className:an,children:Array.from({length:I?3:2},(e,t)=>(0,Y.jsx)(T,{},t))}):(0,Y.jsx)(D,{message:t.error,onRetry:t.refetch}),f&&(0,Y.jsx)(le,{ignored:[`organizations`],scope:f.scope,reason:f.reason})]})}function cn(e,t,n){return r=>{let i=e.map(e=>r.columns.findIndex(t=>t.name===e));if(i.every(e=>e<0))return;let a=r.rows.map(e=>{let t=i.map(t=>t<0?void 0:e[t]).filter(e=>typeof e==`number`&&Number.isFinite(e));return[...e,t.length?t.reduce((e,t)=>e+t,0):null]});return n({...r,columns:[...r.columns,{name:t,displayName:t}],rows:a})}}var ln=fe({date:`Month Start`,value:`Hours`,of:`expert-equivalent hours`,period:`month`,format:`hours`}),un=cn([`Studio Credits`,`Cowork Credits`],`Credits`,fe({date:`Month Start`,value:`Credits`,of:`credits`,period:`month`})),dn=De({label:`Chat + Agent Interactions (Audit Logs)Task Breakdown Category`,value:`Hours`,of:`expert-equivalent hours`,format:`hours`}),fn=340,pn=`Six months to the end of the date range; months before it are faded`;function mn({data:e}){let{months:t,monthsSource:n,credits:r,creditsSource:i,summary:o}=e,s=a(o.row,`[Skills Available]`);return(0,Y.jsx)(N,{id:p(`is-it-growing`),title:`Is it growing?`,description:I?`Expert-equivalent hours and credits consumed each month, on one timeline. Each colour is the same source in both charts.`:`Expert-equivalent hours each month, by where the work was done.`,actions:(0,Y.jsx)(ve,{destination:`value`,stage:`task-breakdown`,children:`Open Value`}),children:(0,Y.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,Y.jsxs)(`div`,{className:`flex min-w-0 flex-col gap-300`,children:[(0,Y.jsx)(S,{result:t,spec:n.vegaLiteSpec,height:fn,title:`Work delivered by month`,headline:ln,subtitle:`Expert-equivalent hours. ${pn}`,emptyTitle:`No work in these months`,emptyDescription:`There's no Copilot activity in the six months to the end of the date range.`}),I&&(0,Y.jsx)(me,{from:[r.notFilteredBy]}),I&&(0,Y.jsx)(S,{result:r,spec:i.vegaLiteSpec,height:fn,title:`Credits consumed by month`,headline:un,subtitle:`Whole tenant. ${pn}`,emptyTitle:`No credits in these months`,emptyDescription:`Consumption Central has no Copilot Studio or Cowork credits in the six months to the end of the date range.`})]}),(0,Y.jsx)(`div`,{className:`xl:self-start`,children:(0,Y.jsx)(x,{title:`How this is worked out`,notes:[{term:`Expert-equivalent hours`,text:`Each task counts the minutes an expert typically takes to do it without Copilot, from the Signal → Impact table. Typical effort; Conservative and Optimistic give the range.`},{term:`Tasks`,text:s===void 0?`Copilot interactions, each sorted into a kind of work.`:`Copilot interactions, sorted into ${M(s,`whole`)} kinds of work.`},{term:`Credits`,text:I?`Copilot Studio and Cowork credits from Consumption Central, for the whole tenant.`:void 0}],children:(0,Y.jsx)(ye,{destination:`value`,stage:`cost-vs-value`,children:`Need it in money? Open Cost vs value`})})})]})})}var hn=`Hours Per Seat Month`,gn=360;function _n(e,t,n,r){return{id:t,header:n,width:r,numericStyling:!0,cellRenderer:he({domain:ge(e,t),format:_e(e,t)})}}function vn(e,t){return[{id:it,header:e,minWidth:180},{id:`Licensed Seats`,header:`Licensed seats`,width:132,numericStyling:!0},_n(t,`Seats In Use Pct`,`Seats in use`,124),_n(t,`Habit Pct`,`Habit rate`,116),{id:`Hours`,header:`Expert hours`,width:128,numericStyling:!0},_n(t,hn,`Hours per seat`,136)]}function yn(e,t,n){return`${M(e,`whole`)} ${e===1?t:n}`}function bn({data:e}){let{departments:t,summary:n}=e,{theme:r}=C(),i=s(),o=i.plural.charAt(0).toUpperCase()+i.plural.slice(1),c=(0,L.useMemo)(()=>Ct(),[]),l=P(c),u=(0,L.useMemo)(()=>vn(i.label,t.table),[i.label,t.table]),d=(0,L.useMemo)(()=>st(i.label),[i.label]),f=t.table?.rows.length,m=n.row,h=de(i),g=Et(m),_=a(m,`[Agent Hours]`),v=a(m,`[Agents In Use]`),y=a(m,`[Agent Users]`);return(0,Y.jsxs)(N,{id:p(`where-it-is-landing`),title:`Where it is landing`,description:`Which ${i.plural} get the most from their seats, and what kind of work Copilot does for people.`,actions:(0,Y.jsx)(ve,{destination:`work-patterns`,children:`Open Work patterns`}),children:[f!==void 0&&f>=3&&(0,Y.jsx)(S,{result:t,spec:d,height:gn,title:`${o} by reach and depth`,subtitle:`One circle per ${i.noun}, sized by seats. Right: more seats in use. Up: more hours per seat. Dashes: the median.`,emptyTitle:`No ${i.plural} to compare`,emptyDescription:`Nobody in the current selection has a license or a task with ${i.noun} recorded.`}),(0,Y.jsx)(b,{result:t,height:se(f??6),emptyTitle:`No ${i.plural} to compare`,emptyDescription:ue(`Nobody in the current selection has a license or a task with ${i.noun} recorded.`,i),children:e=>(0,Y.jsx)(w,{columns:u,data:e,defaultSort:[{columnId:hn,direction:`desc`}],theme:r,header:{title:`${o} by expert hours per seat`,subtitle:`${yn(e.rows.length,i.noun,i.plural)}, most expert-equivalent hours per licensed seat a month first. Shading compares the ${i.plural} with each other.${h?` ${h}`:``}`}},i.column)}),(0,Y.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,Y.jsx)(`div`,{className:`min-w-0`,children:(0,Y.jsx)(S,{result:l,spec:c.vegaLiteSpec,height:ce(l.table?.rows.length??6),title:`What the work is`,headline:dn,subtitle:`The 6 kinds of work with the most expert-equivalent hours`,emptyTitle:`No kinds of work to show`,emptyDescription:`No task in the current selection has a kind of work other than General Chat or General Assistance.`})}),(0,Y.jsx)(`div`,{className:`xl:self-start`,children:(0,Y.jsx)(x,{title:`Agents`,notes:[{term:`Agents in use`,text:v===void 0?void 0:`${yn(v,`agent`,`agents`)}, used by ${yn(y,`person`,`people`)}`},{term:`Agent work`,text:_===void 0?void 0:`${M(_,`whole`)} expert-equivalent hours${g.agentShare===void 0?``:`, ${M(Math.round(g.agentShare*100)/100,`percent`)} of the total`}`}],children:(0,Y.jsx)(ye,{destination:`leaderboards`,stage:`leaderboard`,children:`Open Leaderboards`})})})]})]})}function xn(){let{filters:e,options:t,optionsError:n}=o(),i=r(e.dateRange,t),a=i?.from,s=i?.to,c=t?.firstDate,l=t?.lastDate;return{range:(0,L.useMemo)(()=>wt(a,s,c,l),[a,s,c,l]),settled:t!==void 0||n!==void 0}}var Sn=[`--vl-blue`,`--vl-amber`,`--vl-lavender`],Cn=[`--vl-amber`,`--vl-lavender`],wn=[`dateRange`],$={connection:``,query:``},Tn=gt().query;function En(){let e=xn(),{window:t,start:n,end:r}=e.range??{},{dateRange:i}=o().filters,a=i!==void 0&&!c(i),{show:l}=ne(),u=l(`where-it-is-landing`)||l(`what-needs-attention`),d=s(u),p=ae(Sn),m=ae(Cn),g=l(`the-bottom-line`)||l(`is-it-growing`),_=t&&g,v=(0,L.useMemo)(()=>t?{months:t.months.map(Ye),rangeMonth:t.rangeMonth}:void 0,[t]),y=(0,L.useMemo)(()=>mt(v&&{...v,colors:p}),[v,p]),b=(0,L.useMemo)(()=>$e(v&&{...v,colors:m}),[v,m]),x=F({...yt(),lead:!0,speculate:!0}),S=F(l(`the-bottom-line`)?{...ut(),lead:!0,speculate:!0}:{...ut(),...$}),C=P(g&&!a?{...y,query:Tn,lead:!0,speculate:!0}:_?{...y,lead:!0,speculate:!0}:{...y,...$},a&&_?[f(`'Calendar'[Date]`,t.from,t.to)]:[],wn),w=t?C:{...C,table:void 0,error:void 0,isLoading:!0},T=I&&_&&n&&r,E=(0,L.useMemo)(()=>T?tt({trend:t,range:{from:n,to:r}}).query:``,[T,t,n,r]),{trend:D,range:ee}=Ce(T?{...b,query:E}:{...b,...$},et,[],wn),O=(0,L.useMemo)(()=>h(ot(),d),[d]);return{range:e,summary:x,hoursRange:S,months:w,monthsSource:y,credits:D,creditsSource:b,creditsInRange:ee,departments:P(u?O:{...O,...$})}}function Dn(){let e=En(),{optionsError:t,retryOptions:n}=o(),{show:r}=ne();return t?(0,Y.jsx)(D,{message:E(t.message)?t.message:`The dates with Copilot activity couldn't be read: ${t.message}`,onRetry:n}):e.range.settled&&!e.range.range?(0,Y.jsx)(k,{title:`No Copilot activity in this date range`,description:`Choose a date range that overlaps the days with Copilot activity. The summary covers only those days.`}):(0,Y.jsxs)(`div`,{className:`flex flex-col gap-800`,children:[r(`the-bottom-line`)&&(0,Y.jsx)(sn,{data:e}),r(`the-bottom-line`)&&(0,Y.jsx)(pe,{page:`executive`}),r(`is-it-growing`)&&(0,Y.jsx)(mn,{data:e}),r(`where-it-is-landing`)&&(0,Y.jsx)(bn,{data:e}),r(`what-needs-attention`)&&(0,Y.jsx)(Qt,{data:e})]})}function On(){return(0,Y.jsx)(Se,{readModel:I,children:(0,Y.jsx)(Dn,{})})}export{On as ExecutiveScreen};