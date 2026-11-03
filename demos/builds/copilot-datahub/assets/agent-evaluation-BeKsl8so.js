import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-CQOZoUwg.js";import{n}from"./theme.context-RSsoaF3c.js";import{t as r}from"./dist-DjvcfNLg.js";import{D as i,E as a,H as o,K as s,O as c,R as l,Z as u,_t as d,f,gt as p,ht as m,l as h,m as g,ot as _,t as v,ut as y,wt as b,yt as x}from"./utils-CCoPj5LP.js";import{a as ee,i as te,n as ne,r as S,t as C}from"./report-panels-dbK2-7A9.js";import{A as re,J as w,N as T,T as E,Y as D}from"./task-times.context-WIEQAetj.js";import{i as O}from"./stage-filter.context-DYufJONF.js";import{m as ie}from"./root-Dy8LPudF.js";import{a as ae,n as k,o as A,t as j}from"./kpi-card-D03NeHc2.js";import{t as M}from"./section-p8LJFb5N.js";import{n as N,r as P}from"./color-scale-DTyjSAgS.js";import{n as F,r as oe,t as se}from"./headline-CtXokBCs.js";import{n as I,t as ce}from"./source-states-DTOgIi1U.js";import{r as L,t as le}from"./use-table-query-D491W46Z.js";import{a as ue,i as R,n as de,r as z,t as B}from"./model-text-BHTCxKnW.js";import{a as fe,i as pe,r as V,t as me,u as he}from"./tree-grid-BVmOVv3M.js";import{t as H}from"./not-filtered-hint-CICeGIQd.js";import{a as ge,n as _e,r as ve}from"./heat-Cx7mdvL8.js";import{t as U}from"./choice-menu-vIjhkSMp.js";import{t as ye}from"./grade-mark-CHTtACXs.js";var W=e(t(),1),be=`// The page's own slicer choices: the dates the model holds, the departments\r
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
`,G=[{id:`agent`,label:`Agent`,column:`'Agent Performance'[BotFriendlyName]`},{id:`theme`,label:`Topic theme`,column:`'Agent Performance'[Topic Theme]`},{id:`topic`,label:`Topic`,column:`'Agent Performance'[Topic (resolved)]`,humanize:!0}],Ce={Organization:{id:`department`,label:`Department`},JobTitle:{id:`job-title`,label:`Job title`},officeLocation:{id:`office`,label:`Office`},country:{id:`country`,label:`Country`},usageLocation:{id:`usage-location`,label:`Usage location`},companyName:{id:`company`,label:`Company`},Function:{id:`function`,label:`Function`},Location:{id:`location`,label:`Location`}};function we(e){let t={__ID__:d(e.id),__COLUMN__:e.column,__ATTRIBUTE_FILTER__:e.attribute===void 0?``:`, ${Te(e)}`};return Se.replace(/__ID__|__COLUMN__|__ATTRIBUTE_FILTER__/g,e=>t[e]).trim()}function Te(e){return x(`'Org Attribute Source'[Attribute]`,e.attribute===void 0?[]:[e.attribute])}function Ee(){return{connection:`ae`,filters:D,query:xe}}function De(e){let t=(t=>e.columns.findIndex(e=>e.name===`[${t}]`))(`Column`);return y(e.rows.flatMap(e=>typeof e[t]==`string`?[{column:e[t],cardinality:2,maxLength:void 0}]:[])).map(e=>({...Object.hasOwn(Ce,e)?Ce[e]:{id:`org:${e}`,label:_(e).label},column:`'Org Attribute Source'[Value]`,attribute:e}))}var Oe={"[Kind]":{name:`Kind`,displayName:`Kind`},"[Value]":{name:`Value`,displayName:`Value`},"[Sort]":{name:`Sort`,displayName:`Conversations`,format:`#,0`}};function ke(e){let t=e.map(we);return{connection:`ae`,filters:D,query:t.length===0?``:`EVALUATE\n${t.length===1?t[0]:`UNION(\n${t.join(`,
`)}\n)`}`,columnMetadata:Oe}}function Ae(){return{connection:`ae`,filters:D,query:be.replace(`__GROUP_COUNTS__`,()=>G.map(we).join(`,
    `)),columnMetadata:Oe}}function je(e){let t={firstDate:void 0,lastDate:void 0,departments:[],agents:[],groupCounts:{}},[n,r,i]=[`Kind`,`Value`,`Sort`].map(t=>e.columns.findIndex(e=>e.name===t));for(let a of e.rows){let e=typeof a[r]==`string`?a[r].trim():``,o=typeof a[i]==`number`?a[i]:0;if(e)switch(a[n]){case`First date`:t.firstDate=e;break;case`Last date`:t.lastDate=e;break;case`Department`:t.departments.push({value:e,label:e,count:o});break;case`Agent`:t.agents.push({value:e,label:e,count:o});break;case`Group by`:t.groupCounts[e]=o}}return t}function Me(e){return e.firstDate!==void 0||e.agents.length>0}function Ne(e,t=[]){let n=t.filter(e=>e.id===`department`),r=t.filter(e=>e.id!==`department`);return[G[0],...n,...G.slice(1),...r].filter(t=>(e[t.id]??0)>=2)}var Pe={preset:`all`,department:void 0,agent:void 0};function Fe(e,t){let n=t?.firstDate,r=t?.lastDate;if(e!==`all`&&n&&r)return o(n,r).includes(e)?u(e,n,r):void 0}function Ie(e,t){let n=[],r=Fe(e.preset,t);return r&&n.push(p(`'Calendar'[Date]`,r.from,r.to)),e.department&&n.push(x(`'Chat + Agent Org Data'[Organization]`,[e.department])),e.agent&&n.push(x(`'Agent Performance'[BotFriendlyName]`,[e.agent])),n}var Le=`// Every headline rate for each group of the chosen Group by column, largest\r
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
ORDER BY [Week Start] ASC, [Outcome Order] ASC`,He={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`},transform:[{calculate:`toDate(datum['Week Start'])`,as:`Week Date`},{calculate:`time(datum['Week Date'])`,as:`Week Order`},{calculate:`timeFormat(datum['Week Date'], '%-d %b')`,as:`Week`},{joinaggregate:[{op:`sum`,field:`Conversations`,as:`Week Total`}],groupby:[`Week Start`]},{calculate:`datum['Conversations'] / datum['Week Total']`,as:`Share`}],encoding:{x:{field:`Week`,type:`ordinal`,title:null,sort:{field:`Week Order`,op:`min`,order:`ascending`},axis:{labelAngle:0,labelOverlap:`greedy`}},y:{field:`Conversations`,type:`quantitative`,title:`Conversations`,stack:`zero`},color:{field:`Outcome`,type:`nominal`,title:null,sort:[`Resolved`,`Escalated by design`,`Escalated after an error`,`Abandoned`],legend:{orient:`top`,direction:`horizontal`,labelLimit:240}},order:{field:`Outcome Order`,type:`quantitative`,sort:`ascending`},tooltip:[{field:`Week Date`,type:`temporal`,title:`Week starting`,format:`%d %b %Y`},{field:`Outcome`,type:`nominal`,title:`Ended`},{field:`Conversations`,type:`quantitative`,title:`Conversations`,format:`,.0f`},{field:`Share`,type:`quantitative`,title:`Share of the week`,format:`.0%`}]}},K={"[Conversations]":{name:`Conversations`,displayName:`Conversations`,format:`#,0`},"[People]":{name:`People`,displayName:`People`,format:`#,0`},"[Conversations Per Person]":{name:`Conversations Per Person`,displayName:`Conversations per person`,format:`0.0`},"[Resolution Rate]":{name:`Resolution Rate`,displayName:`Resolved`,format:g},"[Implied Success]":{name:`Implied Success`,displayName:`Implied success`,format:g},"[True Failure Rate]":{name:`True Failure Rate`,displayName:`Failed`,format:g},"[Failing Conversations]":{name:`Failing Conversations`,displayName:`Failing conversations`,format:`#,0`},"[Hours Lost]":{name:`Hours Lost`,displayName:`Hours lost`,format:f},"[Unintended Escalation Rate]":{name:`Unintended Escalation Rate`,displayName:`Escalated after an error`,format:g},"[Intended Share]":{name:`Intended Share`,displayName:`Escalations by design`,format:g},"[Abandonment Rate]":{name:`Abandonment Rate`,displayName:`Abandoned`,format:g},"[CSAT]":{name:`CSAT`,displayName:`Satisfaction`,format:g},"[Thumbs Up]":{name:`Thumbs Up`,displayName:`Thumbs up`,format:`#,0`},"[Thumbs Down]":{name:`Thumbs Down`,displayName:`Thumbs down`,format:`#,0`},"[Error Rate]":{name:`Error Rate`,displayName:`Hit an error`,format:g},"[Median Response]":{name:`Median Response`,displayName:`Median reply`,format:`0.0`},"[Slow Replies]":{name:`Slow Replies`,displayName:`Replies over 10s`,format:g},"[Reporting Window]":{name:`Reporting Window`,displayName:`Reporting window`},"[Verdict Performance]":{name:`Verdict Performance`,displayName:`Performance`},"[Verdict Quality]":{name:`Verdict Quality`,displayName:`Quality`},"[Verdict Adoption]":{name:`Verdict Adoption`,displayName:`Adoption`},"[Focus Agent]":{name:`Focus Agent`,displayName:`Weakest agent`},"[Focus Knowledge]":{name:`Focus Knowledge`,displayName:`Knowledge gap`},"[Focus Give Up]":{name:`Focus Give Up`,displayName:`Where people give up`},"[Escalation Verdict]":{name:`Escalation Verdict`,displayName:`Escalations`},"[Error Story]":{name:`Error Story`,displayName:`Errors`},"[Response Read]":{name:`Response Read`,displayName:`Reply speed`}};function Ue(){return{connection:`ae`,filters:w,query:Be,columnMetadata:K}}var We={"[Week Start]":{name:`Week Start`,displayName:`Week starting`,format:`dd mmm yyyy`},"[Outcome]":{name:`Outcome`,displayName:`Ended`},"[Outcome Order]":{name:`Outcome Order`,displayName:`Order`,format:`#,0`},"[Conversations]":{name:`Conversations`,displayName:`Conversations`,format:`#,0`}};function Ge(){return{connection:`ae`,filters:w,query:Ve,columnMetadata:We,vegaLiteSpec:He}}var Ke=[`Resolved`,`Escalated by design`,`Escalated after an error`,`Abandoned`],qe={"[Group]":{name:`Group`,displayName:`Group`},"[Conversations]":K[`[Conversations]`],"[People]":K[`[People]`],"[Resolution Rate]":K[`[Resolution Rate]`],"[True Failure Rate]":K[`[True Failure Rate]`],"[Unintended Escalation Rate]":K[`[Unintended Escalation Rate]`],"[Abandonment Rate]":K[`[Abandonment Rate]`],"[CSAT]":K[`[CSAT]`],"[Error Rate]":K[`[Error Rate]`],"[Median Response]":K[`[Median Response]`]};function Je(e){let t=Le.replaceAll(`__GROUP__`,()=>e.column);return{connection:`ae`,filters:w,query:m(t,e.attribute===void 0?[]:[Te(e)]),columnMetadata:qe}}function Ye(e,t){let n=e.columns.findIndex(e=>e.name===`Group`);return n<0?e:{columns:e.columns,rows:e.rows.map(e=>{let r=e[n],i=r==null?``:String(r).trim(),a=i===``?`(Not recorded)`:t.humanize?B(i):i;if(a===e[n])return e;let o=[...e];return o[n]=a,o})}}var Xe={"[Error Code]":{name:`Error Code`,displayName:`Error`},"[Source]":{name:`Source`,displayName:`Cause`},"[Errors]":{name:`Errors`,displayName:`Errors`,format:`#,0`}};function Ze(){return{connection:`ae`,filters:w,query:Re,columnMetadata:Xe,vegaLiteSpec:ze}}function Qe(e){return R(R(e,`Error Code`,B),`Source`,ue)}var $e=`// How each conversation was answered: the most advanced thing the agent did.\r
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
    [Conversations] DESC`,ct={"[Topics]":{name:`Topics`,displayName:`Topics`,format:`#,0`},"[Grounded Rate]":{name:`Grounded Rate`,displayName:`Grounded in knowledge`,format:g},"[Answered From Knowledge]":{name:`Answered From Knowledge`,displayName:`Answered from knowledge`,format:`#,0`},"[Citations]":{name:`Citations`,displayName:`Citations`,format:`#,0`},"[Knowledge Gap Rate]":{name:`Knowledge Gap Rate`,displayName:`Searches with no answer`,format:g},"[Knowledge Gap Conversations]":{name:`Knowledge Gap Conversations`,displayName:`Conversations with a gap`,format:`#,0`},"[Turns Per Conversation]":{name:`Turns Per Conversation`,displayName:`Turns per conversation`,format:`0.0`},"[Single Turn Rate]":{name:`Single Turn Rate`,displayName:`Answered in one turn`,format:g},"[Turns To Resolve]":{name:`Turns To Resolve`,displayName:`Turns to resolve`,format:`0.0`},"[Friction]":{name:`Friction`,displayName:`Friction`,format:`0.0`},"[Friction Read]":{name:`Friction Read`,displayName:`Friction`},"[Theme Verdict]":{name:`Theme Verdict`,displayName:`Themes`},"[Theme Coverage]":{name:`Theme Coverage`,displayName:`Coverage`},"[Top Fix]":{name:`Top Fix`,displayName:`Top fix`},"[Backlog Summary]":{name:`Backlog Summary`,displayName:`Backlog`},"[Topic Insight]":{name:`Topic Insight`,displayName:`Topics`},"[Knowledge Story]":{name:`Knowledge Story`,displayName:`Knowledge`},"[Knowledge Gap Read]":{name:`Knowledge Gap Read`,displayName:`Knowledge gaps`},"[Depth Read]":{name:`Depth Read`,displayName:`Conversation depth`},"[Feedback Insight]":{name:`Feedback Insight`,displayName:`Feedback`},"[CSAT Story]":{name:`CSAT Story`,displayName:`Satisfaction`}};function lt(){return{connection:`ae`,filters:w,query:tt,columnMetadata:ct}}var ut={"[Theme]":{name:`Theme`,displayName:`Theme`},"[Outcome]":{name:`Outcome`,displayName:`Ended`},"[Outcome Order]":{name:`Outcome Order`,displayName:`Order`,format:`#,0`},"[Conversations]":{name:`Conversations`,displayName:`Conversations`,format:`#,0`}};function dt(){return{connection:`ae`,filters:w,query:at,columnMetadata:ut,vegaLiteSpec:ot}}var ft=`Agent PerformanceTopic Theme`,q=`Agent PerformanceTopic (resolved)`,pt=`Topic`,mt=[`Conversations`,`Resolved`,`Failing`,`Friction`,`Knowledge Gaps`,`Turns To Resolve`,`CSAT`],ht={"Agent Performance[Topic Theme]":{name:ft,displayName:`Theme`},"Agent Performance[Topic (resolved)]":{name:q,displayName:`Topic`},"[Is Grand Total]":{name:`Is Grand Total`},"[Is Group Total]":{name:`Is Group Total`},"[Conversations]":{name:`Conversations`,displayName:`Conversations`,format:`#,0`},"[Resolved]":{name:`Resolved`,displayName:`Resolved`,format:g},"[Failing]":{name:`Failing`,displayName:`Failing`,format:`#,0`},"[Friction]":{name:`Friction`,displayName:`Friction`,format:`0.0`},"[Knowledge Gaps]":{name:`Knowledge Gaps`,displayName:`Knowledge gaps`,format:`#,0`},"[Turns To Resolve]":{name:`Turns To Resolve`,displayName:`Turns to resolve`,format:`0.0`},"[CSAT]":{name:`CSAT`,displayName:`Satisfaction`,format:g}};function gt(){return{connection:`ae`,filters:w,query:st,columnMetadata:ht}}function _t(e){return he(R(e,q,B),{group:ft,leaf:q,grandTotalFlag:`Is Grand Total`,groupTotalFlag:`Is Group Total`,label:pt,fields:mt,blankLabel:`(Not recorded)`})}var vt={"[Source]":{name:`Source`,displayName:`Source`},"[Citations]":{name:`Citations`,displayName:`Citations`,format:`#,0`}};function yt(){return{connection:`ae`,filters:w,query:rt,columnMetadata:vt,vegaLiteSpec:it}}var bt={"[Archetype]":{name:`Archetype`,displayName:`Answered by`},"[Conversations]":{name:`Conversations`,displayName:`Conversations`,format:`#,0`}};function xt(){return{connection:`ae`,filters:w,query:$e,columnMetadata:bt,vegaLiteSpec:et}}function St(e){return R(e,`Archetype`,ue)}var Ct={"[Comment]":{name:`Comment`,displayName:`Comment`},"[Verdict]":{name:`Verdict`,displayName:`Feedback`},"[Times]":{name:`Times`,displayName:`Times`,format:`#,0`}};function wt(){return{connection:`ae`,filters:w,query:nt,columnMetadata:Ct}}var Tt=`EVALUATE\r
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
`,Et={"[Environment]":{name:`Environment`,displayName:`Environment`},"[Lookback Days]":{name:`Lookback Days`,displayName:`Days read`,format:`#,0`},"[Transcripts]":{name:`Transcripts`,displayName:`Transcripts`,format:`#,0`},"[Status]":{name:`Status`,displayName:`Status`}};function Dt(){return{connection:`ae`,filters:D,query:Tt,columnMetadata:Et}}function Ot(e){return c(e).flatMap(e=>{let t=i(e,`[Environment]`);return t?[{environment:t,days:a(e,`[Lookback Days]`)??0,transcripts:a(e,`[Transcripts]`)??0,status:i(e,`[Status]`)?.toLowerCase()??``}]:[]})}var kt=`To read other environments, run the installer, choose Repair or change, then Agent Evaluator, and tick the environments that hold your Copilot Studio agents. Copilot Studio usually keeps transcripts for 30 days, so older conversations can't be read.`,J=e=>e.map(e=>e.environment).join(`, `),At=e=>e>0?`the last ${e} days`:`all the history it holds`;function jt(e){if(!e||e.length===0)return;let t=[],n=e.filter(e=>e.status===`empty`||e.status===`ok`&&e.transcripts===0),r=new Map;for(let e of n)r.set(e.days,[...r.get(e.days)??[],e]);for(let[e,n]of r)t.push(`0 transcripts found in ${J(n)} in ${At(e)}.`);let i=e.filter(e=>e.status===`forbidden`);i.length>0&&t.push(`The load wasn't allowed to read ${J(i)}: the app that runs it needs to be an application user there with read access to conversation transcripts.`);let a=e.filter(e=>e.status===`error`);a.length>0&&t.push(`The load couldn't read ${J(a)}. The transcript parser's run log has the error.`);let o=e.filter(e=>e.status===`ok`&&e.transcripts>0);return o.length>0&&t.push(`${J(o)} had transcripts on the last load; they show here once the Agent Evaluator model refreshes.`),t.push(kt),{title:`No agent conversations found`,description:t.join(` `)}}var Mt=F({label:`Theme`,value:`Conversations`,of:`conversations`}),Nt=F({label:`Source`,value:`Citations`,of:`the citations shown`}),Pt=F({label:`Archetype`,value:`Conversations`,of:`conversations`}),Ft=se(F({label:`Outcome`,value:`Conversations`,of:`conversations`}),oe({date:`Week Start`,value:`Conversations`,of:`conversations`,period:`week`})),It=F({label:`Error Code`,value:`Errors`,of:`the errors shown`}),Y=b(),Lt=lt(),Rt=dt(),zt=gt(),Bt=yt(),Vt=xt(),Ht=wt(),Ut=`grid gap-300 md:grid-cols-2 xl:grid-cols-4`,Wt={disableStackedDataLabels:!0},X={perRow:36,chrome:148};function Gt(e){return[{id:`Conversations`,header:`Conversations`,width:132,format:V(`whole`),heat:!0},{id:`Resolved`,header:`Resolved`,width:104,format:V(`percent`)},{id:`Failing`,header:`Failing`,width:96,format:V(`whole`),heat:!0,heatColor:e},{id:`Friction`,header:`Friction`,width:96,format:V(`whole`)},{id:`Knowledge Gaps`,header:`Knowledge gaps`,width:144,format:V(`whole`)},{id:`Turns To Resolve`,header:`Turns to resolve`,width:140,format:V(`decimal`)},{id:`CSAT`,header:`Satisfaction`,width:116,format:V(`percent`)}]}function Kt(e,t){return[{id:`Verdict`,header:`Feedback`,width:132,cellRenderer:n=>{let r=pe(n);return(0,Y.jsxs)(`span`,{className:`inline-flex items-center gap-200`,children:[(0,Y.jsx)(`span`,{"aria-hidden":`true`,className:`size-200 shrink-0 rounded-full`,style:{backgroundColor:r===`Negative`?t:e}}),(0,Y.jsx)(`span`,{children:r})]})}},{id:`Comment`,header:`Comment`,minWidth:320},{id:`Times`,header:`Times`,width:96,numericStyling:!0,cellRenderer:V(`whole`)}]}function qt({extra:e}){let{theme:t}=n(),o=ie(),s=(0,W.useMemo)(()=>N(o,t),[o,t]),c=le(Lt,e),l=L(Rt,e),u=L(zt,e),d=L(Bt,e),f=L(Vt,e),p=L(Ht,e),m=c.row,g=(0,W.useMemo)(()=>f.table?St(f.table):void 0,[f.table]),_=(0,W.useMemo)(()=>P(Rt.vegaLiteSpec,Ke,[s.positive,s.neutral,s.caution,s.negative]),[s]),v=(0,W.useMemo)(()=>Gt(s.negative),[s.negative]),y=(0,W.useMemo)(()=>Kt(s.positive,s.negative),[s.positive,s.negative]),b=(0,W.useMemo)(()=>new Set(ve(l.table,`Theme`)).size,[l.table]),x=de(i(m,`[Friction Read]`));return(0,Y.jsxs)(M,{id:h(`agent-conversations`),title:`Conversations & topics`,description:`What people asked about, where agents found answers, and what people wrote back, never the conversations themselves.`,children:[(0,Y.jsx)(H,{from:[c.notFilteredBy]}),(0,Y.jsxs)(ne,{summary:c,count:4,className:Ut,emptyTitle:`No agent conversations`,emptyDescription:`Agent Evaluator has no conversations for these slicers. Widen the dates, or check that the transcripts have loaded.`,children:[(0,Y.jsx)(j,{label:`Grounded in knowledge`,value:a(m,`[Grounded Rate]`),format:`percent`,emphasis:!0,detail:(0,Y.jsx)(k,{label:`Citations`,value:a(m,`[Citations]`)})}),(0,Y.jsx)(j,{label:`Searches with no answer`,value:a(m,`[Knowledge Gap Rate]`),format:`percent`,detail:(0,Y.jsx)(k,{label:`Conversations with a gap`,value:a(m,`[Knowledge Gap Conversations]`)})}),(0,Y.jsx)(j,{label:`Turns per conversation`,value:a(m,`[Turns Per Conversation]`),format:`rate`,detail:(0,Y.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,Y.jsx)(k,{label:`Answered in one turn`,value:a(m,`[Single Turn Rate]`),format:`percent`}),(0,Y.jsx)(k,{label:`Turns to resolve`,value:a(m,`[Turns To Resolve]`),format:`rate`})]})}),(0,Y.jsx)(j,{label:`Friction, out of 100`,value:a(m,`[Friction]`),detail:x?.label})]}),(0,Y.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,Y.jsx)(C,{result:l,spec:_,capabilities:Wt,height:A(b||6,X),headline:Mt,title:`How each theme ended`,subtitle:`Conversations in each topic theme, the busiest first`,emptyTitle:`No topic themes`,emptyDescription:`No conversations in these slicers were matched to a topic.`}),(0,Y.jsx)(`div`,{className:`self-start`,children:(0,Y.jsx)(S,{title:`What to fix first`,notes:[{term:`Top fix`,text:z(i(m,`[Top Fix]`))},{term:`Backlog`,text:z(i(m,`[Backlog Summary]`))},{term:`Themes`,text:z(i(m,`[Theme Verdict]`))},{term:`Topics`,text:z(i(m,`[Topic Insight]`))}]})})]}),(0,Y.jsx)(ee,{result:u,toTree:_t,labelColumn:pt,labelHeader:`Theme / topic`,labelWidth:248,columns:v,variant:`topics`,title:`Topic health`,subtitle:`Each theme, then its topics, the most failing first`,emptyTitle:`No topics`,emptyDescription:`No conversations in these slicers were matched to a topic.`}),(0,Y.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-2`,children:[(0,Y.jsx)(C,{result:d,spec:Bt.vegaLiteSpec,height:A(d.table?.rows.length??6,X),headline:Nt,title:`Where answers came from`,subtitle:`The ten knowledge sources agents cited most`,emptyTitle:`No citations`,emptyDescription:`No answer in these slicers cited a knowledge source.`}),(0,Y.jsxs)(`div`,{className:`flex flex-col gap-500`,children:[(0,Y.jsx)(C,{result:f,table:g,spec:Vt.vegaLiteSpec,height:A(g?.rows.length??4,X),headline:Pt,title:`How each conversation was answered`,subtitle:`From your content, from the model alone, by a person, or not at all`,emptyTitle:`No answers`,emptyDescription:`No conversations fall in these slicers.`}),(0,Y.jsx)(S,{title:`Knowledge`,notes:[{term:`Sources`,text:z(i(m,`[Knowledge Story]`))},{term:`Gaps`,text:z(i(m,`[Knowledge Gap Read]`))},{term:`Conversation depth`,text:z(i(m,`[Depth Read]`))}]})]})]}),(0,Y.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,Y.jsx)(te,{result:p,height:ae(p.table?.rows.length??8),emptyTitle:`No written feedback`,emptyDescription:`People left thumbs up or down in these slicers, but no comments.`,children:e=>(0,Y.jsx)(r,{columns:y,data:e,theme:t,header:{title:`What people wrote`,subtitle:`Comments left with a thumbs up or down, the most repeated first`}})}),(0,Y.jsx)(`div`,{className:`self-start`,children:(0,Y.jsx)(S,{title:`What people said`,notes:[{term:`Feedback`,text:z(i(m,`[Feedback Insight]`))},{term:`Satisfaction`,text:z(i(m,`[CSAT Story]`))}]})})]})]})}function Jt({options:e,selection:t,onChange:n}){let r=e?.firstDate,i=e?.lastDate,a=(0,W.useMemo)(()=>r&&i?o(r,i).map(e=>({value:e,label:l[e]})):[],[r,i]),c=e?.departments??[],u=e?.agents??[],d=Fe(t.preset,e)??(r&&i?{from:r,to:i}:void 0);return(0,Y.jsxs)(`div`,{role:`group`,"aria-label":`Agent Evaluation slicers`,className:`z-10 md:sticky md:top-0 -mx-400 -mb-200 md:-mx-600 lg:-mx-700 flex flex-wrap items-center gap-x-400 gap-y-200 border-b border-border bg-background px-400 py-300 md:px-600 lg:px-700`,children:[(0,Y.jsx)(U,{label:`Date`,allLabel:l.all,choices:a,value:t.preset===`all`?void 0:t.preset,onChange:e=>n({...t,preset:e??`all`})}),c.length>1&&(0,Y.jsx)(U,{label:`Department`,allLabel:`All departments`,choices:c,value:t.department,onChange:e=>n({...t,department:e})}),u.length>1&&(0,Y.jsx)(U,{label:`Agent`,allLabel:`All agents`,choices:u,value:t.agent,onChange:e=>n({...t,agent:e})}),d&&(0,Y.jsx)(`span`,{className:v(`text-[length:var(--text-200)] leading-200`,`tabular-nums text-muted-foreground`),children:s(d.from,d.to)})]})}var Yt=`text-[length:var(--text-300)] leading-300 font-semibold text-foreground`;function Xt({verdicts:e,focus:t}){let n=(0,W.useId)(),r=e.flatMap(e=>{let t=de(e.text);return t?[{term:e.term,...t}]:[]}),i=t.flatMap(e=>{let t=z(e.text);return t?[{term:e.term,text:t}]:[]});return r.length===0&&i.length===0?null:(0,Y.jsxs)(`article`,{"aria-labelledby":n,className:`flex flex-col self-start rounded-xl border border-border bg-card`,children:[(0,Y.jsx)(`h3`,{id:n,className:`border-b border-border px-500 py-300 ${Yt}`,children:`The model's read`}),r.length>0&&(0,Y.jsx)(`dl`,{className:`flex flex-col divide-y divide-border px-500`,children:r.map(e=>(0,Y.jsxs)(`div`,{className:`flex flex-col gap-100 py-300`,children:[(0,Y.jsx)(`dt`,{className:`text-[length:var(--text-200)] leading-200 text-muted-foreground`,children:e.term}),(0,Y.jsxs)(`dd`,{className:`flex flex-wrap items-center gap-x-200 gap-y-100`,children:[(0,Y.jsx)(ye,{tone:e.tone}),(0,Y.jsx)(`span`,{className:`text-[length:var(--text-300)] leading-300 font-semibold text-foreground`,children:e.label}),e.figure&&(0,Y.jsx)(`span`,{className:`text-[length:var(--text-200)] leading-200 tabular-nums text-muted-foreground`,children:e.figure})]})]},e.term))}),i.length>0&&(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsx)(`h4`,{className:`border-t border-border px-500 pt-300 text-[length:var(--text-200)] leading-200 font-semibold text-foreground`,children:`Look first at`}),(0,Y.jsx)(`dl`,{className:`flex flex-col gap-200 px-500 pt-200 pb-400`,children:i.map(e=>(0,Y.jsxs)(`div`,{className:`flex flex-col gap-100-nudge`,children:[(0,Y.jsx)(`dt`,{className:`text-[length:var(--text-200)] leading-200 text-muted-foreground`,children:e.term}),(0,Y.jsx)(`dd`,{className:`text-[length:var(--text-200)] leading-200 text-foreground`,children:e.text})]},e.term))})]})]})}var Zt=Ue(),Qt=Ge(),$t=Ze(),Z=Ee(),en=`grid gap-300 md:grid-cols-2 xl:grid-cols-5`,tn={disableStackedDataLabels:!0},nn=[`System fault`,`User fault`],Q=V(`percent`),rn=V(`decimal`),$=[{id:`Conversations`,header:`Conversations`,width:128,format:V(`whole`),heat:`volume`},{id:`People`,header:`People`,width:88,format:V(`whole`)},{id:`Resolution Rate`,header:`Resolved`,width:100,format:Q},{id:`True Failure Rate`,header:`Failed`,width:84,format:Q,heat:`bad`},{id:`Unintended Escalation Rate`,header:`Escalated after an error`,width:180,format:Q},{id:`Abandonment Rate`,header:`Abandoned`,width:116,format:Q},{id:`CSAT`,header:`Satisfaction`,width:116,format:Q},{id:`Error Rate`,header:`Hit an error`,width:116,format:Q},{id:`Median Response`,header:`Median reply`,width:124,format:e=>{let t=rn(e);return t===null?null:`${t}s`}}];function an(e,t,n){return[{id:`Group`,header:t,width:180},...$.map(t=>({id:t.id,header:t.header,width:t.width,numericStyling:!0,cellRenderer:t.heat?ge({domain:_e(e,t.id),format:t.format,color:t.heat===`bad`?n:void 0}):t.format}))]}function on(e){if(!e)return;let t={Group:`All conversations`};for(let n of $)t[n.id]=a(e,`[${n.id}]`);return fe(t,[{id:`Group`},...$])}function sn({options:e,extra:t}){let{theme:o}=n(),s=ie(),c=(0,W.useMemo)(()=>N(s,o),[s,o]),[l,u]=(0,W.useState)(!1),d=re({...Z,query:l?Z.query:``}),f=(0,W.useMemo)(()=>d.data?.status===`success`?De(d.data.table):[],[d.data]),p=(0,W.useMemo)(()=>ke(f),[f]),m=L(p),g=(0,W.useMemo)(()=>Ne({...e?.groupCounts,...m.table?je(m.table).groupCounts:{}},f),[e?.groupCounts,m.table,f]),[_,v]=(0,W.useState)(),y=g.find(e=>e.id===_)??g[0]??G[0],b=(0,W.useMemo)(()=>Je(y),[y]),x=le(Zt,t),ee=L(Qt,t),w=L(b,t),T=L($t,t),E=x.row,D=(0,W.useMemo)(()=>w.table?Ye(w.table,y):void 0,[w.table,y]),O=(0,W.useMemo)(()=>T.table?Qe(T.table):void 0,[T.table]),F=(0,W.useMemo)(()=>P(Qt.vegaLiteSpec,Ke,[c.positive,c.neutral,c.caution,c.negative]),[c]),oe=(0,W.useMemo)(()=>P($t.vegaLiteSpec,nn,[c.negative,c.neutral]),[c]),se=(0,W.useMemo)(()=>an(D,y.label,c.negative),[D,y.label,c.negative]),I=(0,W.useMemo)(()=>(D?.rows.length??0)>1?on(E):void 0,[D,E]),ce=(D?.rows.length??0)+ +!!I;return(0,Y.jsxs)(M,{id:h(`agent-performance`),title:`Performance`,description:`How many conversations agents had, how they ended, and what people thought of them.`,actions:(0,Y.jsx)(U,{label:`Group by`,allLabel:g[0]?.label??`No groups to compare`,choices:g.slice(1).map(e=>({value:e.id,label:e.label})),value:g.length===0||y.id===g[0].id?void 0:y.id,onChange:v,onOpen:()=>{u(!0),d.error&&d.refetch(),m.error&&m.refetch()}}),children:[l&&d.isLoading&&(0,Y.jsx)(`p`,{role:`status`,children:`Loading org groupings…`}),l&&p.query&&m.isLoading&&(0,Y.jsx)(`p`,{role:`status`,children:`Checking org groupings…`}),l&&(d.error||m.error)&&(0,Y.jsx)(`p`,{role:`status`,children:`Org groupings could not be loaded. Open Group by to try again.`}),(0,Y.jsx)(H,{from:[x.notFilteredBy]}),(0,Y.jsxs)(ne,{summary:x,count:5,className:en,emptyTitle:`No agent conversations`,emptyDescription:`Agent Evaluator has no conversations for these slicers. Widen the dates, or check that the transcripts have loaded.`,children:[(0,Y.jsx)(j,{label:`Conversations`,value:a(E,`[Conversations]`),emphasis:!0,detail:(0,Y.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,Y.jsx)(k,{label:`People`,value:a(E,`[People]`)}),(0,Y.jsx)(k,{label:`Per person`,value:a(E,`[Conversations Per Person]`),format:`rate`})]})}),(0,Y.jsx)(j,{label:`Resolved`,value:a(E,`[Resolution Rate]`),format:`percent`,detail:(0,Y.jsx)(k,{label:`Implied success`,value:a(E,`[Implied Success]`),format:`percent`})}),(0,Y.jsx)(j,{label:`Failed`,value:a(E,`[True Failure Rate]`),format:`percent`,detail:(0,Y.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,Y.jsx)(k,{label:`Failing conversations`,value:a(E,`[Failing Conversations]`)}),(0,Y.jsx)(k,{label:`Hours lost`,value:a(E,`[Hours Lost]`),format:`hours`})]})}),(0,Y.jsx)(j,{label:`Abandoned`,value:a(E,`[Abandonment Rate]`),format:`percent`,detail:(0,Y.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,Y.jsx)(k,{label:`Escalated after an error`,value:a(E,`[Unintended Escalation Rate]`),format:`percent`}),(0,Y.jsx)(k,{label:`Hit an error`,value:a(E,`[Error Rate]`),format:`percent`})]})}),(0,Y.jsx)(j,{label:`Satisfaction`,value:a(E,`[CSAT]`),format:`percent`,detail:(0,Y.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,Y.jsx)(k,{label:`Thumbs up`,value:a(E,`[Thumbs Up]`)}),(0,Y.jsx)(k,{label:`Thumbs down`,value:a(E,`[Thumbs Down]`)})]})})]}),(0,Y.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,Y.jsx)(C,{result:ee,spec:F,capabilities:tn,height:380,headline:Ft,title:`How conversations ended`,subtitle:`Conversations each week, by how they ended`,emptyTitle:`No weekly conversations`,emptyDescription:`No agent conversations fall in these dates.`}),(0,Y.jsx)(Xt,{verdicts:[{term:`Performance`,text:i(E,`[Verdict Performance]`)},{term:`Quality`,text:i(E,`[Verdict Quality]`)},{term:`Adoption`,text:i(E,`[Verdict Adoption]`)}],focus:[{term:`Weakest agent`,text:i(E,`[Focus Agent]`)},{term:`Knowledge`,text:i(E,`[Focus Knowledge]`)},{term:`Where people give up`,text:i(E,`[Focus Give Up]`)}]})]}),(0,Y.jsx)(te,{result:w,table:D,height:ae(ce,me),emptyTitle:`No groups to compare`,emptyDescription:`No conversations in these slicers carry this field.`,children:e=>(0,Y.jsx)(r,{columns:se,data:e,grandTotals:I?{position:`bottom`,data:I}:void 0,theme:o,header:{title:`Performance by ${y.label.toLowerCase()}`,subtitle:`The busiest first, with every rate side by side`}},y.id)}),(0,Y.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,Y.jsx)(C,{result:T,table:O,spec:oe,height:A(O?.rows.length??6,{perRow:36,chrome:148}),headline:It,title:`What went wrong`,subtitle:`The ten most common errors, and whether the agent or the person hit them`,emptyTitle:`No errors`,emptyDescription:`No conversation in these slicers hit an error.`}),(0,Y.jsx)(`div`,{className:`self-start`,children:(0,Y.jsx)(S,{title:`Errors and hand-offs`,notes:[{term:`Errors`,text:z(i(E,`[Error Story]`))},{term:`Escalations`,text:z(i(E,`[Escalation Verdict]`))},{term:`Reply speed`,text:z(i(E,`[Response Read]`))}]})})]})]})}var cn=Ae(),ln=Dt(),un={anchor:h(`agent-performance`),page:`Agent Evaluation`,model:`Agent Evaluator`};function dn(){let e=L(cn),t=(0,W.useMemo)(()=>e.table?je(e.table):void 0,[e.table]),{show:n,inPack:r}=O(),[i,a]=(0,W.useState)(Pe),o=(0,W.useMemo)(()=>Ie(i,t),[i,t]),s=t!==void 0&&!Me(t),c=re({connection:ln.connection,query:s?ln.query:``}),l=(0,W.useMemo)(()=>c.data?.status===`success`?jt(Ot(c.data.table)):void 0,[c.data]),u=T(e.error);return e.error!==void 0&&!u?(0,Y.jsx)(I,{...un,alias:`ae`,message:e.error,onRetry:e.refetch}):s?(0,Y.jsx)(ce,{...un,title:l?.title??`No agent conversations yet`,description:l?.description??`Agent Evaluator is connected, but its model holds no Copilot Studio conversations. Once its lakehouse is loaded and the model refreshes, this page fills in.`}):(0,Y.jsxs)(`div`,{className:`flex flex-col gap-800`,children:[u&&e.error&&(0,Y.jsx)(E,{message:e.error,onRetry:e.refetch}),!r&&(0,Y.jsx)(Jt,{options:t,selection:i,onChange:a}),n(`agent-performance`)&&(0,Y.jsx)(sn,{options:t,extra:o}),n(`agent-conversations`)&&(0,Y.jsx)(qt,{extra:o})]})}export{dn as AgentEvaluationScreen};