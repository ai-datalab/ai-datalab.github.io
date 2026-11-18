import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{n as t}from"./createLucideIcon-BXuy7Wl9.js";import{D as n,E as r,N as i,O as a,f as o,l as s,m as c,t as l}from"./utils-CIsrqA3n.js";import{a as u,i as ee,n as te,r as d,t as f}from"./report-panels-CEN7awE0.js";import{n as p}from"./theme.context-DgtcjZCz.js";import{t as m}from"./dist-BfkBJOF1.js";import{L as h,M as g,O as _,R as v,V as y,m as b,o as x,u as S,y as C,z as w}from"./filter.context-B0Vf12qm.js";import{A as ne,J as T,N as E,T as D,Y as O}from"./task-times.context-DOQsoPTJ.js";import{i as re}from"./stage-filter.context-BO0XkIwy.js";import{m as k}from"./root-Dk2qvh_e.js";import{a as ie,n as A,o as j,t as M}from"./kpi-card-DB5LtHzz.js";import{t as N}from"./section-GGbZYlse.js";import{n as P,r as F}from"./color-scale-DTyjSAgS.js";import{n as I,r as L,t as ae}from"./headline-CtXokBCs.js";import{n as oe,t as se}from"./source-states-CeOEIkwL.js";import{r as R,t as ce}from"./use-table-query-DWqMmXD6.js";import{a as le,i as z,n as ue,r as B,t as V}from"./model-text-BHTCxKnW.js";import{a as de,i as fe,r as H,t as pe,u as me}from"./tree-grid-eYbqiR0J.js";import{t as U}from"./not-filtered-hint-1qkeOGZM.js";import{a as he,n as ge,r as _e}from"./heat-BSyML4f1.js";import{t as W}from"./choice-menu-sofywFu_.js";import{t as ve}from"./grade-mark-CLJXbdLY.js";var G=e(t(),1),ye=`// The page's own slicer choices: the dates the model holds, the departments\r
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
ORDER BY [Kind] ASC, [Sort] DESC, [Value] ASC`,be=`// Viewer-compatible attribute inventory from the Evaluator's row bridge.\r
EVALUATE\r
SELECTCOLUMNS(\r
    FILTER(\r
        VALUES('Org Attribute Source'[Attribute]),\r
        LEN(TRIM('Org Attribute Source'[Attribute])) > 0\r
    ),\r
    "Column", 'Org Attribute Source'[Attribute]\r
)\r
`,xe=`ROW(\r
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
`,K=[{id:`agent`,label:`Agent`,column:`'Agent Performance'[BotFriendlyName]`},{id:`theme`,label:`Topic theme`,column:`'Agent Performance'[Topic Theme]`},{id:`topic`,label:`Topic`,column:`'Agent Performance'[Topic (resolved)]`,humanize:!0}],Se={Organization:{id:`department`,label:`Department`},JobTitle:{id:`job-title`,label:`Job title`},officeLocation:{id:`office`,label:`Office`},country:{id:`country`,label:`Country`},usageLocation:{id:`usage-location`,label:`Usage location`},companyName:{id:`company`,label:`Company`},Function:{id:`function`,label:`Function`},Location:{id:`location`,label:`Location`}};function Ce(e){let t={__ID__:w(e.id),__COLUMN__:e.column,__ATTRIBUTE_FILTER__:e.attribute===void 0?``:`, ${we(e)}`};return xe.replace(/__ID__|__COLUMN__|__ATTRIBUTE_FILTER__/g,e=>t[e]).trim()}function we(e){return y(`'Org Attribute Source'[Attribute]`,e.attribute===void 0?[]:[e.attribute])}function Te(){return{connection:`ae`,filters:O,query:be}}function Ee(e){let t=(t=>e.columns.findIndex(e=>e.name===`[${t}]`))(`Column`);return g(e.rows.flatMap(e=>typeof e[t]==`string`?[{column:e[t],cardinality:2,maxLength:void 0}]:[])).map(e=>({...Object.hasOwn(Se,e)?Se[e]:{id:`org:${e}`,label:_(e).label},column:`'Org Attribute Source'[Value]`,attribute:e}))}var De={"[Kind]":{name:`Kind`,displayName:`Kind`},"[Value]":{name:`Value`,displayName:`Value`},"[Sort]":{name:`Sort`,displayName:`Conversations`,format:`#,0`}};function Oe(){return{connection:`ae`,filters:O,query:ye.replace(`__GROUP_COUNTS__`,()=>K.map(Ce).join(`,
    `)),columnMetadata:De}}function ke(e){let t={firstDate:void 0,lastDate:void 0,departments:[],agents:[],groupCounts:{}},[n,r,i]=[`Kind`,`Value`,`Sort`].map(t=>e.columns.findIndex(e=>e.name===t));for(let a of e.rows){let e=typeof a[r]==`string`?a[r].trim():``,o=typeof a[i]==`number`?a[i]:0;if(e)switch(a[n]){case`First date`:t.firstDate=e;break;case`Last date`:t.lastDate=e;break;case`Department`:t.departments.push({value:e,label:e,count:o});break;case`Agent`:t.agents.push({value:e,label:e,count:o});break;case`Group by`:t.groupCounts[e]=o}}return t}function Ae(e){return e.firstDate!==void 0||e.agents.length>0}function je(e,t=[]){let n=t.filter(e=>e.id===`department`),r=t.filter(e=>e.id!==`department`);return[K[0],...n,...K.slice(1),...r].filter(t=>t.attribute!==void 0||(e[t.id]??0)>=2)}var Me={preset:`all`,department:void 0,agent:void 0};function Ne(e,t){let n=t?.firstDate,r=t?.lastDate;if(e!==`all`&&n&&r)return S(n,r).includes(e)?C(e,n,r):void 0}function Pe(e,t){let n=[],r=Ne(e.preset,t);return r&&n.push(v(`'Calendar'[Date]`,r.from,r.to)),e.department&&n.push(y(`'Chat + Agent Org Data'[Organization]`,[e.department])),e.agent&&n.push(y(`'Agent Performance'[BotFriendlyName]`,[e.agent])),n}var Fe=`// Every headline rate for each group of the chosen Group by column, largest\r
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
ORDER BY [Conversations] DESC, [Group] ASC`,Ie=`// The ten error codes behind the most errors, and whose fault each one is.\r
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
ORDER BY [Errors] DESC, [Error Code] ASC`,Le={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Error Code`,type:`nominal`,title:null,sort:{field:`Errors`,op:`sum`,order:`descending`}},x:{field:`Errors`,type:`quantitative`,title:`Errors`},color:{field:`Source`,type:`nominal`,title:null,legend:{orient:`top`,direction:`horizontal`}},tooltip:[{field:`Error Code`,type:`nominal`,title:`Error`},{field:`Source`,type:`nominal`,title:`Cause`},{field:`Errors`,type:`quantitative`,title:`Errors`,format:`,.0f`}]}},Re=`// The Performance stage's headline figures and the model's own verdicts.\r
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
)`,ze=`// How conversations ended, week by week. Weeks start on Monday. The model's\r
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
ORDER BY [Week Start] ASC, [Outcome Order] ASC`,Be={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`},transform:[{calculate:`toDate(datum['Week Start'])`,as:`Week Date`},{calculate:`time(datum['Week Date'])`,as:`Week Order`},{calculate:`timeFormat(datum['Week Date'], '%-d %b')`,as:`Week`},{joinaggregate:[{op:`sum`,field:`Conversations`,as:`Week Total`}],groupby:[`Week Start`]},{calculate:`datum['Conversations'] / datum['Week Total']`,as:`Share`}],encoding:{x:{field:`Week`,type:`ordinal`,title:null,sort:{field:`Week Order`,op:`min`,order:`ascending`},axis:{labelAngle:0,labelOverlap:`greedy`}},y:{field:`Conversations`,type:`quantitative`,title:`Conversations`,stack:`zero`},color:{field:`Outcome`,type:`nominal`,title:null,sort:[`Resolved`,`Escalated by design`,`Escalated after an error`,`Abandoned`],legend:{orient:`top`,direction:`horizontal`,labelLimit:240}},order:{field:`Outcome Order`,type:`quantitative`,sort:`ascending`},tooltip:[{field:`Week Date`,type:`temporal`,title:`Week starting`,format:`%d %b %Y`},{field:`Outcome`,type:`nominal`,title:`Ended`},{field:`Conversations`,type:`quantitative`,title:`Conversations`,format:`,.0f`},{field:`Share`,type:`quantitative`,title:`Share of the week`,format:`.0%`}]}},q={"[Conversations]":{name:`Conversations`,displayName:`Conversations`,format:`#,0`},"[People]":{name:`People`,displayName:`People`,format:`#,0`},"[Conversations Per Person]":{name:`Conversations Per Person`,displayName:`Conversations per person`,format:`0.0`},"[Resolution Rate]":{name:`Resolution Rate`,displayName:`Resolved`,format:c},"[Implied Success]":{name:`Implied Success`,displayName:`Implied success`,format:c},"[True Failure Rate]":{name:`True Failure Rate`,displayName:`Failed`,format:c},"[Failing Conversations]":{name:`Failing Conversations`,displayName:`Failing conversations`,format:`#,0`},"[Hours Lost]":{name:`Hours Lost`,displayName:`Hours lost`,format:o},"[Unintended Escalation Rate]":{name:`Unintended Escalation Rate`,displayName:`Escalated after an error`,format:c},"[Intended Share]":{name:`Intended Share`,displayName:`Escalations by design`,format:c},"[Abandonment Rate]":{name:`Abandonment Rate`,displayName:`Abandoned`,format:c},"[CSAT]":{name:`CSAT`,displayName:`Satisfaction`,format:c},"[Thumbs Up]":{name:`Thumbs Up`,displayName:`Thumbs up`,format:`#,0`},"[Thumbs Down]":{name:`Thumbs Down`,displayName:`Thumbs down`,format:`#,0`},"[Error Rate]":{name:`Error Rate`,displayName:`Hit an error`,format:c},"[Median Response]":{name:`Median Response`,displayName:`Median reply`,format:`0.0`},"[Slow Replies]":{name:`Slow Replies`,displayName:`Replies over 10s`,format:c},"[Reporting Window]":{name:`Reporting Window`,displayName:`Reporting window`},"[Verdict Performance]":{name:`Verdict Performance`,displayName:`Performance`},"[Verdict Quality]":{name:`Verdict Quality`,displayName:`Quality`},"[Verdict Adoption]":{name:`Verdict Adoption`,displayName:`Adoption`},"[Focus Agent]":{name:`Focus Agent`,displayName:`Weakest agent`},"[Focus Knowledge]":{name:`Focus Knowledge`,displayName:`Knowledge gap`},"[Focus Give Up]":{name:`Focus Give Up`,displayName:`Where people give up`},"[Escalation Verdict]":{name:`Escalation Verdict`,displayName:`Escalations`},"[Error Story]":{name:`Error Story`,displayName:`Errors`},"[Response Read]":{name:`Response Read`,displayName:`Reply speed`}};function Ve(){return{connection:`ae`,filters:T,query:Re,columnMetadata:q}}var He={"[Week Start]":{name:`Week Start`,displayName:`Week starting`,format:`dd mmm yyyy`},"[Outcome]":{name:`Outcome`,displayName:`Ended`},"[Outcome Order]":{name:`Outcome Order`,displayName:`Order`,format:`#,0`},"[Conversations]":{name:`Conversations`,displayName:`Conversations`,format:`#,0`}};function Ue(){return{connection:`ae`,filters:T,query:ze,columnMetadata:He,vegaLiteSpec:Be}}var We=[`Resolved`,`Escalated by design`,`Escalated after an error`,`Abandoned`],Ge={"[Group]":{name:`Group`,displayName:`Group`},"[Conversations]":q[`[Conversations]`],"[People]":q[`[People]`],"[Resolution Rate]":q[`[Resolution Rate]`],"[True Failure Rate]":q[`[True Failure Rate]`],"[Unintended Escalation Rate]":q[`[Unintended Escalation Rate]`],"[Abandonment Rate]":q[`[Abandonment Rate]`],"[CSAT]":q[`[CSAT]`],"[Error Rate]":q[`[Error Rate]`],"[Median Response]":q[`[Median Response]`]};function Ke(e){let t=Fe.replaceAll(`__GROUP__`,()=>e.column);return{connection:`ae`,filters:T,query:h(t,e.attribute===void 0?[]:[we(e)]),columnMetadata:Ge}}function qe(e,t){let n=e.columns.findIndex(e=>e.name===`Group`);return n<0?e:{columns:e.columns,rows:e.rows.map(e=>{let r=e[n],i=r==null?``:String(r).trim(),a=i===``?`(Not recorded)`:t.humanize?V(i):i;if(a===e[n])return e;let o=[...e];return o[n]=a,o})}}var Je={"[Error Code]":{name:`Error Code`,displayName:`Error`},"[Source]":{name:`Source`,displayName:`Cause`},"[Errors]":{name:`Errors`,displayName:`Errors`,format:`#,0`}};function Ye(){return{connection:`ae`,filters:T,query:Ie,columnMetadata:Je,vegaLiteSpec:Le}}function Xe(e){return z(z(e,`Error Code`,V),`Source`,le)}var Ze=`// How each conversation was answered: the most advanced thing the agent did.\r
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
ORDER BY [Conversations] DESC`,Qe={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},transform:[{joinaggregate:[{op:`sum`,field:`Conversations`,as:`All Conversations`}]},{calculate:`datum['Conversations'] / datum['All Conversations']`,as:`Share`}],encoding:{y:{field:`Archetype`,type:`nominal`,title:null,sort:{field:`Conversations`,op:`sum`,order:`descending`},axis:{labelLimit:220}},x:{field:`Conversations`,type:`quantitative`,title:`Conversations`},tooltip:[{field:`Archetype`,type:`nominal`,title:`Answered by`},{field:`Conversations`,type:`quantitative`,title:`Conversations`,format:`,.0f`},{field:`Share`,type:`quantitative`,title:`Share`,format:`.0%`}]}},$e=`// The Conversations & topics stage's headline figures and the model's own\r
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
)`,et=`// What people wrote when they left feedback, most repeated first. Comments\r
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
ORDER BY [Times] DESC, [Comment] ASC`,tt=`// The ten knowledge sources agents cited most.\r
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
ORDER BY [Citations] DESC, [Source] ASC`,nt={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Source`,type:`nominal`,title:null,sort:{field:`Citations`,op:`sum`,order:`descending`},axis:{labelLimit:220}},x:{field:`Citations`,type:`quantitative`,title:`Citations`},tooltip:[{field:`Source`,type:`nominal`,title:`Source`},{field:`Citations`,type:`quantitative`,title:`Citations`,format:`,.0f`}]}},rt=`// How conversations in each topic theme ended, in the same outcome words as\r
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
ORDER BY [Theme] ASC, [Outcome Order] ASC`,it={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`},transform:[{joinaggregate:[{op:`sum`,field:`Conversations`,as:`Theme Total`}],groupby:[`Theme`]},{calculate:`datum['Conversations'] / datum['Theme Total']`,as:`Share`}],encoding:{y:{field:`Theme`,type:`nominal`,title:null,sort:{field:`Conversations`,op:`sum`,order:`descending`}},x:{field:`Conversations`,type:`quantitative`,title:`Conversations`,stack:`zero`},color:{field:`Outcome`,type:`nominal`,title:null,sort:[`Resolved`,`Escalated by design`,`Escalated after an error`,`Abandoned`],legend:{orient:`top`,direction:`horizontal`,labelLimit:240}},order:{field:`Outcome Order`,type:`quantitative`,sort:`ascending`},tooltip:[{field:`Theme`,type:`nominal`,title:`Theme`},{field:`Outcome`,type:`nominal`,title:`Ended`},{field:`Conversations`,type:`quantitative`,title:`Conversations`,format:`,.0f`},{field:`Share`,type:`quantitative`,title:`Share of the theme`,format:`.0%`}]}},at=`// Each theme, then its topics, with the most failing conversations first:\r
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
    [Conversations] DESC`,ot={"[Topics]":{name:`Topics`,displayName:`Topics`,format:`#,0`},"[Grounded Rate]":{name:`Grounded Rate`,displayName:`Grounded in knowledge`,format:c},"[Answered From Knowledge]":{name:`Answered From Knowledge`,displayName:`Answered from knowledge`,format:`#,0`},"[Citations]":{name:`Citations`,displayName:`Citations`,format:`#,0`},"[Knowledge Gap Rate]":{name:`Knowledge Gap Rate`,displayName:`Searches with no answer`,format:c},"[Knowledge Gap Conversations]":{name:`Knowledge Gap Conversations`,displayName:`Conversations with a gap`,format:`#,0`},"[Turns Per Conversation]":{name:`Turns Per Conversation`,displayName:`Turns per conversation`,format:`0.0`},"[Single Turn Rate]":{name:`Single Turn Rate`,displayName:`Answered in one turn`,format:c},"[Turns To Resolve]":{name:`Turns To Resolve`,displayName:`Turns to resolve`,format:`0.0`},"[Friction]":{name:`Friction`,displayName:`Friction`,format:`0.0`},"[Friction Read]":{name:`Friction Read`,displayName:`Friction`},"[Theme Verdict]":{name:`Theme Verdict`,displayName:`Themes`},"[Theme Coverage]":{name:`Theme Coverage`,displayName:`Coverage`},"[Top Fix]":{name:`Top Fix`,displayName:`Top fix`},"[Backlog Summary]":{name:`Backlog Summary`,displayName:`Backlog`},"[Topic Insight]":{name:`Topic Insight`,displayName:`Topics`},"[Knowledge Story]":{name:`Knowledge Story`,displayName:`Knowledge`},"[Knowledge Gap Read]":{name:`Knowledge Gap Read`,displayName:`Knowledge gaps`},"[Depth Read]":{name:`Depth Read`,displayName:`Conversation depth`},"[Feedback Insight]":{name:`Feedback Insight`,displayName:`Feedback`},"[CSAT Story]":{name:`CSAT Story`,displayName:`Satisfaction`}};function st(){return{connection:`ae`,filters:T,query:$e,columnMetadata:ot}}var ct={"[Theme]":{name:`Theme`,displayName:`Theme`},"[Outcome]":{name:`Outcome`,displayName:`Ended`},"[Outcome Order]":{name:`Outcome Order`,displayName:`Order`,format:`#,0`},"[Conversations]":{name:`Conversations`,displayName:`Conversations`,format:`#,0`}};function lt(){return{connection:`ae`,filters:T,query:rt,columnMetadata:ct,vegaLiteSpec:it}}var ut=`Agent PerformanceTopic Theme`,J=`Agent PerformanceTopic (resolved)`,dt=`Topic`,ft=[`Conversations`,`Resolved`,`Failing`,`Friction`,`Knowledge Gaps`,`Turns To Resolve`,`CSAT`],pt={"Agent Performance[Topic Theme]":{name:ut,displayName:`Theme`},"Agent Performance[Topic (resolved)]":{name:J,displayName:`Topic`},"[Is Grand Total]":{name:`Is Grand Total`},"[Is Group Total]":{name:`Is Group Total`},"[Conversations]":{name:`Conversations`,displayName:`Conversations`,format:`#,0`},"[Resolved]":{name:`Resolved`,displayName:`Resolved`,format:c},"[Failing]":{name:`Failing`,displayName:`Failing`,format:`#,0`},"[Friction]":{name:`Friction`,displayName:`Friction`,format:`0.0`},"[Knowledge Gaps]":{name:`Knowledge Gaps`,displayName:`Knowledge gaps`,format:`#,0`},"[Turns To Resolve]":{name:`Turns To Resolve`,displayName:`Turns to resolve`,format:`0.0`},"[CSAT]":{name:`CSAT`,displayName:`Satisfaction`,format:c}};function mt(){return{connection:`ae`,filters:T,query:at,columnMetadata:pt}}function ht(e){return me(z(e,J,V),{group:ut,leaf:J,grandTotalFlag:`Is Grand Total`,groupTotalFlag:`Is Group Total`,label:dt,fields:ft,blankLabel:`(Not recorded)`})}var gt={"[Source]":{name:`Source`,displayName:`Source`},"[Citations]":{name:`Citations`,displayName:`Citations`,format:`#,0`}};function _t(){return{connection:`ae`,filters:T,query:tt,columnMetadata:gt,vegaLiteSpec:nt}}var vt={"[Archetype]":{name:`Archetype`,displayName:`Answered by`},"[Conversations]":{name:`Conversations`,displayName:`Conversations`,format:`#,0`}};function yt(){return{connection:`ae`,filters:T,query:Ze,columnMetadata:vt,vegaLiteSpec:Qe}}function bt(e){return z(e,`Archetype`,le)}var xt={"[Comment]":{name:`Comment`,displayName:`Comment`},"[Verdict]":{name:`Verdict`,displayName:`Feedback`},"[Times]":{name:`Times`,displayName:`Times`,format:`#,0`}};function St(){return{connection:`ae`,filters:T,query:et,columnMetadata:xt}}var Ct=`EVALUATE\r
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
`,wt={"[Environment]":{name:`Environment`,displayName:`Environment`},"[Lookback Days]":{name:`Lookback Days`,displayName:`Days read`,format:`#,0`},"[Transcripts]":{name:`Transcripts`,displayName:`Transcripts`,format:`#,0`},"[Status]":{name:`Status`,displayName:`Status`}};function Tt(){return{connection:`ae`,filters:O,query:Ct,columnMetadata:wt}}function Et(e){return a(e).flatMap(e=>{let t=n(e,`[Environment]`);return t?[{environment:t,days:r(e,`[Lookback Days]`)??0,transcripts:r(e,`[Transcripts]`)??0,status:n(e,`[Status]`)?.toLowerCase()??``}]:[]})}var Dt=`To read other environments, run the installer, choose Repair or change, then Agent Evaluator, and tick the environments that hold your Copilot Studio agents. Copilot Studio usually keeps transcripts for 30 days, so older conversations can't be read.`,Y=e=>e.map(e=>e.environment).join(`, `),Ot=e=>e>0?`the last ${e} days`:`all the history it holds`;function kt(e){if(!e||e.length===0)return;let t=[],n=e.filter(e=>e.status===`empty`||e.status===`ok`&&e.transcripts===0),r=new Map;for(let e of n)r.set(e.days,[...r.get(e.days)??[],e]);for(let[e,n]of r)t.push(`0 transcripts found in ${Y(n)} in ${Ot(e)}.`);let i=e.filter(e=>e.status===`forbidden`);i.length>0&&t.push(`The load wasn't allowed to read ${Y(i)}: the app that runs it needs to be an application user there with read access to conversation transcripts.`);let a=e.filter(e=>e.status===`error`);a.length>0&&t.push(`The load couldn't read ${Y(a)}. The transcript parser's run log has the error.`);let o=e.filter(e=>e.status===`ok`&&e.transcripts>0);return o.length>0&&t.push(`${Y(o)} had transcripts on the last load; they show here once the Agent Evaluator model refreshes.`),t.push(Dt),{title:`No agent conversations found`,description:t.join(` `)}}var At=I({label:`Theme`,value:`Conversations`,of:`conversations`}),jt=I({label:`Source`,value:`Citations`,of:`the citations shown`}),Mt=I({label:`Archetype`,value:`Conversations`,of:`conversations`}),Nt=ae(I({label:`Outcome`,value:`Conversations`,of:`conversations`}),L({date:`Week Start`,value:`Conversations`,of:`conversations`,period:`week`})),Pt=I({label:`Error Code`,value:`Errors`,of:`the errors shown`}),X=i(),Ft=st(),It=lt(),Lt=mt(),Rt=_t(),zt=yt(),Bt=St(),Vt=`grid gap-300 md:grid-cols-2 xl:grid-cols-4`,Ht={disableStackedDataLabels:!0},Z={perRow:36,chrome:148};function Ut(e){return[{id:`Conversations`,header:`Conversations`,width:132,format:H(`whole`),heat:!0},{id:`Resolved`,header:`Resolved`,width:104,format:H(`percent`)},{id:`Failing`,header:`Failing`,width:96,format:H(`whole`),heat:!0,heatColor:e},{id:`Friction`,header:`Friction`,width:96,format:H(`whole`)},{id:`Knowledge Gaps`,header:`Knowledge gaps`,width:144,format:H(`whole`)},{id:`Turns To Resolve`,header:`Turns to resolve`,width:140,format:H(`decimal`)},{id:`CSAT`,header:`Satisfaction`,width:116,format:H(`percent`)}]}function Wt(e,t){return[{id:`Verdict`,header:`Feedback`,width:132,cellRenderer:n=>{let r=fe(n);return(0,X.jsxs)(`span`,{className:`inline-flex items-center gap-200`,children:[(0,X.jsx)(`span`,{"aria-hidden":`true`,className:`size-200 shrink-0 rounded-full`,style:{backgroundColor:r===`Negative`?t:e}}),(0,X.jsx)(`span`,{children:r})]})}},{id:`Comment`,header:`Comment`,minWidth:320},{id:`Times`,header:`Times`,width:96,numericStyling:!0,cellRenderer:H(`whole`)}]}function Gt({extra:e}){let{theme:t}=p(),i=k(),a=(0,G.useMemo)(()=>P(i,t),[i,t]),o=ce(Ft,e),c=R(It,e),l=R(Lt,e),h=R(Rt,e),g=R(zt,e),_=R(Bt,e),v=o.row,y=(0,G.useMemo)(()=>g.table?bt(g.table):void 0,[g.table]),b=(0,G.useMemo)(()=>F(It.vegaLiteSpec,We,[a.positive,a.neutral,a.caution,a.negative]),[a]),x=(0,G.useMemo)(()=>Ut(a.negative),[a.negative]),S=(0,G.useMemo)(()=>Wt(a.positive,a.negative),[a.positive,a.negative]),C=(0,G.useMemo)(()=>new Set(_e(c.table,`Theme`)).size,[c.table]),w=ue(n(v,`[Friction Read]`));return(0,X.jsxs)(N,{id:s(`agent-conversations`),title:`Conversations & topics`,description:`What people asked about, where agents found answers, and what people wrote back, never the conversations themselves.`,children:[(0,X.jsx)(U,{from:[o.notFilteredBy]}),(0,X.jsxs)(te,{summary:o,count:4,className:Vt,emptyTitle:`No agent conversations`,emptyDescription:`Agent Evaluator has no conversations for these slicers. Widen the dates, or check that the transcripts have loaded.`,children:[(0,X.jsx)(M,{label:`Grounded in knowledge`,value:r(v,`[Grounded Rate]`),format:`percent`,emphasis:!0,detail:(0,X.jsx)(A,{label:`Citations`,value:r(v,`[Citations]`)})}),(0,X.jsx)(M,{label:`Searches with no answer`,value:r(v,`[Knowledge Gap Rate]`),format:`percent`,detail:(0,X.jsx)(A,{label:`Conversations with a gap`,value:r(v,`[Knowledge Gap Conversations]`)})}),(0,X.jsx)(M,{label:`Turns per conversation`,value:r(v,`[Turns Per Conversation]`),format:`rate`,detail:(0,X.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,X.jsx)(A,{label:`Answered in one turn`,value:r(v,`[Single Turn Rate]`),format:`percent`}),(0,X.jsx)(A,{label:`Turns to resolve`,value:r(v,`[Turns To Resolve]`),format:`rate`})]})}),(0,X.jsx)(M,{label:`Friction, out of 100`,value:r(v,`[Friction]`),detail:w?.label})]}),(0,X.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,X.jsx)(f,{result:c,spec:b,capabilities:Ht,height:j(C||6,Z),headline:At,title:`How each theme ended`,subtitle:`Conversations in each topic theme, the busiest first`,emptyTitle:`No topic themes`,emptyDescription:`No conversations in these slicers were matched to a topic.`}),(0,X.jsx)(`div`,{className:`self-start`,children:(0,X.jsx)(d,{title:`What to fix first`,notes:[{term:`Top fix`,text:B(n(v,`[Top Fix]`))},{term:`Backlog`,text:B(n(v,`[Backlog Summary]`))},{term:`Themes`,text:B(n(v,`[Theme Verdict]`))},{term:`Topics`,text:B(n(v,`[Topic Insight]`))}]})})]}),(0,X.jsx)(u,{result:l,toTree:ht,labelColumn:dt,labelHeader:`Theme / topic`,labelWidth:248,columns:x,variant:`topics`,title:`Topic health`,subtitle:`Each theme, then its topics, the most failing first`,emptyTitle:`No topics`,emptyDescription:`No conversations in these slicers were matched to a topic.`}),(0,X.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-2`,children:[(0,X.jsx)(f,{result:h,spec:Rt.vegaLiteSpec,height:j(h.table?.rows.length??6,Z),headline:jt,title:`Where answers came from`,subtitle:`The ten knowledge sources agents cited most`,emptyTitle:`No citations`,emptyDescription:`No answer in these slicers cited a knowledge source.`}),(0,X.jsxs)(`div`,{className:`flex flex-col gap-500`,children:[(0,X.jsx)(f,{result:g,table:y,spec:zt.vegaLiteSpec,height:j(y?.rows.length??4,Z),headline:Mt,title:`How each conversation was answered`,subtitle:`From your content, from the model alone, by a person, or not at all`,emptyTitle:`No answers`,emptyDescription:`No conversations fall in these slicers.`}),(0,X.jsx)(d,{title:`Knowledge`,notes:[{term:`Sources`,text:B(n(v,`[Knowledge Story]`))},{term:`Gaps`,text:B(n(v,`[Knowledge Gap Read]`))},{term:`Conversation depth`,text:B(n(v,`[Depth Read]`))}]})]})]}),(0,X.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,X.jsx)(ee,{result:_,height:ie(_.table?.rows.length??8),emptyTitle:`No written feedback`,emptyDescription:`People left thumbs up or down in these slicers, but no comments.`,children:e=>(0,X.jsx)(m,{columns:S,data:e,theme:t,header:{title:`What people wrote`,subtitle:`Comments left with a thumbs up or down, the most repeated first`}})}),(0,X.jsx)(`div`,{className:`self-start`,children:(0,X.jsx)(d,{title:`What people said`,notes:[{term:`Feedback`,text:B(n(v,`[Feedback Insight]`))},{term:`Satisfaction`,text:B(n(v,`[CSAT Story]`))}]})})]})]})}function Kt({options:e,selection:t,onChange:n}){let r=e?.firstDate,i=e?.lastDate,a=(0,G.useMemo)(()=>r&&i?S(r,i).map(e=>({value:e,label:x[e]})):[],[r,i]),o=e?.departments??[],s=e?.agents??[],c=Ne(t.preset,e)??(r&&i?{from:r,to:i}:void 0);return(0,X.jsxs)(`div`,{role:`group`,"aria-label":`Agent Evaluation slicers`,className:`z-10 md:sticky md:top-0 -mx-400 -mb-200 md:-mx-600 lg:-mx-700 flex flex-wrap items-center gap-x-400 gap-y-200 border-b border-border bg-background px-400 py-300 md:px-600 lg:px-700`,children:[(0,X.jsx)(W,{label:`Date`,allLabel:x.all,choices:a,value:t.preset===`all`?void 0:t.preset,onChange:e=>n({...t,preset:e??`all`})}),o.length>1&&(0,X.jsx)(W,{label:`Department`,allLabel:`All departments`,choices:o,value:t.department,onChange:e=>n({...t,department:e})}),s.length>1&&(0,X.jsx)(W,{label:`Agent`,allLabel:`All agents`,choices:s,value:t.agent,onChange:e=>n({...t,agent:e})}),c&&(0,X.jsx)(`span`,{className:l(`text-[length:var(--text-200)] leading-200`,`tabular-nums text-muted-foreground`),children:b(c.from,c.to)})]})}var qt=`text-[length:var(--text-300)] leading-300 font-semibold text-foreground`;function Jt({verdicts:e,focus:t}){let n=(0,G.useId)(),r=e.flatMap(e=>{let t=ue(e.text);return t?[{term:e.term,...t}]:[]}),i=t.flatMap(e=>{let t=B(e.text);return t?[{term:e.term,text:t}]:[]});return r.length===0&&i.length===0?null:(0,X.jsxs)(`article`,{"aria-labelledby":n,className:`flex flex-col self-start rounded-xl border border-border bg-card`,children:[(0,X.jsx)(`h3`,{id:n,className:`border-b border-border px-500 py-300 ${qt}`,children:`The model's read`}),r.length>0&&(0,X.jsx)(`dl`,{className:`flex flex-col divide-y divide-border px-500`,children:r.map(e=>(0,X.jsxs)(`div`,{className:`flex flex-col gap-100 py-300`,children:[(0,X.jsx)(`dt`,{className:`text-[length:var(--text-200)] leading-200 text-muted-foreground`,children:e.term}),(0,X.jsxs)(`dd`,{className:`flex flex-wrap items-center gap-x-200 gap-y-100`,children:[(0,X.jsx)(ve,{tone:e.tone}),(0,X.jsx)(`span`,{className:`text-[length:var(--text-300)] leading-300 font-semibold text-foreground`,children:e.label}),e.figure&&(0,X.jsx)(`span`,{className:`text-[length:var(--text-200)] leading-200 tabular-nums text-muted-foreground`,children:e.figure})]})]},e.term))}),i.length>0&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(`h4`,{className:`border-t border-border px-500 pt-300 text-[length:var(--text-200)] leading-200 font-semibold text-foreground`,children:`Look first at`}),(0,X.jsx)(`dl`,{className:`flex flex-col gap-200 px-500 pt-200 pb-400`,children:i.map(e=>(0,X.jsxs)(`div`,{className:`flex flex-col gap-100-nudge`,children:[(0,X.jsx)(`dt`,{className:`text-[length:var(--text-200)] leading-200 text-muted-foreground`,children:e.term}),(0,X.jsx)(`dd`,{className:`text-[length:var(--text-200)] leading-200 text-foreground`,children:e.text})]},e.term))})]})]})}var Yt=Ve(),Xt=Ue(),Zt=Ye(),Qt=Te(),$t=`grid gap-300 md:grid-cols-2 xl:grid-cols-5`,en={disableStackedDataLabels:!0},tn=[`System fault`,`User fault`],Q=H(`percent`),nn=H(`decimal`),$=[{id:`Conversations`,header:`Conversations`,width:128,format:H(`whole`),heat:`volume`},{id:`People`,header:`People`,width:88,format:H(`whole`)},{id:`Resolution Rate`,header:`Resolved`,width:100,format:Q},{id:`True Failure Rate`,header:`Failed`,width:84,format:Q,heat:`bad`},{id:`Unintended Escalation Rate`,header:`Escalated after an error`,width:180,format:Q},{id:`Abandonment Rate`,header:`Abandoned`,width:116,format:Q},{id:`CSAT`,header:`Satisfaction`,width:116,format:Q},{id:`Error Rate`,header:`Hit an error`,width:116,format:Q},{id:`Median Response`,header:`Median reply`,width:124,format:e=>{let t=nn(e);return t===null?null:`${t}s`}}];function rn(e,t,n){return[{id:`Group`,header:t,width:180},...$.map(t=>({id:t.id,header:t.header,width:t.width,numericStyling:!0,cellRenderer:t.heat?he({domain:ge(e,t.id),format:t.format,color:t.heat===`bad`?n:void 0}):t.format}))]}function an(e){if(!e)return;let t={Group:`All conversations`};for(let n of $)t[n.id]=r(e,`[${n.id}]`);return de(t,[{id:`Group`},...$])}function on({options:e,extra:t}){let{theme:i}=p(),a=k(),o=(0,G.useMemo)(()=>P(a,i),[a,i]),[c,l]=(0,G.useState)(!1),u=ne({...Qt,query:c?Qt.query:``}),h=(0,G.useMemo)(()=>u.data?.status===`success`?Ee(u.data.table):[],[u.data]),g=(0,G.useMemo)(()=>je(e?.groupCounts??{},h),[e?.groupCounts,h]),[_,v]=(0,G.useState)(),y=g.find(e=>e.id===_)??g[0]??K[0],b=(0,G.useMemo)(()=>Ke(y),[y]),x=ce(Yt,t),S=R(Xt,t),C=R(b,t),w=R(Zt,t),T=x.row,E=(0,G.useMemo)(()=>C.table?qe(C.table,y):void 0,[C.table,y]),D=(0,G.useMemo)(()=>w.table?Xe(w.table):void 0,[w.table]),O=(0,G.useMemo)(()=>F(Xt.vegaLiteSpec,We,[o.positive,o.neutral,o.caution,o.negative]),[o]),re=(0,G.useMemo)(()=>F(Zt.vegaLiteSpec,tn,[o.negative,o.neutral]),[o]),I=(0,G.useMemo)(()=>rn(E,y.label,o.negative),[E,y.label,o.negative]),L=(0,G.useMemo)(()=>(E?.rows.length??0)>1?an(T):void 0,[E,T]),ae=(E?.rows.length??0)+ +!!L;return(0,X.jsxs)(N,{id:s(`agent-performance`),title:`Performance`,description:`How many conversations agents had, how they ended, and what people thought of them.`,actions:(0,X.jsx)(W,{label:`Group by`,allLabel:g[0]?.label??`No groups to compare`,choices:g.slice(1).map(e=>({value:e.id,label:e.label})),value:g.length===0||y.id===g[0].id?void 0:y.id,onChange:v,onOpen:()=>{l(!0),u.error&&u.refetch()}}),children:[c&&u.isLoading&&(0,X.jsx)(`p`,{role:`status`,children:`Loading org groupings…`}),c&&u.error&&(0,X.jsx)(`p`,{role:`status`,children:`Org groupings could not be loaded. Open Group by to try again.`}),(0,X.jsx)(U,{from:[x.notFilteredBy]}),(0,X.jsxs)(te,{summary:x,count:5,className:$t,emptyTitle:`No agent conversations`,emptyDescription:`Agent Evaluator has no conversations for these slicers. Widen the dates, or check that the transcripts have loaded.`,children:[(0,X.jsx)(M,{label:`Conversations`,value:r(T,`[Conversations]`),emphasis:!0,detail:(0,X.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,X.jsx)(A,{label:`People`,value:r(T,`[People]`)}),(0,X.jsx)(A,{label:`Per person`,value:r(T,`[Conversations Per Person]`),format:`rate`})]})}),(0,X.jsx)(M,{label:`Resolved`,value:r(T,`[Resolution Rate]`),format:`percent`,detail:(0,X.jsx)(A,{label:`Implied success`,value:r(T,`[Implied Success]`),format:`percent`})}),(0,X.jsx)(M,{label:`Failed`,value:r(T,`[True Failure Rate]`),format:`percent`,detail:(0,X.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,X.jsx)(A,{label:`Failing conversations`,value:r(T,`[Failing Conversations]`)}),(0,X.jsx)(A,{label:`Hours lost`,value:r(T,`[Hours Lost]`),format:`hours`})]})}),(0,X.jsx)(M,{label:`Abandoned`,value:r(T,`[Abandonment Rate]`),format:`percent`,detail:(0,X.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,X.jsx)(A,{label:`Escalated after an error`,value:r(T,`[Unintended Escalation Rate]`),format:`percent`}),(0,X.jsx)(A,{label:`Hit an error`,value:r(T,`[Error Rate]`),format:`percent`})]})}),(0,X.jsx)(M,{label:`Satisfaction`,value:r(T,`[CSAT]`),format:`percent`,detail:(0,X.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,X.jsx)(A,{label:`Thumbs up`,value:r(T,`[Thumbs Up]`)}),(0,X.jsx)(A,{label:`Thumbs down`,value:r(T,`[Thumbs Down]`)})]})})]}),(0,X.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,X.jsx)(f,{result:S,spec:O,capabilities:en,height:380,headline:Nt,title:`How conversations ended`,subtitle:`Conversations each week, by how they ended`,emptyTitle:`No weekly conversations`,emptyDescription:`No agent conversations fall in these dates.`}),(0,X.jsx)(Jt,{verdicts:[{term:`Performance`,text:n(T,`[Verdict Performance]`)},{term:`Quality`,text:n(T,`[Verdict Quality]`)},{term:`Adoption`,text:n(T,`[Verdict Adoption]`)}],focus:[{term:`Weakest agent`,text:n(T,`[Focus Agent]`)},{term:`Knowledge`,text:n(T,`[Focus Knowledge]`)},{term:`Where people give up`,text:n(T,`[Focus Give Up]`)}]})]}),(0,X.jsx)(ee,{result:C,table:E,height:ie(ae,pe),emptyTitle:`No groups to compare`,emptyDescription:`No conversations in these slicers carry this field.`,children:e=>(0,X.jsx)(m,{columns:I,data:e,grandTotals:L?{position:`bottom`,data:L}:void 0,theme:i,header:{title:`Performance by ${y.label.toLowerCase()}`,subtitle:`The busiest first, with every rate side by side`}},y.id)}),(0,X.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,X.jsx)(f,{result:w,table:D,spec:re,height:j(D?.rows.length??6,{perRow:36,chrome:148}),headline:Pt,title:`What went wrong`,subtitle:`The ten most common errors, and whether the agent or the person hit them`,emptyTitle:`No errors`,emptyDescription:`No conversation in these slicers hit an error.`}),(0,X.jsx)(`div`,{className:`self-start`,children:(0,X.jsx)(d,{title:`Errors and hand-offs`,notes:[{term:`Errors`,text:B(n(T,`[Error Story]`))},{term:`Escalations`,text:B(n(T,`[Escalation Verdict]`))},{term:`Reply speed`,text:B(n(T,`[Response Read]`))}]})})]})]})}var sn=Oe(),cn=Tt(),ln={anchor:s(`agent-performance`),page:`Agent Evaluation`,model:`Agent Evaluator`};function un(){let e=R(sn),t=(0,G.useMemo)(()=>e.table?ke(e.table):void 0,[e.table]),{show:n,inPack:r}=re(),[i,a]=(0,G.useState)(Me),o=(0,G.useMemo)(()=>Pe(i,t),[i,t]),s=t!==void 0&&!Ae(t),c=ne({connection:cn.connection,query:s?cn.query:``}),l=(0,G.useMemo)(()=>c.data?.status===`success`?kt(Et(c.data.table)):void 0,[c.data]),u=E(e.error);return e.error!==void 0&&!u?(0,X.jsx)(oe,{...ln,alias:`ae`,message:e.error,onRetry:e.refetch}):s?(0,X.jsx)(se,{...ln,title:l?.title??`No agent conversations yet`,description:l?.description??`Agent Evaluator is connected, but its model holds no Copilot Studio conversations. Once its lakehouse is loaded and the model refreshes, this page fills in.`}):(0,X.jsxs)(`div`,{className:`flex flex-col gap-800`,children:[u&&e.error&&(0,X.jsx)(D,{message:e.error,onRetry:e.refetch}),!r&&(0,X.jsx)(Kt,{options:t,selection:i,onChange:a}),n(`agent-performance`)&&(0,X.jsx)(on,{options:t,extra:o}),n(`agent-conversations`)&&(0,X.jsx)(Gt,{extra:o})]})}export{un as AgentEvaluationScreen};