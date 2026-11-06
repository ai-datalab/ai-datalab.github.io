import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{_ as t,d as n,h as r,n as i,o as a,t as o,u as s}from"./createLucideIcon-CpejIyV8.js";import{F as c,Q as l,R as u,Z as d,_ as f,at as p,ot as m,p as h,rt as g,t as _,tt as v,v as y}from"./utils-BJOTqCrL.js";import{i as b,r as x,t as S}from"./report-panels-DfmE_PFh.js";import{n as C}from"./theme.context-C3NNi3i9.js";import{t as w}from"./dist-BYOWUv_q.js";import{E as T,N as E,T as D,U as ee,W as O,w as te}from"./task-times.context-DLW2wtXN.js";import{n as k}from"./source-availability.context-B5FH_5Cc.js";import{i as ne}from"./stage-filter.context-9jwLd2jm.js";import{c as re,d as ie,s as ae,x as oe}from"./root-DZorRZKV.js";import{n as A,o as se,r as j,s as ce}from"./headlined-CYyaVtMI.js";import{t as le}from"./filter-note-B4kNbS89.js";import{n as M}from"./use-filtered-query-B0Fhqoxi.js";import{t as N}from"./section-r2iBDg60.js";import{n as ue,t as de}from"./department-coverage-CQSszlEP.js";import{r as fe}from"./headline-BcqIX13g.js";import{t as pe}from"./page-panel-gate-mEzBL-tK.js";import{r as P,t as F}from"./use-table-query-X_m8aLWs.js";import{t as me}from"./not-filtered-hint-ClNymjUZ.js";import{a as he,n as ge,t as _e}from"./heat-BkWG91O5.js";import{n as I,t as ve}from"./open-destination-link-B8kP7NeS.js";import{A as ye,U as be,et as xe,r as Se,t as Ce}from"./use-consumption-query-C9mE1KZD.js";import{a as we,o as Te}from"./agents-Ctb-HMb2.js";import{c as L,o as Ee}from"./headlines-BPDD47i_.js";import{a as De,r as Oe}from"./feedback-D0aQ9TzY.js";import{i as ke,t as Ae}from"./licensing-B2mfhrZ3.js";var je={name:`circle-alert`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`,key:`1pkeuh`}],[`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`,key:`4dfq90`}]],aliases:[`alert-circle`]};je.node;var Me=o(je),R=e(i(),1),Ne=`EVALUATE\r
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
`,Pe={"[Last Date]":{name:`Last Date`,displayName:`Credits through`}};function Fe(){return{connection:`cc`,filters:ee,query:Ne,columnMetadata:Pe}}var Ie=`EVALUATE\r
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
`,Le={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{calculate:`timeFormat(toDate(datum['Month Start']), '%b %Y')`,as:`Month`},{calculate:`1`,as:`Emphasis`},{fold:[`Studio Credits`,`Cowork Credits`],as:[`Series`,`Value`]},{filter:`isValid(datum.Value) && datum.Value > 0`},{calculate:`datum.Series === 'Studio Credits' ? 'Copilot Studio agents' : 'Cowork'`,as:`Source`},{calculate:`indexof(['Studio Credits', 'Cowork Credits'], datum.Series)`,as:`Rank`}],encoding:{x:{field:`Month`,type:`ordinal`,title:null,sort:null,scale:{paddingInner:.45,paddingOuter:.25},axis:{labelAngle:0,ticks:!1}}},layer:[{mark:{type:`bar`},encoding:{y:{aggregate:`sum`,field:`Value`,type:`quantitative`,title:null,stack:`zero`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`,minExtent:48,tickCount:4}},color:{field:`Source`,type:`nominal`,title:null,sort:null,scale:{domain:[`Copilot Studio agents`,`Cowork`],range:[`#c46a12`,`#8783ff`]},legend:{orient:`top`,direction:`horizontal`,symbolType:`square`,symbolLimit:10,labelLimit:240}},order:{field:`Rank`,type:`quantitative`,sort:`ascending`},opacity:{field:`Emphasis`,type:`quantitative`,scale:null,legend:null},tooltip:[{field:`Month`,type:`ordinal`,title:`Month`},{field:`Source`,type:`nominal`,title:`Source`},{field:`Value`,type:`quantitative`,aggregate:`sum`,title:`Credits`,format:`,.0f`}]}},{transform:[{aggregate:[{op:`sum`,field:`Value`,as:`Total`},{op:`max`,field:`Emphasis`,as:`Emphasis`}],groupby:[`Month`]},{calculate:`abs(datum.Total) < 1000 ? format(datum.Total, ',.0f') : compactFormat(datum.Total, '#,0')`,as:`Total Label`}],mark:{type:`text`,baseline:`bottom`,dy:-4,fontWeight:600},encoding:{y:{field:`Total`,type:`quantitative`,title:null},text:{field:`Total Label`,type:`nominal`},opacity:{field:`Emphasis`,type:`quantitative`,scale:null,legend:null}}}]},Re=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];function z(e){return`${e.slice(0,7)}-01`}function B(e,t){let[n,r]=e.split(`-`).map(Number);return new Date(Date.UTC(n,r-1+t,1)).toISOString().slice(0,10)}function V(e){let[t,n]=e.split(`-`).map(Number);return new Date(Date.UTC(t,n,0)).getUTCDate()}function ze(e){return`${e.slice(0,8)}${String(V(e)).padStart(2,`0`)}`}function H(e){return Re[Number(e.slice(5,7))-1]}function Be(e,t,n=6){let r=z(t),i=Array.from({length:n},(e,t)=>B(r,t-(n-1)));return{from:i[0],to:t,months:i,rangeMonth:z(e)}}function Ve(e,t){if(t<e)return;let n=z(t),r=ze(n)===t?n:B(n,-1),i=B(r,-1);return i>=e?{current:r,previous:i}:void 0}var He=new Intl.NumberFormat(`en-GB`,{style:`percent`,maximumFractionDigits:0}),Ue=new Intl.NumberFormat(`en-GB`,{maximumFractionDigits:1,minimumFractionDigits:1});function We(e){return typeof e==`number`&&Number.isFinite(e)}function Ge(e,t,n,r){if(!We(n)||!We(r))return;let i=`${H(t.current)} vs ${H(t.previous)}`,a,o,s=i;if(e===`volume`){if(r<=0)return;a=n/V(t.current)/(r/V(t.previous))-1,o=He.format(Math.abs(a)),s=`${i}, per day`}else e===`rate`?(a=(n-r)*100,o=`${Ue.format(Math.abs(a))} pp`):(a=n-r,o=Ue.format(Math.abs(a)));let c=/^0(\.0)?(%| pp)?$/.test(o);return{direction:c?`flat`:a>0?`up`:`down`,amount:c?`No change`:o,comparison:s}}var Ke=.35;function qe(e){return`${H(e)} ${e.slice(0,4)}`}function Je(e){return/^\d{4}-\d{2}-\d{2}$/.test(e)?e:void 0}function Ye(e,t={}){let n=structuredClone(e);t.months?.length&&(n.encoding.x.scale.domain=[...t.months]);let r=t.rangeMonth?Je(t.rangeMonth):void 0,i=n.transform.find(e=>e.as===`Emphasis`);i&&r&&(i.calculate=`datum['Month Start'] < '${r}' ? ${Ke} : 1`);let a=n.layer[0].encoding.color;return t.colors?.length===a.scale.domain.length&&(a.scale.range=[...t.colors]),n}var Xe={"[Month Start]":{name:`Month Start`,displayName:`Month`,format:`mmm yyyy`},"[Studio Credits]":{name:`Studio Credits`,displayName:`Copilot Studio agents`,format:`#,0`},"[Cowork Credits]":{name:`Cowork Credits`,displayName:`Cowork`,format:`#,0`}};function Ze(e){return{connection:`cc`,filters:O,query:Ie,columnMetadata:Xe,vegaLiteSpec:Ye(Le,e)}}var Qe=[`trend`,`range`];function $e(e,t){let n=g(Ie),r=t=>`    ADDCOLUMNS(
        CALCULATETABLE(
${n}
,
            ${be(e[t].from,e[t].to)}
        ),
        "Part", "${t}"
    )`;return{...Ze(t),query:`EVALUATE\nUNION(\n${Qe.map(r).join(`,
`)}\n)\nORDER BY [Part], [Month Start]\n`}}var et=`DEFINE\r
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
`,tt={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,layer:[{transform:[{aggregate:[{op:`median`,field:`Seats In Use Pct`,as:`Seats In Use Pct`}]}],mark:{type:`rule`,strokeDash:[4,3],color:`#8a8886`},encoding:{x:{field:`Seats In Use Pct`,type:`quantitative`,title:`Licensed seats in use`}}},{transform:[{aggregate:[{op:`median`,field:`Hours Per Seat Month`,as:`Hours Per Seat Month`}]}],mark:{type:`rule`,strokeDash:[4,3],color:`#8a8886`},encoding:{y:{field:`Hours Per Seat Month`,type:`quantitative`,title:`Expert hours per seat a month`,axis:{format:`,.2f`,labelExpr:`format(datum.value, ',.2f')`,tickCount:5}}}},{mark:{type:`circle`,opacity:.75},encoding:{x:{field:`Seats In Use Pct`,type:`quantitative`,title:`Licensed seats in use`,scale:{zero:!1},axis:{format:`.0%`,tickCount:5}},y:{field:`Hours Per Seat Month`,type:`quantitative`,title:`Expert hours per seat a month`,axis:{format:`,.2f`,labelExpr:`format(datum.value, ',.2f')`,tickCount:5}},size:{field:`Licensed Seats`,type:`quantitative`,legend:null,scale:{range:[40,640]}},tooltip:[{field:`Chat + Agent Org DataOrganization`,type:`nominal`,title:`Group`},{field:`Seats In Use Pct`,type:`quantitative`,title:`Seats in use`,format:`.0%`},{field:`Hours Per Seat Month`,type:`quantitative`,title:`Hours per seat a month`,format:`,.2f`},{field:`Licensed Seats`,type:`quantitative`,title:`Licensed seats`,format:`,.0f`},{field:`Habit Pct`,type:`quantitative`,title:`Habit rate`,format:`.0%`}]}},{transform:[{window:[{op:`row_number`,as:`Seat Rank`}],sort:[{field:`Licensed Seats`,order:`descending`}]},{filter:`datum['Seat Rank'] <= 6`}],mark:{type:`text`,align:`left`,baseline:`middle`,dx:16,fontSize:11,limit:140},encoding:{x:{field:`Seats In Use Pct`,type:`quantitative`,title:`Licensed seats in use`},y:{field:`Hours Per Seat Month`,type:`quantitative`,title:`Expert hours per seat a month`,axis:{format:`,.2f`,labelExpr:`format(datum.value, ',.2f')`,tickCount:5}},text:{field:`Chat + Agent Org DataOrganization`,type:`nominal`}}}]},nt=`Chat + Agent Org DataOrganization`,rt={"Chat + Agent Org Data[Organization]":{name:nt,displayName:`Organization`},"[Licensed Seats]":{name:`Licensed Seats`,displayName:`Licensed seats`,format:`#,0`},"[Seats In Use Pct]":{name:`Seats In Use Pct`,displayName:`Seats in use`,format:t},"[Habit Pct]":{name:`Habit Pct`,displayName:`Habit rate`,format:t},"[Hours]":{name:`Hours`,displayName:`Expert-equivalent hours`,format:r},"[People]":{name:`People`,displayName:`People with a task`,format:`#,0`},"[Hours Per Seat Month]":{name:`Hours Per Seat Month`,displayName:`Hours per seat a month`,format:r}};function it(){return{connection:`vl`,query:et,columnMetadata:rt}}function at(e){let t=structuredClone(tt);for(let n of t.layer){let t=n.encoding.tooltip?.[0];t&&(t.title=e)}return t}var ot=`EVALUATE\r
// The Conservative to Optimistic range under the summary's hours, as its own\r
// query: the app asks it beside executive-summary.dax, under the same filters,\r
// so the summary's figures don't wait for it. On a large tenant it took about a\r
// quarter of the summary's time. Both columns are as they were in the summary.\r
ROW(\r
    "Hours Conservative", CALCULATE([Expert Equivalent Hours], 'Effort Scenario'[Scenario] = "Conservative"),\r
    "Hours Optimistic", CALCULATE([Expert Equivalent Hours], 'Effort Scenario'[Scenario] = "Optimistic")\r
)\r
`,st={"[Hours Conservative]":{name:`Hours Conservative`,displayName:`Conservative hours`,format:r},"[Hours Optimistic]":{name:`Hours Optimistic`,displayName:`Optimistic hours`,format:r}};function ct(){return{connection:`vl`,query:ot,columnMetadata:st}}var lt=`EVALUATE\r
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
`,ut={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{calculate:`timeFormat(toDate(datum['Month Start']), '%b %Y')`,as:`Month`},{calculate:`1`,as:`Emphasis`},{fold:[`Copilot Hours`,`Agent Hours`,`Cowork Hours`],as:[`Series`,`Value`]},{filter:`isValid(datum.Value) && datum.Value > 0`},{calculate:`datum.Series === 'Copilot Hours' ? 'Copilot Chat and apps' : datum.Series === 'Agent Hours' ? 'Agents' : 'Cowork'`,as:`Source`},{calculate:`indexof(['Copilot Hours', 'Agent Hours', 'Cowork Hours'], datum.Series)`,as:`Rank`}],encoding:{x:{field:`Month`,type:`ordinal`,title:null,sort:null,scale:{paddingInner:.45,paddingOuter:.25},axis:{labelAngle:0,ticks:!1}}},layer:[{mark:{type:`bar`},encoding:{y:{aggregate:`sum`,field:`Value`,type:`quantitative`,title:null,stack:`zero`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`,minExtent:48,tickCount:4}},color:{field:`Source`,type:`nominal`,title:null,sort:null,scale:{domain:[`Copilot Chat and apps`,`Agents`,`Cowork`],range:[`#4f73b8`,`#c46a12`,`#8783ff`]},legend:{orient:`top`,direction:`horizontal`,symbolType:`square`,symbolLimit:10,labelLimit:240}},order:{field:`Rank`,type:`quantitative`,sort:`ascending`},opacity:{field:`Emphasis`,type:`quantitative`,scale:null,legend:null},tooltip:[{field:`Month`,type:`ordinal`,title:`Month`},{field:`Source`,type:`nominal`,title:`Source`},{field:`Value`,type:`quantitative`,aggregate:`sum`,title:`Expert-equivalent hours`,format:`,.0f`}]}},{transform:[{aggregate:[{op:`sum`,field:`Value`,as:`Total`},{op:`max`,field:`Emphasis`,as:`Emphasis`}],groupby:[`Month`]},{calculate:`abs(datum.Total) < 1000 ? format(datum.Total, ',.0f') : compactFormat(datum.Total, '#,0')`,as:`Total Label`}],mark:{type:`text`,baseline:`bottom`,dy:-4,fontWeight:600},encoding:{y:{field:`Total`,type:`quantitative`,title:null},text:{field:`Total Label`,type:`nominal`},opacity:{field:`Emphasis`,type:`quantitative`,scale:null,legend:null}}}]},dt={"[Month Start]":{name:`Month Start`,displayName:`Month`,format:`mmm yyyy`},"[Copilot Hours]":{name:`Copilot Hours`,displayName:`Copilot Chat and apps`,format:r},"[Agent Hours]":{name:`Agent Hours`,displayName:`Agents`,format:r},"[Cowork Hours]":{name:`Cowork Hours`,displayName:`Cowork`,format:r},"[Hours]":{name:`Hours`,displayName:`Expert-equivalent hours`,format:r},"[Tasks]":{name:`Tasks`,displayName:`Tasks delivered`,format:`#,0`},"[Seats In Use Pct]":{name:`Seats In Use Pct`,displayName:`Licensed seats in use`,format:t},"[Habit Pct]":{name:`Habit Pct`,displayName:`Habit rate`,format:t},"[Satisfaction]":{name:`Satisfaction`,displayName:`Satisfaction`,format:t},"[Feedback]":{name:`Feedback`,displayName:`Ratings`,format:`#,0`}};function ft(e){return{connection:`vl`,query:lt,columnMetadata:dt,vegaLiteSpec:Ye(ut,e)}}var pt=p(lt,e=>`
// With no date filter, the trend covers the 6 months to the last day of activity.
VAR _trendEnd = CALCULATE(MAX('Chat + Agent Interactions (Audit Logs)'[ActivityDate]), REMOVEFILTERS())
VAR _trendFrom = EOMONTH(_trendEnd, -6) + 1
RETURN
    CALCULATETABLE(
${e}
,
        FILTER(ALL('Calendar'[Date]), 'Calendar'[Date] >= _trendFrom && 'Calendar'[Date] <= _trendEnd)
    )
`);function mt(e){return{...ft(e),query:pt}}var ht=`DEFINE\r
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
`,gt={"[Hours]":{name:`Hours`,displayName:`Expert-equivalent hours`,format:r},"[Tasks]":{name:`Tasks`,displayName:`Tasks delivered`,format:`#,0`},"[People]":{name:`People`,displayName:`People with a task`,format:`#,0`},"[Weeks]":{name:`Weeks`,displayName:`Weeks`,format:`#,0`},"[Skills Available]":{name:`Skills Available`,displayName:`Kinds of work`,format:`#,0`},"[Licensed Seats]":{name:`Licensed Seats`,displayName:`Licensed seats`,format:`#,0`},"[Seats In Use]":{name:`Seats In Use`,displayName:`Seats in use`,format:`#,0`},"[Seats In Use Pct]":{name:`Seats In Use Pct`,displayName:`Licensed seats in use`,format:t},"[Unlicensed Users]":{name:`Unlicensed Users`,displayName:`Unlicensed users`,format:`#,0`},"[Habit Month]":{name:`Habit Month`,displayName:`Habit month`,format:`mmm yyyy`},"[Habitual Pct]":{name:`Habitual Pct`,displayName:`Habitual`,format:t},"[Power Pct]":{name:`Power Pct`,displayName:`Power`,format:t},"[Agent Users]":{name:`Agent Users`,displayName:`Agent users`,format:`#,0`},"[Agent Hours]":{name:`Agent Hours`,displayName:`Agent hours`,format:r},"[Agents In Use]":{name:`Agents In Use`,displayName:`Agents in use`,format:`#,0`},"[Satisfaction]":{name:`Satisfaction`,displayName:`Satisfaction`,format:t},"[Feedback]":{name:`Feedback`,displayName:`Ratings`,format:`#,0`},"[People With Organization]":{name:`People With Organization`,displayName:`People with an organization`,format:`#,0`}};function _t(){return{connection:`vl`,query:ht,columnMetadata:gt}}var vt=`EVALUATE\r
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
`,yt={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Chat + Agent Interactions (Audit Logs)Task Breakdown Category`,type:`nominal`,title:null,sort:`-x`,axis:{labelLimit:220}},x:{field:`Hours`,type:`quantitative`,title:`Expert-equivalent hours`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`,tickCount:4}},tooltip:[{field:`Chat + Agent Interactions (Audit Logs)Task Breakdown Category`,type:`nominal`,title:`Kind of work`},{field:`Hours`,type:`quantitative`,title:`Expert-equivalent hours`,format:`,.0f`},{field:`Tasks`,type:`quantitative`,title:`Tasks`,format:`,.0f`},{field:`People`,type:`quantitative`,title:`People`,format:`,.0f`}]}},bt={"Chat + Agent Interactions (Audit Logs)[Task Breakdown Category]":{name:`Chat + Agent Interactions (Audit Logs)Task Breakdown Category`,displayName:`Kind of work`},"[Hours]":{name:`Hours`,displayName:`Expert-equivalent hours`,format:r},"[Tasks]":{name:`Tasks`,displayName:`Tasks`,format:`#,0`},"[People]":{name:`People`,displayName:`People`,format:`#,0`}};function xt(){return{connection:`vl`,query:vt,columnMetadata:bt,vegaLiteSpec:structuredClone(yt)}}function U(e){return e?e.rows.map(t=>Object.fromEntries(e.columns.map((e,n)=>[e.name,t[n]]))):[]}function W(e,t){return e===void 0||t===void 0||t<=0?void 0:e/t}function G(...e){let t=e.filter(e=>e!==void 0);return t.length===0?void 0:t.reduce((e,t)=>e+t,0)}function St(e,t,n,r){if(!n||!r)return;let i=e&&e>n?e:n,a=t&&t<r?t:r;if(!(a<i))return{start:i,end:a,window:Be(i,a),pair:Ve(i,a)}}function Ct(e){let t=new Map;for(let n of e){let e=n[`Month Start`];typeof e==`string`&&t.set(e.slice(0,10),n)}return t}function K(e,t,n,r,i){if(!t)return;let a=Ge(e,t,r(n.get(t.current)),r(n.get(t.previous)));return a&&(i?{...a,polarity:i}:a)}function q(e,t,n,r){if(!t)return;let i=[];for(let a of t.window.months){if(a<t.start||ze(a)>t.end)continue;let o=r(n.get(a));o!==void 0&&Number.isFinite(o)&&i.push({label:H(a),value:e===`volume`?o/V(a):o})}if(i.length<3)return;let a=i[0],o=i[i.length-1],s=a.value===0?o.value-a.value:(o.value-a.value)/Math.abs(a.value),c=Math.abs(s)<.01?`about level`:s>0?`higher at the end`:`lower at the end`;return{points:i,description:`Trend by full month${e===`volume`?`, per day`:``}, ${a.label} to ${o.label}: ${c}.`}}function wt(e){let t=s(e,`[Hours]`),n=s(e,`[Tasks]`),r=s(e,`[People]`),i=s(e,`[Weeks]`),a=r!==void 0&&i!==void 0?r*i:void 0,o=t===void 0?void 0:t*60,c=s(e,`[Habitual Pct]`),l=s(e,`[Power Pct]`);return{minutesPerPersonWeek:W(o,a),tasksPerPersonWeek:W(n,a),minutesPerTask:W(o,n),agentShare:W(s(e,`[Agent Hours]`),t),habitRate:c===void 0&&l===void 0?void 0:(c??0)+(l??0)}}function Tt(e,t){if(e.refreshing||t.refreshing)return{status:`pending`};if(t.error!==void 0)return{status:`error`,message:t.error};if(!e.loaded||!t.loaded)return{status:`pending`};let n=s(t.row,`[Hours Conservative]`),r=s(t.row,`[Hours Optimistic]`);return n===void 0||r===void 0?{status:`none`}:{status:`ready`,conservative:n,optimistic:r}}var Et=new Intl.ListFormat(`en-GB`,{style:`long`,type:`conjunction`});function Dt(e){return Et.format(e)}var Ot=new Intl.DateTimeFormat(`en-GB`,{day:`numeric`,month:`short`,year:`numeric`,timeZone:`UTC`}),kt=new Intl.DateTimeFormat(`en-GB`,{month:`long`,timeZone:`UTC`});function At(e){if(typeof e==`string`&&/^\d{4}-\d{2}-\d{2}/.test(e))return Ot.format(new Date(`${e.slice(0,10)}T00:00:00Z`))}function jt(e){if(typeof e==`string`&&/^\d{4}-\d{2}/.test(e))return kt.format(new Date(`${e.slice(0,7)}-01T00:00:00Z`))}var Mt=[`idle-seats`,`cowork-over-allowance`,`enablement-gap`,`weakest-theme`],Nt=.25,Pt=.5,J=new Intl.NumberFormat(void 0,{style:`percent`,maximumFractionDigits:0});function Y(e,t,n){return e===1?t:n}function Ft(e){return e.charAt(0).toLowerCase()+e.slice(1)}function It({summary:e,dormancy:t,estate:r}){let i=s(r,`[License Inventory Usable]`);if(i===void 0||i===0||!t)return;let a=t.map(e=>({order:s(e,`Dormancy Bucket Order`),name:n(e,`Dormancy Bucket`),seats:s(e,`Licensed Users`)??0})).filter(e=>e.order!==void 0&&e.seats>0),o=a.reduce((e,t)=>e+t.seats,0),c=a.filter(e=>(e.order??0)>=2).sort((e,t)=>t.seats-e.seats||(e.order??0)-(t.order??0)),l=c.reduce((e,t)=>e+t.seats,0);if(o<=0||l===0||l/o<.05)return;let u=Dt(c.map(e=>`${M(e.seats,`whole`)} ${Ft(e.name??`idle`)}`)),d=s(e,`[Unlicensed Users]`)??0,f=d>0?` ${M(d,`whole`)} ${Y(d,`person already uses`,`people already use`)} Copilot without a license.`:``;return{rule:`idle-seats`,tone:`caution`,title:`Reassign ${M(l,`whole`)} idle ${Y(l,`seat`,`seats`)}`,evidence:`Licensed seats with no Copilot activity in 30 days or more: ${u}.${f}`,reach:l,stake:`${J.format(l/o)} of seats`,link:{destination:`readiness`,stage:`license-readiness`,label:`Open Readiness`}}}function Lt({cowork:e}){let t=s(e,`[Users Over Limit]`),r=s(e,`[Consuming Users]`);if(t===void 0||r===void 0)return;let i=Math.round(t*r);if(i<1)return;let a=n(e,`[Period Label]`),o=s(e,`[Policies]`)??0,c=o>0?`, across ${M(o,`whole`)} spending ${Y(o,`policy`,`policies`)}`:``;return{rule:`cowork-over-allowance`,tone:`negative`,title:`${M(i,`whole`)} ${Y(i,`person is`,`people are`)} over their Cowork allowance`,evidence:`${J.format(t)} of the ${M(r,`whole`)} people using Cowork${a?` in ${a}`:``} went past their spending policy's credit limit${c}.`,reach:i,stake:`${J.format(t)} of Cowork users`,link:{destination:`consumption`,stage:`cowork-credits`,label:`Open Consumption`}}}function Rt(e){if(e.length===0)return;let t=[...e].sort((e,t)=>e-t);return t[Math.floor((t.length-1)*Nt)]}function zt({departments:e,orgPlural:t}){let r=(e??[]).map(e=>({name:n(e,nt),seats:s(e,`Licensed Seats`)??0,hours:s(e,`Hours Per Seat Month`)})).filter(e=>e.name!==void 0&&e.seats>0&&e.hours!==void 0);if(r.length<4)return;let i=Rt(r.map(e=>e.hours))??0,a=r.reduce((e,t)=>e+t.seats,0),o=r.reduce((e,t)=>e+t.hours*t.seats,0)/a,c=r.filter(e=>e.hours<=i&&e.hours<o).sort((e,t)=>e.hours-t.hours||e.name.localeCompare(t.name)),l=c.reduce((e,t)=>e+Pt*(o-t.hours)*t.seats*3,0);if(c.length===0||Math.round(l)<1)return;let u=Dt(c.map(e=>e.name)),d=c.length===1,f=c.reduce((e,t)=>e+t.seats,0);return{rule:`enablement-gap`,tone:`caution`,title:`Focus enablement on ${u}`,evidence:`${d?`It is`:`They are`} in the bottom quarter of ${t} for expert hours per seat. Closing half ${d?`its`:`their`} gap to the average of ${M(o,`hours`)} hours per seat a month would add about ${M(l,`whole`)} expert hours a quarter.`,reach:f,stake:`+${M(l,`whole`)} hours a quarter`,link:{destination:`adoption`,label:`Open Adoption`}}}function Bt({summary:e,themes:t}){let r=s(e,`[Satisfaction]`);if(r===void 0||!t)return;let i=new Map;for(let e of t){let t=n(e,`Category`),r=s(e,`Total Feedback`),a=s(e,`Satisfaction`);t&&r!==void 0&&a!==void 0&&!i.has(t)&&i.set(t,{total:r,rate:a})}let[a]=[...i].map(([e,t])=>({name:e,...t})).filter(e=>e.total>=20&&e.rate<r).sort((e,t)=>e.rate-t.rate||t.total-e.total||e.name.localeCompare(t.name));if(!a)return;let o=Math.round((r-a.rate)*100);if(!(o<1))return{rule:`weakest-theme`,tone:`caution`,title:`${a.name} is the least liked theme`,evidence:`${J.format(a.rate)} thumbs up across ${M(a.total,`whole`)} ratings, against ${J.format(r)} across all feedback.`,reach:a.total,stake:`${o} pp below overall`,link:{destination:`feedback`,stage:`feedback`,label:`Open Feedback`}}}var Vt={"idle-seats":It,"cowork-over-allowance":Lt,"enablement-gap":zt,"weakest-theme":Bt};function Ht(e){return Mt.map(t=>Vt[t](e)).filter(e=>e!==void 0).sort((e,t)=>t.reach-e.reach||Mt.indexOf(e.rule)-Mt.indexOf(t.rule))}var X=m(),Ut=[`dateRange`,`organizations`],Wt=[De],Gt={connection:``,query:``},Kt={negative:{Icon:Me,className:`text-negative`,label:`Problem`},caution:{Icon:oe,className:`text-caution`,label:`Opportunity`}};function qt({item:e}){let t=Kt[e.tone];return(0,X.jsxs)(`li`,{className:`grid grid-cols-[16px_minmax(0,1fr)] gap-x-300 gap-y-200 px-500 py-400 sm:grid-cols-[16px_minmax(0,1fr)_auto]`,children:[(0,X.jsx)(t.Icon,{className:_(`icon-size-200 mt-[2px]`,t.className),"aria-hidden":`true`}),(0,X.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,X.jsxs)(`h3`,{className:_(ae,`font-semibold text-foreground`),children:[(0,X.jsxs)(`span`,{className:`sr-only`,children:[t.label,`: `]}),e.title]}),(0,X.jsx)(`p`,{className:_(re,`max-w-[72ch] text-muted-foreground`),children:e.evidence})]}),(0,X.jsxs)(`div`,{className:`col-start-2 flex flex-col items-start gap-100 sm:col-start-3 sm:items-end`,children:[(0,X.jsx)(`span`,{className:_(re,`font-semibold text-foreground`),children:e.stake}),(0,X.jsx)(I,{destination:e.link.destination,stage:e.link.stage,children:e.link.label})]})]})}function Jt(e,t,n){let r=n?` Updated ${n}.`:``;switch(e.kind){case`complete`:return`Every agent session matches a registered agent; ${M(e.seenInUse,`whole`)} of ${M(e.registryAgents,`whole`)} are in use.${r}`;case`partial`:return`${M(e.unmatchedSessions,`whole`)} agent sessions came from agents it doesn't list.${r}`;case`none`:return`None of the ${M(e.unmatchedSessions,`whole`)} agent sessions match an agent it lists, so agents go by the names the audit log gives them.${r}`;default:return t===void 0?void 0:`${M(t,`whole`)} agents listed, with no agent sessions yet to match against them.${r}`}}function Yt(e){if(e!==void 0)return e===0?`Doesn't reconcile with activity yet, so idle seats can't be counted. Readiness explains why.`:`Reconciles with activity`}function Xt(e){let t=e.filter(e=>e.error!==void 0);if(t.length!==0)return{message:t[0].error,retry:()=>t.forEach(e=>e.refetch())}}function Zt(e){return`loaded`in e?e.loaded:!e.isLoading}function Qt({data:e}){let{summary:t,departments:r}=e,i=y(),{options:a}=f(),o=(0,R.useMemo)(()=>Ae(),[]),c=(0,R.useMemo)(()=>Oe(),[]),l=(0,R.useMemo)(()=>L?ye():{...ye(),...Gt},[]),u=(0,R.useMemo)(()=>L?Fe():{...Fe(),...Gt},[]),p=P(o,[],Ut),m=F(ke(),[],Ut),g=P(c,Wt),_=Ce(l),v=Ce(u),b=F(we()),S=[t,r,p,m,g,...L?[_]:[]],C=Xt(S),w=S.every(Zt),E=(0,R.useMemo)(()=>w?Ht({summary:t.row,dormancy:U(p.table),estate:m.row,departments:U(r.table),cowork:_.row,themes:U(g.table),orgPlural:i.plural}):[],[w,t.row,p.table,m.row,r.table,_.row,g.table,i.plural]),ee=Te(b.row),O=At(n(v.row,`[Last Date]`)),k=At(a?.lastDate);return(0,X.jsxs)(N,{id:h(`what-needs-attention`),title:`What needs attention`,description:`Decisions the data points to, the most people or hours affected first.`,children:[(0,X.jsx)(le,{ignored:Ut,scope:`to idle seats`,reason:`they describe the license roster as it stands, for the whole tenant.`}),(0,X.jsx)(me,{from:[g.notFilteredBy,L?_.notFilteredBy:void 0,b.notFilteredBy]}),(0,X.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,X.jsx)(`div`,{className:`min-w-0`,children:C?(0,X.jsx)(D,{message:C.message,onRetry:C.retry}):w?E.length===0?(0,X.jsx)(te,{title:`Nothing needs attention`,description:`No rule found anything to raise: idle seats, Cowork allowances, the gap between ${i.plural} and the least liked feedback theme are all within bounds.`}):(0,X.jsx)(`ol`,{"aria-label":`What needs attention`,className:`flex flex-col divide-y divide-border rounded-xl border border-border bg-card`,children:E.map(e=>(0,X.jsx)(qt,{item:e},e.rule))}):(0,X.jsx)(T,{className:`h-[320px]`})}),(0,X.jsx)(`div`,{className:`xl:self-start`,children:(0,X.jsx)(x,{title:`Can we trust these numbers?`,notes:[{term:`Activity data`,text:k&&`Through ${k}`},{term:`Credit data`,text:L&&O?`Through ${O}`:void 0},{term:`License inventory`,text:Yt(s(m.row,`[License Inventory Usable]`))},{term:`People with ${d(i.noun)}`,text:de(i)},{term:`Agent registry`,text:Jt(ee,s(b.row,`[Registry Agents]`),At(n(b.row,`[Registry Updated]`)))}]})})]})]})}function $t({label:e,value:t}){return(0,X.jsxs)(`div`,{className:`flex items-baseline justify-between gap-200`,children:[(0,X.jsx)(`span`,{children:e}),(0,X.jsx)(`span`,{className:`font-numeric font-semibold whitespace-nowrap tabular-nums text-[length:var(--text-300)] text-foreground`,children:t})]})}var en=`Conservative to Optimistic`;function tn({range:e,onRetry:t}){switch(e.status){case`ready`:return(0,X.jsx)($t,{label:en,value:`${M(e.conservative,`whole`)} – ${M(e.optimistic,`whole`)}`});case`none`:return null;case`pending`:return(0,X.jsxs)(`div`,{className:`flex items-center justify-between gap-200`,children:[(0,X.jsx)(`span`,{children:en}),(0,X.jsxs)(`span`,{role:`status`,"data-query-loading":``,children:[(0,X.jsx)(`span`,{className:`sr-only`,children:`Loading`}),(0,X.jsx)(`span`,{"aria-hidden":`true`,className:`block h-200 w-[10ch] animate-pulse rounded-sm bg-muted`})]})]});case`error`:{let n=E(e.message);return(0,X.jsxs)(`div`,{className:`flex flex-wrap items-baseline justify-between gap-x-200`,children:[(0,X.jsx)(`span`,{children:en}),(0,X.jsxs)(`span`,{className:`flex items-baseline gap-200`,children:[(0,X.jsx)(`span`,{title:n?void 0:e.message,children:n?`Power BI is busy`:`Didn't load`}),(0,X.jsx)(`button`,{type:`button`,onClick:t,className:`font-semibold text-foreground underline underline-offset-2 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`,children:`Try again`})]})]})}}}function Z({children:e}){return(0,X.jsx)(`div`,{className:`flex flex-col gap-100`,children:e})}function nn({title:e,className:t,children:n}){return(0,X.jsxs)(`div`,{className:`flex flex-col gap-300`,children:[(0,X.jsx)(`h3`,{className:_(ae,`font-semibold text-foreground`),children:e}),(0,X.jsx)(`div`,{className:t,children:n})]})}var Q=e=>t=>s(t,e),rn=e=>G(s(e,`Studio Credits`),s(e,`Cowork Credits`)),an=L?`grid gap-300 md:grid-cols-3`:`grid gap-300 md:grid-cols-2`;function on(e){return e?L?{scope:`to satisfaction or credits`,reason:`feedback isn't linked to people, and Consumption Central records credits for the whole tenant.`}:{scope:`to satisfaction`,reason:`feedback isn't linked to people, so it covers everyone.`}:L?{scope:`to credits`,reason:`Consumption Central records credits for the whole tenant.`}:void 0}function sn({data:e}){let{summary:t,hoursRange:r,months:i,credits:o,creditsInRange:c,range:l}=e,u=t.row,d=l.range?.pair,f=!a(k(),`productFeedback`),p=on(f),m=(0,R.useMemo)(()=>Ct(U(i.table)),[i.table]),g=(0,R.useMemo)(()=>Ct(U(o.table)),[o.table]),v=(0,R.useMemo)(()=>{let e=U(c.table),t=G(...e.map(e=>s(e,`Studio Credits`))),n=G(...e.map(e=>s(e,`Cowork Credits`)));return{studio:t,cowork:n,total:G(t,n)}},[c.table]),y=wt(u),b=jt(n(u,`[Habit Month]`)),x=d?`Arrows compare ${jt(d.current)}, the last full month, with ${jt(d.previous)}; totals are compared per day so month length doesn't skew them.`:`Arrows comparing one month with the one before appear when the date range covers two full months.`;return(0,X.jsxs)(N,{id:h(`the-bottom-line`),title:`The bottom line`,description:`What Copilot did, how widely people use it, and whether it is becoming how they work. ${x}`,children:[t.error===void 0?t.loaded?u?(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)(nn,{title:`Is it doing real work?`,className:an,children:[(0,X.jsx)(A,{label:`Expert-equivalent hours · Typical effort`,value:s(u,`[Hours]`),emphasis:!0,delta:K(`volume`,d,m,Q(`Hours`)),trend:q(`volume`,l.range,m,Q(`Hours`)),detail:(0,X.jsxs)(Z,{children:[(0,X.jsx)(tn,{range:Tt(t,r),onRetry:r.refetch}),y.minutesPerPersonWeek!==void 0&&(0,X.jsx)($t,{label:`Per person a week`,value:`${M(y.minutesPerPersonWeek,`whole`)} min`})]})}),(0,X.jsx)(A,{label:`Tasks delivered`,value:s(u,`[Tasks]`),delta:K(`volume`,d,m,Q(`Tasks`)),trend:q(`volume`,l.range,m,Q(`Tasks`)),detail:(0,X.jsxs)(Z,{children:[(0,X.jsx)(j,{label:`Per person a week`,value:y.tasksPerPersonWeek,format:`hours`}),(0,X.jsx)(j,{label:`Expert minutes per task`,value:y.minutesPerTask,format:`hours`})]})}),L&&(c.error===void 0?c.isLoading?(0,X.jsx)(T,{}):(0,X.jsx)(A,{label:`Credits consumed · whole tenant`,value:v.total===void 0?void 0:v.total/1e6,format:`millions`,delta:K(`volume`,d,g,rn,`neutral`),trend:q(`volume`,l.range,g,rn),detail:(0,X.jsxs)(Z,{children:[(0,X.jsx)(j,{label:`Copilot Studio agents`,value:v.studio===void 0?void 0:v.studio/1e6,format:`millions`}),(0,X.jsx)(j,{label:`Cowork`,value:v.cowork===void 0?void 0:v.cowork/1e6,format:`millions`})]})}):(0,X.jsx)(D,{message:c.error,onRetry:c.refetch}))]}),(0,X.jsxs)(nn,{title:`Is it becoming how people work?`,className:_(`grid gap-300`,f?`md:grid-cols-3`:`md:grid-cols-2`),children:[(0,X.jsx)(A,{label:`Licensed seats in use`,value:s(u,`[Seats In Use Pct]`),format:`percent`,delta:K(`rate`,d,m,Q(`Seats In Use Pct`)),trend:q(`rate`,l.range,m,Q(`Seats In Use Pct`)),detail:(0,X.jsxs)(Z,{children:[(0,X.jsx)(j,{label:`Licensed seats`,value:s(u,`[Licensed Seats]`)}),(0,X.jsx)(j,{label:`Seats in use`,value:s(u,`[Seats In Use]`)})]})}),(0,X.jsx)(A,{label:b?`Habit rate · ${b}`:`Habit rate`,value:y.habitRate,format:`percent`,delta:K(`rate`,d,m,Q(`Habit Pct`)),trend:q(`rate`,l.range,m,Q(`Habit Pct`)),detail:(0,X.jsxs)(Z,{children:[(0,X.jsx)(j,{label:`Habitual`,value:s(u,`[Habitual Pct]`),format:`percent`}),(0,X.jsx)(j,{label:`Power`,value:s(u,`[Power Pct]`),format:`percent`})]})}),f&&(0,X.jsx)(A,{label:`Satisfaction · thumbs up`,value:s(u,`[Satisfaction]`),format:`percent`,delta:K(`rate`,d,m,Q(`Satisfaction`)),trend:q(`rate`,l.range,m,Q(`Satisfaction`)),detail:(0,X.jsx)(Z,{children:(0,X.jsx)(j,{label:`Ratings`,value:s(u,`[Feedback]`)})})})]})]}):(0,X.jsx)(te,{title:`No Copilot activity`,description:`The semantic model returned nothing for the current selection.`}):(0,X.jsx)(`div`,{className:an,children:Array.from({length:L?3:2},(e,t)=>(0,X.jsx)(T,{},t))}):(0,X.jsx)(D,{message:t.error,onRetry:t.refetch}),p&&(0,X.jsx)(le,{ignored:[`organizations`],scope:p.scope,reason:p.reason})]})}function cn(e,t,n){return r=>{let i=e.map(e=>r.columns.findIndex(t=>t.name===e));if(i.every(e=>e<0))return;let a=r.rows.map(e=>{let t=i.map(t=>t<0?void 0:e[t]).filter(e=>typeof e==`number`&&Number.isFinite(e));return[...e,t.length?t.reduce((e,t)=>e+t,0):null]});return n({...r,columns:[...r.columns,{name:t,displayName:t}],rows:a})}}var ln=fe({date:`Month Start`,value:`Hours`,of:`expert-equivalent hours`,period:`month`,format:`hours`}),un=cn([`Studio Credits`,`Cowork Credits`],`Credits`,fe({date:`Month Start`,value:`Credits`,of:`credits`,period:`month`})),dn=Ee({label:`Chat + Agent Interactions (Audit Logs)Task Breakdown Category`,value:`Hours`,of:`expert-equivalent hours`,format:`hours`}),fn=340,pn=`Six months to the end of the date range; months before it are faded`;function mn({data:e}){let{months:t,monthsSource:n,credits:r,creditsSource:i,summary:a}=e,o=s(a.row,`[Skills Available]`);return(0,X.jsx)(N,{id:h(`is-it-growing`),title:`Is it growing?`,description:L?`Expert-equivalent hours and credits consumed each month, on one timeline. Each colour is the same source in both charts.`:`Expert-equivalent hours each month, by where the work was done.`,actions:(0,X.jsx)(I,{destination:`value`,stage:`task-breakdown`,children:`Open Value`}),children:(0,X.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,X.jsxs)(`div`,{className:`flex min-w-0 flex-col gap-300`,children:[(0,X.jsx)(S,{result:t,spec:n.vegaLiteSpec,height:fn,title:`Work delivered by month`,headline:ln,subtitle:`Expert-equivalent hours. ${pn}`,emptyTitle:`No work in these months`,emptyDescription:`There's no Copilot activity in the six months to the end of the date range.`}),L&&(0,X.jsx)(me,{from:[r.notFilteredBy]}),L&&(0,X.jsx)(S,{result:r,spec:i.vegaLiteSpec,height:fn,title:`Credits consumed by month`,headline:un,subtitle:`Whole tenant. ${pn}`,emptyTitle:`No credits in these months`,emptyDescription:`Consumption Central has no Copilot Studio or Cowork credits in the six months to the end of the date range.`})]}),(0,X.jsx)(`div`,{className:`xl:self-start`,children:(0,X.jsx)(x,{title:`How this is worked out`,notes:[{term:`Expert-equivalent hours`,text:`Each task counts the minutes an expert typically takes to do it without Copilot, from the Signal → Impact table. Typical effort; Conservative and Optimistic give the range.`},{term:`Tasks`,text:o===void 0?`Copilot interactions, each sorted into a kind of work.`:`Copilot interactions, sorted into ${M(o,`whole`)} kinds of work.`},{term:`Credits`,text:L?`Copilot Studio and Cowork credits from Consumption Central, for the whole tenant.`:void 0}],children:(0,X.jsx)(ve,{destination:`value`,stage:`cost-vs-value`,children:`Need it in money? Open Cost vs value`})})})]})})}var hn=`Hours Per Seat Month`,gn=360;function _n(e,t,n,r){return{id:t,header:n,width:r,numericStyling:!0,cellRenderer:he({domain:ge(e,t),format:_e(e,t)})}}function vn(e,t){return[{id:nt,header:e,minWidth:180},{id:`Licensed Seats`,header:`Licensed seats`,width:132,numericStyling:!0},_n(t,`Seats In Use Pct`,`Seats in use`,124),_n(t,`Habit Pct`,`Habit rate`,116),{id:`Hours`,header:`Expert hours`,width:128,numericStyling:!0},_n(t,hn,`Hours per seat`,136)]}function yn(e,t,n){return`${M(e,`whole`)} ${e===1?t:n}`}function bn({data:e}){let{departments:t,summary:n}=e,{theme:r}=C(),i=y(),a=i.plural.charAt(0).toUpperCase()+i.plural.slice(1),o=(0,R.useMemo)(()=>xt(),[]),c=P(o),l=(0,R.useMemo)(()=>vn(i.label,t.table),[i.label,t.table]),u=(0,R.useMemo)(()=>at(i.label),[i.label]),d=t.table?.rows.length,f=n.row,p=de(i),m=wt(f),g=s(f,`[Agent Hours]`),_=s(f,`[Agents In Use]`),v=s(f,`[Agent Users]`);return(0,X.jsxs)(N,{id:h(`where-it-is-landing`),title:`Where it is landing`,description:`Which ${i.plural} get the most from their seats, and what kind of work Copilot does for people.`,actions:(0,X.jsx)(I,{destination:`work-patterns`,children:`Open Work patterns`}),children:[d!==void 0&&d>=3&&(0,X.jsx)(S,{result:t,spec:u,height:gn,title:`${a} by reach and depth`,subtitle:`One circle per ${i.noun}, sized by seats. Right: more seats in use. Up: more hours per seat. Dashes: the median.`,emptyTitle:`No ${i.plural} to compare`,emptyDescription:`Nobody in the current selection has a license or a task with ${i.noun} recorded.`}),(0,X.jsx)(b,{result:t,height:se(d??6),emptyTitle:`No ${i.plural} to compare`,emptyDescription:ue(`Nobody in the current selection has a license or a task with ${i.noun} recorded.`,i),children:e=>(0,X.jsx)(w,{columns:l,data:e,defaultSort:[{columnId:hn,direction:`desc`}],theme:r,header:{title:`${a} by expert hours per seat`,subtitle:`${yn(e.rows.length,i.noun,i.plural)}, most expert-equivalent hours per licensed seat a month first. Shading compares the ${i.plural} with each other.${p?` ${p}`:``}`}},i.column)}),(0,X.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,X.jsx)(`div`,{className:`min-w-0`,children:(0,X.jsx)(S,{result:c,spec:o.vegaLiteSpec,height:ce(c.table?.rows.length??6),title:`What the work is`,headline:dn,subtitle:`The 6 kinds of work with the most expert-equivalent hours`,emptyTitle:`No kinds of work to show`,emptyDescription:`No task in the current selection has a kind of work other than General Chat or General Assistance.`})}),(0,X.jsx)(`div`,{className:`xl:self-start`,children:(0,X.jsx)(x,{title:`Agents`,notes:[{term:`Agents in use`,text:_===void 0?void 0:`${yn(_,`agent`,`agents`)}, used by ${yn(v,`person`,`people`)}`},{term:`Agent work`,text:g===void 0?void 0:`${M(g,`whole`)} expert-equivalent hours${m.agentShare===void 0?``:`, ${M(Math.round(m.agentShare*100)/100,`percent`)} of the total`}`}],children:(0,X.jsx)(ve,{destination:`leaderboards`,stage:`leaderboard`,children:`Open Leaderboards`})})})]})]})}function xn(){let{filters:e,options:t,optionsError:n}=f(),r=u(e.dateRange,t),i=r?.from,a=r?.to,o=t?.firstDate,s=t?.lastDate;return{range:(0,R.useMemo)(()=>St(i,a,o,s),[i,a,o,s]),settled:t!==void 0||n!==void 0}}var Sn=[`--vl-blue`,`--vl-amber`,`--vl-lavender`],Cn=[`--vl-amber`,`--vl-lavender`],wn=[`dateRange`],$={connection:``,query:``},Tn=mt().query;function En(){let e=xn(),{window:t,start:n,end:r}=e.range??{},{dateRange:i}=f().filters,a=i!==void 0&&!c(i),{show:o}=ne(),s=o(`where-it-is-landing`)||o(`what-needs-attention`),u=y(s),d=ie(Sn),p=ie(Cn),m=o(`the-bottom-line`)||o(`is-it-growing`),h=t&&m,g=(0,R.useMemo)(()=>t?{months:t.months.map(qe),rangeMonth:t.rangeMonth}:void 0,[t]),_=(0,R.useMemo)(()=>ft(g&&{...g,colors:d}),[g,d]),b=(0,R.useMemo)(()=>Ze(g&&{...g,colors:p}),[g,p]),x=F({..._t(),lead:!0,speculate:!0}),S=F(o(`the-bottom-line`)?{...ct(),lead:!0,speculate:!0}:{...ct(),...$}),C=P(m&&!a?{..._,query:Tn,lead:!0,speculate:!0}:h?{..._,lead:!0,speculate:!0}:{..._,...$},a&&h?[v(`'Calendar'[Date]`,t.from,t.to)]:[],wn),w=t?C:{...C,table:void 0,error:void 0,isLoading:!0},T=L&&h&&n&&r,E=(0,R.useMemo)(()=>T?$e({trend:t,range:{from:n,to:r}}).query:``,[T,t,n,r]),{trend:D,range:ee}=Se(T?{...b,query:E}:{...b,...$},Qe,[],wn),O=(0,R.useMemo)(()=>l(it(),u),[u]);return{range:e,summary:x,hoursRange:S,months:w,monthsSource:_,credits:D,creditsSource:b,creditsInRange:ee,departments:P(s?O:{...O,...$})}}function Dn(){let e=En(),{optionsError:t,retryOptions:n}=f(),{show:r}=ne();return t?(0,X.jsx)(D,{message:E(t.message)?t.message:`The dates with Copilot activity couldn't be read: ${t.message}`,onRetry:n}):e.range.settled&&!e.range.range?(0,X.jsx)(te,{title:`No Copilot activity in this date range`,description:`Choose a date range that overlaps the days with Copilot activity. The summary covers only those days.`}):(0,X.jsxs)(`div`,{className:`flex flex-col gap-800`,children:[r(`the-bottom-line`)&&(0,X.jsx)(sn,{data:e}),r(`the-bottom-line`)&&(0,X.jsx)(pe,{page:`executive`}),r(`is-it-growing`)&&(0,X.jsx)(mn,{data:e}),r(`where-it-is-landing`)&&(0,X.jsx)(bn,{data:e}),r(`what-needs-attention`)&&(0,X.jsx)(Qt,{data:e})]})}function On(){return(0,X.jsx)(xe,{readModel:L,children:(0,X.jsx)(Dn,{})})}export{On as ExecutiveScreen};