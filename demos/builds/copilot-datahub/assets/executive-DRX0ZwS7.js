import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-CQOZoUwg.js";import{c as n,o as r}from"./headlines-Ctm0HtH0.js";import{n as i}from"./theme.context-RSsoaF3c.js";import{t as a}from"./dist-DjvcfNLg.js";import{$ as o,Ct as s,D as c,E as l,M as u,N as d,X as f,bt as p,f as m,ft as h,gt as g,l as _,m as v,pt as y,t as b,vt as x,wt as S,y as C}from"./utils-CCoPj5LP.js";import{i as w,r as T,t as E}from"./report-panels-dbK2-7A9.js";import{E as D,N as O,T as k,U as A,W as ee,w as te}from"./task-times.context-WIEQAetj.js";import{n as ne}from"./source-availability.context-PreDw-5j.js";import{i as re}from"./stage-filter.context-DYufJONF.js";import{c as ie,f as ae,s as oe,v as se}from"./root-Dy8LPudF.js";import{a as ce,n as j,o as le,t as M}from"./kpi-card-D03NeHc2.js";import{t as ue}from"./filter-note-CLucH9Ek.js";import{t as N}from"./format-kpi-BhveZiQQ.js";import{t as P}from"./section-p8LJFb5N.js";import{n as de,t as fe}from"./department-coverage-Cd-kjpTB.js";import{r as pe}from"./headline-CtXokBCs.js";import{t as me}from"./page-panel-gate-CmUAichn.js";import{r as F,t as I}from"./use-table-query-D491W46Z.js";import{t as he}from"./not-filtered-hint-CICeGIQd.js";import{a as ge,n as _e,t as ve}from"./heat-Cx7mdvL8.js";import{n as ye,t as be}from"./open-destination-link-Bnuyfcch.js";import{A as xe,U as Se,et as Ce,r as we,t as Te}from"./use-consumption-query-Bv0AiE0a.js";import{a as Ee,o as De}from"./agents-BIVn5orW.js";import{a as Oe,r as ke}from"./feedback-tFEGsd7S.js";import{i as Ae,t as je}from"./licensing-DVZXFuoX.js";var Me={name:`circle-alert`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`,key:`1pkeuh`}],[`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`,key:`4dfq90`}]],aliases:[`alert-circle`]};Me.node;var Ne=s(Me),L=e(t(),1),Pe=`EVALUATE\r
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
`,Fe={"[Last Date]":{name:`Last Date`,displayName:`Credits through`}};function Ie(){return{connection:`cc`,filters:A,query:Pe,columnMetadata:Fe}}var Le=`EVALUATE\r
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
`,Re={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{calculate:`timeFormat(toDate(datum['Month Start']), '%b %Y')`,as:`Month`},{calculate:`1`,as:`Emphasis`},{fold:[`Studio Credits`,`Cowork Credits`],as:[`Series`,`Value`]},{filter:`isValid(datum.Value) && datum.Value > 0`},{calculate:`datum.Series === 'Studio Credits' ? 'Copilot Studio agents' : 'Cowork'`,as:`Source`},{calculate:`indexof(['Studio Credits', 'Cowork Credits'], datum.Series)`,as:`Rank`}],encoding:{x:{field:`Month`,type:`ordinal`,title:null,sort:null,scale:{paddingInner:.45,paddingOuter:.25},axis:{labelAngle:0,ticks:!1}}},layer:[{mark:{type:`bar`},encoding:{y:{aggregate:`sum`,field:`Value`,type:`quantitative`,title:null,stack:`zero`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`,minExtent:48,tickCount:4}},color:{field:`Source`,type:`nominal`,title:null,sort:null,scale:{domain:[`Copilot Studio agents`,`Cowork`],range:[`#c46a12`,`#8783ff`]},legend:{orient:`top`,direction:`horizontal`,symbolType:`square`,symbolLimit:10,labelLimit:240}},order:{field:`Rank`,type:`quantitative`,sort:`ascending`},opacity:{field:`Emphasis`,type:`quantitative`,scale:null,legend:null},tooltip:[{field:`Month`,type:`ordinal`,title:`Month`},{field:`Source`,type:`nominal`,title:`Source`},{field:`Value`,type:`quantitative`,aggregate:`sum`,title:`Credits`,format:`,.0f`}]}},{transform:[{aggregate:[{op:`sum`,field:`Value`,as:`Total`},{op:`max`,field:`Emphasis`,as:`Emphasis`}],groupby:[`Month`]},{calculate:`abs(datum.Total) < 1000 ? format(datum.Total, ',.0f') : compactFormat(datum.Total, '#,0')`,as:`Total Label`}],mark:{type:`text`,baseline:`bottom`,dy:-4,fontWeight:600},encoding:{y:{field:`Total`,type:`quantitative`,title:null},text:{field:`Total Label`,type:`nominal`},opacity:{field:`Emphasis`,type:`quantitative`,scale:null,legend:null}}}]},ze=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];function R(e){return`${e.slice(0,7)}-01`}function z(e,t){let[n,r]=e.split(`-`).map(Number);return new Date(Date.UTC(n,r-1+t,1)).toISOString().slice(0,10)}function B(e){let[t,n]=e.split(`-`).map(Number);return new Date(Date.UTC(t,n,0)).getUTCDate()}function Be(e){return`${e.slice(0,8)}${String(B(e)).padStart(2,`0`)}`}function V(e){return ze[Number(e.slice(5,7))-1]}function Ve(e,t,n=6){let r=R(t),i=Array.from({length:n},(e,t)=>z(r,t-(n-1)));return{from:i[0],to:t,months:i,rangeMonth:R(e)}}function He(e,t){if(t<e)return;let n=R(t),r=Be(n)===t?n:z(n,-1),i=z(r,-1);return i>=e?{current:r,previous:i}:void 0}var Ue=new Intl.NumberFormat(`en-GB`,{style:`percent`,maximumFractionDigits:0}),We=new Intl.NumberFormat(`en-GB`,{maximumFractionDigits:1,minimumFractionDigits:1});function Ge(e){return typeof e==`number`&&Number.isFinite(e)}function Ke(e,t,n,r){if(!Ge(n)||!Ge(r))return;let i=`${V(t.current)} vs ${V(t.previous)}`,a,o,s=i;if(e===`volume`){if(r<=0)return;a=n/B(t.current)/(r/B(t.previous))-1,o=Ue.format(Math.abs(a)),s=`${i}, per day`}else e===`rate`?(a=(n-r)*100,o=`${We.format(Math.abs(a))} pp`):(a=n-r,o=We.format(Math.abs(a)));let c=/^0(\.0)?(%| pp)?$/.test(o);return{direction:c?`flat`:a>0?`up`:`down`,amount:c?`No change`:o,comparison:s}}var qe=.35;function Je(e){return`${V(e)} ${e.slice(0,4)}`}function Ye(e){return/^\d{4}-\d{2}-\d{2}$/.test(e)?e:void 0}function Xe(e,t={}){let n=structuredClone(e);t.months?.length&&(n.encoding.x.scale.domain=[...t.months]);let r=t.rangeMonth?Ye(t.rangeMonth):void 0,i=n.transform.find(e=>e.as===`Emphasis`);i&&r&&(i.calculate=`datum['Month Start'] < '${r}' ? ${qe} : 1`);let a=n.layer[0].encoding.color;return t.colors?.length===a.scale.domain.length&&(a.scale.range=[...t.colors]),n}var Ze={"[Month Start]":{name:`Month Start`,displayName:`Month`,format:`mmm yyyy`},"[Studio Credits]":{name:`Studio Credits`,displayName:`Copilot Studio agents`,format:`#,0`},"[Cowork Credits]":{name:`Cowork Credits`,displayName:`Cowork`,format:`#,0`}};function Qe(e){return{connection:`cc`,filters:ee,query:Le,columnMetadata:Ze,vegaLiteSpec:Xe(Re,e)}}var $e=[`trend`,`range`];function et(e,t){let n=x(Le),r=t=>`    ADDCOLUMNS(
        CALCULATETABLE(
${n}
,
            ${Se(e[t].from,e[t].to)}
        ),
        "Part", "${t}"
    )`;return{...Qe(t),query:`EVALUATE\nUNION(\n${$e.map(r).join(`,
`)}\n)\nORDER BY [Part], [Month Start]\n`}}var tt=`DEFINE\r
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
`,nt={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,layer:[{transform:[{aggregate:[{op:`median`,field:`Seats In Use Pct`,as:`Seats In Use Pct`}]}],mark:{type:`rule`,strokeDash:[4,3],color:`#8a8886`},encoding:{x:{field:`Seats In Use Pct`,type:`quantitative`,title:`Licensed seats in use`}}},{transform:[{aggregate:[{op:`median`,field:`Hours Per Seat Month`,as:`Hours Per Seat Month`}]}],mark:{type:`rule`,strokeDash:[4,3],color:`#8a8886`},encoding:{y:{field:`Hours Per Seat Month`,type:`quantitative`,title:`Expert hours per seat a month`,axis:{format:`,.2f`,labelExpr:`format(datum.value, ',.2f')`,tickCount:5}}}},{mark:{type:`circle`,opacity:.75},encoding:{x:{field:`Seats In Use Pct`,type:`quantitative`,title:`Licensed seats in use`,scale:{zero:!1},axis:{format:`.0%`,tickCount:5}},y:{field:`Hours Per Seat Month`,type:`quantitative`,title:`Expert hours per seat a month`,axis:{format:`,.2f`,labelExpr:`format(datum.value, ',.2f')`,tickCount:5}},size:{field:`Licensed Seats`,type:`quantitative`,legend:null,scale:{range:[40,640]}},tooltip:[{field:`Chat + Agent Org DataOrganization`,type:`nominal`,title:`Group`},{field:`Seats In Use Pct`,type:`quantitative`,title:`Seats in use`,format:`.0%`},{field:`Hours Per Seat Month`,type:`quantitative`,title:`Hours per seat a month`,format:`,.2f`},{field:`Licensed Seats`,type:`quantitative`,title:`Licensed seats`,format:`,.0f`},{field:`Habit Pct`,type:`quantitative`,title:`Habit rate`,format:`.0%`}]}},{transform:[{window:[{op:`row_number`,as:`Seat Rank`}],sort:[{field:`Licensed Seats`,order:`descending`}]},{filter:`datum['Seat Rank'] <= 6`}],mark:{type:`text`,align:`left`,baseline:`middle`,dx:16,fontSize:11,limit:140},encoding:{x:{field:`Seats In Use Pct`,type:`quantitative`,title:`Licensed seats in use`},y:{field:`Hours Per Seat Month`,type:`quantitative`,title:`Expert hours per seat a month`,axis:{format:`,.2f`,labelExpr:`format(datum.value, ',.2f')`,tickCount:5}},text:{field:`Chat + Agent Org DataOrganization`,type:`nominal`}}}]},H=`Chat + Agent Org DataOrganization`,rt={"Chat + Agent Org Data[Organization]":{name:H,displayName:`Organization`},"[Licensed Seats]":{name:`Licensed Seats`,displayName:`Licensed seats`,format:`#,0`},"[Seats In Use Pct]":{name:`Seats In Use Pct`,displayName:`Seats in use`,format:v},"[Habit Pct]":{name:`Habit Pct`,displayName:`Habit rate`,format:v},"[Hours]":{name:`Hours`,displayName:`Expert-equivalent hours`,format:m},"[People]":{name:`People`,displayName:`People with a task`,format:`#,0`},"[Hours Per Seat Month]":{name:`Hours Per Seat Month`,displayName:`Hours per seat a month`,format:m}};function it(){return{connection:`vl`,query:tt,columnMetadata:rt}}function at(e){let t=structuredClone(nt);for(let n of t.layer){let t=n.encoding.tooltip?.[0];t&&(t.title=e)}return t}var ot=`EVALUATE\r
// The Conservative to Optimistic range under the summary's hours, as its own\r
// query: the app asks it beside executive-summary.dax, under the same filters,\r
// so the summary's figures don't wait for it. On a large tenant it took about a\r
// quarter of the summary's time. Both columns are as they were in the summary.\r
ROW(\r
    "Hours Conservative", CALCULATE([Expert Equivalent Hours], 'Effort Scenario'[Scenario] = "Conservative"),\r
    "Hours Optimistic", CALCULATE([Expert Equivalent Hours], 'Effort Scenario'[Scenario] = "Optimistic")\r
)\r
`,st={"[Hours Conservative]":{name:`Hours Conservative`,displayName:`Conservative hours`,format:m},"[Hours Optimistic]":{name:`Hours Optimistic`,displayName:`Optimistic hours`,format:m}};function ct(){return{connection:`vl`,query:ot,columnMetadata:st}}var lt=`EVALUATE\r
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
`,ut={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{calculate:`timeFormat(toDate(datum['Month Start']), '%b %Y')`,as:`Month`},{calculate:`1`,as:`Emphasis`},{fold:[`Copilot Hours`,`Agent Hours`,`Cowork Hours`],as:[`Series`,`Value`]},{filter:`isValid(datum.Value) && datum.Value > 0`},{calculate:`datum.Series === 'Copilot Hours' ? 'Copilot Chat and apps' : datum.Series === 'Agent Hours' ? 'Agents' : 'Cowork'`,as:`Source`},{calculate:`indexof(['Copilot Hours', 'Agent Hours', 'Cowork Hours'], datum.Series)`,as:`Rank`}],encoding:{x:{field:`Month`,type:`ordinal`,title:null,sort:null,scale:{paddingInner:.45,paddingOuter:.25},axis:{labelAngle:0,ticks:!1}}},layer:[{mark:{type:`bar`},encoding:{y:{aggregate:`sum`,field:`Value`,type:`quantitative`,title:null,stack:`zero`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`,minExtent:48,tickCount:4}},color:{field:`Source`,type:`nominal`,title:null,sort:null,scale:{domain:[`Copilot Chat and apps`,`Agents`,`Cowork`],range:[`#4f73b8`,`#c46a12`,`#8783ff`]},legend:{orient:`top`,direction:`horizontal`,symbolType:`square`,symbolLimit:10,labelLimit:240}},order:{field:`Rank`,type:`quantitative`,sort:`ascending`},opacity:{field:`Emphasis`,type:`quantitative`,scale:null,legend:null},tooltip:[{field:`Month`,type:`ordinal`,title:`Month`},{field:`Source`,type:`nominal`,title:`Source`},{field:`Value`,type:`quantitative`,aggregate:`sum`,title:`Expert-equivalent hours`,format:`,.0f`}]}},{transform:[{aggregate:[{op:`sum`,field:`Value`,as:`Total`},{op:`max`,field:`Emphasis`,as:`Emphasis`}],groupby:[`Month`]},{calculate:`abs(datum.Total) < 1000 ? format(datum.Total, ',.0f') : compactFormat(datum.Total, '#,0')`,as:`Total Label`}],mark:{type:`text`,baseline:`bottom`,dy:-4,fontWeight:600},encoding:{y:{field:`Total`,type:`quantitative`,title:null},text:{field:`Total Label`,type:`nominal`},opacity:{field:`Emphasis`,type:`quantitative`,scale:null,legend:null}}}]},dt={"[Month Start]":{name:`Month Start`,displayName:`Month`,format:`mmm yyyy`},"[Copilot Hours]":{name:`Copilot Hours`,displayName:`Copilot Chat and apps`,format:m},"[Agent Hours]":{name:`Agent Hours`,displayName:`Agents`,format:m},"[Cowork Hours]":{name:`Cowork Hours`,displayName:`Cowork`,format:m},"[Hours]":{name:`Hours`,displayName:`Expert-equivalent hours`,format:m},"[Tasks]":{name:`Tasks`,displayName:`Tasks delivered`,format:`#,0`},"[Seats In Use Pct]":{name:`Seats In Use Pct`,displayName:`Licensed seats in use`,format:v},"[Habit Pct]":{name:`Habit Pct`,displayName:`Habit rate`,format:v},"[Satisfaction]":{name:`Satisfaction`,displayName:`Satisfaction`,format:v},"[Feedback]":{name:`Feedback`,displayName:`Ratings`,format:`#,0`}};function ft(e){return{connection:`vl`,query:lt,columnMetadata:dt,vegaLiteSpec:Xe(ut,e)}}var pt=p(lt,e=>`
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
`,gt={"[Hours]":{name:`Hours`,displayName:`Expert-equivalent hours`,format:m},"[Tasks]":{name:`Tasks`,displayName:`Tasks delivered`,format:`#,0`},"[People]":{name:`People`,displayName:`People with a task`,format:`#,0`},"[Weeks]":{name:`Weeks`,displayName:`Weeks`,format:`#,0`},"[Skills Available]":{name:`Skills Available`,displayName:`Kinds of work`,format:`#,0`},"[Licensed Seats]":{name:`Licensed Seats`,displayName:`Licensed seats`,format:`#,0`},"[Seats In Use]":{name:`Seats In Use`,displayName:`Seats in use`,format:`#,0`},"[Seats In Use Pct]":{name:`Seats In Use Pct`,displayName:`Licensed seats in use`,format:v},"[Unlicensed Users]":{name:`Unlicensed Users`,displayName:`Unlicensed users`,format:`#,0`},"[Habit Month]":{name:`Habit Month`,displayName:`Habit month`,format:`mmm yyyy`},"[Habitual Pct]":{name:`Habitual Pct`,displayName:`Habitual`,format:v},"[Power Pct]":{name:`Power Pct`,displayName:`Power`,format:v},"[Agent Users]":{name:`Agent Users`,displayName:`Agent users`,format:`#,0`},"[Agent Hours]":{name:`Agent Hours`,displayName:`Agent hours`,format:m},"[Agents In Use]":{name:`Agents In Use`,displayName:`Agents in use`,format:`#,0`},"[Satisfaction]":{name:`Satisfaction`,displayName:`Satisfaction`,format:v},"[Feedback]":{name:`Feedback`,displayName:`Ratings`,format:`#,0`},"[People With Organization]":{name:`People With Organization`,displayName:`People with an organization`,format:`#,0`}};function _t(){return{connection:`vl`,query:ht,columnMetadata:gt}}var vt=`EVALUATE\r
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
`,yt={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Chat + Agent Interactions (Audit Logs)Task Breakdown Category`,type:`nominal`,title:null,sort:`-x`,axis:{labelLimit:220}},x:{field:`Hours`,type:`quantitative`,title:`Expert-equivalent hours`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`,tickCount:4}},tooltip:[{field:`Chat + Agent Interactions (Audit Logs)Task Breakdown Category`,type:`nominal`,title:`Kind of work`},{field:`Hours`,type:`quantitative`,title:`Expert-equivalent hours`,format:`,.0f`},{field:`Tasks`,type:`quantitative`,title:`Tasks`,format:`,.0f`},{field:`People`,type:`quantitative`,title:`People`,format:`,.0f`}]}},bt={"Chat + Agent Interactions (Audit Logs)[Task Breakdown Category]":{name:`Chat + Agent Interactions (Audit Logs)Task Breakdown Category`,displayName:`Kind of work`},"[Hours]":{name:`Hours`,displayName:`Expert-equivalent hours`,format:m},"[Tasks]":{name:`Tasks`,displayName:`Tasks`,format:`#,0`},"[People]":{name:`People`,displayName:`People`,format:`#,0`}};function xt(){return{connection:`vl`,query:vt,columnMetadata:bt,vegaLiteSpec:structuredClone(yt)}}function U(e){return e?e.rows.map(t=>Object.fromEntries(e.columns.map((e,n)=>[e.name,t[n]]))):[]}function W(e,t){return e===void 0||t===void 0||t<=0?void 0:e/t}function G(...e){let t=e.filter(e=>e!==void 0);return t.length===0?void 0:t.reduce((e,t)=>e+t,0)}function St(e,t,n,r){if(!n||!r)return;let i=e&&e>n?e:n,a=t&&t<r?t:r;if(!(a<i))return{start:i,end:a,window:Ve(i,a),pair:He(i,a)}}function Ct(e){let t=new Map;for(let n of e){let e=n[`Month Start`];typeof e==`string`&&t.set(e.slice(0,10),n)}return t}function K(e,t,n,r,i){if(!t)return;let a=Ke(e,t,r(n.get(t.current)),r(n.get(t.previous)));return a&&(i?{...a,polarity:i}:a)}function q(e,t,n,r){if(!t)return;let i=[];for(let a of t.window.months){if(a<t.start||Be(a)>t.end)continue;let o=r(n.get(a));o!==void 0&&Number.isFinite(o)&&i.push({label:V(a),value:e===`volume`?o/B(a):o})}if(i.length<3)return;let a=i[0],o=i[i.length-1],s=a.value===0?o.value-a.value:(o.value-a.value)/Math.abs(a.value),c=Math.abs(s)<.01?`about level`:s>0?`higher at the end`:`lower at the end`;return{points:i,description:`Trend by full month${e===`volume`?`, per day`:``}, ${a.label} to ${o.label}: ${c}.`}}function wt(e){let t=l(e,`[Hours]`),n=l(e,`[Tasks]`),r=l(e,`[People]`),i=l(e,`[Weeks]`),a=r!==void 0&&i!==void 0?r*i:void 0,o=t===void 0?void 0:t*60,s=l(e,`[Habitual Pct]`),c=l(e,`[Power Pct]`);return{minutesPerPersonWeek:W(o,a),tasksPerPersonWeek:W(n,a),minutesPerTask:W(o,n),agentShare:W(l(e,`[Agent Hours]`),t),habitRate:s===void 0&&c===void 0?void 0:(s??0)+(c??0)}}function Tt(e,t){if(e.refreshing||t.refreshing)return{status:`pending`};if(t.error!==void 0)return{status:`error`,message:t.error};if(!e.loaded||!t.loaded)return{status:`pending`};let n=l(t.row,`[Hours Conservative]`),r=l(t.row,`[Hours Optimistic]`);return n===void 0||r===void 0?{status:`none`}:{status:`ready`,conservative:n,optimistic:r}}var Et=new Intl.ListFormat(`en-GB`,{style:`long`,type:`conjunction`});function Dt(e){return Et.format(e)}var Ot=new Intl.DateTimeFormat(`en-GB`,{day:`numeric`,month:`short`,year:`numeric`,timeZone:`UTC`}),kt=new Intl.DateTimeFormat(`en-GB`,{month:`long`,timeZone:`UTC`});function At(e){if(typeof e==`string`&&/^\d{4}-\d{2}-\d{2}/.test(e))return Ot.format(new Date(`${e.slice(0,10)}T00:00:00Z`))}function jt(e){if(typeof e==`string`&&/^\d{4}-\d{2}/.test(e))return kt.format(new Date(`${e.slice(0,7)}-01T00:00:00Z`))}var Mt=[`idle-seats`,`cowork-over-allowance`,`enablement-gap`,`weakest-theme`],Nt=.25,Pt=.5,J=new Intl.NumberFormat(void 0,{style:`percent`,maximumFractionDigits:0});function Y(e,t,n){return e===1?t:n}function Ft(e){return e.charAt(0).toLowerCase()+e.slice(1)}function It({summary:e,dormancy:t,estate:n}){let r=l(n,`[License Inventory Usable]`);if(r===void 0||r===0||!t)return;let i=t.map(e=>({order:l(e,`Dormancy Bucket Order`),name:c(e,`Dormancy Bucket`),seats:l(e,`Licensed Users`)??0})).filter(e=>e.order!==void 0&&e.seats>0),a=i.reduce((e,t)=>e+t.seats,0),o=i.filter(e=>(e.order??0)>=2).sort((e,t)=>t.seats-e.seats||(e.order??0)-(t.order??0)),s=o.reduce((e,t)=>e+t.seats,0);if(a<=0||s===0||s/a<.05)return;let u=Dt(o.map(e=>`${N(e.seats,`whole`)} ${Ft(e.name??`idle`)}`)),d=l(e,`[Unlicensed Users]`)??0,f=d>0?` ${N(d,`whole`)} ${Y(d,`person already uses`,`people already use`)} Copilot without a license.`:``;return{rule:`idle-seats`,tone:`caution`,title:`Reassign ${N(s,`whole`)} idle ${Y(s,`seat`,`seats`)}`,evidence:`Licensed seats with no Copilot activity in 30 days or more: ${u}.${f}`,reach:s,stake:`${J.format(s/a)} of seats`,link:{destination:`readiness`,stage:`license-readiness`,label:`Open Readiness`}}}function Lt({cowork:e}){let t=l(e,`[Users Over Limit]`),n=l(e,`[Consuming Users]`);if(t===void 0||n===void 0)return;let r=Math.round(t*n);if(r<1)return;let i=c(e,`[Period Label]`),a=l(e,`[Policies]`)??0,o=a>0?`, across ${N(a,`whole`)} spending ${Y(a,`policy`,`policies`)}`:``;return{rule:`cowork-over-allowance`,tone:`negative`,title:`${N(r,`whole`)} ${Y(r,`person is`,`people are`)} over their Cowork allowance`,evidence:`${J.format(t)} of the ${N(n,`whole`)} people using Cowork${i?` in ${i}`:``} went past their spending policy's credit limit${o}.`,reach:r,stake:`${J.format(t)} of Cowork users`,link:{destination:`consumption`,stage:`cowork-credits`,label:`Open Consumption`}}}function Rt(e){if(e.length===0)return;let t=[...e].sort((e,t)=>e-t);return t[Math.floor((t.length-1)*Nt)]}function zt({departments:e,orgPlural:t}){let n=(e??[]).map(e=>({name:c(e,H),seats:l(e,`Licensed Seats`)??0,hours:l(e,`Hours Per Seat Month`)})).filter(e=>e.name!==void 0&&e.seats>0&&e.hours!==void 0);if(n.length<4)return;let r=Rt(n.map(e=>e.hours))??0,i=n.reduce((e,t)=>e+t.seats,0),a=n.reduce((e,t)=>e+t.hours*t.seats,0)/i,o=n.filter(e=>e.hours<=r&&e.hours<a).sort((e,t)=>e.hours-t.hours||e.name.localeCompare(t.name)),s=o.reduce((e,t)=>e+Pt*(a-t.hours)*t.seats*3,0);if(o.length===0||Math.round(s)<1)return;let u=Dt(o.map(e=>e.name)),d=o.length===1,f=o.reduce((e,t)=>e+t.seats,0);return{rule:`enablement-gap`,tone:`caution`,title:`Focus enablement on ${u}`,evidence:`${d?`It is`:`They are`} in the bottom quarter of ${t} for expert hours per seat. Closing half ${d?`its`:`their`} gap to the average of ${N(a,`hours`)} hours per seat a month would add about ${N(s,`whole`)} expert hours a quarter.`,reach:f,stake:`+${N(s,`whole`)} hours a quarter`,link:{destination:`adoption`,label:`Open Adoption`}}}function Bt({summary:e,themes:t}){let n=l(e,`[Satisfaction]`);if(n===void 0||!t)return;let r=new Map;for(let e of t){let t=c(e,`Category`),n=l(e,`Total Feedback`),i=l(e,`Satisfaction`);t&&n!==void 0&&i!==void 0&&!r.has(t)&&r.set(t,{total:n,rate:i})}let[i]=[...r].map(([e,t])=>({name:e,...t})).filter(e=>e.total>=20&&e.rate<n).sort((e,t)=>e.rate-t.rate||t.total-e.total||e.name.localeCompare(t.name));if(!i)return;let a=Math.round((n-i.rate)*100);if(!(a<1))return{rule:`weakest-theme`,tone:`caution`,title:`${i.name} is the least liked theme`,evidence:`${J.format(i.rate)} thumbs up across ${N(i.total,`whole`)} ratings, against ${J.format(n)} across all feedback.`,reach:i.total,stake:`${a} pp below overall`,link:{destination:`feedback`,stage:`feedback`,label:`Open Feedback`}}}var Vt={"idle-seats":It,"cowork-over-allowance":Lt,"enablement-gap":zt,"weakest-theme":Bt};function Ht(e){return Mt.map(t=>Vt[t](e)).filter(e=>e!==void 0).sort((e,t)=>t.reach-e.reach||Mt.indexOf(e.rule)-Mt.indexOf(t.rule))}var X=S(),Ut=[`dateRange`,`organizations`],Wt=[Oe],Gt={connection:``,query:``},Kt={negative:{Icon:Ne,className:`text-negative`,label:`Problem`},caution:{Icon:se,className:`text-caution`,label:`Opportunity`}};function qt({item:e}){let t=Kt[e.tone];return(0,X.jsxs)(`li`,{className:`grid grid-cols-[16px_minmax(0,1fr)] gap-x-300 gap-y-200 px-500 py-400 sm:grid-cols-[16px_minmax(0,1fr)_auto]`,children:[(0,X.jsx)(t.Icon,{className:b(`icon-size-200 mt-[2px]`,t.className),"aria-hidden":`true`}),(0,X.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,X.jsxs)(`h3`,{className:b(oe,`font-semibold text-foreground`),children:[(0,X.jsxs)(`span`,{className:`sr-only`,children:[t.label,`: `]}),e.title]}),(0,X.jsx)(`p`,{className:b(ie,`max-w-[72ch] text-muted-foreground`),children:e.evidence})]}),(0,X.jsxs)(`div`,{className:`col-start-2 flex flex-col items-start gap-100 sm:col-start-3 sm:items-end`,children:[(0,X.jsx)(`span`,{className:b(ie,`font-semibold text-foreground`),children:e.stake}),(0,X.jsx)(ye,{destination:e.link.destination,stage:e.link.stage,children:e.link.label})]})]})}function Jt(e,t,n){let r=n?` Updated ${n}.`:``;switch(e.kind){case`complete`:return`Every agent session matches a registered agent; ${N(e.seenInUse,`whole`)} of ${N(e.registryAgents,`whole`)} are in use.${r}`;case`partial`:return`${N(e.unmatchedSessions,`whole`)} agent sessions came from agents it doesn't list.${r}`;case`none`:return`None of the ${N(e.unmatchedSessions,`whole`)} agent sessions match an agent it lists, so agents go by the names the audit log gives them.${r}`;default:return t===void 0?void 0:`${N(t,`whole`)} agents listed, with no agent sessions yet to match against them.${r}`}}function Yt(e){if(e!==void 0)return e===0?`Doesn't reconcile with activity yet, so idle seats can't be counted. Readiness explains why.`:`Reconciles with activity`}function Xt(e){let t=e.filter(e=>e.error!==void 0);if(t.length!==0)return{message:t[0].error,retry:()=>t.forEach(e=>e.refetch())}}function Zt(e){return`loaded`in e?e.loaded:!e.isLoading}function Qt({data:e}){let{summary:t,departments:r}=e,i=d(),{options:a}=u(),o=(0,L.useMemo)(()=>je(),[]),s=(0,L.useMemo)(()=>ke(),[]),f=(0,L.useMemo)(()=>n?xe():{...xe(),...Gt},[]),p=(0,L.useMemo)(()=>n?Ie():{...Ie(),...Gt},[]),m=F(o,[],Ut),g=I(Ae(),[],Ut),v=F(s,Wt),y=Te(f),b=Te(p),x=I(Ee()),S=[t,r,m,g,v,...n?[y]:[]],C=Xt(S),w=S.every(Zt),E=(0,L.useMemo)(()=>w?Ht({summary:t.row,dormancy:U(m.table),estate:g.row,departments:U(r.table),cowork:y.row,themes:U(v.table),orgPlural:i.plural}):[],[w,t.row,m.table,g.row,r.table,y.row,v.table,i.plural]),O=De(x.row),A=At(c(b.row,`[Last Date]`)),ee=At(a?.lastDate);return(0,X.jsxs)(P,{id:_(`what-needs-attention`),title:`What needs attention`,description:`Decisions the data points to, the most people or hours affected first.`,children:[(0,X.jsx)(ue,{ignored:Ut,scope:`to idle seats`,reason:`they describe the license roster as it stands, for the whole tenant.`}),(0,X.jsx)(he,{from:[v.notFilteredBy,n?y.notFilteredBy:void 0,x.notFilteredBy]}),(0,X.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,X.jsx)(`div`,{className:`min-w-0`,children:C?(0,X.jsx)(k,{message:C.message,onRetry:C.retry}):w?E.length===0?(0,X.jsx)(te,{title:`Nothing needs attention`,description:`No rule found anything to raise: idle seats, Cowork allowances, the gap between ${i.plural} and the least liked feedback theme are all within bounds.`}):(0,X.jsx)(`ol`,{"aria-label":`What needs attention`,className:`flex flex-col divide-y divide-border rounded-xl border border-border bg-card`,children:E.map(e=>(0,X.jsx)(qt,{item:e},e.rule))}):(0,X.jsx)(D,{className:`h-[320px]`})}),(0,X.jsx)(`div`,{className:`xl:self-start`,children:(0,X.jsx)(T,{title:`Can we trust these numbers?`,notes:[{term:`Activity data`,text:ee&&`Through ${ee}`},{term:`Credit data`,text:n&&A?`Through ${A}`:void 0},{term:`License inventory`,text:Yt(l(g.row,`[License Inventory Usable]`))},{term:`People with ${h(i.noun)}`,text:fe(i)},{term:`Agent registry`,text:Jt(O,l(x.row,`[Registry Agents]`),At(c(x.row,`[Registry Updated]`)))}]})})]})]})}function $t({label:e,value:t}){return(0,X.jsxs)(`div`,{className:`flex items-baseline justify-between gap-200`,children:[(0,X.jsx)(`span`,{children:e}),(0,X.jsx)(`span`,{className:`font-numeric font-semibold whitespace-nowrap tabular-nums text-[length:var(--text-300)] text-foreground`,children:t})]})}var en=`Conservative to Optimistic`;function tn({range:e,onRetry:t}){switch(e.status){case`ready`:return(0,X.jsx)($t,{label:en,value:`${N(e.conservative,`whole`)} – ${N(e.optimistic,`whole`)}`});case`none`:return null;case`pending`:return(0,X.jsxs)(`div`,{className:`flex items-center justify-between gap-200`,children:[(0,X.jsx)(`span`,{children:en}),(0,X.jsxs)(`span`,{role:`status`,"data-query-loading":``,children:[(0,X.jsx)(`span`,{className:`sr-only`,children:`Loading`}),(0,X.jsx)(`span`,{"aria-hidden":`true`,className:`block h-200 w-[10ch] animate-pulse rounded-sm bg-muted`})]})]});case`error`:{let n=O(e.message);return(0,X.jsxs)(`div`,{className:`flex flex-wrap items-baseline justify-between gap-x-200`,children:[(0,X.jsx)(`span`,{children:en}),(0,X.jsxs)(`span`,{className:`flex items-baseline gap-200`,children:[(0,X.jsx)(`span`,{title:n?void 0:e.message,children:n?`Power BI is busy`:`Didn't load`}),(0,X.jsx)(`button`,{type:`button`,onClick:t,className:`font-semibold text-foreground underline underline-offset-2 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`,children:`Try again`})]})]})}}}function Z({children:e}){return(0,X.jsx)(`div`,{className:`flex flex-col gap-100`,children:e})}function nn({title:e,className:t,children:n}){return(0,X.jsxs)(`div`,{className:`flex flex-col gap-300`,children:[(0,X.jsx)(`h3`,{className:b(oe,`font-semibold text-foreground`),children:e}),(0,X.jsx)(`div`,{className:t,children:n})]})}var Q=e=>t=>l(t,e),rn=e=>G(l(e,`Studio Credits`),l(e,`Cowork Credits`)),an=n?`grid gap-300 md:grid-cols-3`:`grid gap-300 md:grid-cols-2`;function on(e){return e?n?{scope:`to satisfaction or credits`,reason:`feedback isn't linked to people, and Consumption Central records credits for the whole tenant.`}:{scope:`to satisfaction`,reason:`feedback isn't linked to people, so it covers everyone.`}:n?{scope:`to credits`,reason:`Consumption Central records credits for the whole tenant.`}:void 0}function sn({data:e}){let{summary:t,hoursRange:r,months:i,credits:a,creditsInRange:o,range:s}=e,u=t.row,d=s.range?.pair,f=!C(ne(),`productFeedback`),p=on(f),m=(0,L.useMemo)(()=>Ct(U(i.table)),[i.table]),h=(0,L.useMemo)(()=>Ct(U(a.table)),[a.table]),g=(0,L.useMemo)(()=>{let e=U(o.table),t=G(...e.map(e=>l(e,`Studio Credits`))),n=G(...e.map(e=>l(e,`Cowork Credits`)));return{studio:t,cowork:n,total:G(t,n)}},[o.table]),v=wt(u),y=jt(c(u,`[Habit Month]`)),x=d?`Arrows compare ${jt(d.current)}, the last full month, with ${jt(d.previous)}; totals are compared per day so month length doesn't skew them.`:`Arrows comparing one month with the one before appear when the date range covers two full months.`;return(0,X.jsxs)(P,{id:_(`the-bottom-line`),title:`The bottom line`,description:`What Copilot did, how widely people use it, and whether it is becoming how they work. ${x}`,children:[t.error===void 0?t.loaded?u?(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)(nn,{title:`Is it doing real work?`,className:an,children:[(0,X.jsx)(M,{label:`Expert-equivalent hours · Typical effort`,value:l(u,`[Hours]`),emphasis:!0,delta:K(`volume`,d,m,Q(`Hours`)),trend:q(`volume`,s.range,m,Q(`Hours`)),detail:(0,X.jsxs)(Z,{children:[(0,X.jsx)(tn,{range:Tt(t,r),onRetry:r.refetch}),v.minutesPerPersonWeek!==void 0&&(0,X.jsx)($t,{label:`Per person a week`,value:`${N(v.minutesPerPersonWeek,`whole`)} min`})]})}),(0,X.jsx)(M,{label:`Tasks delivered`,value:l(u,`[Tasks]`),delta:K(`volume`,d,m,Q(`Tasks`)),trend:q(`volume`,s.range,m,Q(`Tasks`)),detail:(0,X.jsxs)(Z,{children:[(0,X.jsx)(j,{label:`Per person a week`,value:v.tasksPerPersonWeek,format:`hours`}),(0,X.jsx)(j,{label:`Expert minutes per task`,value:v.minutesPerTask,format:`hours`})]})}),n&&(o.error===void 0?o.isLoading?(0,X.jsx)(D,{}):(0,X.jsx)(M,{label:`Credits consumed · whole tenant`,value:g.total===void 0?void 0:g.total/1e6,format:`millions`,delta:K(`volume`,d,h,rn,`neutral`),trend:q(`volume`,s.range,h,rn),detail:(0,X.jsxs)(Z,{children:[(0,X.jsx)(j,{label:`Copilot Studio agents`,value:g.studio===void 0?void 0:g.studio/1e6,format:`millions`}),(0,X.jsx)(j,{label:`Cowork`,value:g.cowork===void 0?void 0:g.cowork/1e6,format:`millions`})]})}):(0,X.jsx)(k,{message:o.error,onRetry:o.refetch}))]}),(0,X.jsxs)(nn,{title:`Is it becoming how people work?`,className:b(`grid gap-300`,f?`md:grid-cols-3`:`md:grid-cols-2`),children:[(0,X.jsx)(M,{label:`Licensed seats in use`,value:l(u,`[Seats In Use Pct]`),format:`percent`,delta:K(`rate`,d,m,Q(`Seats In Use Pct`)),trend:q(`rate`,s.range,m,Q(`Seats In Use Pct`)),detail:(0,X.jsxs)(Z,{children:[(0,X.jsx)(j,{label:`Licensed seats`,value:l(u,`[Licensed Seats]`)}),(0,X.jsx)(j,{label:`Seats in use`,value:l(u,`[Seats In Use]`)})]})}),(0,X.jsx)(M,{label:y?`Habit rate · ${y}`:`Habit rate`,value:v.habitRate,format:`percent`,delta:K(`rate`,d,m,Q(`Habit Pct`)),trend:q(`rate`,s.range,m,Q(`Habit Pct`)),detail:(0,X.jsxs)(Z,{children:[(0,X.jsx)(j,{label:`Habitual`,value:l(u,`[Habitual Pct]`),format:`percent`}),(0,X.jsx)(j,{label:`Power`,value:l(u,`[Power Pct]`),format:`percent`})]})}),f&&(0,X.jsx)(M,{label:`Satisfaction · thumbs up`,value:l(u,`[Satisfaction]`),format:`percent`,delta:K(`rate`,d,m,Q(`Satisfaction`)),trend:q(`rate`,s.range,m,Q(`Satisfaction`)),detail:(0,X.jsx)(Z,{children:(0,X.jsx)(j,{label:`Ratings`,value:l(u,`[Feedback]`)})})})]})]}):(0,X.jsx)(te,{title:`No Copilot activity`,description:`The semantic model returned nothing for the current selection.`}):(0,X.jsx)(`div`,{className:an,children:Array.from({length:n?3:2},(e,t)=>(0,X.jsx)(D,{},t))}):(0,X.jsx)(k,{message:t.error,onRetry:t.refetch}),p&&(0,X.jsx)(ue,{ignored:[`organizations`],scope:p.scope,reason:p.reason})]})}function cn(e,t,n){return r=>{let i=e.map(e=>r.columns.findIndex(t=>t.name===e));if(i.every(e=>e<0))return;let a=r.rows.map(e=>{let t=i.map(t=>t<0?void 0:e[t]).filter(e=>typeof e==`number`&&Number.isFinite(e));return[...e,t.length?t.reduce((e,t)=>e+t,0):null]});return n({...r,columns:[...r.columns,{name:t,displayName:t}],rows:a})}}var ln=pe({date:`Month Start`,value:`Hours`,of:`expert-equivalent hours`,period:`month`,format:`hours`}),un=cn([`Studio Credits`,`Cowork Credits`],`Credits`,pe({date:`Month Start`,value:`Credits`,of:`credits`,period:`month`})),dn=r({label:`Chat + Agent Interactions (Audit Logs)Task Breakdown Category`,value:`Hours`,of:`expert-equivalent hours`,format:`hours`}),fn=340,pn=`Six months to the end of the date range; months before it are faded`;function mn({data:e}){let{months:t,monthsSource:r,credits:i,creditsSource:a,summary:o}=e,s=l(o.row,`[Skills Available]`);return(0,X.jsx)(P,{id:_(`is-it-growing`),title:`Is it growing?`,description:n?`Expert-equivalent hours and credits consumed each month, on one timeline. Each colour is the same source in both charts.`:`Expert-equivalent hours each month, by where the work was done.`,actions:(0,X.jsx)(ye,{destination:`value`,stage:`task-breakdown`,children:`Open Value`}),children:(0,X.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,X.jsxs)(`div`,{className:`flex min-w-0 flex-col gap-300`,children:[(0,X.jsx)(E,{result:t,spec:r.vegaLiteSpec,height:fn,title:`Work delivered by month`,headline:ln,subtitle:`Expert-equivalent hours. ${pn}`,emptyTitle:`No work in these months`,emptyDescription:`There's no Copilot activity in the six months to the end of the date range.`}),n&&(0,X.jsx)(he,{from:[i.notFilteredBy]}),n&&(0,X.jsx)(E,{result:i,spec:a.vegaLiteSpec,height:fn,title:`Credits consumed by month`,headline:un,subtitle:`Whole tenant. ${pn}`,emptyTitle:`No credits in these months`,emptyDescription:`Consumption Central has no Copilot Studio or Cowork credits in the six months to the end of the date range.`})]}),(0,X.jsx)(`div`,{className:`xl:self-start`,children:(0,X.jsx)(T,{title:`How this is worked out`,notes:[{term:`Expert-equivalent hours`,text:`Each task counts the minutes an expert typically takes to do it without Copilot, from the Signal → Impact table. Typical effort; Conservative and Optimistic give the range.`},{term:`Tasks`,text:s===void 0?`Copilot interactions, each sorted into a kind of work.`:`Copilot interactions, sorted into ${N(s,`whole`)} kinds of work.`},{term:`Credits`,text:n?`Copilot Studio and Cowork credits from Consumption Central, for the whole tenant.`:void 0}],children:(0,X.jsx)(be,{destination:`value`,stage:`cost-vs-value`,children:`Need it in money? Open Cost vs value`})})})]})})}var hn=`Hours Per Seat Month`,gn=360;function _n(e,t,n,r){return{id:t,header:n,width:r,numericStyling:!0,cellRenderer:ge({domain:_e(e,t),format:ve(e,t)})}}function vn(e,t){return[{id:H,header:e,minWidth:180},{id:`Licensed Seats`,header:`Licensed seats`,width:132,numericStyling:!0},_n(t,`Seats In Use Pct`,`Seats in use`,124),_n(t,`Habit Pct`,`Habit rate`,116),{id:`Hours`,header:`Expert hours`,width:128,numericStyling:!0},_n(t,hn,`Hours per seat`,136)]}function yn(e,t,n){return`${N(e,`whole`)} ${e===1?t:n}`}function bn({data:e}){let{departments:t,summary:n}=e,{theme:r}=i(),o=d(),s=o.plural.charAt(0).toUpperCase()+o.plural.slice(1),c=(0,L.useMemo)(()=>xt(),[]),u=F(c),f=(0,L.useMemo)(()=>vn(o.label,t.table),[o.label,t.table]),p=(0,L.useMemo)(()=>at(o.label),[o.label]),m=t.table?.rows.length,h=n.row,g=fe(o),v=wt(h),y=l(h,`[Agent Hours]`),b=l(h,`[Agents In Use]`),x=l(h,`[Agent Users]`);return(0,X.jsxs)(P,{id:_(`where-it-is-landing`),title:`Where it is landing`,description:`Which ${o.plural} get the most from their seats, and what kind of work Copilot does for people.`,actions:(0,X.jsx)(ye,{destination:`work-patterns`,children:`Open Work patterns`}),children:[m!==void 0&&m>=3&&(0,X.jsx)(E,{result:t,spec:p,height:gn,title:`${s} by reach and depth`,subtitle:`One circle per ${o.noun}, sized by seats. Right: more seats in use. Up: more hours per seat. Dashes: the median.`,emptyTitle:`No ${o.plural} to compare`,emptyDescription:`Nobody in the current selection has a license or a task with ${o.noun} recorded.`}),(0,X.jsx)(w,{result:t,height:ce(m??6),emptyTitle:`No ${o.plural} to compare`,emptyDescription:de(`Nobody in the current selection has a license or a task with ${o.noun} recorded.`,o),children:e=>(0,X.jsx)(a,{columns:f,data:e,defaultSort:[{columnId:hn,direction:`desc`}],theme:r,header:{title:`${s} by expert hours per seat`,subtitle:`${yn(e.rows.length,o.noun,o.plural)}, most expert-equivalent hours per licensed seat a month first. Shading compares the ${o.plural} with each other.${g?` ${g}`:``}`}},o.column)}),(0,X.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,X.jsx)(`div`,{className:`min-w-0`,children:(0,X.jsx)(E,{result:u,spec:c.vegaLiteSpec,height:le(u.table?.rows.length??6),title:`What the work is`,headline:dn,subtitle:`The 6 kinds of work with the most expert-equivalent hours`,emptyTitle:`No kinds of work to show`,emptyDescription:`No task in the current selection has a kind of work other than General Chat or General Assistance.`})}),(0,X.jsx)(`div`,{className:`xl:self-start`,children:(0,X.jsx)(T,{title:`Agents`,notes:[{term:`Agents in use`,text:b===void 0?void 0:`${yn(b,`agent`,`agents`)}, used by ${yn(x,`person`,`people`)}`},{term:`Agent work`,text:y===void 0?void 0:`${N(y,`whole`)} expert-equivalent hours${v.agentShare===void 0?``:`, ${N(Math.round(v.agentShare*100)/100,`percent`)} of the total`}`}],children:(0,X.jsx)(be,{destination:`leaderboards`,stage:`leaderboard`,children:`Open Leaderboards`})})})]})]})}function xn(){let{filters:e,options:t,optionsError:n}=u(),r=o(e.dateRange,t),i=r?.from,a=r?.to,s=t?.firstDate,c=t?.lastDate;return{range:(0,L.useMemo)(()=>St(i,a,s,c),[i,a,s,c]),settled:t!==void 0||n!==void 0}}var Sn=[`--vl-blue`,`--vl-amber`,`--vl-lavender`],Cn=[`--vl-amber`,`--vl-lavender`],wn=[`dateRange`],$={connection:``,query:``},Tn=mt().query;function En(){let e=xn(),{window:t,start:r,end:i}=e.range??{},{dateRange:a}=u().filters,o=a!==void 0&&!f(a),{show:s}=re(),c=s(`where-it-is-landing`)||s(`what-needs-attention`),l=d(c),p=ae(Sn),m=ae(Cn),h=s(`the-bottom-line`)||s(`is-it-growing`),_=t&&h,v=(0,L.useMemo)(()=>t?{months:t.months.map(Je),rangeMonth:t.rangeMonth}:void 0,[t]),b=(0,L.useMemo)(()=>ft(v&&{...v,colors:p}),[v,p]),x=(0,L.useMemo)(()=>Qe(v&&{...v,colors:m}),[v,m]),S=I({..._t(),lead:!0,speculate:!0}),C=I(s(`the-bottom-line`)?{...ct(),lead:!0,speculate:!0}:{...ct(),...$}),w=F(h&&!o?{...b,query:Tn,lead:!0,speculate:!0}:_?{...b,lead:!0,speculate:!0}:{...b,...$},o&&_?[g(`'Calendar'[Date]`,t.from,t.to)]:[],wn),T=t?w:{...w,table:void 0,error:void 0,isLoading:!0},E=n&&_&&r&&i,D=(0,L.useMemo)(()=>E?et({trend:t,range:{from:r,to:i}}).query:``,[E,t,r,i]),{trend:O,range:k}=we(E?{...x,query:D}:{...x,...$},$e,[],wn),A=(0,L.useMemo)(()=>y(it(),l),[l]);return{range:e,summary:S,hoursRange:C,months:T,monthsSource:b,credits:O,creditsSource:x,creditsInRange:k,departments:F(c?A:{...A,...$})}}function Dn(){let e=En(),{optionsError:t,retryOptions:n}=u(),{show:r}=re();return t?(0,X.jsx)(k,{message:O(t.message)?t.message:`The dates with Copilot activity couldn't be read: ${t.message}`,onRetry:n}):e.range.settled&&!e.range.range?(0,X.jsx)(te,{title:`No Copilot activity in this date range`,description:`Choose a date range that overlaps the days with Copilot activity. The summary covers only those days.`}):(0,X.jsxs)(`div`,{className:`flex flex-col gap-800`,children:[r(`the-bottom-line`)&&(0,X.jsx)(sn,{data:e}),r(`the-bottom-line`)&&(0,X.jsx)(me,{page:`executive`}),r(`is-it-growing`)&&(0,X.jsx)(mn,{data:e}),r(`where-it-is-landing`)&&(0,X.jsx)(bn,{data:e}),r(`what-needs-attention`)&&(0,X.jsx)(Qt,{data:e})]})}function On(){return(0,X.jsx)(Ce,{readModel:n,children:(0,X.jsx)(Dn,{})})}export{On as ExecutiveScreen};