import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{n as t}from"./createLucideIcon-BXuy7Wl9.js";import{D as n,E as r,H as i,K as a,O as o,R as s,Z as c,_t as l,f as u,gt as d,ht as f,l as p,m,ot as h,t as g,ut as _,xt as v,yt as y}from"./utils-DUYIo-F3.js";import{a as b,i as ee,n as x,r as S,t as C}from"./report-panels-CkWa9AJj.js";import{n as te}from"./theme.context-nB_YDa86.js";import{t as ne}from"./dist-B9Q5JOXV.js";import{A as w,J as T,N as E,T as D,Y as O}from"./task-times.context-3Dus8clU.js";import{i as k}from"./stage-filter.context-BO0XkIwy.js";import{m as re}from"./root-C09FNmYf.js";import{a as ie,n as A,o as j,t as M}from"./kpi-card-BNTonUm8.js";import{t as N}from"./section-C3ntZHBX.js";import{n as ae,r as P}from"./color-scale-DTyjSAgS.js";import{n as F,r as oe,t as se}from"./headline-CtXokBCs.js";import{n as I,t as ce}from"./source-states-D12D9hmr.js";import{r as L,t as le}from"./use-table-query-tN0IUQR0.js";import{a as ue,i as R,n as de,r as z,t as B}from"./model-text-BHTCxKnW.js";import{a as fe,i as pe,r as V,t as me,u as he}from"./tree-grid-CoX8tm6H.js";import{t as H}from"./not-filtered-hint-CaqTmF2j.js";import{a as ge,n as _e,r as ve}from"./heat-gzD0bGVg.js";import{t as U}from"./choice-menu-CXHF_nAZ.js";import{t as ye}from"./grade-mark-weVwMAxM.js";var W=e(t(),1),be=`// The page's own slicer choices: the dates the model holds, the departments\r
// and agents with conversations, and bounded non-org grouping eligibility.\r
// Org grouping scans are deferred until the grouping menu is opened.\r
EVALUATE\r
VAR _first = MIN('Agent Performance'[InteractionDate])\r
VAR _last = MAX('Agent Performance'[InteractionDate])\r
RETURN\r
UNION(\r
    ROW("Kind", "First date", "Value", FORMAT(_first, "yyyy-MM-dd"), "Sort", 0),\r
    ROW("Kind", "Last date", "Value", FORMAT(_last, "yyyy-MM-dd"), "Sort", 0),\r
    SELECTCOLUMNS(\r
        FILTER(\r
            SUMMARIZECOLUMNS('Chat + Agent Org Data'[Organization], "@Conversations", [Total Conversations]),\r
            'Chat + Agent Org Data'[Organization] <> ""\r
        ),\r
        "Kind", "Department", "Value", 'Chat + Agent Org Data'[Organization], "Sort", [@Conversations]\r
    ),\r
    SELECTCOLUMNS(\r
        FILTER(\r
            SUMMARIZECOLUMNS('Agent Performance'[BotFriendlyName], "@Conversations", [Total Conversations]),\r
            'Agent Performance'[BotFriendlyName] <> ""\r
        ),\r
        "Kind", "Agent", "Value", 'Agent Performance'[BotFriendlyName], "Sort", [@Conversations]\r
    ),\r
    __GROUP_COUNTS__\r
)\r
ORDER BY [Kind] ASC, [Sort] DESC, [Value] ASC`,xe=`// Viewer-compatible attribute inventory from the Evaluator's row bridge.\r
EVALUATE\r
SELECTCOLUMNS(\r
    FILTER(\r
        VALUES('Org Attribute Source'[Attribute]),\r
        LEN(TRIM('Org Attribute Source'[Attribute])) > 0\r
    ),\r
    "Column", 'Org Attribute Source'[Attribute]\r
)\r
`,Se=`ROW(\r
    "Kind", "Group by",\r
    "Value", __ID__,\r
    "Sort", COUNTROWS(\r
        TOPN(\r
            2,\r
            FILTER(\r
                CALCULATETABLE(\r
                    SUMMARIZECOLUMNS(__COLUMN__, "@Conversations", [Total Conversations])\r
                    __ATTRIBUTE_FILTER__\r
                ),\r
                NOT ISBLANK(__COLUMN__) &&\r
                LEN(TRIM(CONVERT(__COLUMN__, STRING))) > 0 &&\r
                [@Conversations] > 0\r
            ),\r
            __COLUMN__, ASC\r
        )\r
    )\r
)\r
`,G=[{id:`agent`,label:`Agent`,column:`'Agent Performance'[BotFriendlyName]`},{id:`theme`,label:`Topic theme`,column:`'Agent Performance'[Topic Theme]`},{id:`topic`,label:`Topic`,column:`'Agent Performance'[Topic (resolved)]`,humanize:!0}],Ce={Organization:{id:`department`,label:`Department`},JobTitle:{id:`job-title`,label:`Job title`},officeLocation:{id:`office`,label:`Office`},country:{id:`country`,label:`Country`},usageLocation:{id:`usage-location`,label:`Usage location`},companyName:{id:`company`,label:`Company`},Function:{id:`function`,label:`Function`},Location:{id:`location`,label:`Location`}};function we(e){let t={__ID__:l(e.id),__COLUMN__:e.column,__ATTRIBUTE_FILTER__:e.attribute===void 0?``:`, ${Te(e)}`};return Se.replace(/__ID__|__COLUMN__|__ATTRIBUTE_FILTER__/g,e=>t[e]).trim()}function Te(e){return y(`'Org Attribute Source'[Attribute]`,e.attribute===void 0?[]:[e.attribute])}function Ee(){return{connection:`ae`,filters:O,query:xe}}function De(e){let t=(t=>e.columns.findIndex(e=>e.name===`[${t}]`))(`Column`);return _(e.rows.flatMap(e=>typeof e[t]==`string`?[{column:e[t],cardinality:2,maxLength:void 0}]:[])).map(e=>({...Object.hasOwn(Ce,e)?Ce[e]:{id:`org:${e}`,label:h(e).label},column:`'Org Attribute Source'[Value]`,attribute:e}))}var Oe={"[Kind]":{name:`Kind`,displayName:`Kind`},"[Value]":{name:`Value`,displayName:`Value`},"[Sort]":{name:`Sort`,displayName:`Conversations`,format:`#,0`}};function ke(e){let t=e.map(we);return{connection:`ae`,filters:O,query:t.length===0?``:`EVALUATE\n${t.length===1?t[0]:`UNION(\n${t.join(`,
`)}\n)`}`,columnMetadata:Oe}}function Ae(){return{connection:`ae`,filters:O,query:be.replace(`__GROUP_COUNTS__`,()=>G.map(we).join(`,
    `)),columnMetadata:Oe}}function je(e){let t={firstDate:void 0,lastDate:void 0,departments:[],agents:[],groupCounts:{}},[n,r,i]=[`Kind`,`Value`,`Sort`].map(t=>e.columns.findIndex(e=>e.name===t));for(let a of e.rows){let e=typeof a[r]==`string`?a[r].trim():``,o=typeof a[i]==`number`?a[i]:0;if(e)switch(a[n]){case`First date`:t.firstDate=e;break;case`Last date`:t.lastDate=e;break;case`Department`:t.departments.push({value:e,label:e,count:o});break;case`Agent`:t.agents.push({value:e,label:e,count:o});break;case`Group by`:t.groupCounts[e]=o}}return t}function Me(e){return e.firstDate!==void 0||e.agents.length>0}function Ne(e,t=[]){let n=t.filter(e=>e.id===`department`),r=t.filter(e=>e.id!==`department`);return[G[0],...n,...G.slice(1),...r].filter(t=>(e[t.id]??0)>=2)}var Pe={preset:`all`,department:void 0,agent:void 0};function Fe(e,t){let n=t?.firstDate,r=t?.lastDate;if(e!==`all`&&n&&r)return i(n,r).includes(e)?c(e,n,r):void 0}function Ie(e,t){let n=[],r=Fe(e.preset,t);return r&&n.push(d(`'Calendar'[Date]`,r.from,r.to)),e.department&&n.push(y(`'Chat + Agent Org Data'[Organization]`,[e.department])),e.agent&&n.push(y(`'Agent Performance'[BotFriendlyName]`,[e.agent])),n}var Le=`// Every headline rate for each group of the chosen Group by column, largest\r
// first. The app fills in a model-owned grouping or a discovered org column.\r
EVALUATE\r
VAR _groups =\r
    SUMMARIZECOLUMNS(\r
        __GROUP__,\r
        "@Conversations", [Total Conversations],\r
        "@People", [Unique Users],\r
        "@Resolution", [Resolution Rate],\r
        "@Failure", [True Failure Rate],\r
        "@Unintended", [Unintended Escalation Rate],\r
        "@Abandoned", [Abandonment Rate],\r
        "@CSAT", [Turn CSAT %],\r
        "@Errors", [Session Error Rate],\r
        "@Response", [Median Response Time (sec)]\r
    )\r
RETURN\r
SELECTCOLUMNS(\r
    FILTER(_groups, [@Conversations] > 0),\r
    "Group", __GROUP__,\r
    "Conversations", [@Conversations],\r
    "People", [@People],\r
    "Resolution Rate", [@Resolution],\r
    "True Failure Rate", [@Failure],\r
    "Unintended Escalation Rate", [@Unintended],\r
    "Abandonment Rate", [@Abandoned],\r
    "CSAT", [@CSAT],\r
    "Error Rate", [@Errors],\r
    "Median Response", [@Response]\r
)\r
ORDER BY [Conversations] DESC, [Group] ASC`,Re=`// The ten error codes behind the most errors, and whose fault each one is.\r
EVALUATE\r
VAR _codes =\r
    SUMMARIZECOLUMNS(\r
        'Agent Errors'[error_code],\r
        'Agent Errors'[Error Source],\r
        "@Errors", [Total Errors]\r
    )\r
RETURN\r
SELECTCOLUMNS(\r
    TOPN(10, FILTER(_codes, [@Errors] > 0), [@Errors], DESC, 'Agent Errors'[error_code], ASC),\r
    "Error Code", 'Agent Errors'[error_code],\r
    "Source", 'Agent Errors'[Error Source],\r
    "Errors", [@Errors]\r
)\r
ORDER BY [Errors] DESC, [Error Code] ASC`,ze={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Error Code`,type:`nominal`,title:null,sort:{field:`Errors`,op:`sum`,order:`descending`}},x:{field:`Errors`,type:`quantitative`,title:`Errors`},color:{field:`Source`,type:`nominal`,title:null,legend:{orient:`top`,direction:`horizontal`}},tooltip:[{field:`Error Code`,type:`nominal`,title:`Error`},{field:`Source`,type:`nominal`,title:`Cause`},{field:`Errors`,type:`quantitative`,title:`Errors`,format:`,.0f`}]}},Be=`// The Performance stage's headline figures and the model's own verdicts.\r
// Column names match the by-group query so this row doubles as its total.\r
EVALUATE\r
ROW(\r
    "Conversations", [Total Conversations],\r
    "People", [Unique Users],\r
    "Conversations Per Person", [Conversations per User],\r
    "Resolution Rate", [Resolution Rate],\r
    "Implied Success", [Implied Success %],\r
    "True Failure Rate", [True Failure Rate],\r
    "Failing Conversations", [Failing Conversations],\r
    "Hours Lost", [Est Hours Lost],\r
    "Unintended Escalation Rate", [Unintended Escalation Rate],\r
    "Intended Share", [Intended Share of Escalations],\r
    "Abandonment Rate", [Abandonment Rate],\r
    "CSAT", [Turn CSAT %],\r
    "Thumbs Up", [Turn Thumbs Up],\r
    "Thumbs Down", [Turn Thumbs Down],\r
    "Error Rate", [Session Error Rate],\r
    "Median Response", [Median Response Time (sec)],\r
    "Slow Replies", [Replies Over 10s %],\r
    "Reporting Window", [⭐ Reporting Window],\r
    "Verdict Performance", [⭐ Verdict: Performance],\r
    "Verdict Quality", [⭐ Verdict: Quality],\r
    "Verdict Adoption", [⭐ Verdict: Adoption],\r
    "Focus Agent", [⭐ Focus 1: Weakest Agent],\r
    "Focus Knowledge", [⭐ Focus 2: Knowledge Gap],\r
    "Focus Give Up", [⭐ Focus 3: Where Users Give Up],\r
    "Escalation Verdict", [⭐ Escalation Verdict],\r
    "Error Story", [Error Story (Live)],\r
    "Response Read", [◆ Response Read]\r
)`,Ve=`// How conversations ended, week by week. Weeks start on Monday. The model's\r
// outcome names are reworded here so every chart on the page uses the same.\r
EVALUATE\r
VAR _daily =\r
    ADDCOLUMNS(\r
        SUMMARIZECOLUMNS(\r
            'Calendar'[Date],\r
            'Agent Performance'[Outcome (Detailed)],\r
            "@Conversations", [Total Conversations]\r
        ),\r
        "@WeekStart", 'Calendar'[Date] - WEEKDAY('Calendar'[Date], 2) + 1\r
    )\r
VAR _weeks =\r
    GROUPBY(\r
        _daily,\r
        [@WeekStart],\r
        'Agent Performance'[Outcome (Detailed)],\r
        "@Conversations", SUMX(CURRENTGROUP(), [@Conversations])\r
    )\r
RETURN\r
SELECTCOLUMNS(\r
    FILTER(_weeks, [@Conversations] > 0),\r
    "Week Start", [@WeekStart],\r
    "Outcome",\r
        SWITCH(\r
            'Agent Performance'[Outcome (Detailed)],\r
            "Escalated - Intended", "Escalated by design",\r
            "Escalated - Unintended", "Escalated after an error",\r
            'Agent Performance'[Outcome (Detailed)]\r
        ),\r
    "Outcome Order",\r
        SWITCH(\r
            'Agent Performance'[Outcome (Detailed)],\r
            "Resolved", 1,\r
            "Escalated - Intended", 2,\r
            "Escalated - Unintended", 3,\r
            "Abandoned", 4,\r
            5\r
        ),\r
    "Conversations", [@Conversations]\r
)\r
ORDER BY [Week Start] ASC, [Outcome Order] ASC`,He={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`},transform:[{calculate:`toDate(datum['Week Start'])`,as:`Week Date`},{calculate:`time(datum['Week Date'])`,as:`Week Order`},{calculate:`timeFormat(datum['Week Date'], '%-d %b')`,as:`Week`},{joinaggregate:[{op:`sum`,field:`Conversations`,as:`Week Total`}],groupby:[`Week Start`]},{calculate:`datum['Conversations'] / datum['Week Total']`,as:`Share`}],encoding:{x:{field:`Week`,type:`ordinal`,title:null,sort:{field:`Week Order`,op:`min`,order:`ascending`},axis:{labelAngle:0,labelOverlap:`greedy`}},y:{field:`Conversations`,type:`quantitative`,title:`Conversations`,stack:`zero`},color:{field:`Outcome`,type:`nominal`,title:null,sort:[`Resolved`,`Escalated by design`,`Escalated after an error`,`Abandoned`],legend:{orient:`top`,direction:`horizontal`,labelLimit:240}},order:{field:`Outcome Order`,type:`quantitative`,sort:`ascending`},tooltip:[{field:`Week Date`,type:`temporal`,title:`Week starting`,format:`%d %b %Y`},{field:`Outcome`,type:`nominal`,title:`Ended`},{field:`Conversations`,type:`quantitative`,title:`Conversations`,format:`,.0f`},{field:`Share`,type:`quantitative`,title:`Share of the week`,format:`.0%`}]}},K={"[Conversations]":{name:`Conversations`,displayName:`Conversations`,format:`#,0`},"[People]":{name:`People`,displayName:`People`,format:`#,0`},"[Conversations Per Person]":{name:`Conversations Per Person`,displayName:`Conversations per person`,format:`0.0`},"[Resolution Rate]":{name:`Resolution Rate`,displayName:`Resolved`,format:m},"[Implied Success]":{name:`Implied Success`,displayName:`Implied success`,format:m},"[True Failure Rate]":{name:`True Failure Rate`,displayName:`Failed`,format:m},"[Failing Conversations]":{name:`Failing Conversations`,displayName:`Failing conversations`,format:`#,0`},"[Hours Lost]":{name:`Hours Lost`,displayName:`Hours lost`,format:u},"[Unintended Escalation Rate]":{name:`Unintended Escalation Rate`,displayName:`Escalated after an error`,format:m},"[Intended Share]":{name:`Intended Share`,displayName:`Escalations by design`,format:m},"[Abandonment Rate]":{name:`Abandonment Rate`,displayName:`Abandoned`,format:m},"[CSAT]":{name:`CSAT`,displayName:`Satisfaction`,format:m},"[Thumbs Up]":{name:`Thumbs Up`,displayName:`Thumbs up`,format:`#,0`},"[Thumbs Down]":{name:`Thumbs Down`,displayName:`Thumbs down`,format:`#,0`},"[Error Rate]":{name:`Error Rate`,displayName:`Hit an error`,format:m},"[Median Response]":{name:`Median Response`,displayName:`Median reply`,format:`0.0`},"[Slow Replies]":{name:`Slow Replies`,displayName:`Replies over 10s`,format:m},"[Reporting Window]":{name:`Reporting Window`,displayName:`Reporting window`},"[Verdict Performance]":{name:`Verdict Performance`,displayName:`Performance`},"[Verdict Quality]":{name:`Verdict Quality`,displayName:`Quality`},"[Verdict Adoption]":{name:`Verdict Adoption`,displayName:`Adoption`},"[Focus Agent]":{name:`Focus Agent`,displayName:`Weakest agent`},"[Focus Knowledge]":{name:`Focus Knowledge`,displayName:`Knowledge gap`},"[Focus Give Up]":{name:`Focus Give Up`,displayName:`Where people give up`},"[Escalation Verdict]":{name:`Escalation Verdict`,displayName:`Escalations`},"[Error Story]":{name:`Error Story`,displayName:`Errors`},"[Response Read]":{name:`Response Read`,displayName:`Reply speed`}};function Ue(){return{connection:`ae`,filters:T,query:Be,columnMetadata:K}}var We={"[Week Start]":{name:`Week Start`,displayName:`Week starting`,format:`dd mmm yyyy`},"[Outcome]":{name:`Outcome`,displayName:`Ended`},"[Outcome Order]":{name:`Outcome Order`,displayName:`Order`,format:`#,0`},"[Conversations]":{name:`Conversations`,displayName:`Conversations`,format:`#,0`}};function Ge(){return{connection:`ae`,filters:T,query:Ve,columnMetadata:We,vegaLiteSpec:He}}var Ke=[`Resolved`,`Escalated by design`,`Escalated after an error`,`Abandoned`],qe={"[Group]":{name:`Group`,displayName:`Group`},"[Conversations]":K[`[Conversations]`],"[People]":K[`[People]`],"[Resolution Rate]":K[`[Resolution Rate]`],"[True Failure Rate]":K[`[True Failure Rate]`],"[Unintended Escalation Rate]":K[`[Unintended Escalation Rate]`],"[Abandonment Rate]":K[`[Abandonment Rate]`],"[CSAT]":K[`[CSAT]`],"[Error Rate]":K[`[Error Rate]`],"[Median Response]":K[`[Median Response]`]};function Je(e){let t=Le.replaceAll(`__GROUP__`,()=>e.column);return{connection:`ae`,filters:T,query:f(t,e.attribute===void 0?[]:[Te(e)]),columnMetadata:qe}}function Ye(e,t){let n=e.columns.findIndex(e=>e.name===`Group`);return n<0?e:{columns:e.columns,rows:e.rows.map(e=>{let r=e[n],i=r==null?``:String(r).trim(),a=i===``?`(Not recorded)`:t.humanize?B(i):i;if(a===e[n])return e;let o=[...e];return o[n]=a,o})}}var Xe={"[Error Code]":{name:`Error Code`,displayName:`Error`},"[Source]":{name:`Source`,displayName:`Cause`},"[Errors]":{name:`Errors`,displayName:`Errors`,format:`#,0`}};function Ze(){return{connection:`ae`,filters:T,query:Re,columnMetadata:Xe,vegaLiteSpec:ze}}function Qe(e){return R(R(e,`Error Code`,B),`Source`,ue)}var $e=`// How each conversation was answered: the most advanced thing the agent did.\r
EVALUATE\r
SELECTCOLUMNS(\r
    FILTER(\r
        SUMMARIZECOLUMNS(\r
            'Agent Sessions'[Conversation Archetype],\r
            "@Conversations", COUNTROWS('Agent Sessions')\r
        ),\r
        [@Conversations] > 0\r
    ),\r
    "Archetype", 'Agent Sessions'[Conversation Archetype],\r
    "Conversations", [@Conversations]\r
)\r
ORDER BY [Conversations] DESC`,et={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},transform:[{joinaggregate:[{op:`sum`,field:`Conversations`,as:`All Conversations`}]},{calculate:`datum['Conversations'] / datum['All Conversations']`,as:`Share`}],encoding:{y:{field:`Archetype`,type:`nominal`,title:null,sort:{field:`Conversations`,op:`sum`,order:`descending`},axis:{labelLimit:220}},x:{field:`Conversations`,type:`quantitative`,title:`Conversations`},tooltip:[{field:`Archetype`,type:`nominal`,title:`Answered by`},{field:`Conversations`,type:`quantitative`,title:`Conversations`,format:`,.0f`},{field:`Share`,type:`quantitative`,title:`Share`,format:`.0%`}]}},tt=`// The Conversations & topics stage's headline figures and the model's own\r
// reads on topics, knowledge and feedback.\r
EVALUATE\r
ROW(\r
    "Topics", [Distinct Topics],\r
    "Grounded Rate", [Knowledge Grounded Rate],\r
    "Answered From Knowledge", [Answered from Knowledge],\r
    "Citations", [Knowledge Citation Count],\r
    "Knowledge Gap Rate", [Knowledge Gap Rate],\r
    "Knowledge Gap Conversations", [Knowledge Gap Conversations],\r
    "Turns Per Conversation", [Avg Turns per Session],\r
    "Single Turn Rate", [Single-Turn Rate],\r
    "Turns To Resolve", [Avg Turns to Resolve],\r
    "Friction", [Friction Score],\r
    "Friction Read", [◆ Friction Read],\r
    "Theme Verdict", [⭐ Theme Verdict],\r
    "Theme Coverage", [◆ Theme Coverage],\r
    "Top Fix", [⭐ Top Fix],\r
    "Backlog Summary", [⭐ Backlog Summary],\r
    "Topic Insight", [🧠 Topic Resolution Insight],\r
    "Knowledge Story", [📚 Knowledge Story (Live)],\r
    "Knowledge Gap Read", [◆ Knowledge Gap Read],\r
    "Depth Read", [◆ Depth Read],\r
    "Feedback Insight", [💬 Feedback Insight (Live)],\r
    "CSAT Story", [😊 CSAT Story (Live)]\r
)`,nt=`// What people wrote when they left feedback, most repeated first. Comments\r
// only: never the conversation itself.\r
EVALUATE\r
VAR _comments =\r
    SUMMARIZECOLUMNS(\r
        'Agent Turns'[feedback_comment],\r
        'Agent Turns'[feedback_verdict],\r
        "@Comments", COUNTROWS('Agent Turns')\r
    )\r
RETURN\r
SELECTCOLUMNS(\r
    TOPN(25, FILTER(_comments, 'Agent Turns'[feedback_comment] <> ""), [@Comments], DESC, 'Agent Turns'[feedback_comment], ASC),\r
    "Comment", 'Agent Turns'[feedback_comment],\r
    "Verdict", 'Agent Turns'[feedback_verdict],\r
    "Times", [@Comments]\r
)\r
ORDER BY [Times] DESC, [Comment] ASC`,rt=`// The ten knowledge sources agents cited most.\r
EVALUATE\r
VAR _sources =\r
    SUMMARIZECOLUMNS(\r
        'Knowledge Citations'[source_label],\r
        "@Citations", [Knowledge Citation Count]\r
    )\r
RETURN\r
SELECTCOLUMNS(\r
    TOPN(10, FILTER(_sources, [@Citations] > 0 && 'Knowledge Citations'[source_label] <> ""), [@Citations], DESC, 'Knowledge Citations'[source_label], ASC),\r
    "Source", 'Knowledge Citations'[source_label],\r
    "Citations", [@Citations]\r
)\r
ORDER BY [Citations] DESC, [Source] ASC`,it={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Source`,type:`nominal`,title:null,sort:{field:`Citations`,op:`sum`,order:`descending`},axis:{labelLimit:220}},x:{field:`Citations`,type:`quantitative`,title:`Citations`},tooltip:[{field:`Source`,type:`nominal`,title:`Source`},{field:`Citations`,type:`quantitative`,title:`Citations`,format:`,.0f`}]}},at=`// How conversations in each topic theme ended, in the same outcome words as\r
// the weekly chart.\r
EVALUATE\r
SELECTCOLUMNS(\r
    FILTER(\r
        SUMMARIZECOLUMNS(\r
            'Agent Performance'[Topic Theme],\r
            'Agent Performance'[Outcome (Detailed)],\r
            "@Conversations", [Total Conversations]\r
        ),\r
        [@Conversations] > 0\r
    ),\r
    "Theme", 'Agent Performance'[Topic Theme],\r
    "Outcome",\r
        SWITCH(\r
            'Agent Performance'[Outcome (Detailed)],\r
            "Escalated - Intended", "Escalated by design",\r
            "Escalated - Unintended", "Escalated after an error",\r
            'Agent Performance'[Outcome (Detailed)]\r
        ),\r
    "Outcome Order",\r
        SWITCH(\r
            'Agent Performance'[Outcome (Detailed)],\r
            "Resolved", 1,\r
            "Escalated - Intended", 2,\r
            "Escalated - Unintended", 3,\r
            "Abandoned", 4,\r
            5\r
        ),\r
    "Conversations", [@Conversations]\r
)\r
ORDER BY [Theme] ASC, [Outcome Order] ASC`,ot={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`},transform:[{joinaggregate:[{op:`sum`,field:`Conversations`,as:`Theme Total`}],groupby:[`Theme`]},{calculate:`datum['Conversations'] / datum['Theme Total']`,as:`Share`}],encoding:{y:{field:`Theme`,type:`nominal`,title:null,sort:{field:`Conversations`,op:`sum`,order:`descending`}},x:{field:`Conversations`,type:`quantitative`,title:`Conversations`,stack:`zero`},color:{field:`Outcome`,type:`nominal`,title:null,sort:[`Resolved`,`Escalated by design`,`Escalated after an error`,`Abandoned`],legend:{orient:`top`,direction:`horizontal`,labelLimit:240}},order:{field:`Outcome Order`,type:`quantitative`,sort:`ascending`},tooltip:[{field:`Theme`,type:`nominal`,title:`Theme`},{field:`Outcome`,type:`nominal`,title:`Ended`},{field:`Conversations`,type:`quantitative`,title:`Conversations`,format:`,.0f`},{field:`Share`,type:`quantitative`,title:`Share of the theme`,format:`.0%`}]}},st=`// Each theme, then its topics, with the most failing conversations first:\r
// row one is the biggest fix.\r
EVALUATE\r
SUMMARIZECOLUMNS(\r
    ROLLUPADDISSUBTOTAL(\r
        'Agent Performance'[Topic Theme], "Is Grand Total",\r
        'Agent Performance'[Topic (resolved)], "Is Group Total"\r
    ),\r
    "Conversations", [Total Conversations],\r
    "Resolved", [Theme Health %],\r
    "Failing", [Failing Conversations],\r
    "Friction", [Friction Score],\r
    "Knowledge Gaps", [Knowledge Gap Conversations],\r
    "Turns To Resolve", [Avg Turns to Resolve],\r
    "CSAT", [Turn CSAT %]\r
)\r
ORDER BY\r
    [Is Grand Total] DESC,\r
    [Is Group Total] DESC,\r
    [Failing] DESC,\r
    [Conversations] DESC`,ct={"[Topics]":{name:`Topics`,displayName:`Topics`,format:`#,0`},"[Grounded Rate]":{name:`Grounded Rate`,displayName:`Grounded in knowledge`,format:m},"[Answered From Knowledge]":{name:`Answered From Knowledge`,displayName:`Answered from knowledge`,format:`#,0`},"[Citations]":{name:`Citations`,displayName:`Citations`,format:`#,0`},"[Knowledge Gap Rate]":{name:`Knowledge Gap Rate`,displayName:`Searches with no answer`,format:m},"[Knowledge Gap Conversations]":{name:`Knowledge Gap Conversations`,displayName:`Conversations with a gap`,format:`#,0`},"[Turns Per Conversation]":{name:`Turns Per Conversation`,displayName:`Turns per conversation`,format:`0.0`},"[Single Turn Rate]":{name:`Single Turn Rate`,displayName:`Answered in one turn`,format:m},"[Turns To Resolve]":{name:`Turns To Resolve`,displayName:`Turns to resolve`,format:`0.0`},"[Friction]":{name:`Friction`,displayName:`Friction`,format:`0.0`},"[Friction Read]":{name:`Friction Read`,displayName:`Friction`},"[Theme Verdict]":{name:`Theme Verdict`,displayName:`Themes`},"[Theme Coverage]":{name:`Theme Coverage`,displayName:`Coverage`},"[Top Fix]":{name:`Top Fix`,displayName:`Top fix`},"[Backlog Summary]":{name:`Backlog Summary`,displayName:`Backlog`},"[Topic Insight]":{name:`Topic Insight`,displayName:`Topics`},"[Knowledge Story]":{name:`Knowledge Story`,displayName:`Knowledge`},"[Knowledge Gap Read]":{name:`Knowledge Gap Read`,displayName:`Knowledge gaps`},"[Depth Read]":{name:`Depth Read`,displayName:`Conversation depth`},"[Feedback Insight]":{name:`Feedback Insight`,displayName:`Feedback`},"[CSAT Story]":{name:`CSAT Story`,displayName:`Satisfaction`}};function lt(){return{connection:`ae`,filters:T,query:tt,columnMetadata:ct}}var ut={"[Theme]":{name:`Theme`,displayName:`Theme`},"[Outcome]":{name:`Outcome`,displayName:`Ended`},"[Outcome Order]":{name:`Outcome Order`,displayName:`Order`,format:`#,0`},"[Conversations]":{name:`Conversations`,displayName:`Conversations`,format:`#,0`}};function dt(){return{connection:`ae`,filters:T,query:at,columnMetadata:ut,vegaLiteSpec:ot}}var ft=`Agent PerformanceTopic Theme`,q=`Agent PerformanceTopic (resolved)`,pt=`Topic`,mt=[`Conversations`,`Resolved`,`Failing`,`Friction`,`Knowledge Gaps`,`Turns To Resolve`,`CSAT`],ht={"Agent Performance[Topic Theme]":{name:ft,displayName:`Theme`},"Agent Performance[Topic (resolved)]":{name:q,displayName:`Topic`},"[Is Grand Total]":{name:`Is Grand Total`},"[Is Group Total]":{name:`Is Group Total`},"[Conversations]":{name:`Conversations`,displayName:`Conversations`,format:`#,0`},"[Resolved]":{name:`Resolved`,displayName:`Resolved`,format:m},"[Failing]":{name:`Failing`,displayName:`Failing`,format:`#,0`},"[Friction]":{name:`Friction`,displayName:`Friction`,format:`0.0`},"[Knowledge Gaps]":{name:`Knowledge Gaps`,displayName:`Knowledge gaps`,format:`#,0`},"[Turns To Resolve]":{name:`Turns To Resolve`,displayName:`Turns to resolve`,format:`0.0`},"[CSAT]":{name:`CSAT`,displayName:`Satisfaction`,format:m}};function gt(){return{connection:`ae`,filters:T,query:st,columnMetadata:ht}}function _t(e){return he(R(e,q,B),{group:ft,leaf:q,grandTotalFlag:`Is Grand Total`,groupTotalFlag:`Is Group Total`,label:pt,fields:mt,blankLabel:`(Not recorded)`})}var vt={"[Source]":{name:`Source`,displayName:`Source`},"[Citations]":{name:`Citations`,displayName:`Citations`,format:`#,0`}};function yt(){return{connection:`ae`,filters:T,query:rt,columnMetadata:vt,vegaLiteSpec:it}}var bt={"[Archetype]":{name:`Archetype`,displayName:`Answered by`},"[Conversations]":{name:`Conversations`,displayName:`Conversations`,format:`#,0`}};function xt(){return{connection:`ae`,filters:T,query:$e,columnMetadata:bt,vegaLiteSpec:et}}function St(e){return R(e,`Archetype`,ue)}var Ct={"[Comment]":{name:`Comment`,displayName:`Comment`},"[Verdict]":{name:`Verdict`,displayName:`Feedback`},"[Times]":{name:`Times`,displayName:`Times`,format:`#,0`}};function wt(){return{connection:`ae`,filters:T,query:nt,columnMetadata:Ct}}var Tt=`EVALUATE\r
// Which Dataverse environments the transcript parser read on its last run, how\r
// far back, and what it found. Each run replaces the table.\r
SELECTCOLUMNS(\r
    'Evaluator Status',\r
    "Environment", 'Evaluator Status'[Environment],\r
    "Lookback Days", 'Evaluator Status'[LookbackDays],\r
    "Transcripts", 'Evaluator Status'[Transcripts],\r
    "Status", 'Evaluator Status'[Status]\r
)\r
ORDER BY [Environment] ASC\r
`,Et={"[Environment]":{name:`Environment`,displayName:`Environment`},"[Lookback Days]":{name:`Lookback Days`,displayName:`Days read`,format:`#,0`},"[Transcripts]":{name:`Transcripts`,displayName:`Transcripts`,format:`#,0`},"[Status]":{name:`Status`,displayName:`Status`}};function Dt(){return{connection:`ae`,filters:O,query:Tt,columnMetadata:Et}}function Ot(e){return o(e).flatMap(e=>{let t=n(e,`[Environment]`);return t?[{environment:t,days:r(e,`[Lookback Days]`)??0,transcripts:r(e,`[Transcripts]`)??0,status:n(e,`[Status]`)?.toLowerCase()??``}]:[]})}var kt=`To read other environments, run the installer, choose Repair or change, then Agent Evaluator, and tick the environments that hold your Copilot Studio agents. Copilot Studio usually keeps transcripts for 30 days, so older conversations can't be read.`,J=e=>e.map(e=>e.environment).join(`, `),At=e=>e>0?`the last ${e} days`:`all the history it holds`;function jt(e){if(!e||e.length===0)return;let t=[],n=e.filter(e=>e.status===`empty`||e.status===`ok`&&e.transcripts===0),r=new Map;for(let e of n)r.set(e.days,[...r.get(e.days)??[],e]);for(let[e,n]of r)t.push(`0 transcripts found in ${J(n)} in ${At(e)}.`);let i=e.filter(e=>e.status===`forbidden`);i.length>0&&t.push(`The load wasn't allowed to read ${J(i)}: the app that runs it needs to be an application user there with read access to conversation transcripts.`);let a=e.filter(e=>e.status===`error`);a.length>0&&t.push(`The load couldn't read ${J(a)}. The transcript parser's run log has the error.`);let o=e.filter(e=>e.status===`ok`&&e.transcripts>0);return o.length>0&&t.push(`${J(o)} had transcripts on the last load; they show here once the Agent Evaluator model refreshes.`),t.push(kt),{title:`No agent conversations found`,description:t.join(` `)}}var Mt=F({label:`Theme`,value:`Conversations`,of:`conversations`}),Nt=F({label:`Source`,value:`Citations`,of:`the citations shown`}),Pt=F({label:`Archetype`,value:`Conversations`,of:`conversations`}),Ft=se(F({label:`Outcome`,value:`Conversations`,of:`conversations`}),oe({date:`Week Start`,value:`Conversations`,of:`conversations`,period:`week`})),It=F({label:`Error Code`,value:`Errors`,of:`the errors shown`}),Y=v(),Lt=lt(),Rt=dt(),zt=gt(),Bt=yt(),Vt=xt(),Ht=wt(),Ut=`grid gap-300 md:grid-cols-2 xl:grid-cols-4`,Wt={disableStackedDataLabels:!0},X={perRow:36,chrome:148};function Gt(e){return[{id:`Conversations`,header:`Conversations`,width:132,format:V(`whole`),heat:!0},{id:`Resolved`,header:`Resolved`,width:104,format:V(`percent`)},{id:`Failing`,header:`Failing`,width:96,format:V(`whole`),heat:!0,heatColor:e},{id:`Friction`,header:`Friction`,width:96,format:V(`whole`)},{id:`Knowledge Gaps`,header:`Knowledge gaps`,width:144,format:V(`whole`)},{id:`Turns To Resolve`,header:`Turns to resolve`,width:140,format:V(`decimal`)},{id:`CSAT`,header:`Satisfaction`,width:116,format:V(`percent`)}]}function Kt(e,t){return[{id:`Verdict`,header:`Feedback`,width:132,cellRenderer:n=>{let r=pe(n);return(0,Y.jsxs)(`span`,{className:`inline-flex items-center gap-200`,children:[(0,Y.jsx)(`span`,{"aria-hidden":`true`,className:`size-200 shrink-0 rounded-full`,style:{backgroundColor:r===`Negative`?t:e}}),(0,Y.jsx)(`span`,{children:r})]})}},{id:`Comment`,header:`Comment`,minWidth:320},{id:`Times`,header:`Times`,width:96,numericStyling:!0,cellRenderer:V(`whole`)}]}function qt({extra:e}){let{theme:t}=te(),i=re(),a=(0,W.useMemo)(()=>ae(i,t),[i,t]),o=le(Lt,e),s=L(Rt,e),c=L(zt,e),l=L(Bt,e),u=L(Vt,e),d=L(Ht,e),f=o.row,m=(0,W.useMemo)(()=>u.table?St(u.table):void 0,[u.table]),h=(0,W.useMemo)(()=>P(Rt.vegaLiteSpec,Ke,[a.positive,a.neutral,a.caution,a.negative]),[a]),g=(0,W.useMemo)(()=>Gt(a.negative),[a.negative]),_=(0,W.useMemo)(()=>Kt(a.positive,a.negative),[a.positive,a.negative]),v=(0,W.useMemo)(()=>new Set(ve(s.table,`Theme`)).size,[s.table]),y=de(n(f,`[Friction Read]`));return(0,Y.jsxs)(N,{id:p(`agent-conversations`),title:`Conversations & topics`,description:`What people asked about, where agents found answers, and what people wrote back, never the conversations themselves.`,children:[(0,Y.jsx)(H,{from:[o.notFilteredBy]}),(0,Y.jsxs)(x,{summary:o,count:4,className:Ut,emptyTitle:`No agent conversations`,emptyDescription:`Agent Evaluator has no conversations for these slicers. Widen the dates, or check that the transcripts have loaded.`,children:[(0,Y.jsx)(M,{label:`Grounded in knowledge`,value:r(f,`[Grounded Rate]`),format:`percent`,emphasis:!0,detail:(0,Y.jsx)(A,{label:`Citations`,value:r(f,`[Citations]`)})}),(0,Y.jsx)(M,{label:`Searches with no answer`,value:r(f,`[Knowledge Gap Rate]`),format:`percent`,detail:(0,Y.jsx)(A,{label:`Conversations with a gap`,value:r(f,`[Knowledge Gap Conversations]`)})}),(0,Y.jsx)(M,{label:`Turns per conversation`,value:r(f,`[Turns Per Conversation]`),format:`rate`,detail:(0,Y.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,Y.jsx)(A,{label:`Answered in one turn`,value:r(f,`[Single Turn Rate]`),format:`percent`}),(0,Y.jsx)(A,{label:`Turns to resolve`,value:r(f,`[Turns To Resolve]`),format:`rate`})]})}),(0,Y.jsx)(M,{label:`Friction, out of 100`,value:r(f,`[Friction]`),detail:y?.label})]}),(0,Y.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,Y.jsx)(C,{result:s,spec:h,capabilities:Wt,height:j(v||6,X),headline:Mt,title:`How each theme ended`,subtitle:`Conversations in each topic theme, the busiest first`,emptyTitle:`No topic themes`,emptyDescription:`No conversations in these slicers were matched to a topic.`}),(0,Y.jsx)(`div`,{className:`self-start`,children:(0,Y.jsx)(S,{title:`What to fix first`,notes:[{term:`Top fix`,text:z(n(f,`[Top Fix]`))},{term:`Backlog`,text:z(n(f,`[Backlog Summary]`))},{term:`Themes`,text:z(n(f,`[Theme Verdict]`))},{term:`Topics`,text:z(n(f,`[Topic Insight]`))}]})})]}),(0,Y.jsx)(b,{result:c,toTree:_t,labelColumn:pt,labelHeader:`Theme / topic`,labelWidth:248,columns:g,variant:`topics`,title:`Topic health`,subtitle:`Each theme, then its topics, the most failing first`,emptyTitle:`No topics`,emptyDescription:`No conversations in these slicers were matched to a topic.`}),(0,Y.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-2`,children:[(0,Y.jsx)(C,{result:l,spec:Bt.vegaLiteSpec,height:j(l.table?.rows.length??6,X),headline:Nt,title:`Where answers came from`,subtitle:`The ten knowledge sources agents cited most`,emptyTitle:`No citations`,emptyDescription:`No answer in these slicers cited a knowledge source.`}),(0,Y.jsxs)(`div`,{className:`flex flex-col gap-500`,children:[(0,Y.jsx)(C,{result:u,table:m,spec:Vt.vegaLiteSpec,height:j(m?.rows.length??4,X),headline:Pt,title:`How each conversation was answered`,subtitle:`From your content, from the model alone, by a person, or not at all`,emptyTitle:`No answers`,emptyDescription:`No conversations fall in these slicers.`}),(0,Y.jsx)(S,{title:`Knowledge`,notes:[{term:`Sources`,text:z(n(f,`[Knowledge Story]`))},{term:`Gaps`,text:z(n(f,`[Knowledge Gap Read]`))},{term:`Conversation depth`,text:z(n(f,`[Depth Read]`))}]})]})]}),(0,Y.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,Y.jsx)(ee,{result:d,height:ie(d.table?.rows.length??8),emptyTitle:`No written feedback`,emptyDescription:`People left thumbs up or down in these slicers, but no comments.`,children:e=>(0,Y.jsx)(ne,{columns:_,data:e,theme:t,header:{title:`What people wrote`,subtitle:`Comments left with a thumbs up or down, the most repeated first`}})}),(0,Y.jsx)(`div`,{className:`self-start`,children:(0,Y.jsx)(S,{title:`What people said`,notes:[{term:`Feedback`,text:z(n(f,`[Feedback Insight]`))},{term:`Satisfaction`,text:z(n(f,`[CSAT Story]`))}]})})]})]})}function Jt({options:e,selection:t,onChange:n}){let r=e?.firstDate,o=e?.lastDate,c=(0,W.useMemo)(()=>r&&o?i(r,o).map(e=>({value:e,label:s[e]})):[],[r,o]),l=e?.departments??[],u=e?.agents??[],d=Fe(t.preset,e)??(r&&o?{from:r,to:o}:void 0);return(0,Y.jsxs)(`div`,{role:`group`,"aria-label":`Agent Evaluation slicers`,className:`z-10 md:sticky md:top-0 -mx-400 -mb-200 md:-mx-600 lg:-mx-700 flex flex-wrap items-center gap-x-400 gap-y-200 border-b border-border bg-background px-400 py-300 md:px-600 lg:px-700`,children:[(0,Y.jsx)(U,{label:`Date`,allLabel:s.all,choices:c,value:t.preset===`all`?void 0:t.preset,onChange:e=>n({...t,preset:e??`all`})}),l.length>1&&(0,Y.jsx)(U,{label:`Department`,allLabel:`All departments`,choices:l,value:t.department,onChange:e=>n({...t,department:e})}),u.length>1&&(0,Y.jsx)(U,{label:`Agent`,allLabel:`All agents`,choices:u,value:t.agent,onChange:e=>n({...t,agent:e})}),d&&(0,Y.jsx)(`span`,{className:g(`text-[length:var(--text-200)] leading-200`,`tabular-nums text-muted-foreground`),children:a(d.from,d.to)})]})}var Yt=`text-[length:var(--text-300)] leading-300 font-semibold text-foreground`;function Xt({verdicts:e,focus:t}){let n=(0,W.useId)(),r=e.flatMap(e=>{let t=de(e.text);return t?[{term:e.term,...t}]:[]}),i=t.flatMap(e=>{let t=z(e.text);return t?[{term:e.term,text:t}]:[]});return r.length===0&&i.length===0?null:(0,Y.jsxs)(`article`,{"aria-labelledby":n,className:`flex flex-col self-start rounded-xl border border-border bg-card`,children:[(0,Y.jsx)(`h3`,{id:n,className:`border-b border-border px-500 py-300 ${Yt}`,children:`The model's read`}),r.length>0&&(0,Y.jsx)(`dl`,{className:`flex flex-col divide-y divide-border px-500`,children:r.map(e=>(0,Y.jsxs)(`div`,{className:`flex flex-col gap-100 py-300`,children:[(0,Y.jsx)(`dt`,{className:`text-[length:var(--text-200)] leading-200 text-muted-foreground`,children:e.term}),(0,Y.jsxs)(`dd`,{className:`flex flex-wrap items-center gap-x-200 gap-y-100`,children:[(0,Y.jsx)(ye,{tone:e.tone}),(0,Y.jsx)(`span`,{className:`text-[length:var(--text-300)] leading-300 font-semibold text-foreground`,children:e.label}),e.figure&&(0,Y.jsx)(`span`,{className:`text-[length:var(--text-200)] leading-200 tabular-nums text-muted-foreground`,children:e.figure})]})]},e.term))}),i.length>0&&(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsx)(`h4`,{className:`border-t border-border px-500 pt-300 text-[length:var(--text-200)] leading-200 font-semibold text-foreground`,children:`Look first at`}),(0,Y.jsx)(`dl`,{className:`flex flex-col gap-200 px-500 pt-200 pb-400`,children:i.map(e=>(0,Y.jsxs)(`div`,{className:`flex flex-col gap-100-nudge`,children:[(0,Y.jsx)(`dt`,{className:`text-[length:var(--text-200)] leading-200 text-muted-foreground`,children:e.term}),(0,Y.jsx)(`dd`,{className:`text-[length:var(--text-200)] leading-200 text-foreground`,children:e.text})]},e.term))})]})]})}var Zt=Ue(),Qt=Ge(),$t=Ze(),Z=Ee(),en=`grid gap-300 md:grid-cols-2 xl:grid-cols-5`,tn={disableStackedDataLabels:!0},nn=[`System fault`,`User fault`],Q=V(`percent`),rn=V(`decimal`),$=[{id:`Conversations`,header:`Conversations`,width:128,format:V(`whole`),heat:`volume`},{id:`People`,header:`People`,width:88,format:V(`whole`)},{id:`Resolution Rate`,header:`Resolved`,width:100,format:Q},{id:`True Failure Rate`,header:`Failed`,width:84,format:Q,heat:`bad`},{id:`Unintended Escalation Rate`,header:`Escalated after an error`,width:180,format:Q},{id:`Abandonment Rate`,header:`Abandoned`,width:116,format:Q},{id:`CSAT`,header:`Satisfaction`,width:116,format:Q},{id:`Error Rate`,header:`Hit an error`,width:116,format:Q},{id:`Median Response`,header:`Median reply`,width:124,format:e=>{let t=rn(e);return t===null?null:`${t}s`}}];function an(e,t,n){return[{id:`Group`,header:t,width:180},...$.map(t=>({id:t.id,header:t.header,width:t.width,numericStyling:!0,cellRenderer:t.heat?ge({domain:_e(e,t.id),format:t.format,color:t.heat===`bad`?n:void 0}):t.format}))]}function on(e){if(!e)return;let t={Group:`All conversations`};for(let n of $)t[n.id]=r(e,`[${n.id}]`);return fe(t,[{id:`Group`},...$])}function sn({options:e,extra:t}){let{theme:i}=te(),a=re(),o=(0,W.useMemo)(()=>ae(a,i),[a,i]),[s,c]=(0,W.useState)(!1),l=w({...Z,query:s?Z.query:``}),u=(0,W.useMemo)(()=>l.data?.status===`success`?De(l.data.table):[],[l.data]),d=(0,W.useMemo)(()=>ke(u),[u]),f=L(d),m=(0,W.useMemo)(()=>Ne({...e?.groupCounts,...f.table?je(f.table).groupCounts:{}},u),[e?.groupCounts,f.table,u]),[h,g]=(0,W.useState)(),_=m.find(e=>e.id===h)??m[0]??G[0],v=(0,W.useMemo)(()=>Je(_),[_]),y=le(Zt,t),b=L(Qt,t),T=L(v,t),E=L($t,t),D=y.row,O=(0,W.useMemo)(()=>T.table?Ye(T.table,_):void 0,[T.table,_]),k=(0,W.useMemo)(()=>E.table?Qe(E.table):void 0,[E.table]),F=(0,W.useMemo)(()=>P(Qt.vegaLiteSpec,Ke,[o.positive,o.neutral,o.caution,o.negative]),[o]),oe=(0,W.useMemo)(()=>P($t.vegaLiteSpec,nn,[o.negative,o.neutral]),[o]),se=(0,W.useMemo)(()=>an(O,_.label,o.negative),[O,_.label,o.negative]),I=(0,W.useMemo)(()=>(O?.rows.length??0)>1?on(D):void 0,[O,D]),ce=(O?.rows.length??0)+ +!!I;return(0,Y.jsxs)(N,{id:p(`agent-performance`),title:`Performance`,description:`How many conversations agents had, how they ended, and what people thought of them.`,actions:(0,Y.jsx)(U,{label:`Group by`,allLabel:m[0]?.label??`No groups to compare`,choices:m.slice(1).map(e=>({value:e.id,label:e.label})),value:m.length===0||_.id===m[0].id?void 0:_.id,onChange:g,onOpen:()=>{c(!0),l.error&&l.refetch(),f.error&&f.refetch()}}),children:[s&&l.isLoading&&(0,Y.jsx)(`p`,{role:`status`,children:`Loading org groupings…`}),s&&d.query&&f.isLoading&&(0,Y.jsx)(`p`,{role:`status`,children:`Checking org groupings…`}),s&&(l.error||f.error)&&(0,Y.jsx)(`p`,{role:`status`,children:`Org groupings could not be loaded. Open Group by to try again.`}),(0,Y.jsx)(H,{from:[y.notFilteredBy]}),(0,Y.jsxs)(x,{summary:y,count:5,className:en,emptyTitle:`No agent conversations`,emptyDescription:`Agent Evaluator has no conversations for these slicers. Widen the dates, or check that the transcripts have loaded.`,children:[(0,Y.jsx)(M,{label:`Conversations`,value:r(D,`[Conversations]`),emphasis:!0,detail:(0,Y.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,Y.jsx)(A,{label:`People`,value:r(D,`[People]`)}),(0,Y.jsx)(A,{label:`Per person`,value:r(D,`[Conversations Per Person]`),format:`rate`})]})}),(0,Y.jsx)(M,{label:`Resolved`,value:r(D,`[Resolution Rate]`),format:`percent`,detail:(0,Y.jsx)(A,{label:`Implied success`,value:r(D,`[Implied Success]`),format:`percent`})}),(0,Y.jsx)(M,{label:`Failed`,value:r(D,`[True Failure Rate]`),format:`percent`,detail:(0,Y.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,Y.jsx)(A,{label:`Failing conversations`,value:r(D,`[Failing Conversations]`)}),(0,Y.jsx)(A,{label:`Hours lost`,value:r(D,`[Hours Lost]`),format:`hours`})]})}),(0,Y.jsx)(M,{label:`Abandoned`,value:r(D,`[Abandonment Rate]`),format:`percent`,detail:(0,Y.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,Y.jsx)(A,{label:`Escalated after an error`,value:r(D,`[Unintended Escalation Rate]`),format:`percent`}),(0,Y.jsx)(A,{label:`Hit an error`,value:r(D,`[Error Rate]`),format:`percent`})]})}),(0,Y.jsx)(M,{label:`Satisfaction`,value:r(D,`[CSAT]`),format:`percent`,detail:(0,Y.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,Y.jsx)(A,{label:`Thumbs up`,value:r(D,`[Thumbs Up]`)}),(0,Y.jsx)(A,{label:`Thumbs down`,value:r(D,`[Thumbs Down]`)})]})})]}),(0,Y.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,Y.jsx)(C,{result:b,spec:F,capabilities:tn,height:380,headline:Ft,title:`How conversations ended`,subtitle:`Conversations each week, by how they ended`,emptyTitle:`No weekly conversations`,emptyDescription:`No agent conversations fall in these dates.`}),(0,Y.jsx)(Xt,{verdicts:[{term:`Performance`,text:n(D,`[Verdict Performance]`)},{term:`Quality`,text:n(D,`[Verdict Quality]`)},{term:`Adoption`,text:n(D,`[Verdict Adoption]`)}],focus:[{term:`Weakest agent`,text:n(D,`[Focus Agent]`)},{term:`Knowledge`,text:n(D,`[Focus Knowledge]`)},{term:`Where people give up`,text:n(D,`[Focus Give Up]`)}]})]}),(0,Y.jsx)(ee,{result:T,table:O,height:ie(ce,me),emptyTitle:`No groups to compare`,emptyDescription:`No conversations in these slicers carry this field.`,children:e=>(0,Y.jsx)(ne,{columns:se,data:e,grandTotals:I?{position:`bottom`,data:I}:void 0,theme:i,header:{title:`Performance by ${_.label.toLowerCase()}`,subtitle:`The busiest first, with every rate side by side`}},_.id)}),(0,Y.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,Y.jsx)(C,{result:E,table:k,spec:oe,height:j(k?.rows.length??6,{perRow:36,chrome:148}),headline:It,title:`What went wrong`,subtitle:`The ten most common errors, and whether the agent or the person hit them`,emptyTitle:`No errors`,emptyDescription:`No conversation in these slicers hit an error.`}),(0,Y.jsx)(`div`,{className:`self-start`,children:(0,Y.jsx)(S,{title:`Errors and hand-offs`,notes:[{term:`Errors`,text:z(n(D,`[Error Story]`))},{term:`Escalations`,text:z(n(D,`[Escalation Verdict]`))},{term:`Reply speed`,text:z(n(D,`[Response Read]`))}]})})]})]})}var cn=Ae(),ln=Dt(),un={anchor:p(`agent-performance`),page:`Agent Evaluation`,model:`Agent Evaluator`};function dn(){let e=L(cn),t=(0,W.useMemo)(()=>e.table?je(e.table):void 0,[e.table]),{show:n,inPack:r}=k(),[i,a]=(0,W.useState)(Pe),o=(0,W.useMemo)(()=>Ie(i,t),[i,t]),s=t!==void 0&&!Me(t),c=w({connection:ln.connection,query:s?ln.query:``}),l=(0,W.useMemo)(()=>c.data?.status===`success`?jt(Ot(c.data.table)):void 0,[c.data]),u=E(e.error);return e.error!==void 0&&!u?(0,Y.jsx)(I,{...un,alias:`ae`,message:e.error,onRetry:e.refetch}):s?(0,Y.jsx)(ce,{...un,title:l?.title??`No agent conversations yet`,description:l?.description??`Agent Evaluator is connected, but its model holds no Copilot Studio conversations. Once its lakehouse is loaded and the model refreshes, this page fills in.`}):(0,Y.jsxs)(`div`,{className:`flex flex-col gap-800`,children:[u&&e.error&&(0,Y.jsx)(D,{message:e.error,onRetry:e.refetch}),!r&&(0,Y.jsx)(Jt,{options:t,selection:i,onChange:a}),n(`agent-performance`)&&(0,Y.jsx)(sn,{options:t,extra:o}),n(`agent-conversations`)&&(0,Y.jsx)(qt,{extra:o})]})}export{dn as AgentEvaluationScreen};