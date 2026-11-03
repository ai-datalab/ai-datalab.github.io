import{d as e,h as t,it as n,m as r,ot as i,pt as a}from"./utils-CCoPj5LP.js";import{u as o}from"./tree-grid-7cu7iUjc.js";var s=`EVALUATE\r
VAR BehaviourRows =\r
    SELECTCOLUMNS(\r
        SUMMARIZECOLUMNS(\r
            'Chat + Agent Interactions (Audit Logs)'[Behavior_Enriched_Full],\r
            "TaskCount", [AI Tasks],\r
            "ShareOfActivity", [Activity Share]\r
        ),\r
        "Dimension", "Behaviour",\r
        "Category", 'Chat + Agent Interactions (Audit Logs)'[Behavior_Enriched_Full],\r
        "Tasks", [TaskCount],\r
        "Share", [ShareOfActivity]\r
    )\r
VAR WorkflowRows =\r
    SELECTCOLUMNS(\r
        SUMMARIZECOLUMNS(\r
            'Chat + Agent Interactions (Audit Logs)'[Workflow_Action],\r
            "TaskCount", [AI Tasks],\r
            "ShareOfActivity", [Activity Share]\r
        ),\r
        "Dimension", "Workflow action",\r
        "Category", 'Chat + Agent Interactions (Audit Logs)'[Workflow_Action],\r
        "Tasks", [TaskCount],\r
        "Share", [ShareOfActivity]\r
    )\r
VAR OutcomeRows =\r
    SELECTCOLUMNS(\r
        SUMMARIZECOLUMNS(\r
            'Chat + Agent Interactions (Audit Logs)'[Value_Outcome],\r
            "TaskCount", [AI Tasks],\r
            "ShareOfActivity", [Activity Share]\r
        ),\r
        "Dimension", "Value outcome",\r
        "Category", 'Chat + Agent Interactions (Audit Logs)'[Value_Outcome],\r
        "Tasks", [TaskCount],\r
        "Share", [ShareOfActivity]\r
    )\r
RETURN\r
UNION(BehaviourRows, WorkflowRows, OutcomeRows)\r
`,c={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{filter:`datum.Dimension === '__DIMENSION__'`}],mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Category`,type:`nominal`,title:null,sort:null,axis:{labelLimit:220}},x:{field:`Tasks`,type:`quantitative`,title:`Tasks`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`}},tooltip:[{field:`Category`,type:`nominal`,title:`__TITLE__`},{field:`Tasks`,type:`quantitative`,title:`Tasks`,format:`,.0f`},{field:`Share`,type:`quantitative`,title:`Share of all tasks`,format:`.1%`}]}},l={"[Dimension]":{name:`Dimension`,displayName:`Lens`},"[Category]":{name:`Category`,displayName:`Category`},"[Tasks]":{name:`Tasks`,displayName:`Tasks`,format:`#,0`},"[Share]":{name:`Share`,displayName:`Share of all tasks`,format:r}},u={behaviour:{dimension:`Behaviour`,label:`Task Breakdown`,title:`Tasks by Task Breakdown`,subtitle:`The detailed task each request was read as`},action:{dimension:`Workflow action`,label:`Workflow action`,title:`Tasks by workflow action`,subtitle:`What Copilot was asked to do with the content`},outcome:{dimension:`Value outcome`,label:`Value outcome`,title:`Tasks by value outcome`,subtitle:`The benefit the task was classified as delivering`}},d=Object.keys(u).map(e=>({id:e,label:u[e].label}));function f(e){let t=u[e?.dimension??`behaviour`];return{connection:`vl`,query:s,columnMetadata:l,vegaLiteSpec:JSON.parse(JSON.stringify(c).replaceAll(`__DIMENSION__`,t.dimension).replaceAll(`__TITLE__`,t.label)),...t}}var p=[{id:`all`,label:`Everyone`,summaryPrefix:`All`,measures:{users:`All Active Users`,sessions:`Observed Sessions`,perUser:`Observed Sessions per User`,perWeek:`Observed Sessions per User per Week`}},{id:`licensed`,label:`Licensed`,summaryPrefix:`Licensed`,measures:{users:`Active Licensed Users`,sessions:`Observed Licensed Sessions`,perUser:`Observed Licensed Sessions per User`,perWeek:`Observed Licensed Sessions per User per Week`}},{id:`unlicensed`,label:`Unlicensed`,summaryPrefix:`Unlicensed`,measures:{users:`Active Unlicensed Users`,sessions:`Observed Unlicensed Sessions`,perUser:`Observed Unlicensed Sessions per User`,perWeek:`Observed Unlicensed Sessions per User per Week`}},{id:`agents`,label:`Agents`,summaryPrefix:`Agent`,measures:{users:`Active Agent Users`,sessions:`Observed Agent Sessions`,perUser:`Observed Agent Sessions per User`,perWeek:`Observed Agent Sessions per User per Week`}},{id:`cowork`,label:`Cowork`,summaryPrefix:`Cowork`,measures:{users:`Cowork Users`,sessions:`Observed Cowork Sessions`,perUser:`Observed Cowork Sessions per User`,perWeek:`Observed Cowork Sessions per User per Week`}}],m=new Map(p.map(e=>[e.id,e]));function h(e){let t=m.get(e);if(!t)throw Error(`Unknown leaderboard cohort "${e}".`);return t}p.map(({id:e,label:t})=>({id:e,label:t}));function g(e){return h(e).measures}function _(e){let t=h(e).summaryPrefix;return{users:`[${t} Users]`,sessions:`[${t} Sessions]`,perUser:`[${t} Per User]`,perWeek:`[${t} Per Week]`}}function v(e,t){let n=g(t);return e.replaceAll(`__USERS__`,n.users).replaceAll(`__SESSIONS__`,n.sessions).replaceAll(`__PER_WEEK__`,n.perWeek)}var y=`EVALUATE\r
// One cohort's cards, the one License and Activity pick (they filter this\r
// query too): its four figures and the bookmark's extra card, if it has one.\r
// leaderboard-summary.ts fills in the cards.\r
CALCULATETABLE(\r
    ROW(\r
        __CARDS__\r
    ),\r
    // As on the report's Leaderboard page: Security Copilot's automated\r
    // sessions would otherwise top every ranking.\r
    KEEPFILTERS(\r
        FILTER(\r
            ALL('Chat + Agent Interactions (Audit Logs)'[AppHost]),\r
            NOT CONTAINSSTRING('Chat + Agent Interactions (Audit Logs)'[AppHost], "SecurityCopilot")\r
        )\r
    )\r
)\r
`;function b(e,t,n){let r=e.slice(1,-1);return[e,n?{name:r,displayName:t,format:n}:{name:r,displayName:t}]}var x={all:void 0,licensed:{column:`[Licence Utilisation]`,measure:`% Active Licensed Users`,displayName:`License utilization`,format:r},unlicensed:{column:`[Unlicensed Tasks]`,measure:`Unlicensed AI Tasks`,displayName:`AI tasks`,format:`#,0`},agents:{column:`[Agent Tasks]`,measure:`Agent AI Tasks`,displayName:`AI tasks`,format:`#,0`},cowork:{column:`[Cowork Tasks]`,measure:`Cowork AI Tasks`,displayName:`AI tasks`,format:`#,0`}};function S(e){let t=_(e),n=g(e),r=x[e];return[{column:t.users,measure:n.users,displayName:`Active users`,format:`#,0`},{column:t.sessions,measure:n.sessions,displayName:`Sessions`,format:`#,0`},{column:t.perUser,measure:n.perUser,displayName:`Sessions / user`,format:`0.0`},{column:t.perWeek,measure:n.perWeek,displayName:`Sessions / user / week`,format:`0.0`},...r?[r]:[]]}function C(e){let t=S(e),n=t.map(({column:e,measure:t})=>`"${e.slice(1,-1)}", [${t}]`).join(`,
        `),r=Object.fromEntries(t.map(({column:e,displayName:t,format:n})=>b(e,t,n)));return{connection:`vl`,query:y.replace(`__CARDS__`,n),columnMetadata:r}}var w=`EVALUATE\r
// The report's "<cohort> · Organization → User" table. The measure names\r
// are filled in per cohort by leaderboard-people.ts.\r
// Every group row is kept, so the totals stay whole; the people under them\r
// stop at the top 1,000, and "Total" counts them all.\r
VAR _all =\r
    SUMMARIZECOLUMNS(\r
        ROLLUPADDISSUBTOTAL(\r
            'Chat + Agent Org Data'[Organization], "Is Grand Total",\r
            'Chat + Agent Interactions (Audit Logs)'[Audit_UserId], "Is Group Total"\r
        ),\r
        // As on the report's Leaderboard page: Security Copilot's automated\r
        // sessions would otherwise top every ranking.\r
        KEEPFILTERS(\r
            FILTER(\r
                ALL('Chat + Agent Interactions (Audit Logs)'[AppHost]),\r
                NOT CONTAINSSTRING('Chat + Agent Interactions (Audit Logs)'[AppHost], "SecurityCopilot")\r
            )\r
        ),\r
        "Active Users", [__USERS__],\r
        "Sessions", [__SESSIONS__],\r
        "Sessions Per User Per Week", [__PER_WEEK__]\r
    )\r
VAR _people = FILTER(_all, NOT [Is Group Total])\r
VAR _total = COUNTROWS(_people) + 0\r
RETURN\r
ADDCOLUMNS(\r
    UNION(\r
        FILTER(_all, [Is Group Total]),\r
        TOPN(\r
            1000,\r
            _people,\r
            [Sessions], DESC,\r
            'Chat + Agent Interactions (Audit Logs)'[Audit_UserId], ASC,\r
            'Chat + Agent Org Data'[Organization], ASC\r
        )\r
    ),\r
    "Total", _total\r
)\r
ORDER BY\r
    [Is Grand Total] DESC,\r
    [Is Group Total] DESC,\r
    [Sessions] DESC,\r
    'Chat + Agent Interactions (Audit Logs)'[Audit_UserId] ASC,\r
    'Chat + Agent Org Data'[Organization] ASC\r
`,T=`Chat + Agent Org DataOrganization`,E=`Chat + Agent Interactions (Audit Logs)Audit_UserId`,D=[`Active Users`,`Sessions`,`Sessions Per User Per Week`],O={"[Is Grand Total]":{name:`Is Grand Total`},"[Is Group Total]":{name:`Is Group Total`},"[Active Users]":{name:`Active Users`,displayName:`Active users`,format:`#,0`},"[Sessions]":{name:`Sessions`,displayName:`Sessions`,format:`#,0`},"[Sessions Per User Per Week]":{name:`Sessions Per User Per Week`,displayName:`Sessions / user / week`,format:`0.0`}},k={"Chat + Agent Org Data[Organization]":{name:T,displayName:`Organization`},"Chat + Agent Interactions (Audit Logs)[Audit_UserId]":{name:E,displayName:`User`},...O,...t},A=O;function j(e=`all`,t=i(n)){return a({connection:`vl`,query:v(w,e),columnMetadata:k},t)}function M(e,t){return o(e,{group:T,leaf:E,grandTotalFlag:`Is Grand Total`,groupTotalFlag:`Is Group Total`,label:`Who`,fields:D,blankLabel:t})}var N=`EVALUATE\r
// How much of one cohort's sessions the busiest people account for, from the\r
// same person rows as the "Organization → User" table, so it holds for every\r
// person rather than the top of that list. The measure name is filled in per\r
// cohort by leaderboard-concentration.ts. A person under more than one group\r
// counts once, with their rows summed.\r
VAR __Rows =\r
    SUMMARIZECOLUMNS(\r
        'Chat + Agent Org Data'[Organization],\r
        'Chat + Agent Interactions (Audit Logs)'[Audit_UserId],\r
        KEEPFILTERS(\r
            FILTER(\r
                ALL('Chat + Agent Interactions (Audit Logs)'[AppHost]),\r
                NOT CONTAINSSTRING('Chat + Agent Interactions (Audit Logs)'[AppHost], "SecurityCopilot")\r
            )\r
        ),\r
        "@Sessions", [__SESSIONS__]\r
    )\r
VAR __Values =\r
    FILTER(\r
        GROUPBY(\r
            SELECTCOLUMNS(\r
                __Rows,\r
                "@Person", COALESCE('Chat + Agent Interactions (Audit Logs)'[Audit_UserId], ""),\r
                "@Sessions", [@Sessions]\r
            ),\r
            [@Person],\r
            "@Value", SUMX(CURRENTGROUP(), [@Sessions])\r
        ),\r
        [@Value] > 0\r
    )\r
// The cuts lib/concentration.ts reads: every top slice's size, rounded up.\r
// Leaderboards shows the top 1%, 5% and 25% without a curve, so it asks for\r
// no other cut. Each cut's sum takes the busiest people, less any tied past\r
// the cut, as the Studio and Value queries work it out.\r
VAR __Total = SUMX(__Values, [@Value])\r
VAR __Count = COUNTROWS(__Values) + 0\r
VAR __Cuts =\r
    ADDCOLUMNS(\r
        FILTER(\r
            DISTINCT(\r
                SELECTCOLUMNS({ 1, 5, 25 }, "@Count", QUOTIENT(__Count * [Value] + 99, 100))\r
            ),\r
            [@Count] >= 1\r
        ),\r
        "@Cumulative",\r
            VAR __Top = TOPN([@Count], __Values, [@Value], DESC)\r
            VAR __Boundary = MINX(__Top, [@Value])\r
            VAR __Higher = FILTER(__Top, [@Value] > __Boundary)\r
            RETURN SUMX(__Higher, [@Value]) + ([@Count] - COUNTROWS(__Higher)) * __Boundary\r
    )\r
RETURN\r
    SELECTCOLUMNS(\r
        __Cuts,\r
        "Count", [@Count],\r
        "Cumulative", [@Cumulative],\r
        "People", __Count,\r
        "Total", __Total\r
    )\r
ORDER BY [Count]\r
`;function P(t=`all`,r=i(n)){return a({connection:`vl`,query:v(N,t),columnMetadata:e},r)}var F=`EVALUATE\r
// The report's "<cohort> · App / surface → Activity" table, or for Cowork\r
// "Task group → Task category". The grouping columns and measure names are\r
// filled in per cohort by leaderboard-tasks.ts.\r
SUMMARIZECOLUMNS(\r
    ROLLUPADDISSUBTOTAL(\r
        'Chat + Agent Interactions (Audit Logs)'[__GROUP__], "Is Grand Total",\r
        'Chat + Agent Interactions (Audit Logs)'[__LEAF__], "Is Group Total"\r
    ),\r
    // As on the report's Leaderboard page: Security Copilot's automated\r
    // sessions would otherwise top every ranking.\r
    KEEPFILTERS(\r
        FILTER(\r
            ALL('Chat + Agent Interactions (Audit Logs)'[AppHost]),\r
            NOT CONTAINSSTRING('Chat + Agent Interactions (Audit Logs)'[AppHost], "SecurityCopilot")\r
        )\r
    ),\r
    "Active Users", [__USERS__],\r
    "Sessions", [__SESSIONS__],\r
    "Sessions Per User Per Week", [__PER_WEEK__]\r
)\r
ORDER BY\r
    [Is Grand Total] DESC,\r
    [Is Group Total] DESC,\r
    [Sessions] DESC\r
`,I=`Chat + Agent Interactions (Audit Logs)`,L={group:`AppHost`,leaf:`Behavior_Enriched_Full`,heading:`App / surface / Task Breakdown`,path:`App / surface → Task Breakdown`,groupNoun:`app or surface`,groupPlural:`apps and surfaces`,leafNoun:`Task Breakdown`,leafPlural:`Task Breakdown`},R={group:`Task Breakdown Group`,leaf:`Task Breakdown Category`,heading:`Task Category / Task Breakdown`,path:`Task Category → Task Breakdown`,groupNoun:`Task Category`,groupPlural:`Task Categories`,leafNoun:`Task Breakdown`,leafPlural:`Task Breakdown`};function z(e){return e===`cowork`?R:L}function B(e=`all`){let t=z(e);return{connection:`vl`,query:v(F,e).replaceAll(`__GROUP__`,t.group).replaceAll(`__LEAF__`,t.leaf),columnMetadata:{[`${I}[${t.group}]`]:{name:`${I}${t.group}`,displayName:t.groupNoun},[`${I}[${t.leaf}]`]:{name:`${I}${t.leaf}`,displayName:t.leafNoun},...A},levels:t}}function V(e,t){return o(e,{group:`${I}${t.group}`,leaf:`${I}${t.leaf}`,grandTotalFlag:`Is Grand Total`,groupTotalFlag:`Is Group Total`,label:`Who`,fields:D,blankLabel:`Not recorded`})}export{M as a,f as c,j as i,d as l,V as n,C as o,P as r,_ as s,B as t};