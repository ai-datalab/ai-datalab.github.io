import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{n as t,t as n}from"./createLucideIcon-BXuy7Wl9.js";import{D as r,E as i,N as a,f as o,l as s,m as c,t as l,y as u}from"./utils-DnEkKV8k.js";import{i as d,r as f,t as p}from"./report-panels-DwLM6Rpw.js";import{n as m}from"./theme.context-DAf6QFTA.js";import{t as h}from"./dist-C6OMN8hb.js";import{B as g,F as _,H as v,P as y,R as b,n as x,r as ee,v as S,x as C}from"./filter.context-B12W-yPP.js";import{E as w,N as T,T as E,U as te,W as D,w as ne}from"./task-times.context-EYcU9ots.js";import{n as O}from"./source-availability.context-TakXwPC5.js";import{i as re}from"./stage-filter.context-BO0XkIwy.js";import{S as ie,c as ae,f as oe,s as se}from"./root-CRApTEns.js";import{a as ce,n as k,o as le,t as A}from"./kpi-card-DKYJImkv.js";import{t as j}from"./format-kpi-BhveZiQQ.js";import{t as M}from"./section-D7HRVQ3G.js";import{n as ue,t as de}from"./department-coverage-Bp5A0Je6.js";import{r as fe}from"./headline-CtXokBCs.js";import{t as pe}from"./page-panel-gate-Cgq8rm8f.js";import{r as N,t as P}from"./use-table-query-BmpceXRL.js";import{t as me}from"./not-filtered-hint-DfNXycMa.js";import{a as he,n as ge,t as _e}from"./heat-8QSkQ0lH.js";import{n as ve,t as ye}from"./open-destination-link-swbpVnmS.js";import{A as be,U as xe,et as Se,r as Ce,t as we}from"./use-consumption-query-CsVSpxtr.js";import{a as Te,o as Ee}from"./agents-B-Fx0Miy.js";import{c as De,l as F,o as Oe}from"./headlines-NJkNXTBL.js";import{a as ke,r as Ae}from"./feedback-CCuivYej.js";import{i as je,t as Me}from"./licensing-BigloHJ9.js";var Ne={name:`circle-alert`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`,key:`1pkeuh`}],[`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`,key:`4dfq90`}]],aliases:[`alert-circle`]};Ne.node;var Pe=n(Ne),I=e(t(),1),Fe=`EVALUATE\r
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
`,Ie={"[Last Date]":{name:`Last Date`,displayName:`Credits through`}};function Le(){return{connection:`cc`,filters:te,query:Fe,columnMetadata:Ie}}var Re=`EVALUATE\r
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
`,ze={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{calculate:`timeFormat(toDate(datum['Month Start']), '%b %Y')`,as:`Month`},{calculate:`1`,as:`Emphasis`},{fold:[`Studio Credits`,`Cowork Credits`],as:[`Series`,`Value`]},{filter:`isValid(datum.Value) && datum.Value > 0`},{calculate:`datum.Series === 'Studio Credits' ? 'Copilot Studio agents' : 'Cowork'`,as:`Source`},{calculate:`indexof(['Studio Credits', 'Cowork Credits'], datum.Series)`,as:`Rank`}],encoding:{x:{field:`Month`,type:`ordinal`,title:null,sort:null,scale:{paddingInner:.45,paddingOuter:.25},axis:{labelAngle:0,ticks:!1}}},layer:[{mark:{type:`bar`},encoding:{y:{aggregate:`sum`,field:`Value`,type:`quantitative`,title:null,stack:`zero`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`,minExtent:48,tickCount:4}},color:{field:`Source`,type:`nominal`,title:null,sort:null,scale:{domain:[`Copilot Studio agents`,`Cowork`],range:[`#c46a12`,`#8783ff`]},legend:{orient:`top`,direction:`horizontal`,symbolType:`square`,symbolLimit:10,labelLimit:240}},order:{field:`Rank`,type:`quantitative`,sort:`ascending`},opacity:{field:`Emphasis`,type:`quantitative`,scale:null,legend:null},tooltip:[{field:`Month`,type:`ordinal`,title:`Month`},{field:`Source`,type:`nominal`,title:`Source`},{field:`Value`,type:`quantitative`,aggregate:`sum`,title:`Credits`,format:`,.0f`}]}},{transform:[{aggregate:[{op:`sum`,field:`Value`,as:`Total`},{op:`max`,field:`Emphasis`,as:`Emphasis`}],groupby:[`Month`]},{calculate:`abs(datum.Total) < 1000 ? format(datum.Total, ',.0f') : compactFormat(datum.Total, '#,0')`,as:`Total Label`}],mark:{type:`text`,baseline:`bottom`,dy:-4,fontWeight:600},encoding:{y:{field:`Total`,type:`quantitative`,title:null},text:{field:`Total Label`,type:`nominal`},opacity:{field:`Emphasis`,type:`quantitative`,scale:null,legend:null}}}]},Be=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];function Ve(e){return`${e.slice(0,7)}-01`}function He(e,t){let[n,r]=e.split(`-`).map(Number);return new Date(Date.UTC(n,r-1+t,1)).toISOString().slice(0,10)}function L(e){let[t,n]=e.split(`-`).map(Number);return new Date(Date.UTC(t,n,0)).getUTCDate()}function Ue(e){return`${e.slice(0,8)}${String(L(e)).padStart(2,`0`)}`}function R(e){return Be[Number(e.slice(5,7))-1]}function We(e,t,n=6){let r=Ve(t),i=Array.from({length:n},(e,t)=>He(r,t-(n-1)));return{from:i[0],to:t,months:i,rangeMonth:Ve(e)}}function Ge(e,t){if(t<e)return;let n=Ve(t),r=Ue(n)===t?n:He(n,-1),i=He(r,-1);return i>=e?{current:r,previous:i}:void 0}var Ke=new Intl.NumberFormat(`en-GB`,{style:`percent`,maximumFractionDigits:0}),qe=new Intl.NumberFormat(`en-GB`,{maximumFractionDigits:1,minimumFractionDigits:1});function Je(e){return typeof e==`number`&&Number.isFinite(e)}function Ye(e,t,n,r){if(!Je(n)||!Je(r))return;let i=`${R(t.current)} vs ${R(t.previous)}`,a,o,s=i;if(e===`volume`){if(r<=0)return;a=n/L(t.current)/(r/L(t.previous))-1,o=Ke.format(Math.abs(a)),s=`${i}, per day`}else e===`rate`?(a=(n-r)*100,o=`${qe.format(Math.abs(a))} pp`):(a=n-r,o=qe.format(Math.abs(a)));let c=/^0(\.0)?(%| pp)?$/.test(o);return{direction:c?`flat`:a>0?`up`:`down`,amount:c?`No change`:o,comparison:s}}var Xe=.35;function Ze(e){return`${R(e)} ${e.slice(0,4)}`}function Qe(e){return/^\d{4}-\d{2}-\d{2}$/.test(e)?e:void 0}function $e(e,t={}){let n=structuredClone(e);t.months?.length&&(n.encoding.x.scale.domain=[...t.months]);let r=t.rangeMonth?Qe(t.rangeMonth):void 0,i=n.transform.find(e=>e.as===`Emphasis`);i&&r&&(i.calculate=`datum['Month Start'] < '${r}' ? ${Xe} : 1`);let a=n.layer[0].encoding.color;return t.colors?.length===a.scale.domain.length&&(a.scale.range=[...t.colors]),n}var et={"[Month Start]":{name:`Month Start`,displayName:`Month`,format:`mmm yyyy`},"[Studio Credits]":{name:`Studio Credits`,displayName:`Copilot Studio agents`,format:`#,0`},"[Cowork Credits]":{name:`Cowork Credits`,displayName:`Cowork`,format:`#,0`}};function tt(e){return{connection:`cc`,filters:D,query:Re,columnMetadata:et,vegaLiteSpec:$e(ze,e)}}var nt=[`trend`,`range`];function rt(e,t){let n=g(Re),r=t=>`    ADDCOLUMNS(
        CALCULATETABLE(
${n}
,
            ${xe(e[t].from,e[t].to)}
        ),
        "Part", "${t}"
    )`;return{...tt(t),query:`EVALUATE\nUNION(\n${nt.map(r).join(`,
`)}\n)\nORDER BY [Part], [Month Start]\n`}}var it=`DEFINE\r
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
`,at={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,layer:[{transform:[{aggregate:[{op:`median`,field:`Seats In Use Pct`,as:`Seats In Use Pct`}]}],mark:{type:`rule`,strokeDash:[4,3],color:`#8a8886`},encoding:{x:{field:`Seats In Use Pct`,type:`quantitative`,title:`Licensed seats in use`}}},{transform:[{aggregate:[{op:`median`,field:`Hours Per Seat Month`,as:`Hours Per Seat Month`}]}],mark:{type:`rule`,strokeDash:[4,3],color:`#8a8886`},encoding:{y:{field:`Hours Per Seat Month`,type:`quantitative`,title:`Expert hours per seat a month`,axis:{format:`,.2f`,labelExpr:`format(datum.value, ',.2f')`,tickCount:5}}}},{mark:{type:`circle`,opacity:.75},encoding:{x:{field:`Seats In Use Pct`,type:`quantitative`,title:`Licensed seats in use`,scale:{zero:!1},axis:{format:`.0%`,tickCount:5}},y:{field:`Hours Per Seat Month`,type:`quantitative`,title:`Expert hours per seat a month`,axis:{format:`,.2f`,labelExpr:`format(datum.value, ',.2f')`,tickCount:5}},size:{field:`Licensed Seats`,type:`quantitative`,legend:null,scale:{range:[40,640]}},tooltip:[{field:`Chat + Agent Org DataOrganization`,type:`nominal`,title:`Group`},{field:`Seats In Use Pct`,type:`quantitative`,title:`Seats in use`,format:`.0%`},{field:`Hours Per Seat Month`,type:`quantitative`,title:`Hours per seat a month`,format:`,.2f`},{field:`Licensed Seats`,type:`quantitative`,title:`Licensed seats`,format:`,.0f`},{field:`Habit Pct`,type:`quantitative`,title:`Habit rate`,format:`.0%`}]}},{transform:[{window:[{op:`row_number`,as:`Seat Rank`}],sort:[{field:`Licensed Seats`,order:`descending`}]},{filter:`datum['Seat Rank'] <= 6`}],mark:{type:`text`,align:`left`,baseline:`middle`,dx:16,fontSize:11,limit:140},encoding:{x:{field:`Seats In Use Pct`,type:`quantitative`,title:`Licensed seats in use`},y:{field:`Hours Per Seat Month`,type:`quantitative`,title:`Expert hours per seat a month`,axis:{format:`,.2f`,labelExpr:`format(datum.value, ',.2f')`,tickCount:5}},text:{field:`Chat + Agent Org DataOrganization`,type:`nominal`}}}]},z=`Chat + Agent Org DataOrganization`,ot={"Chat + Agent Org Data[Organization]":{name:z,displayName:`Organization`},"[Licensed Seats]":{name:`Licensed Seats`,displayName:`Licensed seats`,format:`#,0`},"[Seats In Use Pct]":{name:`Seats In Use Pct`,displayName:`Seats in use`,format:c},"[Habit Pct]":{name:`Habit Pct`,displayName:`Habit rate`,format:c},"[Hours]":{name:`Hours`,displayName:`Expert-equivalent hours`,format:o},"[People]":{name:`People`,displayName:`People with a task`,format:`#,0`},"[Hours Per Seat Month]":{name:`Hours Per Seat Month`,displayName:`Hours per seat a month`,format:o}};function st(){return{connection:`vl`,query:it,columnMetadata:ot}}function ct(e){let t=structuredClone(at);for(let n of t.layer){let t=n.encoding.tooltip?.[0];t&&(t.title=e)}return t}var lt=`EVALUATE\r
// The Conservative to Optimistic range under the summary's hours, as its own\r
// query: the app asks it beside executive-summary.dax, under the same filters,\r
// so the summary's figures don't wait for it. On a large tenant it took about a\r
// quarter of the summary's time. Both columns are as they were in the summary.\r
ROW(\r
    "Hours Conservative", CALCULATE([Expert Equivalent Hours], 'Effort Scenario'[Scenario] = "Conservative"),\r
    "Hours Optimistic", CALCULATE([Expert Equivalent Hours], 'Effort Scenario'[Scenario] = "Optimistic")\r
)\r
`,ut={"[Hours Conservative]":{name:`Hours Conservative`,displayName:`Conservative hours`,format:o},"[Hours Optimistic]":{name:`Hours Optimistic`,displayName:`Optimistic hours`,format:o}};function dt(){return{connection:`vl`,query:lt,columnMetadata:ut}}var ft=`EVALUATE\r
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
`,pt={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{calculate:`timeFormat(toDate(datum['Month Start']), '%b %Y')`,as:`Month`},{calculate:`1`,as:`Emphasis`},{fold:[`Copilot Hours`,`Agent Hours`,`Cowork Hours`],as:[`Series`,`Value`]},{filter:`isValid(datum.Value) && datum.Value > 0`},{calculate:`datum.Series === 'Copilot Hours' ? 'Copilot Chat and apps' : datum.Series === 'Agent Hours' ? 'Agents' : 'Cowork'`,as:`Source`},{calculate:`indexof(['Copilot Hours', 'Agent Hours', 'Cowork Hours'], datum.Series)`,as:`Rank`}],encoding:{x:{field:`Month`,type:`ordinal`,title:null,sort:null,scale:{paddingInner:.45,paddingOuter:.25},axis:{labelAngle:0,ticks:!1}}},layer:[{mark:{type:`bar`},encoding:{y:{aggregate:`sum`,field:`Value`,type:`quantitative`,title:null,stack:`zero`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`,minExtent:48,tickCount:4}},color:{field:`Source`,type:`nominal`,title:null,sort:null,scale:{domain:[`Copilot Chat and apps`,`Agents`,`Cowork`],range:[`#4f73b8`,`#c46a12`,`#8783ff`]},legend:{orient:`top`,direction:`horizontal`,symbolType:`square`,symbolLimit:10,labelLimit:240}},order:{field:`Rank`,type:`quantitative`,sort:`ascending`},opacity:{field:`Emphasis`,type:`quantitative`,scale:null,legend:null},tooltip:[{field:`Month`,type:`ordinal`,title:`Month`},{field:`Source`,type:`nominal`,title:`Source`},{field:`Value`,type:`quantitative`,aggregate:`sum`,title:`Expert-equivalent hours`,format:`,.0f`}]}},{transform:[{aggregate:[{op:`sum`,field:`Value`,as:`Total`},{op:`max`,field:`Emphasis`,as:`Emphasis`}],groupby:[`Month`]},{calculate:`abs(datum.Total) < 1000 ? format(datum.Total, ',.0f') : compactFormat(datum.Total, '#,0')`,as:`Total Label`}],mark:{type:`text`,baseline:`bottom`,dy:-4,fontWeight:600},encoding:{y:{field:`Total`,type:`quantitative`,title:null},text:{field:`Total Label`,type:`nominal`},opacity:{field:`Emphasis`,type:`quantitative`,scale:null,legend:null}}}]},mt={"[Month Start]":{name:`Month Start`,displayName:`Month`,format:`mmm yyyy`},"[Copilot Hours]":{name:`Copilot Hours`,displayName:`Copilot Chat and apps`,format:o},"[Agent Hours]":{name:`Agent Hours`,displayName:`Agents`,format:o},"[Cowork Hours]":{name:`Cowork Hours`,displayName:`Cowork`,format:o},"[Hours]":{name:`Hours`,displayName:`Expert-equivalent hours`,format:o},"[Tasks]":{name:`Tasks`,displayName:`Tasks delivered`,format:`#,0`},"[Seats In Use Pct]":{name:`Seats In Use Pct`,displayName:`Licensed seats in use`,format:c},"[Habit Pct]":{name:`Habit Pct`,displayName:`Habit rate`,format:c},"[Satisfaction]":{name:`Satisfaction`,displayName:`Satisfaction`,format:c},"[Feedback]":{name:`Feedback`,displayName:`Ratings`,format:`#,0`}};function ht(e){return{connection:`vl`,query:ft,columnMetadata:mt,vegaLiteSpec:$e(pt,e)}}var gt=v(ft,e=>`
// With no date filter, the trend covers the 6 months to the last day of activity.
VAR _trendEnd = CALCULATE(MAX('Chat + Agent Interactions (Audit Logs)'[ActivityDate]), REMOVEFILTERS())
VAR _trendFrom = EOMONTH(_trendEnd, -6) + 1
RETURN
    CALCULATETABLE(
${e}
,
        FILTER(ALL('Calendar'[Date]), 'Calendar'[Date] >= _trendFrom && 'Calendar'[Date] <= _trendEnd)
    )
`);function _t(e){return{...ht(e),query:gt}}var vt=`DEFINE\r
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
`,yt={"[Hours]":{name:`Hours`,displayName:`Expert-equivalent hours`,format:o},"[Tasks]":{name:`Tasks`,displayName:`Tasks delivered`,format:`#,0`},"[People]":{name:`People`,displayName:`People with a task`,format:`#,0`},"[Weeks]":{name:`Weeks`,displayName:`Weeks`,format:`#,0`},"[Skills Available]":{name:`Skills Available`,displayName:`Kinds of work`,format:`#,0`},"[Licensed Seats]":{name:`Licensed Seats`,displayName:`Licensed seats`,format:`#,0`},"[Seats In Use]":{name:`Seats In Use`,displayName:`Seats in use`,format:`#,0`},"[Seats In Use Pct]":{name:`Seats In Use Pct`,displayName:`Licensed seats in use`,format:c},"[Unlicensed Users]":{name:`Unlicensed Users`,displayName:`Unlicensed users`,format:`#,0`},"[Habit Month]":{name:`Habit Month`,displayName:`Habit month`,format:`mmm yyyy`},"[Habitual Pct]":{name:`Habitual Pct`,displayName:`Habitual`,format:c},"[Power Pct]":{name:`Power Pct`,displayName:`Power`,format:c},"[Agent Users]":{name:`Agent Users`,displayName:`Agent users`,format:`#,0`},"[Agent Hours]":{name:`Agent Hours`,displayName:`Agent hours`,format:o},"[Agents In Use]":{name:`Agents In Use`,displayName:`Agents in use`,format:`#,0`},"[Satisfaction]":{name:`Satisfaction`,displayName:`Satisfaction`,format:c},"[Feedback]":{name:`Feedback`,displayName:`Ratings`,format:`#,0`},"[People With Organization]":{name:`People With Organization`,displayName:`People with an organization`,format:`#,0`}};function bt(){return{connection:`vl`,query:vt,columnMetadata:yt}}var xt=`EVALUATE\r
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
`,St={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Chat + Agent Interactions (Audit Logs)Task Breakdown Category`,type:`nominal`,title:null,sort:`-x`,axis:{labelLimit:220}},x:{field:`Hours`,type:`quantitative`,title:`Expert-equivalent hours`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`,tickCount:4}},tooltip:[{field:`Chat + Agent Interactions (Audit Logs)Task Breakdown Category`,type:`nominal`,title:`Kind of work`},{field:`Hours`,type:`quantitative`,title:`Expert-equivalent hours`,format:`,.0f`},{field:`Tasks`,type:`quantitative`,title:`Tasks`,format:`,.0f`},{field:`People`,type:`quantitative`,title:`People`,format:`,.0f`}]}},Ct={"Chat + Agent Interactions (Audit Logs)[Task Breakdown Category]":{name:`Chat + Agent Interactions (Audit Logs)Task Breakdown Category`,displayName:`Kind of work`},"[Hours]":{name:`Hours`,displayName:`Expert-equivalent hours`,format:o},"[Tasks]":{name:`Tasks`,displayName:`Tasks`,format:`#,0`},"[People]":{name:`People`,displayName:`People`,format:`#,0`}};function wt(){return{connection:`vl`,query:xt,columnMetadata:Ct,vegaLiteSpec:structuredClone(St)}}function B(e){return e?e.rows.map(t=>Object.fromEntries(e.columns.map((e,n)=>[e.name,t[n]]))):[]}function V(e,t){return e===void 0||t===void 0||t<=0?void 0:e/t}function H(...e){let t=e.filter(e=>e!==void 0);return t.length===0?void 0:t.reduce((e,t)=>e+t,0)}function Tt(e,t,n,r){if(!n||!r)return;let i=e&&e>n?e:n,a=t&&t<r?t:r;if(!(a<i))return{start:i,end:a,window:We(i,a),pair:Ge(i,a)}}function Et(e){let t=new Map;for(let n of e){let e=n[`Month Start`];typeof e==`string`&&t.set(e.slice(0,10),n)}return t}function U(e,t,n,r,i){if(!t)return;let a=Ye(e,t,r(n.get(t.current)),r(n.get(t.previous)));return a&&(i?{...a,polarity:i}:a)}function W(e,t,n,r){if(!t)return;let i=[];for(let a of t.window.months){if(a<t.start||Ue(a)>t.end)continue;let o=r(n.get(a));o!==void 0&&Number.isFinite(o)&&i.push({label:R(a),value:e===`volume`?o/L(a):o})}if(i.length<3)return;let a=i[0],o=i[i.length-1],s=a.value===0?o.value-a.value:(o.value-a.value)/Math.abs(a.value),c=Math.abs(s)<.01?`about level`:s>0?`higher at the end`:`lower at the end`;return{points:i,description:`Trend by full month${e===`volume`?`, per day`:``}, ${a.label} to ${o.label}: ${c}.`}}function Dt(e){let t=i(e,`[Hours]`),n=i(e,`[Tasks]`),r=i(e,`[People]`),a=i(e,`[Weeks]`),o=r!==void 0&&a!==void 0?r*a:void 0,s=t===void 0?void 0:t*60,c=i(e,`[Habitual Pct]`),l=i(e,`[Power Pct]`);return{minutesPerPersonWeek:V(s,o),tasksPerPersonWeek:V(n,o),minutesPerTask:V(s,n),agentShare:V(i(e,`[Agent Hours]`),t),habitRate:c===void 0&&l===void 0?void 0:(c??0)+(l??0)}}function Ot(e,t){if(e.refreshing||t.refreshing)return{status:`pending`};if(t.error!==void 0)return{status:`error`,message:t.error};if(!e.loaded||!t.loaded)return{status:`pending`};let n=i(t.row,`[Hours Conservative]`),r=i(t.row,`[Hours Optimistic]`);return n===void 0||r===void 0?{status:`none`}:{status:`ready`,conservative:n,optimistic:r}}var kt=new Intl.ListFormat(`en-GB`,{style:`long`,type:`conjunction`});function At(e){return kt.format(e)}var jt=new Intl.DateTimeFormat(`en-GB`,{day:`numeric`,month:`short`,year:`numeric`,timeZone:`UTC`}),Mt=new Intl.DateTimeFormat(`en-GB`,{month:`long`,timeZone:`UTC`});function G(e){if(typeof e==`string`&&/^\d{4}-\d{2}-\d{2}/.test(e))return jt.format(new Date(`${e.slice(0,10)}T00:00:00Z`))}function K(e){if(typeof e==`string`&&/^\d{4}-\d{2}/.test(e))return Mt.format(new Date(`${e.slice(0,7)}-01T00:00:00Z`))}var q=[`idle-seats`,`cowork-over-allowance`,`enablement-gap`,`weakest-theme`],Nt=.25,Pt=.5,J=new Intl.NumberFormat(void 0,{style:`percent`,maximumFractionDigits:0});function Y(e,t,n){return e===1?t:n}function Ft(e){return e.charAt(0).toLowerCase()+e.slice(1)}function It({summary:e,dormancy:t,estate:n}){let a=i(n,`[License Inventory Usable]`);if(a===void 0||a===0||!t)return;let o=t.map(e=>({order:i(e,`Dormancy Bucket Order`),name:r(e,`Dormancy Bucket`),seats:i(e,`Licensed Users`)??0})).filter(e=>e.order!==void 0&&e.seats>0),s=o.reduce((e,t)=>e+t.seats,0),c=o.filter(e=>(e.order??0)>=2).sort((e,t)=>t.seats-e.seats||(e.order??0)-(t.order??0)),l=c.reduce((e,t)=>e+t.seats,0);if(s<=0||l===0||l/s<.05)return;let u=At(c.map(e=>`${j(e.seats,`whole`)} ${Ft(e.name??`idle`)}`)),d=i(e,`[Unlicensed Users]`)??0,f=d>0?` ${j(d,`whole`)} ${Y(d,`person already uses`,`people already use`)} Copilot without a license.`:``;return{rule:`idle-seats`,tone:`caution`,title:`Reassign ${j(l,`whole`)} idle ${Y(l,`seat`,`seats`)}`,evidence:`Licensed seats with no Copilot activity in 30 days or more: ${u}.${f}`,reach:l,stake:`${J.format(l/s)} of seats`,link:{destination:`readiness`,stage:`license-readiness`,label:`Open Readiness`}}}function Lt({cowork:e}){let t=i(e,`[Users Over Limit]`),n=i(e,`[Consuming Users]`);if(t===void 0||n===void 0)return;let a=Math.round(t*n);if(a<1)return;let o=r(e,`[Period Label]`),s=i(e,`[Policies]`)??0,c=s>0?`, across ${j(s,`whole`)} spending ${Y(s,`policy`,`policies`)}`:``;return{rule:`cowork-over-allowance`,tone:`negative`,title:`${j(a,`whole`)} ${Y(a,`person is`,`people are`)} over their Cowork allowance`,evidence:`${J.format(t)} of the ${j(n,`whole`)} people using Cowork${o?` in ${o}`:``} went past their spending policy's credit limit${c}.`,reach:a,stake:`${J.format(t)} of Cowork users`,link:{destination:`consumption`,stage:`cowork-credits`,label:`Open Consumption`}}}function Rt(e){if(e.length===0)return;let t=[...e].sort((e,t)=>e-t);return t[Math.floor((t.length-1)*Nt)]}function zt({departments:e,orgPlural:t}){let n=(e??[]).map(e=>({name:r(e,z),seats:i(e,`Licensed Seats`)??0,hours:i(e,`Hours Per Seat Month`)})).filter(e=>e.name!==void 0&&e.seats>0&&e.hours!==void 0);if(n.length<4)return;let a=Rt(n.map(e=>e.hours))??0,o=n.reduce((e,t)=>e+t.seats,0),s=n.reduce((e,t)=>e+t.hours*t.seats,0)/o,c=n.filter(e=>e.hours<=a&&e.hours<s).sort((e,t)=>e.hours-t.hours||e.name.localeCompare(t.name)),l=c.reduce((e,t)=>e+Pt*(s-t.hours)*t.seats*3,0);if(c.length===0||Math.round(l)<1)return;let u=At(c.map(e=>e.name)),d=c.length===1,f=c.reduce((e,t)=>e+t.seats,0);return{rule:`enablement-gap`,tone:`caution`,title:`Focus enablement on ${u}`,evidence:`${d?`It is`:`They are`} in the bottom quarter of ${t} for expert hours per seat. Closing half ${d?`its`:`their`} gap to the average of ${j(s,`hours`)} hours per seat a month would add about ${j(l,`whole`)} expert hours a quarter.`,reach:f,stake:`+${j(l,`whole`)} hours a quarter`,link:{destination:`adoption`,label:`Open Adoption`}}}function Bt({summary:e,themes:t}){let n=i(e,`[Satisfaction]`);if(n===void 0||!t)return;let a=new Map;for(let e of t){let t=r(e,`Category`),n=i(e,`Total Feedback`),o=i(e,`Satisfaction`);t&&n!==void 0&&o!==void 0&&!a.has(t)&&a.set(t,{total:n,rate:o})}let[o]=[...a].map(([e,t])=>({name:e,...t})).filter(e=>e.total>=20&&e.rate<n).sort((e,t)=>e.rate-t.rate||t.total-e.total||e.name.localeCompare(t.name));if(!o)return;let s=Math.round((n-o.rate)*100);if(!(s<1))return{rule:`weakest-theme`,tone:`caution`,title:`${o.name} is the least liked theme`,evidence:`${J.format(o.rate)} thumbs up across ${j(o.total,`whole`)} ratings, against ${J.format(n)} across all feedback.`,reach:o.total,stake:`${s} pp below overall`,link:{destination:`feedback`,stage:`feedback`,label:`Open Feedback`}}}var Vt={"idle-seats":It,"cowork-over-allowance":Lt,"enablement-gap":zt,"weakest-theme":Bt};function Ht(e){return q.map(t=>Vt[t](e)).filter(e=>e!==void 0).sort((e,t)=>t.reach-e.reach||q.indexOf(e.rule)-q.indexOf(t.rule))}var X=a(),Ut=[ke],Wt={connection:``,query:``},Gt={negative:{Icon:Pe,className:`text-negative`,label:`Problem`},caution:{Icon:ie,className:`text-caution`,label:`Opportunity`}};function Kt({item:e}){let t=Gt[e.tone];return(0,X.jsxs)(`li`,{className:`grid grid-cols-[16px_minmax(0,1fr)] gap-x-300 gap-y-200 px-500 py-400 sm:grid-cols-[16px_minmax(0,1fr)_auto]`,children:[(0,X.jsx)(t.Icon,{className:l(`icon-size-200 mt-[2px]`,t.className),"aria-hidden":`true`}),(0,X.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,X.jsxs)(`h3`,{className:l(se,`font-semibold text-foreground`),children:[(0,X.jsxs)(`span`,{className:`sr-only`,children:[t.label,`: `]}),e.title]}),(0,X.jsx)(`p`,{className:l(ae,`max-w-[72ch] text-muted-foreground`),children:e.evidence})]}),(0,X.jsxs)(`div`,{className:`col-start-2 flex flex-col items-start gap-100 sm:col-start-3 sm:items-end`,children:[(0,X.jsx)(`span`,{className:l(ae,`font-semibold text-foreground`),children:e.stake}),(0,X.jsx)(ve,{destination:e.link.destination,stage:e.link.stage,children:e.link.label})]})]})}function qt(e,t,n){let r=n?` Updated ${n}.`:``;switch(e.kind){case`complete`:return`Every agent session matches a registered agent; ${j(e.seenInUse,`whole`)} of ${j(e.registryAgents,`whole`)} are in use.${r}`;case`partial`:return`${j(e.unmatchedSessions,`whole`)} agent sessions came from agents it doesn't list.${r}`;case`none`:return`None of the ${j(e.unmatchedSessions,`whole`)} agent sessions match an agent it lists, so agents go by the names the audit log gives them.${r}`;default:return t===void 0?void 0:`${j(t,`whole`)} agents listed, with no agent sessions yet to match against them.${r}`}}function Jt(e){if(e!==void 0)return e===0?`Doesn't reconcile with activity yet, so idle seats can't be counted. Readiness explains why.`:`Reconciles with activity`}function Yt(e){let t=e.filter(e=>e.error!==void 0);if(t.length!==0)return{message:t[0].error,retry:()=>t.forEach(e=>e.refetch())}}function Xt(e){return`loaded`in e?e.loaded:!e.isLoading}function Zt({data:e}){let{summary:t,departments:n}=e,a=ee(),{options:o}=x(),c=(0,I.useMemo)(()=>Me(),[]),l=(0,I.useMemo)(()=>Ae(),[]),u=(0,I.useMemo)(()=>F?be():{...be(),...Wt},[]),d=(0,I.useMemo)(()=>F?Le():{...Le(),...Wt},[]),p=N(c),m=P(je()),h=N(l,Ut),g=we(u),_=we(d),v=P(Te()),b=[t,n,p,m,h,...F?[g]:[]],S=Yt(b),C=b.every(Xt),T=(0,I.useMemo)(()=>C?Ht({summary:t.row,dormancy:B(p.table),estate:m.row,departments:B(n.table),cowork:g.row,themes:B(h.table),orgPlural:a.plural}):[],[C,t.row,p.table,m.row,n.table,g.row,h.table,a.plural]),te=Ee(v.row),D=G(r(_.row,`[Last Date]`)),O=G(o?.lastDate);return(0,X.jsxs)(M,{id:s(`what-needs-attention`),title:`What needs attention`,description:`Decisions the data points to, the most people or hours affected first.`,children:[(0,X.jsx)(me,{from:[m.notFilteredBy,h.notFilteredBy,F?g.notFilteredBy:void 0,v.notFilteredBy]}),(0,X.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,X.jsx)(`div`,{className:`min-w-0`,children:S?(0,X.jsx)(E,{message:S.message,onRetry:S.retry}):C?T.length===0?(0,X.jsx)(ne,{title:`Nothing needs attention`,description:`No rule found anything to raise: idle seats, Cowork allowances, the gap between ${a.plural} and the least liked feedback theme are all within bounds.`}):(0,X.jsx)(`ol`,{"aria-label":`What needs attention`,className:`flex flex-col divide-y divide-border rounded-xl border border-border bg-card`,children:T.map(e=>(0,X.jsx)(Kt,{item:e},e.rule))}):(0,X.jsx)(w,{className:`h-[320px]`})}),(0,X.jsx)(`div`,{className:`xl:self-start`,children:(0,X.jsx)(f,{title:`Can we trust these numbers?`,notes:[{term:`Activity data`,text:O&&`Through ${O}`},{term:`Credit data`,text:F&&D?`Through ${D}`:void 0},{term:`License inventory`,text:Jt(i(m.row,`[License Inventory Usable]`))},{term:`People with ${y(a.noun)}`,text:de(a)},{term:`Agent registry`,text:qt(te,i(v.row,`[Registry Agents]`),G(r(v.row,`[Registry Updated]`)))}]})})]})]})}function Qt({label:e,value:t}){return(0,X.jsxs)(`div`,{className:`flex items-baseline justify-between gap-200`,children:[(0,X.jsx)(`span`,{children:e}),(0,X.jsx)(`span`,{className:`font-numeric font-semibold whitespace-nowrap tabular-nums text-[length:var(--text-300)] text-foreground`,children:t})]})}var $t=`Conservative to Optimistic`;function en({range:e,onRetry:t}){switch(e.status){case`ready`:return(0,X.jsx)(Qt,{label:$t,value:`${j(e.conservative,`whole`)} – ${j(e.optimistic,`whole`)}`});case`none`:return null;case`pending`:return(0,X.jsxs)(`div`,{className:`flex items-center justify-between gap-200`,children:[(0,X.jsx)(`span`,{children:$t}),(0,X.jsxs)(`span`,{role:`status`,"data-query-loading":``,children:[(0,X.jsx)(`span`,{className:`sr-only`,children:`Loading`}),(0,X.jsx)(`span`,{"aria-hidden":`true`,className:`block h-200 w-[10ch] animate-pulse rounded-sm bg-muted`})]})]});case`error`:{let n=T(e.message);return(0,X.jsxs)(`div`,{className:`flex flex-wrap items-baseline justify-between gap-x-200`,children:[(0,X.jsx)(`span`,{children:$t}),(0,X.jsxs)(`span`,{className:`flex items-baseline gap-200`,children:[(0,X.jsx)(`span`,{title:n?void 0:e.message,children:n?`Power BI is busy`:`Didn't load`}),(0,X.jsx)(`button`,{type:`button`,onClick:t,className:`font-semibold text-foreground underline underline-offset-2 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`,children:`Try again`})]})]})}}}function Z({children:e}){return(0,X.jsx)(`div`,{className:`flex flex-col gap-100`,children:e})}function tn({title:e,className:t,children:n}){return(0,X.jsxs)(`div`,{className:`flex flex-col gap-300`,children:[(0,X.jsx)(`h3`,{className:l(se,`font-semibold text-foreground`),children:e}),(0,X.jsx)(`div`,{className:t,children:n})]})}var Q=e=>t=>i(t,e),nn=e=>H(i(e,`Studio Credits`),i(e,`Cowork Credits`)),rn=F?`grid gap-300 md:grid-cols-3`:`grid gap-300 md:grid-cols-2`;function an(e){return e?F?{scope:`to satisfaction or credits`,reason:`feedback isn't linked to people, and Consumption Central records credits for the whole tenant.`}:{scope:`to satisfaction`,reason:`feedback isn't linked to people, so it covers everyone.`}:F?{scope:`to credits`,reason:`Consumption Central records credits for the whole tenant.`}:void 0}function on({data:e}){let{summary:t,hoursRange:n,months:a,credits:o,creditsInRange:c,range:d}=e,f=t.row,p=d.range?.pair,m=!u(O(),`productFeedback`),h=an(m),g=(0,I.useMemo)(()=>Et(B(a.table)),[a.table]),_=(0,I.useMemo)(()=>Et(B(o.table)),[o.table]),v=(0,I.useMemo)(()=>{let e=B(c.table),t=H(...e.map(e=>i(e,`Studio Credits`))),n=H(...e.map(e=>i(e,`Cowork Credits`)));return{studio:t,cowork:n,total:H(t,n)}},[c.table]),y=Dt(f),b=K(r(f,`[Habit Month]`)),x=p?`Arrows compare ${K(p.current)}, the last full month, with ${K(p.previous)}; totals are compared per day so month length doesn't skew them.`:`Arrows comparing one month with the one before appear when the date range covers two full months.`;return(0,X.jsxs)(M,{id:s(`the-bottom-line`),title:`The bottom line`,description:`What Copilot did, how widely people use it, and whether it is becoming how they work. ${x}`,children:[t.error===void 0?t.loaded?f?(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)(tn,{title:`Is it doing real work?`,className:rn,children:[(0,X.jsx)(A,{label:`Expert-equivalent hours · Typical effort`,value:i(f,`[Hours]`),emphasis:!0,delta:U(`volume`,p,g,Q(`Hours`)),trend:W(`volume`,d.range,g,Q(`Hours`)),detail:(0,X.jsxs)(Z,{children:[(0,X.jsx)(en,{range:Ot(t,n),onRetry:n.refetch}),y.minutesPerPersonWeek!==void 0&&(0,X.jsx)(Qt,{label:`Per person a week`,value:`${j(y.minutesPerPersonWeek,`whole`)} min`})]})}),(0,X.jsx)(A,{label:`Tasks delivered`,value:i(f,`[Tasks]`),delta:U(`volume`,p,g,Q(`Tasks`)),trend:W(`volume`,d.range,g,Q(`Tasks`)),detail:(0,X.jsxs)(Z,{children:[(0,X.jsx)(k,{label:`Per person a week`,value:y.tasksPerPersonWeek,format:`hours`}),(0,X.jsx)(k,{label:`Expert minutes per task`,value:y.minutesPerTask,format:`hours`})]})}),F&&(c.error===void 0?c.isLoading?(0,X.jsx)(w,{}):(0,X.jsx)(A,{label:`Credits consumed · whole tenant`,value:v.total===void 0?void 0:v.total/1e6,format:`millions`,delta:U(`volume`,p,_,nn,`neutral`),trend:W(`volume`,d.range,_,nn),detail:(0,X.jsxs)(Z,{children:[(0,X.jsx)(k,{label:`Copilot Studio agents`,value:v.studio===void 0?void 0:v.studio/1e6,format:`millions`}),(0,X.jsx)(k,{label:`Cowork`,value:v.cowork===void 0?void 0:v.cowork/1e6,format:`millions`})]})}):(0,X.jsx)(E,{message:c.error,onRetry:c.refetch}))]}),(0,X.jsxs)(tn,{title:`Is it becoming how people work?`,className:l(`grid gap-300`,m?`md:grid-cols-3`:`md:grid-cols-2`),children:[(0,X.jsx)(A,{label:`Licensed seats in use`,value:i(f,`[Seats In Use Pct]`),format:`percent`,delta:U(`rate`,p,g,Q(`Seats In Use Pct`)),trend:W(`rate`,d.range,g,Q(`Seats In Use Pct`)),detail:(0,X.jsxs)(Z,{children:[(0,X.jsx)(k,{label:`Licensed seats`,value:i(f,`[Licensed Seats]`)}),(0,X.jsx)(k,{label:`Seats in use`,value:i(f,`[Seats In Use]`)})]})}),(0,X.jsx)(A,{label:b?`Habit rate · ${b}`:`Habit rate`,value:y.habitRate,format:`percent`,delta:U(`rate`,p,g,Q(`Habit Pct`)),trend:W(`rate`,d.range,g,Q(`Habit Pct`)),detail:(0,X.jsxs)(Z,{children:[(0,X.jsx)(k,{label:`Habitual`,value:i(f,`[Habitual Pct]`),format:`percent`}),(0,X.jsx)(k,{label:`Power`,value:i(f,`[Power Pct]`),format:`percent`})]})}),m&&(0,X.jsx)(A,{label:`Satisfaction · thumbs up`,value:i(f,`[Satisfaction]`),format:`percent`,delta:U(`rate`,p,g,Q(`Satisfaction`)),trend:W(`rate`,d.range,g,Q(`Satisfaction`)),detail:(0,X.jsx)(Z,{children:(0,X.jsx)(k,{label:`Ratings`,value:i(f,`[Feedback]`)})})})]})]}):(0,X.jsx)(ne,{title:`No Copilot activity`,description:`The semantic model returned nothing for the current selection.`}):(0,X.jsx)(`div`,{className:rn,children:Array.from({length:F?3:2},(e,t)=>(0,X.jsx)(w,{},t))}):(0,X.jsx)(E,{message:t.error,onRetry:t.refetch}),h&&(0,X.jsx)(De,{ignored:[`organizations`],scope:h.scope,reason:h.reason})]})}function sn(e,t,n){return r=>{let i=e.map(e=>r.columns.findIndex(t=>t.name===e));if(i.every(e=>e<0))return;let a=r.rows.map(e=>{let t=i.map(t=>t<0?void 0:e[t]).filter(e=>typeof e==`number`&&Number.isFinite(e));return[...e,t.length?t.reduce((e,t)=>e+t,0):null]});return n({...r,columns:[...r.columns,{name:t,displayName:t}],rows:a})}}var cn=fe({date:`Month Start`,value:`Hours`,of:`expert-equivalent hours`,period:`month`,format:`hours`}),ln=sn([`Studio Credits`,`Cowork Credits`],`Credits`,fe({date:`Month Start`,value:`Credits`,of:`credits`,period:`month`})),un=Oe({label:`Chat + Agent Interactions (Audit Logs)Task Breakdown Category`,value:`Hours`,of:`expert-equivalent hours`,format:`hours`}),dn=340,fn=`Six months to the end of the date range; months before it are faded`;function pn({data:e}){let{months:t,monthsSource:n,credits:r,creditsSource:a,summary:o}=e,c=i(o.row,`[Skills Available]`);return(0,X.jsx)(M,{id:s(`is-it-growing`),title:`Is it growing?`,description:F?`Expert-equivalent hours and credits consumed each month, on one timeline. Each colour is the same source in both charts.`:`Expert-equivalent hours each month, by where the work was done.`,actions:(0,X.jsx)(ve,{destination:`value`,stage:`task-breakdown`,children:`Open Value`}),children:(0,X.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,X.jsxs)(`div`,{className:`flex min-w-0 flex-col gap-300`,children:[(0,X.jsx)(p,{result:t,spec:n.vegaLiteSpec,height:dn,title:`Work delivered by month`,headline:cn,subtitle:`Expert-equivalent hours. ${fn}`,emptyTitle:`No work in these months`,emptyDescription:`There's no Copilot activity in the six months to the end of the date range.`}),F&&(0,X.jsx)(me,{from:[r.notFilteredBy]}),F&&(0,X.jsx)(p,{result:r,spec:a.vegaLiteSpec,height:dn,title:`Credits consumed by month`,headline:ln,subtitle:`Whole tenant. ${fn}`,emptyTitle:`No credits in these months`,emptyDescription:`Consumption Central has no Copilot Studio or Cowork credits in the six months to the end of the date range.`})]}),(0,X.jsx)(`div`,{className:`xl:self-start`,children:(0,X.jsx)(f,{title:`How this is worked out`,notes:[{term:`Expert-equivalent hours`,text:`Each task counts the minutes an expert typically takes to do it without Copilot, from the Signal → Impact table. Typical effort; Conservative and Optimistic give the range.`},{term:`Tasks`,text:c===void 0?`Copilot interactions, each sorted into a kind of work.`:`Copilot interactions, sorted into ${j(c,`whole`)} kinds of work.`},{term:`Credits`,text:F?`Copilot Studio and Cowork credits from Consumption Central, for the whole tenant.`:void 0}],children:(0,X.jsx)(ye,{destination:`value`,stage:`cost-vs-value`,children:`Need it in money? Open Cost vs value`})})})]})})}var mn=`Hours Per Seat Month`,hn=360;function gn(e,t,n,r){return{id:t,header:n,width:r,numericStyling:!0,cellRenderer:he({domain:ge(e,t),format:_e(e,t)})}}function _n(e,t){return[{id:z,header:e,minWidth:180},{id:`Licensed Seats`,header:`Licensed seats`,width:132,numericStyling:!0},gn(t,`Seats In Use Pct`,`Seats in use`,124),gn(t,`Habit Pct`,`Habit rate`,116),{id:`Hours`,header:`Expert hours`,width:128,numericStyling:!0},gn(t,mn,`Hours per seat`,136)]}function vn(e,t,n){return`${j(e,`whole`)} ${e===1?t:n}`}function yn({data:e}){let{departments:t,summary:n}=e,{theme:r}=m(),a=ee(),o=a.plural.charAt(0).toUpperCase()+a.plural.slice(1),c=(0,I.useMemo)(()=>wt(),[]),l=N(c),u=(0,I.useMemo)(()=>_n(a.label,t.table),[a.label,t.table]),g=(0,I.useMemo)(()=>ct(a.label),[a.label]),_=t.table?.rows.length,v=n.row,y=de(a),b=Dt(v),x=i(v,`[Agent Hours]`),S=i(v,`[Agents In Use]`),C=i(v,`[Agent Users]`);return(0,X.jsxs)(M,{id:s(`where-it-is-landing`),title:`Where it is landing`,description:`Which ${a.plural} get the most from their seats, and what kind of work Copilot does for people.`,actions:(0,X.jsx)(ve,{destination:`work-patterns`,children:`Open Work patterns`}),children:[_!==void 0&&_>=3&&(0,X.jsx)(p,{result:t,spec:g,height:hn,title:`${o} by reach and depth`,subtitle:`One circle per ${a.noun}, sized by seats. Right: more seats in use. Up: more hours per seat. Dashes: the median.`,emptyTitle:`No ${a.plural} to compare`,emptyDescription:`Nobody in the current selection has a license or a task with ${a.noun} recorded.`}),(0,X.jsx)(d,{result:t,height:ce(_??6),emptyTitle:`No ${a.plural} to compare`,emptyDescription:ue(`Nobody in the current selection has a license or a task with ${a.noun} recorded.`,a),children:e=>(0,X.jsx)(h,{columns:u,data:e,defaultSort:[{columnId:mn,direction:`desc`}],theme:r,header:{title:`${o} by expert hours per seat`,subtitle:`${vn(e.rows.length,a.noun,a.plural)}, most expert-equivalent hours per licensed seat a month first. Shading compares the ${a.plural} with each other.${y?` ${y}`:``}`}},a.column)}),(0,X.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,X.jsx)(`div`,{className:`min-w-0`,children:(0,X.jsx)(p,{result:l,spec:c.vegaLiteSpec,height:le(l.table?.rows.length??6),title:`What the work is`,headline:un,subtitle:`The 6 kinds of work with the most expert-equivalent hours`,emptyTitle:`No kinds of work to show`,emptyDescription:`No task in the current selection has a kind of work other than General Chat or General Assistance.`})}),(0,X.jsx)(`div`,{className:`xl:self-start`,children:(0,X.jsx)(f,{title:`Agents`,notes:[{term:`Agents in use`,text:S===void 0?void 0:`${vn(S,`agent`,`agents`)}, used by ${vn(C,`person`,`people`)}`},{term:`Agent work`,text:x===void 0?void 0:`${j(x,`whole`)} expert-equivalent hours${b.agentShare===void 0?``:`, ${j(Math.round(b.agentShare*100)/100,`percent`)} of the total`}`}],children:(0,X.jsx)(ye,{destination:`leaderboards`,stage:`leaderboard`,children:`Open Leaderboards`})})})]})]})}function bn(){let{filters:e,options:t,optionsError:n}=x(),r=C(e.dateRange,t),i=r?.from,a=r?.to,o=t?.firstDate,s=t?.lastDate;return{range:(0,I.useMemo)(()=>Tt(i,a,o,s),[i,a,o,s]),settled:t!==void 0||n!==void 0}}var xn=[`--vl-blue`,`--vl-amber`,`--vl-lavender`],Sn=[`--vl-amber`,`--vl-lavender`],Cn=[`dateRange`],$={connection:``,query:``},wn=_t().query;function Tn(){let e=bn(),{window:t,start:n,end:r}=e.range??{},{dateRange:i}=x().filters,a=i!==void 0&&!S(i),{show:o}=re(),s=o(`where-it-is-landing`)||o(`what-needs-attention`),c=ee(s),l=oe(xn),u=oe(Sn),d=o(`the-bottom-line`)||o(`is-it-growing`),f=t&&d,p=(0,I.useMemo)(()=>t?{months:t.months.map(Ze),rangeMonth:t.rangeMonth}:void 0,[t]),m=(0,I.useMemo)(()=>ht(p&&{...p,colors:l}),[p,l]),h=(0,I.useMemo)(()=>tt(p&&{...p,colors:u}),[p,u]),g=P({...bt(),lead:!0,speculate:!0}),v=P(o(`the-bottom-line`)?{...dt(),lead:!0,speculate:!0}:{...dt(),...$}),y=N(d&&!a?{...m,query:wn,lead:!0,speculate:!0}:f?{...m,lead:!0,speculate:!0}:{...m,...$},a&&f?[b(`'Calendar'[Date]`,t.from,t.to)]:[],Cn),C=t?y:{...y,table:void 0,error:void 0,isLoading:!0},w=F&&f&&n&&r,T=(0,I.useMemo)(()=>w?rt({trend:t,range:{from:n,to:r}}).query:``,[w,t,n,r]),{trend:E,range:te}=Ce(w?{...h,query:T}:{...h,...$},nt,[],Cn),D=(0,I.useMemo)(()=>_(st(),c),[c]);return{range:e,summary:g,hoursRange:v,months:C,monthsSource:m,credits:E,creditsSource:h,creditsInRange:te,departments:N(s?D:{...D,...$})}}function En(){let e=Tn(),{optionsError:t,retryOptions:n}=x(),{show:r}=re();return t?(0,X.jsx)(E,{message:T(t.message)?t.message:`The dates with Copilot activity couldn't be read: ${t.message}`,onRetry:n}):e.range.settled&&!e.range.range?(0,X.jsx)(ne,{title:`No Copilot activity in this date range`,description:`Choose a date range that overlaps the days with Copilot activity. The summary covers only those days.`}):(0,X.jsxs)(`div`,{className:`flex flex-col gap-800`,children:[r(`the-bottom-line`)&&(0,X.jsx)(on,{data:e}),r(`the-bottom-line`)&&(0,X.jsx)(pe,{page:`executive`}),r(`is-it-growing`)&&(0,X.jsx)(pn,{data:e}),r(`where-it-is-landing`)&&(0,X.jsx)(yn,{data:e}),r(`what-needs-attention`)&&(0,X.jsx)(Zt,{data:e})]})}function Dn(){return(0,X.jsx)(Se,{readModel:F,children:(0,X.jsx)(En,{})})}export{Dn as ExecutiveScreen};