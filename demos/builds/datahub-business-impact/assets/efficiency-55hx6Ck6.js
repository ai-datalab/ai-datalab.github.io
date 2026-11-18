import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{n as t,t as n}from"./createLucideIcon-BXuy7Wl9.js";import{t as r}from"./arrow-right-jioFQtNf.js";import{D as i,E as a,N as o,f as s,h as c,k as l,l as u,m as d}from"./utils-CIsrqA3n.js";import{c as f,i as p}from"./grading-method-B0r8YAT0.js";import{n as m}from"./theme.context-DgtcjZCz.js";import{t as h}from"./dist-BfkBJOF1.js";import{A as g,F as _,O as v,T as y,n as b,r as x,w as S}from"./filter.context-B0Vf12qm.js";import{E as C,T as w,w as T}from"./task-times.context-DOQsoPTJ.js";import{i as E}from"./stage-filter.context-BO0XkIwy.js";import{i as ee,m as D,n as te}from"./root-Dk2qvh_e.js";import{a as O,i as k,o as A,t as j}from"./kpi-card-DB5LtHzz.js";import{t as M}from"./format-kpi-BhveZiQQ.js";import{t as ne}from"./on-demand-DbhPnRv5.js";import{t as re}from"./section-GGbZYlse.js";import{t as N}from"./use-filtered-query-U6M9eTHP.js";import{t as P}from"./to-data-table-DHzdyPpP.js";import{n as ie,r as ae}from"./color-scale-DTyjSAgS.js";import{t as F}from"./headlined-CJ4u6EBP.js";import{i as I,n as L,o as R,t as z}from"./headline-CtXokBCs.js";import{t as B}from"./page-panel-gate-Dxdna-Hy.js";import{a as V,c as oe,d as se,i as H,l as U,n as ce,o as le,r as W,s as ue,t as de,u as fe}from"./tree-grid-eYbqiR0J.js";import{i as pe,r as me,t as he}from"./list-total-FFZntA1E.js";import{a as G,i as ge}from"./heat-BSyML4f1.js";import{n as _e,t as K}from"./grade-mark-CLJXbdLY.js";import"./agents-DXJB63Gm.js";var ve={name:`flag`,size:24,node:[[`path`,{d:`M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528`,key:`1jaruq`}]]};ve.node;var ye=n(ve),q=e(t(),1),be=/\s{3,}/,xe=/^([A-Za-z][A-Za-z ]*?)\s*·\s*(.+)$/;function Se(e){return f(e)??f(`${e} fit`)}function Ce(e){let t=[],n=[];for(let r of(e??``).split(be)){let e=r.trim();if(!e)continue;let i=xe.exec(e),a=i?Se(i[1]):void 0;i&&a?t.push({grade:a,rule:i[2].replace(/\.$/,``)}):n.push(e)}return{grades:t,notes:n}}var we=`EVALUATE\r
ROW(\r
    "Cowork Sessions", [Usage Efficiency: Consumption Sessions],\r
    "Tasks Completed", [Usage Efficiency: Consumption Tasks],\r
    "Active Days Per User", [Usage Efficiency: Active Days Per User],\r
    "Expert Hours", [Cowork Hours (Task Category Basis)],\r
    "Strong Fit Share", [Usage Efficiency: High Fit Share],\r
    "Worth A Look Share", [Usage Efficiency: Low Fit Share],\r
    "Fit Notice", [Usage Efficiency: Fit Rule Notice]\r
)\r
`,Te={"[Cowork Sessions]":{name:`Cowork Sessions`,displayName:`Cowork sessions`,format:`#,0`},"[Tasks Completed]":{name:`Tasks Completed`,displayName:`Tasks completed`,format:`#,0`},"[Active Days Per User]":{name:`Active Days Per User`,displayName:`Active days per user`,format:s},"[Expert Hours]":{name:`Expert Hours`,displayName:`Expert equivalent hours`,format:s},"[Strong Fit Share]":{name:`Strong Fit Share`,displayName:`Strong fit`,format:d},"[Worth A Look Share]":{name:`Worth A Look Share`,displayName:`Worth a look`,format:d},"[Fit Notice]":{name:`Fit Notice`,displayName:`Fit notice`}};function Ee(){return{connection:`vl`,query:we,columnMetadata:Te}}var De=`EVALUATE\r
ROW(\r
    "Sessions", [Model: Sessions],\r
    "Logged Share", [Model: Logged Session Share],\r
    "Well-matched Share", [Model: Well-matched Share],\r
    "Over-specified Share", [Model: Over-specified Share],\r
    "Under-specified Share", [Model: Under-specified Share],\r
    "Coverage Notice", [Model: Coverage Notice]\r
)\r
`,Oe={"[Sessions]":{name:`Sessions`,displayName:`Sessions`,format:`#,0`},"[Logged Share]":{name:`Logged Share`,displayName:`Model logged`,format:d},"[Well-matched Share]":{name:`Well-matched Share`,displayName:`Good match`,format:d},"[Over-specified Share]":{name:`Over-specified Share`,displayName:`Lighter model may do`,format:d},"[Under-specified Share]":{name:`Under-specified Share`,displayName:`Try stronger`,format:d},"[Coverage Notice]":{name:`Coverage Notice`,displayName:`Coverage notice`}};function ke(){return{connection:`vl`,query:De,columnMetadata:Oe}}var Ae=`EVALUATE\r
SELECTCOLUMNS(\r
    FILTER(\r
        SUMMARIZECOLUMNS(\r
            'Chat + Agent Interactions (Audit Logs)'[AI_Model],\r
            'Chat + Agent Interactions (Audit Logs)'[Model Cost Tier],\r
            'Chat + Agent Interactions (Audit Logs)'[Model Cost Tier Sort],\r
            "@Sessions", [Model: Sessions],\r
            "@UsageShare", [Model: Usage Share]\r
        ),\r
        NOT ISBLANK([@Sessions])\r
    ),\r
    "Model",\r
        VAR _model = 'Chat + Agent Interactions (Audit Logs)'[AI_Model]\r
        RETURN IF(ISBLANK(_model) || TRIM(_model) = "", "Model not logged", _model),\r
    "Cost Tier", COALESCE('Chat + Agent Interactions (Audit Logs)'[Model Cost Tier], "Not attributed"),\r
    "Tier Sort", 'Chat + Agent Interactions (Audit Logs)'[Model Cost Tier Sort],\r
    "Sessions", [@Sessions],\r
    "Usage Share", [@UsageShare]\r
)\r
ORDER BY [Sessions] DESC, [Model] ASC\r
`,je={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Model`,type:`nominal`,title:null,sort:`-x`,axis:{labelLimit:240}},x:{field:`Sessions`,type:`quantitative`,title:`Sessions`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`}},color:{field:`Cost Tier`,type:`nominal`,title:`Cost tier`,sort:{field:`Tier Sort`,order:`ascending`},legend:{labelLimit:240}},tooltip:[{field:`Model`,type:`nominal`,title:`Model`},{field:`Cost Tier`,type:`nominal`,title:`Cost tier`},{field:`Sessions`,type:`quantitative`,title:`Sessions`,format:`,.0f`},{field:`Usage Share`,type:`quantitative`,title:`Share`,format:`.1%`}]}},Me={"[Model]":{name:`Model`,displayName:`Model`},"[Cost Tier]":{name:`Cost Tier`,displayName:`Cost tier`},"[Tier Sort]":{name:`Tier Sort`,displayName:`Tier sort`,format:`#,0`},"[Sessions]":{name:`Sessions`,displayName:`Sessions`,format:`#,0`},"[Usage Share]":{name:`Usage Share`,displayName:`Share`,format:d}};function Ne(){return{connection:`vl`,query:Ae,columnMetadata:Me,vegaLiteSpec:je}}var Pe=`EVALUATE\r
VAR _well =\r
    SELECTCOLUMNS(\r
        FILTER(\r
            SUMMARIZECOLUMNS(\r
                'Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)],\r
                "@Sessions", [Model: Well-matched Sessions],\r
                "@Total", [Model: Sessions]\r
            ),\r
            [@Sessions] > 0\r
        ),\r
        "Activity", 'Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)],\r
        "Outcome", "Good match",\r
        "Outcome Order", 1,\r
        "Sessions", [@Sessions],\r
        "Share", DIVIDE([@Sessions], [@Total])\r
    )\r
VAR _over =\r
    SELECTCOLUMNS(\r
        FILTER(\r
            SUMMARIZECOLUMNS(\r
                'Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)],\r
                "@Sessions", [Model: Over-specified Sessions],\r
                "@Total", [Model: Sessions]\r
            ),\r
            [@Sessions] > 0\r
        ),\r
        "Activity", 'Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)],\r
        "Outcome", "Lighter model may do",\r
        "Outcome Order", 2,\r
        "Sessions", [@Sessions],\r
        "Share", DIVIDE([@Sessions], [@Total])\r
    )\r
VAR _under =\r
    SELECTCOLUMNS(\r
        FILTER(\r
            SUMMARIZECOLUMNS(\r
                'Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)],\r
                "@Sessions", [Model: Under-specified Sessions],\r
                "@Total", [Model: Sessions]\r
            ),\r
            [@Sessions] > 0\r
        ),\r
        "Activity", 'Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)],\r
        "Outcome", "Try stronger",\r
        "Outcome Order", 3,\r
        "Sessions", [@Sessions],\r
        "Share", DIVIDE([@Sessions], [@Total])\r
    )\r
VAR _notJudged =\r
    SELECTCOLUMNS(\r
        FILTER(\r
            SUMMARIZECOLUMNS(\r
                'Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)],\r
                "@Sessions", [Model: Not Judged Sessions],\r
                "@Total", [Model: Sessions]\r
            ),\r
            [@Sessions] > 0\r
        ),\r
        "Activity", 'Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)],\r
        "Outcome", "Not judged",\r
        "Outcome Order", 4,\r
        "Sessions", [@Sessions],\r
        "Share", DIVIDE([@Sessions], [@Total])\r
    )\r
RETURN\r
    UNION(_well, _over, _under, _notJudged)\r
ORDER BY [Activity], [Outcome Order]\r
`,Fe={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`},encoding:{y:{field:`Activity`,type:`nominal`,title:null,sort:`ascending`,axis:{labelLimit:200}},x:{field:`Share`,type:`quantitative`,stack:`zero`,title:`Share of sessions`,scale:{domain:[0,1]},axis:{labelExpr:`format(datum.value, '.0%')`}},color:{field:`Outcome`,type:`nominal`,title:`Outcome`,scale:{domain:[`Good match`,`Lighter model may do`,`Try stronger`,`Not judged`]}},order:{field:`Outcome Order`,type:`quantitative`,sort:`ascending`},tooltip:[{field:`Activity`,type:`nominal`,title:`Activity`},{field:`Outcome`,type:`nominal`,title:`Outcome`},{field:`Sessions`,type:`quantitative`,title:`Sessions`,format:`,.0f`},{field:`Share`,type:`quantitative`,title:`Share`,format:`.1%`}]}},Ie={"[Activity]":{name:`Activity`,displayName:`Activity`},"[Outcome]":{name:`Outcome`,displayName:`Outcome`},"[Outcome Order]":{name:`Outcome Order`,displayName:`Outcome order`,format:`#,0`},"[Sessions]":{name:`Sessions`,displayName:`Sessions`,format:`#,0`},"[Share]":{name:`Share`,displayName:`Share`,format:d}};function Le(){return{connection:`vl`,query:Pe,columnMetadata:Ie,vegaLiteSpec:Fe}}var Re=`EVALUATE\r
TOPN(\r
    25,\r
    SELECTCOLUMNS(\r
        FILTER(\r
            SUMMARIZECOLUMNS(\r
                __GROUPING_COLUMN__,\r
                "@Sessions", [Model: Sessions],\r
                "@Judged", [Model: Judged Sessions],\r
                "@Well", [Model: Well-matched Sessions],\r
                "@Over", [Model: Over-specified Sessions],\r
                "@Under", [Model: Under-specified Sessions],\r
                "@JudgedShare", [Model: Judged Share],\r
                "@WellShare", [Model: Well-matched Share],\r
                "@OverShare", [Model: Over-specified Share],\r
                "@UnderShare", [Model: Under-specified Share],\r
                "@MainModel", [Model: Main Model],\r
                "@MainReason", [Model: Main Reason]\r
            ),\r
            NOT ISBLANK([@Sessions])\r
        ),\r
        "Segment", COALESCE(__GROUPING_COLUMN__, "__BLANK_LABEL__"),\r
        "Main Model", [@MainModel],\r
        "Main Reason", [@MainReason],\r
        "Sessions", [@Sessions],\r
        "Judged Sessions", [@Judged],\r
        "Well-matched Sessions", [@Well],\r
        "Over-specified Sessions", [@Over],\r
        "Under-specified Sessions", [@Under],\r
        "Judged Share", [@JudgedShare],\r
        "Well-matched Share", [@WellShare],\r
        "Over-specified Share", [@OverShare],\r
        "Under-specified Share", [@UnderShare]\r
    ),\r
    [Sessions], DESC,\r
    [Segment], ASC\r
)\r
ORDER BY [Sessions] DESC, [Segment] ASC\r
`,ze={"[Segment]":{name:`Segment`,displayName:`Segment`},"[Main Model]":{name:`Main Model`,displayName:`Main model`},"[Main Reason]":{name:`Main Reason`,displayName:`Main reason`},"[Sessions]":{name:`Sessions`,displayName:`Sessions`,format:`#,0`},"[Judged Sessions]":{name:`Judged Sessions`,displayName:`Judged sessions`,format:`#,0`},"[Well-matched Sessions]":{name:`Well-matched Sessions`,displayName:`Good match`,format:`#,0`},"[Over-specified Sessions]":{name:`Over-specified Sessions`,displayName:`Lighter model may do`,format:`#,0`},"[Under-specified Sessions]":{name:`Under-specified Sessions`,displayName:`Try stronger`,format:`#,0`},"[Judged Share]":{name:`Judged Share`,displayName:`Judged`,format:d},"[Well-matched Share]":{name:`Well-matched Share`,displayName:`Good match`,format:d},"[Over-specified Share]":{name:`Over-specified Share`,displayName:`Lighter model may do`,format:d},"[Under-specified Share]":{name:`Under-specified Share`,displayName:`Try stronger`,format:d}};function J(e){return typeof e==`number`&&Number.isFinite(e)?e:0}function Be({judgedSessions:e,overSpecifiedSessions:t,underSpecifiedSessions:n}){let r=J(e);if(r<5)return`Not judged`;let i=J(t),a=J(n),o=r-i-a;return o>=i&&o>=a?`Good match`:i>=a?`Lighter model may do`:`Try stronger`}function Y(e,t){return{connection:`vl`,query:Re.replace(/__GROUPING_COLUMN__|__BLANK_LABEL__/g,n=>n===`__GROUPING_COLUMN__`?e:t.replaceAll(`"`,`""`)),columnMetadata:ze}}function Ve(){return Y(`'Chat + Agent Interactions (Audit Logs)'[Task Breakdown Group]`,`Unclassified task`)}function He(e=v(y)){return _(Y(g(y),`Unassigned ${e.noun}`),e)}function Ue(){return Y(`'Chat + Agent Interactions (Audit Logs)'[Audit_UserId]`,`Unattributed user`)}var We=`EVALUATE\r
SELECTCOLUMNS(\r
    FILTER(\r
        SUMMARIZECOLUMNS(\r
            'Chat + Agent Interactions (Audit Logs)'[Cowork Task Category],\r
            'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade],\r
            'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade Sort],\r
            "@Share", [Usage Efficiency: Task Grade Share],\r
            "@Sessions", [Usage Efficiency: Graded Tasks],\r
            "@TaskSessions",\r
                CALCULATE(\r
                    [Usage Efficiency: Graded Tasks],\r
                    REMOVEFILTERS(\r
                        'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade],\r
                        'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade Sort]\r
                    )\r
                )\r
        ),\r
        NOT ISBLANK([@Share])\r
            && NOT ISBLANK('Chat + Agent Interactions (Audit Logs)'[Cowork Task Category])\r
    ),\r
    "Task", 'Chat + Agent Interactions (Audit Logs)'[Cowork Task Category],\r
    "Grade", 'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade],\r
    "Grade Order", 'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade Sort],\r
    "Share", [@Share],\r
    "Sessions", [@Sessions],\r
    "Task Sessions", [@TaskSessions]\r
)\r
ORDER BY [Task Sessions] DESC, [Task] ASC, [Grade Order] ASC\r
`,Ge={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`},encoding:{y:{field:`Task`,type:`nominal`,title:null,sort:{field:`Task Sessions`,op:`max`,order:`descending`},axis:{labelLimit:200}},x:{field:`Share`,type:`quantitative`,stack:`zero`,title:`Share of the task`,scale:{domain:[0,1]},axis:{labelExpr:`format(datum.value, '.0%')`}},color:{field:`Grade`,type:`nominal`,title:`Fit`,scale:{domain:[`Strong fit`,`Fair fit`,`Worth a look`]}},order:{field:`Grade Order`,type:`quantitative`,sort:`ascending`},tooltip:[{field:`Task`,type:`nominal`,title:`Task Breakdown`},{field:`Grade`,type:`nominal`,title:`Fit`},{field:`Share`,type:`quantitative`,title:`Share of the task`,format:`.0%`},{field:`Sessions`,type:`quantitative`,title:`Graded sessions`,format:`,.0f`}]}},Ke=[`Strong fit`,`Fair fit`,`Worth a look`],qe={"[Task]":{name:`Task`,displayName:`Task Breakdown`},"[Grade]":{name:`Grade`,displayName:`Fit`},"[Grade Order]":{name:`Grade Order`,displayName:`Fit order`,format:`#,0`},"[Share]":{name:`Share`,displayName:`Share of the task`,format:d},"[Sessions]":{name:`Sessions`,displayName:`Graded sessions`,format:`#,0`},"[Task Sessions]":{name:`Task Sessions`,displayName:`Graded sessions in the task`,format:`#,0`}};function Je(){return{connection:`vl`,query:We,columnMetadata:qe,vegaLiteSpec:Ge}}function Ye(e){let t=e.columns.findIndex(e=>e.name===`Grade`),n=e.columns.findIndex(e=>e.name===`Grade Order`);return t<0?e:{...e,rows:e.rows.map(e=>{let r=[...e];return r[t]=f(e[t],n>=0?e[n]:void 0)?.name??e[t],r})}}var Xe=`EVALUATE\r
SUMMARIZECOLUMNS(\r
    ROLLUPADDISSUBTOTAL(\r
        ROLLUPGROUP(\r
            'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade],\r
            'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade Sort]\r
        ), "Is Grand Total",\r
        ROLLUPGROUP(\r
            'Chat + Agent Interactions (Audit Logs)'[Work Shape],\r
            'Chat + Agent Interactions (Audit Logs)'[Work Shape Sort]\r
        ), "Is Group Total"\r
    ),\r
    "Sessions", [Usage Efficiency: Consumption Sessions],\r
    "Decided By", [Usage Efficiency: Fit Basis],\r
    "Could Have Used", [Usage Efficiency: Alternative Tool],\r
    "Share Of Work", [Usage Efficiency: Share Of Work],\r
    "Source Items", [Usage Efficiency: Evidence Files],\r
    "Source Types", [Usage Efficiency: Evidence Kinds]\r
)\r
ORDER BY\r
    [Is Grand Total] DESC,\r
    'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade Sort] ASC,\r
    [Is Group Total] DESC,\r
    'Chat + Agent Interactions (Audit Logs)'[Work Shape Sort] ASC\r
`,Ze=`Chat + Agent Interactions (Audit Logs)Work Weight Grade`,Qe=`Chat + Agent Interactions (Audit Logs)Work Weight Grade Sort`,$e=`Chat + Agent Interactions (Audit Logs)Work Shape`,et=`Chat + Agent Interactions (Audit Logs)Work Shape Sort`,X=`Work`,tt=[`Sessions`,`Decided By`,`Could Have Used`,`Share Of Work`,`Source Items`,`Source Types`],nt={"Chat + Agent Interactions (Audit Logs)[Work Weight Grade]":{name:Ze,displayName:`Grade`},"Chat + Agent Interactions (Audit Logs)[Work Weight Grade Sort]":{name:Qe},"Chat + Agent Interactions (Audit Logs)[Work Shape]":{name:$e,displayName:`How it was done`},"Chat + Agent Interactions (Audit Logs)[Work Shape Sort]":{name:et},"[Is Grand Total]":{name:`Is Grand Total`},"[Is Group Total]":{name:`Is Group Total`},"[Sessions]":{name:`Sessions`,displayName:`Sessions`,format:`#,0`},"[Decided By]":{name:`Decided By`,displayName:`Decided by`},"[Could Have Used]":{name:`Could Have Used`,displayName:`Could have used`},"[Share Of Work]":{name:`Share Of Work`,displayName:`% of work`,format:d},"[Source Items]":{name:`Source Items`,displayName:`Source items`,format:s},"[Source Types]":{name:`Source Types`,displayName:`Source types`,format:s}};function rt(){return{connection:`vl`,query:Xe,columnMetadata:nt}}function it(e){return fe(e,{group:Ze,leaf:$e,grandTotalFlag:`Is Grand Total`,groupTotalFlag:`Is Group Total`,label:X,fields:tt,groupLabel:(e,t)=>f(e,t(Qe))?.name})}var at=`DEFINE\r
    // The report's Who Flag, as a count: people with half or more of their\r
    // graded Cowork sessions at Worth a look. Defined here so models built\r
    // before that measure was added still answer.\r
    MEASURE 'Chat + Agent Interactions (Audit Logs)'[ValueLens Cowork Flagged People] =\r
        VAR _people =\r
            CALCULATETABLE(\r
                VALUES('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
                REMOVEFILTERS(\r
                    'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade],\r
                    'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade Sort]\r
                ),\r
                KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)] = "Cowork")\r
            )\r
        RETURN\r
            COUNTROWS(FILTER(_people, [Usage Efficiency: Who Low Share] >= 0.5))\r
\r
EVALUATE\r
// Every group row is kept, so the totals stay whole; the people under them\r
// stop at the top 1,000, and "Total" counts them all.\r
VAR _all =\r
    SUMMARIZECOLUMNS(\r
        ROLLUPADDISSUBTOTAL(\r
            'Chat + Agent Org Data'[Organization], "Is Grand Total",\r
            'Chat + Agent Interactions (Audit Logs)'[Audit_UserId], "Is Group Total"\r
        ),\r
        "People", [Usage Efficiency: Who People],\r
        "Sessions", [Usage Efficiency: Who Graded Sessions],\r
        "Strong", [Usage Efficiency: Who High Share],\r
        "Fair", [Usage Efficiency: Who Medium Share],\r
        "Worth A Look", [Usage Efficiency: Who Low Share],\r
        "Flagged People", [ValueLens Cowork Flagged People]\r
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
    'Chat + Agent Org Data'[Organization] ASC,\r
    [Is Group Total] DESC,\r
    [Sessions] DESC,\r
    'Chat + Agent Interactions (Audit Logs)'[Audit_UserId] ASC\r
`,ot=`Chat + Agent Org DataOrganization`,st=`Chat + Agent Interactions (Audit Logs)Audit_UserId`,ct=[`People`,`Sessions`,`Strong`,`Fair`,`Worth A Look`,`Flagged People`],lt={"Chat + Agent Org Data[Organization]":{name:ot,displayName:`Organization`},"Chat + Agent Interactions (Audit Logs)[Audit_UserId]":{name:st,displayName:`Person`},"[Is Grand Total]":{name:`Is Grand Total`},"[Is Group Total]":{name:`Is Group Total`},"[People]":{name:`People`,displayName:`People`,format:`#,0`},"[Sessions]":{name:`Sessions`,displayName:`Graded sessions`,format:`#,0`},"[Strong]":{name:`Strong`,displayName:`Strong`,format:d},"[Fair]":{name:`Fair`,displayName:`Fair`,format:d},"[Worth A Look]":{name:`Worth A Look`,displayName:`Worth a look`,format:d},"[Flagged People]":{name:`Flagged People`,displayName:`Flagged`,format:`#,0`},...c};function ut(e=v(y)){return _({connection:`vl`,query:at,columnMetadata:lt},e)}function dt(e,t){return fe(e,{group:ot,leaf:st,grandTotalFlag:`Is Grand Total`,groupTotalFlag:`Is Group Total`,label:`Who`,fields:ct,blankLabel:t})}var Z=o(),ft={min:0,max:1},pt=[{id:X},{id:`Sessions`,format:W(`whole`)},{id:`Decided By`},{id:`Could Have Used`},{id:`Share Of Work`,format:W(`percent`)},{id:`Source Items`,format:W(`decimal`)},{id:`Source Types`,format:W(`decimal`)}];function mt(){let{theme:e}=m(),t=rt(),n=N({connection:t.connection,query:t.query,columnMetadata:t.columnMetadata}),r=(0,q.useMemo)(()=>n.data?.status===`success`?it(P(n.data.table,t.columnMetadata)):void 0,[n.data,t.columnMetadata]),i=r?.rows.map(e=>e._id).join(`|`)??``,a=(0,q.useMemo)(()=>le(r,!0),[r]),{ids:o,onRowToggle:s}=ue(i),c=(0,q.useMemo)(()=>{let e=r?.rows??[],t=e.flatMap(e=>e._children??[]);return{group:ge(e.map(e=>e[`Share Of Work`])),leaf:ge(t.map(e=>e[`Share Of Work`]))}},[r]),l=(0,q.useMemo)(()=>[{id:X,header:`Grade / how it was done`,width:184,cellRenderer:(e,t)=>{if(!U(t))return H(e);let n=f(e);return(0,Z.jsxs)(`span`,{className:`inline-flex items-center gap-200 font-semibold`,children:[n&&(0,Z.jsx)(K,{tone:n.tone}),H(e)]})}},{id:`Sessions`,header:`Sessions`,width:96,numericStyling:!0,cellRenderer:W(`whole`)},{id:`Decided By`,header:`Decided by`,minWidth:240},{id:`Could Have Used`,header:`Could have used`,width:168},{id:`Share Of Work`,header:`% of work`,width:108,numericStyling:!0,cellRenderer:G({domain:e=>U(e)?c.group:c.leaf,format:W(`percent`)})},{id:`Source Items`,header:`Source items`,width:120,numericStyling:!0,cellRenderer:W(`decimal`)},{id:`Source Types`,header:`Source types`,width:120,numericStyling:!0,cellRenderer:W(`decimal`)}],[c]),u=(0,q.useMemo)(()=>V(r?.total,pt),[r]),d=se(a??[],e=>!o.has(e._id));return(0,Z.jsx)(oe,{tree:r,error:n.data?.status===`error`?n.data.error.message:void 0,onRetry:n.refetch,isLoading:n.isLoading,height:r?O(d+ +!!u,de):void 0,emptyTitle:`No graded Cowork work`,emptyDescription:`No Cowork session in this selection carries enough detail to say how the work was done.`,children:(0,Z.jsx)(h,{columns:l,data:a,grandTotals:u?{position:`bottom`,data:u}:void 0,onRowToggle:s,theme:e,header:{title:`How the work was done`,subtitle:`Each grade, then the shapes of work inside it. Sources are the median per session.`}},i)})}function ht(e,t){let n=ce(e);if(!n)return null;let r=U(t);return(0,Z.jsxs)(`span`,{className:`inline-flex items-center gap-100 font-semibold text-caution`,children:[(0,Z.jsx)(ye,{className:`icon-size-100`,strokeWidth:2.5,"aria-hidden":`true`}),r?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`span`,{className:`tabular-nums`,children:M(n,`whole`)}),(0,Z.jsx)(`span`,{className:`sr-only`,children:n===1?`person flagged`:`people flagged`})]}):(0,Z.jsx)(`span`,{className:`sr-only`,children:`Flagged`})]})}function gt(){let{theme:e}=m(),t=x(),n=D(),r=(0,q.useMemo)(()=>ut(t),[t]),i=N({connection:r.connection,query:r.query,columnMetadata:r.columnMetadata}),a=`Unassigned ${t.noun}`,o=(0,q.useMemo)(()=>i.data?.status===`success`?P(i.data.table,r.columnMetadata):void 0,[i.data,r.columnMetadata]),s=(0,q.useMemo)(()=>o?dt(o,a):void 0,[o,a]),c=`${t.column}|${s?.rows.map(e=>e._id).join(`|`)??``}`,l=(0,q.useMemo)(()=>le(s,!1),[s]),{ids:u,onRowToggle:d}=ue(c),f=(0,q.useMemo)(()=>[{id:`Who`,header:`${t.label} / person`,minWidth:240,cellRenderer:(e,t)=>U(t)?(0,Z.jsx)(`span`,{className:`font-semibold`,children:H(e)}):H(e)},{id:`People`,header:`People`,width:88,numericStyling:!0,cellRenderer:(e,t)=>U(t)?W(`whole`)(e):null},{id:`Sessions`,header:`Graded sessions`,width:140,numericStyling:!0,cellRenderer:W(`whole`)},{id:`Mix`,header:`Mix`,width:104,sortable:!1,cellRenderer:(e,t)=>(0,Z.jsx)(_e,{strong:t.Strong,fair:t.Fair,worth:t[`Worth A Look`]})},{id:`Strong`,header:`Strong`,width:96,numericStyling:!0,cellRenderer:W(`percent`)},{id:`Fair`,header:`Fair`,width:96,numericStyling:!0,cellRenderer:W(`percent`)},{id:`Worth A Look`,header:`Worth a look`,width:124,numericStyling:!0,cellRenderer:G({domain:ft,format:W(`percent`),color:n?.caution})},{id:`Flagged People`,header:`Flag`,width:88,cellRenderer:ht}],[t.label,n]),p=(0,q.useMemo)(()=>V(s?.total,[{id:`Who`},{id:`People`,format:W(`whole`)},{id:`Sessions`,format:W(`whole`)},{id:`Mix`},{id:`Strong`,format:W(`percent`)},{id:`Fair`,format:W(`percent`)},{id:`Worth A Look`,format:W(`percent`)},{id:`Flagged People`,format:W(`whole`)}]),[s]),g=se(l??[],e=>u.has(e._id));return(0,Z.jsxs)(`div`,{className:`flex flex-col gap-200`,children:[(0,Z.jsx)(oe,{tree:s,error:i.data?.status===`error`?i.data.error.message:void 0,onRetry:i.refetch,isLoading:i.isLoading,height:s?O(g+ +!!p,de):void 0,emptyTitle:`Nobody with enough graded sessions`,emptyDescription:`A person or ${t.noun} appears here once they have five graded Cowork sessions in this selection.`,children:(0,Z.jsx)(h,{columns:f,data:l,defaultSort:[{columnId:`Sessions`,direction:`desc`}],grandTotals:p?{position:`bottom`,data:p}:void 0,onRowToggle:d,theme:e,header:{title:`Who is doing it`,subtitle:`Each ${t.noun}, then its people. Shares are of graded sessions; a flag marks half or more at Worth a look.`}},c)}),o&&(0,Z.jsx)(pe,{shown:he(o),total:me(o),noun:`person rows`,by:`by graded sessions`,rollup:!0})]})}var _t=L({label:`Task`,value:`Sessions`,of:`graded sessions`}),vt=L({label:`Model`,value:`Sessions`,of:`sessions with a logged model`}),yt=`Good match`,bt=z(e=>{let t=R(e,`Activity`,`Sessions`),n=e.columns.findIndex(e=>e.name===`Outcome`),r=e.columns.findIndex(e=>e.name===`Activity`),i=e.columns.findIndex(e=>e.name===`Sessions`);if(n<0||r<0||i<0)return;let a=new Map;for(let t of e.rows){let e=t[i];if(t[n]!==yt||typeof e!=`number`||!Number.isFinite(e))continue;let o=String(t[r]);a.set(o,(a.get(o)??0)+e)}let o=[...t].filter(([,e])=>e>=5).map(([e,t])=>({activity:e,total:t,good:a.get(e)??0}));if(o.length<2||o.some(e=>e.good<0))return;o.sort((e,t)=>t.good/t.total-e.good/e.total);let s=o[0],c=o[o.length-1],l=I(s.good,s.total);if(s.good<=0||l===I(o[1].good,o[1].total))return;let u=I(c.good,c.total);return`Good matches make up ${l} of ${s.activity} sessions, against ${u} of ${c.activity} sessions. A comparison, not a cause.`},L({label:`Outcome`,value:`Sessions`,of:`sessions`})),xt={perRow:44,chrome:190},St={disableStackedDataLabels:!0},Ct=`text-[length:var(--text-200)] leading-200`,wt=`text-[length:var(--text-300)] leading-300`;function Tt(e){let t=a(e,`[Strong Fit Share]`),n=a(e,`[Worth A Look Share]`),r=t!==void 0||n!==void 0;return{strong:t??(r?0:void 0),worth:n??(r?0:void 0)}}function Et(e){return new Set(e).size}function Dt(){let{theme:e}=m(),t=D(),n=Je(),r=N({connection:n.connection,query:n.query,columnMetadata:n.columnMetadata}),i=(0,q.useMemo)(()=>r.data?.status===`success`?Ye(P(r.data.table,n.columnMetadata)):void 0,[r.data,n.columnMetadata]),a=(0,q.useMemo)(()=>{let r=ie(t,e);return ae(n.vegaLiteSpec,Ke,[r.positive,r.neutral,r.caution])},[n.vegaLiteSpec,t,e]),o=i?.columns.findIndex(e=>e.name===`Task`)??-1,s=i&&o>=0?Et(i.rows.map(e=>e[o])):0,c=(0,q.useMemo)(()=>i?_t(i):void 0,[i]);return(0,Z.jsx)(`div`,{className:`h-[400px]`,style:i?{height:A(s,xt)+(c?40:0)}:void 0,children:r.data?.status===`error`?(0,Z.jsx)(w,{className:`h-full`,message:r.data.error.message,onRetry:r.refetch}):r.isLoading||!i?(0,Z.jsx)(C,{className:`h-full`}):i.rows.length===0?(0,Z.jsx)(T,{className:`h-full`,title:`No tasks to grade`,description:`No graded Cowork session in this selection carries a Task Breakdown.`}):(0,Z.jsx)(F,{text:c,children:(0,Z.jsx)(k,{label:`What goes to Cowork`,spec:a,data:i,theme:e,capabilities:St,header:{title:`What goes to Cowork`,subtitle:`Graded sessions for each Task Breakdown, by fit. Busiest first.`}})})})}function Ot({notice:e}){let t=(0,q.useId)(),{grades:n,notes:i}=(0,q.useMemo)(()=>Ce(e),[e]),a=te(`appendix`,`grading-method`);return(0,Z.jsxs)(`article`,{"aria-labelledby":t,className:`flex flex-col rounded-xl border border-border bg-card`,children:[(0,Z.jsx)(`h3`,{id:t,className:`border-b border-border px-500 py-400 text-[length:var(--text-400)] leading-400 font-semibold text-foreground`,children:`How sessions are graded`}),n.length>0&&(0,Z.jsx)(`dl`,{className:`flex flex-col divide-y divide-border px-500`,children:n.map(({grade:e,rule:t})=>(0,Z.jsxs)(`div`,{className:`flex flex-col gap-100 py-300`,children:[(0,Z.jsxs)(`dt`,{className:`flex items-center gap-200 ${wt} font-semibold text-foreground`,children:[(0,Z.jsx)(K,{tone:e.tone}),e.name]}),(0,Z.jsx)(`dd`,{className:`${wt} text-muted-foreground first-letter:uppercase`,children:t})]},e.name))}),(0,Z.jsxs)(`div`,{className:`mt-auto flex flex-col gap-200 border-t border-border px-500 py-300`,children:[i.map(e=>(0,Z.jsx)(`p`,{className:`${Ct} max-w-[68ch] text-muted-foreground`,children:e},e)),(0,Z.jsxs)(`button`,{type:`button`,onClick:a,className:`inline-flex w-fit items-center gap-100 ${Ct} font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`,children:[`How grading works, and the research behind it`,(0,Z.jsx)(r,{className:`icon-size-100`,"aria-hidden":`true`})]})]})]})}function kt(){let{filters:e,applicable:t}=b(),n=x(),r=N(Ee()),o=S(e,t),s=(0,q.useMemo)(()=>r.data?.status===`success`?l(r.data.table):void 0,[r.data]),c=a(s,`[Cowork Sessions]`),d=i(s,`[Fit Notice]`),f=Tt(s);return(0,Z.jsx)(re,{id:u(`cowork-fit`),title:`Cowork fit`,description:`Whether the work people hand to Cowork suits it, judged by the apps and sources each session touched.`,children:o?(0,Z.jsx)(T,{title:`No Cowork sessions for unlicensed people`,description:`Cowork needs a Copilot license, so unlicensed people have no Cowork sessions to grade. Set License to All or Licensed.`}):r.data?.status===`error`?(0,Z.jsx)(w,{message:r.data.error.message,onRetry:r.refetch}):r.isLoading||!r.data?(0,Z.jsx)(`div`,{className:`grid gap-300 md:grid-cols-3 xl:grid-cols-6`,children:Array.from({length:6},(e,t)=>(0,Z.jsx)(C,{},t))}):c===void 0?(0,Z.jsx)(T,{title:`No Cowork activity to grade yet`,description:`${d?`${d} `:``}Cowork sessions are graded here as soon as the audit log records them.`}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-3 xl:grid-cols-6`,children:[(0,Z.jsx)(j,{label:`Cowork sessions`,value:c,emphasis:!0}),(0,Z.jsx)(j,{label:`Tasks completed`,value:a(s,`[Tasks Completed]`)}),(0,Z.jsx)(j,{label:`Active days per user`,value:a(s,`[Active Days Per User]`),format:`hours`}),(0,Z.jsx)(j,{label:`Expert equivalent hours`,value:a(s,`[Expert Hours]`),format:`hours`}),(0,Z.jsx)(j,{label:`Strong fit`,value:f.strong,format:`percent`,detail:`Share of graded sessions`}),(0,Z.jsx)(j,{label:`Worth a look`,value:f.worth,format:`percent`,detail:`Share of graded sessions`})]}),(0,Z.jsxs)(`div`,{className:`grid grid-cols-1 items-start gap-500 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]`,children:[(0,Z.jsx)(Dt,{}),(0,Z.jsx)(Ot,{notice:d})]}),(0,Z.jsx)(mt,{}),(0,Z.jsx)(ne,{id:`cowork-fit-people`,label:`Show by ${n.noun} and person`,note:`Graded sessions and the fit mix for each ${n.noun}, opening to its people.`,children:(0,Z.jsx)(gt,{})})]})})}function At(e){return[{id:`task`,label:`Task Category`},{id:`organization`,label:e},{id:`person`,label:`User`}]}var jt=[`Good match`,`Lighter model may do`,`Try stronger`,`Not judged`],Mt={min:0,max:1};function Q(e,t,n){let r=t.columns.findIndex(e=>e.name===n);if(r<0)return;let i=e[r];return typeof i==`number`&&Number.isFinite(i)?i:void 0}function Nt(e){return{columns:[{name:`Verdict`,displayName:`Verdict`},...e.columns],rows:e.rows.map(t=>[Be({judgedSessions:Q(t,e,`Judged Sessions`),overSpecifiedSessions:Q(t,e,`Over-specified Sessions`),underSpecifiedSessions:Q(t,e,`Under-specified Sessions`)}),...t])}}function Pt(e,t){if(!e)return 0;let n=e.columns.findIndex(e=>e.name===t);return n<0?e.rows.length:new Set(e.rows.map(e=>e[n])).size}function Ft(e,t){if(!e)return!1;let n=e.columns.findIndex(e=>e.name===t);return n>=0&&e.rows.some(e=>typeof e[n]==`string`&&e[n].trim()!==``)}var It={perRow:44,chrome:190},Lt={disableStackedDataLabels:!0};function Rt(e){let t=p.find(t=>t.name===e)??p[p.length-1];return(0,Z.jsxs)(`span`,{className:`inline-flex items-center gap-200`,children:[(0,Z.jsx)(K,{tone:t.tone,icon:t.icon}),(0,Z.jsx)(`span`,{children:t.name})]})}function zt(e,t){if(typeof e==`number`)return M(e,`percent`);let n=t[`Judged Sessions`];return typeof n==`number`&&n>0?M(0,`percent`):null}function Bt(e){let t=a(e,`[Well-matched Share]`),n=a(e,`[Over-specified Share]`),r=a(e,`[Under-specified Share]`),i=t!==void 0||n!==void 0||r!==void 0,o=e=>e??(i?0:void 0);return{well:o(t),over:o(n),under:o(r)}}function $(e,t,n,r){return{id:e,header:t,width:n,numericStyling:!0,cellRenderer:r?G({domain:Mt,format:zt,color:r}):(e,t)=>zt(e,t)}}function Vt(e,t){switch(e){case`organization`:return He(t);case`person`:return Ue();case`task`:return Ve()}}function Ht(){let[e,t]=(0,q.useState)(`task`),{theme:n}=m(),r=x(),o=D(),s=(0,q.useMemo)(()=>ie(o,n),[o,n]),c=N(ke()),d=Ne(),f=N({connection:d.connection,query:d.query,columnMetadata:d.columnMetadata}),p=Le(),g=N({connection:p.connection,query:p.query,columnMetadata:p.columnMetadata}),_=(0,q.useMemo)(()=>Vt(e,r),[e,r]),v=N({connection:_.connection,query:_.query,columnMetadata:_.columnMetadata}),y=(0,q.useMemo)(()=>c.data?.status===`success`?l(c.data.table):void 0,[c.data]),b=(0,q.useMemo)(()=>f.data?.status===`success`?P(f.data.table,d.columnMetadata):void 0,[f.data,d.columnMetadata]),S=(0,q.useMemo)(()=>g.data?.status===`success`?P(g.data.table,p.columnMetadata):void 0,[g.data,p.columnMetadata]),E=(0,q.useMemo)(()=>v.data?.status===`success`?Nt(P(v.data.table,_.columnMetadata)):void 0,[v.data,_.columnMetadata]),te=(0,q.useMemo)(()=>ae(p.vegaLiteSpec,jt,[s.positive,s.negative,s.caution,s.neutral]),[p.vegaLiteSpec,s]),M=Ft(E,`Main Reason`),ne=(0,q.useMemo)(()=>At(r.label),[r.label]),I=e===`person`?`User`:e===`organization`?r.label:`Task Category`,L=(0,q.useMemo)(()=>[{id:`Verdict`,header:`Verdict`,width:176,cellRenderer:e=>Rt(e)},{id:`Segment`,header:I,width:224},{id:`Main Model`,header:`Main model`,width:136},...M?[{id:`Main Reason`,header:`Main reason`,width:152}]:[],{id:`Sessions`,header:`Sessions`,width:96,numericStyling:!0},$(`Judged Share`,`Judged`,92),$(`Well-matched Share`,`Good match`,120),$(`Over-specified Share`,`Lighter model may do`,172,s.negative),$(`Under-specified Share`,`Try stronger`,116,s.caution),{id:`Judged Sessions`,header:`Judged sessions`,hidden:!0}],[s,I,M]),R=i(y,`[Coverage Notice]`),z=Bt(y),B=(0,q.useMemo)(()=>b?vt(b):void 0,[b]),V=(0,q.useMemo)(()=>S?bt(S):void 0,[S]);return(0,Z.jsxs)(re,{id:u(`model-fit`),title:`Model fit`,description:`Whether the model doing the work suits it: a good match, a premium model on light work, or a mid-cost model on heavy work.`,children:[c.data?.status===`error`?(0,Z.jsx)(w,{message:c.data.error.message,onRetry:c.refetch}):c.isLoading||!c.data?(0,Z.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-2 xl:grid-cols-5`,children:[(0,Z.jsx)(C,{}),(0,Z.jsx)(C,{}),(0,Z.jsx)(C,{}),(0,Z.jsx)(C,{}),(0,Z.jsx)(C,{})]}):y?(0,Z.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-2 xl:grid-cols-5`,children:[(0,Z.jsx)(j,{label:`Sessions`,value:a(y,`[Sessions]`),emphasis:!0}),(0,Z.jsx)(j,{label:`Model logged`,value:a(y,`[Logged Share]`),format:`percent`,detail:`Share of sessions`}),(0,Z.jsx)(j,{label:`Good match`,value:z.well,format:`percent`,detail:`Model cost suits the work`}),(0,Z.jsx)(j,{label:`Lighter model may do`,value:z.over,format:`percent`,detail:`Premium model on light work`}),(0,Z.jsx)(j,{label:`Try stronger`,value:z.under,format:`percent`,detail:`Mid-cost model on Strong-fit work`})]}):(0,Z.jsx)(T,{title:`No model fit data`,description:`The semantic model returned no rows. Check that the model has been refreshed since the last data load.`}),(0,Z.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]`,children:[(0,Z.jsx)(`div`,{className:`h-[340px]`,style:b?{height:A(b.rows.length,It)+(B?40:0)}:void 0,children:f.data?.status===`error`?(0,Z.jsx)(w,{className:`h-full`,message:f.data.error.message,onRetry:f.refetch}):f.isLoading||!b?(0,Z.jsx)(C,{className:`h-full`}):b.rows.length===0?(0,Z.jsx)(T,{className:`h-full`,title:`No model names logged`,description:`No sessions in this selection carry a model name yet.`}):(0,Z.jsx)(F,{text:B,children:(0,Z.jsx)(k,{label:`Model usage`,spec:d.vegaLiteSpec,data:b,theme:n,header:{title:`Model usage`,subtitle:`Sessions by logged model and cost tier`}})})}),(0,Z.jsx)(`div`,{className:`flex flex-col gap-200`,children:(0,Z.jsx)(`div`,{className:`h-[340px]`,style:S?{height:A(Pt(S,`Activity`),It)+(V?40:0)}:void 0,children:g.data?.status===`error`?(0,Z.jsx)(w,{className:`h-full`,message:g.data.error.message,onRetry:g.refetch}):g.isLoading||!S?(0,Z.jsx)(C,{className:`h-full`}):S.rows.length===0?(0,Z.jsx)(T,{className:`h-full`,title:`No sessions to split`,description:`There is no Copilot or agent activity in this selection.`}):(0,Z.jsx)(F,{text:V,children:(0,Z.jsx)(k,{label:`Match by tool`,spec:te,data:S,theme:n,capabilities:Lt,header:{title:`Match by tool`,subtitle:`Good matches, the two exceptions, and unjudged sessions`}})})})})]}),(0,Z.jsxs)(`div`,{className:`flex flex-col gap-300`,children:[(0,Z.jsxs)(`div`,{className:`flex flex-wrap items-center gap-300`,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,className:`text-[length:var(--text-300)] leading-300 font-semibold text-foreground`,children:`View verdicts by`}),(0,Z.jsx)(ee,{label:`View verdicts by`,options:ne,value:e,onChange:t})]}),(0,Z.jsx)(`div`,{className:`flex h-[560px] flex-col`,style:E&&E.rows.length>0?{height:O(E.rows.length)}:void 0,children:v.data?.status===`error`?(0,Z.jsx)(w,{className:`h-full`,message:v.data.error.message,onRetry:v.refetch}):v.isLoading||!E?(0,Z.jsx)(C,{className:`h-full`}):E.rows.length===0?(0,Z.jsx)(T,{className:`h-full`,title:`No segments to judge`,description:`No sessions in this selection have enough model and task detail to build the table.`}):(0,Z.jsx)(h,{columns:L,data:E,defaultSort:[{columnId:`Sessions`,direction:`desc`}],theme:n,header:{title:`Verdicts by ${e===`organization`?r.noun:I.toLowerCase()}`,subtitle:`Top 25 by sessions. Shares are of judged sessions; a verdict needs five judged sessions.`}},e)})]}),R&&(0,Z.jsx)(`p`,{className:`max-w-[80ch] text-[length:var(--text-300)] leading-300 text-muted-foreground`,children:R})]})}function Ut(){let{show:e}=E();return(0,Z.jsxs)(`div`,{className:`flex flex-col gap-800`,children:[e(`cowork-fit`)&&(0,Z.jsx)(kt,{}),e(`model-fit`)&&(0,Z.jsx)(Ht,{}),e(`model-fit`)&&(0,Z.jsx)(B,{page:`efficiency`})]})}export{Ut as EfficiencyScreen};